import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

function ShowCampDetails({ campArray }) {

  return (
    <div className="row">
      {campArray.map((cobj, index) => (
        <div className="col-md-4 mb-4" key={index}>

          <div
            className="card border-0 h-100"
            style={{
              borderRadius: "18px",
              background: "#ffffff",
              fontFamily: "Poppins",
              transition: "all 0.35s ease",
              cursor: "pointer",
              boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
              overflow: "hidden",
              position: "relative"
            }}

            // Hover effects
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
              e.currentTarget.style.boxShadow = "0 18px 40px rgba(0,0,0,0.15)";
            }}

            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.08)";
            }}
          >

            {/* Top Accent Bar */}
            <div style={{
              height: "6px",
              background: "linear-gradient(90deg, #2563eb, #06b6d4)"
            }}></div>

            <div className="p-4 d-flex flex-column justify-content-between h-100">

              {/* Title */}
              <h5 style={{
                fontWeight: "600",
                color: "#1f2937",
                marginBottom: "10px"
              }}>
                {cobj.title}
              </h5>

              {/* Venue */}
              <p style={{
                margin: "6px 0",
                color: "#4b5563",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px"
              }}>
                <FaMapMarkerAlt style={{ color: "#2563eb" }} />
                {cobj.venue}
              </p>

              {/* Description */}
              <p style={{
                fontSize: "14px",
                color: "#6b7280",
                marginTop: "8px",
                lineHeight: "1.5"
              }}>
                {cobj.description}
              </p>

              {/* Bottom Section */}
              <div className="d-flex justify-content-between align-items-center mt-3">

                {/* Date Badge */}
                <span style={{
                  background: "#eff6ff",
                  color: "#2563eb",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontWeight: "500"
                }}>
                  <FaCalendarAlt />
                  {cobj.date}
                </span>

                {/* Optional CTA
                <button
                  className="btn btn-sm"
                  style={{
                    background: "#2563eb",
                    color: "#fff",
                    borderRadius: "20px",
                    padding: "6px 14px",
                    fontSize: "13px",
                    border: "none",
                    transition: "0.3s"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#1e40af";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "#2563eb";
                  }}
                >
                  View
                </button> */}

              </div>

            </div>

          </div>

        </div>
      ))}
    </div>
  );
}
export default ShowCampDetails;