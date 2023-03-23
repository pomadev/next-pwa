import { Post } from './Post'
import { PostWithProfile } from '../pages/index'

type Props = {
  posts: PostWithProfile[]
}

export const Timeline = ({ posts }: Props) => {
  return (
    <>
      {posts.map((post) => (
        <Post
          key={post.id}
          username={post.profiles.username}
          avatarUrl={post.profiles.avatar_url}
          content={post.content}
        />
      ))}
    </>
  )
}
