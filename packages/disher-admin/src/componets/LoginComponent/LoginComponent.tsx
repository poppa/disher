import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField/TextField'
import Button from '@material-ui/core/Button/Button'

interface LoginState {
  username?: string
  password?: string
  submitEnabled: boolean
}

export default class LoginComponent extends Component<{}, LoginState> {
  constructor(props: object) {
    super(props)

    this.state = {
      password: undefined,
      username: undefined,
      submitEnabled: false,
    }
  }

  public render(): JSX.Element {
    return (
      <div
        className="
          w-full
          h-full
          flex
          justify-center
        "
      >
        <div
          className="
            p-8
            bg-gray-300
            my-5
            w-2/5
            max
          "
        >
          <h2 className="font-bold mb-2">Disher Admin Login</h2>
          <form onSubmit={this.onSubmit.bind(this)}>
            <div className="mb-2">
              <TextField
                label="Username"
                name="username"
                fullWidth
                onInput={(e): void =>
                  this.onInput(e as React.ChangeEvent<HTMLInputElement>)
                }
                autoFocus
                required={true}
                disabled={false}
              />
            </div>
            <div className="mb-2">
              <TextField
                label="Password"
                name="password"
                type="password"
                required={true}
                onInput={(e): void =>
                  this.onInput(e as React.ChangeEvent<HTMLInputElement>)
                }
                fullWidth
                disabled={false}
              />
            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                disabled={!this.state.submitEnabled}
                type="submit"
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  private onSubmit(e: React.FormEvent<HTMLFormElement>): boolean {
    e.stopPropagation()
    e.preventDefault()

    const { username, password } = this.state

    if (username && password) {
      console.log(`Do login:`, username, password)
    }

    return false
  }

  private onInput(e: React.ChangeEvent<HTMLInputElement>): void {
    if (e.target.name in this.state) {
      const tval = e.target.value

      switch (e.target.name) {
        case 'username':
          this.setState(() => ({ username: tval }))
          break

        case 'password':
          this.setState(() => ({ password: tval }))
          break

        default:
          // Do nothing
          break
      }

      requestAnimationFrame(() => this.isValid())
    }
  }

  private isValid(): void {
    const { username, password } = this.state

    if (username && this.isValidPassword(password)) {
      this.setState({ submitEnabled: true })
    }
  }

  private isValidPassword(pwd: string | undefined): boolean {
    return typeof pwd === 'string' && pwd.length >= 8
  }
}
