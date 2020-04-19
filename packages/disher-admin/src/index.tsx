import React from 'react'
import ReactDOM from 'react-dom'
// See https://github.com/mobxjs/mobx-react-lite/#observer-batching
import 'mobx-react/batchingForReactDom'
import ThemeProvider from '@material-ui/styles/ThemeProvider/ThemeProvider'
import { theme } from './theme'
import Login from './componets/Login/Login'
import ErrorHandler from './componets/ErrorHandler/ErrorHandler'
import App from './componets/App/App'
import { userStore } from './storage'
import { observer } from 'mobx-react'

userStore
  .checkUserState()
  .catch((e) => console.error(`Check of user state failed:`, e))

const Main = observer(
  (): JSX.Element => {
    return (
      <ThemeProvider theme={theme}>
        <ErrorHandler>
          {userStore.isLoggedIn ? <App /> : <Login />}
        </ErrorHandler>
        <footer>
          Disher Admin UI {process.env.npm_package_version ?? '0.0.0'}
        </footer>
      </ThemeProvider>
    )
  }
)

ReactDOM.render(<Main />, document.getElementById('app'))
