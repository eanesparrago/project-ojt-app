import React, { Component } from "react";
import styled, { css } from "styled-components";

const configs = css`
  /* >>> rounded */
  ${p =>
    p.rounded &&
    css`
      border-radius: 1000em;
    `}

  /* >>> icon */
  ${p =>
    p.icon &&
    css`
      font-size: ${p => p.theme.font.scale.body};
      padding: 0;
      width: var(--size-button);
      height: var(--size-button);
    `}

  /* >>> full */
  ${p =>
    p.full &&
    css`
      width: 100%;
    `}


  /* >>> left */
  ${p =>
    p.left &&
    css`
      justify-content: left;
    `}
 `;

const StyledButton = styled.button`
  /* border: 1px solid magenta; */
  min-width: var(--size-button);
  min-height: var(--size-button);
  user-select: none;
  box-shadow: ${p => p.theme.shadow[0]};
  transition-property: box-shadow, background-color;
  transition-duration: 100ms;
  font-size: ${p => p.theme.font.scale.base};
  padding: ${p => p.theme.size.s} ${p => p.theme.size.m};
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1.25;

  ${configs};

  &:disabled {
    background-color: ${p => p.theme.color.grey.medium};
    box-shadow: unset;
  }
`;

// >>> Primary
const StyledButtonPrimary = styled(StyledButton)`
  background-color: ${p => p.theme.color.primary.main};
  color: ${p => p.theme.color.dark};
  border-radius: 1000em;
  text-transform: uppercase;
  font-weight: 700;
  min-width: ${p => !p.icon && p.theme.incrementFixed(4)};

  &:hover {
    box-shadow: ${p => p.theme.shadow[1]};
  }

  &:focus {
    box-shadow: 0 0 0 var(--size-xs) ${p => p.theme.color.primary.light};
  }

  &:active {
    background-color: ${p => p.theme.color.primary.dark};
    box-shadow: 0 0 0 var(--size-xxs) ${p => p.theme.color.primary.light};
  }
`;

// >>> Secondary
const StyledButtonSecondary = styled(StyledButton)`
  background-color: ${p => p.theme.color.white};
  /* box-shadow: 0 0 0 var(--size-xxs) ${p => p.theme.color.primary.main}; */
  /* box-shadow: unset; */
  border: 1px solid ${p => p.theme.color.primary.dark};
  border-radius: 1000em;
  color: ${p => p.theme.color.primary.dark};
  text-transform: uppercase;
  font-weight: 700;
  min-width:  ${p => !p.icon && p.theme.incrementFixed(4)};

  &:hover {
    box-shadow: ${p => p.theme.shadow[1]};
  }

  &:focus {
    box-shadow: 0 0 0 var(--size-xs) ${p => p.theme.color.primary.light};
  }

  &:active {
    /* color: ${p => p.theme.color.primary.dark}; */
    background-color: ${p => p.theme.color.grey.light};
    box-shadow: 0 0 0 var(--size-xxs) ${p => p.theme.color.primary.light};
  }
`;

// >>> Text
const StyledButtonText = styled(StyledButton)`
  box-shadow: 0 0 0 0 transparent;
  background-color: unset;

  &:hover {
    box-shadow: 0 0 0 0 transparent;
    color: ${p => p.theme.color.primary.main};
  }

  &:focus {
    box-shadow: 0 0 0 var(--size-xs) ${p => p.theme.color.primary.light};
  }

  &:active {
    /* color: ${p => p.theme.color.primary.dark}; */
    box-shadow: 0 0 0 var(--size-xxs) ${p => p.theme.color.primary.light};
  }
`;

// >>> Photo
const StyledButtonPhoto = styled(StyledButton)`
  box-shadow: 0 0 0 0 transparent;
  background-color: ${p => p.theme.color.primary.main};
  overflow: hidden;
  width: 100%;
  height: 100%;
  padding: 0;

  &:hover {
    box-shadow: 0 0 0 var(--size-xxs) ${p => p.theme.color.primary.main};
    color: ${p => p.theme.color.primary.main};
  }

  &:focus {
    box-shadow: 0 0 0 var(--size-xs) ${p => p.theme.color.primary.light};
  }

  &:active {
    /* color: ${p => p.theme.color.primary.dark}; */
    box-shadow: 0 0 0 var(--size-xxs) ${p => p.theme.color.primary.light};
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

export class Button extends Component {
  static defaultProps = {
    variant: ""
  };

  render() {
    const { variant, link, full, left, icon, rounded, ...props } = this.props;

    switch (variant) {
      case "primary":
        return (
          <StyledButtonPrimary
            full={full ? 1 : undefined}
            left={left ? 1 : undefined}
            icon={icon ? 1 : undefined}
            rounded={rounded ? 1 : undefined}
            {...props}
          >
            {props.children}
          </StyledButtonPrimary>
        );

      case "secondary":
        return (
          <StyledButtonSecondary
            full={full ? 1 : undefined}
            left={left ? 1 : undefined}
            icon={icon ? 1 : undefined}
            rounded={rounded ? 1 : undefined}
            {...props}
          >
            {props.children}
          </StyledButtonSecondary>
        );

      case "text":
        return (
          <StyledButtonText
            full={full ? 1 : undefined}
            left={left ? 1 : undefined}
            icon={icon ? 1 : undefined}
            rounded={rounded ? 1 : undefined}
            {...props}
          >
            {props.children}
          </StyledButtonText>
        );

      case "photo":
        return (
          <StyledButtonPhoto
            full={full ? 1 : undefined}
            left={left ? 1 : undefined}
            icon={icon ? 1 : undefined}
            rounded={rounded ? 1 : undefined}
            {...props}
          >
            {props.children}
          </StyledButtonPhoto>
        );

      default:
        return (
          <StyledButtonPrimary
            full={full ? 1 : undefined}
            left={left ? 1 : undefined}
            icon={icon ? 1 : undefined}
            rounded={rounded ? 1 : undefined}
            {...props}
          >
            {props.children}
          </StyledButtonPrimary>
        );
    }
  }
}

export default Button;
