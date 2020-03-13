import { provider } from 'provider'

export function consumer() {
    const arr = provider()
    arr.forEach((val: number) => console.log(val))
}
