import { mdiPlus, mdiRefresh } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useEffect, useState } from 'react'
import CardBox from '../components/CardBox/CardBox'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/SectionMain'
import TableItems from '../components/Table/TableItems'
import { getPageTitle } from '../config'
import BaseButton from '../components/BaseButton'
import CardBoxAddItemForm from '../components/CardBox/CardBoxAddItemForm'
import { getItems } from '../hooks/itemsData'
import { AddItem } from '../interfaces'

const TablesPage = () => {
  const [isModalAddItemActive, setIsModalAddItemActive] = useState(false)
  const [currentItems, setCurrentItems] = useState([])

  useEffect(() => {
    fetchRecords()
  }, [])

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
      <CardBoxAddItemForm
        title="Add Item"
        isActive={isModalAddItemActive}
        onCancel={() => setIsModalAddItemActive(false)}
        onCloseAndRefresh={() => handleCloseAndRefresh()}
      />

      <Head>
        <title>{getPageTitle('Items')}</title>
      </Head>
      <SectionMain>
        <h2 className="text-xl font-bold p-5">Items</h2>
        <BaseButton
          color="info"
          label="Add Item"
          icon={mdiPlus}
          onClick={() => setIsModalAddItemActive(true)}
          small
          className="mb-5"
        />
        <CardBox className="mb-6" hasTable>
          <TableItems data={currentItems} />
        </CardBox>
      </SectionMain>
    </>
  )
}

TablesPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default TablesPage
