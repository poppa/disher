/* eslint-disable @typescript-eslint/camelcase */
import { observable, computed, action } from 'mobx'
import { Maybe } from '../types'
import { LoginVariables, Login_login } from '../lib/gql/types/Login'
import { login, isLoggedIn } from '../lib/gql'

export type User = Login_login

export enum UserState {
  Undetermined,
  LoggedIn,
  NotLoggedIn,
}

let store: Maybe<UserStore>

export class UserStore {
  public static get(): UserStore {
    return store || (store = new this())
  }

  @observable private _state: UserState = UserState.Undetermined
  @observable private _user: Maybe<User>

  private constructor() {
    // Hidden constructor
  }

  @computed public get state(): UserState {
    return this._state
  }

  @computed public get isLoggedIn(): boolean {
    return this._state === UserState.LoggedIn
  }

  @computed public get user(): Maybe<User> {
    return this._user
  }

  @action public async checkUserState(): Promise<boolean> {
    const res = await isLoggedIn()
    this._state = res ? UserState.LoggedIn : UserState.NotLoggedIn
    return this._state === UserState.LoggedIn
  }

  public async login(vars: LoginVariables): Promise<void> {
    const res = await login(vars)

    if (res) {
      this._user
      this._state = UserState.LoggedIn
    } else {
      this._state = UserState.NotLoggedIn
    }
  }
}
