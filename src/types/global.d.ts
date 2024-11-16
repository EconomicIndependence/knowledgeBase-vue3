declare module 'vanilla-tilt' {
  interface VanillaTiltOptions {
    max?: number
    speed?: number
    glare?: boolean
    'max-glare'?: number
    [key: string]: any
  }

  interface VanillaTilt {
    init: (elements: HTMLElement | HTMLElement[], options?: VanillaTiltOptions) => void
  }

  const VanillaTilt: VanillaTilt
  export default VanillaTilt
}

declare module 'particles.js' {
  interface ParticlesConfig {
    particles: {
      number?: { value?: number }
      color?: { value?: string }
      shape?: { type?: string }
      opacity?: { value?: number }
      size?: { value?: number }
      move?: {
        enable?: boolean
        speed?: number
        direction?: string
        random?: boolean
        straight?: boolean
        out_mode?: string
        bounce?: boolean
      }
    }
    interactivity?: {
      detect_on?: string
      events?: {
        onhover?: { enable?: boolean; mode?: string }
        onclick?: { enable?: boolean; mode?: string }
        resize?: boolean
      }
    }
  }

  interface ParticlesJS {
    load: (elementId: string, config: ParticlesConfig) => void
  }

  const particlesJS: ParticlesJS
  export default particlesJS
} 