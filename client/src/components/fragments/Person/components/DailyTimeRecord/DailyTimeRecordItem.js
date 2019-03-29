import React, { Component } from "react";
import format from "date-fns/format";
import differenceInSeconds from "date-fns/difference_in_seconds";
import styled from "styled-components";

import { Item } from "src/components/blocks";
import { Typography, Button } from "src/components/elements";
import { DataGroup } from "src/components/compounds";
import DailyTimeRecordItemEdit from "./DailyTimeRecordItemEdit";

import returnTimeElapsed from "src/services/utils/returnTimeElapsed";

const StyledDailyTimeRecordItem = styled.div``;

export class DailyTimeRecordItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditOpen: false
    };
  }

  handleToggleEditOpen = e => {
    e.preventDefault();
    this.setState({ isEditOpen: !this.state.isEditOpen });
  };

  render() {
    const { clockData } = this.props;
    const { isEditOpen } = this.state;

    return (
      <StyledDailyTimeRecordItem>
        <Item margin="stack-s">
          <DataGroup>
            <DataGroup.Label title={format(clockData.in, "MMM D YYYY")} />

            <DataGroup.Content>
              <Typography variant="body">
                {`${format(clockData.in, "HH:mm")} - ${
                  clockData.out
                    ? `${format(clockData.out, "HH:mm")} (${returnTimeElapsed(
                        differenceInSeconds(clockData.out, clockData.in)
                      )})`
                    : "Ongoing"
                }`}
              </Typography>
            </DataGroup.Content>

            {clockData.out && (
              <DataGroup.Buttons>
                <Button variant="secondary" onClick={this.handleToggleEditOpen}>
                  Edit
                </Button>

                <Button variant="secondary">Delete</Button>
              </DataGroup.Buttons>
            )}
          </DataGroup>
        </Item>

        {isEditOpen && (
          <DailyTimeRecordItemEdit
            clockData={clockData}
            handleToggleEditOpen={this.handleToggleEditOpen}
          />
        )}
      </StyledDailyTimeRecordItem>
    );
  }
}

export default DailyTimeRecordItem;
