import { Provider } from "../lib/provider";

describe('Provider', () => {
    it('generate', () => {
        const provider = new Provider()
        expect(provider.generate()).toEqual([1,2,3,4,5,6,7,8,9])
        
    })
})
