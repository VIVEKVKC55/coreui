import React, { useState } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CForm,
    CFormInput,
    CButton,
    CRow,
    CCol,
} from '@coreui/react'

const FileUploadForm = () => {
    const [file, setFile] = useState(null)
    const [message, setMessage] = useState('')

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const handleUpload = async (e) => {
        e.preventDefault()
        if (!file) {
            setMessage('Please select a file')
            return
        }

        const formData = new FormData()
        formData.append('uploaded_file', file)

        try {
            const token = localStorage.getItem('token') // JWT token
            const response = await fetch('http://localhost:8000/uploadfile', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            })

            const data = await response.json()
            if (response.ok) {
                setMessage(`File uploaded successfully: ${data.file}`)
                setFile(null)
                e.target.reset()
            } else {
                setMessage(data.detail || 'Upload failed')
            }
        } catch (err) {
            console.error(err)
            setMessage('Something went wrong')
        }
    }

    return (
        <>
            <CCard className="mb-4">
                <CCardHeader>Upload File</CCardHeader>
                <CCardBody>
                    {message && <p>{message}</p>}
                    {file && file.type.startsWith('image') && (
                        <div className="mb-3">
                            <img
                                src={URL.createObjectURL(file)}
                                alt="preview"
                                style={{ maxWidth: '200px', borderRadius: '8px' }}
                            />
                        </div>
                    )}
                    <CForm onSubmit={handleUpload}>
                        <CRow className="mb-3">
                            <CCol sm={12}>
                                <CFormInput type="file" onChange={handleFileChange} />
                            </CCol>
                        </CRow>
                        <CButton type="submit" color="primary">
                            Upload
                        </CButton>
                    </CForm>
                </CCardBody>
            </CCard>
        </>
    )
}

export default FileUploadForm
