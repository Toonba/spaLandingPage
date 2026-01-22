export interface SpaHours {
  monday: string | null
  tuesday: string | null
  wednesday: string | null
  thursday: string | null
  friday: string | null
  saturday: string | null
  sunday: string | null
}

export interface SpaInfo {
  id: string
  name: string
  address: string
  phone: string
  email: string
  hours: SpaHours
  description: string
  adoptionProcess: string
  helpInfo: string
}

export const DAY_LABELS: Record<keyof SpaHours, string> = {
  monday: 'Lundi',
  tuesday: 'Mardi',
  wednesday: 'Mercredi',
  thursday: 'Jeudi',
  friday: 'Vendredi',
  saturday: 'Samedi',
  sunday: 'Dimanche',
}

export const DAYS_ORDER: (keyof SpaHours)[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]
