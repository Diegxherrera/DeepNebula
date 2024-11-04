import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({ title: 'Blog' })

// Modify Page function to await params
export default async function Page({ params }: Awaited<{ params: Promise<{ page: string }> }>) {
  const resolvedParams = await params // Await the params Promise

  const pageNumber = parseInt(resolvedParams.page)

  // Filter posts to exclude any that have a `course` field defined
  const filteredPosts = allBlogs.filter((post) => !post.course)

  // Sort and process the filtered posts
  const posts = allCoreContent(sortPosts(filteredPosts))

  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )

  // Determine if this page is displaying course-related content
  const isCoursePage = false // Set to `true` if this is a course page; here it's `false` for the blog page

  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
    isCoursePage, // Add `isCoursePage` property to pagination
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
    />
  )
}
