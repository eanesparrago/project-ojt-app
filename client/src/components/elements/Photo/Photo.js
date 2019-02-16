import React, { Component } from "react";
import styled, { css } from "styled-components";

const StyledPhoto = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;

  ${p =>
    p.rounded &&
    css`
      border-radius: 1000em;
    `}

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

export class Photo extends Component {
  render() {
    return <StyledPhoto {...this.props}>{this.props.children}</StyledPhoto>;
  }
}

export default Photo;
