import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllPostsMeta } from "@/lib/posts";

interface Props{
  params: {
    slug: string
  }
}

export default async({params}: Props) => {
  try{
    const post = await getPostBySlug(params.slug);

    return(
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/" className="text-blue-600 hover:underline mb-6 inline-block">
          ← ホームに戻る
        </Link>

        <article className="bg-white rounded-lg p-8 shadow-sm">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <time dateTime={post.date}>{post.date}</time>
              <div className="flex gap-2">
                {post.tags.map((tag)=>(
                  <span key={tag} className="bg-gray-100 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </header>

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{__html: post.content}}
          />
        </article>
      </div>
    )
  }catch(error){
    notFound();
  }
};

export async function generateStaticParams(){
  const posts = await getAllPostsMeta();
  return posts.map((post)=>({
      slug: post.slug,
  }))
}
