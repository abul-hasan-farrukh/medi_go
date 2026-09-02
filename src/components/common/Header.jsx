import { Link, useNavigate } from "react-router-dom";
import "../../css/header.css";


function Header() {

  const navigate = useNavigate();

  //Check if user is logged in
  const handleSampleRequest = () => {
    const user = localStorage.getItem("userEmail");

    if (user) {
      // Show modal for logged-in users
      const modal = new window.bootstrap.Modal(document.getElementById("sampleModal"));
      modal.show();
    } else {
      // Show modal for non-logged users
      const modal = new window.bootstrap.Modal(document.getElementById("sampleModalGuest"));
      modal.show();
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light py-2 sticky-top shadow-sm" style={{ fontFamily: "poppins" }}>
        <div className="container">

          {/* Logo */}
          <Link className="navbar-brand fw-bold fs-3" to="/" style={{ color: "#2563eb" }}>
            <img src="" alt="" className="d-inline-block align-text-top" />
           <i className="fas fa-microscope"></i> MediGo
          </Link>

          {/* Mobile Toggle */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">

            {/* Center Links */}
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link custom-link px-2" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link custom-link px-2" to="/about">About Us</Link></li>
              <li className="nav-item"><Link className="nav-link custom-link px-2" to="/contact">Contact Us</Link></li>
              <li className="nav-item"><Link className="nav-link custom-link px-2" to="/show-camps">Camps</Link></li>
              <li className="nav-item"><Link className="nav-link custom-link px-2" to="/show-tests">Tests</Link></li>
              {/* <li className="nav-item"><Link className="nav-link custom-link px-2" to="/user-guide">User Guide</Link></li> */}
            </ul>

            {/*Sample Collection Button */}
            <button
              className="btn btn-danger me-2 sample-btn"
              onClick={handleSampleRequest}
            >
              Sample Collection Request
            </button>

            {/* Right Side */}
            <div className="d-flex">

              {/* Login */}
              <div className="dropdown me-2">
                <button
                  className="btn btn-outline-primary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                  Login
                </button>
                <ul className="dropdown-menu bg-white shadow border-0">
                  <li>
                    <Link className="dropdown-item" to="/user/user-login">
                      User
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/worker/worker-login">
                      Worker
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Sign Up */}
              <div className="dropdown">
                <Link to="/user/user-registration">
                  <button className="btn btn-primary">Sign Up</button>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </nav>

      {/* Modal  for Logged-In user*/}
      <div className="modal fade" id="sampleModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ borderRadius: "15px" }}>

            <div className="modal-header">
              <h5 className="modal-title ms-auto">Sample Collection Request</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body text-center">
              <p>
                We noticed you are already logged in, please go to your dashboard and submit the sample collection request from there.
              </p>

              <button
                className="btn btn-primary mt-2"
                onClick={() => {
                  const modalEl = document.getElementById("sampleModal");
                  const modalInstance = window.bootstrap.Modal.getInstance(modalEl);
                  modalInstance.hide();
                  navigate("/user/sample-collection")
                }}
              >
                Submit Request
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Modal for Guest/Unlogged user */}
      <div className="modal fade" id="sampleModalGuest" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ borderRadius: "15px" }}>

            <div className="modal-header">
              <h5 className="modal-title ms-auto">Create Account</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body text-center">
              <p>
                Please create an account to submit a sample collection request.
              </p>

              <button
                className="btn btn-success mt-2"
                onClick={() => {
                  const modalEl = document.getElementById("sampleModalGuest");
                  const modalInstance = window.bootstrap.Modal.getInstance(modalEl);
                  modalInstance.hide(); // close modal properly 
                  navigate("/user/user-registration")
                }}
              >
                Create Account
              </button>
            </div>

          </div>
        </div>
      </div>

    </>
  )
}
export default Header;