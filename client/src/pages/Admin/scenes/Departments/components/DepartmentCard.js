import React, { Component } from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { Button, Typography, Photo } from "../../../../../components/elements";
import { Item, Box, Container, Area } from "../../../../../layout";

const StyledDepartmentCard = styled.div`
  /* border: 1px solid magenta; */
  width: ${p => p.theme.incrementFixed(16)};
  background-color: ${p => p.theme.color.white};
  box-shadow: ${p => p.theme.shadow[1]};
  outline: 1px solid ${p => p.theme.color.dark};
  overflow: hidden;
  transition-duration: 100ms;
  transition-property: box-shadow;
  transition-timing-function: ease-out;

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

export class DepartmentCard extends Component {
  render() {
    const { onDepartmentModalToggle, match } = this.props;

    return (
      <StyledDepartmentCard>
        <Item name="cover">
          <Photo>
            <img src="https://via.placeholder.com/350x150" alt="" />
          </Photo>
        </Item>

        <Container padding="inset-m">
          <Item margin="stack-m">
            <Typography variant="display-3">Technical Support Group</Typography>
          </Item>

          <Item margin="stack-m">
            <Typography variant="caption">
              <Item name="icon" inline center margin="inline-s">
                <i className="fas fa-map-marker-alt" />
              </Item>
              2nd Level South Wing
            </Typography>
          </Item>

          <Item margin="stack-base">
            <Typography variant="caption">
              <Item name="icon" inline center margin="inline-s">
                <i className="fas fa-phone" />
              </Item>
              21968
            </Typography>
          </Item>

          <Item margin="stack-s">
            <Typography variant="display-4">Supervisors</Typography>
          </Item>

          <Box margin="stack-base" wrap>
            <Item name="avatar" margin="inline-s">
              <Button variant="photo" rounded>
                <img
                  src="https://images-na.ssl-images-amazon.com/images/M/MV5BNWRmYWVlNmQtNTRiOS00YjBjLWE0MDAtNWYwZGVkMjgwY2M0XkEyXkFqcGdeQXVyMTgwMTYzNQ@@._V1_UY256_CR106,0,172,256_AL_.jpg"
                  alt=""
                />
              </Button>
            </Item>

            <Item name="avatar" margin="inline-s">
              <Button variant="photo" rounded>
                <img
                  src="https://images-na.ssl-images-amazon.com/images/M/MV5BMTk4NzUxNTU3Nl5BMl5BanBnXkFtZTgwNjIzMzY5NzE@._V1_UY256_CR42,0,172,256_AL_.jpg"
                  alt=""
                />
              </Button>
            </Item>

            <Item name="avatar" margin="inline-s">
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
            <Item name="avatar" margin="inline-s">
              <Button variant="photo" rounded>
                <img
                  src="https://images-na.ssl-images-amazon.com/images/M/MV5BNWRmYWVlNmQtNTRiOS00YjBjLWE0MDAtNWYwZGVkMjgwY2M0XkEyXkFqcGdeQXVyMTgwMTYzNQ@@._V1_UY256_CR106,0,172,256_AL_.jpg"
                  alt=""
                />
              </Button>
            </Item>

            <Item name="avatar" margin="inline-s">
              <Button variant="photo" rounded>
                <img
                  src="https://images-na.ssl-images-amazon.com/images/M/MV5BMTk4NzUxNTU3Nl5BMl5BanBnXkFtZTgwNjIzMzY5NzE@._V1_UY256_CR42,0,172,256_AL_.jpg"
                  alt=""
                />
              </Button>
            </Item>

            <Item name="avatar" margin="inline-s">
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

          <Box margin="stack-base" wrap>
            <Item name="avatar" margin="inline-s">
              <Button variant="photo" rounded>
                <img
                  src="https://images-na.ssl-images-amazon.com/images/M/MV5BNWRmYWVlNmQtNTRiOS00YjBjLWE0MDAtNWYwZGVkMjgwY2M0XkEyXkFqcGdeQXVyMTgwMTYzNQ@@._V1_UY256_CR106,0,172,256_AL_.jpg"
                  alt=""
                />
              </Button>
            </Item>

            <Item name="avatar" margin="inline-s">
              <Button variant="photo" rounded>
                <img
                  src="https://images-na.ssl-images-amazon.com/images/M/MV5BMTk4NzUxNTU3Nl5BMl5BanBnXkFtZTgwNjIzMzY5NzE@._V1_UY256_CR42,0,172,256_AL_.jpg"
                  alt=""
                />
              </Button>
            </Item>

            <Item name="avatar" margin="inline-s">
              <Button variant="photo" rounded>
                <img
                  src="https://m.media-amazon.com/images/M/MV5BMTM2NzI3NTU5Nl5BMl5BanBnXkFtZTcwODkxODAwNA@@._V1_UY256_CR9,0,172,256_AL_.jpg"
                  alt=""
                />
              </Button>
            </Item>
          </Box>

          <Item>
            <Button
              variant="secondary"
              full
              onClick={onDepartmentModalToggle}
              as={Link}
              to={`${match.url}/technical-support-group`}
            >
              View Department
            </Button>
          </Item>
        </Container>
      </StyledDepartmentCard>
    );
  }
}

export default withRouter(DepartmentCard);
