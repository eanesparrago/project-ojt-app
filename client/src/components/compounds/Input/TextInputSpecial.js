import React, { Component } from "react";
import styled, { css } from "styled-components";

const StyledTextInputSpecial = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  .input {
    height: var(--size-button);
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

  .placeholder {
    position: absolute;
    left: var(--size-s);
    user-select: none;
    pointer-events: none;
    height: 100%;
    display: flex;
    align-items: center;
    color: ${p => p.theme.color.grey.medium};
    transition-duration: 200ms;
    transition-property: transform;
    transition-timing-function: ease-out;

    ${p =>
      p.value &&
      css`
        transform: translateX(-130%);
        color: ${p => p.theme.color.primary.dark};
      `}
  }

  .input:focus ~ .placeholder {
    transform: translateX(-130%);
    color: ${p => p.theme.color.primary.main};
  }
`;

export class TextInputSpecial extends Component {
  render() {
    const { placeholder, ...props } = this.props;

    return (
      <StyledTextInputSpecial value={props.value}>
        <input className="input" type="text" {...props} />
        <span className="placeholder">{placeholder}</span>
      </StyledTextInputSpecial>
    );
  }
}

export default TextInputSpecial;
