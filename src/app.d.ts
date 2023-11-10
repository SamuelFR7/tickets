/// <reference types="lucia" />
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      auth: import('lucia').AuthRequest
    }
    // interface PageData {}
    // interface Platform {}
  }
  namespace Lucia {
    type Auth = import('$lib/server/lucia').Auth
    type DatabaseUserAttributes = {
      username: string
      role: 'user' | 'admin'
    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    type DatabaseSessionAttributes = {}
  }
}

export {}
