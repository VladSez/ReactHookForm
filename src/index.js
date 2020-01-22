import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { registerLocale } from "react-datepicker";
import { format } from "date-fns";

import { InputContainer } from "./InputContainer";
import { NumberInput } from "./NumberInput";
import { DatePicker } from "./DatePicker";
import { FileUpload } from "./FileUpload";

import ru from "date-fns/locale/ru";

import "./styles.css";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("ru", ru);

function App() {
  const [files, setFile] = React.useState([]);
  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      secondName: "",
      price: "",
      date: ""
    }
  });
  const {
    register,
    unregister,
    handleSubmit,
    errors,
    watch,
    setValue,
    triggerValidation
    // formState: { touched, isSubmitting }
  } = methods;

  const watchAllFields = watch();
  console.log(watchAllFields);
  // console.log("touched", touched);
  // console.log("getValues", getValues());

  useEffect(() => {
    register({ name: "date" }, { required: "This field is required" });
    register({ name: "image" });

    return () => unregister(["date", "image"]);
  }, [register, unregister]);

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  const onSubmit = data => {
    console.log("data", data);
    //uploading images to firebase

    //     const promises = []
    //     for(let el of files){
    //       promises.push(storage.ref(`images/${el.path}`).put(el))
    //     }

    // Promise.all(promises)
    //   .then(console.log)
    //   .catch(console.log);
  };

  const setFiles = file => {
    setFile(prevState => {
      return [...prevState, ...file];
    });
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    setValue("image", "");
    setFile(prevState => {
      return prevState.filter(el => el.id !== id);
    });
  };

  //if this needed???
  const reactHookFormProps = {
    setFiles,
    register,
    setValue,
    errors,
    triggerValidation
  };

  // console.log(reactHookFormProps);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <InputContainer
          name="propertyName"
          label="Property Name"
          register={register}
          errors={errors}
        /> */}
        {/* <InputContainer
          name="email"
          label="Email"
          register={register}
          errors={errors}
        /> */}
        <NumberInput
          name="price"
          label="Price"
          {...reactHookFormProps}
          // register={register}
          // setValue={setValue}
          // errors={errors}
          // triggerValidation={triggerValidation}
        />
        {/* {console.log(files)} */}
        <DatePicker label="Available from" {...reactHookFormProps} />
        <ImageUploadZone
          files={files}
          setFiles={setFiles}
          handleDelete={handleDelete}
          reactHookFormProps={reactHookFormProps}
        />

        <input type="submit" style={{ marginTop: "1050px" }} />
      </form>
    </>
  );
}

function ImageUploadZone({
  files,
  setFiles,
  handleDelete,
  reactHookFormProps
}) {
  return (
    <div className="file-upload-section">
      {files.map(el => {
        return <FilePreview key={el.id} {...el} handleDelete={handleDelete} />;
      })}
      <FileUpload setFiles={setFiles} {...reactHookFormProps} />
    </div>
  );
}

function FilePreview({ id, preview, handleDelete }) {
  return (
    <div
      style={{
        position: "relative",
        margin: "10px 10px 10px 0"
      }}
    >
      <img src={preview} className="file-preview-img" alt="preview" />
      <button
        title="Delete image"
        aria-label="Delete image"
        onClick={e => handleDelete(e, id)}
        className="remove-preview-img"
      >
        X
      </button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
