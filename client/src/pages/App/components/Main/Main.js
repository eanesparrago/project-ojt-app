import React, { Component } from "react";
import styled from "styled-components";

import MainHeader from "./components/MainHeader";
import MainBody from "./components/MainBody";
import MainSideModal from "./components/MainSideModal";
import MainFullModal from "./components/MainFullModal";

import { GroupModal } from "src/pages/App/components";

import {
  SideModalCreatePerson,
  SideModalCreateGroup,
  SideModalPerson,
  SideModalCreateAnnouncement
} from "src/components/layouts/SideModal/compositions";

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

        <MainSideModal routePath="/person/:id" routeLevel={2}>
          <SideModalPerson />
        </MainSideModal>

        <MainSideModal routePath={`/group/:id/person/:id`} routeLevel={4}>
          <SideModalPerson />
        </MainSideModal>

        <MainSideModal routePath="/create-group">
          <SideModalCreateGroup />
        </MainSideModal>

        <MainSideModal routePath="/create-person">
          <SideModalCreatePerson />
        </MainSideModal>

        <MainSideModal routePath="/create-announcement">
          <SideModalCreateAnnouncement />
        </MainSideModal>
      </StyledMain>
    );
  }
}

export default Main;
