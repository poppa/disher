/* eslint-disable react/prop-types */
import React, { FC } from 'react'
import SnackBar from '@material-ui/core/Snackbar/Snackbar'
import Alert, { Color } from '@material-ui/lab/Alert/Alert'
import Button from '@material-ui/core/Button/Button'
import { observer } from 'mobx-react'
import { errorStore } from '../../storage'
import { DisherError } from '../../lib'

const actionButton = (
  <Button color="primary" size="small">
    Close
  </Button>
)

interface ErrorSnackbarProps {
  error: DisherError
}

const ErrorSnackbar: FC<ErrorSnackbarProps> = ({ error }): JSX.Element => {
  const [open, setOpen] = React.useState(true)
  const handleClose = (ev?: React.SyntheticEvent, reason?: string): void => {
    console.log(`Close:`, ev, reason)
    setOpen(false)
    errorStore.pop(error)
  }

  return (
    <div>
      <SnackBar
        open={open}
        autoHideDuration={10000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        action={actionButton}
      >
        <Alert
          severity={error.severity as Color}
          elevation={6}
          variant="filled"
          onClose={handleClose}
        >
          {error.message}
        </Alert>
      </SnackBar>
    </div>
  )
}

const ErrorComponent: FC<{}> = observer(({ children }) => {
  if (errorStore.hasFatal) {
    return <div>Fatal error</div>
  }

  if (errorStore.hasErrors) {
    return (
      <>
        {errorStore.errors.map((e, i) => (
          <ErrorSnackbar error={e} key={`e${i}`} />
        ))}
        {children}
      </>
    )
  }

  return <>{children}</>
})

export default ErrorComponent
