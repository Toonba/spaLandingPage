import { z } from 'zod'

export const animalSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  species: z.enum(['chien', 'chat', 'oiseau', 'autre']),
  breed: z.string().min(1, 'La race est requise'),
  age: z.string().min(1, "L'âge est requis"),
  birthDate: z.string().nullable(),
  gender: z.enum(['male', 'female']),
  description: z.string(),
  compatibility: z.object({
    children: z.boolean(),
    dogs: z.boolean(),
    cats: z.boolean(),
    other_animals: z.boolean(),
  }),
})

export type AnimalFormData = z.infer<typeof animalSchema>
