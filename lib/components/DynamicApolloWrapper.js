import dynamic from 'next/dynamic'

export const DynamicApolloWrapper = dynamic(
  () => import('./ApolloWrapper'),
  {
    loading: () => <p>Chuck would prefer this to be a loading box...</p>,
    ssr: false,
  }
)