import AdminHeader from "./AdminHeader";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AddWorker() {

const APIURL = "http://localhost:9090/admin/addWorker";

const [worker, setWorker] = useState({
email: "",
name: "",
password: "",
phone: "",
age: "",
gender: "",
address: "",
qualification: "",
experience: "",
type: ""
});

const [validate, setValidate] = useState(false);

const fetchData = (e) => {
const { name, value } = e.target;
setWorker({
...worker,
[name]: value
});
};

const submitForm = async (e) => {


e.preventDefault();

const form = e.currentTarget;

if (!form.checkValidity()) {
  e.stopPropagation();
  e.preventDefault();
}

setValidate(true);

try {

  const serverResponse = await axios.post(APIURL, worker);

  Swal.fire({
    title: "Worker Added",
    text: "Worker added successfully",
    icon: "success"
  });

  setWorker({
    email: "",
    name: "",
    password: "",
    phone: "",
    age: "",
    gender: "",
    address: "",
    qualification: "",
    experience: "",
    type: ""
  });

  setValidate(false);

} catch (error) {

  Swal.fire({
    title: "Error",
    text: "Failed to add worker",
    icon: "error"
  });

}


};

return (
<> 
<AdminHeader />

  <div
    style={{
      marginLeft: "240px",
      marginTop: "70px",
      padding: "20px",
      fontFamily: "poppins"
    }}
  >

    <h3 style={{ textAlign: "center", marginTop: "-50px" }} className="mb-4 fw-bold">
      👷 Add New Worker
    </h3>

    <div className="card shadow-sm">

      <div className="card-body">

        <form
          onSubmit={submitForm}
          className={`needs-validation ${validate ? "was-validated" : ""}`}
          noValidate
        >

          <div className="row">

            <div className="col-md-6 mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={worker.email}
                onChange={fetchData}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={worker.name}
                onChange={fetchData}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={worker.password}
                onChange={fetchData}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Phone</label>
              <input
                type="text"
                className="form-control"
                name="phone"
                value={worker.phone}
                onChange={fetchData}
                required
              />
            </div>

            <div className="col-md-4 mb-3">
              <label>Age</label>
              <input
                type="number"
                className="form-control"
                name="age"
                value={worker.age}
                onChange={fetchData}
                required
              />
            </div>

            <div className="col-md-4 mb-3">
              <label>Gender</label>
              <select
                className="form-select"
                name="gender"
                value={worker.gender}
                onChange={fetchData}
                required
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <label>Worker Type</label>
              <select
                className="form-select"
                name="type"
                value={worker.type}
                onChange={fetchData}
                required
              >
                <option value="">Select Type</option>
                <option value="Sample Collector">Sample Collector</option>
                <option value="Executive">Executive</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label>Qualification</label>
              <input
                type="text"
                className="form-control"
                name="qualification"
                value={worker.qualification}
                onChange={fetchData}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Experience</label>
              <input
                type="text"
                className="form-control"
                name="experience"
                value={worker.experience}
                onChange={fetchData}
                required
              />
            </div>

            <div className="col-12 mb-3">
              <label>Address</label>
              <textarea
                className="form-control"
                rows="3"
                name="address"
                value={worker.address}
                onChange={fetchData}
                required
              />
            </div>

          </div>

          <div className="text-center mt-3">
            <button className="btn btn-success px-5">
              Add Worker
            </button>
          </div>

        </form>

      </div>

    </div>

  </div>
</>
);
}

export default AddWorker;
