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
        appId: '9d61fe6c-9cbc-4649-855f-128f6cafe7ed',
        serviceWorkerParam: {
          scope: '/js/push/onesignal/',
        },
        serviceWorkerPath: './js/push/onesignal/OneSignalSDKWorker.js',
        serviceWorkerUpdaterPath:
          '/js/push/onesignal/OneSignalSDKUpdaterWorker.js',
      })
      // @ts-ignore
      OneSignal.showSlidedownPrompt()
    })
    // @ts-ignore

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
