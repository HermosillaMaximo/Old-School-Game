import type { Metadata } from 'next'
import styles from './page.module.css'
import Game from './Game'
import { GAME_NAME, MODES } from './Puzzle2050'

export const metadata: Metadata = {
  title: `${GAME_NAME} | Old School Game`,
  description:
    'A slow-paced sliding-tile puzzle on a 4x4 grid. Merge equal tiles, plan ahead and reach the goal.',
}

const Page = () => {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>{GAME_NAME}</h1>
      <p className={styles.subtitle}>
        Slide, merge and plan ahead. Reach {MODES.normal.target} (Normal) or{' '}
        {MODES.pro.target} (Pro).
      </p>

      <Game />

      <div className={styles.docs}>
        <section aria-labelledby="how-to-play">
          <h2 id="how-to-play">How to Play</h2>
          <ol>
            <li>
              Move all tiles with the <strong>arrow keys</strong> (or{' '}
              <strong>swipe</strong> on the board on mobile). Every tile slides as far as it
              can in that direction.
            </li>
            <li>
              When two tiles with the <strong>same number</strong> collide, they merge into
              one tile with the double value (5 + 5 → 10, 10 + 10 → 20…).
            </li>
            <li>
              Each valid move adds a new tile (5 or 10) to an empty cell. Moves that change
              nothing do not add a tile.
            </li>
            <li>
              <strong>Normal:</strong> merge two <strong>1280</strong> tiles to form{' '}
              <strong>2560</strong> and win.
            </li>
            <li>
              <strong>Pro:</strong> merge two <strong>5120</strong> tiles to form{' '}
              <strong>10240</strong> and win.
            </li>
            <li>You lose when the board is full and no neighbouring tiles can merge.</li>
          </ol>
          <p className={styles.chain}>
            5 → 10 → 20 → 40 → 80 → 160 → 320 → 640 → 1280 → 2560 → 5120 → 10240
          </p>
          <p>
            The final tile is never placed on the board: the game ends the moment the two
            last tiles merge. Tip: keep your biggest tile in a corner and think a few
            moves ahead. There is no timer, so take your time.
          </p>
        </section>

        <section aria-labelledby="how-built">
          <h2 id="how-built">How it was built</h2>
          <ul>
            <li>
              <strong>Exponent representation:</strong> each tile stores an exponent{' '}
              <code>k</code> and is displayed as <code>5 × 2^k</code>. Merging is simply
              “same <code>k</code> → <code>k + 1</code>”, so the rules do not depend on the
              base number.
            </li>
            <li>
              <strong>One slide routine for all directions:</strong> a single function
              slides a line of four cells towards its start: it compacts the tiles, merges
              equal neighbours once per move and pads with empty cells. The four directions
              reuse it by reading each row or column in the right order and writing the
              result back.
            </li>
            <li>
              <strong>Single merge per move:</strong> a tile created by a merge cannot merge
              again in the same move.
            </li>
            <li>
              <strong>Spawn only after a real move:</strong> comparing tile ids before and
              after the move tells if something changed, so useless moves never add tiles.
            </li>
            <li>
              <strong>Stable tile ids:</strong> tiles keep their id while sliding, so React
              can animate them with CSS <code>transform</code>. Animations are disabled for
              users who prefer reduced motion.
            </li>
            <li>
              <strong>Pure logic, separate UI:</strong> the game rules live in a plain
              TypeScript module with immutable functions and an injectable random generator,
              so they are easy to test.
            </li>
            <li>
              <strong>Safe by design:</strong> no external dependencies, no raw HTML
              injection, and the stored best score is validated before use.
            </li>
          </ul>
        </section>

        <section aria-labelledby="benefits">
          <h2 id="benefits">Cognitive Benefits</h2>
          <ul>
            <li>
              <strong>Planning and strategy (prefrontal cortex):</strong> you must think
              several moves ahead and avoid blocking the board.
            </li>
            <li>
              <strong>Working memory:</strong> you keep in mind where the tiles are and
              which merges are possible after each move.
            </li>
            <li>
              <strong>Cognitive flexibility:</strong> you adapt your plan every time a new
              tile appears in an unexpected cell.
            </li>
            <li>
              <strong>Attention and pattern recognition:</strong> you spot equal neighbours
              and chains of merges.
            </li>
          </ul>
        </section>

        <section aria-labelledby="science">
          <h2 id="science">Scientific Backing</h2>
          <p>
            Puzzle-type activities are not a “quick fix”, but research links this kind of
            effort with the brain functions above:
          </p>
          <ul>
            <li>
              The prefrontal cortex supports goal-directed planning and cognitive control:{' '}
              <a
                href="https://doi.org/10.1146/annurev.neuro.24.1.167"
                target="_blank"
                rel="noopener noreferrer"
              >
                Miller &amp; Cohen (2001), An Integrative Theory of Prefrontal Cortex Function
              </a>
              .
            </li>
            <li>
              Executive functions such as working memory and flexible thinking are central to
              reasoning and problem solving:{' '}
              <a
                href="https://doi.org/10.1146/annurev-psych-113011-143750"
                target="_blank"
                rel="noopener noreferrer"
              >
                Diamond (2013), Executive Functions
              </a>
              .
            </li>
            <li>
              Puzzle solving engages several cognitive abilities (including working memory,
              flexibility and reasoning), and long-term puzzling may be a protective factor
              for cognitive aging. Short-term effects were not shown, so this game is
              presented as mental exercise, not as a treatment:{' '}
              <a
                href="https://doi.org/10.3389/fnagi.2018.00299"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fissler et al. (2018), Jigsaw Puzzling Taps Multiple Cognitive Abilities and
                Is a Potential Protective Factor for Cognitive Aging
              </a>
              .
            </li>
          </ul>
        </section>
      </div>
    </main>
  )
}

export default Page
