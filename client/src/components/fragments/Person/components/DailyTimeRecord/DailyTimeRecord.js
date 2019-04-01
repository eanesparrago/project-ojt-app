import React, { Component, Fragment } from "react";

import { Item } from "src/components/blocks";
import { Typography } from "src/components/elements";
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

  render() {
    const {
      data: { roleData, _id }
    } = this.props;
    const { editId } = this.state;

    return (
      <Fragment>
        <Item margin="stack-base">
          <Typography variant="display-2">Daily Time Record</Typography>
        </Item>

        <Item margin="stack-l">
          <Typography variant="caption">
            Reminder: Clocks less than 15 minutes are not recorded.
          </Typography>
        </Item>

        {roleData.clockCorrectionRequest.isActive && (
          <Item margin="stack-l">
            <CorrectionRequest
              clockCorrectionRequest={roleData.clockCorrectionRequest}
              userId={_id}
            />
          </Item>
        )}

        {roleData.clocks.length === 0 ? (
          <Item margin="stack-l">
            <Typography variant="base">No records</Typography>
          </Item>
        ) : (
          roleData.clocks.map((clock, i) => (
            <Item margin="stack-base" key={clock._id}>
              <DailyTimeRecordItem
                clockData={clock}
                isClockCorrectionRequestActive={
                  roleData.clockCorrectionRequest.isActive
                }
                editId={editId}
                handleEditToggle={this.handleEditToggle}
                previousClock={roleData.clocks[i - 1]}
              />
            </Item>
          ))
        )}
      </Fragment>
    );
  }
}

export default DailyTimeRecord;
