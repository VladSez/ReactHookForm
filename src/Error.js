import React from "react";
import "./styles.css";

export function Error({ children, name }) {
  return (
    <p className="error" id={`${name}Error`}>
      {children}
    </p>
  );
}
