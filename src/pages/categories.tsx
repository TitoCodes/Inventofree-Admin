import { mdiPlus } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useState, useEffect } from 'react'
import CardBox from '../components/CardBox/CardBox'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/Section/SectionMain'
import TableCategories from '../components/Table/TableCategories'
import { getPageTitle } from '../config'
import NotificationSuccess from '../components/Notification/NotificationSuccess'
import NotificationError from '../components/Notification/NotificationError'
import axios from 'axios'
import { AddCategory } from '../interfaces'
import CardBoxAddCategoryForm from '../components/CardBox/CardBoxAddCategoryForm'
import BaseButton from '../components/Button/BaseButton'
import { UpdateCategory } from '../interfaces'

const TablesPage = () => {
  const [currentCategory, setCurrentCategory] = useState([])
  const [isModalAddCategoryActive, setIsModalAddCategoryActive] = useState(false)
  const [showSuccessNotification, setShowSuccessNotification] = useState(false)
  const [successNotificationMessage, setSuccessNotificationMessage] = useState(null)
  const [showErrorNotification, setShowErroNotification] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  const fetchRecords = async () => {
    try {
      try {
        const res = await fetch('/inventofree-admin/api/categories')
        const json = await res.json()
        setCurrentCategory(json)
      } catch (error) {
        console.log(error)
      }
    } catch (error) {
      console.error('Error retrieving records:', error)
    }
  }

  const handleCloseAndRefresh = async () => {
    await fetchRecords()
    setIsModalAddCategoryActive(false)
  }

  const handleUpdateSave = async (category: UpdateCategory) => {
    category.updatedBy = 1 //TODO: to update later with the user ID of the login user
    await axios
      .put('/inventofree-admin/api/categories/update', category)
      .then((result: any) => {
        if (result.status == 200) {
          fetchRecords()
          setShowSuccessNotification(true)
          setSuccessNotificationMessage('Successfully updated:' + category.name)
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

  const handleDelete = async (categoryId: number) => {
    await axios
      .delete('/inventofree-admin/api/categories/delete/' + categoryId)
      .then((result: any) => {
        if (result.status == 200) {
          fetchRecords()
          setShowSuccessNotification(true)
          setSuccessNotificationMessage('Successfully deleted category Id:' + categoryId)
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

  async function handleAddCategorySave(categoryToAdd: AddCategory) {
    await axios
      .post('/inventofree-admin/api/categories/add', categoryToAdd)
      .then((result: any) => {
        if (result.status == 200) {
          handleCloseAndRefresh()
          setShowSuccessNotification(true)
          setSuccessNotificationMessage('Successfully added:' + categoryToAdd.name)
        } else {
          setShowErroNotification(true)
          setErrorMessages(result.response.data)
          setIsModalAddCategoryActive(false)
        }
      })
      .catch((error) => {
        setShowErroNotification(true)
        setErrorMessages(error.response.data)
        setIsModalAddCategoryActive(false)
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
  
  return (
    <>
      <Head>
        <title>{getPageTitle('Categories')}</title>
      </Head>
      <SectionMain>
        <NotificationSuccess
          isActive={showSuccessNotification}
          message={successNotificationMessage}
        />
        <NotificationError errorMessages={errorMessages} isActive={showErrorNotification} />
        <CardBoxAddCategoryForm
          title="Add Category"
          isActive={isModalAddCategoryActive}
          onCancel={() => setIsModalAddCategoryActive(false)}
          onSave={handleAddCategorySave}
        />

        <h2 className="text-xl font-bold p-5">Categories</h2>
   <BaseButton 
          color="info"
          label="Add Category"
          icon={mdiPlus}
          onClick={() => setIsModalAddCategoryActive(true)}
          small
          className="mb-5"
        />
        <CardBox className="mb-6" hasTable>
          <TableCategories data={currentCategory} handleUpdateSave={handleUpdateSave} onConfirmDelete={handleDelete} />
        </CardBox>
      </SectionMain>
    </>
  )
}

TablesPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default TablesPage
