"use client"

import { useFormContext } from "@/context/form-context"
import { CheckIcon } from "lucide-react"

export default function ProgressBar() {
  const { currentStep, setCurrentStep, canNavigateToStep } = useFormContext()

  const steps = [
    { id: 1, name: "Upload Resume" },
    { id: 2, name: "Basic Information" },
    { id: 3, name: "Skill Set" },
    { id: 4, name: "Education" },
    { id: 5, name: "Summary" },
    { id: 6, name: "Completed" },
  ]

  const handleStepClick = (stepId: number) => {
    if (canNavigateToStep(stepId)) {
      setCurrentStep(stepId)
    }
  }

  return (
    <div className="mt-8 px-4 md:px-8">
      <div className="flex justify-between items-center relative">
        <div className="absolute h-[2px] bg-gray-200 left-0 right-0 top-1/2 transform -translate-y-1/2 z-0"></div>

        <div
          className="absolute h-[2px] bg-[#FF5C35] left-0 top-1/2 transform -translate-y-1/2 z-0"
          style={{ width: `${(Math.min(currentStep - 1, 5) / 5) * 100}%` }}
        ></div>

        {steps.map((step) => (
          <div
            key={step.id}
            className="flex flex-col items-center relative z-10"
            // onClick={() => handleStepClick(step.id)}
          >
            <div
              className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center cursor-pointer
                ${
                  step.id < currentStep || currentStep == 6
                    ? "bg-[#FF5C35] text-white"
                    : step.id === currentStep
                      ? "border-2 border-[#FF5C35] bg-white"
                      : "bg-white border-2 border-gray-200"
                }`}
            >
              {step.id < currentStep || currentStep == 6 ? (
                <CheckIcon className="w-3 h-3 md:w-4 md:h-4 text-white" />
              ) : step.id === currentStep ? (
                <div className="w-2 h-2 rounded-full bg-[#FF5C35]"></div>
              ) : (
                <div className="w-2 h-2 rounded-full bg-gray-200"></div>
              )}
            </div>
            <span className="absolute top-8 md:w-max w-auto text-[10px] md:text-xs mt-1 md:mt-2 text-gray-600">{step.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
