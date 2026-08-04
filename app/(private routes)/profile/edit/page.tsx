"use client";

import { useEffect, useState } from "react";
import { getMe, updateMe } from "@/lib/api/clientApi";

const EditProfile = () => {
  const [userName, setUserName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    getMe().then((user) => {
      setUserName(user.userName ?? "");
      setPhotoUrl(user.photoUrl ?? "");
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateMe({ userName, photoUrl });
  };

  return (
    <div>
      <h1>Edit profile</h1>
      <br />
      <br />
      <form onSubmit={handleSaveUser}>
        <input type="text" value={userName} onChange={handleChange} />
        <br />
        <button type="submit">Save user</button>
      </form>
    </div>
  );
};

export default EditProfile;
