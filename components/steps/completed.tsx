"use client"

import { Button } from "@/components/ui/button"
import React from "react";

export default function Completed() {

  return (
    <div className="max-w-6xl mx-auto text-center py-12">
      <h2 className="text-xl md:text-3xl font-medium mb-2">
        <span className="text-[#FF5C35] text-xl md:text-3xl font-medium">Great!</span> Thank You for Applying
      </h2>
      <p className="text-gray-600 mb-12 max-w-lg mx-auto text-sm md:text-base">
        We appreciate your application. Our team will review it, and we'll reach out soon if there's a match. Stay
        tuned!
      </p>

      <Button className="bg-[#FF5C35] hover:bg-[#e04f2f] text-white px-4 md:px-8 h-9 md:h-11 md:py-2 rounded-sm text-xs md:text-sm">
        TRACK APPLICATION
      </Button>
    </div>
  )
}
