import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function WorkerHeader({ name }) {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate()

  //function for Worker Logout - 09 Mar, 2026
  const logout = () => {
    //fetching value from localstorage
    const email = localStorage.getItem("workerEmail")

    if (email != null) {
      localStorage.removeItem("workerEmail") //clear all the values from browser storage
      navigate("/worker/worker-login") //redirect Worker to the login page after logout.
    }
  }

  return (
    <>
      {/* Navbar */}
      <nav
        className="navbar navbar-dark fixed-top px-3"
        style={{ backgroundColor: "#4620cd", height: "60px", fontFamily: "poppins"}}
      >
        <div className="container-fluid d-flex justify-content-between">
          <span className="navbar-brand mb-0 h5 text-white">
            Worker Dashboard
          </span>

          <button
            className="btn text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <i className="fa-solid fa-bars fs-4"></i>
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className="worker-sidebar"
        style={{
          right: isOpen ? "0" : "-250px", fontFamily: "poppins"
        }}
      >
        {/* Worker Section */}
        <div className="text-center text-white mb-4">
          <i className="fa-solid fa-user-circle fs-1 mb-2"></i>
          <h6>Hello {name ? name : "Worker"}</h6>
        </div>

        {/* Menu */}
        <ul className="nav flex-column px-3">

          <li className="nav-item mb-2">
            <NavLink
              to="/worker/worker-dashboard"
              className={({ isActive }) =>
                `nav-link menu-item text-white ${isActive ? "active-link" : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              <i className="fa-solid fa-house me-2"></i>Home
            </NavLink>
          </li>

          {/* <li className="nav-item mb-2">
            <NavLink
              to="/worker/add-test"
              className={({ isActive }) =>
                `nav-link menu-item text-white ${isActive ? "active-link" : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              <i className="fa-solid fa-vial me-2"></i> Add Test
            </NavLink>
          </li> */}

          {/* <li className="nav-item mb-2">
            <NavLink
              to="/worker/update-test"
              className={({ isActive }) =>
                `nav-link menu-item text-white ${isActive ? "active-link" : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              <i className="fa-solid fa-pen-to-square me-2"></i> Update Test
            </NavLink>
          </li> */}

          <li className="nav-item mb-2">
            <NavLink
              to="/worker/sample-request"
              className={({ isActive }) =>
                `nav-link menu-item text-white ${isActive ? "active-link" : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              <i className="fa-solid fa-check-circle me-2"></i>Sample Request
            </NavLink>
          </li>

          {/* <li className="nav-item mb-2">
            <NavLink
              to="/worker/verify-payment"
              className={({ isActive }) =>
                `nav-link menu-item text-white ${isActive ? "active-link" : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              <i className="fa-solid fa-credit-card me-2"></i> Verify Payment
            </NavLink>
          </li> */}


           <li className="nav-item mb-2">
            <NavLink
              to="/worker/pending-booking-request"
              className={({ isActive }) =>
                `nav-link menu-item text-white ${isActive ? "active-link" : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              <i className="fa-solid fa-credit-card me-2"></i>Pending Booking
            </NavLink>
          </li>


   <li className="nav-item mb-2">
            <NavLink
              to="/worker/confirmed-booking-request"
              className={({ isActive }) =>
                `nav-link menu-item text-white ${isActive ? "active-link" : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              <i className="fa-solid fa-check-circle me-2"></i>Confirmed Booking
            </NavLink>
          </li>



   <li className="nav-item mb-2">
            <NavLink
              to="/worker/upload-test-report"
              className={({ isActive }) =>
                `nav-link menu-item text-white ${isActive ? "active-link" : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              <i className="fa-solid fa-credit-card me-2"></i>Upload Test Report
            </NavLink>
          </li>


          {/* <li className="nav-item mb-2">
            <NavLink
              to="/worker/upload-report"
              className={({ isActive }) =>
                `nav-link menu-item text-white ${isActive ? "active-link" : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              <i className="fa-solid fa-file-upload me-2"></i>Upload Report
            </NavLink>
          </li> */}


          <li className="nav-item mb-2">
            <NavLink
              to="/worker/edit-profile"
              className={({ isActive }) =>
                `nav-link menu-item text-white ${isActive ? "active-link" : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              <i className="fa-solid fa-file-upload me-2"></i> Edit Profile
            </NavLink>
          </li>


          <li className="nav-item mb-2">
            <NavLink
              to="/worker/worker-image-upload"
              className={({ isActive }) =>
                `nav-link menu-item text-white ${isActive ? "active-link" : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              <i className="fa-solid fa-file-upload me-2"></i> Upload Image
            </NavLink>
          </li>

          <li className="nav-item mb-2">
            {/* <NavLink
              to="/worker/edit-profile"
              className={({ isActive }) =>
                `nav-link menu-item text-white ${isActive ? "active-link" : ""}`
              }
              onClick={() => setIsOpen(false)}
            > */}
              <button className="btn btn-link" style={{ textDecoration: "none" }} onClick={() => { logout() }}>
              {/* calling the logout function inside arrow function as callback because we want the logout function to run on button click, 
              if we call it directly inside curly braces {logout()} then it will automatically get called when the component renders - 09 Mar, 2026*/}
              <i className="fa-solid fa-right-from-bracket me-2"></i>
              Logout
            </button>
            {/* </NavLink> */}
          </li>

        </ul>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 998,
          }}
        />
      )}

      {/* Styles */}
      <style>{`
        .worker-sidebar {
          position: fixed;
          top: 0;
          width: 250px;
          height: 100vh;
          background-color: #4620cd;
          transition: right 0.3s ease;
          padding-top: 70px;
          z-index: 999;
        }

        .menu-item {
          border-radius: 6px;
          transition: all 0.3s ease;
        }

        .menu-item:hover {
          background-color: #3bb4ffff;
          padding-left: 12px;
          color: #ffffff !important;
        }

        /* Highlight active page */
        .active-link {
          background-color: #20c997;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}

export default WorkerHeader;