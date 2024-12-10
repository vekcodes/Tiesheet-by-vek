import React, { useState } from 'react'
import { useBracketStore } from '../store/bracketStore'
import { LogoUpload } from './LogoUpload'

/**
 * Controls component for managing tournament settings and actions.
 * This component provides UI for generating teams, shuffling, clearing the bracket, and printing.
 */
export function Controls() {
  const [teamCount, setTeamCount] = useState(8)
  const { setTeams, clearBracket, shuffleTeams } = useBracketStore()

  /**
   * Generates a new set of teams based on the current team count.
   */
  const generateTeams = () => {
    const teams = Array.from({ length: teamCount }, (_, i) => ({
      id: `team-${i + 1}`,
      name: `Team ${i + 1}`,
      seed: i + 1,
      editable: true
    }))
    setTeams(teams)
  }

  /**
   * Handles the print action by opening the browser's print dialog.
   */
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-800 rounded-lg print:hidden">
      <div className="flex items-center gap-2">
        <label className="text-white">Teams:</label>
        <input
          type="number"
          min="2"
          max="64"
          value={teamCount}
          onChange={(e) => setTeamCount(Number(e.target.value))}
          className="w-20 px-2 py-1 bg-gray-700 text-white rounded"
        />
        <button
          onClick={generateTeams}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          Generate
        </button>
      </div>

      <LogoUpload />

      <button
        onClick={shuffleTeams}
        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
      >
        Shuffle
      </button>

      <button
        onClick={clearBracket}
        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
      >
        Clear
      </button>

      <button
        onClick={handlePrint}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
      >
        Print Tiesheet
      </button>
    </div>
  )
}

