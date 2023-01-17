import React from "react";

import { AlertField } from "./Alert.style";

const Alert = (props) => {
  return <AlertField type={props.type}>{props.children}</AlertField>;
};

export default Alert;
