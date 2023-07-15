import { AddItem, UpdateItem } from '../interfaces'
import axios from 'axios'

export const saveItem = async (item: AddItem) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  }
  await fetch('/inventofree-admin/api/items/add', requestOptions)
}