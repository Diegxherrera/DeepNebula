import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer/generated'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

// Separate function to decode the tag and process the title
function getTag(tagParam: string) {
  const tag = decodeURI(tagParam)
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  return { tag, title }
}

// Generate metadata with async handling
export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>
}): Promise<Metadata> {
  const resolvedParams = await params // Await `params` here for async access
  const { tag } = getTag(resolvedParams.tag)
  return genPageMetadata({
    title: tag,
    description: `${siteMetadata.title} ${tag} tagged content`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${tag}/feed.xml`,
      },
    },
  })
}

// Static params generation for tags
export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  return tagKeys.map((tag) => ({
    tag: encodeURI(tag),
  }))
}

// Main TagPage component
export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const resolvedParams = await params // Await `params` here for async access
  const { tag, title } = getTag(resolvedParams.tag)

  // Filter posts based on the tag, excluding those with a course defined
  const filteredPosts = allCoreContent(
    sortPosts(
      allBlogs.filter(
        (post) => post.tags && post.tags.map((t) => slug(t)).includes(tag) && !post.course // Exclude course posts
      )
    )
  )

  if (filteredPosts.length === 0) {
    return notFound()
  }

  return <ListLayout posts={filteredPosts} title={title} />
}
