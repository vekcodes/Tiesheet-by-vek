import React from 'react'
import { useBracketStore } from '../store/bracketStore'
import { TeamBlock } from './TeamBlock'

/**
 * Bracket component for displaying the tournament bracket.
 * This component renders the entire bracket structure with all rounds and matches.
 */
export function Bracket() {
  const { matches, rounds, updateMatch, toggleFullscreen } = useBracketStore()

  /**
   * Filters matches for a specific round.
   * @param {number} round - The round number to filter matches for.
   * @returns {Array} An array of matches for the specified round.
   */
  const getRoundMatches = (round) => {
    return matches.filter(match => match.round === round)
  }

  return (
    <div className="relative">
      <button
        onClick={toggleFullscreen}
        className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full transition-colors"
      >
        Fullscreen
      </button>
      <div className="flex gap-16 p-8 overflow-x-auto">
        {Array.from({ length: rounds }, (_, i) => i + 1).map(round => (
          <div
            key={round}
            className="flex flex-col gap-8"
            style={{
              marginTop: `${Math.pow(2, round - 1) * 2}rem`
            }}
          >
            <h3 className="text-white font-medium">
              {round === rounds ? 'Winner' : round === rounds - 1 ? 'Final' : round === rounds - 2 ? 'Semifinals' : `Round ${round}`}
            </h3>
            
            {getRoundMatches(round).map((match) => (
              <div key={match.id} className="flex flex-col gap-4">
                <TeamBlock
                  team={match.team1}
                  onAdvance={match.team1 ? (team) => updateMatch(match.id, team) : undefined}
                  isWinner={match.winner?.id === match.team1?.id}
                />
                <TeamBlock
                  team={match.team2}
                  onAdvance={match.team2 ? (team) => updateMatch(match.id, team) : undefined}
                  isWinner={match.winner?.id === match.team2?.id}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

