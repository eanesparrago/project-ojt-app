import React, { Component } from "react";
import styled from "styled-components";

import { InputGroupInput, InputGroupLabel } from "./components";

const StyledInputGroup = styled.div`
  display: flex;
`;

export class InputGroup extends Component {
  static Input = InputGroupInput;
  static Label = InputGroupLabel;

  render() {
    const { children } = this.props;

    return <StyledInputGroup>{children}</StyledInputGroup>;
  }
}

export default InputGroup;
