"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CalendarPickerProps {
  value?: Date
  onChange: (date: Date) => void
  type: "month" | "year" | "date"
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export default function CalendarPicker({ value, onChange, type }: CalendarPickerProps) {
  const [currentDate, setCurrentDate] = useState(value || new Date())
  const [viewDate, setViewDate] = useState(value || new Date())
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value)
  const [view, setView] = useState<"date" | "month" | "year">(type || "date")

  useEffect(() => {
    if (value) {
      setSelectedDate(value)
      setViewDate(value)
    }
  }, [value])

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    onChange(date)
  }

  const handleMonthClick = (month: number) => {
    if (type === "month") {
      const newDate = new Date(viewDate.getFullYear(), month, 1)
      setSelectedDate(newDate)
      onChange(newDate)
    } else {
      setViewDate(new Date(viewDate.getFullYear(), month, 1))
      setView("date")
    }
  }

  const handleYearClick = (year: number) => {
    if (type === "year") {
      const newDate = new Date(year, 0, 1)
      setSelectedDate(newDate)
      onChange(newDate)
    } else {
      setViewDate(new Date(year, viewDate.getMonth(), 1))
      setView("month")
    }
  }

  const renderDateView = () => {
    const year = viewDate.getFullYear()
    const month = viewDate.getMonth()

    const firstDayOfMonth = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const daysInPrevMonth = new Date(year, month, 0).getDate()

    const days = []

    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, daysInPrevMonth - i),
        isCurrentMonth: false,
      })
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      })
    }

    const remainingCells = 42 - days.length
    for (let i = 1; i <= remainingCells; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      })
    }

    const isSelected = (date: Date) => {
      return (
        selectedDate &&
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear()
      )
    }

    const isToday = (date: Date) => {
      const today = new Date()
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      )
    }

    return (
      <div className="bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center p-4">
          <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex space-x-2">
            <button onClick={() => setView("month")} className="font-medium hover:bg-gray-100 px-2 py-1 rounded">
              {months[viewDate.getMonth()]}
            </button>
            <button onClick={() => setView("year")} className="font-medium hover:bg-gray-100 px-2 py-1 rounded">
              {viewDate.getFullYear()}
            </button>
          </div>
          <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded-full">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 p-2">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div key={day} className="text-center text-xs text-gray-500 py-1">
              {day}
            </div>
          ))}

          {days.map((day, index) => (
            <button
              key={index}
              onClick={() => handleDateClick(day.date)}
              className={`
                text-center py-1 rounded-md text-sm
                ${!day.isCurrentMonth ? "text-gray-300" : ""}
                ${isSelected(day.date) ? "bg-[#FF5C35] text-white" : ""}
                ${isToday(day.date) && !isSelected(day.date) ? "border border-[#FF5C35] text-[#FF5C35]" : ""}
                ${day.isCurrentMonth && !isSelected(day.date) && !isToday(day.date) ? "hover:bg-gray-100" : ""}
              `}
            >
              {day.date.getDate()}
            </button>
          ))}
        </div>
      </div>
    )
  }

  const renderMonthView = () => {
    return (
      <div className="bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center p-4">
          <button
            onClick={() => setViewDate(new Date(viewDate.getFullYear() - 1, viewDate.getMonth(), 1))}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={() => setView("year")} className="font-medium hover:bg-gray-100 px-4 py-1 rounded">
            {viewDate.getFullYear()}
          </button>
          <button
            onClick={() => setViewDate(new Date(viewDate.getFullYear() + 1, viewDate.getMonth(), 1))}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 p-4">
          {months.map((month, index) => (
            <button
              key={month}
              onClick={() => handleMonthClick(index)}
              className={`
                text-center py-2 rounded-md
                ${
                  selectedDate &&
                  selectedDate.getMonth() === index &&
                  selectedDate.getFullYear() === viewDate.getFullYear()
                    ? "bg-[#FF5C35] text-white"
                    : "hover:bg-gray-100"
                }
              `}
            >
              {month.substring(0, 3)}
            </button>
          ))}
        </div>
      </div>
    )
  }

  const renderYearView = () => {
    const currentYear = viewDate.getFullYear()
    const startYear = currentYear - (currentYear % 12)
    const years = Array.from({ length: 12 }, (_, i) => startYear + i)

    return (
      <div className="bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center p-4">
          <button
            onClick={() => setViewDate(new Date(viewDate.getFullYear() - 12, viewDate.getMonth(), 1))}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="font-medium">
            {startYear} - {startYear + 11}
          </span>
          <button
            onClick={() => setViewDate(new Date(viewDate.getFullYear() + 12, viewDate.getMonth(), 1))}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2 p-4">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => handleYearClick(year)}
              className={`
                text-center py-2 rounded-md
                ${selectedDate && selectedDate.getFullYear() === year ? "bg-[#FF5C35] text-white" : "hover:bg-gray-100"}
              `}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      {view === "date" && renderDateView()}
      {view === "month" && renderMonthView()}
      {view === "year" && renderYearView()}
    </div>
  )
}
