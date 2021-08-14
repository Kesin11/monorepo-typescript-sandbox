import { IConsumer, Resource } from '@kesin11/monorepo-sandbox-types'
import { sum } from 'lodash'

export class Consumer implements IConsumer {
  consume (resources: Resource[]): Resource | undefined {
    return resources.pop()
  }

  consumeAll (resources: Resource[]): number | undefined {
    const result = sum(resources)
    resources.splice(0, resources.length)

    return (result > 0) ? result : undefined
  }
}
