import React, { Component } from "react";

import { SideModal } from "src/components/layouts";

export class SideModalAnnouncement extends Component {
  render() {
    return (
      <SideModal>
        <SideModal.Header title="Announcement" />

        <SideModal.Body>{/*  */}</SideModal.Body>
      </SideModal>
    );
  }
}

export default SideModalAnnouncement;
