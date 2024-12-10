import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useBracketStore = create(
  persist(
    (set, get) => ({
      teams: [],
      matches: [],
      rounds: 0,
      logo: '',
      matchTitle: 'Tournament Bracket',
      setLogo: (logo) => set({ logo }),
      setTeams: (teams) => {
        const teamsWithEditable = teams.map(team => ({ ...team, editable: true }))
        const rounds = Math.ceil(Math.log2(teamsWithEditable.length))
        const matches = []
        
        // Generate initial round matches
        for (let i = 0; i < teamsWithEditable.length / 2; i++) {
          matches.push({
            id: `match-1-${i}`,
            round: 1,
            position: i,
            team1: teamsWithEditable[i * 2],
            team2: teamsWithEditable[i * 2 + 1],
            score1: '',
            score2: ''
          })
        }

        // Generate subsequent round empty matches
        for (let round = 2; round <= rounds; round++) {
          const matchesInRound = Math.pow(2, rounds - round)
          for (let i = 0; i < matchesInRound; i++) {
            matches.push({
              id: `match-${round}-${i}`,
              round,
              position: i,
              team1: undefined,
              team2: undefined,
              score1: '',
              score2: ''
            })
          }
        }

        set({ teams: teamsWithEditable, matches, rounds })
      },
      updateMatch: (matchId, winner) => {
        const { matches, rounds } = get()
        const updatedMatches = [...matches]
        const currentMatch = updatedMatches.find(m => m.id === matchId)
        
        if (currentMatch) {
          currentMatch.winner = winner
          
          // Update next round match
          if (currentMatch.round < rounds) {
            const nextRoundMatch = updatedMatches.find(
              m => m.round === currentMatch.round + 1 && 
                  Math.floor(currentMatch.position / 2) === m.position
            )
            if (nextRoundMatch) {
              if (currentMatch.position % 2 === 0) {
                nextRoundMatch.team1 = winner
              } else {
                nextRoundMatch.team2 = winner
              }
            }
          }
        }
        
        set({ matches: updatedMatches })
      },
      clearBracket: () => set({ matches: [], teams: [], rounds: 0, matchTitle: 'Tournament Bracket' }),
      shuffleTeams: () => {
        const { teams } = get()
        const shuffled = [...teams].sort(() => Math.random() - 0.5)
        get().setTeams(shuffled)
      },
      updateTeamName: (teamId, newName) => {
        set(state => ({
          teams: state.teams.map(team =>
            team.id === teamId ? { ...team, name: newName } : team
          ),
          matches: state.matches.map(match => ({
            ...match,
            team1: match.team1?.id === teamId ? { ...match.team1, name: newName } : match.team1,
            team2: match.team2?.id === teamId ? { ...match.team2, name: newName } : match.team2,
            winner: match.winner?.id === teamId ? { ...match.winner, name: newName } : match.winner
          }))
        }))
      },
      updateMatchTitle: (newTitle) => set({ matchTitle: newTitle }),
      showFullscreen: false,
      toggleFullscreen: () => set(state => ({ showFullscreen: !state.showFullscreen })),
    }),
    {
      name: 'bracket-storage'
    }
  )
)

