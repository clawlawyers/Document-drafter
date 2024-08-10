import React, { useState } from "react";
import { Avatar } from "@mui/material";

const UserModal = () => {
  const [showDetails, setshowDetails] = useState(false);
  return (
    <Avatar
      sx={{ bgcolor: "#018081" }}
      alt="Remy Sharp"
      src="/broken-image.jpg"
      className="z-10"
    >
      S
    </Avatar>
  );
};

export default UserModal;
