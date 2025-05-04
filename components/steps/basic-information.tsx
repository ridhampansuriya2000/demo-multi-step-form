"use client"

import type React from "react"

import { useState } from "react"
import { useFormContext } from "@/context/form-context"
import { Label } from "@/components/ui/label"
import PhoneInput from "@/components/phone-input"
import StepNavigation from "@/components/ui/step-navigation";
import {useIsMobile} from "@/hooks/use-mobile";
import {CountryCode, isValidPhoneNumber} from 'libphonenumber-js'

export default function BasicInformation() {

  const isMobile = useIsMobile()

  const { formData, updateFormData, nextStep, prevStep } = useFormContext()
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formState, setFormState] = useState({
    firstName: formData.firstName || "",
    lastName: formData.lastName || "",
    email: formData.email || "",
    phone: formData.phone || "",
  })
  const [country, setCountry] = useState({
    codeInAlpha: 'IN',
    code: "+91",
    flag: "🇮🇳",
    name: "India",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState({
      ...formState,
      [name]: value,
    })

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const handlePhoneChange = (value: string) => {
    setFormState({
      ...formState,
      phone: value,
    })

    if (errors.phone) {
      setErrors({
        ...errors,
        phone: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formState.firstName) {
      newErrors.firstName = "First name is required"
    } else if (formState.firstName.length < 3) {
      newErrors.firstName = "Min length- 3 characters."
    }

    if (!formState.lastName) {
      newErrors.lastName = "Last name is required"
    } else if (formState.lastName.length < 3) {
      newErrors.lastName = "Min length- 3 characters."
    }

    if (!formState.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = "Enter valid email id"
    }

    console.log("error country", country)

    if (!formState.phone) {
      newErrors.phone = "Phone number is required"
    } else if (!isValidPhoneNumber(`${formState.phone.replace(" ", '').replace(/[^+\d]/g, '')}`,`${country.codeInAlpha}` as CountryCode)) {
      newErrors.phone = "Enter valid phone number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      updateFormData({
        firstName: formState.firstName,
        lastName: formState.lastName,
        email: formState.email,
        phone: formState.phone,
      })
      nextStep()
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-xl md:text-2xl font-medium text-gray-800 mb-6 md:mb-8">Basic information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 mb-4 md:mb-8">
        <div className="space-y-1 md:space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <input
            id="firstName"
            name="firstName"
            value={formState.firstName}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5C35] ${
              errors.firstName ? "ring-2 ring-red-500" : ""
            }`}
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
        </div>

        <div className="space-y-1 md:space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <input
            id="lastName"
            name="lastName"
            value={formState.lastName}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5C35] ${
              errors.lastName ? "ring-2 ring-red-500" : ""
            }`}
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 mb-8">
        <div className="space-y-1 md:space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <input
            id="email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5C35] ${
              errors.email ? "ring-2 ring-red-500" : ""
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="space-y-1 md:space-y-2">
          <Label htmlFor="phone">Contact</Label>
          <PhoneInput
              value={formState.phone}
              onChange={handlePhoneChange}
              error={!!errors.phone}
              selectedCountry={country}
              onCountryChange={setCountry}
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>
      </div>

      <StepNavigation
          onNext={handleSubmit}
          onBack={prevStep}
          nextLabel="NEXT"
          backLabel="BACK"
          position={isMobile ? "center" : "right"}
      />

    </div>
  )
}
