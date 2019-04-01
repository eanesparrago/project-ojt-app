import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Button, Typography } from "src/components/elements";
import { Item } from "src/components/blocks";
import EditGroupForm from "./EditGroupForm";

const StyledGroupHeader = styled.header`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  grid-area: header;
  margin-bottom: 0;

  .item-close {
    margin-left: auto;
  }
`;

export class GroupHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditFormOpen: false
    };
  }

  handleEditFormToggle = e => {
    this.setState({ isEditFormOpen: !this.state.isEditFormOpen });
  };

  render() {
    const { groupData } = this.props;
    const { isEditFormOpen } = this.state;

    return (
      <StyledGroupHeader>
        {isEditFormOpen ? (
          <EditGroupForm
            groupData={groupData}
            handleEditFormToggle={this.handleEditFormToggle}
          />
        ) : (
          <Fragment>
            <Item margin="wrap-base">
              <Typography variant="display-1" as="h1">
                {groupData.name}
              </Typography>
            </Item>

            {groupData.location && (
              <Item margin="wrap-base">
                <Typography variant="caption">
                  <Item center inline margin="inline-s">
                    <i className="fas fa-map-marker-alt" />
                  </Item>
                  {groupData.location}
                </Typography>
              </Item>
            )}

            {groupData.phoneNumber && (
              <Item margin="wrap-base">
                <Typography variant="caption">
                  <Item center inline margin="inline-s">
                    <i className="fas fa-phone" />
                  </Item>
                  {groupData.phoneNumber}
                </Typography>
              </Item>
            )}

            {!isEditFormOpen && (
              <Item NAME="group-edit-button" margin="wrap-base" top>
                <Button
                  variant="secondary"
                  icon
                  onClick={this.handleEditFormToggle}
                >
                  <i className="fas fa-cog" />
                  <span id="hidden">Edit</span>
                </Button>
              </Item>
            )}

            <Item NAME="close">
              <Button variant="primary" icon rounded as={Link} to="/app/groups">
                <i className="fas fa-times" />
              </Button>
            </Item>
          </Fragment>
        )}
      </StyledGroupHeader>
    );
  }
}

export default GroupHeader;
