import React from 'react'
import ReactDOM from 'react-dom'
import ThemeProvider from '@material-ui/styles/ThemeProvider/ThemeProvider'
import { theme } from './theme'

const Main = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <div>Here is the app</div>
    </ThemeProvider>
  )
}

ReactDOM.render(<Main />, document.getElementById('app'))
