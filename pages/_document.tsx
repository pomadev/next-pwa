import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link rel='manifest' href='/manifest.json' />
        <link rel='apple-touch-icon' href='/icon.png' />
        <link rel='icon' href='/favicon.ico' />
        <meta name='theme-color' content='#101010' />
        <Script src='https://cdn.onesignal.com/sdks/OneSignalSDK.js' defer />
        <Script id='one-signal-web-push' strategy='afterInteractive'>
          {`window.OneSignal = window.OneSignal || [];
            OneSignal.push(function() {
              OneSignal.init({
                appId: "c0cadcc9-1e9f-4700-a909-f6a9c24640fa",
              });
            });`}
        </Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
