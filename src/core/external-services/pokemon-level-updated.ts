export interface IPokemonLevelUpdated {
  publish(id: string, level: number): Promise<void>
}
