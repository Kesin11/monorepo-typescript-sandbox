import { IProvider, Resource } from '@my-lerna-typescript-sandbox/types'

export class Provider implements IProvider {
  generate (): Resource[] {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9] as Resource[]
  }
}
