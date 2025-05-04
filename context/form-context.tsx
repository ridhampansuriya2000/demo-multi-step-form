"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type FormContextType = {
  currentStep: number
  formData: FormData
  setCurrentStep: (step: number) => void
  updateFormData: (data: Partial<FormData>) => void
  nextStep: () => void
  prevStep: () => void
  canNavigateToStep: (step: number) => boolean
}

type FormData = {
  resume: {
    file: File
    name: string
    size: number
  } | null
  firstName: string
  lastName: string
  email: string
  phone: string
  skills: {
    id: string
    name: string
    level: "Beginner" | "Intermediate" | "Expert"
  }[]
  education: {
    id: string
    degree: string
    institution: string
    startYear: number
    endYear: number
  }[]
}

const initialFormData: FormData = {
  resume: null,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  skills: [],
  education: [],
}

const FormContext = createContext<FormContextType>({
  currentStep: 1,
  formData: initialFormData,
  setCurrentStep: () => {},
  updateFormData: () => {},
  nextStep: () => {},
  prevStep: () => {},
  canNavigateToStep: () => false,
})

export const useFormContext = () => useContext(FormContext)

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)

  // useEffect(() => {
  //   try {
  //     const savedData = localStorage.getItem("formData")
  //     if (savedData) {
  //       const parsedData = JSON.parse(savedData)
  //
  //       setFormData((prevData) => ({
  //         ...parsedData,
  //         resume: prevData.resume, // Keep the File object from the current state
  //       }))
  //
  //       const savedStep = localStorage.getItem("currentStep")
  //       if (savedStep) {
  //         setCurrentStep(Number.parseInt(savedStep, 10))
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error loading form data from localStorage:", error)
  //   }
  // }, [])

  useEffect(() => {
    try {
      const savedData = localStorage.getItem("formData")
      if (savedData) {
        const parsedData = JSON.parse(savedData)

        let file: File | undefined
        if (parsedData.resume?.base64) {
          const byteString = atob(parsedData.resume.base64.split(',')[1])
          const mimeString = parsedData.resume.base64.split(',')[0].split(':')[1].split(';')[0]

          const ab = new ArrayBuffer(byteString.length)
          const ia = new Uint8Array(ab)
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i)
          }

          file = new File([ab], parsedData.resume.name, { type: mimeString })
        }

        setFormData({
          ...parsedData,
          resume: file
              ? {
                file,
                name: parsedData.resume.name,
                size: parsedData.resume.size,
              }
              : null,
        })

        const savedStep = localStorage.getItem("currentStep")
        if (savedStep) {
          setCurrentStep(Number.parseInt(savedStep, 10))
        }
      }
    } catch (error) {
      console.error("Error loading form data from localStorage:", error)
    }
  }, [])


  // useEffect(() => {
  //   try {
  //     const dataToSave = {
  //       ...formData,
  //       resume: formData.resume
  //         ? {
  //             name: formData.resume.name,
  //             size: formData.resume.size,
  //           }
  //         : null,
  //     }
  //
  //     localStorage.setItem("formData", JSON.stringify(dataToSave))
  //     localStorage.setItem("currentStep", currentStep.toString())
  //   } catch (error) {
  //     console.error("Error saving form data to localStorage:", error)
  //   }
  // }, [formData, currentStep])

  useEffect(() => {
    if (formData.resume?.file) {
      const reader = new FileReader()
      reader.onload = () => {
        const base64 = reader.result as string
        const dataToSave = {
          ...formData,
          resume: {
            name: formData.resume!.name,
            size: formData.resume!.size,
            base64,
          },
        }
        localStorage.setItem("formData", JSON.stringify(dataToSave))
      }
      reader.readAsDataURL(formData.resume.file)
    } else {
      const dataToSave = {
        ...formData,
        resume: null,
      }
      localStorage.setItem("formData", JSON.stringify(dataToSave))
    }

    localStorage.setItem("currentStep", currentStep.toString())
  }, [formData, currentStep])

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }))
  }

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 6))
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const canNavigateToStep = (step: number) => {
    if (step === 1) return true

    if (step === 2) {
      return !!formData.resume
    }

    if (step === 3) {
      return !!formData.resume && !!formData.firstName && !!formData.email && !!formData.phone
    }

    if (step === 4) {
      return !!formData.resume && !!formData.firstName && !!formData.email && !!formData.phone
    }

    if (step === 5) {
      return !!formData.resume && !!formData.firstName && !!formData.email && !!formData.phone
    }

    return false
  }

  return (
    <FormContext.Provider
      value={{
        currentStep,
        formData,
        setCurrentStep,
        updateFormData,
        nextStep,
        prevStep,
        canNavigateToStep,
      }}
    >
      {children}
    </FormContext.Provider>
  )
}
