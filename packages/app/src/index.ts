import { Provider } from '@kesin11/monorepo-sandbox-provider'
import { Consumer } from '@kesin11/monorepo-sandbox-consumer'

const main = async () => {
  const provider = new Provider()
  const resources = provider.generate()

  const consumer = new Consumer()
  console.log(await consumer.consume(resources))
  console.log(resources)
  console.log(await consumer.consumeAll(resources))
  console.log(resources)
}
main()
