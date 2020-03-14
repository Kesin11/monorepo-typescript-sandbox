export interface IProvider {
  generate: () => Resource[];
}
export interface IConsumer {
  consume: (resources: Resource[]) => Resource | undefined;
}
export type Resource = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
