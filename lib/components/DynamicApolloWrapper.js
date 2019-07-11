import dynamic from 'next/dynamic'

export const DynamicApolloWrapper = dynamic(
  () => import('./ApolloWrapper.jsx'),
  {
    loading: () => <>
      <div className='m-2'>
        <span class='spinner-double-section-far'></span> <span className='font-silkaRegular text-gray-500 mx-4'> Loading ...</span>
      </div>
    </>,
    ssr: false,
  }
)