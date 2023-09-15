import { Fragment } from "react";
import "./App.css";
//components
import CreateRecord from "./components/CreateRecord";
import GetRecords from "./components/GetRecords";
function App() {
  return (
    <Fragment>
      <div className="container">
        <CreateRecord />
        <GetRecords />
      </div>
    </Fragment>
  );
}

export default App;
