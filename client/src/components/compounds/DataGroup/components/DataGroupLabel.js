import React from "react";
import styled from "styled-components";

import { Typography } from "src/components/elements";

const StyledDataGroupLabel = styled.div`
  width: ${p => p.theme.incrementFixed(12)};
  margin-right: var(--size-m);
`;

const DataGroupLabel = ({ title = "" }) => {
  return (
    <StyledDataGroupLabel>
      <Typography variant="body" as="label">
        {title}
      </Typography>
    </StyledDataGroupLabel>
  );
};

export default DataGroupLabel;
