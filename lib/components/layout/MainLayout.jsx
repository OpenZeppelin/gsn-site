import Meta from './Meta'
import Footer from './Footer'

import '~/styles/index.css'
import '~/styles/animations.css'
import '~/styles/fonts.css'
import '~/styles/loader.css'
import '~/styles/transitions.css'

export const MainLayout = ({ children }) => (
  <div>
    <Meta />
    {children}
    <Footer />
  </div>
)