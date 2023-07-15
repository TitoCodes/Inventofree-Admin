import NotificationBase from './NotificationBase'

import { mdiAlert } from '@mdi/js'

type Props = {
  errorMessages?: any[]
  isActive?: boolean
}

function ErrorListComponent({ error }) {
  const errorProperties = Object.keys(error?.error || {})
  const errorMessages = []

  errorProperties.forEach((property) => {
    const messages = error.error[property] || []
    errorMessages.push(...messages)
  })

  return (
    <div>
      <ul>
        {errorMessages.map((errorMessage, index) => (
          <li key={index}>{errorMessage}</li>
        ))}
      </ul>
    </div>
  )
}

const NotificationError = (props: Props) => {
  if (!props.isActive) {
    return null
  }

  return (
    <NotificationBase color="danger" icon={mdiAlert} outline={true} isActive={props.isActive}>
      <b>
        Error saving:
        <ErrorListComponent error={props.errorMessages} />
      </b>
    </NotificationBase>
  )
}

export default NotificationError
