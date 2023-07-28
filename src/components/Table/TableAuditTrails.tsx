import { mdiEye } from '@mdi/js'
import React, { useState } from 'react'
import { getAuditTrails } from '../../hooks/auditTrailsData'
import { AuditTrail } from '../../interfaces'
import BaseButton from '../Button/BaseButton'
import BaseButtons from '../Button/BaseButtons'
import CardBoxInfo from '../CardBox/CardBoxInfo'

const TableAuditTrails = () => {
  
  const { auditTrails } = getAuditTrails()
  const [isModalInfoActive, setIsModalInfoActive] = useState(false)

  const perPage = 5

  const [currentPage, setCurrentPage] = useState(0)
  const [currentDetails, setCurrentDetail] = useState(0)
  const [detailModalTitle, setDetailModalTitle] = useState()

  const clientsPaginated = auditTrails.slice(perPage * currentPage, perPage * (currentPage + 1))

  const numPages = auditTrails.length / perPage

  const pagesList = []

  for (let i = 0; i < auditTrails.length; i++) {
    pagesList.push(i)
  }

  const [isModalTrashActive, setIsModalTrashActive] = useState(false)

  const handleModalAction = () => {
    setIsModalInfoActive(false)
  }

  function handleViewDetail(detail, title)
  {
    setDetailModalTitle(title)
    setIsModalInfoActive(true)
    setCurrentDetail(detail)
  }

  return (
    <>
      <CardBoxInfo
        title={detailModalTitle}
        isActive={isModalInfoActive}
        onCancel={handleModalAction}
      >
        <p className='break-words'>
          {currentDetails}
        </p>
      </CardBoxInfo>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Action</th>
            <th>Created By</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {auditTrails.map((auditTrail: AuditTrail) => (
            <tr key={auditTrail.id}>
              <td data-label="Id">{auditTrail.id}</td>
              <td data-label="Action">{auditTrail.action}</td>
              <td data-label="Created By">{auditTrail.createdBy}</td>
              <td className="before:hidden lg:w-1 whitespace-nowrap">
                <BaseButtons type="justify-start lg:justify-end" noWrap>
                  <BaseButton
                    color="info"
                    icon={mdiEye}
                    onClick={() => handleViewDetail(auditTrail.details, auditTrail.action)}
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

export default TableAuditTrails