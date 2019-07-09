import Meta from './meta'
import Footer from './footer'

import '~/styles/index.css'
import '~/styles/fonts.css'

export const MainLayout = ({ children }) => (
  <div>
    <Meta />
    {children}
    <Footer />
  </div>
)