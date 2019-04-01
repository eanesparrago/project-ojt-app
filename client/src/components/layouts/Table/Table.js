import React, { Component } from "react";
import styled from "styled-components";

import { TableHeader, TableBody } from "./components";

const StyledTable = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${p => p.theme.color.white};
  padding: var(--size-base);
  display: flex;
  flex-flow: column;
`;

export class Table extends Component {
  static Header = TableHeader;
  static Body = TableBody;

  render() {
    const { children } = this.props;

    return <StyledTable>{children}</StyledTable>;
  }
}

export default Table;
