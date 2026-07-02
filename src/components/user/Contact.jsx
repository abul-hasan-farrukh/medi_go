
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import UserHeader from './UserHeader'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from "../../config";


function Contact() {

    const email = localStorage.getItem("userEmail")

    const navigate = useNavigate();

      //code to redirect the user to login page if this page is directly accessed from url - 17 April, 2026
      useEffect(()=> {
        
        if(email === null){
          navigate("/user/user-login")
        } 
      },[])


    //Sending request to backend to save data in database
    const APIURL = `${BASE_URL}/addContact`
    const [data, setData] = useState({ name: "", email: "", phone: "", question: "" })

    const [validate, setValidate] = useState(false)

    const fetchData = (e) => {
        console.log(e.target); //returns object
        const { name, value } = e.target //destructuring the object, name means control name and value is the value entered by user

        const alphaRegex = /^[A-Za-z\s]*$/;
        const numberRegex = /^[0-9]*$/;

        if ((name === "name") && !alphaRegex.test(value)) {

            // Sweetalert popup below
            Swal.fire({
                title: "Input Field Error",
                text: "Please enter alphabets only",
                icon: "error"
            });
            return;
        }

        if ((name === "phone") && !numberRegex.test(value)) {

            // Sweetalert popup below
            Swal.fire({
                title: "Input Field Error",
                text: "Please enter digits only",
                icon: "error"
            });

            return;
        }

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

        //code for backend processing start below
        try {
            const serverResponse = await axios.post(APIURL, data) //sending data on APIURL.
            console.log("Send by SpringBoot: "+serverResponse);

            console.log(serverResponse.data); //this data is of axios

            Swal.fire({
                title: "Contact Status",
                text: serverResponse.data,
                icon: "success"
            });
            
            
        } catch (error) { //returning error as an object from backend
            console.log(error);
            
        }

        //clear all the text fields
        setData({ name: "", email: "", phone: "", question: "" })

    }

    return (
        <>
            <UserHeader />

            <div style={{ fontFamily: "poppins", marginTop: "60px" }}>

                <div className="container py-5 d-flex justify-content-center">

                    {/* MAIN CARD */}
                    <div className="card shadow-lg border-0" style={{ maxWidth: "1000px", width: "100%", overflow: "hidden" }}>
                        <div className="row g-0">

                            {/* LEFT IMAGE */}
                            <div className="col-md-5">
                                <img
                                    src="/images/contact.png"
                                    alt=""
                                    style={{ width: "100%", height: "100%", objectFit: "cover"}}
                                />
                            </div>

                            {/* RIGHT FORM */}
                            <div className="col-md-7 p-4">

                                <h3 className="fw-bold mb-4 text-center">Get In Touch With Us</h3>

                                <form onSubmit={submitForm} className={`needs-validation ${validate ? 'was-validated' : ''}`} noValidate>
                                    {/* <form action=""> */}

                                    <label htmlFor="name" className="form-label">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        onChange={fetchData}
                                        className="form-control mb-3"
                                        placeholder="Enter your name"
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Please enter valid name.
                                    </div>

                                    <label htmlFor="email" className="form-label">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={fetchData}
                                        className="form-control mb-3"
                                        placeholder="Enter your email"
                                        required
                                        readOnly
                                    />
                                    <div className="invalid-feedback">
                                        Please enter valid email.
                                    </div>

                                    <label htmlFor="email" className="form-label">Phone No</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={data.phone}
                                        onChange={fetchData}
                                        className="form-control mb-3"
                                        placeholder="Enter your phone"
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Please enter valid phone number.
                                    </div>

                                    <label htmlFor="email" className="form-label">Message</label>
                                    <textarea
                                        rows="4"
                                        name="question"
                                        value={data.question}
                                        onChange={fetchData}
                                        className="form-control mb-4"
                                        placeholder="Write your message..."
                                        required
                                    ></textarea>
                                    <div className="invalid-feedback">
                                        Please enter valid question.
                                    </div>

                                    <div className="d-grid">
                                        <button className="btn btn-primary btn-lg">
                                            Send Message
                                        </button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Using Map Here */}
                {/* Div for Map */}
                <div className="container py-5">
                    <h2 className="text-center fw-bold mb-4">Find Us Here</h2>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.9193209383857!2d80.95672737475688!3d26.874304261741308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd66707a1371%3A0x49dc27c64bc0aab2!2sPrecursor%20Info%20Solutions%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1770980695441!5m2!1sen!2sin"
                        style={{ border: "0", width: "100%", height: "450px", borderRadius: "10px" }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>

            </div>

            
        </>
    )
}
export default Contact