export interface Contact {
  email: string
  github: string
  linkedin: string
}

export interface Skill {
  name: string
  icon: string | null
}

export interface Project {
  name: string
  description: string
  url: string | null
}

export interface Employment {
  company: string
  role: string
  period: string
  location: string
  url: string | null
  projects: Project[]
}

export interface Education {
  institution: string
  degree: string
  period: string
  location: string
  honor: string | null
}

export interface Award {
  title: string
  institution: string
  period: string
  location: string
}

export interface CvData {
  name: string
  title: string
  location: string
  contact: Contact
  summary: string[]
  skills: Skill[]
  employment: Employment[]
  education: Education[]
  awards: Award[]
}
