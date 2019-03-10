import React, { Component } from "react";
import styled from "styled-components";

import { DataGroupLabel, DataGroupContent } from "./components";

const StyledDataGroup = styled.div`
  display: flex;
`;

export class DataGroup extends Component {
  static Content = DataGroupContent;
  static Label = DataGroupLabel;

  render() {
    const { children } = this.props;

    return <StyledDataGroup>{children}</StyledDataGroup>;
  }
}

export default DataGroup;
