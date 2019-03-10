import React from "react";
import styled from "styled-components";

import { Typography } from "src/components/elements";

const StyledFormGroupLabel = styled.div`
  width: ${p => p.theme.incrementFixed(8)};
  margin-top: var(--size-m);
  margin-right: var(--size-m);
`;

const FormGroupLabel = ({ title = "", htmlFor }) => {
  return (
    <StyledFormGroupLabel>
      <Typography variant="base" as="label" htmlFor={htmlFor}>
        {title}
      </Typography>
    </StyledFormGroupLabel>
  );
};

export default FormGroupLabel;
