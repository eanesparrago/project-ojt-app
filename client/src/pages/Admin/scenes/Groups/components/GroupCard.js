import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Button, Typography, Photo } from "../../../../../components/elements";
import { Item, Box, Container, Area } from "../../../../../layout";

const StyledGroupCard = styled.div`
  /* border: 1px solid magenta; */
  width: ${p => p.theme.incrementFixed(16)};
  background-color: ${p => p.theme.color.white};
  box-shadow: ${p => p.theme.shadow[1]};
  /* border: 1px solid ${p => p.theme.color.primary.main}; */
  border-radius: ${p => p.theme.size.base};
  overflow: hidden;
  transition-duration: 100ms;
  transition-property: box-shadow;
  transition-timing-function: ease-out;
  display: flex;
  flex-flow: column;

  .container-groupCard {
    flex-grow: 1;
  }

  .item-groupCard-button {

  }

  &:hover {
    box-shadow: ${p => p.theme.shadow[2]};
  }

  .item-cover {
    height: ${p => p.theme.incrementFixed(9)};
  }

  .item-avatar {
    width: var(--size-button);
    height: var(--size-button);
  }

  .item-icon {
    width: ${p => p.theme.size.m};
  }
`;

export class GroupCard extends Component {
  // static defaultProps = {
  //   data: {
  //     name: "default name",
  //     location: "default location",
  //     phoneNumber: "default phoneNumber"
  //   }
  // };

  render() {
    const { match, data } = this.props;

    return (
      <StyledGroupCard>
        <Container NAME="groupCard" padding="inset-base">
          <Item margin="stack-base">
            <Typography variant="display-3">{data.name}</Typography>
          </Item>

          {data.location ? (
            <Box margin="stack-m">
              <Item top NAME="icon" inline center margin="inline-s">
                <i className="fas fa-map-marker-alt" />
              </Item>

              <Item center>
                <Typography variant="caption">{data.location}</Typography>
              </Item>
            </Box>
          ) : null}

          {data.phoneNumber ? (
            <Box margin="stack-base">
              <Item top NAME="icon" inline center margin="inline-s">
                <i className="fas fa-phone" />
              </Item>

              <Item center>
                <Typography variant="caption">{data.phoneNumber}</Typography>
              </Item>
            </Box>
          ) : null}

          <Item margin="stack-s">
            <Typography variant="display-4">Supervisors</Typography>
          </Item>

          <Box margin="stack-base" wrap>
            <Item NAME="avatar" margin="inline-s">
              <Button
                variant="photo"
                rounded
                as={Link}
                to={`${match.url}/person/123`}
              >
                <img
                  src="https://images-na.ssl-images-amazon.com/images/M/MV5BNWRmYWVlNmQtNTRiOS00YjBjLWE0MDAtNWYwZGVkMjgwY2M0XkEyXkFqcGdeQXVyMTgwMTYzNQ@@._V1_UY256_CR106,0,172,256_AL_.jpg"
                  alt=""
                />
              </Button>
            </Item>

            <Item NAME="avatar" margin="inline-s">
              <Button variant="photo" rounded>
                <img
                  src="https://images-na.ssl-images-amazon.com/images/M/MV5BMTk4NzUxNTU3Nl5BMl5BanBnXkFtZTgwNjIzMzY5NzE@._V1_UY256_CR42,0,172,256_AL_.jpg"
                  alt=""
                />
              </Button>
            </Item>

            <Item NAME="avatar" margin="inline-s">
              <Button variant="photo" rounded>
                <img
                  src="https://m.media-amazon.com/images/M/MV5BMTM2NzI3NTU5Nl5BMl5BanBnXkFtZTcwODkxODAwNA@@._V1_UY256_CR9,0,172,256_AL_.jpg"
                  alt=""
                />
              </Button>
            </Item>
          </Box>

          <Item margin="stack-s">
            <Typography variant="display-4">Trainees</Typography>
          </Item>

          <Box margin="stack-base" wrap>
            <Item NAME="avatar" margin="inline-s">
              <Button variant="photo" rounded>
                <img
                  src="https://images-na.ssl-images-amazon.com/images/M/MV5BNWRmYWVlNmQtNTRiOS00YjBjLWE0MDAtNWYwZGVkMjgwY2M0XkEyXkFqcGdeQXVyMTgwMTYzNQ@@._V1_UY256_CR106,0,172,256_AL_.jpg"
                  alt=""
                />
              </Button>
            </Item>

            <Item NAME="avatar" margin="inline-s">
              <Button variant="photo" rounded>
                <img
                  src="https://images-na.ssl-images-amazon.com/images/M/MV5BMTk4NzUxNTU3Nl5BMl5BanBnXkFtZTgwNjIzMzY5NzE@._V1_UY256_CR42,0,172,256_AL_.jpg"
                  alt=""
                />
              </Button>
            </Item>

            <Item NAME="avatar" margin="inline-s">
              <Button variant="photo" rounded>
                <img
                  src="https://m.media-amazon.com/images/M/MV5BMTM2NzI3NTU5Nl5BMl5BanBnXkFtZTcwODkxODAwNA@@._V1_UY256_CR9,0,172,256_AL_.jpg"
                  alt=""
                />
              </Button>
            </Item>
          </Box>

          <Item margin="stack-s">
            <Typography variant="display-4">Employees</Typography>
          </Item>

          <Box wrap>
            <Item NAME="avatar" margin="inline-s">
              <Button variant="photo" rounded>
                <img
                  src="https://images-na.ssl-images-amazon.com/images/M/MV5BNWRmYWVlNmQtNTRiOS00YjBjLWE0MDAtNWYwZGVkMjgwY2M0XkEyXkFqcGdeQXVyMTgwMTYzNQ@@._V1_UY256_CR106,0,172,256_AL_.jpg"
                  alt=""
                />
              </Button>
            </Item>

            <Item NAME="avatar" margin="inline-s">
              <Button variant="photo" rounded>
                <img
                  src="https://images-na.ssl-images-amazon.com/images/M/MV5BMTk4NzUxNTU3Nl5BMl5BanBnXkFtZTgwNjIzMzY5NzE@._V1_UY256_CR42,0,172,256_AL_.jpg"
                  alt=""
                />
              </Button>
            </Item>

            <Item NAME="avatar" margin="inline-s">
              <Button variant="photo" rounded>
                <img
                  src="https://m.media-amazon.com/images/M/MV5BMTM2NzI3NTU5Nl5BMl5BanBnXkFtZTcwODkxODAwNA@@._V1_UY256_CR9,0,172,256_AL_.jpg"
                  alt=""
                />
              </Button>
            </Item>
          </Box>
        </Container>

        <Item NAME="groupCard-view-button" padding="inset-base">
          <Button
            as={Link}
            to={`${match.url}/group/${data._id}`}
            variant="secondary"
            full
          >
            View Group
          </Button>
        </Item>
      </StyledGroupCard>
    );
  }
}

export default withRouter(GroupCard);
