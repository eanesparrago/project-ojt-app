import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Item, Container } from "../../../layout";
import { Typography } from "../../elements";

const StyledRadioInput = styled.div`
  display: flex;
  flex-flow: column;
  align-items: left;
  width: 100%;

  input {
    width: var(--size-base);
    height: var(--size-base);
    cursor: pointer;
  }

  .container-radioInput-item {
    display: flex;
  }

  .container-radioInput-item:last-child {
    margin-bottom: 0;
  }

  .error {
    margin-top: ${p => p.theme.size.s};
    color: ${p => p.theme.color.error};
  }
`;

export class RadioInput extends Component {
  render() {
    const { options, name, onChange, error } = this.props;

    return (
      <StyledRadioInput>
        {options.map(option => (
          <Container NAME="radioInput-item" margin="stack-m" key={option.id}>
            <Item margin="inline-s">
              <input
                type="radio"
                name={name}
                value={option.value}
                id={option.id}
                onChange={onChange}
              />
            </Item>

            <Item center>
              <Typography variant="base" as="label" htmlFor={option.id}>
                {option.label}
              </Typography>
            </Item>
          </Container>
        ))}

        {error && <span className="error">{error.msg}</span>}
      </StyledRadioInput>
    );
  }

  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    onChange: PropTypes.func
  };

  static defaultProps = {
    options: [
      {
        value: "alpha",
        label: "Alpha",
        id: "option-1"
      },
      {
        value: "beta",
        label: "Beta",
        id: "option-2"
      },
      {
        value: "charlie",
        label: "Charlie",
        id: "option-3"
      }
    ],
    onChange: e => {
      console.log("Clicked", e.target.value);
    }
  };
}

export default RadioInput;
