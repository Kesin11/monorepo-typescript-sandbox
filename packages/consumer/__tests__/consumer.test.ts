import { Consumer } from '../src/consumer'
import { Resource } from '@kesin11/lerna-sandbox-types'

describe('Consumer', () => {
  it('consume', () => {
    const consumer = new Consumer()
    const resources = [1, 2] as Resource[]

    expect(consumer.consume(resources)).toEqual(2)
  })
})
