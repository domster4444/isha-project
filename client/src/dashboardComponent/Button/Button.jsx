import React from "react";

const Button = ({ name, bg = "#405cf5" }) => {
  return (
    <button style={{ background: `${bg}` }} class='button-9' role='button'>
      {name}
    </button>
  );
};

export default Button;
