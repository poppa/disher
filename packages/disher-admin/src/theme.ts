import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#e64a19',
    },
  },
})

export const useStyles = makeStyles((th: Theme) => {
  return createStyles({
    root: {
      [th.breakpoints.down('xs')]: {
        display: 'flex',
        flexDirection: 'column',
      },
    },
  })
})
