import React from "react";
import styled from "styled-components";
import profilePhotoPlaceholder from "src/assets/images/profile-photo-placeholder.png";

const StyledProfilePicture = styled.div`
  width: var(--size-button);
  height: var(--size-button);
  overflow: hidden;
  border-radius: 1000em;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const ProfilePicture = src => {
  return (
    <StyledProfilePicture>
      <img src={src.src ? src.src : profilePhotoPlaceholder} alt="" />
    </StyledProfilePicture>
  );
};

export default ProfilePicture;
