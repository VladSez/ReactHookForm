import React from "react";
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import { ErrorMessage } from "react-hook-form";
import { Error } from "./Error";

const defaultMaskOptions = {
  prefix: "",
  // suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ",",
  allowDecimal: false,
  decimalSymbol: ".",
  // decimalLimit: 2, // how many digits allowed after the decimal
  integerLimit: 10, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false
};

const unformatPrice = value => {
  return value
    .split("")
    .filter(el => el !== ",")
    .join("");
};

export const NumberInput = ({
  maskOptions,
  name,
  label,
  register,
  setValue,
  triggerValidation,
  errors
}) => {
  const [val, setVal] = React.useState("");
  const currencyMask = createNumberMask({
    ...defaultMaskOptions,
    ...maskOptions
  });
  return (
    <>
      <div className="input-container">
        <label htmlFor={name} className="label">
          {label}
        </label>
        <MaskedInput
          id={name}
          name="price"
          inputMode="decimal"
          ref={() =>
            register(
              { name: "price" },
              {
                required: "This field is required"
                // validate: value => {
                //   // console.log("value", Number(unformatPrice(value)));
                //   return value > 0 || "must be positive number";
                // }
              }
            )
          }
          mask={currencyMask}
          value={val}
          onChange={async e => {
            const value = e.target.value;
            if (e.target.value.split("")[0] === "0") {
              e.target.value = val;
              return setVal(e.target.value);
            }
            setVal(value);
            setValue("price", unformatPrice(value));
            triggerValidation("price");
          }}
          onBlur={async () => {
            triggerValidation("price");
          }}
        />
        <ErrorMessage errors={errors} name="price" as={<Error />} />
      </div>
    </>
  );
};
