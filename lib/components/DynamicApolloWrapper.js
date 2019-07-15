import dynamic from 'next/dynamic'

export const DynamicApolloWrapper = dynamic(
  () => import('./ApolloWrapper.jsx'),
  {
    loading: () => <>
      <div className='m-2 inline-block loading-indicator'>
        <div className='flex'>
          <span className='spinner-double-section-far'></span>
          <span className='font-silkaRegular text-gray-400 mx-4'> Loading ...</span>
        </div>
      </div>
    </>,
    ssr: false,
  }
)