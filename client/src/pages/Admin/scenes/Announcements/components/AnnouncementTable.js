import React, { Component } from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { Button, Typography, Photo } from "../../../../../components/elements";
import { TextInput, SelectInput } from "../../../../../components/compounds";
import { Item, Box, Container, Area } from "../../../../../layout";

const StyledAnnouncementTable = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${p => p.theme.color.white};
  border: 1px solid ${p => p.theme.color.dark};
  padding: var(--size-base);
  display: flex;
  flex-flow: column;

  .area-announcementTable-header {
    /* border: 1px solid magenta; */
    display: flex;
    align-items: center;
  }

  .area-announcementTable-body {
    /* border: 1px solid magenta; */
    flex-grow: 1;
    width: 100%;
    overflow: auto;
  }

  .container-announcementTable-table-head {
  }

  .container-announcementTable-table-body {
    /* border: 1px solid magenta; */
 
  }

  .container-announcementTable-table-head-row {
    /* background-color: ${p => p.theme.color.grey.light}; */
    color: ${p => p.theme.color.primary.main};
    border-bottom: 1px solid ${p => p.theme.color.primary.light};
   }

  .container-announcementTable-table-body-row {
    border-bottom: 1px solid ${p => p.theme.color.primary.light};
  }

  .item-announcementTable-filter {
  }

  .item-announcementTable-username {
    color: ${p => p.theme.color.primary.main};

    &:hover {
      color: ${p => p.theme.color.primary.dark};
    }
  }

  td,
  th {
    display: table-cell;
  }

  table {
    display: table;
    width: 100%;
  }

  thead {
    display: table-header-group;
  }

  tbody {
    display: table-row-group;
  }

  tr {
    display: table-row;
  }
`;

export class AnnouncementTable extends Component {
  render() {
    return (
      <StyledAnnouncementTable>
        <Area NAME="announcementTable-header" margin="stack-base">
          <Item margin="inline-base">
            <SelectInput />
          </Item>

          <Item NAME="announcementTable-filter">
            <Button variant="secondary">
              <Item margin="inline-s">
                <i className="fas fa-filter" />
              </Item>
              Filter
            </Button>
          </Item>
        </Area>

        <Area NAME="announcementTable-body">
          <Container as="table">
            <Container NAME="announcementTable-table-head" as="thead">
              <Container NAME="announcementTable-table-head-row" as="tr">
                <Item as="th" padding="squish-l">
                  <Typography variant="base">Creator</Typography>
                </Item>
                <Item as="th" padding="squish-l">
                  <Typography variant="base">Department</Typography>
                </Item>
                <Item as="th" padding="squish-l">
                  <Typography variant="base">Message</Typography>
                </Item>
                <Item as="th" padding="squish-l">
                  <Typography variant="base">Date Created</Typography>
                </Item>
              </Container>
            </Container>

            <Container NAME="announcementTable-table-body" as="tbody">
              {Array(20)
                .fill(null)
                .map((item, i) => (
                  <Container
                    NAME="announcementTable-table-body-row"
                    as="tr"
                    key={i}
                  >
                    <Item padding="squish-l" as="td">
                      <Item
                        NAME="announcementTable-username"
                        as={Link}
                        to="/admin/people/person"
                      >
                        <Typography variant="base">usteven</Typography>
                      </Item>
                    </Item>
                    <Item as="td" padding="squish-l">
                      <Typography variant="base">
                        Technical Support Group
                      </Typography>
                    </Item>
                    <Item as="td" padding="squish-l">
                      <Typography variant="base">
                        Nostrud occaecat quis officia ad minim in reprehenderit
                        consequat ullamco veniam id.
                      </Typography>
                    </Item>
                    <Item as="td" padding="squish-l">
                      <Typography variant="base">2019-02-20</Typography>
                    </Item>
                  </Container>
                ))}
            </Container>
          </Container>
        </Area>
      </StyledAnnouncementTable>
    );
  }
}

export default AnnouncementTable;
