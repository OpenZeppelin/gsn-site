import { Query } from 'react-apollo'
import { queries } from 'dapp-core'
import { useRouter } from 'next/router'

import { networkIdToName } from 'lib/utils/networkIdToName'

function Home() {
  const router = useRouter()
  const { address } = router.query

  return (
    <div>
      <p>
        Recipient {address}
      </p>
    </div>
  )
}

export default Home;