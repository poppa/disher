import React, { FC } from 'react'
import { observer } from 'mobx-react'
import Button from '@material-ui/core/Button/Button'
import { userStore } from '../../storage'

const App: FC = observer(() => {
  return (
    <main>
      <Button
        color="primary"
        variant="contained"
        onClick={async (): Promise<void> => await userStore.logout()}
      >
        Logout
      </Button>
    </main>
  )
})

export default App
