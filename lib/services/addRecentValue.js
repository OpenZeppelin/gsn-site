import localforage from 'lib/localforage'
import { isEqual, isMatch } from 'lodash'

import { getRecentValues } from './getRecentValues'

const MAX_NUMBER_OF_RECENTS = 5

export async function addRecentValue(value, filters) {
  
  try {
    await localforage.ready()

    let values = await getRecentValues()

    let count = 0
    values = values.filter((existingValue) => {
      if (isEqual(existingValue, value)) {
        return false // remove dupe
      } else if (isMatch(existingValue, filters)) {
        count++
      }

      return count < MAX_NUMBER_OF_RECENTS
    })

    values.unshift(value)

    await localforage.setItem('RECENT_VALUES', values)

  } catch (e) {
    console.warn(e)
  }
}