import React, { Fragment } from "react";
import format from "date-fns/format";

import { Item } from "src/components/blocks";
import { Typography } from "src/components/elements";
import { DataGroup } from "src/components/compounds";

const TaskInformation = ({ taskData }) => {
  return (
    <Fragment>
      <Item margin="stack-l">
        <DataGroup>
          <DataGroup.Label title="Date Created" />

          <DataGroup.Content>
            <Typography variant="display-4">
              {format(taskData.dateCreated, "MM-DD-YYYY")}
            </Typography>
          </DataGroup.Content>
        </DataGroup>
      </Item>

      <Item margin="stack-l">
        <DataGroup>
          <DataGroup.Label title="Content" />

          <DataGroup.Content>
            <Typography variant="body">{taskData.content}</Typography>
          </DataGroup.Content>
        </DataGroup>
      </Item>

      <Item margin="stack-l">
        <DataGroup>
          <DataGroup.Label title="Ticket Number" />

          <DataGroup.Content>
            <Typography variant="body">
              {taskData.ticketNumber || "N/A"}
            </Typography>
          </DataGroup.Content>
        </DataGroup>
      </Item>
    </Fragment>
  );
};

export default TaskInformation;
