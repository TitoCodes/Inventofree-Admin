import NotificationBase from './NotificationBase'

import { mdiCheckCircle } from '@mdi/js'

type Props = {
  errorMessages?: any[]
  isActive?: boolean
  message?:string
}

const NotificationSuccess = (props: Props) => {
  if (!props.isActive) {
    return null
  }

  return (
    <NotificationBase
          color="success"
          icon={mdiCheckCircle}
          outline={true}
          isActive={props.isActive}
        >
          <b>{props.message}</b>
        </NotificationBase>
  )
}

export default NotificationSuccess
