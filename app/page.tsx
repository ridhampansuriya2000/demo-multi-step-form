"use client"

import { useEffect } from "react"
import { useFormContext } from "@/context/form-context"
import Header from "@/components/header"
import ProgressBar from "@/components/progress-bar"
import UploadResume from "@/components/steps/upload-resume"
import BasicInformation from "@/components/steps/basic-information"
import SkillSet from "@/components/steps/skill-set"
import Education from "@/components/steps/education"
import Summary from "@/components/steps/summary"
import Completed from "@/components/steps/completed"

export default function Home() {
  const { currentStep } = useFormContext()

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <UploadResume />
      case 2:
        return <BasicInformation />
      case 3:
        return <SkillSet />
      case 4:
        return <Education />
      case 5:
        return <Summary />
      case 6:
        return <Completed />
      default:
        return <UploadResume />
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-8 pb-8 pt-4 md:pt-14 max-w-6xl">
        <ProgressBar />
        <div className="mt-12 pt-5 md:pt-[56px]">{renderStep()}</div>
      </div>
    </main>
  )
}
