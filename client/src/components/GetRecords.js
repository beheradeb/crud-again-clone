import React, { Fragment, useState, useEffect } from "react";
import EditRecord from "./EditRecord";
const GetRecords = () => {
  const [datas, setDatas] = useState([]);

  const deleteRecord = async (id) => {
    try {
      const response = await fetch(`/delete/${id}`, {
        method: "DELETE",
      });
      setDatas(datas.filter((data) => data.t_id !== id));
    } catch (err) {
      console.log(err.message);
    }
  };

  const getRecords = async () => {
    try {
      const response = await fetch("/readall");
      const jsonData = await response.json();
      setDatas(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getRecords();
  }, []);

  return (
    <Fragment>
      <table className="table border-0 mt-5 text-center">
        <thead>
          <tr>
            <th className="text-info border-0">DESCRIPTION</th>
            <th className="text-info border-0">EDIT</th>
            <th className="text-info border-0">DELETE</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data) => (
            <tr key={data.t_id}>
              <td className="border-0 text-primary">{data.description}</td>
              <td className="border-0">
                <EditRecord data={data} />
              </td>
              <td className="border-0">
                <button
                  className="btn btn-danger"
                  onClick={() => deleteRecord(data.t_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default GetRecords;
