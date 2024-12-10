import React from 'react'



const Button = () => {
  return (
    <>
      <style>
        {`
        /* Define custom properties with @property */
        @property --r2 {
          syntax: "<angle>";
          inherits: false;
          initial-value: 0deg;
        }

        @property --x {
          syntax: "<length>";
          inherits: false;
          initial-value: 20px;
        }

        /* Animated button styles */

        .rotation-animation {
          animation: rotationKeyFrames -.64s linear 3s infinite, translationKeyFrames -.64s linear 3s infinite;
        }

        /* Keyframes for rotation */
        @keyframes rotationKeyFrames {
          0% {
            --r2: 0deg;
          }
          32.8228% {
            --r2: 0deg;
          }
          50% {
            --r2: 180deg;
          }
          82.8228% {
            --r2: 180deg;
          }
          100% {
            --r2: 360deg;
          }
        }

        /* Keyframes for x movement */
        @keyframes translationKeyFrames {
          0% {
            --x: 20px;
          }
          32.8228% {
            --x: 180px;
          }
          50% {
            --x: 180px;
          }
          82.8228% {
            --x: 20px;
          }
          100% {
            --x: 20px;
          }
        }
      `}
      </style>
      <button
        className="rotation-animation conic-gradient transform-gpu cursor-pointer rounded-md p-px shadow-[0_0_20px_0_rgba(245,48,107,0.1)] hue-rotate-[190deg] invert transition-all hover:bg-[#DC2626] hover:shadow-[0_0_20px_3px_rgba(245,49,108,.2)] dark:hue-rotate-0 dark:invert-0 h-14"
        style={{
          width: "auto", // Adjusts to fit content while maintaining the effect
          background:
            "conic-gradient(from calc(var(--r2) - 80deg) at var(--x) 15px, transparent 0, #eca5a7 20%, transparent 25%), #452324",
        }}
        type="button"
      >
        <span className="pointer-events-none flex h-full items-center gap-2 rounded-md bg-[#DC2626] px-5 py-3 font-medium text-[#eca5a7] text-xl tracking-tighter">
          <span>Make Tiesheet</span>
        </span>
      </button>
    </>
  );
}

export default Button