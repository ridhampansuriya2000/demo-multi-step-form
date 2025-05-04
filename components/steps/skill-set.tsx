"use client"

import React, { useState } from "react"
import { useFormContext } from "@/context/form-context"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { X, GripVertical } from "lucide-react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  TouchSensor
} from "@dnd-kit/core"
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable, rectSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import StepNavigation from "@/components/ui/step-navigation";
import {useIsMobile} from "@/hooks/use-mobile";

type Skill = {
  id: string
  name: string
  level: "Beginner" | "Intermediate" | "Expert"
}

const SortableSkill = ({ skill, onRemove }: { skill: Skill; onRemove: (id: string) => void }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: skill.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center bg-white border border-gray-200 rounded-md px-3 py-2 mb-0 w-fit"
    >
      <div {...attributes} {...listeners} className="cursor-grab mr-2">
        <GripVertical className="h-5 w-5 text-gray-400" />
      </div>
      <div className="flex-1 flex items-center">
        <span>{skill.name}</span>
        <span className="mx-2 text-gray-400">({skill.level})</span>
      </div>
      <button onClick={() => onRemove(skill.id)} className="text-gray-400 hover:text-gray-600">
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

export default function SkillSet() {

  const isMobile = useIsMobile()

  const { formData, updateFormData, nextStep, prevStep } = useFormContext()
  const [skills, setSkills] = useState<Skill[]>(formData.skills || [])
  const [newSkill, setNewSkill] = useState("")
  const [skillLevel, setSkillLevel] = useState<"Beginner" | "Intermediate" | "Expert">("Intermediate")
  const [error, setError] = useState("")

  const sensors = useSensors(
    useSensor(TouchSensor),
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleAddSkill = () => {
    if (newSkill.trim().length < 2) {
      setError("Skill name must be at least 2 characters")
      return
    }

    const newSkillItem: Skill = {
      id: Date.now().toString(),
      name: newSkill.trim(),
      level: skillLevel,
    }

    setSkills([...skills, newSkillItem])
    setNewSkill("")
    setError("")
  }

  const handleRemoveSkill = (id: string) => {
    setSkills(skills.filter((skill) => skill.id !== id))
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setSkills((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        const newItems = [...items]
        const [removed] = newItems.splice(oldIndex, 1)
        newItems.splice(newIndex, 0, removed)

        return newItems
      })
    }
  }

  const handleSubmit = () => {
    if (skills.length === 0) {
      setError("Please add at least one skill")
      return
    }

    updateFormData({ skills })
    nextStep()
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-xl md:text-2xl font-medium text-gray-800 mb-6 md:mb-8">Add Skill Sets</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 mb-6">
        <div className="space-y-2">
          <Label htmlFor="skill">Add Skill</Label>
          <input
            id="skill"
            value={newSkill}
            onChange={(e) => {
              setNewSkill(e.target.value)
              if (error) setError("")
            }}
            className={`w-full px-4 py-2 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5C35] ${
              error ? "ring-2 ring-red-500" : ""
            }`}
            placeholder="Enter skill name"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="level">Experience level</Label>
          <select
            value={skillLevel}
            onChange={(e) => setSkillLevel(e.target.value as "Beginner" | "Intermediate" | "Expert")}
            className="w-full px-4 py-2 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5C35]"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
        </div>
      </div>

      <div className="mb-8">

        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
          <SortableContext items={skills.map((s) => s.id)} strategy={rectSortingStrategy}>
            <div className="flex flex-wrap gap-1 md:gap-2">
              {skills.map((skill) => (
                  <SortableSkill key={skill.id} skill={skill} onRemove={handleRemoveSkill} />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        <Button
          onClick={handleAddSkill}
          className="mt-4 bg-[#FF5C35] text-white hover:bg-[#e04f2f] rounded-md flex items-center"
        >
          Add <span className="mr-1 text-xl">+</span>
        </Button>
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
