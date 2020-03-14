import { IConsumer, Resource } from '@my-lerna-typescript-sandbox/types'

export class Consumer implements IConsumer {
  consume (resources: Resource[]): Resource | undefined {
    return resources.pop()
  }
}
