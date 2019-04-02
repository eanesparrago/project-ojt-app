import React, { Component, Fragment } from "react";

import { Item, Box } from "src/components/blocks";
import { Typography, Button } from "src/components/elements";
import { DataGroup } from "src/components/compounds";

export class Tasks extends Component {
  render() {
    return (
      <Fragment>
        <Box margin="stack-l">
          <Item center margin="inline-base">
            <Typography variant="display-2">Task</Typography>
          </Item>

          <Item margin="inline-base">
            <Button variant="secondary">Create Task</Button>
          </Item>
        </Box>
      </Fragment>
    );
  }
}

export default Tasks;
