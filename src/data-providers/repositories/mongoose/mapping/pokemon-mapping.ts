/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
import mongoose, { Model, Schema } from 'mongoose'
import { Pokemon } from '@/core/entities/pokemon'

mongoose.set('useCreateIndex', true)

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

const PokemonSchema = new Schema<Pokemon>(
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
  'pokemons',
  PokemonSchema
) as Model<Pokemon>

export { PokemonModel }
