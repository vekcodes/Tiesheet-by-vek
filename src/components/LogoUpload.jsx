import React from 'react'
import { useBracketStore } from '../store/bracketStore'

/**
 * LogoUpload component for handling tournament logo uploads.
 */
export function LogoUpload() {
  const { setLogo } = useBracketStore()

  /**
   * Handles the logo file upload process.
   * @param {Event} e - The file input change event.
   */
  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogo(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <label 
        htmlFor="logo-upload" 
        className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg cursor-pointer transition-colors"
      >
        Upload Logo
      </label>
      <input
        id="logo-upload"
        type="file"
        accept="image/*"
        onChange={handleLogoUpload}
        className="hidden"
      />
    </div>
  )
}

