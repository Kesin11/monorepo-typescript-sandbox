import { Provider } from '@kesin11/monorepo-sandbox-provider'
import { Consumer } from './consumer'

const provider = new Provider()
const resources = provider.generate()

const consumer = new Consumer()
console.log(consumer.consume(resources))
console.log(resources)
console.log(consumer.consumeAll(resources))
console.log(resources)
