import { css } from "styled-components";

export default css`
  position: relative;
  display: flex;
  flex-flow: column;
  height: 100%;

  .area-admin-content-header {
    background-color: ${p => p.theme.color.white};
    padding-bottom: ${p => p.theme.size.s};
    border-bottom: 2px solid ${p => p.theme.color.primary.accent};
  }

  .area-admin-content-body {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }

  .container-admin-person {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;

    @media (max-width: ${p => p.theme.breakpoint.tabletLandscape}) {
      overflow-y: auto;
    }
  }

  .container-admin-create {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .container-admin-loading {
    position: absolute;
    overflow-y: hidden;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 50;
    pointer-events: none;
  }
`;
