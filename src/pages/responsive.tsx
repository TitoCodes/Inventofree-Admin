import Head from 'next/head'
import Image from 'next/image'
import React, { ReactElement } from 'react'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/SectionMain'
import SectionTitle from '../components/SectionTitle'
import { appTitle, getPageTitle } from '../config'

const ResponsivePage = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle('Responsive')}</title>
      </Head>

      <SectionTitle first>Mobile & Tablet</SectionTitle>

      <SectionMain>
        <div className="md:w-10/12 shadow-2xl md:mx-auto rounded-3xl border-8 border-white overflow-hidden">
        </div>
      </SectionMain>

      <SectionTitle>Small laptop 1024px</SectionTitle>

      <SectionMain>
        <div className="md:w-10/12 shadow-2xl md:mx-auto rounded-3xl border-8 border-white overflow-hidden">
        </div>
      </SectionMain>

      <SectionMain>
        <div className="md:w-10/12 shadow-2xl md:mx-auto rounded-3xl border-8 border-white overflow-hidden">
        </div>
      </SectionMain>

      <SectionTitle>Laptop & desktop</SectionTitle>

      <SectionMain>
        <div className="md:w-10/12 shadow-2xl md:mx-auto rounded-3xl border-8 border-white overflow-hidden">
        </div>
      </SectionMain>
    </>
  )
}

ResponsivePage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default ResponsivePage
