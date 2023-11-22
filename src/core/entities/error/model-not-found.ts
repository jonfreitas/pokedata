/* eslint-disable @typescript-eslint/no-useless-constructor */
export default class ModelNotFound extends Error {
  constructor(message: string) {
    super(message)
  }
}
