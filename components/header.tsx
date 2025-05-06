import Link from "next/link"

export default function Header() {
  return (
    <header className="border-b border-gray-100 sticky top-0 bg-[#ffffff] z-[11] md:h-[82px] flex items-center">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-6xl">
        <Link href="/" className="flex items-center">
          <div className="font-bold text-3xl flex items-center">
            <span className="mr-1">B</span>
            <span className="text-[#FF5C35] flex flex-col justify-center h-5">
              <span className="h-[2px] w-4 bg-[#FF5C35] mb-[2px]"></span>
              <span className="h-[2px] w-4 bg-[#FF5C35] mb-[2px]"></span>
              <span className="h-[2px] w-4 bg-[#FF5C35]"></span>
            </span>
            <span>YOND</span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center space-x-4">
          <div className="border border-gray-200 rounded-full px-6 py-1 sm:py-3 flex space-x-6">
            <Link href="#" className="text-sm  hover:text-gray-900">
              Company
            </Link>
            <Link href="#" className="text-sm  hover:text-gray-900">
              Case studies
            </Link>
            <Link href="#" className="text-sm  hover:text-gray-900">
              Impact
            </Link>
            <Link href="#" className="text-sm  hover:text-gray-900">
              Operations
            </Link>
            <Link href="#" className="text-sm  hover:text-gray-900">
              Career
            </Link>
          </div>
        </nav>
        <Link
          href="#"
          className="border border-gray-200 rounded-full px-3 sm:px-6 py-1 sm:py-3 text-xs sm:text-[16px]  hover:text-gray-900"
        >
          Build with us
        </Link>
      </div>
    </header>
  )
}
