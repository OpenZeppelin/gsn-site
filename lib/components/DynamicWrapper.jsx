import dynamic from 'next/dynamic'

export const DynamicWrapper = dynamic(
  () => import('./ApolloWrapper'),
  {
    loading: () => <span>Chuck would prefer this to be a loading box...</span>,
    ssr: false,
  }
)