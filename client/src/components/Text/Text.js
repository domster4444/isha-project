import React from "react";

import { TextField } from "./Text.style";

const Text = ({ children }) => {
  return <TextField className='poppins_regular'>{children}</TextField>;
};

export default Text;
