import React, { Component } from "react";

export class CloudinaryUploadWidget extends Component {
  render() {
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dtpbb2rgx",
        uploadPreset: "slzwnlxl",
        sources: ["local"],
        multiple: false,
        cropping: true,
        croppingAspectRatio: 1,
        maxFileSize: 1500000
      },
      (error, result) => {
        console.log(error, result);
      }
    );

    return (
      <div>
        Cloudinary Upload Widget
        <button
          onClick={e => {
            e.preventDefault();
            myWidget.open();
          }}
        >
          Open
        </button>
      </div>
    );
  }
}

export default CloudinaryUploadWidget;
