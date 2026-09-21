import type { Collections } from '@nuxt/content'

export type StoryContent = Pick<Collections['home'],
  'hero' | 'ai' | 'work' | 'experience' | 'writing' | 'contact'>
export type FeaturedWork = Collections['work']['featured'][number]
export type Experience = Collections['work']['experience'][number]
export type StoryPost = Pick<Collections['blog'], 'path' | 'title' | 'date' | 'description'>
export type ContactLinks = { email?: string; github?: string; linkedin?: string }
