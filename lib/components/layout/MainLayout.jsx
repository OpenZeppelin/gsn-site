import Meta from './Meta'
import Footer from './Footer'

import '~/styles/index.css'
import '~/styles/fonts.css'

export const MainLayout = ({ children }) => (
  <div>
    <Meta />
    {children}
    <Footer />
  </div>
)