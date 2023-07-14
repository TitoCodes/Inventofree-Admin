import Head from 'next/head'
import React, { ReactElement } from 'react'
import CardBox from '../components/CardBox/CardBox'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/SectionMain'
import TableAuditTrails from '../components/Table/TableAuditTrails'
import { getPageTitle } from '../config'

const TablesPage = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle('Audit Trails')}</title>
      </Head>
      <SectionMain>

        <h2 className='text-xl font-bold p-5'>Audit Trails</h2>

        <CardBox className="mb-6" hasTable>
          <TableAuditTrails />
        </CardBox>
      </SectionMain>
    </>
  )
}

TablesPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default TablesPage
