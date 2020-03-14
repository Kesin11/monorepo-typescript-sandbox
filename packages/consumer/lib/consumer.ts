import { provider } from '@my-lerna-typescript-sandbox/provider'

export function consumer() {
    const arr = provider()
    arr.forEach((val: number) => console.log(val))
}
