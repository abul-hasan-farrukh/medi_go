import React, { useEffect, useState } from "react";
import axios from "axios";
import WorkerHeader from "./WorkerHeader";
import { BASE_URL } from "../../config";


function UploadTestReport() {

  const [data, setData] = useState({});
  const [files, setFiles] = useState({});

  const API_URL = `${BASE_URL}/worker/pendingReports`;
  const UPLOAD_API = `${BASE_URL}/worker/uploadTestReport`;

  useEffect(() => {
    loadData();
  }, []);

  // LOAD DATA
  const loadData = async () => {
    try {
      const res = await axios.get(API_URL);
      groupData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // GROUP BY TRANSACTION
  const groupData = (list) => {
    const grouped = {};

    list.forEach(item => {

      if (!grouped[item.transactionNo]) {
        grouped[item.transactionNo] = {
          payment: {
            name: item.name,
            phone: item.phone,
            transactionNo: item.transactionNo
          },
          tests: []
        };
      }

      grouped[item.transactionNo].tests.push(item);
    });

    setData(grouped);
  };

  // HANDLE FILE
  const handleFileChange = (txn, file) => {
    setFiles(prev => ({
      ...prev,
      [txn]: file
    }));
  };

  // Upload Report and Whatsapp Message
  const uploadReport = async (txn) => {

    const file = files[txn];

    if (!file) {
      alert("Please select file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("transactionNo", txn);

    try {
      const res = await axios.post(UPLOAD_API, formData);

      alert("Report uploaded successfully ✅");

      //USER DETAILS
      const group = data[txn];
      const phone = group.payment.phone;

      console.log("Sending WhatsApp to:", phone);

      //MESSAGE
      const message = `Hello ${group.payment.name}, your test report has been uploaded. Please download it from MediGo portal.`;

      const encodedMessage = encodeURIComponent(message);

      //WHATSAPP LINK
      const whatsappURL = `https://wa.me/91${phone}?text=${encodedMessage}`;

      //auto open whatsapp after report upload
      window.open(whatsappURL, "_blank");

      //refresh data
      loadData();

    } catch (err) {
      console.error(err);
      alert("Upload failed ❌");
    }
  };

  return (
    <>
      <WorkerHeader />

      <div style={{ marginTop: "70px", padding: "20px" }}>
        <h2 className="text-center mb-4">Upload Test Report</h2>

        {Object.keys(data).length === 0 ? (
          <p className="text-center">No pending reports</p>
        ) : (
          Object.keys(data).map(txn => {

            const group = data[txn];

            return (
              <div key={txn} style={cardStyle}>

                <h3>Patient Info:</h3>
                <p><b>Name:</b> {group.payment.name}</p>
                <p><b>Phone:</b> {group.payment.phone}</p>
                <p><b>Transaction:</b> {txn}</p>

                {/* TEST TABLE */}
                <table style={tableStyle}>
                  <thead>
                    <tr>
                      <th style={cell}>Test</th>
                      <th style={cell}>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.tests.map((t, i) => (
                      <tr key={i}>
                        <td style={cell}>{t.test?.testName}</td>
                        <td style={cell}>₹{t.test?.testPrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <br />

                {/* FILE INPUT */}
                <input
                  type="file"
                  onChange={(e) =>
                    handleFileChange(txn, e.target.files[0])
                  }
                />

                <br /><br />

                {/* UPLOAD BUTTON */}
                <button
                  onClick={() => uploadReport(txn)}
                  style={btn}
                >
                  Upload Report
                </button>

              </div>
            );
          })
        )}
      </div>
    </>
  );
}

/* STYLES */
const cardStyle = {
  border: "1px solid #ccc",
  padding: "15px",
  marginBottom: "15px",
  borderRadius: "10px",
  background: "#f9fff9"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "10px"
};

const cell = {
  border: "1px solid #ddd",
  padding: "8px"
};

const btn = {
  marginTop: "10px",
  padding: "10px",
  background: "blue",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

export default UploadTestReport;