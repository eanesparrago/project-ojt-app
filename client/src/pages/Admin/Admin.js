import React, { Component } from "react";
import styled from "styled-components";
import { Button, Typography, Photo } from "../../components/elements";
import { TextInput } from "../../components/compounds";
import { Item, Box, Container, Area } from "../../layout";
import profileImage from "./profile.png";

import DepartmentCard from "./components/DepartmentCard";

const StyledAdmin = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;

  > .area-header {
    /* border: 1px solid magenta; */
    width: 100%;
    /* height: ${p => p.theme.incrementFixed(2)}; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* padding-left: ${p => p.theme.size.base};
    padding-right: ${p => p.theme.size.base}; */
    background-color: ${p => p.theme.color.dark};
    color: ${p => p.theme.color.light};
  }

  > .container-main {
    /* border: 1px solid cyan; */
    flex-grow: 1;
    display: flex;

    .area-sidebar {
      /* border: 1px solid orange; */
      width: ${p => p.theme.incrementFixed(10)};
      height: 100%;
      display: flex;
      flex-flow: column;
      background-color: ${p => p.theme.color.white};
      border-right: 1px solid ${p => p.theme.color.dark};
    }

    .container-profile {
      /* border: 1px solid magenta; */
      display: flex;
      flex-flow: column;
      align-items: center;
      /* outline: 2px solid ${p => p.theme.color.light};
      outline-offset: calc(var(--size-m) * -1); */
      position: relative;
      text-align: center;
    }

    .item-profile-photo {
      width: ${p => p.theme.increment(6)};
      height: ${p => p.theme.increment(6)};
    }

    .item-divider {
      height: 1px;
      width: calc(100% - var(--size-base) * 2);
      background-color: ${p => p.theme.color.dark};
      position: absolute;
      bottom: 0;
    }

    .area-content {
      /* border: 1px solid green; */
      height: 100%;
      flex-grow: 1;
      background-color: ${p => p.theme.color.light};
    }
  }
`;

export class Admin extends Component {
  render() {
    return (
      <StyledAdmin>
        <Area name="header" padding="inset-m">
          <Item>
            <Typography variant="display-4">SPi OJT App</Typography>
          </Item>

          <Item>
            <Button variant="text" icon>
              <i className="fas fa-ellipsis-h" />
            </Button>
          </Item>
        </Area>

        <Container name="main">
          <Area name="sidebar">
            <Container name="profile" padding="inset-base">
              <Item name="profile-photo" margin="stack-m">
                <Photo rounded>
                  <img src={profileImage} alt="" />
                </Photo>
              </Item>

              <Item margin="stack-m">
                <Typography variant="display-3">Steven Universe</Typography>
              </Item>

              <Item>
                <Typography variant="display-4">Administrator</Typography>
              </Item>

              <Item name="divider" />
            </Container>

            <Box column padding="inset-m">
              <Item margin="stack-s">
                <Button variant="text">
                  <Item center style={{ width: "1rem" }} margin="inline-s">
                    <i className="fas fa-briefcase" />
                  </Item>
                  Departments
                </Button>
              </Item>

              <Item>
                <Button variant="text">
                  <Item center style={{ width: "1rem" }} margin="inline-s">
                    <i className="fas fa-users" />
                  </Item>
                  Trainees
                </Button>
              </Item>
            </Box>
          </Area>

          <Area name="content" padding="inset-base">
            <Box margin="stack-l">
              <Item margin="inline-base">
                <Typography variant="display-1">Departments</Typography>
              </Item>

              <Item>
                <Button>Add Department</Button>
              </Item>
            </Box>

            <Box wrap>
              <Item margin="wrap-base">
                <DepartmentCard />
              </Item>

              <Item margin="wrap-base">
                <DepartmentCard />
              </Item>
              
              <Item margin="wrap-base">
                <DepartmentCard />
              </Item>

              <Item margin="wrap-base">
                <DepartmentCard />
              </Item>

              <Item margin="wrap-base">
                <DepartmentCard />
              </Item>
            </Box>
          </Area>
        </Container>
      </StyledAdmin>
    );
  }
}

export default Admin;
