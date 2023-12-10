import { Consumer } from "../src/consumer"
import { Resource } from "@kesin11/monorepo-sandbox-types"
import { Provider } from "@kesin11/monorepo-sandbox-provider"

describe("Consumer", () => {
  it("consume", async () => {
    const consumer = new Consumer()
    const resources = [1, 2] as Resource[]

    expect(await consumer.consume(resources)).toEqual(2)
  })

  it("consumeAll", async () => {
    const provider = new Provider()
    const resources = provider.generate()
    const consumer = new Consumer()

    expect(await consumer.consumeAll(resources)).toEqual(45)
  })
})
