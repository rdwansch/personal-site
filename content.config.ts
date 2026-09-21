import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    home: defineCollection({
      type: 'data',
      source: 'home.json',
      schema: z.object({
        hero: z.object({
          greeting: z.string(),
          headline: z.tuple([z.string(), z.string()]),
          tabs: z.tuple([z.string(), z.string()]),
          tools: z.tuple([z.string(), z.string()]),
          approach: z.tuple([z.string(), z.string()]),
          tabLabels: z.tuple([z.string(), z.string(), z.string()]),
        }).strict(),
        ai: z.object({
          intro: z.tuple([z.string(), z.string()]),
          speed: z.tuple([z.string(), z.string()]),
          review: z.tuple([z.string(), z.string()]),
          principle: z.tuple([z.string(), z.string()]),
          suggestions: z.tuple([z.string(), z.string(), z.string()]),
        }).strict(),
        work: z.object({
          intro: z.tuple([z.string(), z.string(), z.string()]),
          chapters: z.array(z.object({
            id: z.enum(['erp', 'global', 'booking']),
            title: z.string(),
            description: z.string(),
            metricBefore: z.string(),
            metricAfter: z.string(),
          }).strict()).length(3),
        }).strict(),
        experience: z.object({ title: z.string(), link: z.string() }).strict(),
        writing: z.object({ title: z.string(), link: z.string() }).strict(),
        contact: z.object({ title: z.tuple([z.string(), z.string()]) }).strict(),
      }).strict(),
    }),
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
        featured: z.array(z.object({
          id: z.enum(['erp', 'global', 'booking']),
          selector: z.string(),
          title: z.string(),
          metric: z.string(),
          metricLabel: z.string(),
          summary: z.string(),
          details: z.array(z.string()),
          stack: z.array(z.string()),
        })),
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
