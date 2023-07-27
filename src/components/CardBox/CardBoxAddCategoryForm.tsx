import { mdiClose } from '@mdi/js'
import React from 'react'
import { AddCategory } from '../../interfaces'
import CardBox from './CardBox'
import BaseButton from '../Button/BaseButton'
import OverlayLayer from '../Overlay/OverlayLayer'
import CardBoxComponentTitle from './CardBoxComponentTitle'
import FormField from '../Form/FormField'
import { Formik, Form, Field } from 'formik'
import BaseButtons from '../Button/BaseButtons'
import BaseDivider from '../Divider/BaseDivider'
import { getCategories } from '../../hooks/categoriesData'

type Props = {
  title: string
  isActive: boolean
  onCancel?: () => void
  onSave?: (itemToAdd: AddCategory) => void
}

const CardBoxAddCategoryForm = (props: Props) => {
  if (!props.isActive) {
    return null
  }

  const { categories } = getCategories()
  const category: AddCategory = {
    createdBy:1
  }

  async function save(categoryToAdd: AddCategory) {
    props.onSave(categoryToAdd)
  }

  return (
    <OverlayLayer onClick={props.onCancel}>
      <CardBox
        className={`transition-transform shadow-lg max-h-modal w-11/12 md:w-3/5 lg:w-2/5 xl:w64/12 z-50`}
        isModal
      >
        <CardBoxComponentTitle title={props.title}>
          {!!props.onCancel && (
            <BaseButton
              icon={mdiClose}
              color="whiteDark"
              onClick={props.onCancel}
              small
              roundedFull
            />
          )}
        </CardBoxComponentTitle>

        <div className="space-y-3">
          <Formik initialValues={category} onSubmit={save}>
            <Form>
              <FormField label="Name" labelFor="name">
                <Field name="name" placeholder="Category Name" id="name" />
              </FormField>

              <BaseDivider />

              <FormField label="Description" hasTextareaHeight>
                <Field name="description" as="textarea" placeholder="Category Description" />
              </FormField>

              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
              </BaseButtons>
            </Form>
          </Formik>
        </div>
      </CardBox>
    </OverlayLayer>
  )
}

export default CardBoxAddCategoryForm
