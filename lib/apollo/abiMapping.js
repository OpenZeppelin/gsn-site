import { AbiMapping } from 'apollo-link-ethereum'
import { apollo } from 'dapp-core'

import RelayHubAbi from './abis/RelayHubAbi'
import RelayRecipientAbi from './abis/RelayRecipientAbi'

import RelayHubArtifact from 'artifacts/RelayHub.json'

export const abiMapping = new AbiMapping()

abiMapping.addAbi('RelayHub', RelayHubAbi)
abiMapping.addAbi('RelayRecipient', RelayRecipientAbi)

apollo.addTruffleArtifact(abiMapping, 'RelayHub', RelayHubAbi, RelayHubArtifact)
