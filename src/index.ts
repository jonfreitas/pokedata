import { EngineMongo } from '@sdk12/mongo-connection'
import { Engine } from '@sdk12/dataserver'
import { Services } from './entry-point/services'
import path from 'path'

const localStart = `${process.env.LOCAL_GRPC}${process.env.PORT}`
const protoPath = path.join('./', 'src/protos')
const engine = new Engine({ protos: { includeDirs: [protoPath] } })
engine.protoOptions.keepCase = false

const dbConnection = process.env.MONGO_URL
EngineMongo.startConnection([dbConnection])

engine.setServices(Services)
engine.start(localStart)
