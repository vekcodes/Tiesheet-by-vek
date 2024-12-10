import React, { useState, useEffect, useRef } from 'react'
import { useBracketStore } from '../store/bracketStore'

const MatchNode = ({ match, x, y, width, height, isWinner }) => (
  <div
    className={`absolute border rounded-md p-2 text-sm transition-colors ${
      isWinner ? 'bg-blue-100 border-blue-300' : 'bg-white border-gray-300'
    }`}
    style={{
      left: `${x}px`,
      top: `${y}px`,
      width: `${width}px`,
      height: `${height}px`,
    }}
  >
    <div className="flex flex-col justify-between h-full">
      <div className="flex items-center justify-between">
        <span className="font-medium text-red-500">{match.team1?.name}</span>
        <span className="text-xs text-gray-500">{match.team1?.seed || '-'}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-medium text-red-500">{match.team2?.name}</span>
        <span className="text-xs text-gray-500">{match.team2?.seed || '-'}</span>
      </div>
    </div>
  </div>
)

const RoundLabel = ({ label, x, y }) => (
  <div
    className="absolute text-gray-600 font-medium text-sm"
    style={{
      left: `${x}px`,
      top: `${y}px`,
    }}
  >
    {label}
  </div>
)

export function FullscreenTiesheet() {
  const { matches, matchTitle, logo } = useBracketStore()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const containerRef = useRef(null)

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
      })
    }
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  const renderBracket = () => {
    const rounds = Math.max(...matches.map(m => m.round))
    const roundWidth = 240
    const matchHeight = 60
    const matchWidth = 200
    const verticalGap = 20
    const horizontalGap = 40
    const padding = 40

    // Calculate total height
    const maxMatchesInRound = Math.max(...Array.from({ length: rounds }, (_, i) => 
      matches.filter(m => m.round === i + 1).length
    ))
    const totalHeight = (maxMatchesInRound * matchHeight) + ((maxMatchesInRound - 1) * verticalGap) + padding * 2

    const getRoundLabel = (round) => {
      if (round === rounds) return 'Winner'
      if (round === rounds - 1) return 'Final'
      if (round === rounds - 2) return 'Semifinals'
      if (round === rounds - 3) return 'Quarterfinals'
      return `Round ${round}`
    }

    return (
      <div className="relative" style={{ width: rounds * roundWidth + padding * 2, height: totalHeight }}>
        {/* Round labels */}
        {Array.from({ length: rounds }, (_, i) => i + 1).map(round => (
          <RoundLabel
            key={`label-${round}`}
            label={getRoundLabel(round)}
            x={padding + (round - 1) * roundWidth + matchWidth / 2}
            y={20}
          />
        ))}

        {/* SVG for connection lines */}
        <svg 
          width={rounds * roundWidth + padding * 2} 
          height={totalHeight}
          className="absolute top-0 left-0"
          style={{ pointerEvents: 'none' }}
        >
          {matches.map((match, index) => {
            if (match.round < rounds) {
              const matchesInCurrentRound = matches.filter(m => m.round === match.round).length
              const matchesInNextRound = matches.filter(m => m.round === match.round + 1).length
              const currentY = padding + (index % matchesInCurrentRound) * (matchHeight + verticalGap) + matchHeight / 2
              const nextMatchIndex = Math.floor(index / 2)
              const nextY = padding + (nextMatchIndex % matchesInNextRound) * (matchHeight + verticalGap) + matchHeight / 2

              const startX = padding + (match.round - 1) * roundWidth + matchWidth
              const endX = padding + match.round * roundWidth
              const midX = startX + horizontalGap

              return (
                <g key={`connection-${match.id}`}>
                  <path
                    d={`
                      M ${startX} ${currentY}
                      H ${midX}
                      V ${nextY}
                      H ${endX}
                    `}
                    stroke="#888"
                    strokeWidth="2"
                    fill="none"
                  />
                </g>
              )
            }
            return null
          })}
        </svg>

        {/* Match nodes */}
        {matches.map((match, index) => {
          const matchesInRound = matches.filter(m => m.round === match.round).length
          const x = padding + (match.round - 1) * roundWidth
          const y = padding + (index % matchesInRound) * (matchHeight + verticalGap)

          return (
            <MatchNode
              key={match.id}
              match={match}
              x={x}
              y={y}
              width={matchWidth}
              height={matchHeight}
              isWinner={match.round === rounds}
            />
          )
        })}
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      <div className="p-4 flex justify-between items-center border-b border-gray-200 bg-white sticky top-0 z-10">
        <img src={logo} alt="Tournament Logo" className="h-12 w-auto" />
        <h1 className="text-2xl font-bold text-center flex-grow text-gray-700">{matchTitle}</h1>
        <button
          onClick={() => useBracketStore.getState().toggleFullscreen()}
          className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
        >
          Close
        </button>
      </div>
      <div className="flex-grow overflow-auto" ref={containerRef}>
        {renderBracket()}
      </div>
    </div>
  )
}

