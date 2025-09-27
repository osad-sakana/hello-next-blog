import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import { Post, PostMeta } from '@/types/post';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export async function getAllPostsMeta(): Promise<PostMeta[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');

    // ファイルを読み込み
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // メタデータを解析
    const matterResult = matter(fileContents);

    return {
      slug,
      ...(matterResult.data as Omit<Post, 'slug' | 'content'>),
    };
  });

  // 日付でソート
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // メタデータを解析
  const matterResult = matter(fileContents);

  // MarkdownをHTMLに変換
  const processedContent = await remark()
    .use(remarkHtml)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    content: contentHtml,
    ...(matterResult.data as Omit<Post, 'slug' | 'content'>),
  };
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}
