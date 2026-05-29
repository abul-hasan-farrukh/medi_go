import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function SampleCollectorHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    const email = localStorage.getItem("workerEmail");

    if (email != null) {
      localStorage.clear();
      navigate("/worker/worker-login");
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav
        className="navbar navbar-dark fixed-top px-3"
        style={{
          backgroundColor: "#4620cd",
          height: "60px",
          fontFamily: "poppins"
        }}
      >
        <div className="container-fluid d-flex justify-content-between">
          <span className="navbar-brand mb-0 h5 text-white">
            Sample Collector Dashboard
          </span>

          <button
            className="btn text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <i className="fa-solid fa-bars fs-4"></i>
          </button>
        </div>
      </nav>

      {/* SIDEBAR */}
      <div
        className="worker-sidebar"
        style={{
          right: isOpen ? "0" : "-250px",
          fontFamily: "poppins"
        }}
      >
        <div className="text-center text-white mb-4">
          <i className="fa-solid fa-user-nurse fs-1 mb-2"></i>
          <h6>Hello Collector</h6>
        </div>

        <ul className="nav flex-column px-3">

          <li className="nav-item mb-2">
            <NavLink
              to="/worker/sample-collector-dashboard"
              className={({ isActive }) =>
                `nav-link menu-item text-white ${isActive ? "active-link" : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              <i className="fa-solid fa-house me-2"></i> Home
            </NavLink>
          </li>


          <li className="nav-item mb-2">
            <NavLink
              to="/worker/assigned-request"
              className={({ isActive }) =>
                `nav-link menu-item text-white ${isActive ? "active-link" : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              <i className="fa-solid fa-house me-2"></i> Assigned Request
            </NavLink>
          </li>

          <li className="nav-item mb-2">
            <NavLink
              to="/#"
              className={({ isActive }) =>
                `nav-link menu-item text-white ${isActive ? "active-link" : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              <i className="fa-solid fa-user-pen me-2"></i> Edit Profile
            </NavLink>
          </li>

          <li className="nav-item mb-2">
            <NavLink
              to="/#"
              className={({ isActive }) =>
                `nav-link menu-item text-white ${isActive ? "active-link" : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              <i className="fa-solid fa-image me-2"></i> Upload Image
            </NavLink>
          </li>

          <li className="nav-item mb-2">
            <button
              className="btn btn-link text-white"
              style={{ textDecoration: "none" }}
              onClick={logout}
            >
              <i className="fa-solid fa-right-from-bracket me-2"></i>
              Logout
            </button>
          </li>

        </ul>
      </div>

      {/* OVERLAY */}
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

      {/* STYLES (same as WorkerHeader) */}
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

        .active-link {
          background-color: #20c997;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}

export default SampleCollectorHeader;