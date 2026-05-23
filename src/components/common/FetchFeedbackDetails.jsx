function FetchFeedbackDetails({ feedbackArray }) {

  // Function to render stars dynamically
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < parseInt(rating); i++) {
      stars.push(
        <span key={i} style={{ color: "#ffc107", fontSize: "18px" }}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="row">
      {feedbackArray.map((fobj, index) => (
        <div className="col-md-4 mb-4" key={index}>
          
          <div
            className="card shadow-sm p-3"
            style={{
              borderRadius: "15px",
              backgroundColor: "#f8f9fa",
              minHeight: "220px"
            }}
          >
            
            {/* Stars */}
            <div className="mb-2">
              {renderStars(fobj.rating)}
            </div>

            {/* Review */}
            <p style={{ fontStyle: "italic", color: "#555" }}>
              {fobj.review}
            </p>

            {/* Email */}
            <div className="mt-3">
              <strong>Posted By:</strong>
              <br />
              <span style={{ color: "#333" }}>{fobj.user.name}</span>
            </div>

          </div>

        </div>
      ))}
    </div>
  );
}

export default FetchFeedbackDetails;