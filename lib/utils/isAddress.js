import { ethers } from 'ethers'

export function isAddress(address) {
  try {
    ethers.utils.getAddress(address)
    return true
  } catch (e) {
    return false
  }
}