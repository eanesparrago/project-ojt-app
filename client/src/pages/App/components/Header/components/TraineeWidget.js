import React from "react";
import styled from "styled-components";

import { Item } from "src/components/blocks";
import { Button } from "src/components/elements";
import Clock from "./Clock";

const StyledTraineeWidget = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const TraineeWidget = () => {
  return (
    <StyledTraineeWidget>
      <Item center margin="inline-base">
        <Clock />
      </Item>

      <Item>
        <Button variant="primary" full>
          Clock In
        </Button>
      </Item>
    </StyledTraineeWidget>
  );
};

export default TraineeWidget;
