import React, { Component } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Item, Box } from "src/components/blocks";
import { Button, Typography } from "src/components/elements";
import { TextInput } from "src/components/compounds";

import { deleteGroup } from "src/services/session/actions/groupsActionCreators";
import {
  getGroup,
  editGroup
} from "src/services/session/actions/groupActionCreators";

import { setFlashMessage } from "src/services/session/actions/appActionCreators";

const StyledEditGroupForm = styled.form`
  width: 62%;

  .item-editGroupForm-input-name {
    width: 38%;
  }

  .item-editGroupForm-input {
    width: 62%;
  }

  margin-bottom: var(--size-base);
`;

export class EditGroupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.groupData.name,
      location: props.groupData.location,
      phoneNumber: props.groupData.phoneNumber
    };
  }

  handleInputChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { editGroup, groupData, handleEditFormToggle } = this.props;
    const { ...state } = this.state;

    editGroup(groupData._id, state).then(() => {
      handleEditFormToggle();
    });
  };

  handleDelete = e => {
    e.preventDefault();
    const { groupData, deleteGroup, history } = this.props;

    if (
      window.confirm(
        "This action is irreversible. Are you sure you want to delete this group?"
      )
    ) {
      deleteGroup(groupData._id).then(() => {
        history.goBack();
      });
    }
  };

  render() {
    const {
      group: { errors, isLoading },
      handleEditFormToggle
    } = this.props;
    const { ...state } = this.state;

    return (
      <StyledEditGroupForm>
        {[
          {
            label: "Group Name*",
            name: "name",
            type: "text",
            id: "group-name-input",
            autoFocus: true
          },
          {
            label: "Location",
            name: "location",
            type: "text",
            id: "location-input"
          },
          {
            label: "Phone Number",
            name: "phoneNumber",
            type: "text",
            id: "phone-number-input"
          }
        ].map(item => (
          <Box margin="stack-base" key={item.id}>
            <Item NAME="editGroupForm-input-name" left margin="inline-base">
              <Typography variant="base" as="label" htmlFor={item.id}>
                {item.label}
              </Typography>
            </Item>

            <Item NAME="editGroupForm-input">
              <TextInput
                autoFocus={item.autoFocus}
                name={item.name}
                id={item.id}
                type={item.type}
                value={state[item.name]}
                onChange={this.handleInputChange}
                error={errors[item.name]}
                disabled={isLoading}
                maxLength="50"
              />
            </Item>
          </Box>
        ))}

        <Box NAME="editGroupForm-buttons" justify="flex-end">
          <Item margin="inline-s">
            <Button
              type="submit"
              variant="primary"
              onClick={this.handleSubmit}
              disabled={isLoading}
            >
              Save
            </Button>
          </Item>

          <Item>
            <Button
              type="button"
              variant="secondary"
              onClick={handleEditFormToggle}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </Item>

          <Item style={{ marginLeft: "auto" }}>
            <Button
              type="button"
              variant="text"
              onClick={this.handleDelete}
              disabled={isLoading}
            >
              Delete Group
            </Button>
          </Item>
        </Box>
      </StyledEditGroupForm>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      group: state.group
    }),
    {
      getGroup: getGroup,
      setFlashMessage: setFlashMessage,
      deleteGroup: deleteGroup,
      editGroup: editGroup
    }
  )(EditGroupForm)
);
