import { mdiClose } from '@mdi/js'
import React from 'react'
import { AddItem } from '../../interfaces'
import CardBox from './CardBox'
import BaseButton from '../BaseButton'
import OverlayLayer from '../OverlayLayer'
import CardBoxComponentTitle from './CardBoxComponentTitle'
import FormField from '../FormField'
import { Formik, Form, Field } from 'formik'
import BaseButtons from '../BaseButtons'
import BaseDivider from '../BaseDivider'
import { getCategories } from '../../hooks/categoriesData'
import { Price } from '../../interfaces'

type Props = {
  title: string
  isActive: boolean
  onCancel?: () => void
  onSave?: (itemToAdd:AddItem) => void
}

const CardBoxAddItemForm = (props: Props) => {
  if (!props.isActive) {
    return null
  }

  const { categories } = getCategories()

  const price: Price = {
    amount: 0,
    currencyType: 1,
  }

  const item: AddItem = {
    price: price,
    createdBy: 1,
  }

  async function save(itemToAdd: AddItem) {
    props.onSave(itemToAdd);
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
          <Formik initialValues={item} onSubmit={save}>
            <Form>
              <FormField label="Name" labelFor="name">
                <Field name="name" placeholder="Item Name" id="name" />
              </FormField>

              <FormField label="Category" labelFor="category">
                <Field name="categoryId" id="id" component="select">
                  <option value="" selected disabled>
                    Select an option
                  </option>
                  {categories.map((category, index) => (
                    <option key={index} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Field>
              </FormField>

              <BaseDivider />

              <FormField label="Detail" hasTextareaHeight>
                <Field name="detail" as="textarea" placeholder="Item Details" />
              </FormField>

              <FormField label="Amount" labelFor="amount">
                <Field name="price.amount" placeholder="Amount" id="price.amount" />
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

export default CardBoxAddItemForm
