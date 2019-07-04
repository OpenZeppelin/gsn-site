import { DynamicApolloWrapper } from "../lib/components/DynamicApolloWrapper";

function Home() {
  return (
    <div>
      <p>
        Welcome to Next.js!
      </p>
      <DynamicApolloWrapper>
        <p>
          This content is dynamically loaded from Ethereum
        </p>
      </DynamicApolloWrapper>
    </div>
  )
}

export default Home;