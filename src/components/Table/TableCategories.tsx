import { mdiEye, mdiTrashCan } from '@mdi/js'
import React, { useState, useEffect } from 'react'
import { getCategories } from '../../hooks/categoriesData'
import { Category } from '../../interfaces'
import BaseButton from '../BaseButton'
import BaseButtons from '../BaseButtons'
import CardBoxModal from '../CardBox/CardBoxModal'

const TableCategories = () => {
  const { categories } = getCategories()

  const perPage = 5

  const [currentPage, setCurrentPage] = useState(0)

  const clientsPaginated = categories.slice(perPage * currentPage, perPage * (currentPage + 1))

  const numPages = categories.length / perPage

  const pagesList = []

  for (let i = 0; i < categories.length; i++) {
    pagesList.push(i)
  }

  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)

  const handleModalAction = () => {
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
  }

  return (
    <>
      <CardBoxModal
        title="Sample modal"
        buttonColor="info"
        buttonLabel="Done"
        isActive={isModalInfoActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        <p>
          Lorem ipsum dolor sit amet <b>adipiscing elit</b>
        </p>
        <p>This is sample modal</p>
      </CardBoxModal>

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
            <th>Description</th>
            <th>Created Date</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category: Category) => (
            <tr key={category.id}>
              <td data-label="Id">{category.id}</td>
              <td data-label="Name">{category.name}</td>
              <td data-label="Description">{category.description}</td>
              <td data-label="Created" className="lg:w-1 whitespace-nowrap">
                <small className="text-gray-500 dark:text-slate-400">{category.createdDate}</small>
              </td>
              <td className="before:hidden lg:w-1 whitespace-nowrap">
                <BaseButtons type="justify-start lg:justify-end" noWrap>
                  <BaseButton
                    color="info"
                    icon={mdiEye}
                    onClick={() => setIsModalInfoActive(true)}
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
      {/* <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
          <BaseButtons>
            {pagesList.map((page) => (
              <BaseButton
                key={page}
                active={page === currentPage}
                label={page + 1}
                color={page === currentPage ? 'lightDark' : 'whiteDark'}
                small
                onClick={() => setCurrentPage(page)}
              />
            ))}
          </BaseButtons>
          <small className="mt-6 md:mt-0">
            Page {currentPage + 1} of {numPages}
          </small>
        </div>
      </div> */}
    </>
  )
}

export default TableCategories