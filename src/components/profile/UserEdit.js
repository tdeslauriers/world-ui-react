import React from "react";
import ProfileForm from "./ProfileForm";
import ProfileView from "./ProfileView";

const UserEdit = ({isEditMode}) => {



  return <div>{
      isEditMode ? <ProfileForm /> : <ProfileView />
    }</div>;
};

export default UserEdit;
