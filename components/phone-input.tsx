"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  error?: boolean
}

const countries = [
  { codeInAlpha: "AF", flag: "🇦🇫", name: "Afghanistan", code: "+93" },
  { codeInAlpha: "AL", flag: "🇦🇱", name: "Albania", code: "+355" },
  { codeInAlpha: "DZ", flag: "🇩🇿", name: "Algeria", code: "+213" },
  { codeInAlpha: "AD", flag: "🇦🇩", name: "Andorra", code: "+376" },
  { codeInAlpha: "AO", flag: "🇦🇴", name: "Angola", code: "+244" },
  { codeInAlpha: "AG", flag: "🇦🇬", name: "Antigua and Barbuda", code: "+1-268" },
  { codeInAlpha: "AR", flag: "🇦🇷", name: "Argentina", code: "+54" },
  { codeInAlpha: "AM", flag: "🇦🇲", name: "Armenia", code: "+374" },
  { codeInAlpha: "AU", flag: "🇦🇺", name: "Australia", code: "+61" },
  { codeInAlpha: "AT", flag: "🇦🇹", name: "Austria", code: "+43" },
  { codeInAlpha: "AZ", flag: "🇦🇿", name: "Azerbaijan", code: "+994" },
  { codeInAlpha: "BS", flag: "🇧🇸", name: "Bahamas", code: "+1-242" },
  { codeInAlpha: "BH", flag: "🇧🇭", name: "Bahrain", code: "+973" },
  { codeInAlpha: "BD", flag: "🇧🇩", name: "Bangladesh", code: "+880" },
  { codeInAlpha: "BB", flag: "🇧🇧", name: "Barbados", code: "+1-246" },
  { codeInAlpha: "BY", flag: "🇧🇾", name: "Belarus", code: "+375" },
  { codeInAlpha: "BE", flag: "🇧🇪", name: "Belgium", code: "+32" },
  { codeInAlpha: "BZ", flag: "🇧🇿", name: "Belize", code: "+501" },
  { codeInAlpha: "BJ", flag: "🇧🇯", name: "Benin", code: "+229" },
  { codeInAlpha: "BT", flag: "🇧🇹", name: "Bhutan", code: "+975" },
  { codeInAlpha: "BO", flag: "🇧🇴", name: "Bolivia", code: "+591" },
  { codeInAlpha: "BA", flag: "🇧🇦", name: "Bosnia and Herzegovina", code: "+387" },
  { codeInAlpha: "BW", flag: "🇧🇼", name: "Botswana", code: "+267" },
  { codeInAlpha: "BR", flag: "🇧🇷", name: "Brazil", code: "+55" },
  { codeInAlpha: "BN", flag: "🇧🇳", name: "Brunei", code: "+673" },
  { codeInAlpha: "BG", flag: "🇧🇬", name: "Bulgaria", code: "+359" },
  { codeInAlpha: "BF", flag: "🇧🇫", name: "Burkina Faso", code: "+226" },
  { codeInAlpha: "BI", flag: "🇧🇮", name: "Burundi", code: "+257" },
  { codeInAlpha: "CV", flag: "🇨🇻", name: "Cabo Verde", code: "+238" },
  { codeInAlpha: "KH", flag: "🇰🇭", name: "Cambodia", code: "+855" },
  { codeInAlpha: "CM", flag: "🇨🇲", name: "Cameroon", code: "+237" },
  { codeInAlpha: "CA", flag: "🇨🇦", name: "Canada", code: "+1" },
  { codeInAlpha: "CF", flag: "🇨🇫", name: "Central African Republic", code: "+236" },
  { codeInAlpha: "TD", flag: "🇹🇩", name: "Chad", code: "+235" },
  { codeInAlpha: "CL", flag: "🇨🇱", name: "Chile", code: "+56" },
  { codeInAlpha: "CN", flag: "🇨🇳", name: "China", code: "+86" },
  { codeInAlpha: "CO", flag: "🇨🇴", name: "Colombia", code: "+57" },
  { codeInAlpha: "KM", flag: "🇰🇲", name: "Comoros", code: "+269" },
  { codeInAlpha: "CD", flag: "🇨🇩", name: "Congo (DRC)", code: "+243" },
  { codeInAlpha: "CG", flag: "🇨🇬", name: "Congo (Republic)", code: "+242" },
  { codeInAlpha: "CR", flag: "🇨🇷", name: "Costa Rica", code: "+506" },
  { codeInAlpha: "CI", flag: "🇨🇮", name: "Côte d'Ivoire", code: "+225" },
  { codeInAlpha: "HR", flag: "🇭🇷", name: "Croatia", code: "+385" },
  { codeInAlpha: "CU", flag: "🇨🇺", name: "Cuba", code: "+53" },
  { codeInAlpha: "CY", flag: "🇨🇾", name: "Cyprus", code: "+357" },
  { codeInAlpha: "CZ", flag: "🇨🇿", name: "Czech Republic", code: "+420" },
  { codeInAlpha: "DK", flag: "🇩🇰", name: "Denmark", code: "+45" },
  { codeInAlpha: "DJ", flag: "🇩🇯", name: "Djibouti", code: "+253" },
  { codeInAlpha: "DM", flag: "🇩🇲", name: "Dominica", code: "+1-767" },
  { codeInAlpha: "DO", flag: "🇩🇴", name: "Dominican Republic", code: "+1-809, +1-829, +1-849" },
  { codeInAlpha: "EC", flag: "🇪🇨", name: "Ecuador", code: "+593" },
  { codeInAlpha: "EG", flag: "🇪🇬", name: "Egypt", code: "+20" },
  { codeInAlpha: "SV", flag: "🇸🇻", name: "El Salvador", code: "+503" },
  { codeInAlpha: "GQ", flag: "🇬🇶", name: "Equatorial Guinea", code: "+240" },
  { codeInAlpha: "ER", flag: "🇪🇷", name: "Eritrea", code: "+291" },
  { codeInAlpha: "EE", flag: "🇪🇪", name: "Estonia", code: "+372" },
  { codeInAlpha: "SZ", flag: "🇸🇿", name: "Eswatini", code: "+268" },
  { codeInAlpha: "ET", flag: "🇪🇹", name: "Ethiopia", code: "+251" },
  { codeInAlpha: "FJ", flag: "🇫🇯", name: "Fiji", code: "+679" },
  { codeInAlpha: "FI", flag: "🇫🇮", name: "Finland", code: "+358" },
  { codeInAlpha: "FR", flag: "🇫🇷", name: "France", code: "+33" },
  { codeInAlpha: "GA", flag: "🇬🇦", name: "Gabon", code: "+241" },
  { codeInAlpha: "GM", flag: "🇬🇲", name: "Gambia", code: "+220" },
  { codeInAlpha: "GE", flag: "🇬🇪", name: "Georgia", code: "+995" },
  { codeInAlpha: "DE", flag: "🇩🇪", name: "Germany", code: "+49" },
  { codeInAlpha: "GH", flag: "🇬🇭", name: "Ghana", code: "+233" },
  { codeInAlpha: "GR", flag: "🇬🇷", name: "Greece", code: "+30" },
  { codeInAlpha: "GD", flag: "🇬🇩", name: "Grenada", code: "+1-473" },
  { codeInAlpha: "GT", flag: "🇬🇹", name: "Guatemala", code: "+502" },
  { codeInAlpha: "GN", flag: "🇬🇳", name: "Guinea", code: "+224" },
  { codeInAlpha: "GW", flag: "🇬🇼", name: "Guinea-Bissau", code: "+245" },
  { codeInAlpha: "GY", flag: "🇬🇾", name: "Guyana", code: "+592" },
  { codeInAlpha: "HT", flag: "🇭🇹", name: "Haiti", code: "+509" },
  { codeInAlpha: "HN", flag: "🇭🇳", name: "Honduras", code: "+504" },
  { codeInAlpha: "HU", flag: "🇭🇺", name: "Hungary", code: "+36" },
  { codeInAlpha: "IS", flag: "🇮🇸", name: "Iceland", code: "+354" },
  { codeInAlpha: "IN", flag: "🇮🇳", name: "India", code: "+91" },
  { codeInAlpha: "ID", flag: "🇮🇩", name: "Indonesia", code: "+62" },
  { codeInAlpha: "IR", flag: "🇮🇷", name: "Iran", code: "+98" },
  { codeInAlpha: "IQ", flag: "🇮🇶", name: "Iraq", code: "+964" },
  { codeInAlpha: "IE", flag: "🇮🇪", name: "Ireland", code: "+353" },
  { codeInAlpha: "IL", flag: "🇮🇱", name: "Israel", code: "+972" },
  { codeInAlpha: "IT", flag: "🇮🇹", name: "Italy", code: "+39" },
  { codeInAlpha: "JM", flag: "🇯🇲", name: "Jamaica", code: "+1-876" },
  { codeInAlpha: "JP", flag: "🇯🇵", name: "Japan", code: "+81" },
  { codeInAlpha: "JO", flag: "🇯🇴", name: "Jordan", code: "+962" },
  { codeInAlpha: "KZ", flag: "🇰🇿", name: "Kazakhstan", code: "+71" },
  { codeInAlpha: "KE", flag: "🇰🇪", name: "Kenya", code: "+254" },
  { codeInAlpha: "KI", flag: "🇰🇮", name: "Kiribati", code: "+686" },
  { codeInAlpha: "KP", flag: "🇰🇵", name: "North Korea", code: "+850" },
  { codeInAlpha: "KR", flag: "🇰🇷", name: "South Korea", code: "+82" },
  { codeInAlpha: "KW", flag: "🇰🇼", name: "Kuwait", code: "+965" },
  { codeInAlpha: "KG", flag: "🇰🇬", name: "Kyrgyzstan", code: "+996" },
  { codeInAlpha: "LA", flag: "🇱🇦", name: "Laos", code: "+856" },
  { codeInAlpha: "LV", flag: "🇱🇻", name: "Latvia", code: "+371" },
  { codeInAlpha: "LB", flag: "🇱🇧", name: "Lebanon", code: "+961" },
  { codeInAlpha: "LS", flag: "🇱🇸", name: "Lesotho", code: "+266" },
  { codeInAlpha: "LR", flag: "🇱🇷", name: "Liberia", code: "+231" },
  { codeInAlpha: "LY", flag: "🇱🇾", name: "Libya", code: "+218" },
  { codeInAlpha: "LI", flag: "🇱🇮", name: "Liechtenstein", code: "+423" },
  { codeInAlpha: "LT", flag: "🇱🇹", name: "Lithuania", code: "+370" },
  { codeInAlpha: "LU", flag: "🇱🇺", name: "Luxembourg", code: "+352" },
  { codeInAlpha: "MG", flag: "🇲🇬", name: "Madagascar", code: "+261" },
  { codeInAlpha: "MW", flag: "🇲🇼", name: "Malawi", code: "+265" },
  { codeInAlpha: "MY", flag: "🇲🇾", name: "Malaysia", code: "+60" },
  { codeInAlpha: "MV", flag: "🇲🇻", name: "Maldives", code: "+960" },
  { codeInAlpha: "ML", flag: "🇲🇱", name: "Mali", code: "+223" },
  { codeInAlpha: "MT", flag: "🇲🇹", name: "Malta", code: "+356" },
  { codeInAlpha: "MH", flag: "🇲🇭", name: "Marshall Islands", code: "+692" },
  { codeInAlpha: "MR", flag: "🇲🇷", name: "Mauritania", code: "+222" },
  { codeInAlpha: "MU", flag: "🇲🇺", name: "Mauritius", code: "+230" },
  { codeInAlpha: "MX", flag: "🇲🇽", name: "Mexico", code: "+52" },
  { codeInAlpha: "FM", flag: "🇫🇲", name: "Micronesia", code: "+691" },
  { codeInAlpha: "MD", flag: "🇲🇩", name: "Moldova", code: "+373" },
  { codeInAlpha: "MC", flag: "🇲🇨", name: "Monaco", code: "+377" },
  { codeInAlpha: "MN", flag: "🇲🇳", name: "Mongolia", code: "+976" },
  { codeInAlpha: "ME", flag: "🇲🇪", name: "Montenegro", code: "+382" },
  { codeInAlpha: "MA", flag: "🇲🇦", name: "Morocco", code: "+212" },
  { codeInAlpha: "MZ", flag: "🇲🇿", name: "Mozambique", code: "+258" },
  { codeInAlpha: "MM", flag: "🇲🇲", name: "Myanmar", code: "+95" },
  { codeInAlpha: "NA", flag: "🇳🇦", name: "Namibia", code: "+264" },
  { codeInAlpha: "NR", flag: "🇳🇷", name: "Nauru", code: "+674" },
  { codeInAlpha: "NP", flag: "🇳🇵", name: "Nepal", code: "+977" },
  { codeInAlpha: "NL", flag: "🇳🇱", name: "Netherlands", code: "+31" },
  { codeInAlpha: "NZ", flag: "🇳🇿", name: "New Zealand", code: "+64" },
  { codeInAlpha: "NI", flag: "🇳🇮", name: "Nicaragua", code: "+505" },
  { codeInAlpha: "NE", flag: "🇳🇪", name: "Niger", code: "+227" },
  { codeInAlpha: "NG", flag: "🇳🇬", name: "Nigeria", code: "+234" },
  { codeInAlpha: "MK", flag: "🇲🇰", name: "North Macedonia", code: "+389" },
  { codeInAlpha: "NO", flag: "🇳🇴", name: "Norway", code: "+47" },
  { codeInAlpha: "OM", flag: "🇴🇲", name: "Oman", code: "+968" },
  { codeInAlpha: "PK", flag: "🇵🇰", name: "Pakistan", code: "+92" },
  { codeInAlpha: "PW", flag: "🇵🇼", name: "Palau", code: "+680" },
  { codeInAlpha: "PA", flag: "🇵🇦", name: "Panama", code: "+507" },
  { codeInAlpha: "PG", flag: "🇵🇬", name: "Papua New Guinea", code: "+675" },
  { codeInAlpha: "PY", flag: "🇵🇾", name: "Paraguay", code: "+595" },
  { codeInAlpha: "PE", flag: "🇵🇪", name: "Peru", code: "+51" },
  { codeInAlpha: "PH", flag: "🇵🇭", name: "Philippines", code: "+63" },
  { codeInAlpha: "PL", flag: "🇵🇱", name: "Poland", code: "+48" },
  { codeInAlpha: "PT", flag: "🇵🇹", name: "Portugal", code: "+351" },
  { codeInAlpha: "QA", flag: "🇶🇦", name: "Qatar", code: "+974" },
  { codeInAlpha: "RO", flag: "🇷🇴", name: "Romania", code: "+40" },
  { codeInAlpha: "RU", flag: "🇷🇺", name: "Russia", code: "+7" },
  { codeInAlpha: "RW", flag: "🇷🇼", name: "Rwanda", code: "+250" },
  { codeInAlpha: "KN", flag: "🇰🇳", name: "Saint Kitts and Nevis", code: "+1-869" },
  { codeInAlpha: "LC", flag: "🇱🇨", name: "Saint Lucia", code: "+1-758" },
  { codeInAlpha: "VC", flag: "🇻🇨", name: "Saint Vincent and the Grenadines", code: "+1-784" },
  { codeInAlpha: "WS", flag: "🇼🇸", name: "Samoa", code: "+685" },
  { codeInAlpha: "SM", flag: "🇸🇲", name: "San Marino", code: "+378" },
  { codeInAlpha: "ST", flag: "🇸🇹", name: "Sao Tome and Principe", code: "+239" },
  { codeInAlpha: "SA", flag: "🇸🇦", name: "Saudi Arabia", code: "+966" },
  { codeInAlpha: "SN", flag: "🇸🇳", name: "Senegal", code: "+221" },
  { codeInAlpha: "RS", flag: "🇷🇸", name: "Serbia", code: "+381" },
  { codeInAlpha: "SC", flag: "🇸🇨", name: "Seychelles", code: "+248" },
  { codeInAlpha: "SL", flag: "🇸🇱", name: "Sierra Leone", code: "+232" },
  { codeInAlpha: "SG", flag: "🇸🇬", name: "Singapore", code: "+65" },
  { codeInAlpha: "SK", flag: "🇸🇰", name: "Slovakia", code: "+421" },
  { codeInAlpha: "SI", flag: "🇸🇮", name: "Slovenia", code: "+386" },
  { codeInAlpha: "SB", flag: "🇸🇧", name: "Solomon Islands", code: "+677" },
  { codeInAlpha: "SO", flag: "🇸🇴", name: "Somalia", code: "+252" },
  { codeInAlpha: "ZA", flag: "🇿🇦", name: "South Africa", code: "+27" },
  { codeInAlpha: "SS", flag: "🇸🇸", name: "South Sudan", code: "+211" },
  { codeInAlpha: "ES", flag: "🇪🇸", name: "Spain", code: "+34" },
  { codeInAlpha: "LK", flag: "🇱🇰", name: "Sri Lanka", code: "+94" },
  { codeInAlpha: "SD", flag: "🇸🇩", name: "Sudan", code: "+249" },
  { codeInAlpha: "SR", flag: "🇸🇷", name: "Suriname", code: "+597" },
  { codeInAlpha: "SE", flag: "🇸🇪", name: "Sweden", code: "+46" },
  { codeInAlpha: "CH", flag: "🇨🇭", name: "Switzerland", code: "+41" },
  { codeInAlpha: "SY", flag: "🇸🇾", name: "Syria", code: "+963" },
  { codeInAlpha: "TW", flag: "🇹🇼", name: "Taiwan", code: "+886" },
  { codeInAlpha: "TJ", flag: "🇹🇯", name: "Tajikistan", code: "+992" },
  { codeInAlpha: "TZ", flag: "🇹🇿", name: "Tanzania", code: "+255" },
  { codeInAlpha: "TH", flag: "🇹🇭", name: "Thailand", code: "+66" },
  { codeInAlpha: "TL", flag: "🇹🇱", name: "Timor-Leste", code: "+670" },
  { codeInAlpha: "TG", flag: "🇹🇬", name: "Togo", code: "+228" },
  { codeInAlpha: "TO", flag: "🇹🇴", name: "Tonga", code: "+676" },
  { codeInAlpha: "TT", flag: "🇹🇹", name: "Trinidad and Tobago", code: "+1-868" },
  { codeInAlpha: "TN", flag: "🇹🇳", name: "Tunisia", code: "+216" },
  { codeInAlpha: "TR", flag: "🇹🇷", name: "Turkey", code: "+90" },
  { codeInAlpha: "TM", flag: "🇹🇲", name: "Turkmenistan", code: "+993" },
  { codeInAlpha: "TV", flag: "🇹🇻", name: "Tuvalu", code: "+688" },
  { codeInAlpha: "UG", flag: "🇺🇬", name: "Uganda", code: "+256" },
  { codeInAlpha: "UA", flag: "🇺🇦", name: "Ukraine", code: "+380" },
  { codeInAlpha: "AE", flag: "🇦🇪", name: "United Arab Emirates", code: "+971" },
  { codeInAlpha: "GB", flag: "🇬🇧", name: "United Kingdom", code: "+44" },
]

interface Country {
  codeInAlpha: string
  code: string
  flag: string
  name: string
}

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  error?: boolean
  selectedCountry: Country
  onCountryChange: (country: Country) => void
}

function PhoneInput({
                      value,
                      onChange,
                      error,
                      selectedCountry,
                      onCountryChange,
                    }: PhoneInputProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let preSelectedCountry = countries.find((cntr)=> cntr.code == value.split(" ")[0] )
    value && preSelectedCountry && onCountryChange(preSelectedCountry)
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleCountrySelect = (country: Country) => {
    onCountryChange(country)
    const numberPart = value.includes(" ") ? value.split(" ")[1] : ""
    onChange(`${country.code} ${numberPart}`)
    setIsOpen(false)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numberPart = e.target.value.replace(/[^0-9]/g, "")
    onChange(`${selectedCountry.code} ${numberPart}`)
  }

  const numberPart = value.includes(" ") ? value.split(" ")[1] : ""

  return (
      <div className="relative" ref={dropdownRef}>
        <div className={`flex bg-gray-50 rounded-md ${error ? "ring-2 ring-red-500" : ""}`}>
          <div className="relative">
            <button
                type="button"
                className="flex items-center h-full px-3 border-r border-gray-200"
                onClick={() => setIsOpen(!isOpen)}
            >
              <img
                  src={`https://flagcdn.com/w40/${selectedCountry?.codeInAlpha?.toLowerCase()}.png`}
                  className="w-7 h-5 mr-2"
                  alt={selectedCountry?.name}
              />
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  {countries.map((country) => (
                      <button
                          key={country.code}
                          type="button"
                          className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-50"
                          onClick={() => handleCountrySelect(country)}
                      >
                        <img
                            src={`https://flagcdn.com/w40/${country?.codeInAlpha?.toLowerCase()}.png`}
                            className="w-7 h-5 mr-2"
                            alt={country.name}
                        />
                        <span>
                    {country.name} ({country.code})
                  </span>
                      </button>
                  ))}
                </div>
            )}
          </div>

          <input
              type="text"
              value={numberPart}
              onChange={handlePhoneChange}
              placeholder="XXXXX XXXXX"
              className="flex-1 px-3 py-2 bg-gray-50 focus:outline-none"
          />
        </div>
      </div>
  )
}

export default PhoneInput
