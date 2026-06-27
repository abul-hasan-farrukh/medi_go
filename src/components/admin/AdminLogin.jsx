import Header from '../common/Header'
import Footer from '../common/Footer'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import axios from "axios"
import Swal from 'sweetalert2'
import { BASE_URL } from "../../config";


function AdminLogin() {

  const navigate = useNavigate()

  const APIURL = `${BASE_URL}/admin/login`

  const [data, setData] = useState({ email: "", password: "" })
  const [validate, setValidate] = useState(false)

  const fetchData = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  const submitForm = async (e) => {

    e.preventDefault()
    const form = e.currentTarget

    if (!form.checkValidity()) {
      e.stopPropagation()
      setValidate(true)
    }

    setValidate(true)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordRegex = /^.{6,}$/

    if (!emailRegex.test(data.email)) {
      Swal.fire({
        title: "Input Field Error",
        text: "Please enter valid email address",
        icon: "error"
      })
      return
    }

    if (!passwordRegex.test(data.password)) {
      Swal.fire({
        title: "Input Field Error",
        text: "Password must be at least 12 characters long",
        icon: "error"
      })
      return
    }

    try {

      const serverResponse = await axios.post(APIURL, data)

      const serverMessage = serverResponse.data

      if (serverMessage === "success") {

        localStorage.setItem("adminEmail", data.email)
        navigate("/admin/admin-dashboard")

        Swal.fire({
        title: "Admin Status",
        text: serverResponse.data,
        icon: "success"
      })

      } else {

        // alert(serverMessage)

        Swal.fire({
        title: "Admin Status",
        text: serverResponse.data,
        icon: "error"
      })

      }

      // Swal.fire({
      //   title: "Admin Status",
      //   text: serverResponse.data,
      //   icon: "success"
      // })

    }

    catch (error) {

      console.log("Login error:", error)

    }

    setData({ email: "", password: "" })
  }

  return (
    <>
      <Header />

      <section
        className="d-flex align-items-center justify-content-center position-relative overflow-hidden"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #97d9f8, #f0f9ff, #f7e8e8)",
          fontFamily: "Poppins"
        }}
      >

        {/* Glow Shapes */}

        <div
          style={{
            position: "absolute",
            width: "450px",
            height: "450px",
            background: "rgba(16, 140, 197, 0.35)",
            borderRadius: "50%",
            top: "-150px",
            right: "-120px",
            filter: "blur(120px)"
          }}
        ></div>

        <div
          style={{
            position: "absolute",
            width: "400px",
            height: "400px",
            background: "rgba(16, 19, 180, 0.35)",
            borderRadius: "50%",
            bottom: "-120px",
            left: "-120px",
            filter: "blur(120px)"
          }}
        ></div>

        <div className="container position-relative">

          <div className="row justify-content-center">

            <div className="col-md-10 col-lg-8 col-xl-7">

              <div
                className="card shadow"
                style={{
                  borderRadius: "1.2rem",
                  background: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(10px)",
                  position: "relative",
                  zIndex: 2
                }}
              >

                <div className="row g-0">

                  {/* Left Illustration */}

                  <div className="col-md-5 d-none d-md-flex align-items-center justify-content-center p-3">
                    <img
                      src="../images/adminLogin.jpg"
                      alt="admin login"
                      className="img-fluid"
                      style={{ maxHeight: "320px" }}
                    />
                  </div>

                  {/* Login Form */}

                  <div className="col-md-7 d-flex align-items-center">

                    <div className="card-body p-4 text-black">

                      <form
                        onSubmit={submitForm}
                        className={`needs-validation ${validate ? 'was-validated' : ''}`}
                        noValidate
                      >

                        <div className="text-center mb-2">
                          <span className="h4 fw-bold d-block">
                            MediGo Admin Login
                          </span>
                        </div>

                        <p className="text-center text-muted mb-4">
                          Sign into your admin account
                        </p>

                        <div className="form-floating mb-3">

                          <input
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            name="email"
                            value={data.email}
                            onChange={fetchData}
                            required
                          />

                          <label htmlFor="floatingInput">Email</label>

                          <div className="invalid-feedback">
                            Please enter email address.
                          </div>

                        </div>

                        <div className="form-floating mb-4">

                          <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            name="password"
                            value={data.password}
                            onChange={fetchData}
                            required
                          />

                          <label htmlFor="floatingPassword">Password</label>

                          <div className="invalid-feedback">
                            Please enter your password.
                          </div>

                        </div>

                        <button
                          className="btn w-100"
                          style={{
                            background: "linear-gradient(90deg,#0d6efd,#20c997)",
                            color: "white",
                            borderRadius: "8px",
                            padding: "10px",
                            transition: "0.3s ease"
                          }}
                          onMouseOver={(e) =>
                            (e.target.style.background =
                              "linear-gradient(90deg,#0b5ed7,#198754)")
                          }
                          onMouseOut={(e) =>
                            (e.target.style.background =
                              "linear-gradient(90deg,#0d6efd,#20c997)")
                          }
                        >
                          Login
                        </button>

                        <div className="mt-3 text-center">
                          <a className="small text-muted" href="#!">
                            Forgot password?
                          </a>
                        </div>

                      </form>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      <Footer />
    </>
  )
}

export default AdminLogin