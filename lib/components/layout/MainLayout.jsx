import { Meta } from './Meta'
import Footer from './Footer'
import { initGA, logPageView } from '../../utils/analytics'

import 'assets/styles/index.css'
import 'assets/styles/animations.css'
import 'assets/styles/fonts.css'
import 'assets/styles/loader.css'
import 'assets/styles/transitions.css'

export class MainLayout extends React.Component {

  componentDidMount () {
    if (!window.GA_INITIALIZED) {
      initGA()
      window.GA_INITIALIZED = true
    }
    logPageView()
  }

  render() {
    const { title, children } = this.props;
    return  (
      <div>
        <Meta
          title={title}
        />
        {children}
        <Footer />
      </div>
    );
  }
}
