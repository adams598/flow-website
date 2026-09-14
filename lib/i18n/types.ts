import type { fr } from './fr'

type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly Widen<U>[]
    : T extends object
      ? { [K in keyof T]: Widen<T[K]> }
      : T

export type Dictionary = Widen<typeof fr>

export type Service = Dictionary['services']['items'][number]
export type Realisation = Dictionary['realisations']['items'][number]
