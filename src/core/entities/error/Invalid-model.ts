/* eslint-disable @typescript-eslint/no-useless-constructor */
export default class InvalidModel extends Error {
  constructor(message: string) {
    super(message)
  }
}
