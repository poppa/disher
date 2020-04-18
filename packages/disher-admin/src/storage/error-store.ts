import { observable, action } from 'mobx'
import { Maybe } from '../types'
import { DisherError } from '../lib'

class ErrorStore {
  @observable public error?: Maybe<DisherError>

  @action public clear(): void {
    this.error = undefined
  }
}

export const errorStore = new ErrorStore()
