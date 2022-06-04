import { IConsumer, Resource } from '@kesin11/monorepo-sandbox-types'
import { sum } from 'lodash'

export class Consumer implements IConsumer {
  async consume (resources: Resource[]): Promise<Resource | undefined> {
    return resources.pop()
  }

  async consumeAll (resources: Resource[]): Promise<number | undefined> {
    const result = sum(resources)
    resources.splice(0, resources.length)

    return (result > 0) ? result : undefined
  }
}
