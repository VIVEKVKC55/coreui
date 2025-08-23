import React, { useEffect, useState } from "react";
import { CRow, CCol, CCard, CCardBody } from "@coreui/react";

const BASE_URL = "http://localhost:8000";

const FilePage = () => {
  const [files, setFiles] = useState([]);

  const token = localStorage.getItem("token"); // JWT token

  // Fetch files
  const fetchFiles = () => {
    fetch(`${BASE_URL}/getfiles`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch files");
        return res.json();
      })
      .then((data) => setFiles(data))
      .catch((err) => console.error("Error fetching files:", err));
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // Render file (image/video)
  const renderFile = (file) => {
    const ext = file.filename.split(".").pop().toLowerCase();
    if (["mp4", "mov", "webm"].includes(ext)) {
      return (
        <video controls style={{ width: "100%", borderRadius: "8px" }}>
          <source src={file.url} type={`video/${ext}`} />
        </video>
      );
    } else {
      return <img src={file.url} alt={file.filename} style={{ width: "100%", borderRadius: "8px" }} />;
    }
  };

  // Split files into rows of 3
  const rows = [];
  for (let i = 0; i < files.length; i += 3) {
    rows.push(files.slice(i, i + 3));
  }

  return (
    <div className="container mt-4">
      {files.length === 0 ? (
        <p>No files uploaded yet.</p>
      ) : (
        rows.map((row, rowIndex) => (
          <CRow className="mb-4" key={rowIndex}>
            {row.map((file) => (
              <CCol md={4} key={file.id}>
                <CCard>
                  <CCardBody>{renderFile(file)}</CCardBody>
                </CCard>
              </CCol>
            ))}
          </CRow>
        ))
      )}
    </div>
  );
};

export default FilePage;
