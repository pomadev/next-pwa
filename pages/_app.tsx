import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'

export default function App({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session }>) {
  const [supabase] = useState(() => createBrowserSupabaseClient())

  useEffect(() => {
    // @ts-ignore
    window.OneSignal = window.OneSignal || []
    // @ts-ignore
    OneSignal.push(function () {
      // @ts-ignore
      OneSignal.init({
        appId: 'c0cadcc9-1e9f-4700-a909-f6a9c24640fa',
        safari_web_id:
          'web.onesignal.auto.613528e9-2930-4b07-a098-5a9518822d98',
        notifyButton: {
          enable: true,
        },
        serviceWorkerParam: {
          scope: '/js/push/onesignal/',
        },
        serviceWorkerPath: './js/push/onesignal/OneSignalSDKWorker.js',
        serviceWorkerUpdaterPath:
          '/js/push/onesignal/OneSignalSDKUpdaterWorker.js',
      })
    })

    return () => {
      // @ts-ignore
      window.OneSignal = undefined
    }
  }, [])

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} />
    </SessionContextProvider>
  )
}
