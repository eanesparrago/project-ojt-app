import React, { Fragment } from "react";
import format from "date-fns/format";
import { connect } from "react-redux";

import { Item, Box } from "src/components/blocks";
import { Typography } from "src/components/elements";
import { ProfilePicture } from "src/components/compounds";
import { DataGroup } from "src/components/compounds";

const AnnouncementInformation = ({ announcement: { data } }) => {
  return (
    <Fragment>
      <Item margin="stack-l">
        <DataGroup>
          <DataGroup.Label title="User" />

          <DataGroup.Content>
            <Box>
              <Item margin="inline-m">
                <ProfilePicture src={data.user.profilePictureUrl} />
              </Item>

              <Item left>
                <Typography variant="body">{data.user.username}</Typography>
              </Item>
            </Box>
          </DataGroup.Content>
        </DataGroup>
      </Item>

      <Item margin="stack-l">
        <DataGroup>
          <DataGroup.Label title="Date Created" />

          <DataGroup.Content>
            <Typography variant="display-4">
              {format(data.dateCreated, "MM-DD-YYYY")}
            </Typography>
          </DataGroup.Content>
        </DataGroup>
      </Item>

      <Item margin="stack-l">
        <DataGroup>
          <DataGroup.Label title="Group" />

          <DataGroup.Content>
            <Typography variant="display-4">
              {data.group ? data.group.name : "All"}
            </Typography>
          </DataGroup.Content>
        </DataGroup>
      </Item>

      <Item margin="stack-l">
        <DataGroup>
          <DataGroup.Label title="Message" />

          <DataGroup.Content>
            <Typography variant="body">{data.message}</Typography>
          </DataGroup.Content>
        </DataGroup>
      </Item>
    </Fragment>
  );
};

export default connect(
  state => ({
    announcement: state.announcements.announcement
  }),
  null
)(AnnouncementInformation);
