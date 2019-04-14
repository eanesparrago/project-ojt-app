import React, { Fragment } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import styled from "styled-components";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { Item, Container } from "src/components/blocks";
import { Typography } from "src/components/elements";

const localizer = BigCalendar.momentLocalizer(moment);

const StyledCalendar = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column nowrap;

  .container-calendar {
    flex-grow: 1;
  }
`;

const Calendar = ({ person }) => {
  const {
    data: {
      roleData: { calendar }
    }
  } = person;

  console.log(calendar);

  return (
    <StyledCalendar>
      <Item margin="stack-base">
        <Typography variant="display-2">Attendance</Typography>
      </Item>

      <Container NAME="calendar">
        <BigCalendar
          localizer={localizer}
          events={calendar}
          views={["month"]}
          startAccessor="date"
          endAccessor="date"
          titleAccessor="status"
          eventPropGetter={(event, start, end, isSelected) => {
            let newStyle = {
              backgroundColor: "#558B2F"
            };

            if (event.status === "off") {
              newStyle.backgroundColor = "#424242";
            }

            if (event.status === "absent") {
              newStyle.backgroundColor = "#9C27B0";
            }

            return {
              style: newStyle
            };
          }}
        />
      </Container>
    </StyledCalendar>
  );
};

export default Calendar;
