import React from "react";
import styled from "styled-components";

import { Button, Typography } from "src/components/elements";
import { Item, Box, Area } from "src/components/blocks";
import UserItem from "./UserItem";

import enums from "src/services/enums";
import returnAttendanceStatus from "src/services/utils/returnAttendanceStatus";

const StyledGroupTrainees = styled.section`
  display: grid;
  grid-area: trainees;
  grid-template-rows: auto 1fr;
  overflow-y: auto;
  padding-top: var(--size-xs);
  border-right: 2px solid ${p => p.theme.color.primary.light};

  .area-header {
    grid-row: 1 / 2;
    display: flex;
  }

  .area-trainees {
    display: grid;
    grid-template-columns: 1fr 1fr;
    overflow-y: auto;
    padding-top: var(--size-xs);
  }
`;

const GroupTrainees = ({ groupData: { users } }) => {
  const trainees = users.filter(user => user.role === enums.roles.TRAINEE);
  const traineesIn = trainees.filter(
    trainee =>
      returnAttendanceStatus(
        trainee.roleData.schedule,
        trainee.roleData.isClockedIn,
        trainee.roleData.lastClockInTime
      ) === "in"
  );
  const traineesOut = trainees.filter(
    trainee =>
      returnAttendanceStatus(
        trainee.roleData.schedule,
        trainee.roleData.isClockedIn,
        trainee.roleData.lastClockInTime
      ) === "out"
  );
  const traineesLater = trainees.filter(
    trainee =>
      returnAttendanceStatus(
        trainee.roleData.schedule,
        trainee.roleData.isClockedIn,
        trainee.roleData.lastClockInTime
      ) === "later"
  );
  const traineesLate = trainees.filter(
    trainee =>
      returnAttendanceStatus(
        trainee.roleData.schedule,
        trainee.roleData.isClockedIn,
        trainee.roleData.lastClockInTime
      ) === "late"
  );
  const traineesAbsent = trainees.filter(
    trainee =>
      returnAttendanceStatus(
        trainee.roleData.schedule,
        trainee.roleData.isClockedIn,
        trainee.roleData.lastClockInTime
      ) === "absent"
  );
  const traineesOff = trainees.filter(
    trainee =>
      returnAttendanceStatus(
        trainee.roleData.schedule,
        trainee.roleData.isClockedIn,
        trainee.roleData.lastClockInTime
      ) === "off"
  );

  return (
    <StyledGroupTrainees>
      <Area NAME="header" margin="stack-m">
        <Item center margin="inline-base">
          <Typography variant="display-3">
            Trainees ({trainees.length})
          </Typography>
        </Item>

        <Item>
          <Button variant="secondary" icon rounded>
            <i className="fas fa-plus" />
          </Button>
        </Item>
      </Area>

      <Area NAME="trainees">
        <Area NAME="left">
          <Item margin="stack-m">
            <Typography variant="display-4">
              Clocked In ({traineesIn.length})
            </Typography>
          </Item>

          <Box column margin="stack-m">
            {traineesIn.map(trainee => (
              <Item margin="stack-base" key={trainee._id}>
                <UserItem user={trainee} />
              </Item>
            ))}
          </Box>

          <Item margin="stack-m">
            <Typography variant="display-4">
              Clocked Out ({traineesOut.length})
            </Typography>
          </Item>

          <Box column margin="stack-m">
            {traineesOut.map(trainee => (
              <Item margin="stack-base" key={trainee._id}>
                <UserItem user={trainee} />
              </Item>
            ))}
          </Box>
        </Area>

        <Area NAME="right">
          <Item margin="stack-m">
            <Typography variant="display-4">
              Not Clocked In ({traineesLater.length})
            </Typography>
          </Item>

          <Box column margin="stack-m">
            {traineesLater.map(trainee => (
              <Item margin="stack-base" key={trainee._id}>
                <UserItem user={trainee} />
              </Item>
            ))}
          </Box>

          <Item margin="stack-m">
            <Typography variant="display-4">
              Late ({traineesLate.length})
            </Typography>
          </Item>

          <Box column margin="stack-m">
            {traineesLate.map(trainee => (
              <Item margin="stack-base" key={trainee._id}>
                <UserItem user={trainee} />
              </Item>
            ))}
          </Box>

          <Item margin="stack-m">
            <Typography variant="display-4">
              Absent ({traineesAbsent.length})
            </Typography>
          </Item>

          <Box column margin="stack-m">
            {traineesAbsent.map(trainee => (
              <Item margin="stack-base" key={trainee._id}>
                <UserItem user={trainee} />
              </Item>
            ))}
          </Box>

          <Item margin="stack-m">
            <Typography variant="display-4">
              Day Off ({traineesOff.length})
            </Typography>
          </Item>

          <Box column margin="stack-m">
            {traineesOff.map(trainee => (
              <Item margin="stack-base" key={trainee._id}>
                <UserItem user={trainee} />
              </Item>
            ))}
          </Box>
        </Area>
      </Area>
    </StyledGroupTrainees>
  );
};

export default GroupTrainees;
