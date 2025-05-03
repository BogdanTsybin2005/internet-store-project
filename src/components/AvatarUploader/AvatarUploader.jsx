import React from 'react';
import './AvatarUploader.css';



export default function AvatarUploader({ onChange }) {
  return (
    <label className="avatar-uploader">
      <span>Change Avatar</span>
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        className="avatar-input"
      />
    </label>
  );
}
