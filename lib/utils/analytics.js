import ReactGA from 'react-ga'

export const initGA = () => {
  ReactGA.initialize('UA-85043059-7', {
    debug: false,
    titleCase: false
  })
  ReactGA.ga('set', 'checkProtocolTask', null);
  ReactGA.ga('set', 'appName', 'GSN-site');
}

export const logPageView = () => {
  console.log('Logging pageview for ${window.location.pathname}')
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}

export const logEvent = (category = '', action = '') => {
  if (category && action) {
    ReactGA.event({ category, action })
  }
}

export const logException = (description = '', fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal })
  }
}
