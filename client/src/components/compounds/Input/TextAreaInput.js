import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledTextInput = styled.div`
  display: flex;
  flex-flow: column;
  align-items: left;
  position: relative;
  width: 100%;

  .input {
    width: 100%;
    border: 1px solid ${p => p.theme.color.grey.medium};
    transition-duration: 200ms;
    transition-property: box-shadow;
    padding: ${p => p.theme.size.s};

    &:focus {
      box-shadow: 0 0 0 var(--size-xs) ${p => p.theme.color.primary.light};
    }
  }

  .error {
    margin-top: ${p => p.theme.size.s};
    color: ${p => p.theme.color.error};
  }
`;

export class TextInput extends Component {
  render() {
    const { error, ...props } = this.props;

    return (
      <StyledTextInput>
        <textarea className="input" {...props} />

        {error && <span className="error">{error.msg}</span>}
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
