import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link rel='manifest' href='/manifest.json' />
        <link rel='apple-touch-icon' href='/icon.png' />
        <link rel='icon' href='/favicon.ico' />
        <meta name='theme-color' content='#101010' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
