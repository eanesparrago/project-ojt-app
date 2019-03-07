import React from "react";
import styled from "styled-components";
import { withRouter, Link } from "react-router-dom";
import { Button } from "src/components/elements";

const StyledAvatar = styled.div`
  width: var(--size-button);
  height: var(--size-button);
`;

const Avatar = ({ match, src, id }) => {
  return (
    <StyledAvatar>
      <Button
        variant="photo"
        rounded
        as={Link}
        to={`${match.url}/person/${id}`}
      >
        <img src={src} alt="" />
      </Button>
    </StyledAvatar>
  );
};

export default withRouter(Avatar);
