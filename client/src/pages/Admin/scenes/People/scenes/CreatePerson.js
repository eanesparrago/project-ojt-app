import React, { Component } from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { Button, Typography, Photo } from "../../../../../components/elements";
import { TextInput } from "../../../../../components/compounds";
import { Item, Box, Container, Area } from "../../../../../layout";

const StyledCreatePerson = styled.div`
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

  .area-createPerson-header {
    grid-area: header;
    background-color: ${p => p.theme.color.grey.light};
    display: flex;
    /* color: ${p => p.theme.color.light}; */
    /* padding-bottom: ${p => p.theme.size.s}; */
  }

  .container-close {
    margin-left: auto;
  }

  .area-createPerson-body {
    /* border: 1px solid magenta; */
    grid-area: body;
    background-color: ${p => p.theme.color.white};
    overflow-y: auto;
  }

  .area-back {
    grid-area: back;
    background-color: ${p => p.theme.color.primary.dark};
    background-image: linear-gradient(to top right, ${p =>
      p.theme.color.primary.dark}, ${p => p.theme.color.primary.main});
    opacity: 0.8;
  }

  .item-icon {
    width: ${p => p.theme.size.m};
  }



  .item-input-name {
    width: ${p => p.theme.incrementFixed(6)};
  }

  .item-input {
    width: ${p => p.theme.incrementFixed(16)};
  }
`;

export class CreatePerson extends Component {
  render() {
    const { history } = this.props;

    return (
      <StyledCreatePerson>
        <Area NAME="createPerson-header" padding="inset-base">
          <Item>
            <Typography variant="display-1">Create Person</Typography>
          </Item>

          <Container NAME="close">
            <Item>
              <Button
                variant="secondary"
                icon
                rounded
                as={Link}
                to="/admin/people"
              >
                <i className="fas fa-times" />
              </Button>
            </Item>
          </Container>
        </Area>

        <Area NAME="createPerson-body" padding="inset-base">
          <Box margin="stack-base">
            <Item NAME="input-name" left margin="inline-base">
              <Typography>First Name</Typography>
            </Item>

            <Item NAME="input">
              <TextInput variant="compact" />
            </Item>
          </Box>

          <Box margin="stack-base">
            <Item NAME="input-name" left margin="inline-base">
              <Typography>Middle Name</Typography>
            </Item>

            <Item NAME="input">
              <TextInput variant="compact" />
            </Item>
          </Box>

          <Box margin="stack-l">
            <Item NAME="input-name" left margin="inline-base">
              <Typography>Last Name</Typography>
            </Item>

            <Item NAME="input">
              <TextInput variant="compact" />
            </Item>
          </Box>

          <Box margin="stack-l">
            <Item NAME="input-name" left margin="inline-base">
              <Typography>Nick Name</Typography>
            </Item>

            <Item NAME="input">
              <TextInput variant="compact" />
            </Item>
          </Box>

          <Box margin="stack-l">
            <Item NAME="input-name" left margin="inline-base">
              <Typography>Address</Typography>
            </Item>

            <Item NAME="input">
              <TextInput variant="compact" />
            </Item>
          </Box>

          <Box margin="stack-l">
            <Item NAME="input-name" left margin="inline-base">
              <Typography>Contact Number</Typography>
            </Item>

            <Item NAME="input">
              <TextInput variant="compact" />
            </Item>
          </Box>

          <Box margin="stack-l">
            <Item NAME="input-name" left margin="inline-base">
              <Typography>Date of Birth</Typography>
            </Item>

            <Item NAME="input">
              <TextInput variant="compact" />
            </Item>
          </Box>

          <Box margin="stack-l">
            <Item NAME="input-name" left margin="inline-base">
              <Typography>School</Typography>
            </Item>

            <Item NAME="input">
              <TextInput variant="compact" />
            </Item>
          </Box>

          <Box margin="stack-l">
            <Item NAME="input-name" left margin="inline-base">
              <Typography>Required Hours</Typography>
            </Item>

            <Item NAME="input">
              <TextInput variant="compact" />
            </Item>
          </Box>

          <Box margin="stack-l">
            <Item NAME="input-name" left margin="inline-base">
              <Typography>OJT Adviser</Typography>
            </Item>

            <Item NAME="input">
              <TextInput variant="compact" />
            </Item>
          </Box>

          <Box margin="stack-l">
            <Item NAME="input-name" left margin="inline-base">
              <Typography>OJT Adviser Contact Number</Typography>
            </Item>

            <Item NAME="input">
              <TextInput variant="compact" />
            </Item>
          </Box>

          <Box margin="stack-l">
            <Item NAME="input-name" left margin="inline-base">
              <Typography>Guardian Name</Typography>
            </Item>

            <Item NAME="input">
              <TextInput variant="compact" />
            </Item>
          </Box>

          <Box margin="stack-l">
            <Item NAME="input-name" left margin="inline-base">
              <Typography>Guardian Contact</Typography>
            </Item>

            <Item NAME="input">
              <TextInput variant="compact" />
            </Item>
          </Box>

          <Box margin="stack-l">
            <Item NAME="input-name" left margin="inline-base">
              <Typography>Proxy ID</Typography>
            </Item>

            <Item NAME="input">
              <TextInput variant="compact" />
            </Item>
          </Box>

          <Item margin="stack-l">
            <Button variant="primary">Create Person</Button>
          </Item>
        </Area>

        <Area
          NAME="back"
          onClick={() => {
            history.push("/admin/people");
          }}
        />
      </StyledCreatePerson>
    );
  }
}

export default withRouter(CreatePerson);
