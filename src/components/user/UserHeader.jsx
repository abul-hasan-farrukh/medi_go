import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function UserHeader({ name }) {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate()

  //function for User Logout - 09 Mar, 2026
  const logout = () => {
    //fetching value from localstorage
    const email = localStorage.getItem("userEmail")

    if (email != null) {
      localStorage.removeItem("userEmail") //clear all the values from browser storage
      navigate("/user/user-login") //redirect user to the login page after logout.
    }
  }

  return (
    <>
      {/* Navbar */}
      <nav
        className="navbar navbar-dark fixed-top px-3"
        style={{ backgroundColor: "#332c4a", height: "60px"}}
      >
        <div className="container-fluid d-flex justify-content-between" style={{ fontFamily: "poppins" }}>
          <span className="navbar-brand mb-0 h5 text-white">
            User Dashboard {name && `- ${name}`}
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
        className="user-sidebar"
        style={{
          right: isOpen ? "0" : "-250px", fontFamily: "poppins"
        }}
      >
        {/* User Section */}
        <div className="text-center text-white mb-4">
          <i className="fa-solid fa-user-circle fs-1 mb-2"></i>
          {/* //using ternary operators to display user name. */}
          <h6>Hello {name ? name : "User"}</h6> 
        </div>

        {/* Menu */}
        <ul className="nav flex-column px-3">

          <li className="nav-item mb-2">
            <Link to="/user/user-dashboard" className="nav-link menu-item text-white" onClick={() => setIsOpen(false)}>
              <i className="fa-solid fa-house me-2"></i>Home
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link to="/user/user-feedback" className="nav-link menu-item text-white" onClick={() => setIsOpen(false)}>
              <i className="fa-solid fa-comment-dots me-2"></i>Feedback
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link to="/user/edit-profile" className="nav-link menu-item text-white" onClick={() => setIsOpen(false)}>
              <i className="fa-solid fa-user-pen me-2"></i>Edit Profile
            </Link>
          </li>


          <li className="nav-item mb-2">
            <Link to="/user/user-image-upload" className="nav-link menu-item text-white" onClick={() => setIsOpen(false)}>
              <i className="fa-solid fa-user-pen me-2"></i>Image Upload
            </Link>
          </li>


          <li className="nav-item mb-2">
            <Link to="/user/sample-collection" className="nav-link menu-item text-white" onClick={() => setIsOpen(false)}>
              <i className="fa-solid fa-user-pen me-2"></i>Sample Request
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link to="/user/sample-request-status" className="nav-link menu-item text-white" onClick={() => setIsOpen(false)}>
              <i className="fa-solid fa-user-pen me-2"></i>Request Status
            </Link>
          </li>


          <li className="nav-item mb-2">
            <Link to="/user/sample-report" className="nav-link menu-item text-white" onClick={() => setIsOpen(false)}>
              <i className="fa-solid fa-user-pen me-2"></i>Sample Report
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link to="/user/book-test" className="nav-link menu-item text-white" onClick={() => setIsOpen(false)}>
              <i className="fa-solid fa-user-pen me-2"></i>Book Test
            </Link>
          </li>


   <li className="nav-item mb-2">
            <Link to="/user/booking-status" className="nav-link menu-item text-white" onClick={() => setIsOpen(false)}>
              <i className="fa-solid fa-user-pen me-2"></i>Booking Status
            </Link>
          </li>
          <li className="nav-item">
            {/* <Link to="/logout" className="nav-link menu-item text-white" onClick={() => setIsOpen(false)}> */}
            <button className="btn btn-link" style={{ textDecoration: "none" }} onClick={() => { logout() }}>
              {/* calling the logout function inside arrow function as callback because we want the logout function to run on button click, 
              if we call it directly inside curly braces {logout()} then it will automatically get called when the component renders - 09 Mar, 2026*/}
              <i className="fa-solid fa-right-from-bracket me-2"></i>
              Logout
            </button>
            {/* </Link> */}
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
        .user-sidebar {
          position: fixed;
          top: 0;
          width: 250px;
          height: 100vh;
          background-color: #332c4a;
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
      `}</style>
    </>
  );
}
export default UserHeader