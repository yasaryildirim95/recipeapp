import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Settings.css";

const Settings = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUserProfile = async () => {
      const response = await axios
        .get("https://api.escuelajs.co/api/v1/auth/profile", {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).access_token
            }`,
          },
        })
        .then((response) => {
          console.log(response);
          setUser(response.data);
        });
      return response;
    };
    getUserProfile();
  }, []);

  return (
    <div className="user-card">
      <img src={user.avatar} alt={user.name} />
      <p className="name">{user.name}</p>
      <p>{user.role}</p>
      <p>{user.email}</p>
    </div>
  );
};

export default Settings;
