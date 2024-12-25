import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import Link from 'next/link';
import { type SanityDocument } from 'next-sanity';

import { client } from '@/sanity/client';

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, author}`;

const options = { next: { revalidate: 30 } };

export default async function Home() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <div>
      <h1 className="text-2xl text-center font-bold mb-4">Posts</h1>

      {posts.map((post) => (
        <Link href={`/${post.slug.current}`} key={post._id}>
          <Card className="hover:scale-105 transition-all duration-300">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>{post.publishedAt}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Author: {post.author}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
