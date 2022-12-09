import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { describe, test, expect } from 'vitest'
import postcss from 'postcss'
import tailwindcss from 'tailwindcss'
import { outdent } from 'outdent'
import type { Config } from 'tailwindcss/types'
import { plugin } from '../src/plugin'

const run = (html = '', config: Omit<Config, 'content'> = {}) => {
  const { currentTestName } = expect.getState()

  return postcss(
    tailwindcss({
      ...config,
      content: [{ raw: html, extension: 'html' }],
      plugins: [plugin],
      corePlugins: { preflight: false },
      experimental: {
        // clears away all other base styles
        optimizeUniversalDefaults: true,
      },
    })
  ).process(['@tailwind base;', '@tailwind components;', '@tailwind utilities'].join('\n'), {
    from: `${resolve(fileURLToPath(import.meta.url))}?test=${currentTestName}`,
  })
}

describe('tailwind-plugin-grids', () => {
  test('it writes grids', ({ expect }) => {
    expect(
      run('<div class="grid-test"></div>', {
        theme: {
          grids: {
            test: '1fr main / 1fr',
          },
        },
      }).css
    ).toBe(outdent`
      .grid-test {
          grid: 1fr main / 1fr
      }
    `)
  })
  test('it writes arbitrary grids', ({ expect }) => {
    expect(
      run(`<div class="grid-[main_1fr_/_1fr]"></div>`).css
    ).toBe(outdent`
      .grid-\\[main_1fr_\\/_1fr\\] {
          grid: main 1fr / 1fr
      }
    `)
  })
  test('it writes arbitrary grids with quotes', ({ expect }) => {
    expect(
      run(`<div class="grid-['first_second'_1fr_/_1fr_1fr]"></div>`).css
    ).toBe(outdent`
      .grid-\\[\\'first_second\\'_1fr_\\/_1fr_1fr\\] {
          grid: 'first second' 1fr / 1fr 1fr
      }
    `)
  })

  test('it writes grid areas', ({ expect }) => {
    expect(
      run('<div class="grid-area-test"></div>', {
        theme: {
          gridArea: {
            test: 'test',
          }
        }
      }).css
    ).toBe(outdent`
      .grid-area-test {
          grid-area: test
      }
    `)
  })
  test('it writes arbitrary grid areas', ({ expect }) => {
    expect(
      run(`<div class="grid-area-[test]"></div>`).css
    ).toBe(outdent`
      .grid-area-\\[test\\] {
          grid-area: test
      }
    `)
  })
})
