import React, { Component } from "react";
import styled from "styled-components";
import { withRouter, Link } from "react-router-dom";

import { Item } from "src/components/blocks";
import { Button, Typography } from "src/components/elements";

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

  .item-avatar-name {
    position: absolute;
    bottom: 100%;
    background-color: ${p => p.theme.color.dark};
    color: ${p => p.theme.color.light};
    border-radius: var(--size-s);
    border-bottom-left-radius: 0;
    white-space: nowrap;
    box-shadow: ${p => p.theme.shadow[0]};
  }
`;

export class Avatar extends Component {
  state = {
    isHovered: false
  };

  handleHoverToggle = e => {
    this.setState({ isHovered: !this.state.isHovered });
  };

  render() {
    const { match, userData } = this.props;
    const { ...state } = this.state;

    return (
      <StyledAvatar
        attendanceStatus={
          userData.role === enums.roles.TRAINEE &&
          returnAttendanceStatus(
            userData.roleData.schedule,
            userData.roleData.isClockedIn,
            userData.roleData.clocks
          )
        }
      >
        {state.isHovered && (
          <Item NAME="avatar-name" padding="squish-base" margin="stack-s">
            <Typography variant="base">
              {userData.firstName
                ? `${userData.firstName} ${userData.lastName}`
                : userData.username}
            </Typography>
          </Item>
        )}

        <Button
          variant="photo"
          rounded
          as={Link}
          to={`${match.url}/person/${userData._id}`}
          onMouseOver={this.handleHoverToggle}
          onMouseOut={this.handleHoverToggle}
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
  }
}

export default withRouter(Avatar);

// const Avatar = ({ match, userData }) => {
//   return (
//     <StyledAvatar
//       attendanceStatus={
//         userData.role === enums.roles.TRAINEE &&
//         returnAttendanceStatus(
//           userData.roleData.schedule,
//           userData.roleData.isClockedIn,
//           userData.roleData.clocks
//         )
//       }
//     >
//       <Item NAME="avatar-name" padding="squish-base" margin="stack-s">
//         <Typography variant="base">{userData.username}</Typography>
//       </Item>

//       <Button
//         variant="photo"
//         rounded
//         as={Link}
//         to={`${match.url}/person/${userData._id}`}
//       >
//         {userData.profilePictureUrl ? (
//           <img src={userData.profilePictureUrl} alt="" />
//         ) : (
//           <img src={profilePhotoPlaceholder} alt="" />
//         )}
//       </Button>

//       {userData.role === enums.roles.TRAINEE && (
//         <div className="attendance-status" />
//       )}
//     </StyledAvatar>
//   );
// };

// export default withRouter(Avatar);
