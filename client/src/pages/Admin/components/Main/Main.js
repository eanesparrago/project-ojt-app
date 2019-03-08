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

        <MainSideModal routePath={`/person/:id`}>
          <PersonModal />
        </MainSideModal>

        <MainFullModal routePath={`/group/:id`} routeSplice={[0, 6]}>
          <GroupModal />
        </MainFullModal>

        <MainSideModal routePath={`/group/:id/person/:id`}>
          <PersonModal />
        </MainSideModal>
      </StyledMain>
    );
  }
}

export default Main;
