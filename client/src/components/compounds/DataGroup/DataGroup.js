import React, { Component } from "react";
import styled from "styled-components";

import {
  DataGroupLabel,
  DataGroupContent,
  DataGroupButtons
} from "./components";

const StyledDataGroup = styled.div`
  display: flex;
`;

export class DataGroup extends Component {
  static Content = DataGroupContent;
  static Label = DataGroupLabel;
  static Buttons = DataGroupButtons;

  render() {
    const { children } = this.props;

    return <StyledDataGroup>{children}</StyledDataGroup>;
  }
}

export default DataGroup;
