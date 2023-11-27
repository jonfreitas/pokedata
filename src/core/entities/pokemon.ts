import { Base } from './base'

export class Pokemon extends Base {
    public id: string
    public name: string
    public level: number
    public basicForm: string
    public ability: string
    public abilities: string[]
    public middleFormEvolutionLevel: number
    public middleForm: string
    public finalFormEvolutionLevel: number
    public finalForm: string
    public hasMoreEvolution: boolean
    public sentMessage: boolean
    public origin: string
    public updated: boolean
    public responseMessage: string
}
