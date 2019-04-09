import React, { Component, Fragment } from "react";
import axios from "axios";
import fileDownload from "js-file-download";

import { Item, Box } from "src/components/blocks";
import { Typography, Button } from "src/components/elements";
import DailyTimeRecordItem from "./DailyTimeRecordItem";
import CorrectionRequest from "./CorrectionRequest";

export class DailyTimeRecord extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editId: ""
    };
  }

  handleEditToggle = id => {
    const { editId } = this.state;

    if (!id || editId === id) {
      this.setState({ editId: "" });
    } else {
      this.setState({ editId: id });
    }
  };

  handleDownloadDailyTimeRecord = e => {
    e.preventDefault();
    const { person } = this.props;

    axios
      .get(`/api/trainee/download-daily-time-record/${person.data._id}`)
      .then(res => {
        fileDownload(res.data, "dtr.csv");
      });
  };

  render() {
    const { person } = this.props;
    const { editId } = this.state;

    return (
      <Fragment>
        <Box margin="stack-l">
          <Item center margin="inline-base">
            <Typography variant="display-2">Daily Time Record</Typography>
          </Item>

          <Item margin="inline-base" onClick={this.toggleEdit}>
            <Button
              variant="secondary"
              onClick={this.handleDownloadDailyTimeRecord}
            >
              Download CSV
            </Button>
          </Item>
        </Box>

        <Item margin="stack-l">
          <Typography variant="caption">
            Reminder: Clocks less than 15 minutes are not recorded.
          </Typography>
        </Item>

        {person.data.roleData.clockCorrectionRequest.isActive && (
          <Item margin="stack-l">
            <CorrectionRequest
              clockCorrectionRequest={
                person.data.roleData.clockCorrectionRequest
              }
              userId={person.data._id}
            />
          </Item>
        )}

        {person.data.roleData.clocks.length === 0 ? (
          <Item margin="stack-l">
            <Typography variant="base">No records</Typography>
          </Item>
        ) : (
          person.data.roleData.clocks.map((clock, i) => (
            <Item margin="stack-base" key={clock._id}>
              <DailyTimeRecordItem
                person={person}
                clockData={clock}
                isClockCorrectionRequestActive={
                  person.data.roleData.clockCorrectionRequest.isActive
                }
                editId={editId}
                handleEditToggle={this.handleEditToggle}
                previousClock={person.data.roleData.clocks[i - 1]}
              />
            </Item>
          ))
        )}
      </Fragment>
    );
  }
}

export default DailyTimeRecord;
