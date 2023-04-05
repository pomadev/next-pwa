import Head from 'next/head'
import {
  useSession,
  useUser,
  useSupabaseClient,
} from '@supabase/auth-helpers-react'
import { Timeline } from '../components/Timeline'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import PullToRefresh from 'react-simple-pull-to-refresh'
import Script from 'next/script'
import Footer from '../components/Footer'
import { Database } from '../types/supabase'
type Post = Database['public']['Tables']['posts']['Row']
type Profile = Database['public']['Tables']['profiles']['Row']
export type PostWithProfile = Post & { profiles: Profile }

function Onesignal() {
  return (
    <>
      <Script
        src='https://cdn.onesignal.com/sdks/OneSignalSDK.js'
        async={false}
      />
    </>
  )
}

export default function Home() {
  const session = useSession()

  const supabase = useSupabaseClient<Database>()
  const user = useUser()

  const [loading, setLoading] = useState(true)
  const [content, setContent] = useState<string>('')
  const [posts, setPosts] = useState<PostWithProfile[]>([])

  useEffect(() => {
    getPostsWithProfile()
  }, [])

  async function getPostsWithProfile() {
    try {
      setLoading(true)

      let { data, error } = await supabase
        .from('posts')
        .select('id, content, created_at, updated_at, profiles (*)')
        .order('created_at', { ascending: false })

      if (error) {
        throw error
      }
      if (data) {
        setPosts(data as PostWithProfile[])
      }
    } catch (error) {
      alert('Error loading posts!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function createPost() {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      let { error } = await supabase
        .from('posts')
        .insert({ content: content, profile_id: user.id })

      if (error) {
        throw error
      }
    } catch (error) {
      alert('Error creating a post!')
      console.log(error)
    } finally {
      setContent('')
      setLoading(false)
    }
  }

  async function handleRefresh() {
    await getPostsWithProfile()
  }

  return (
    <>
      <Head>
        <title>Home</title>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover'
        />
      </Head>
      <div className='container' style={{ padding: '32px 0 64px 0' }}>
        {session && (
          <label
            htmlFor='my-modal-3'
            className='fixed right-6 z-10 bg-blue-500 hover:bg-blue-600 btn btn-circle h-14 w-14 p-0 m-0 border-0'
            style={{ bottom: 'calc(80px + env(safe-area-inset-bottom))' }}
          >
            <Image src='/pen.png' alt='投稿する' width={32} height={32} />
          </label>
        )}
        <PullToRefresh onRefresh={handleRefresh}>
          <Timeline posts={posts} />
        </PullToRefresh>
      </div>
      <Footer />
      <Onesignal />
      <input type='checkbox' id='my-modal-3' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box relative'>
          <label
            htmlFor='my-modal-3'
            className='btn btn-sm btn-circle absolute right-2 top-2'
          >
            ✕
          </label>
          <div className='form-control mt-7'>
            <textarea
              className='textarea textarea-bordered h-24'
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <label className='label flex-end'>
              <span className='label-text-alt'>{content.length}/∞</span>
            </label>
          </div>
          <div className='modal-action mt-1'>
            <label
              htmlFor='my-modal-3'
              className='btn'
              onClick={async () => {
                await createPost()
              }}
            >
              投稿
            </label>
          </div>
        </div>
      </div>
    </>
  )
}
