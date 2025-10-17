export type Slide = {
  title?: string
  video?: string
  overlayImage?: string
  customId?: string
}

export type ContainerConfig = {
  bgImage?: string
  bgColor?: string
  slides?: Slide[]
}

export type SubProject = {
  label?: string // optional (like "2nd Project")
  github?: string
  tech?: string[]
}

export type Section = {
  year?: string
  title: string
  description?: string
  descriptionStanzas?: string[]
  takeaways?: string[]
  github?: string
  tech?: string[]
  subProjects?: SubProject[] // new
  containerConfig: ContainerConfig
}


