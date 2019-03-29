import React, { Component, Fragment } from "react";
import format from "date-fns/format";
import differenceInSeconds from "date-fns/difference_in_seconds";

import { Item, Box } from "src/components/blocks";
import { Typography, Button } from "src/components/elements";
import { DataGroup } from "src/components/compounds";
import DailyTimeRecordItem from "./DailyTimeRecordItem";

import returnTimeElapsed from "src/services/utils/returnTimeElapsed";

export class DailyTimeRecord extends Component {
  render() {
    const {
      data: {
        roleData: { clocks }
      }
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

        {clocks.length === 0 ? (
          <Item margin="stack-l">
            <Typography variant="base">No records</Typography>
          </Item>
        ) : (
          clocks.map(clock => (
            <Item margin="stack-base" key={clock._id}>
              <DailyTimeRecordItem clockData={clock} />
            </Item>
          ))
        )}
      </Fragment>
    );
  }
}

export default DailyTimeRecord;