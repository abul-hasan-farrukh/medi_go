import React from 'react'

function Footer() {
  return (
    <>
      {/* <!-- Remove the container if you want to extend the Footer to full width. --> */}
      {/* <div className="container-fluid my-5"> */}

      <footer className="text-white text-lg-start" style={{ fontFamily: "poppins", backgroundColor: "#2563eb"}}>

        {/* <!-- Grid container --> */}
        <div className="container p-4">
          {/* <!--Grid row--> */}
          <div className="row mt-4">

            {/* <!--Grid column--> */}
            <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
              <h5 className="text-uppercase mb-4">About MediGo</h5>

              <p>
                MediGo is a smart digital pathology platform designed to simplify diagnostic services.
                We provide seamless test booking, home sample collection, and secure report access.
              </p>

              <p>
                Our goal is to make healthcare faster, more reliable, and easily accessible for everyone.
              </p>

              {/* Social Icons Start */}
              {/* <div className="mt-4">
                <a className="btn btn-outline-light btn-floating m-1" href="#"><i className="fab fa-facebook-f"></i></a>
                <a className="btn btn-outline-light btn-floating m-1" href="#"><i className="fab fa-twitter"></i></a>
                <a className="btn btn-outline-light btn-floating m-1" href="#"><i className="fab fa-linkedin-in"></i></a>
                <a className="btn btn-outline-light btn-floating m-1" href="#"><i className="fab fa-instagram"></i></a>
              </div> */}
              {/* Social Icons End */}

            </div>
            {/* <!--Grid column--> */}

            {/* <!--Grid column--> */}
            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase mb-4 pb-1">Our Services</h5>

              <ul className="fa-ul" style={{ marginLeft: "1.65em" }}>
                <li className="mb-3">
                  <span className="fa-li"><i className="fas fa-vial text-white"></i></span>
                  <span className="ms-2">Diagnostic Test Booking</span>
                </li>
                <li className="mb-3">
                  <span className="fa-li"><i className="fas fa-truck-medical text-white"></i></span>
                  <span className="ms-2">Home Sample Collection</span>
                </li>
                <li className="mb-3">
                  <span className="fa-li"><i className="fas fa-file-medical text-white"></i></span>
                  <span className="ms-2">Online Report Access</span>
                </li>
                <li className="mb-3">
                  <span className="fa-li"><i className="fas fa-calendar-check text-white"></i></span>
                  <span className="ms-2">Health Camp Management</span>
                </li>
              </ul>

              <h5 className="text-uppercase mt-4">Contact</h5>

              <ul className="fa-ul" style={{ marginLeft: "1.65em" }}>
                <li className="mb-3">
                  <span className="fa-li"><i className="fas fa-map-marker-alt"></i></span>
                  <span className="ms-2">Lucknow, Uttar Pradesh, India</span>
                </li>
                <li className="mb-3">
                  <span className="fa-li"><i className="fas fa-envelope"></i></span>
                  <span className="ms-2">support@medigo.com</span>
                </li>
                <li className="mb-3">
                  <span className="fa-li"><i className="fas fa-phone"></i></span>
                  <span className="ms-2">+91 9532446928</span>
                </li>
              </ul>

            </div>
            {/* <!--Grid column--> */}

            {/* <!--Grid column--> */}
            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase mb-4">Working Hours</h5>

              <table className="table text-white text-center">
                <tbody className="fw-normal">
                  <tr>
                    <td>Mon - Sat:</td>
                    <td>8:00 AM - 8:00 PM</td>
                  </tr>
                  <tr>
                    <td>Sunday:</td>
                    <td>9:00 AM - 2:00 PM</td>
                  </tr>
                </tbody>
              </table>

              <h5 className="text-uppercase mt-4">Why MediGo?</h5>
              <ul className="list-unstyled">
                <li><i className="fas fa-check text-success me-2 text-white"></i>Fast & Secure Reports</li>
                <li><i className="fas fa-check text-success me-2 text-white"></i>Trusted Diagnostics</li>
                <li><i className="fas fa-check text-success me-2 text-white"></i>Home Collection Facility</li>
                <li><i className="fas fa-check text-success me-2 text-white"></i>Easy Online Booking</li>
              </ul>

            </div>
            {/* <!--Grid column--> */}

          </div>
          {/* <!--Grid row--> */}
        </div>
        {/* <!-- Grid container --> */}

        {/* <!-- Copyright --> */}
        <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
          © 2026 MediGo |
          <a className="text-white ms-1" style={{ textDecoration: "none" }} href="https://github.com/abul-hasan-farrukh"> Designed & Developed by Abul Hasan Farrukh</a>
        </div>
        {/* <!-- Copyright --> */}

      </footer>

      {/* </div> */}
      {/* <!-- End of .container --> */}
    </>
  )
}

export default Footer