import React, { Component } from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { Button, Typography, Photo } from "../../../../../components/elements";
import { Item, Box, Container, Area } from "../../../../../layout";

const StyledDepartment = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  .container-department-main {
    height: 90%;
    background-color: ${p => p.theme.color.white};
    overflow-y: auto;
  }

  .container-department-close {
    position: absolute;
    top: var(--size-base);
    right: var(--size-base);
  }

  .area-department-header {
    background-color: ${p => p.theme.color.grey.light};
    border-bottom: 1px solid ${p => p.theme.color.dark};
    /* padding-bottom: ${p => p.theme.size.s}; */
  }

  .item-department-icon {
    width: ${p => p.theme.size.m};
  }

  .area-department-content {
    display: flex;
  }

  .area-department-back {
    background-color: ${p => p.theme.color.primary.dark};
    opacity: 0.8;
    height: 10%;
  }
`;

export class Department extends Component {
  render() {
    const { history } = this.props;

    return (
      <StyledDepartment>
        <Container NAME="department-close">
          <Item>
            <Button
              variant="secondary"
              icon
              rounded
              as={Link}
              to="/admin/departments"
            >
              <i className="fas fa-times" />
            </Button>
          </Item>
        </Container>

        <Container NAME="department-main">
          <Area NAME="department-header" padding="inset-base">
            <Box wrap align="flex-start">
              <Item margin="stack-base">
                <Typography variant="display-1">
                  Technical Support Group
                </Typography>
              </Item>

              {/* <Item margin="wrap-base">
              <Button>
                <Item margin="inline-s">
                  <i className="fas fa-plus" />
                </Item>
                Add Trainee
              </Button>
            </Item> */}
            </Box>

            <Item margin="stack-base">
              <Typography variant="caption">
                <Item NAME="department-icon" center inline margin="inline-s">
                  <i className="fas fa-map-marker-alt" />
                </Item>
                2nd Level South Wing
              </Typography>
            </Item>

            <Item>
              <Typography variant="caption">
                <Item NAME="department-icon" center inline margin="inline-s">
                  <i className="fas fa-phone" />
                </Item>
                21968
              </Typography>
            </Item>
          </Area>

          <Area NAME="department-content" padding="inset-base">
            <Container margin="inline-xl">
              <Container margin="stack-l">
                <Box margin="stack-m" align="center">
                  <Item margin="inline-m">
                    <Typography variant="display-2">Supervisors</Typography>
                  </Item>

                  <Item>
                    <Button variant="primary" variant="primary" icon rounded>
                      <i className="fas fa-plus" />
                    </Button>
                  </Item>
                </Box>

                <Box column>
                  <Item margin="stack-m">
                    <UserListItem />
                  </Item>

                  <Item margin="stack-m">
                    <UserListItem />
                  </Item>
                </Box>
              </Container>

              <Container>
                <Box margin="stack-m" align="center">
                  <Item margin="inline-m">
                    <Typography variant="display-2">Employees</Typography>
                  </Item>

                  <Item>
                    <Button variant="primary" icon rounded>
                      <i className="fas fa-plus" />
                    </Button>
                  </Item>
                </Box>

                <Box column>
                  <Item margin="stack-m">
                    <UserListItem />
                  </Item>

                  <Item margin="stack-m">
                    <UserListItem />
                  </Item>
                </Box>
              </Container>
            </Container>

            <Container>
              <Box margin="stack-m" align="center">
                <Item margin="inline-m">
                  <Typography variant="display-2">Trainees</Typography>
                </Item>

                <Item>
                  <Button icon rounded>
                    <i className="fas fa-plus" />
                  </Button>
                </Item>
              </Box>

              <Box column>
                <Item margin="stack-m">
                  <UserListItem />
                </Item>

                <Item margin="stack-m">
                  <UserListItem />
                </Item>

                <Item margin="stack-m">
                  <UserListItem />
                </Item>

                <Item margin="stack-m">
                  <UserListItem />
                </Item>

                <Item margin="stack-m">
                  <UserListItem />
                </Item>
              </Box>
            </Container>
          </Area>
        </Container>

        <Area
          NAME="department-back"
          onClick={() => {
            history.push("/admin/departments");
          }}
        />
      </StyledDepartment>
    );
  }
}

export default withRouter(Department);

const StyledUserListItem = styled.div`
  /* border: 1px solid magenta; */
  height: var(--size-button);
  display: flex;
  align-items: center;

  > .item-photo {
    width: var(--size-button);
    height: var(--size-button);
  }
`;

const UserListItem = () => {
  return (
    <StyledUserListItem>
      <Item NAME="photo" margin="inline-m">
        <Photo rounded>
          <img
            src="https://images-na.ssl-images-amazon.com/images/M/MV5BNWRmYWVlNmQtNTRiOS00YjBjLWE0MDAtNWYwZGVkMjgwY2M0XkEyXkFqcGdeQXVyMTgwMTYzNQ@@._V1_UY256_CR106,0,172,256_AL_.jpg"
            alt=""
          />
        </Photo>
      </Item>

      <Item>
        <Typography variant="body">Steven Universe</Typography>
      </Item>
    </StyledUserListItem>
  );
};
