"use client"

import { useFormContext } from "@/context/form-context"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import React, { useState } from "react"
import StepNavigation from "@/components/ui/step-navigation";
import PatternBox from "@/components/icons/downloadicon";

export default function Summary() {
  const { formData, prevStep, nextStep } = useFormContext()
  const [termsAccepted, setTermsAccepted] = useState(false)

  const handleDownloadResume = () => {
    if (formData.resume?.file) {
      const url = URL.createObjectURL(formData.resume.file)
      const a = document.createElement("a")
      a.href = url
      a.download = formData.resume.name
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  const handleSubmit = () => {
    if (termsAccepted) {
      nextStep()
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-xl md:text-2xl font-medium text-gray-800 mb-6 md:mb-14">Summary</h2>

      <div className="mb-14">
        <h3 className="text-lg font-medium text-gray-700 mb-9 border-t border-gray-200 pt-14">Resume</h3>
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-gray-500">File name</p>
            <div className="flex gap-1 items-center">
              <p className="text-black-800">{formData.resume?.name}</p>
              {formData.resume?.file && (
                  <Button variant="link" onClick={handleDownloadResume} className="text-[#FF5C35] hover:text-[#e04f2f]">
                    <PatternBox />
                  </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-14">
        <h3 className="text-lg font-medium text-gray-700 mb-9 border-t border-gray-200 pt-14">Basic Information</h3>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-6 w-full md:w-2/3 ">
          <div>
            <p className="text-sm text-gray-500">First Name</p>
            <p className="text-black-800">{formData.firstName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Name</p>
            <p className="text-black-800">{formData.lastName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email id</p>
            <p className="text-black-800">{formData.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone Number</p>
            <p className="text-black-800">{formData.phone}</p>
          </div>
        </div>
      </div>

      <div className="mb-14">
        <h3 className="text-lg font-medium text-gray-700 mb-9 border-t border-gray-200 pt-14">Skill Sets</h3>
        <div>
          {formData.skills?.map((skill, index) => (
            <div key={skill.id} className="mb-4  w-full md:w-2/3 ">
              <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Skill {index + 1}</p>
                  <p className="text-black-800">{skill.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Experience Level</p>
                  <p className="text-black-800">{skill.level}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-700 mb-9 border-t border-gray-200 pt-14">Education</h3>
        <div>
          {formData.education?.map((edu, index) => (
            <div key={edu.id} className="mb-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 sm:grid-cols-2 gap-6 mb-2">
                    <div className="">
                      <p className="text-sm text-gray-500">Degree Name</p>
                      <p className="text-black-800">{edu.degree}</p>
                    </div>
                    <div className="">
                      <p className="text-sm text-gray-500">University</p>
                      <p className="text-black-800">{edu.institution}</p>
                    </div>
                    <div className="">
                      <p className="text-sm text-gray-500">Year of Starting</p>
                      <p className="text-black-800">{edu.startYear}</p>
                    </div>
                    <div className="">
                      <p className="text-sm text-gray-500">Year of Completion</p>
                      <p className="text-black-800">{edu.endYear}</p>
                    </div>
                  </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-14 border-t border-gray-200 pt-14">
        <p className="text-sm text-gray-600 mb-4">
          By submitting this form, you confirm that all information provided is accurate and complete to the best of
          your knowledge. Any false or misleading information may result in disqualification from the recruitment
          process or termination of employment if discovered later.
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Submission of this form does not guarantee an interview or employment. Your personal data will be handled
          confidentially and used solely for recruitment purposes in accordance with Beyond Labs LLC Privacy Policy.
        </p>
        <div className="flex items-center space-x-2 mt-4">
          <Checkbox
            id="terms"
            checked={termsAccepted}
            onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
          />
          <Label htmlFor="terms" className="text-sm text-gray-600">
            By submitting, you agree to our Terms & Conditions.
          </Label>
        </div>
      </div>

      <StepNavigation
          onNext={handleSubmit}
          onBack={prevStep}
          nextLabel="CONFIRM"
          backLabel="EDIT"
          position="left"
          isNextDisabled={!termsAccepted}
      />
    </div>
  )
}
