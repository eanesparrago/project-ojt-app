import React from "react";
import styled from "styled-components";

import { Typography } from "src/components/elements";

const StyledInputGroupLabel = styled.div`
  width: ${p => p.theme.incrementFixed(8)};
  margin-top: var(--size-m);
  margin-right: var(--size-m);
`;

const InputGroupLabel = ({ title = "", htmlFor }) => {
  return (
    <StyledInputGroupLabel>
      <Typography variant="base" as="label" htmlFor={htmlFor}>
        {title}
      </Typography>
    </StyledInputGroupLabel>
  );
};

export default InputGroupLabel;
