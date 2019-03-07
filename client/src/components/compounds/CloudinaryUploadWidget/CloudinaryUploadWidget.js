import React, { Component } from "react";
import { Button } from "src/components/elements";

export class CloudinaryUploadWidget extends Component {
  uploadWidget = () => {
    const { handleProfilePictureUpload } = this.props;

    window.cloudinary.openUploadWidget(
      {
        cloudName: "dtpbb2rgx",
        uploadPreset: "slzwnlxl",
        sources: ["local"],
        multiple: false,
        cropping: true,
        croppingAspectRatio: 1,
        maxFileSize: 1500000,
        clientAllowedFormats: ["png", "gif", "jpeg"]
      },
      (error, result) => {
        if (result && result.event === "success") {
          handleProfilePictureUpload(result.info.url);
        }
      }
    );
  };

  render() {
    return (
      <div>
        <Button
          variant="secondary"
          onClick={e => {
            e.preventDefault();
            this.uploadWidget();
          }}
        >
          Upload Photo
        </Button>
      </div>
    );
  }
}

export default CloudinaryUploadWidget;
