import React from 'react'
import ReactDOM from 'react-dom'
import ThemeProvider from '@material-ui/styles/ThemeProvider/ThemeProvider'
import { theme } from './theme'
import LoginComponent from './componets/LoginComponent/LoginComponent'

const Main = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <LoginComponent />
    </ThemeProvider>
  )
}

ReactDOM.render(<Main />, document.getElementById('app'))
