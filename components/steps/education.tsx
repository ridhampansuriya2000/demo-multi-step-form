"use client"

import React, { useState, useRef, useEffect } from "react"
import { useFormContext } from "@/context/form-context"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {X, ChevronDown, GripVertical} from "lucide-react"
import { format } from "date-fns"
import CalendarPicker from "@/components/calendar-picker"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import StepNavigation from "@/components/ui/step-navigation";
import {useIsMobile} from "@/hooks/use-mobile";

type Education = {
  id: string
  degree: string
  institution: string
  startYear: number
  endYear: number
}

const   SortableEducation = ({ edu, onRemove }: { edu: Education; onRemove: (id: string) => void }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: edu.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
      <div
          ref={setNodeRef}
          style={style}
          className="flex items-center bg-white border border-gray-200 rounded-md px-3 py-2 mb-2"
      >
        <div {...attributes} {...listeners} className="cursor-grab mr-2">
          <GripVertical className="h-5 w-5 text-gray-400" />
        </div>
        <div className="flex-1 flex items-center">
          <span>{edu.degree}-{edu.institution}</span>
          <span className="mx-2 text-gray-400">({edu.startYear}–{edu.endYear})</span>
        </div>
        <button onClick={() => onRemove(edu.id)} className="text-gray-400 hover:text-gray-600">
          <X className="h-4 w-4" />
        </button>
      </div>
  )
}

export default function Education() {

  const isMobile = useIsMobile()

  const { formData, updateFormData, nextStep, prevStep } = useFormContext()
  const [educationList, setEducationList] = useState<Education[]>(formData.education || [])
  const [degree, setDegree] = useState("")
  const [institution, setInstitution] = useState("")
  const [startYear, setStartYear] = useState<Date | undefined>(undefined)
  const [endYear, setEndYear] = useState<Date | undefined>(undefined)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [calendarView, setCalendarView] = useState<"start" | "end" | null>(null)
  const startCalendarRef = useRef<HTMLDivElement>(null)
  const endCalendarRef = useRef<HTMLDivElement>(null)

  const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      }),
  )

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setEducationList((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        const newItems = [...items]
        const [removed] = newItems.splice(oldIndex, 1)
        newItems.splice(newIndex, 0, removed)

        return newItems
      })
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarView === "start" &&
        startCalendarRef.current &&
        !startCalendarRef.current.contains(event.target as Node)
      ) {
        setCalendarView(null)
      }
      if (calendarView === "end" && endCalendarRef.current && !endCalendarRef.current.contains(event.target as Node)) {
        setCalendarView(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [calendarView])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!degree.trim()) {
      newErrors.degree = "Degree is required"
    }

    if (!institution.trim()) {
      newErrors.institution = "Institution is required"
    }

    if (!startYear) {
      newErrors.startYear = "Start year is required"
    }

    if (!endYear) {
      newErrors.endYear = "End year is required"
    } else if (startYear && endYear && startYear > endYear) {
      newErrors.endYear = "End year must be after start year"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddEducation = () => {
    if (validateForm()) {
      const newEducation: Education = {
        id: Date.now().toString(),
        degree: degree.trim(),
        institution: institution.trim(),
        startYear: startYear ? startYear.getFullYear() : 0,
        endYear: endYear ? endYear.getFullYear() : 0,
      }

      setEducationList([...educationList, newEducation])
      setDegree("")
      setInstitution("")
      setStartYear(undefined)
      setEndYear(undefined)
      setErrors({})
    }
  }

  const handleRemoveEducation = (id: string) => {
    setEducationList(educationList.filter((edu) => edu.id !== id))
  }

  const handleSubmit = () => {
    if (educationList.length === 0) {
      setErrors({ general: "Please add at least one education entry" })
      return
    }

    updateFormData({ education: educationList })
    nextStep()
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-xl md:text-2xl font-medium text-gray-800 mb-6 md:mb-8">Add Education</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 mb-3 md:mb-6">
        <div className="space-y-2">
          <Label htmlFor="degree">Add Degree</Label>
          <input
            id="degree"
            value={degree}
            onChange={(e) => {
              setDegree(e.target.value)
              if (errors.degree) setErrors({ ...errors, degree: "" })
            }}
            className={`w-full px-4 py-2 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5C35] ${
              errors.degree ? "ring-2 ring-red-500" : ""
            }`}
          />
          {errors.degree && <p className="text-red-500 text-sm">{errors.degree}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="institution">University/College</Label>
          <input
            id="institution"
            value={institution}
            onChange={(e) => {
              setInstitution(e.target.value)
              if (errors.institution) setErrors({ ...errors, institution: "" })
            }}
            className={`w-full px-4 py-2 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5C35] ${
              errors.institution ? "ring-2 ring-red-500" : ""
            }`}
          />
          {errors.institution && <p className="text-red-500 text-sm">{errors.institution}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 mb-8">
        <div className="space-y-2 relative">
          <Label>Starting Year</Label>
          <button
            type="button"
            onClick={() => setCalendarView(calendarView === "start" ? null : "start")}
            className={`w-full flex justify-between items-center px-4 py-3 md:py-2 bg-gray-50 rounded-md focus:outline-none ${
              errors.startYear ? "ring-2 ring-red-500" : ""
            }`}
          >
            {startYear ? format(startYear, "yyyy") : "Select year"}
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>
          {calendarView === "start" && (
            <div ref={startCalendarRef} className="absolute z-10 mt-1 w-full">
              <CalendarPicker
                value={startYear}
                onChange={(date) => {
                  setStartYear(date)
                  if (errors.startYear) setErrors({ ...errors, startYear: "" })
                  setCalendarView(null)
                }}
                type="year"
              />
            </div>
          )}
          {errors.startYear && <p className="text-red-500 text-sm">{errors.startYear}</p>}
        </div>

        <div className="space-y-2 relative">
          <Label>Completion Year</Label>
          <button
            type="button"
            onClick={() => setCalendarView(calendarView === "end" ? null : "end")}
            className={`w-full flex justify-between items-center px-4 py-3 md:py-2 bg-gray-50 rounded-md focus:outline-none ${
              errors.endYear ? "ring-2 ring-red-500" : ""
            }`}
          >
            {endYear ? format(endYear, "yyyy") : "Select year"}
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>
          {calendarView === "end" && (
            <div ref={endCalendarRef} className="absolute z-10 mt-1 w-full">
              <CalendarPicker
                value={endYear}
                onChange={(date) => {
                  setEndYear(date)
                  if (errors.endYear) setErrors({ ...errors, endYear: "" })
                  setCalendarView(null)
                }}
                type="year"
              />
            </div>
          )}
          {errors.endYear && <p className="text-red-500 text-sm">{errors.endYear}</p>}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext items={educationList.map((s) => s.id)} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-2">
              {educationList.map((edu) => (
                  <SortableEducation key={edu.id} edu={edu} onRemove={handleRemoveEducation} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {errors.general && <p className="text-red-500 text-sm mt-2">{errors.general}</p>}

      <Button
        onClick={handleAddEducation}
        className="mt-4 bg-[#FF5C35] hover:bg-[#e04f2f] text-white  rounded-md flex items-center"
      >
        Add <span className="mr-1 text-xl">+</span>
      </Button>

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
