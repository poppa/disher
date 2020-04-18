import React, { FC } from 'react'
import { observer } from 'mobx-react'
import { errorStore } from '../../storage'
import { DisherError } from '../../lib'

const ErrorComponent: FC<{}> = observer(({ children }) => {
  if (errorStore.error) {
    if (DisherError.isFatalError(errorStore.error)) {
      return <div>Render fatal error</div>
    } else {
      return (
        <>
          <div>{errorStore.error.message}</div>
          {children}
        </>
      )
    }
  }

  return <>{children}</>
})

export default ErrorComponent
