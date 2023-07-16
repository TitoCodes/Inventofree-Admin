import { mdiPlus, mdiCheckCircle, mdiAlert } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useEffect, useState } from 'react'
import CardBox from '../components/CardBox/CardBox'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/SectionMain'
import TableItems from '../components/Table/TableItems'
import { getPageTitle } from '../config'
import BaseButton from '../components/BaseButton'
import CardBoxAddItemForm from '../components/CardBox/CardBoxAddItemForm'
import { UpdateItem } from '../interfaces'
import { AddItem } from '../interfaces'
import axios from 'axios'
import NotificationError from '../components/Notification/NotificationError'
import NotificationSuccess from '../components/Notification/NotificationSuccess'

const TablesPage = () => {
  const [isModalAddItemActive, setIsModalAddItemActive] = useState(false)
  const [currentItems, setCurrentItems] = useState([])
  const [showSuccessNotification, setShowSuccessNotification] = useState(false)
  const [showErrorNotification, setShowErroNotification] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
  const [successNotificationMessage, setSuccessNotificationMessage] = useState(null)

  const handleUpdateItemSave = async (item: UpdateItem) => {
    item.updatedBy = 1 //TODO: to update later with the user ID of the login user
    await axios
      .put('/inventofree-admin/api/items/update', item)
      .then((result: any) => {
        if (result.status == 200) {
          fetchRecords()
          setShowSuccessNotification(true)
          setSuccessNotificationMessage('Successfully updated:' + item.name)
        } else {
          setShowErroNotification(true)
          setErrorMessages(result.response.data)
        }
      })
      .catch((error) => {
        setShowErroNotification(true)
        setErrorMessages(error.response.data)
      })
  }

  async function handleAddItemSave(itemToAdd: AddItem) {
    await axios
      .post('/inventofree-admin/api/items/add', itemToAdd)
      .then((result: any) => {
        if (result.status == 200) {
          handleCloseAndRefresh()
          setShowSuccessNotification(true)
          setSuccessNotificationMessage('Successfully added:' + itemToAdd.name)
        } else {
          setShowErroNotification(true)
          setErrorMessages(result.response.data)
          setIsModalAddItemActive(false)
        }
      })
      .catch((error) => {
        setShowErroNotification(true)
        setErrorMessages(error.response.data)
        setIsModalAddItemActive(false)
      })
  }

  useEffect(() => {
    fetchRecords()
  }, [])

  useEffect(() => {
    if (showSuccessNotification) {
      const timer = setTimeout(() => {
        setShowSuccessNotification(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showSuccessNotification])

  useEffect(() => {
    if (showErrorNotification) {
      const timer = setTimeout(() => {
        setShowErroNotification(false)
      }, 8000)
      return () => clearTimeout(timer)
    }
  }, [showErrorNotification])

  const fetchRecords = async () => {
    try {
      try {
        const res = await fetch('/inventofree-admin/api/items')
        const json = await res.json()
        setCurrentItems(json)
      } catch (error) {
        console.log(error)
      }
    } catch (error) {
      console.error('Error retrieving records:', error)
    }
  }

  const handleCloseAndRefresh = async () => {
    await fetchRecords()
    setIsModalAddItemActive(false)
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Items')}</title>
      </Head>
      <SectionMain>
        <NotificationSuccess
          isActive={showSuccessNotification}
          message={successNotificationMessage}
        />
        <NotificationError errorMessages={errorMessages} isActive={showErrorNotification} />
        <CardBoxAddItemForm
          title="Add Item"
          isActive={isModalAddItemActive}
          onCancel={() => setIsModalAddItemActive(false)}
          onSave={handleAddItemSave}
        />

        <h2 className="text-xl font-bold pb-3">Items</h2>
        <BaseButton
          color="info"
          label="Add Item"
          icon={mdiPlus}
          onClick={() => setIsModalAddItemActive(true)}
          small
          className="mb-5"
        />
        <CardBox className="mb-6" hasTable>
          <TableItems data={currentItems} onUpdateSave={handleUpdateItemSave} />
        </CardBox>
      </SectionMain>
    </>
  )
}

TablesPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default TablesPage