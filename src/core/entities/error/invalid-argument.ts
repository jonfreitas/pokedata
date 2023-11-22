/* eslint-disable @typescript-eslint/no-useless-constructor */
export default class InvalidArgument extends Error {
  constructor(message: string) {
    super(message)
  }
}
