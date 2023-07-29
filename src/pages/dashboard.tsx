import {
  mdiCartOutline,
  mdiChartTimelineVariant,
  mdiGithub,
  mdiPackageVariantClosed,
} from '@mdi/js'
import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import type { ReactElement } from 'react'
import BaseButton from '../components/Button/BaseButton'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/Section/SectionMain'
import SectionTitleLineWithButton from '../components/Section/SectionTitleLineWithButton'
import CardBoxWidget from '../components/CardBox/CardBoxWidget'
import SectionBannerStarOnGitHub from '../components/Section/SectionBannerStarOnGitHub'
import { getPageTitle } from '../config'

const Dashboard = () => {
  const [totalItems, setTotalItems] = useState(0)

  const fetchTotalItems = async () => {
    try {
      try {
        const res = await fetch('/inventofree-admin/api/items/count')
        const json = await res.json()
        setTotalItems(json)
      } catch (error) {
        console.log(error)
      }
    } catch (error) {
      console.error('Error retrieving total items:', error)
    }
  }

  useEffect(() => {
    fetchTotalItems()
  }, [])

  return (
    <>
      <Head>
        <title>{getPageTitle('Dashboard')}</title>
      </Head>
      <SectionMain>
      <div className="my-6">
          <SectionBannerStarOnGitHub />
        </div>

        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title="Overview" main>
          <BaseButton
            href="https://github.com/TitoCodes/inventofree-admin"
            target="_blank"
            icon={mdiGithub}
            label="Star on GitHub"
            color="contrast"
            roundedFull
            small
          />
        </SectionTitleLineWithButton>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
          <CardBoxWidget
            // trendLabel="12%"
            // trendType="up"
            trendColor="success"
            icon={mdiPackageVariantClosed}
            iconColor="success"
            number={totalItems}
            label="Total Inventory"
          />
          <CardBoxWidget
            // trendLabel="16%"
            // trendType="down"
            // trendColor="danger"
            icon={mdiCartOutline}
            iconColor="info"
            number={2500}
            numberPrefix="₱"
            label="Sales Today"
          />
          <CardBoxWidget
            // trendLabel="Overflow"
            // trendType="warning"
            // trendColor="warning"
            icon={mdiChartTimelineVariant}
            iconColor="success"
            number={55000}
            numberPrefix="₱"
            label="Monthly Sales"
          />
        </div>

        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col justify-between">
            {items.map((item: Item) => (
              <CardBoxItem key={item.id} item={item} />
            ))}
          </div>
          <div className="flex flex-col justify-between">
            {categoriesListed
            .map((category: Category) => (
              <CardBoxClient key={category.id} category={category} />
            ))}
          </div>
        </div> */}

        {/* <SectionTitleLineWithButton icon={mdiChartPie} title="Trends overview">
          <BaseButton icon={mdiReload} color="whiteDark" onClick={fillChartData} />
        </SectionTitleLineWithButton>

        <CardBox className="mb-6">{chartData && <ChartLineSample data={chartData} />}</CardBox> */}
      </SectionMain>
    </>
  )
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default Dashboard
