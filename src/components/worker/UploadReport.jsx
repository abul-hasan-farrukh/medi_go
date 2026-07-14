import { useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config";


// It is a child component of RequestDetail.jsx because 
// it is used inside RequestDetail.jsx as import at the top
// it is receving props 
// it sends data back to parent

function UploadReport({ requestId, onUploadSuccess }) {

    const [file, setFile] = useState(null);
    const [uploadedFile, setUploadedFile] = useState("");
    const fileRef = useRef(null);

    const handleFileChange = (e) => {

        const selectedFile = e.target.files[0];

        if (!selectedFile) return;

        const maxSize = 2 * 1024 * 1024; // 2MB

        // FILE SIZE VALIDATION
        if (selectedFile.size > maxSize) {
            Swal.fire({
                icon: "error",
                title: "File too large",
                text: "File size must be less than 2MB"
            });

            setFile(null);
            fileRef.current.value = "";
            return;
        }

        // FILE TYPE VALIDATION (ONLY PDF)
        if (selectedFile.type !== "application/pdf") {
            Swal.fire({
                icon: "error",
                title: "Invalid File",
                text: "Only PDF files less than 2MB are allowed"
            });

            setFile(null);
            fileRef.current.value = "";
            return;
        }

        setFile(selectedFile);
    };

    const handleUpload = async () => {

        if (!file) {
            Swal.fire({
                icon: "warning",
                title: "No File Selected",
                text: "Please select a PDF less than 2 MB"
            });
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {

            const res = await axios.post(
                `${BASE_URL}/worker/uploadReport/${requestId}`,
                formData
            );

            setUploadedFile(res.data.fileName);

            onUploadSuccess(requestId, res.data.fileName);

            Swal.fire({
                icon: "success",
                title: "Uploaded",
                text: "Report uploaded successfully"
            });

        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Upload Failed",
                text: "Something went wrong"
            });
        }
    };

    return (
        <div className="mt-2">
            
                    <input
                        type="file"
                        className="form-control mb-2"
                        onChange={handleFileChange}
                        ref={fileRef}
                        accept="application/pdf" // restrict different file picking
                    />

                    <button
                        className="btn btn-primary btn-sm"
                        onClick={handleUpload}
                    >
                        Upload Report
                    </button>

        </div>
    );
}

export default UploadReport;