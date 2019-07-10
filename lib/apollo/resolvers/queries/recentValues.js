import { getRecentValues } from 'lib/services/getRecentValues';

export async function recentValues(options, args) {
  return await getRecentValues(args)
}
