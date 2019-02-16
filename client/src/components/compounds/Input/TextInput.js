import React, { Component } from "react";
import styled, { css } from "styled-components";

const StyledTextInput = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;

  .input {
    height: var(--size-button);
    width: 100%;
    padding: ${p => p.theme.size.m} ${p => p.theme.size.s};
    border: 1px solid ${p => p.theme.color.grey.medium};
    transition-duration: 200ms;
    transition-property: box-shadow;

    &:focus {
      /* border: 2px solid ${p => p.theme.color.primary.main}; */
      box-shadow: 0 0 0 var(--size-xs) ${p => p.theme.color.primary.light};
    }

    ${p =>
      p.value &&
      css`
        border: 1px solid ${p => p.theme.color.primary.dark};
      `}
  }
 
`;

export class TextInput extends Component {
  render() {
    const { ...props } = this.props;

    return (
      <StyledTextInput value={props.value}>
        <input className="input" type="text" {...props} />
      </StyledTextInput>
    );
  }
}

export default TextInput;
