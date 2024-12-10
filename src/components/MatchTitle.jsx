import React, { useState } from 'react'
import { useBracketStore } from '../store/bracketStore'

/**
 * MatchTitle component for displaying and editing the tournament title.
 */
export function MatchTitle() {
  const [isEditing, setIsEditing] = useState(false)
  const { matchTitle, updateMatchTitle } = useBracketStore()
  const [editedTitle, setEditedTitle] = useState(matchTitle)

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value)
  }

  const handleTitleSubmit = () => {
    if (editedTitle.trim() !== '') {
      updateMatchTitle(editedTitle.trim())
      setIsEditing(false)
    }
  }

  return (
    <div className="relative group mb-8 text-center">
      {isEditing ? (
        <input
          type="text"
          value={editedTitle}
          onChange={handleTitleChange}
          onBlur={handleTitleSubmit}
          onKeyPress={(e) => e.key === 'Enter' && handleTitleSubmit()}
          className="bg-transparent text-white text-3xl font-bold focus:outline-none text-center w-full"
          autoFocus
        />
      ) : (
        <h1 className="text-3xl font-bold text-white">{matchTitle}</h1>
      )}
      {!isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="opacity-0 group-hover:opacity-100 absolute -right-8 top-1/2 transform -translate-y-1/2 p-1 bg-gray-600 hover:bg-gray-500 rounded-full transition-all"
        >
          Edit
        </button>
      )}
    </div>
  )
}

