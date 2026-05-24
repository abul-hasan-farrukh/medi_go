import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaVial, FaClock, FaFlask, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import PathologyChatbotPage from '../user/PathologyChatbotPage'

function HomePage() {

  // --- DYNAMIC DATA STATE ---
  const [tests, setTests] = useState([]);
  const [camps, setCamps] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  // --- API FETCH LOGIC ---
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [testRes, campRes, feedbackRes] = await Promise.all([
          axios.get("http://localhost:9090/show-tests"),
          axios.get("http://localhost:9090/showCamps"), 
          axios.get("http://localhost:9090/fetchFeedback") 
        ]);

        // Limit tests to only 6 for the home page
        if (testRes.data) setTests(testRes.data.slice(0, 6));
        if (campRes.data) setCamps(campRes.data);
        if (feedbackRes.data) setFeedbacks(feedbackRes.data);
      } catch (error) {
        console.error("Error fetching dynamic data:", error);
      }
    };
    fetchHomeData();
  }, []);

  // --- HELPER FOR STARS ---
  const renderStars = (rating) => {
    return [...Array(parseInt(rating || 5))].map((_, i) => (
      <span key={i} style={{ color: "#ffc107", fontSize: "18px" }}>★</span>
    ));
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", color: "#333" }}>
      {/* --- NAVBAR --- */}
      <Header/>
      <PathologyChatbotPage />
      {/* <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm py-3">
        <div className="container">
          <a className="navbar-brand fw-bold text-primary fs-3" href="#">
            <i className="fas fa-microscope me-2"></i>MediGo
          </a>
          <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center fw-medium">
              <li className="nav-item"><a className="nav-link px-3" href="#">Home</a></li>
              <li className="nav-item"><a className="nav-link px-3" href="#services">Services</a></li>
              <li className="nav-item"><a className="nav-link px-3" href="#tests">Tests</a></li>
              <li className="nav-item"><a className="nav-link px-3" href="#camps">Camps</a></li>
              <li className="nav-item ms-lg-3">
                <a className="btn btn-primary rounded-pill px-4 shadow-sm" href="#">Book Appointment</a>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}

      {/* --- HERO SECTION --- */}
      <header className="py-5" style={{ background: "linear-gradient(135deg, #f8fbff 0%, #e2efff 100%)", minHeight: "85vh", display: "flex", alignItems: "center" }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <span className="badge bg-primary-soft text-primary px-3 py-2 rounded-pill mb-3 fw-bold">DIGITAL PATHOLOGY CENTER</span>
              <h1 className="display-3 fw-bold mb-4" style={{ lineHeight: "1.2" }}>
                Your Health, <br /> 
                <span className="text-primary">Digitally Simplified</span>
              </h1>
              <p className="lead text-muted mb-5 pe-lg-5">
                Experience the next generation of pathology. With MediGo, get accurate results and friendly support, right at your fingertips.
              </p>
              <Link to="/user/user-registration">
              <div className="d-flex gap-3">
                <button className="btn btn-primary btn-lg rounded-pill px-5 shadow">Register Now</button>
                {/* <button className="btn btn-outline-primary btn-lg rounded-pill px-5">Watch Video</button> */}
              </div>
              </Link>
            </div>
            <div className="col-lg-6 mt-5 mt-lg-0">
              <img 
                src="../../images/MediGo_Doctor.png" 
                alt="3D DNA and Medical Illustration" 
                className="img-fluid rounded-5 shadow-lg ms-5"
              />
            </div>
          </div>
        </div>
      </header>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="py-5 bg-white">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h6 className="text-primary fw-bold text-uppercase tracking-wider">What We Offer</h6>
            <h2 className="fw-bold display-5">Our Medical Services</h2>
          </div>
          <div className="row g-4">
            {[
  { 
    icon: 'fa-vial', 
    title: 'Diagnostic Test Booking', 
    desc: 'Browse and book a wide range of pathology tests easily through our digital platform.', 
    bg: '#eef2ff' 
  },
  { 
    icon: 'fa-truck-medical', 
    title: 'Home Sample Collection', 
    desc: 'Get your samples collected from home by trained professionals at your convenience.', 
    bg: '#fff0f0' 
  },
  { 
    icon: 'fa-file-medical-alt', 
    title: 'Digital Reports', 
    desc: 'Access your reports anytime with secure online storage and instant download.', 
    bg: '#f0f9ff' 
  },
  { 
    icon: 'fa-hospital-user', 
    title: 'Health Camps', 
    desc: 'Stay updated with nearby health camps and participate in preventive checkups.', 
    bg: '#fdf4ff' 
  }
].map((service, idx) => (
              <div className="col-md-3" key={idx}>
                <div className="card h-100 border-0 shadow-sm p-4 text-center rounded-4 transition-hover">
                  <div className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded-circle shadow-sm" style={{ width: "80px", height: "80px", backgroundColor: service.bg }}>
                    <i className={`fas ${service.icon} fa-2x text-primary`}></i>
                  </div>
                  <h5 className="fw-bold">{service.title}</h5>
                  <p className="text-muted small mb-0">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- DYNAMIC TESTS SECTION --- */}
      <section id="tests" className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h6 className="text-primary fw-bold text-uppercase tracking-wider">Diagnostic Catalog</h6>
            <h2 className="fw-bold display-5">Popular Health Tests</h2>
          </div>
          <div className="row">
            {tests.length > 0 ? tests.map((item, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card border-0 h-100 shadow-sm transition-hover rounded-4 overflow-hidden">
                  <div style={{ height: "6px", background: "linear-gradient(90deg, #2563eb, #0b17ff)" }}></div>
                  <div className="p-4">
                    <h5 className="fw-bold mb-3">{item.testName}</h5>
                    <div className="small text-muted">
                      <p className="mb-2"><FaFlask className="text-primary me-2"/> Type: {item.testType}</p>
                      <p className="mb-2"><FaVial className="text-primary me-2"/> Sample: {item.sampleRequired}</p>
                      <p className="mb-0"><FaClock className="text-primary me-2"/> Report: {item.reportTime}</p>
                    </div>
                    <div className="mt-4 pt-3 border-top text-center">
                      <span className="h4 fw-bold text-success mb-0">₹ {item.testPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
            )) : <p className="text-center">Loading tests...</p>}
          </div>
        </div>
      </section>

      {/* --- INFO / ABOUT SECTION --- */}
      <section className="py-5 bg-white">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <img 
                src="../../images/MediGo_3.png" 
                alt="3D Hospital Tech" 
                className="img-fluid rounded-4 shadow"
              />
            </div>
            <div className="col-lg-6">
              <h2 className="fw-bold mb-4">Why Choose MediGo Pathology?</h2>
              <ul className="list-unstyled">
                {['Friendly and certified lab experts', 'Home sample collection service', 'AI-assisted diagnostic accuracy', 'Secure and private digital records'].map((text, i) => (
                  <li key={i} className="mb-3 d-flex align-items-start">
                    <i className="fas fa-check-circle text-primary mt-1 me-3 fs-5"></i>
                    <span className="text-muted fw-medium">{text}</span>
                  </li>
                ))}
              </ul>
              <Link to="/about">
              <button className="btn btn-primary rounded-pill px-4 mt-4 py-2">Learn More About Us</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- CAMPAIGNS SECTION --- */}
      <section id="camps" className="py-5 bg-light">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h6 className="text-primary fw-bold text-uppercase tracking-wider">Outreach</h6>
            <h2 className="fw-bold display-5">Medical Campaigns</h2>
          </div>
          <div className="row">
            {camps.length > 0 ? camps.map((cobj, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card border-0 h-100 shadow-sm rounded-4 transition-hover">
                  <div style={{ height: "6px", background: "linear-gradient(90deg, #3630e7, #3b82f6)" }}></div>
                  <div className="p-4">
                    <h5 className="fw-bold mb-2">{cobj.title}</h5>
                    <p className="text-muted small mb-3"><FaMapMarkerAlt className="text-primary me-2"/>{cobj.venue}</p>
                    <p className="text-muted small mb-4">{cobj.description}</p>
                    <span className="badge bg-primary-soft text-primary px-3 py-2 rounded-pill">
                      <FaCalendarAlt className="me-2"/>{cobj.date}
                    </span>
                  </div>
                </div>
              </div>
            )) : <p className="text-center">No upcoming campaigns found.</p>}
          </div>
        </div>
      </section>

      {/* --- APPOINTMENT SECTION --- */}
      <section className="py-5">
        <div className="container py-5 bg-primary rounded-5 shadow-lg overflow-hidden position-relative">
          <div className="row g-0 align-items-center">
            <div className="col-lg-7 p-5 text-white">
              <h2 className="display-6 fw-bold mb-4">Book Your Test Today</h2>
              <p className="lead mb-4 opacity-75">Schedule a home visit or visit our digital-first lab for a seamless experience.</p>
              <form className="row g-3">
                <div className="col-md-6"><input type="text" className="form-control py-3 border-0 rounded-3" placeholder="Full Name" /></div>
                <div className="col-md-6"><input type="tel" className="form-control py-3 border-0 rounded-3" placeholder="Phone Number" /></div>
                <div className="col-12">
                  <select className="form-select py-3 border-0 rounded-3 text-muted">
                    <option>Choose Test (e.g. Full Body, COVID-19)</option>
                    <option>Blood Sugar</option>
                    <option>Complete Blood Count</option>
                  </select>
                </div>
                <div className="col-12 mt-4">
                  <button className="btn btn-light text-primary fw-bold px-5 py-3 rounded-pill shadow-sm">Confirm My Booking</button>
                </div>
              </form>
            </div>
            <div className="col-lg-5 d-none d-lg-block">
              <img src="../../images/MediGo_Doctor_2.png" alt="3D Lab" className="img-fluid w-100 h-100 object-fit-cover" style={{ minHeight: "500px" }} />
            </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section id="testimonials" className="py-5 bg-white">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h6 className="text-primary fw-bold text-uppercase tracking-wider">Patient Reviews</h6>
            <h2 className="fw-bold display-5">What Patients Say About Us</h2>
          </div>
          <div className="row">
            {feedbacks.length > 0 ? feedbacks.map((fobj, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card border-0 shadow-sm p-4 rounded-4 h-100 bg-light transition-hover">
                  <div className="mb-2">{renderStars(fobj.rating)}</div>
                  <p className="fst-italic text-muted">"{fobj.review}"</p>
                  <div className="mt-auto pt-3 border-top border-2">
                    {/* Checking for fobj.user?.name based on your FetchFeedbackDetails logic */}
                    <h6 className="fw-bold mb-0">{fobj.user?.name || "Anonymous Patient"}</h6>
                    <small className="text-primary">MediGo Patient</small>
                  </div>
                </div>
              </div>
            )) : <p className="text-center">No patient feedback yet.</p>}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <Footer/>
      {/* <footer className="bg-dark text-white pt-5 pb-4">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4">
              <h4 className="fw-bold text-primary mb-4">MediGo</h4>
              <p className="text-muted pe-lg-5">A friendly, digital-first pathology service bringing professional diagnostics to your doorstep.</p>
            </div>
            <div className="col-lg-2 col-md-4">
              <h6 className="fw-bold mb-4">Services</h6>
              <ul className="list-unstyled text-muted small">
                <li>Pathology</li><li>Radiology</li><li>Home Collection</li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-4">
              <h6 className="fw-bold mb-4">Subscribe</h6>
              <div className="input-group">
                <input type="email" className="form-control bg-transparent border-secondary text-white" placeholder="Enter Email" />
                <button className="btn btn-primary">Join</button>
              </div>
            </div>
          </div>
          <hr className="my-4 border-secondary opacity-25" />
          <div className="d-flex justify-content-between align-items-center small text-muted">
            <p className="mb-0">© 2026 MediGo Digital Pathology Center.</p>
            <div className="d-flex gap-3"><i className="fab fa-facebook pointer"></i><i className="fab fa-twitter pointer"></i></div>
          </div>
        </div>
      </footer> */}

      <style>{`
        .transition-hover:hover { transform: translateY(-10px); transition: all 0.3s ease; box-shadow: 0 1rem 3rem rgba(0,0,0,.1) !important; }
        .bg-primary-soft { background-color: #e2efff; }
        .pointer { cursor: pointer; }
        .floating-animation { animation: floating 3s ease-in-out infinite; }
        @keyframes floating { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(15px); } }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}

export default HomePage;