import { mdiTrashCan, mdiPencil } from '@mdi/js'
import React, { useState } from 'react'
import { Item, UpdateItem } from '../../interfaces'
import BaseButton from '../BaseButton'
import BaseButtons from '../BaseButtons'
import CardBoxModal from '../CardBox/CardBoxModal'
import CardBoxEditModal from '../CardBox/CardBoxEditModal'
import FormField from '../FormField'
import { Formik, Form, Field } from 'formik'
import { getCategories } from '../../hooks/categoriesData'
import BaseDivider from '../BaseDivider'

const Tableitems = ({ data, onUpdateSave }) => {
  const [isEditModalInfoActive, setEditModalActive] = useState(false)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)
  const [editItem, setEditItem] = useState<UpdateItem>({})

  const handleModalAction = () => {
    setIsModalTrashActive(false)
  }

  const handleEditItem = (item: Item) => {
    setEditModalActive(true)
    setEditItem(item)
  }

  const handleCancelAction = () => {
    setEditModalActive(false)
  }

  const handleSave = (item: UpdateItem) => {
    onUpdateSave(item)
    setEditModalActive(false)
  }

  const { categories } = getCategories()

  return (
    <>
      <CardBoxEditModal
        title="Edit item"
        buttonColor="info"
        buttonLabel="Done"
        isActive={isEditModalInfoActive}
        onConfirm={handleModalAction}
        onCancel={handleCancelAction}
      >
        <Formik initialValues={editItem} onSubmit={(item) => handleSave(item)}>
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
              <BaseButton color="info" label="Save" type="submit" />
              <BaseButton
                type="cancel"
                color="info"
                outline
                label="Cancel"
                onClick={handleCancelAction}
              />
            </BaseButtons>
          </Form>
        </Formik>
      </CardBoxEditModal>
      <CardBoxModal
        title="Please confirm"
        buttonColor="danger"
        buttonLabel="Confirm"
        isActive={isModalTrashActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        <p>
          Lorem ipsum dolor sit amet <b>adipiscing elit</b>
        </p>
        <p>This is sample modal</p>
      </CardBoxModal>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Detail</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Created Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: Item) => (
            <tr key={item.id}>
              <td data-label="Id">{item.id}</td>
              <td data-label="Name">{item.name}</td>
              <td data-label="Description">{item.detail}</td>
              <td data-label="Amount">{item.price.amount}</td>
              <td data-label="Category">{item.category.name}</td>
              <td data-label="Created Date" className="lg:w-1 whitespace-nowrap">
                <small className="text-gray-500 dark:text-slate-400">{item.createdDate}</small>
              </td>
              <td className="before:hidden lg:w-1 whitespace-nowrap">
                <BaseButtons type="justify-start lg:justify-end" noWrap>
                  <BaseButton
                    color="info"
                    icon={mdiPencil}
                    onClick={() => handleEditItem(item)}
                    small
                  />
                  <BaseButton
                    color="danger"
                    icon={mdiTrashCan}
                    onClick={() => setIsModalTrashActive(true)}
                    small
                  />
                </BaseButtons>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Tableitems
