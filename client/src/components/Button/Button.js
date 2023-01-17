import React from "react";

import { PrimaryBtn } from "./Button.style";

export const PrimaryButton = ({ children }) => {
  return (
    <PrimaryBtn type='submit' primary className='poppins_regular'>
      {children}
    </PrimaryBtn>
  );
};
