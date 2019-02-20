import React, { Component } from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { Button, Typography, Photo } from "../../../../../components/elements";
import { Item, Box, Container, Area } from "src/layout";

const StyledDepartment = styled.div`
  /* border: 1px solid magenta; */
  width: 100%;
  height: 100%;
  position: relative;
  display: grid;
  grid-template-areas:
    "header announcements activity"
    "people announcements activity"
    /* "back back back"; */;
  grid-template-rows: 1fr;
  grid-template-columns: 3fr 2fr 2fr;
 
  .container-department-close {
    position: absolute;
    top: var(--size-base);
    right: var(--size-base);
  }

  /* >>> Header */
  .area-department-header {
    grid-area: header;
    background-color: ${p => p.theme.color.white};

    /* background-color: ${p => p.theme.color.grey.light};
    border-bottom: 1px solid ${p => p.theme.color.dark}; */
    /* border-right: 1px solid ${p => p.theme.color.dark}; */
  }

  /* >>> People */
  .area-department-people {
    /* border: 1px solid magenta; */
    grid-area: people;
    display: grid;
    grid-template-columns: 1fr 1fr;
    background-color: ${p => p.theme.color.white};
    overflow-y: auto;
    /* border-right: 1px solid ${p => p.theme.color.dark}; */
  }

  .container-department-supervisors {
    /* border: 1px solid magenta; */
    padding-top: var(--size-s);
    overflow-y: auto;
  }

  .container-department-trainees {
    /* border: 1px solid magenta; */
    padding-top: var(--size-xs);
    overflow-y: auto;

  }

    /* >>> Announcements */
  .area-department-announcements {
    grid-area: announcements;
    background-color: ${p => p.theme.color.white};
    display: flex;
    flex-flow: column;

    /* border-right: 1px solid ${p => p.theme.color.dark}; */
  }

  .container-department-announcements-header {
    /* border-bottom: 1px solid ${p => p.theme.color.dark}; */
  }

  .container-department-announcements-content {
    padding-top: var(--size-xs);
    overflow: auto;
  }

    /* >>> Activty */
  .area-department-activity {
    grid-area: activity;
    background-color: ${p => p.theme.color.white};
    display: flex;
    flex-flow: column;
  }

  .container-department-activity-header {
    /* border-bottom: 1px solid ${p => p.theme.color.dark}; */
  }

  .container-department-activity-content {
    padding-top: var(--size-xs);
    overflow: auto;
  }

  .area-department-back {
    grid-area: back;
    background-color: ${p => p.theme.color.primary.dark};
    opacity: 0.8;
  }

  .item-department-icon {
    width: ${p => p.theme.size.m};
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

        {/* >>> Header */}
        <Area NAME="department-header" padding="inset-base">
          <Box wrap align="flex-start">
            <Item margin="stack-base">
              <Typography variant="display-1">
                Technical Support Group
              </Typography>
            </Item>
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

        {/* >>> People */}
        <Area NAME="department-people">
          <Container NAME="department-supervisors" padding="inset-base">
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
                {Array(15)
                  .fill(null)
                  .map(item => (
                    <Item margin="stack-m">
                      <UserListItem />
                    </Item>
                  ))}
              </Box>
            </Container>
          </Container>

          {/* >>> Trainees */}
          <Container NAME="department-trainees" padding="inset-base">
            <Box margin="stack-m" align="center">
              <Item margin="inline-m">
                <Typography variant="display-2">Trainees</Typography>
              </Item>

              <Item>
                <Button variant="primary" icon rounded>
                  <i className="fas fa-plus" />
                </Button>
              </Item>
            </Box>

            <Box column>
              {Array(10)
                .fill(null)
                .map(item => (
                  <Item margin="stack-m">
                    <UserListItem />
                  </Item>
                ))}
            </Box>
          </Container>
        </Area>

        {/* >>> Announcements */}
        <Area NAME="department-announcements">
          <Container
            NAME="department-announcements-header"
            padding="inset-base"
          >
            <Box align="center">
              <Item margin="inline-base">
                <Typography variant="display-2">Announcements</Typography>
              </Item>

              <Item>
                <Button variant="primary" variant="primary" icon rounded>
                  <i className="fas fa-plus" />
                </Button>
              </Item>
            </Box>
          </Container>

          <Container
            NAME="department-announcements-content"
            padding="inset-base"
          >
            {Array(3)
              .fill(null)
              .map(item => (
                <Item margin="stack-base">
                  <AnnouncementItem />
                </Item>
              ))}
          </Container>
        </Area>

        {/* >>> Activity */}
        <Area NAME="department-activity">
          <Container NAME="department-activity-header" padding="inset-base">
            <Box align="center">
              <Item margin="inline-base">
                <Typography variant="display-2">Activity</Typography>
              </Item>

              <Item style={{ visibility: "hidden" }}>
                <Button variant="primary" variant="primary" icon rounded>
                  <i className="fas fa-plus" />
                </Button>
              </Item>
            </Box>
          </Container>

          <Container NAME="department-activity-content" padding="inset-base">
            {Array(5)
              .fill(null)
              .map(item => (
                <Item margin="stack-l">
                  <ActivityItem />
                </Item>
              ))}
          </Container>
        </Area>

        {/* >>> Back */}
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
      <Item NAME="photo" margin="inline-s">
        <Photo rounded>
          <img
            src="https://images-na.ssl-images-amazon.com/images/M/MV5BNWRmYWVlNmQtNTRiOS00YjBjLWE0MDAtNWYwZGVkMjgwY2M0XkEyXkFqcGdeQXVyMTgwMTYzNQ@@._V1_UY256_CR106,0,172,256_AL_.jpg"
            alt=""
          />
        </Photo>
      </Item>

      <Item>
        <Typography variant="normal">Steven Universe</Typography>
      </Item>
    </StyledUserListItem>
  );
};

const StyledAnnouncementItem = styled.article`
  border-bottom: 1px solid ${p => p.theme.color.primary.light};

  .container-announcementItem-header {
    display: flex;
    align-items: center;
  }

  .item-announcementItem-photo {
    width: var(--size-button);
    height: var(--size-button);
  }

  .item-announcementItem-date {
    /* border: 1px solid magenta; */
    margin-left: auto;
  }
`;

const AnnouncementItem = () => {
  return (
    <StyledAnnouncementItem>
      <Container NAME="announcementItem-header" margin="stack-m">
        <Item NAME="announcementItem-photo" margin="inline-s">
          <Button variant="photo" rounded>
            <img
              src="https://m.media-amazon.com/images/M/MV5BMTM2NzI3NTU5Nl5BMl5BanBnXkFtZTcwODkxODAwNA@@._V1_UY256_CR9,0,172,256_AL_.jpg"
              alt=""
            />
          </Button>
        </Item>

        <Container>
          <Item margin="stack-s">
            <Typography variant="display-4" as="h1">
              Steven Universe
            </Typography>
          </Item>

          <Item NAME="announcementItem-date">
            <Typography variant="caption">
              February 18, 2019, 12:00 pm
            </Typography>
          </Item>
        </Container>
      </Container>

      <Item margin="stack-base">
        <Typography variant="body" as="p">
          Incididunt incididunt incididunt id occaecat consequat duis. Aliqua
          ipsum ea et et nulla quis labore sunt est voluptate sit et. Elit sunt
          deserunt est sint. Duis ipsum ad ea veniam quis incididunt. Esse do
          sunt aute et esse pariatur irure aliqua officia occaecat fugiat
          nostrud nisi. Amet occaecat exercitation magna ullamco commodo
          occaecat ex cupidatat minim deserunt et aliquip velit et. In elit
          veniam aliquip proident ipsum.
        </Typography>
      </Item>
    </StyledAnnouncementItem>
  );
};

const StyledActivityItem = styled.article`
  display: flex;
  /* border-bottom: 1px solid ${p => p.theme.color.dark}; */

  .container-activityItem-content {
    padding-top: var(--size-xs);
  }

  .item-activityItem-photo {
    width: var(--size-button);
    height: var(--size-button);
  }
`;

const ActivityItem = () => {
  return (
    <StyledActivityItem>
      <Item NAME="activityItem-photo" margin="inline-s">
        <Button variant="photo" rounded>
          <img
            src="https://m.media-amazon.com/images/M/MV5BMTM2NzI3NTU5Nl5BMl5BanBnXkFtZTcwODkxODAwNA@@._V1_UY256_CR9,0,172,256_AL_.jpg"
            alt=""
          />
        </Button>
      </Item>

      <Container NAME="activityItem-content">
        <Item margin="stack-s">
          <Typography as="p">
            <Typography bold inline>
              Steven Universe
            </Typography>{" "}
            timed out.
          </Typography>
        </Item>

        <Item>
          <Typography variant="caption">February 18, 2019, 12:00 pm</Typography>
        </Item>
      </Container>
    </StyledActivityItem>
  );
};
