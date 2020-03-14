import { IConsumer, Resource } from '@my-lerna-typescript-sandbox/types'

export class Consumer implements IConsumer {
  constructor () {}
  consume (resources: Resource[]) {
    return resources.pop()
  }
}
