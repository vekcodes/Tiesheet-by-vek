import React, { useEffect } from 'react'
import { Controls } from './components/Controls'
import { Bracket } from './components/Bracket'
import { MatchTitle } from './components/MatchTitle'
import { PrintableTiesheet } from './components/PrintableTiesheet'
import { FullscreenTiesheet } from './components/FullscreenTiesheet'
import { useBracketStore } from './store/bracketStore'

/**
 * Main App component for the Tiesheet Maker application.
 * This component serves as the entry point and layout container for the application.
 */
function App() {
  const logo = useBracketStore(state => state.logo)
  const showFullscreen = useBracketStore(state => state.showFullscreen)


  return (
    <>
    <div className="min-h-screen bg-gray-900 text-white print:bg-white print:text-black">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-repeat opacity-10 print:hidden" style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      }} />

      {/* Header with logo */}
      <div className="relative z-10 p-4 flex items-center justify-between border-b border-gray-800 print:hidden">
        {logo ? (
          <img src={logo} alt="Tournament Logo" className="h-12 w-auto" />
        ) : (
          <div className="text-2xl font-bold">Tiesheet Maker</div>
        )}
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto p-4 space-y-8">
        <Controls />
        <div className="print:hidden">
          <MatchTitle />
          <div className="bg-gray-800 rounded-lg overflow-x-auto">
            <Bracket />
          </div>
        </div>
        <PrintableTiesheet />
      </div>

      {showFullscreen && <FullscreenTiesheet />}
    </div></>
  )
}

export default App

