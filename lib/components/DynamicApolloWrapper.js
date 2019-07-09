import dynamic from 'next/dynamic'

export const DynamicApolloWrapper = dynamic(
  () => import('./ApolloWrapper.jsx'),
  {
    loading: () => <span>Chuck would prefer this to be a loading box...</span>,
    ssr: false,
  }
)