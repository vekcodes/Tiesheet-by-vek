import React from 'react'
import { useBracketStore } from '../store/bracketStore'

/**
 * PrintableTiesheet component for rendering a printable version of the tournament bracket.
 */
export function PrintableTiesheet() {
  const { matches, matchTitle } = useBracketStore()

  /**
   * Renders an individual match for printing.
   * @param {Object} match - The match object to render.
   * @returns {JSX.Element} A JSX element representing the match.
   */
  const renderMatch = (match) => (
    <div className="flex justify-between border-b border-gray-300 py-2">
      <div className="w-1/2 pr-2">
        <div>{match.team1?.name || 'TBD'}</div>
        <div>{match.team2?.name || 'TBD'}</div>
      </div>
      <div className="w-1/2 pl-2 flex flex-col items-end">
        <div>{match.team1?.seed || '-'}</div>
        <div>{match.team2?.seed || '-'}</div>
      </div>
    </div>
  )

  // Group matches into chunks of 5 for better page breaks
  const chunkedMatches = matches.reduce((acc, match, index) => {
    const chunkIndex = Math.floor(index / 5)
    if (!acc[chunkIndex]) {
      acc[chunkIndex] = []
    }
    acc[chunkIndex].push(match)
    return acc
  }, [])

  return (
    <div className="print:block hidden">
      {chunkedMatches.map((chunk, pageIndex) => (
        <div key={pageIndex} className="page-break">
          {pageIndex === 0 && (
            <>
              <h1 className="text-2xl font-bold mb-4 text-center">{matchTitle}</h1>
              <p className="text-center mb-4">Developed by Bivek Raj Shakya</p>
            </>
          )}
          {chunk.map((match) => (
            <div key={match.id} className="mb-4">
              <h2 className="text-lg font-semibold mb-2">
                {match.round === matches.length ? 'Final' : 
                 match.round === matches.length - 1 ? 'Semifinal' : 
                 `Round ${match.round}`}
              </h2>
              {renderMatch(match)}
            </div>
          ))}
          {pageIndex === chunkedMatches.length - 1 && (
            <p className="text-center mt-8">Developed by Bivek Raj Shakya</p>
          )}
        </div>
      ))}
    </div>
  )
}

