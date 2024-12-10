import React, { useState, useEffect } from 'react'
import { useBracketStore } from '../store/bracketStore'

/**
 * TeamBlock component for displaying and managing individual team entries in the bracket.
 * 
 * @param {Object} props
 * @param {Object} props.team - The team object to display.
 * @param {Function} props.onAdvance - Callback function to advance the team to the next round.
 * @param {boolean} props.isWinner - Indicates if this team is the winner of the current match.
 */
export function TeamBlock({ team, onAdvance, isWinner }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(team?.name || '')
  const updateTeamName = useBracketStore(state => state.updateTeamName)

  useEffect(() => {
    setEditedName(team?.name || '')
  }, [team?.name])

  if (!team) {
    return (
      <div className="h-12 bg-gray-700 bg-opacity-50 rounded-md animate-pulse" />
    )
  }

  const handleNameChange = (e) => {
    setEditedName(e.target.value)
  }

  const handleNameSubmit = () => {
    if (editedName.trim() !== '') {
      updateTeamName(team.id, editedName.trim())
      setIsEditing(false)
    }
  }

  return (
    <div className={`
      relative group h-12 px-6 flex items-center justify-between
      ${isWinner ? 'bg-red-600' : 'bg-gray-700'} 
      rounded-md transition-colors
    `}>
      <div className="flex items-center gap-2 w-full">
        <span className="text-sm text-gray-400">{team.seed}</span>
        <div className="w-40 overflow-hidden">
          {isEditing ? (
            <input
              type="text"
              value={editedName}
              onChange={handleNameChange}
              onBlur={handleNameSubmit}
              onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
              className="bg-transparent text-white font-medium focus:outline-none w-full"
              autoFocus
            />
          ) : (
            <span className="text-white font-medium truncate block">{team.name}</span>
          )}
        </div>
      </div>
      
      {team.editable && !isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="opacity-0 group-hover:opacity-100 p-1 bg-gray-600 hover:bg-gray-500 rounded-full transition-all absolute right-2"
        >
          Edit
        </button>
      )}
      
      {onAdvance && (
        <button
          onClick={() => onAdvance(team)}
          className="opacity-0 group-hover:opacity-100 absolute -right-10 p-1 bg-red-500 hover:bg-red-600 rounded-full transition-all transform translate-x-2 group-hover:translate-x-0"
        >
          Advance
        </button>
      )}
    </div>
  )
}

