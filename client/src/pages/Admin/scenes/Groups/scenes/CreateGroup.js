import React, { Component } from "react";
import styled from "styled-components";
import { Spring } from "react-spring/renderprops";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import { Button, Typography, Photo } from "src/components/elements";
import { TextInput } from "src/components/compounds";
import { Item, Box, Container, Area } from "src/layout";

import { getGroups } from "src/pages/Admin/scenes/Groups/groupsActionCreators";

const StyledCreateGroup = styled.div`
  /* border: 1px solid magenta; */
  width: 100%;
  height: 100%;
  position: relative;
  display: grid;
  grid-template-areas:
    "header back"
    "body back";
  grid-template-rows: auto 3fr;
  grid-template-columns: 3fr 1fr;

  > * {
    z-index: 100;
  }

  .area-createGroup-header {
    background-color: ${p => p.theme.color.grey.light};
    grid-area: header;
    display: flex;
  }

  .container-close {
    margin-left: auto;
  }

  .area-createGroup-body {
    grid-area: body;
    background-color: ${p => p.theme.color.white};
    overflow-y: auto;
  }

  .area-back {
    grid-area: back;
    grid-column: 1 / -1;
    background-image: linear-gradient(
      to top right,
      ${p => p.theme.color.primary.dark},
      ${p => p.theme.color.primary.main}
    );
    opacity: 0.8;
    z-index: 99;
  }

  .item-icon {
    width: ${p => p.theme.size.m};
  }

  .area-content {
    display: flex;
  }

  .item-createGroup-input-name {
    width: ${p => p.theme.incrementFixed(6)};
  }

  .item-createGroup-input {
    width: ${p => p.theme.incrementFixed(16)};
  }
`;

export class CreateGroup extends Component {
  state = {
    data: {
      name: "",
      location: "",
      phoneNumber: ""
    },
    isLoading: false,
    errors: {}
  };

  handleInputChange = e => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({ ...this.state, isLoading: true, errors: {} }, () => {
      axios
        .post("/api/groups", this.state.data)
        .then(res => {
          this.setState({ ...this.state, data: res.data }, () => {
            this.props.getGroups();
            this.props.history.goBack();
          });
        })
        .catch(err => {
          this.setState({
            ...this.state,
            errors: err.response.data.errors,
            isLoading: false
          });
        });
    });
  };

  render() {
    const { history } = this.props;
    const { isLoading, data, errors } = this.state;

    return (
      <StyledCreateGroup>
        <Spring
          delay={100}
          native
          from={{ transform: "translateX(-100%)" }}
          to={{ transform: "translateX(0%)" }}
        >
          {style => (
            <Area
              NAME="createGroup-header"
              padding="inset-base"
              animate={style}
            >
              <Item>
                <Typography variant="display-1">Create Group</Typography>
              </Item>

              <Container NAME="close">
                <Item>
                  <Button
                    variant="secondary"
                    icon
                    rounded
                    as={Link}
                    to="/admin/groups"
                  >
                    <i className="fas fa-times" />
                  </Button>
                </Item>
              </Container>
            </Area>
          )}
        </Spring>

        <Spring
          delay={100}
          native
          from={{ transform: "translateX(-100%)" }}
          to={{ transform: "translateX(0%)" }}
        >
          {style => (
            <Area
              NAME="createGroup-body"
              padding="inset-base"
              animate={style}
              as="form"
            >
              {[
                {
                  label: "Group Name*",
                  name: "name",
                  type: "text",
                  id: "group-name-input"
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
                  <Item NAME="createGroup-input-name" left margin="inline-base">
                    <Typography variant="base" as="label" htmlFor={item.id}>
                      {item.label}
                    </Typography>
                  </Item>

                  <Item NAME="createGroup-input">
                    <TextInput
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

              <Item>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={this.handleSubmit}
                  disabled={isLoading}
                >
                  Create Group
                </Button>
              </Item>
            </Area>
          )}
        </Spring>

        <Area
          NAME="back"
          onClick={() => {
            history.push("/admin/groups");
          }}
        />
      </StyledCreateGroup>
    );
  }
}

export default withRouter(
  connect(
    null,
    {
      getGroups: getGroups
    }
  )(CreateGroup)
);
