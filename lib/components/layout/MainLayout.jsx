import { Meta } from './Meta'
import Footer from './Footer'

import 'assets/styles/index.css'
import 'assets/styles/animations.css'
import 'assets/styles/fonts.css'
import 'assets/styles/loader.css'
import 'assets/styles/transitions.css'

export const MainLayout = ({ title, children }) => (
  <div>
    <Meta
      title={title}
    />
    {children}
    <Footer />
  </div>
)