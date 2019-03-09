import React, { Component } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import { Item, Box, Container } from "src/components/blocks";
import { Button, Typography, Photo } from "src/components/elements";
import { TextInput } from "src/components/compounds";

import {
  getGroup,
  getGroups
} from "src/pages/Admin/scenes/Groups/groupsActionCreators";

import { setFlashMessage } from "src/services/session/actions/appActionCreators";

const StyledEditGroupForm = styled.form`
  width: 100%;

  .item-editGroupForm-input-name {
    width: 38%;
  }

  .item-editGroupForm-input {
    width: 62%;
  }

  .box-editGroupForm-buttons {
    /* border: 1px solid magenta; */
  }
`;

export class EditGroupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        name: props.data.name,
        location: props.data.location,
        phoneNumber: props.data.phoneNumber
      },
      isLoading: false,
      errors: {}
    };
  }

  handleInputChange = e => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      data,
      handleEditFormToggle,
      getGroup,
      getGroups,
      setFlashMessage
    } = this.props;
    const { ...state } = this.state;

    this.setState({ ...state, isLoading: true, errors: {} }, () => {
      axios
        .put(`/api/groups/${data._id}`, state.data)
        .then(res => {
          getGroup(data._id);
          getGroups();
          handleEditFormToggle();
          setFlashMessage(
            `${res.data.name} was edited successfully.`,
            "success"
          );
        })
        .catch(err => {
          this.setState({
            ...state,
            errors: err.response.data,
            isLoading: false
          });
        });
    });
  };

  handleDelete = e => {
    e.preventDefault();
    const { data, getGroups, history } = this.props;

    axios
      .delete(`/api/groups/${data._id}`)
      .then(res => {
        getGroups();
        history.goBack();
      })
      .catch(err => {
        getGroups();
        history.goBack();
      });
  };

  render() {
    const { handleEditFormToggle } = this.props;
    const { data, isLoading, errors } = this.state;

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
                value={data[item.name]}
                onChange={this.handleInputChange}
                error={errors[item.name]}
                disabled={isLoading}
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
      data: state.admin.groups.group
    }),
    {
      getGroup: getGroup,
      getGroups: getGroups,
      setFlashMessage: setFlashMessage
    }
  )(EditGroupForm)
);
