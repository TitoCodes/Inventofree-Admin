import { AddItem } from '../interfaces';

export const saveItem = async (item:AddItem) => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    };
    const res = await fetch('/inventofree-admin/api/items/add', requestOptions);
  } catch (error) {
    console.log(error)
  }
}