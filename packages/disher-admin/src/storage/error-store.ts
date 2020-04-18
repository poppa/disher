import { observable, action, computed } from 'mobx'
import { Maybe } from '../types'
import { DisherError } from '../lib'

class ErrorStore {
  @observable private _errors: DisherError[] = []
  @observable private fatalError?: Maybe<DisherError>

  @computed public get errors(): DisherError[] {
    return this._errors
  }

  @action public push(e: DisherError): DisherError {
    if (DisherError.isFatalError(e)) {
      this.fatalError = e
      return e
    }

    if (this._errors.some((ee) => ee.message === e.message)) {
      return e
    }

    this._errors = [e, ...this._errors]

    return e
  }

  @action public pop(e: DisherError): void {
    const pos = this._errors.findIndex(
      (ee) => ee === e || ee.message === e.message
    )

    if (pos > -1) {
      this._errors.splice(pos, 1)
    }
  }

  @computed public get hasErrors(): boolean {
    return this._errors.length > 0
  }

  @computed public get hasFatal(): boolean {
    return this.fatalError !== undefined
  }

  @action public clearErrors(): void {
    this._errors = []
  }

  @action public clearFatal(): void {
    this.fatalError = undefined
  }

  @action public clearAll(): void {
    this._errors = []
    this.fatalError = undefined
  }
}

export const errorStore = new ErrorStore()
