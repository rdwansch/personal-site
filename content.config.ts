import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        title: z.string(),
        date: z.string(),
        description: z.string(),
        tags: z.array(z.string()).optional(),
      }),
    }),
    about: defineCollection({
      type: 'data',
      source: 'about.json',
      schema: z.object({
        bio: z.array(z.string()),
        skills: z.array(z.object({
          category: z.string(),
          items: z.array(z.string()),
        })),
      }),
    }),
    work: defineCollection({
      type: 'data',
      source: 'work.json',
      schema: z.object({
        experience: z.array(z.object({
          company: z.string(),
          location: z.string(),
          role: z.string(),
          period: z.string(),
          highlights: z.array(z.object({
            text: z.string(),
            stack: z.string(),
          })),
        })),
      }),
    }),
    projects: defineCollection({
      type: 'data',
      source: 'projects.json',
      schema: z.object({
        items: z.array(z.object({
          title: z.string(),
          description: z.string(),
          tags: z.array(z.string()),
          accentHex: z.string(),
          link: z.string().nullable(),
        })),
      }),
    }),
    education: defineCollection({
      type: 'data',
      source: 'education.json',
      schema: z.object({
        items: z.array(z.object({
          institution: z.string(),
          location: z.string(),
          degree: z.string(),
          period: z.string(),
        })),
      }),
    }),
  },
})
