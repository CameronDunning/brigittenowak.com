export const NOTIFICATION_DURATION = 5000

export const OILS = 'oils'
export const EGG_TEMPERA = 'eggTempera'
export const SERIGRAPHS = 'serigraphs'
export const TYPES = [OILS, EGG_TEMPERA, SERIGRAPHS] as const
export const DISPLAY_TYPES_MAP: { [key: string]: string } = {
    [OILS]: 'Oils',
    [EGG_TEMPERA]: 'Egg Tempera',
    [SERIGRAPHS]: 'Serigraphs',
} as const

export const CATEGORIZED_IMAGES = Object.fromEntries(TYPES.map(type => [type, {}]))
