import React, { Component, Fragment } from "react";

import { Item } from "src/components/blocks";
import { Typography } from "src/components/elements";
import DailyTimeRecordItem from "./DailyTimeRecordItem";
import CorrectionRequest from "./CorrectionRequest";

export class DailyTimeRecord extends Component {
  render() {
    const {
      data: { roleData }
    } = this.props;

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
            />
          </Item>
        )}

        {roleData.clocks.length === 0 ? (
          <Item margin="stack-l">
            <Typography variant="base">No records</Typography>
          </Item>
        ) : (
          roleData.clocks.map(clock => (
            <Item margin="stack-base" key={clock._id}>
              <DailyTimeRecordItem
                clockData={clock}
                isClockCorrectionRequestActive={
                  roleData.clockCorrectionRequest.isActive
                }
              />
            </Item>
          ))
        )}
      </Fragment>
    );
  }
}

export default DailyTimeRecord;
