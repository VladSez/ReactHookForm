import React from "react";
import { useDropzone } from "react-dropzone";
import { ErrorMessage } from "react-hook-form";
import { Error } from "./Error";
import "./styles.css";

let count = 0;

export function FileUpload({
  setFiles,
  register,
  errors,
  setValue,
  triggerValidation
}) {
  console.log(errors);

  const onDrop = React.useCallback(acceptedFile => {
    const newFile = acceptedFile.map(file => {
      return {
        ...file,
        id: count++,
        preview: URL.createObjectURL(file)
      };
    });
    setValue("image", newFile);
    setFiles(newFile);
    triggerValidation("image");
  }, []);

  const { getRootProps, getInputProps, rootRef, inputRef } = useDropzone({
    accept: "image/*",
    onDrop
  });

  // console.log("rootRef", rootRef);
  // console.log("inputRef", inputRef);

  React.useEffect(() => {
    if (rootRef && rootRef.current && errors.image) {
      rootRef.current.focus();
    }
  }, [rootRef, errors.image]);

  return (
    <>
      <div {...getRootProps({ className: "dropzone" })}>
        <input
          name="image"
          ref={register(
            { name: "image" },
            {
              required: "This field is required"
            }
          )}
          {...getInputProps()}
        />
        <div className="photo-upload-area">
          Drag 'n' drop photos, or click to select
        </div>
        <ErrorMessage errors={errors} name="image" as={<Error />} />
      </div>
    </>
  );
}
