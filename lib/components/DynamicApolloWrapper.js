import dynamic from 'next/dynamic'

import { LoadingSpinner } from 'lib/components/LoadingSpinner'

export const DynamicApolloWrapper = dynamic(
  () => import('./ApolloWrapper.jsx'),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  }
)