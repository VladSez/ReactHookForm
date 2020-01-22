import React from "react";
import { ErrorMessage } from "react-hook-form";
import { Error } from "./Error";
import "./styles.css";

export function InputContainer({ name, register, errors = {}, label }) {
  return (
    <div className="input-container">
      <label htmlFor={name} className="label">
        {label}
      </label>
      <input
        id={name}
        autoComplete="off"
        type={name === "email" ? "email" : "text"}
        aria-invalid={errors[name] ? "true" : "false"}
        aria-describedby={`${name}Error`}
        name={name}
        inputMode={name === "email" ? "email" : "text"}
        ref={register({
          required: "This field is required"
        })}
      />
      <ErrorMessage errors={errors} name={name} as={<Error />} />
    </div>
  );
}
