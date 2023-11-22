import { sendUnaryData, status } from '@grpc/grpc-js'
import { logger } from '@sdk12/dataserver'
import ModelNotFound from '../../core/entities/error/model-not-found'
import InvalidModel from '../../core/entities/error/Invalid-model'
import InvalidArgument from '../../core/entities/error/invalid-argument'

export default abstract class BaseService {
  protected handlerError = (
    callback: sendUnaryData<unknown>,
    error: Error,
    errorKey: string
  ): void => {
    let code: number
    switch (error.constructor) {
      case InvalidModel:
        code = status.INVALID_ARGUMENT
        break

      case ModelNotFound:
        code = status.NOT_FOUND
        break

      case InvalidArgument:
        code = status.INVALID_ARGUMENT
        break

      default:
        logger.error(errorKey, error)
        code = status.INTERNAL
        break
    }
    return callback({
      code,
      message: error.message,
    })
  }
}
