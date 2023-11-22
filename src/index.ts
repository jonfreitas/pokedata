import { EngineMongo } from '@sdk12/mongo-connection'
import { Engine } from '@sdk12/dataserver'
import { Services } from './entry-point/services'
import path from 'path'

// const localStart = `${process.env.LOCAL_GRPC}${process.env.PORT}`
const localStart = `0.0.0.0:50051`
const nodeModules = path.join('./', 'node_modules')
const protoPath = path.join(nodeModules, '@sdk12', 'protos')
const engine = new Engine({ protos: { includeDirs: [protoPath] } })
engine.protoOptions.keepCase = false

// const dbConnection = process.env.MONGO_URL
const dbConnection = `mongodb://root:root@localhost:27017/admin`
EngineMongo.startConnection([dbConnection])

engine.setServices(Services)
engine.start(localStart)
