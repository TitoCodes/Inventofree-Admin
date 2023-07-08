import { mdiEye, mdiTrashCan } from '@mdi/js'
import React, { useState, useEffect } from 'react'
import { getItems } from '../hooks/itemsData'
import { Item } from '../interfaces'
import BaseButton from './BaseButton'
import BaseButtons from './BaseButtons'
import CardBoxModal from './CardBoxModal'

const Tableitems = () => {
  const { items } = getItems()

  const perPage = 5

  const [currentPage, setCurrentPage] = useState(0)

  const clientsPaginated = items.slice(perPage * currentPage, perPage * (currentPage + 1))

  const numPages = items.length / perPage

  const pagesList = []

  for (let i = 0; i < items.length; i++) {
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
            <th>Detail</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Created Date</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item: Item) => (
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
    </>
  )
}

export default Tableitems