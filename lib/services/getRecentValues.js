import localforage from 'lib/localforage'
import { filter } from 'lodash'

export async function getRecentValues(filters) {
  let result = []

  try {
    await localforage.ready()
    result = await localforage.getItem('RECENT_VALUES') || result

    if (filters) {
      result = filter(result, filters)
    }
    
  } catch (e) {
    console.warn(e)
  }

  return result
}