import { observable, computed, action } from 'mobx'
import { Maybe } from '../types'
import { LoginVariables } from '../lib/gql/types/Login'
import { login, isLoggedIn } from '../lib/gql'

export enum UserState {
  Undetermined,
  LoggedIn,
  NotLoggedIn,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let store: Maybe<UserStore>

export class UserStore {
  public static get(): UserStore {
    return store || (store = new this())
  }

  @observable private _state: UserState = UserState.Undetermined
  // @observable private _name: string

  private constructor() {
    // Hidden constructor
  }

  @computed public get state(): UserState {
    return this._state
  }

  @computed public get isLoggedIn(): boolean {
    return this._state === UserState.LoggedIn
  }

  @action public async checkUserState(): Promise<boolean> {
    console.log(`State1:`, this._state)
    const res = await isLoggedIn()
    console.log(`res:`, res)
    this._state = res ? UserState.LoggedIn : UserState.NotLoggedIn
    console.log(`State2:`, this._state)
    return this._state === UserState.LoggedIn
  }

  public async login(vars: LoginVariables): Promise<void> {
    //
    const res = await login(vars)
    if (res) {
      this._state = UserState.LoggedIn
    } else {
      this._state = UserState.NotLoggedIn
    }
  }
}
