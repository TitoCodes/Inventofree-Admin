import { mdiMonitorCellphone } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import CardBox from '../components/CardBox'
import LayoutAuthenticated from '../layouts/Authenticated'
import NotificationBar from '../components/NotificationBar'
import SectionMain from '../components/SectionMain'
import TableSampleClients from '../components/TableCategories'
import { getPageTitle } from '../config'

const TablesPage = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle('Categories')}</title>
      </Head>
      <SectionMain>

      <h2 className='text-xl font-bold p-5'>Categories</h2>

        <CardBox className="mb-6" hasTable>
          <TableSampleClients />
        </CardBox>
      </SectionMain>
    </>
  )
}

TablesPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default TablesPage
