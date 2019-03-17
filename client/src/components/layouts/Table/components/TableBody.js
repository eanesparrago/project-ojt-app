import React from "react";
import styled from "styled-components";

import { Item, Container } from "src/components/blocks";
import { Typography } from "src/components/elements";

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
`;

const TableBody = ({ headings, data }) => {
  return (
    <StyledTableBody>
      <table>
        <thead>
          <tr>
            {headings.map(header => (
              <Item as="th" padding="squish-l" inline key={header}>
                <Typography>{header}</Typography>
              </Item>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map(item => (
            <tr>
              {item.map(value => (
                <Item as="td" padding="squish-l" inline>
                  <Typography>{value}</Typography>
                </Item>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </StyledTableBody>
  );
};

export default TableBody;
