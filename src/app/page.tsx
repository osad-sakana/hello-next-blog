import Link from "next/link";
import { getAllPostsMeta } from "@/lib/posts";
import { PostMeta } from "@/types/post";

const PostCard = ({ post }: { post: PostMeta }) => {
  return (
    <article className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/posts/${post.slug}`} className="block">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-blue-600">
          {post.title}
        </h2>
        <p className="text-gray-600 mb-3">{post.excerpt}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <time dateTime="{post.date}">
            {new Date(post.date).toLocaleDateString()}
          </time>
          <div className="space-x-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  )
}

export default async () => {
  const posts: PostMeta[]  = await getAllPostsMeta();

  return(
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-10">
        <h1 className='text-4xl font-bold text-gray-800 mb-2'>Next.jsを使った初めてのブログ(学習用)</h1>
        <p className='text-gray-600'>Next.jsで作ったブログです。</p>
      </header>

      <main>
        <div className="grid gap-6 md:gap-8">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
};
