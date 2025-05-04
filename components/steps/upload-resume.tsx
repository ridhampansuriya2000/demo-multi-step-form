"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useFormContext } from "@/context/form-context"
import { Button } from "@/components/ui/button"
import { CloudIcon } from "lucide-react"
import FileUploadStatus from "@/components/file-upload-status"
import StepNavigation from "@/components/ui/step-navigation";

export default function UploadResume() {
  const { formData, updateFormData, nextStep } = useFormContext()
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(formData.resume?.file || null)
  const [uploadStatus, setUploadStatus] = useState<"uploading" | "completed">("completed")
  const [uploadProgress, setUploadProgress] = useState(100)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]
      if (validateFile(droppedFile)) {
        handleFileUpload(droppedFile)
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      if (validateFile(selectedFile)) {
        handleFileUpload(selectedFile)
      }
    }
  }

  const handleFileUpload = (file: File) => {
    setFile(file)
    setUploadStatus("uploading")
    setUploadProgress(0)

    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setUploadStatus("completed")
        updateFormData({
          resume: {
            file: file,
            name: file.name,
            size: file.size,
          },
        })
      }
    }, 300)
  }

  const validateFile = (file: File) => {
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]
    if (!validTypes.includes(file.type)) {
      alert("Please upload a PDF or DOC file")
      return false
    }
    return true
  }

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    updateFormData({
      resume: null,
    })
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-medium text-gray-800 mb-3 md:mb-8 sm:text-xl">Upload Resume</h2>

      <div
        className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center lg:w-1/2 w-full
          ${isDragging ? "border-[#FF5C35] bg-orange-50" : "border-gray-200"}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CloudIcon className="w-10 h-10 text-[#FF5C35] mb-4" />
        <h3 className="text-lg font-medium text-gray-700 mb-1 text-center sm:text-base">
          Choose a file or drag & drop it here
        </h3>
        <p className="text-gray-500 mb-4 text-center sm:text-sm">Please Upload Your Resume (PDF, DOC formats only)</p>

        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".pdf,.doc,.docx" className="hidden" />

        <Button
          variant="outline"
          onClick={handleBrowseClick}
          className="border border-gray-300 hover:bg-gray-50 rounded-md"
        >
          Browse File
        </Button>
      </div>

      {file && (
          <div className="lg:w-1/2 w-full">
            <FileUploadStatus file={file} status={uploadStatus} progress={uploadProgress} onRemove={handleRemoveFile} />
          </div>
      )}

      <StepNavigation
          onNext={nextStep}
          nextLabel="NEXT"
          position="right"
          isNextDisabled={!file || uploadStatus === "uploading"}
      />
    </div>
  )
}
