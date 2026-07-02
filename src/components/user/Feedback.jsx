import { useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { BASE_URL } from "../../config";

function Feedback() {

  //Sending request to backend to save data in database
    const email = localStorage.getItem("userEmail")

  const APIURL = `${BASE_URL}/user/feedback`

  const [data, setData] = useState({ email: email, review: "", rating: "" })

  const [validate, setValidate] = useState(false)

  const fetchData = (e) => {
    console.log(e.target); //returns object
    const { name, value } = e.target //destructuring the object, name means control name and value is the value entered by user

    // if ((name === "email") && !emailRegex.test(value)) {
    //     // alert("Enter valid email address")

    //     // Sweetalert popup below
    //     Swal.fire({
    //         title: "Input Field Error",
    //         text: "Please enter vaild email address",
    //         icon: "error"
    //     });
    //     return;
    // }

    // if ((name === "name")) {
    //     // alert("Only alphabets are allowed")

    //     // Sweetalert popup below
    //     Swal.fire({
    //         title: "Input Field Error",
    //         text: "Please enter alphabets only",
    //         icon: "error"
    //     });
    //     return;
    // }

    // if ((name === "phone") && !numberRegex.test(value)) {
    //     // alert("Only digits are allowed")

    //     // Sweetalert popup below
    //     Swal.fire({
    //         title: "Input Field Error",
    //         text: "Please enter digits only",
    //         icon: "error"
    //     });

    //     return;
    // }

    //setting values in state variale setData
    setData({ ...data, [name]: value }) //object is already destructured that's why we are use name and value here.

  }

  const submitForm = async (e) => {
    // alert("in function")
    e.preventDefault()
    console.log(e.currentTarget);
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      e.stopPropagation()
      e.preventDefault()
    }
    setValidate(true)

    // Checking, if any field is empty before sending API request or submitting feedback.
    if (!data.review) {
      Swal.fire({
        title: "Input Field Error",
        text: "Please enter review in the input box",
        icon: "error"
      });
      return;
    }

    //code for backend processing start below
    try {
      const serverResponse = await axios.post(APIURL, data) //sending data on APIURL.
      console.log("Send by SpringBoot: " + serverResponse);

      console.log(serverResponse.data); //this data is of axios

      // Feedback Submission Success PopUp
  Swal.fire({
    title: "Success!",
    text: "Feedback Submitted Successfully",
    icon: "success",
    confirmButtonText: "OK"
  });

  // clear all entries after submit.
  setData({
  email: email,
  review: "",
  rating: ""
})


    } catch (error) { //returning error as an object from backend
      console.log(error);

      // error popup
  Swal.fire({
    title: "Error!",
    text: "Something went wrong. Please try again.",
    icon: "error"
  });

    }

    // console.log(`Name is ${data.name}`);
    // console.log(`Email is ${data.email}`);
    // console.log(`Phone is ${data.phone}`);
    // console.log(`Question is ${data.question}`);



  }

  return (
    <>
      <div className="container" style={{ maxWidth: "600px", marginTop: "125px", fontFamily: "poppins" }}>
        <div className="card shadow p-4 border-0 rounded-4">

          <form onSubmit={submitForm} className={`needs-validation ${validate ? 'was-validated' : ''}`} noValidate>

            {/* Heading */}
            <h2 className="text-center mb-4 fw-bold">Rate Us</h2>

            {/* Email (Readonly) */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Your Email</label>
              <input
              placeholder='Enter email id'
                type="email"
                className="form-control"
                readOnly
                name="email"
                value={email}
              />
            </div>

            {/* Review */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Write Your Review</label>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Share your experience with MediGo..."
                name="review" value={data.review} onChange={fetchData} required
              ></textarea>
            </div>

            {/* Emoticons */}
            <div className="text-center mb-3">
              <div className="d-flex justify-content-between fs-3 px-0">
                <span>😡</span>
                <span>😕</span>
                <span>😐</span>
                <span>🙂</span>
                <span>😍</span>
              </div>
            </div>

            {/* Slider */}
            <div className="mb-4">
              <input
                type="range"
                className="form-range"
                min="1"
                max="5"
                step="1"
                name="rating" value={data.rating} onChange={fetchData} required
              />
            </div>

            {/* Submit Button */}
            <div className="d-grid">
              <button className="btn btn-success fw-bold py-2">
                Submit
              </button>
            </div>

          </form>

        </div>
      </div>
    </>
  )
}

export default Feedback