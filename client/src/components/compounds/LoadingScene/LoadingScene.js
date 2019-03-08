import React from "react";
import styled from "styled-components";

const StyledLoadingScene = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;

  .lds-grid {
    display: inline-block;
    position: relative;
    width: 64px;
    height: 64px;
  }
  .lds-grid div {
    position: absolute;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: ${p => p.theme.color.primary.accent};
    animation: lds-grid 1.2s linear infinite;
  }
  .lds-grid div:nth-child(1) {
    top: 6px;
    left: 6px;
    animation-delay: 0s;
  }
  .lds-grid div:nth-child(2) {
    top: 6px;
    left: 26px;
    animation-delay: -0.4s;
  }
  .lds-grid div:nth-child(3) {
    top: 6px;
    left: 45px;
    animation-delay: -0.8s;
  }
  .lds-grid div:nth-child(4) {
    top: 26px;
    left: 6px;
    animation-delay: -0.4s;
  }
  .lds-grid div:nth-child(5) {
    top: 26px;
    left: 26px;
    animation-delay: -0.8s;
  }
  .lds-grid div:nth-child(6) {
    top: 26px;
    left: 45px;
    animation-delay: -1.2s;
  }
  .lds-grid div:nth-child(7) {
    top: 45px;
    left: 6px;
    animation-delay: -0.8s;
  }
  .lds-grid div:nth-child(8) {
    top: 45px;
    left: 26px;
    animation-delay: -1.2s;
  }
  .lds-grid div:nth-child(9) {
    top: 45px;
    left: 45px;
    animation-delay: -1.6s;
  }
  @keyframes lds-grid {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

const LoadingScene = () => {
  return (
    <StyledLoadingScene>
      <div className="lds-grid">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </StyledLoadingScene>
  );
};

export default LoadingScene;
