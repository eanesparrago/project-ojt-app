import React from "react";
import styled from "styled-components";
import get from "lodash/get";
import format from "date-fns/format";
import { withRouter } from "react-router-dom";

import { Item, Box } from "src/components/blocks";
import { Typography } from "src/components/elements";
import { ProfilePicture } from "src/components/compounds";

const StyledTableBody = styled.div`
  flex-grow: 1;
  width: 100%;
  overflow-y: auto;

  td,
  th {
    display: table-cell;
    vertical-align: middle;

    min-width: 12rem;
  }

  table {
    display: table;
    width: 100%;
  }

  thead {
    display: table-header-group;
    color: ${p => p.theme.color.primary.dark};
  }

  tbody {
    display: table-row-group;
  }

  tr {
    display: table-row;
    border-bottom: 1px solid ${p => p.theme.color.primary.light};
  }

  .data-row {
    &:hover {
      background-color: ${p => p.theme.color.grey.light};
      cursor: pointer;
    }
  }
`;

const TableBody = ({ headings, data, route, match, history }) => {
  return (
    <StyledTableBody>
      <table>
        <thead>
          <tr>
            {headings.map(heading => (
              <Item as="th" padding="squish-l" inline key={heading.title}>
                <Typography>{heading.title}</Typography>
              </Item>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map(item => (
            <tr
              className="data-row"
              onClick={() => {
                history.push(`${match.url}${route}/${item._id}`);
              }}
              key={item._id}
            >
              {headings.map(heading => {
                return (
                  <Item as="td" padding="squish-l" key={heading.title}>
                    {heading.type === "user" ? (
                      <Box>
                        <Item margin="inline-m">
                          <ProfilePicture
                            src={get(item, heading.property[0])}
                          />
                        </Item>

                        <Item left>
                          <Typography variant="base">
                            {get(item, heading.property[1])}
                          </Typography>
                        </Item>
                      </Box>
                    ) : (
                      <Typography variant="base">
                        {heading.type === "date"
                          ? format(get(item, heading.property), "MM-DD-YYYY")
                          : get(item, heading.property)}
                      </Typography>
                    )}
                  </Item>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </StyledTableBody>
  );
};

export default withRouter(TableBody);
