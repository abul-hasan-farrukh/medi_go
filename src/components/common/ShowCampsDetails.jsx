function ShowCampDetails({ campArray }) {

  return (
    <div className="row">
      {campArray.map((cobj, index) => (
        <div className="col-md-4 mb-4" key={index}>

          <div
            className="card p-3"
            style={{
              borderRadius: "15px",
              backgroundColor: "#f8f9fa",
              minHeight: "240px",
              fontFamily: "Poppins",

              // Animation styles
              transition: "all 0.3s ease",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
            }}

            // Hover effects
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.2)";
            }}

            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
            }}
          >

            {/* Title */}
            <h5 style={{ fontWeight: "600", color: "#333" }}>
              {cobj.title}
            </h5>

            {/* Venue */}
            <p style={{ margin: "5px 0", color: "#555" }}>
              <strong>Venue:</strong> {cobj.venue}
            </p>

            {/* Description */}
            <p style={{ fontStyle: "italic", color: "#666" }}>
              {cobj.description}
            </p>

            {/* Date */}
            <div className="mt-2">
              <strong>Date:</strong>
              <br />
              <span style={{ color: "#333" }}>
                {cobj.date}
              </span>
            </div>

          </div>

        </div>
      ))}
    </div>
  );
}

export default ShowCampDetails;