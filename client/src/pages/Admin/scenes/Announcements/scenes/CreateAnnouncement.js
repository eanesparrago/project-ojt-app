import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { Spring } from "react-spring/renderprops";
import { Link, withRouter } from "react-router-dom";
import { Button, Typography } from "../../../../../components/elements";
import {
  TextInput,
  RadioInput,
  SelectInput,
  TextAreaInput
} from "../../../../../components/compounds";
import { Item, Box, Container, Area } from "../../../../../layout";

const StyledCreateAnnouncement = styled.div`
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

  .area-createAnnouncement-header {
    grid-area: header;
    background-color: ${p => p.theme.color.grey.light};
    display: flex;
  }

  .container-createAnnouncement-close {
    margin-left: auto;
  }

  .area-createAnnouncement-body {
    /* border: 1px solid magenta; */
    grid-area: body;
    background-color: ${p => p.theme.color.white};
    overflow-y: auto;
  }

  .area-createAnnouncement-back {
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

  .item-createAnnouncement-divider {
    width: 100%;
    height: var(--size-xxs);
    background-color: ${p => p.theme.color.primary.light};
  }

  .item-createAnnouncement-input-name {
    width: ${p => p.theme.incrementFixed(6)};
  }

  .item-createAnnouncement-input {
    width: ${p => p.theme.incrementFixed(16)};
  }
`;

export class CreateAnnouncement extends Component {
  state = {
    person: {
      role: "",
      group: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      requiredHours: "",
      firstName: "",
      middleName: "",
      lastName: "",
      nickname: "",
      gender: "",
      dateOfBirth: "",
      address: "",
      contactNumber: "",
      school: "",
      adviserName: "",
      adviserContactNumber: "",
      guardianName: "",
      guardianContactNumber: ""
    }
  };

  handleInputChange = e => {
    this.setState({
      person: { ...this.state.person, [e.target.name]: e.target.value }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
  };

  render() {
    const { history } = this.props;

    return (
      <StyledCreateAnnouncement>
        {/* >>> AREA: header */}
        <Spring
          delay={100}
          native
          from={{ transform: "translateX(-100%)" }}
          to={{ transform: "translateX(0%)" }}
        >
          {style => (
            <Area
              NAME="createAnnouncement-header"
              padding="inset-base"
              as="header"
              animate={style}
            >
              <Item>
                <Typography variant="display-1" as="h1">
                  Create Announcement
                </Typography>
              </Item>

              <Container NAME="createAnnouncement-close">
                <Item>
                  <Button
                    variant="secondary"
                    icon
                    rounded
                    as={Link}
                    to="/admin/announcements"
                  >
                    <i className="fas fa-times" />
                  </Button>
                </Item>
              </Container>
            </Area>
          )}
        </Spring>

        {/* >>> AREA: body */}
        <Spring
          delay={100}
          native
          from={{ transform: "translateX(-100%)" }}
          to={{ transform: "translateX(0%)" }}
        >
          {style => (
            <Area
              NAME="createAnnouncement-body"
              padding="inset-base"
              animate={style}
            >
              {/* >>> GROUP */}
              <Box margin="stack-base">
                <Item
                  NAME="createAnnouncement-input-name"
                  left
                  margin="inline-base"
                >
                  <Typography
                    variant="display-3"
                    as="label"
                    htmlFor="group-input"
                  >
                    Group
                  </Typography>
                </Item>

                <Item NAME="createAnnouncement-input">
                  <SelectInput
                    id="group-input"
                    onChange={this.handleInputChange}
                    name="group"
                    options={[
                      {
                        label: "Choose an option",
                        value: ""
                      },
                      {
                        label: "Alpha",
                        value: "alpha"
                      },
                      {
                        label: "Beta",
                        value: "beta"
                      },
                      {
                        label: "Charlie",
                        value: "charlie"
                      }
                    ]}
                  />
                </Item>
              </Box>

              <Box margin="stack-base">
                <Item
                  NAME="createAnnouncement-input-name"
                  topleft
                  margin="inline-base"
                >
                  <Typography
                    variant="display-3"
                    as="label"
                    htmlFor="message-input"
                  >
                    Message
                  </Typography>
                </Item>

                <Item NAME="createAnnouncement-input">
                  <TextAreaInput
                    name=""
                    id="message-input"
                    cols="30"
                    rows="10"
                  />
                </Item>
              </Box>

              <Item margin="stack-l">
                <Button variant="primary" onClick={this.handleSubmit}>
                  Create Announcement
                </Button>
              </Item>
            </Area>
          )}
        </Spring>

        <Area
          NAME="createAnnouncement-back"
          onClick={() => {
            history.push("/admin/announcements");
          }}
        />
      </StyledCreateAnnouncement>
    );
  }
}

export default withRouter(CreateAnnouncement);
