import React, { Component } from "react";
import styled from "styled-components";

import { Item, Box } from "src/components/blocks";
import { Typography, Button } from "src/components/elements";
import { DataGroup } from "src/components/compounds";

import TraineeScheduleEdit from "./TraineeScheduleEdit";

const StyledTraineeSchedule = styled.div``;

export class TraineeSchedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditOpen: false
    };
  }

  toggleEdit = () => {
    this.setState({ isEditOpen: !this.state.isEditOpen });
  };

  render() {
    const { schedule, id, fetchPerson } = this.props;
    const { isEditOpen } = this.state;

    return (
      <StyledTraineeSchedule>
        <Box margin="stack-l">
          <Item center margin="inline-base">
            <Typography variant="display-2">Schedule</Typography>
          </Item>

          {isEditOpen ? (
            <Button variant="secondary" icon onClick={this.toggleEdit}>
              <i className="fas fa-arrow-left" />
              <span id="hidden">Back</span>
            </Button>
          ) : (
            <Item margin="inline-base" onClick={this.toggleEdit}>
              <Button variant="secondary">Edit Schedule</Button>
            </Item>
          )}
        </Box>

        {isEditOpen ? (
          <TraineeScheduleEdit schedule={schedule} id={id} fetchPerson={fetchPerson} />
        ) : (
          Object.entries(schedule).map(([key, value]) => (
            <Item margin="stack-base" key={key}>
              <DataGroup>
                <DataGroup.Label title={key} />

                <DataGroup.Content>
                  {value.isTrainingDay ? (
                    <Box>
                      <Typography variant="body">
                        {value.startTime}:00 - {value.startTime + value.hours}
                        :00 ({value.hours} hours)
                      </Typography>
                    </Box>
                  ) : (
                    <Typography variant="caption">Off</Typography>
                  )}
                </DataGroup.Content>
              </DataGroup>
            </Item>
          ))
        )}
      </StyledTraineeSchedule>
    );
  }
}

export default TraineeSchedule;
