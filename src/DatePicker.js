import React from "react";
import ReactDatePicker from "react-datepicker";
import { format } from "date-fns";
import { ErrorMessage } from "react-hook-form";
import { Error } from "./Error";

const start = new Date();
export function DatePicker({ setValue, label, triggerValidation, errors }) {
  const [startDate, setStartDate] = React.useState("");

  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref && errors.date) {
      ref.current.input.focus();
      ref.current.setOpen(false);
    }
  }, [errors.date]);

  return (
    <div className="input-container">
      <label htmlFor="date" className="label">
        {label}
      </label>
      <ReactDatePicker
        id="date"
        ref={ref}
        name="date"
        selected={startDate}
        onChange={date => {
          setStartDate(new Date(date));
          const formattedDate = format(new Date(date), "dd/MM/yyyy");
          setValue("date", formattedDate);
          triggerValidation("date");
        }}
        locale="ru"
        dateFormat="dd/MM/yyyy"
        minDate={start}
        onFocus={e => {
          if (e) {
            e.target.readOnly = true;
          }
        }}
        withPortal
        placeholderText="DD/MM/YYYY"
      />
      <ErrorMessage errors={errors} name="date" as={<Error />} />
    </div>
  );
}
