import React, { Component } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const StyledTextInput = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;

  .input {
    height: var(--size-button);
    width: 100%;
    border: 1px solid ${p => p.theme.color.grey.medium};
    transition-duration: 200ms;
    transition-property: box-shadow;
    padding: ${p => (p.type === "text" ? p.theme.size.m : "0")} ${p =>
  p.theme.size.s};

    &:focus {
      /* border: 2px solid ${p => p.theme.color.primary.main}; */
      box-shadow: 0 0 0 var(--size-xs) ${p => p.theme.color.primary.light};
    }
  }
`;

export class TextInput extends Component {
  render() {
    const { ...props } = this.props;

    return (
      <StyledTextInput value={props.value} type={props.type}>
        <input className="input" {...props} />
      </StyledTextInput>
    );
  }

  static propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.string
  };

  static defaultProps = {
    onChange: e => {
      console.log("Type", e.target.value);
    }
  };
}

export default TextInput;
