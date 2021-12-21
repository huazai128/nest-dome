export type TMessage = string

export type TExceptionOption = TMessage | {
    message: TMessage
    error?: any
}
export enum EHttpStatus {
    Error = 'error',
    Success = 'success',
}

export interface IHttpResponseBase {
    status: EHttpStatus
    message: TMessage
}

export type THttpErrorResponse = IHttpResponseBase & {
    error: any
    debug?: string
}