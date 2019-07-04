import dynamic from 'next/dynamic'

export const DynamicApolloWrapper = dynamic(
  () => import('./ApolloWrapper'),
  {
    ssr: false,
  }
)