import { MAX_OPTIONS, MIN_OPTIONS } from 'utils/constants'
import { z } from 'zod'

export const questionValidator = z.object({
  title: z.string().trim().min(1, "Empty field").max(100, "Too long"),
  options: z.array(
    z.object({
      name: z.string().trim().min(1, "Empty field").max(50, "Too long")
    }))
    .min(MIN_OPTIONS)
    .max(MAX_OPTIONS),
  duration: z.number()
})

export type QuestionInputType = z.infer<typeof questionValidator>