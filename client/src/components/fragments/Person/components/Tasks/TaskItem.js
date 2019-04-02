import React from "react";
import styled from "styled-components";
import isSameDay from "date-fns/is_same_day";
import format from "date-fns/format";

import { Item } from "src/components/blocks";
import { Typography, Button, Divider } from "src/components/elements";
import { DataGroup } from "src/components/compounds";

const StyledTaskItem = styled.div``;

const TaskItem = ({ taskData, previousTask }) => {
  let title = "";
  if (previousTask) {
    if (!isSameDay(taskData.dateCreated, previousTask.dateCreated)) {
      title = format(taskData.dateCreated, "MMM D YYYY");
    }
  } else {
    title = format(taskData.dateCreated, "MMM D YYYY");
  }

  return (
    <StyledTaskItem>
      <DataGroup>
        <DataGroup.Label title={title} />

        <DataGroup.Content>
          <Item margin="stack-m">
            <Typography variant="body">
              {format(taskData.dateCreated, "HH:mm")}
            </Typography>
          </Item>

          <Item margin="stack-base">
            <Typography variant="body">{taskData.content}</Typography>
          </Item>

          <Item margin="stack-base">
            <Typography variant="base">
              Ticket Number: {taskData.ticketNumber || "N/A"}
            </Typography>
          </Item>

          <Item>
            <Divider />
          </Item>
        </DataGroup.Content>
      </DataGroup>
    </StyledTaskItem>
  );
};

export default TaskItem;
