import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function AdminHeader({ children }) {

  const navigate = useNavigate()

  //function for admin Logout - 09 Mar, 2026
  const logout = ()=> {
      //fetching value from localstorage
       const email=localStorage.getItem("adminEmail")
       
       if(email != null ){
         localStorage.removeItem("adminEmail") //clear all the values from browser storage
          navigate("/admin/admin-login") //redirect admin to the login page after logout.
       }
  }


  return (
    <>
      {/* ===== Top Navbar ===== */}
      <nav className="navbar navbar-dark bg-dark fixed-top px-4 shadow-sm">
        <span className="navbar-brand fw-bold" style={{ fontFamily: "poppins" }}>Admin Panel</span>
      </nav>

      <div className="container-fluid" style={{ fontFamily: "poppins" }}>
        <div className="row">

          {/* ===== Sidebar ===== */}
          <nav
            className="col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse position-fixed"
            style={{ height: "100vh", paddingTop: "60px" }}
          >
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">

                <li className="nav-item">
                  <NavLink className={({ isActive }) =>
                    `nav-link sidebar-link ${isActive ? "bg-primary text-white" : "text-white"}`
                  } to="/admin/admin-dashboard">
                    <i className="fa-solid fa-gauge me-2"></i>
                    Dashboard
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className={({ isActive }) =>
                    `nav-link sidebar-link ${isActive ? "bg-primary text-white" : "text-white"}`
                  } to="/admin/all-contacts">
                    <i className="fa-solid fa-users me-2"></i>
                    Contacts
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className={({ isActive }) =>
                    `nav-link sidebar-link ${isActive ? "bg-primary text-white" : "text-white"}`
                  } to="/admin/all-users">
                    <i className="fa-solid fa-user me-2"></i>
                    Users
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className={({ isActive }) =>
                    `nav-link sidebar-link ${isActive ? "bg-primary text-white" : "text-white"}`
                  } to="/admin/all-feedbacks">
                    <i className="fa-solid fa-comment me-2"></i>
                    Feedback
                  </NavLink>
                </li>


                <li className="nav-item">
                  <NavLink className={({ isActive }) =>
                    `nav-link sidebar-link ${isActive ? "bg-primary text-white" : "text-white"}`
                  } to="/admin/add-worker">
                    <i className="fa-solid fa-user-plus me-2"></i>
                    Add Worker
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className={({ isActive }) =>
                    `nav-link sidebar-link ${isActive ? "bg-primary text-white" : "text-white"}`
                  } to="/admin/add-test">
                    <i className="fa-solid fa-vial me-2"></i>
                    Add Test
                  </NavLink>
                </li>


                <li className="nav-item">
                  <NavLink className={({ isActive }) =>
                    `nav-link sidebar-link ${isActive ? "bg-primary text-white" : "text-white"}`
                  } to="/admin/add-camp">
                    <i className="fa-solid fa-vial me-2"></i>
                    Add Camp
                  </NavLink>
                </li>


                <li className="nav-item">
                  <NavLink className={({ isActive }) =>
                    `nav-link sidebar-link ${isActive ? "bg-primary text-white" : "text-white"}`
                  } to="/admin/edit-profile">
                    <i className="fa-solid fa-user-plus me-2"></i>
                    Edit Profile
                  </NavLink>  
                </li>


                <li className="nav-item">
                  <NavLink className={({ isActive }) =>
                    `nav-link sidebar-link ${isActive ? "bg-primary text-white" : "text-white"}`
                  } to="/admin/change-password">
                    <i className="fa-solid fa-user-plus me-2"></i>
                    Change Password
                  </NavLink>  
                </li>


                <li className="nav-item">
                  <NavLink className={({ isActive }) =>
                    `nav-link sidebar-link ${isActive ? "bg-primary text-white" : "text-white"}`
                  } to="/admin/profile-upload">
                    <i className="fa-solid fa-user-plus me-2"></i>
                    Profile Upload
                  </NavLink>  
                </li>

                <li className="nav-item mt-4">
                  {/* <Link className="nav-link text-danger sidebar-link" to="#"> */}
                  <button className="btn btn-link" style={{textDecoration: "none"}} onClick={()=>{logout()}}> 
                  {/* calling the logout function inside arrow function as callback because we want the logout function to run on button click, 
                  if we call it directly inside curly braces {logout()} then it will automatically get called when the component renders - 09 Mar, 2026*/}
                    <i className="fa-solid fa-right-from-bracket me-2"></i>
                    Logout
                    </button>
                  {/* </Link> */}
                </li>

              </ul>
            </div>
          </nav>

          {/* ===== Main Content ===== */}
          <main
            className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
            style={{ marginTop: "70px", marginLeft: "16.66%" }}
          >
            {children}
          </main>

        </div>
      </div>

      {/* ===== Styling ===== */}
      <style>
        {`
          .sidebar-link {
            padding: 12px 20px;
            transition: 0.2s;
            border-radius: 6px;
            margin: 4px 10px;
          }

          .sidebar-link:hover {
            background-color: #0d6efd;
            color: white !important;
          }

          .sidebar {
            width: 16.66%;
          }
        `}
      </style>
    </>
  );
}

export default AdminHeader;