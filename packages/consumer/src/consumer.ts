import { IConsumer, Resource } from '@kesin11/lerna-sandbox-types'

export class Consumer implements IConsumer {
  consume (resources: Resource[]): Resource | undefined {
    return resources.pop()
  }
}
