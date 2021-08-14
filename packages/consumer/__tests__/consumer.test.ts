import { Consumer } from '../src/consumer'
import { Resource } from '@kesin11/monorepo-sandbox-types'
import { Provider } from '@kesin11/monorepo-sandbox-provider'

describe('Consumer', () => {
  it('consume', () => {
    const consumer = new Consumer()
    const resources = [1, 2] as Resource[]

    expect(consumer.consume(resources)).toEqual(2)
  })

  it('consumeAll', () => {
    const provider = new Provider()
    const resources = provider.generate()
    const consumer = new Consumer()

    expect(consumer.consumeAll(resources)).toEqual(45)
  })
})
