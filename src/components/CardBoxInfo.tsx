import { mdiClose } from '@mdi/js'
import { ReactNode } from 'react'
import BaseButton from './BaseButton'
import CardBox from './CardBox'
import CardBoxComponentTitle from './CardBoxComponentTitle'
import OverlayLayer from './OverlayLayer'

type Props = {
  title: string
  isActive: boolean
  children: ReactNode
  onCancel?: () => void
}

const CardBoxInfo = ({
  title,
  isActive,
  children,
  onCancel
}: Props) => {
  if (!isActive) {
    return null
  }


  return (
    <OverlayLayer onClick={onCancel}>
      <CardBox
        className={`transition-transform shadow-lg max-h-modal w-11/12 md:w-3/5 lg:w-2/5 xl:w-4/12 z-50`}
        isModal
      >
           <CardBoxComponentTitle title={title}>
          {!!onCancel && (
            <BaseButton icon={mdiClose} color="whiteDark" onClick={onCancel} small roundedFull />
          )}
        </CardBoxComponentTitle>

        <div className="space-y-3">{children}</div>
      </CardBox>
    </OverlayLayer>
  )
}

export default CardBoxInfo
