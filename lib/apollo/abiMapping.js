import { AbiMapping } from 'apollo-link-ethereum'

import RelayHubAbi from './abis/RelayHubAbi'

export const abiMapping = new AbiMapping()

abiMapping.addAbi('RelayHub', RelayHubAbi)