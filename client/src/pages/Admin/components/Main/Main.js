import React, { Component } from "react";
import styled from "styled-components";

import MainHeader from "./components/MainHeader";
import MainBody from "./components/MainBody";
import MainSideModal from "./components/MainSideModal";
import MainFullModal from "./components/MainFullModal";

import { PersonModal, GroupModal } from "src/pages/Admin/components";

const StyledMain = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  flex-flow: column;
`;

class Main extends Component {
  static Header = MainHeader;
  static Body = MainBody;
  static SideModal = MainSideModal;
  static FullModal = MainFullModal;

  render() {
    return (
      <StyledMain>
        {this.props.children}

        <MainFullModal routePath={`/group/:id`} routeLevel={2}>
          <GroupModal />
        </MainFullModal>

        <MainSideModal routePath={`/person/:id`} routeLevel={2}>
          <PersonModal />
        </MainSideModal>

        <MainSideModal routePath={`/group/:id/person/:id`} routeLevel={4}>
          <PersonModal />
        </MainSideModal>
      </StyledMain>
    );
  }
}

export default Main;
