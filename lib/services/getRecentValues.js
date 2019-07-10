import localforage from 'lib/localforage'
import { filter } from 'lodash'

import { RECENT_VALUES_STORAGE_KEY } from 'lib/constants'

export async function getRecentValues(filters) {
  let result = []

  try {
    await localforage.ready()
    result = await localforage.getItem(RECENT_VALUES_STORAGE_KEY) || result

    if (filters) {
      result = filter(result, filters)
    }
    
  } catch (e) {
    console.warn(e)
  }

  return result
}