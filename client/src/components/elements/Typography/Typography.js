import React, { Component } from "react";
import styled, { css } from "styled-components";
import cropLineHeight from "../../utils/cropLineHeight";

const config = css`
  ${p =>
    p.bold &&
    css`
      font-weight: 700;
    `}
`;

const StyledTypography = styled.span`
  ${p =>
    !p.inline &&
    css`
      ${cropLineHeight()};
    `}
  font-size: ${p => p.theme.font.scale.base};

  ${config};
`;

const StyledTypographyCaption = styled(StyledTypography)`
  font-size: ${p => p.theme.font.scale.base};
  text-transform: uppercase;
  letter-spacing: ${p => p.theme.font.letterSpacing};
`;

const StyledTypographyBody = styled(StyledTypography)`
  ${p =>
    !p.inline &&
    css`
      ${cropLineHeight(p.theme.font.lineHeight)};
    `}
    
  font-size: ${p => p.theme.font.scale.body};
`;

const StyledTypographyNormal= styled(StyledTypography)`
  ${p =>
    !p.inline &&
    css`
      ${cropLineHeight()};
    `}
    
  font-size: ${p => p.theme.font.scale.body};
`;

const StyledTypographyDisplay4 = styled(StyledTypography)`
  font-size: ${p => p.theme.font.scale.display4};
  font-weight: 700;
`;

const StyledTypographyDisplay3 = styled(StyledTypography)`
  font-size: ${p => p.theme.font.scale.display3};
`;

const StyledTypographyDisplay2 = styled(StyledTypography)`
  font-size: ${p => p.theme.font.scale.display2};
`;

const StyledTypographyDisplay1 = styled(StyledTypography)`
    ${p =>
      !p.inline &&
      css`
        ${cropLineHeight(1)};
      `}

  font-size: ${p => p.theme.font.scale.display1};
  font-weight: 300;
`;

export class Typography extends Component {
  static defaultProps = {
    variant: ""
  };

  render() {
    const { variant } = this.props;

    switch (variant) {
      case "base":
        return (
          <StyledTypography {...this.props}>
            {this.props.children}
          </StyledTypography>
        );

      case "normal":
        return (
          <StyledTypographyNormal {...this.props}>
            {this.props.children}
          </StyledTypographyNormal>
        );

      case "body":
        return (
          <StyledTypographyBody {...this.props}>
            {this.props.children}
          </StyledTypographyBody>
        );

      case "caption":
        return (
          <StyledTypographyCaption {...this.props}>
            {this.props.children}
          </StyledTypographyCaption>
        );

      case "display-4":
        return (
          <StyledTypographyDisplay4 {...this.props}>
            {this.props.children}
          </StyledTypographyDisplay4>
        );

      case "display-3":
        return (
          <StyledTypographyDisplay3 {...this.props}>
            {this.props.children}
          </StyledTypographyDisplay3>
        );

      case "display-2":
        return (
          <StyledTypographyDisplay2 {...this.props}>
            {this.props.children}
          </StyledTypographyDisplay2>
        );

      case "display-1":
        return (
          <StyledTypographyDisplay1 {...this.props}>
            {this.props.children}
          </StyledTypographyDisplay1>
        );

      default:
        return (
          <StyledTypography {...this.props}>
            {this.props.children}
          </StyledTypography>
        );
    }
  }
}

export default Typography;
