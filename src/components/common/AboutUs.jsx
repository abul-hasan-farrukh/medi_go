import React from 'react'
import Header from './Header'
import Footer from './Footer'

function AboutUs() {
  return (
    <>
      <Header />
      <div style={{fontFamily: "poppins"}}>

      
      {/* Hero Section */}
      <section className="bg-primary bg-gradient text-white text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold mb-4">About Us</h1>
          <p className="lead">
            {/* Building Innovation. Creating Impact. Delivering Excellence. */}
            MediGo is a smart digital pathology portal that simplifies diagnostic services through secure, efficient, and user-friendly technology.
          </p>
        </div>
      </section>

      {/* Vision Mission Goals Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Our Core Values</h2>

          <div className="row g-4">

            {/* Vision */}
            <div className="col-md-4">
              <div className="card shadow text-center h-100 p-4 border-0">
                <i className="fas fa-eye fa-2x text-primary mb-3"></i>
                <h4 className="fw-bold">Vision</h4>
                <p>
                  Our vision is to modernize pathology services by creating a seamless digital platform that enhances accessibility, transparency, and efficiency for both patients and healthcare providers. We aim to make diagnostic service management faster, smarter, and more reliable.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="col-md-4">
              <div className="card shadow text-center h-100 p-4 border-0">
                <i className="fas fa-bullseye fa-2x text-primary mb-3"></i>
                <h4 className="fw-bold">Mission</h4>
                <p>
                  Our mission is to digitize pathology operations by automating appointments, home sample collection, report management, and communication processes. We strive to improve coordination, reduce manual effort, and deliver a smooth user experience through innovative technology.
                </p>
              </div>
            </div>

            {/* Goals */}
            <div className="col-md-4">
              <div className="card shadow text-center h-100 p-4 border-0">
                <i className="fas fa-flag-checkered fa-2x text-primary mb-3"></i>
                <h4 className="fw-bold">Goals</h4>
                <p>
                  Our goal is to build a secure and scalable pathology service system that ensures convenient booking, easy report access, and efficient staff coordination. We aim to continuously enhance the platform with advanced features and improved user support.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-light py-5">
        <div className="container">
          <div className="row align-items-center g-5">

            {/* Left Image */}
            <div className="col-md-6">
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
                alt="Company"
                className="img-fluid rounded shadow"
              />
            </div>

            {/* Right Contact Info */}
            <div className="col-md-6">
              <h2 className="fw-bold mb-4">Get In Touch</h2>

              <p className="fs-5">
                <i className="fas fa-envelope text-primary me-2"></i>
                abulhasanfarrukh@gmail.com
              </p>

              <p className="fs-5">
                <i className="fas fa-phone text-primary me-2"></i>
                +91 9532446928
              </p>

              <p className="fs-5">
                <i className="fas fa-map-marker-alt text-primary me-2"></i>
                S-62, Gole Market, Mahanagar, Lucknow, Uttar Pradesh
              </p>

            </div>

          </div>
        </div>
      </section>
</div>
      <Footer />
    </>
  )
}

export default AboutUs
