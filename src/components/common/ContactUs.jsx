import Header from './Header'
import Footer from './Footer'
import { useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'

function ContactUs() {

    //Sending request to backend to save data in database
    const APIURL = "http://localhost:9090/addContact"
    const [data, setData] = useState({ name: "", email: "", phone: "", question: "" })

    const [validate, setValidate] = useState(false)

    const fetchData = (e) => {
        console.log(e.target); //returns object
        const { name, value } = e.target //destructuring the object, name means control name and value is the value entered by user

        const alphaRegex = /^[A-Za-z\s]*$/;
        const numberRegex = /^[0-9]*$/;

        if ((name === "name") && !alphaRegex.test(value)) {
            // alert("Only alphabets are allowed")

            // Sweetalert popup below
            Swal.fire({
                title: "Input Field Error",
                text: "Please enter alphabets only",
                icon: "error"
            });
            return;
        }

        if ((name === "phone") && !numberRegex.test(value)) {
            // alert("Only digits are allowed")

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
            //alert(serverResponse.data);

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

        // console.log(`Name is ${data.name}`);
        // console.log(`Email is ${data.email}`);
        // console.log(`Phone is ${data.phone}`);
        // console.log(`Question is ${data.question}`);

    }

    return (
        <>
            <Header />
            <div className='main-div'>
                <div className="flexContainer">
                    <div>
                        <img className="img" src='/images/registration.png' alt="" />
                    </div>

                    <div className='formContainer'>
                        <form onSubmit={submitForm} className={`needs-validation ${validate ? 'was-validated' : ''}`} noValidate>
                            {/* <form action=""> */}

                            <label htmlFor="name" className="form-label">Name:</label>
                            <div className="input-group mb-3 ">
                                <span className="input-group-text">
                                    <i className="fa-solid fa-user"></i>
                                </span>
                                <input type="text" name="name" value={data.name} onChange={fetchData} className="form-control bg-primary-subtle" placeholder="Enter your name" required />
                                <div className="invalid-feedback">
                                    Please enter valid name.
                                </div>
                            </div>


                            <label htmlFor="email" className="form-label">Email:</label>
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <i className="far fa-envelope-open"></i>
                                </span>
                                <input type="email" name="email" value={data.email} onChange={fetchData} className="form-control bg-primary-subtle" placeholder="Enter your email" required />
                                <div className="invalid-feedback">
                                    Please enter valid email.
                                </div>
                            </div>

                            <label htmlFor="email" className="form-label">Phone No:</label>
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <i className="fas fa-phone"></i>
                                </span>
                                <input type="text" name="phone" value={data.phone} onChange={fetchData} className="form-control bg-primary-subtle" placeholder="Enter your phone" required />
                                <div className="invalid-feedback">
                                    Please enter valid phone number.
                                </div>
                            </div>

                            <label htmlFor="email" className="form-label">Question:</label>
                            <div className="input-group">
                                <span className="input-group-text"><i className="fa-solid fa-address-card"></i></span>
                                <textarea col="2" rows="2" name="question" value={data.question} onChange={fetchData} className="form-control bg-primary-subtle" aria-label="With textarea" required></textarea>
                                <div className="invalid-feedback">
                                    Please enter valid question.
                                </div>
                            </div>

                            <div className="d-grid mt-4 col-3 mx-auto">
                                <button className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>

                </div>


                {/* Using Map Here */}
                {/* Div for Map */}
                <div className="container-fluid">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.9193209383857!2d80.95672737475688!3d26.874304261741308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd66707a1371%3A0x49dc27c64bc0aab2!2sPrecursor%20Info%20Solutions%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1770980695441!5m2!1sen!2sin" style={{ border: "0", width: "100%", height: "450px", marginTop: "50px" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default ContactUs