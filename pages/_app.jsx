import React from 'react';
import Link from 'next/link';
import App, { Container } from 'next/app';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <div className='container'>
          <Link href='/'><a title='Home'>Home</a></Link>
          <Component {...pageProps} />
        </div>
      </Container>
    );
  }
}

export default MyApp