import { Provider } from '@kesin11/lerna-sandbox-provider'
import { Consumer } from './consumer'

const provider = new Provider()
const resources = provider.generate()

const consumer = new Consumer()
console.log(consumer.consume(resources))
console.log(consumer.consume(resources))
console.log(consumer.consume(resources))
console.log(resources)
