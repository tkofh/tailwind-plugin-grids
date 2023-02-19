/* eslint-disable @typescript-eslint/no-explicit-any */
type ValueType =
  | 'any'
  | 'color'
  | 'url'
  | 'image'
  | 'length'
  | 'percentage'
  | 'position'
  | 'lookup'
  | 'generic-name'
  | 'family-name'
  | 'number'
  | 'line-width'
  | 'absolute-size'
  | 'relative-size'
  | 'shadow'

type KeyValuePair<K extends keyof any = string, V = string> = Record<K, V>

interface RecursiveKeyValuePair<K extends keyof any = string, V = string> {
  [key: string]: V | RecursiveKeyValuePair<K, V>
}

type CSSRuleObject = RecursiveKeyValuePair<string, null | string | string[]>

export interface PluginAPI {
  // for registering new static utility styles
  addUtilities(
    utilities: CSSRuleObject | CSSRuleObject[],
    options?: Partial<{
      respectPrefix: boolean
      respectImportant: boolean
    }>
  ): void

  // for registering new dynamic utility styles
  matchUtilities<T = string, U = string>(
    utilities: KeyValuePair<
      string,
      (value: T | string, extra: { modifier: U | string | null }) => CSSRuleObject | null
    >,
    options?: Partial<{
      respectPrefix: boolean
      respectImportant: boolean
      type: ValueType | ValueType[]
      values: KeyValuePair<string, T>
      modifiers: 'any' | KeyValuePair<string, U>
      supportsNegativeValues: boolean
    }>
  ): void

  // for registering new static component styles
  addComponents(
    components: CSSRuleObject | CSSRuleObject[],
    options?: Partial<{
      respectPrefix: boolean
      respectImportant: boolean
    }>
  ): void

  // for registering new dynamic component styles
  matchComponents<T = string, U = string>(
    components: KeyValuePair<
      string,
      (value: T | string, extra: { modifier: U | string | null }) => CSSRuleObject | null
    >,
    options?: Partial<{
      respectPrefix: boolean
      respectImportant: boolean
      type: ValueType | ValueType[]
      values: KeyValuePair<string, T>
      modifiers: 'any' | KeyValuePair<string, U>
      supportsNegativeValues: boolean
    }>
  ): void

  // for registering new base styles
  addBase(base: CSSRuleObject | CSSRuleObject[]): void

  // for registering custom variants
  addVariant(name: string, definition: string | string[] | (() => string) | (() => string)[]): void

  matchVariant<T = string>(
    name: string,
    cb: (value: T | string, extra: { modifier: string | null }) => string | string[],
    options?: {
      values?: KeyValuePair<string, T>
      sort?(
        a: { value: T | string; modifier: string | null },
        b: { value: T | string; modifier: string | null }
      ): number
    }
  ): void

  // for looking up values in the user’s theme configuration
  theme: <TDefaultValue = Record<string, any>>(
    path?: string,
    defaultValue?: TDefaultValue
  ) => TDefaultValue
  // for looking up values in the user’s Tailwind configuration
  config: <TDefaultValue = Record<string, any>>(path?: string, defaultValue?: TDefaultValue) => TDefaultValue

  // for checking if a core plugin is enabled
  corePlugins(path: string): boolean

  // for manually escaping strings meant to be used in class names
  e: (className: string) => string
}

export type PluginCreator = (api: PluginAPI) => void
