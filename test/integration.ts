import mongoose from 'mongoose'

before(() => {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })

  mongoose.connections.map((c) => {
    c.dropDatabase()
  })
})

after(() => {
  mongoose.disconnect()
})
