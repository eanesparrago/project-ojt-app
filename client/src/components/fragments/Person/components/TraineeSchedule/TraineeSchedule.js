import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { Item, Box } from "src/components/blocks";
import { Typography, Button } from "src/components/elements";
import { DataGroup } from "src/components/compounds";
import UpdateRequest from "./UpdateRequest";
import TraineeScheduleEdit from "./TraineeScheduleEdit";

import enums from "src/services/enums";

const StyledTraineeSchedule = styled.div``;

function returnEndTime(startTime, hours) {
  let endTime = startTime + hours;
  if (endTime > 24) {
    endTime -= 24;

    return `${endTime}:00 Next day`;
  }

  return `${endTime}:00`;
}

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
    const { person, auth } = this.props;
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
              <Button variant="secondary">
                {auth.user.role === enums.roles.TRAINEE
                  ? "Request Schedule Update"
                  : "Edit Schedule"}
              </Button>
            </Item>
          )}
        </Box>

        {person.data.roleData.scheduleUpdateRequest.isActive && (
          <Item margin="stack-l">
            <UpdateRequest person={person} />
          </Item>
        )}

        {isEditOpen ? (
          <TraineeScheduleEdit person={person} toggleEdit={this.toggleEdit} />
        ) : (
          Object.entries(person.data.roleData.schedule).map(([key, value]) => (
            <Item margin="stack-base" key={key}>
              <DataGroup>
                <DataGroup.Label title={key} />

                <DataGroup.Content>
                  {value.isTrainingDay ? (
                    <Box>
                      <Typography variant="body">
                        {value.startTime}:00 -{" "}
                        {returnEndTime(value.startTime, value.hours)} (
                        {value.hours} hour{value.hours > 1 && "s"})
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

export default connect(state => ({
  auth: state.auth
}))(TraineeSchedule);
