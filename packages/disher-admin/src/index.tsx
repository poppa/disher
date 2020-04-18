import React from 'react'
import ReactDOM from 'react-dom'
// See https://github.com/mobxjs/mobx-react-lite/#observer-batching
import 'mobx-react/batchingForReactDom'
import ThemeProvider from '@material-ui/styles/ThemeProvider/ThemeProvider'
import { theme } from './theme'
import Login from './componets/Login/Login'
import ErrorHandler from './componets/ErrorHandler/ErrorHandler'

const Main = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <ErrorHandler>
        <Login />
      </ErrorHandler>
    </ThemeProvider>
  )
}

ReactDOM.render(<Main />, document.getElementById('app'))
