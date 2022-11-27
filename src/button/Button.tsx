import React, { useEffect } from "react";

type ButtonProps = {
  label: String;
  onPress: () => void;
  order?: number;
};

const Button: React.FC<ButtonProps> = ({ label, onPress, order }) => {
  return (
    <button
      onClick={onPress}
      style={{
        width: "100%",
        display: "flex",
        padding: "0",
        margin: "0",
        fontSize: "25px",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: order === 0 ? "5px 5px 0 0" : "0 0 5px 5px",
        borderTop: 0,
        borderLeft: 0,
        borderBottom: order === 0 ? "1px solid #aaaaaa" : 0,
      }}
    >
      {label}
    </button>
  );
};

export default Button;
