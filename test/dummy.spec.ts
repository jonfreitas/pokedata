import assert from 'assert'
import chai from 'chai'
import chaiHttp from 'chai-http'
import chaiThings from 'chai-things'

describe('/Dummy', () => {
  it('Initial dummy test', done => {
    const ok = 'ok'
    assert.equal(ok, 'ok')
    done()
  })
})