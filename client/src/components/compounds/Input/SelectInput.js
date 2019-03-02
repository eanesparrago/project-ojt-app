import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledSelectInput = styled.div`
  display: flex;
  flex-flow: column;
  align-items: left;
  width: 100%;

  select {
    height: var(--size-button);
    width: 100%;
    padding: 0 ${p => p.theme.size.s};
    border: 1px solid ${p =>
      p.error ? p.theme.color.error : p.theme.color.grey.medium};
    transition-duration: 200ms;
    transition-property: box-shadow;

    &:focus {
      /* border: 2px solid ${p => p.theme.color.primary.main}; */
      box-shadow: 0 0 0 var(--size-xs) ${p => p.theme.color.primary.light};
    }
  }

  .error {
    margin-top: ${p => p.theme.size.s};
    color: ${p => p.theme.color.error};
  }
`;

export class SelectInput extends Component {
  render() {
    const { name, options, id, onChange, error, ...props } = this.props;

    return (
      <StyledSelectInput error={error}>
        <select id={id} name={name} id={name} onChange={onChange} {...props}>
          <option value="">Choose a group</option>

          {options.map(option => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {error && <span className="error">{error.msg}</span>}
      </StyledSelectInput>
    );
  }

  static propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    onChange: PropTypes.func
  };

  static defaultProps = {
    name: "selectInput",
    id: "select-input",
    options: [
      {
        label: "Choose an option",
        value: ""
      },
      {
        label: "Alpha",
        value: "alpha"
      },
      {
        label: "Beta",
        value: "beta"
      },
      {
        label: "Charlie",
        value: "charlie"
      }
    ],
    onChange: e => {
      console.log("Click", e.target.value);
    }
  };
}

export default SelectInput;
