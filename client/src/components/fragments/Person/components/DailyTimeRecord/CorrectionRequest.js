import React, { Component, Fragment } from "react";
import format from "date-fns/format";
import differenceInSeconds from "date-fns/difference_in_seconds";
import styled from "styled-components";
import { connect } from "react-redux";

import { Item } from "src/components/blocks";
import { DataGroup } from "src/components/compounds";
import { Typography, Button } from "src/components/elements";

import returnTimeElapsed from "src/services/utils/returnTimeElapsed";

import enums from "src/services/enums";

const StyledCorrectionRequest = styled.div`
  padding: var(--size-m);
  border: 2px solid ${p => p.theme.color.primary.accent};
  border-radius: var(--size-m);
`;

export class CorrectionRequest extends Component {
  render() {
    const {
      clockCorrectionRequest,
      auth: {
        user: { role }
      }
    } = this.props;

    return (
      <StyledCorrectionRequest>
        <Item margin="stack-base">
          <Typography variant="display-3">
            Pending Correction Request:
          </Typography>
        </Item>

        <DataGroup>
          <DataGroup.Label
            title={format(clockCorrectionRequest.in, "MMM D YYYY")}
          />

          <DataGroup.Content>
            <Typography variant="body">
              {`${format(clockCorrectionRequest.in, "HH:mm")} - 
                    ${format(
                      clockCorrectionRequest.out,
                      "HH:mm"
                    )} (${returnTimeElapsed(
                differenceInSeconds(
                  clockCorrectionRequest.out,
                  clockCorrectionRequest.in
                )
              )})`}
            </Typography>
          </DataGroup.Content>

          <DataGroup.Buttons>
            {(role === enums.roles.ADMINISTRATOR && (
              <Fragment>
                <Button variant="primary">Approve</Button>
                <Button variant="secondary">Reject</Button>
              </Fragment>
            )) ||
              (role === enums.roles.TRAINEE && (
                <Button variant="secondary">Cancel</Button>
              ))}
          </DataGroup.Buttons>
        </DataGroup>
      </StyledCorrectionRequest>
    );
  }
}

export default connect(state => ({
  auth: state.auth
}))(CorrectionRequest);
