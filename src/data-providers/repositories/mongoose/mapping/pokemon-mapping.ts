/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
import mongoose, { Model, Schema } from 'mongoose'

mongoose.set('useCreateIndex', true)

export type PokemonMapping = {
  id: string
  name: string
  level: number
  basicForm: string
  ability: string
  abilities: string[]
  middleFormEvolutionLevel: number
  middleForm: string
  finalFormEvolutionLevel: number
  finalForm: string
  hasMoreEvolution: boolean
}

type ConvertedDocument = {
  _id: string
  __v: number
}

const toJsonCleanup = {
  transform: (
    _: Document,
    { _id, __v, ...converted }: Partial<ConvertedDocument>
  ): object => {
    if (_id) return { id: _id.toString(), ...converted }
    return converted
  },
}

const variablesSchema = new Schema<unknown>(
  {},
  { strict: false, _id: false, toObject: toJsonCleanup }
)

const customDataSchema = new Schema<unknown>(
  {},
  { strict: false, _id: false, toObject: toJsonCleanup }
)

const pokemonSchema = new Schema<PokemonMapping>(
  {
    id: { type: String },
    name: { type: String },
    level: { type: Number },
    basicForm: { type: String },
    ability: { type: String },
    abilities: { type: [String] },
    middleFormEvolutionLevel: { type: Number },
    middleForm: { type: String },
    finalFormEvolutionLevel: { type: Number },
    finalForm: { type: String },
    hasMoreEvolution: { type: Boolean },
  },
  { id: true, toObject: toJsonCleanup }
)

const PokemonModel = mongoose.model(
  'pokemon',
  pokemonSchema
) as Model<PokemonMapping>

export { PokemonModel }
