export {}

// Create a type for the roles
export type Roles = 'coordinator' | 'volunteer'

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
    }
  }
}