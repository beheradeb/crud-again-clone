import { Fragment, useState } from "react";

const CreateRecord = () => {
  const [description, setDescription] = useState("");

  const onSubForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch("/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-4 ">
        <span className="text-success">C</span>
        <span className="text-primary">R</span>
        <span className="text-warning">U</span>
        <span className="text-danger">D</span>
        <span className="text-info m-3">OPERATION</span>
      </h1>
      <form className="d-flex mt-5" onSubmit={onSubForm}>
        <input
          type="text"
          placeholder="Enter your description here..."
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-success ml-1">create</button>
      </form>
    </Fragment>
  );
};
export default CreateRecord;
