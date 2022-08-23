import { z } from 'zod'

export const questionValidator = z.object({
  title: z.string().min(5, "Too short").max(100, "Too long"),
  options: z.array(
    z.object({
      name: z.string().min(1, "Too short").max(50, "Too long")
    }))
    .min(2, "Must have at least 2 options")
    .max(10, "Too many options")
})

export type QuestionInputType = z.infer<typeof questionValidator>