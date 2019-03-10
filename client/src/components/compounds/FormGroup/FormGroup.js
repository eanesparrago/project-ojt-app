import React, { Component } from "react";
import styled from "styled-components";

import { FormGroupInput, FormGroupLabel } from "./components";

const StyledFormGroup = styled.div`
  display: flex;
`;

export class FormGroup extends Component {
  static Input = FormGroupInput;
  static Label = FormGroupLabel;

  render() {
    const { children } = this.props;

    return <StyledFormGroup>{children}</StyledFormGroup>;
  }
}

export default FormGroup;
