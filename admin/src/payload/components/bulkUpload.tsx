// components/BatchUpload.js
import React, { useState } from 'react'
import payload from 'payload'
import { Button } from 'payload/components'
import { useField, useForm } from 'payload/components/forms'

const BulkUpload = () => {
  const [files, setFiles] = useState([])
  const { addFieldRow } = useForm()

  const handleFileChange = event => {
    setFiles(Array.from(event.target.files))
  }

  const handleUpload = async () => {
    const uploadedFiles = []

    for (const file of files) {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch('/api/media?depth=0&fallback-locale=null&locale=en', {
        method: 'POST',
        body: form,
        credentials: 'include',
      })
      const data = await res.json()
      const id = data.doc.id
      uploadedFiles.push(id)
      addFieldRow({
        path: 'photos.gallery',
        data: {
          image: id,
        },
      })
    }

    setFiles([])
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '20px',
      }}
    >
      <h3 className="array-field__title">Upload multiple files</h3>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        style={{ padding: '1rem', marginTop: '20px', borderRadius: '4px' }}
        className='className="btn dropzone__file-button btn--style-secondary btn--icon-style-without-border btn--size-small btn--icon-position-right"'
        accept="image/*"
      />
      {files.length > 0 && (
        <Button buttonStyle="secondary" type="button" onClick={handleUpload}>
          Upload multiple files
        </Button>
      )}
    </div>
  )
}

export default BulkUpload
