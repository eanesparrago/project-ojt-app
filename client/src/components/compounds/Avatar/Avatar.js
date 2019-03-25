import React from "react";
import styled from "styled-components";
import { withRouter, Link } from "react-router-dom";
import { Button } from "src/components/elements";

import profilePhotoPlaceholder from "src/assets/images/profile-photo-placeholder.png";

import enums from "src/services/enums";
import returnAttendanceStatus from "src/services/utils/returnAttendanceStatus";

const StyledAvatar = styled.div`
  width: var(--size-button);
  height: var(--size-button);
  position: relative;

  .attendance-status {
    border-radius: 1000em;
    width: var(--size-s);
    height: var(--size-s);
    background-color: ${p =>
      (p.attendanceStatus === "in" && p.theme.color.primary.main) ||
      (p.attendanceStatus === "out" && p.theme.color.out) ||
      (p.attendanceStatus === "later" && p.theme.color.warning) ||
      (p.attendanceStatus === "late" && p.theme.color.error) ||
      (p.attendanceStatus === "absent" && p.theme.color.absent) ||
      (p.attendanceStatus === "off" && p.theme.color.grey.medium)};
    position: absolute;
    right: 0;
    bottom: 0;
  }
`;

const Avatar = ({ match, userData }) => {
  return (
    <StyledAvatar
      attendanceStatus={
        userData.role === enums.roles.TRAINEE &&
        returnAttendanceStatus(
          userData.roleData.schedule,
          userData.roleData.isClockedIn,
          userData.roleData.lastClockInTime
        )
      }
    >
      <Button
        variant="photo"
        rounded
        as={Link}
        to={`${match.url}/person/${userData._id}`}
      >
        {userData.profilePictureUrl ? (
          <img src={userData.profilePictureUrl} alt="" />
        ) : (
          <img src={profilePhotoPlaceholder} alt="" />
        )}
      </Button>

      {userData.role === enums.roles.TRAINEE && (
        <div className="attendance-status" />
      )}
    </StyledAvatar>
  );
};

export default withRouter(Avatar);
