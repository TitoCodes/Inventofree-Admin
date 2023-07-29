import { mdiPencil, mdiTrashCan } from '@mdi/js'
import React, { useState } from 'react'
import { getCategories } from '../../hooks/categoriesData'
import { Category, UpdateCategory } from '../../interfaces'
import BaseButton from '../Button/BaseButton'
import BaseButtons from '../Button/BaseButtons'
import CardBoxModal from '../CardBox/CardBoxModal'
import CardBoxEditModal from '../CardBox/CardBoxEditModal'
import FormField from '../Form/FormField'
import { Formik, Form, Field } from 'formik'

const TableCategories = ({ data, handleUpdateSave, onConfirmDelete }) => {
  const { categories } = getCategories()

  const perPage = 5

  const [currentPage, setCurrentPage] = useState(0)

  const clientsPaginated = categories.slice(perPage * currentPage, perPage * (currentPage + 1))

  const numPages = categories.length / perPage

  const pagesList = []

  for (let i = 0; i < categories.length; i++) {
    pagesList.push(i)
  }

  const [isEditModalInfoActive, setEditModalActive] = useState(false)
  const [editCategory, setEditCategory] = useState<UpdateCategory>(null)
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null)
  const [deleteConfirmationMessage, setDeleteConfirmationMessage] = useState(null)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)

  const handleModalAction = () => {
    setIsModalTrashActive(false)
  }

  const handleDelete = (categoryId: number) => {
    setIsModalTrashActive(true)
    setCategoryIdToDelete(categoryId)
    setDeleteConfirmationMessage('Are you sure you want to delete category:' + categoryId)
  }

  const handleEditCategory = (category: Category) => {
    setEditModalActive(true)
    setEditCategory(category)
  }

  const handleSave = (category: UpdateCategory) => {
    handleUpdateSave(category)
    setEditModalActive(false)
  }

  const handleCancelAction = () => {
    setEditModalActive(false)
  }

  const handleOnConfirmDelete = (categoryId: number) => {
    onConfirmDelete(categoryId)
    setIsModalTrashActive(false)
  }
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
        <Formik initialValues={editCategory} onSubmit={(category) => handleSave(category)}>
          <Form>
            <FormField label="Name" labelFor="name">
              <Field name="name" placeholder="Category Name" id="name" />
            </FormField>
            <FormField label="Description" labelFor="description">
              <Field name="description" placeholder="Description" id="description" />
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
        onConfirm={() => handleOnConfirmDelete(categoryIdToDelete)}
        onCancel={handleModalAction}
      >
        <p>{deleteConfirmationMessage}</p>
      </CardBoxModal>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Date Created</th>
            <th>Date Modified</th>
          </tr>
        </thead>
        <tbody>
          {data.map((category: Category) => (
            <tr key={category.id}>
              <td data-label="Id">{category.id}</td>
              <td data-label="Name">{category.name}</td>
              <td data-label="Description">{category.description}</td>
              <td data-label="Created" className="lg:w-1 whitespace-nowrap">
                <small className="text-gray-500 dark:text-slate-400">
                  {new Date(category.createdDate).toLocaleString()}
                </small>
              </td>
              <td data-label="Modified" className="lg:w-1 whitespace-nowrap">
                <small className="text-gray-500 dark:text-slate-400">
                  {category.modifiedDate !== null
                    ? new Date(category.modifiedDate).toLocaleString()
                    : null}
                </small>
              </td>
              <td className="before:hidden lg:w-1 whitespace-nowrap">
                <BaseButtons type="justify-start lg:justify-end" noWrap>
                  <BaseButton
                    color="info"
                    icon={mdiPencil}
                    onClick={() => handleEditCategory(category)}
                    small
                  />
                  <BaseButton
                    color="danger"
                    icon={mdiTrashCan}
                    onClick={() => handleDelete(category.id)}
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

export default TableCategories
