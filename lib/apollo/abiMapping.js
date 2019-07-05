import { AbiMapping } from 'apollo-link-ethereum'

import RelayHubAbi from './abis/RelayHubAbi'
import RelayRecipientAbi from './abis/RelayRecipientAbi'

export const abiMapping = new AbiMapping()

abiMapping.addAbi('RelayHub', RelayHubAbi)
abiMapping.addAbi('RelayRecipient', RelayRecipientAbi)