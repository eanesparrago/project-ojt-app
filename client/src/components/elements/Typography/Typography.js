import React, { Component } from "react";
import styled from "styled-components";
import { Item } from "../../layout";
import textCrop from "../../utils/textCrop";

const StyledTypography = styled.span`
  ${p => textCrop(p.theme.font.lineHeight)};
  font-size: ${p => p.theme.font.scale.base};
`;

const StyledTypographyCaption = styled(StyledTypography)`
  font-size: ${p => p.theme.font.scale.base};
  text-transform: uppercase;
  letter-spacing: ${p => p.theme.font.letterSpacing};
`;

const StyledTypographyBody = styled(StyledTypography)`
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
  ${textCrop()};
  font-size: ${p => p.theme.font.scale.display2};
`;

const StyledTypographyDisplay1 = styled(StyledTypography)`
  ${textCrop()};
  font-size: ${p => p.theme.font.scale.display1};
`;

export class Typography extends Component {
  static defaultProps = {
    variant: ""
  };

  render() {
    const { variant } = this.props;

    switch (variant) {
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
