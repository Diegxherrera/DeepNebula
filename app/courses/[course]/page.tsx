import { allBlogs, Blog } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import ListLayout from '@/layouts/ListLayoutWithTags'
import fs from 'fs'
import path from 'path'
import { slug as generateSlug } from 'github-slugger'

// Generate static params for SSG
export const generateStaticParams = async () => {
  const filePath = path.join(process.cwd(), 'app', 'course-data.json')
  if (!fs.existsSync(filePath) || fs.readFileSync(filePath, 'utf-8').trim() === '') {
    console.error('Error: course-data.json is missing or empty')
    return []
  }
  const courseData = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  return Object.keys(courseData).map((courseSlug) => ({
    course: courseSlug,
  }))
}

// Metadata generation
export async function generateMetadata({ params }: { params: Promise<{ course: string }> }) {
  const resolvedParams = await params // Await `params` for Next.js compatibility
  const courseSlug = decodeURI(resolvedParams.course)
  const courseTitle = courseSlug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return {
    title: courseTitle,
    description: `Posts tagged under ${courseTitle}`,
  }
}

// Component for the course page
export default async function CoursesPage({ params }: { params: Promise<{ course: string }> }) {
  const resolvedParams = await params // Await `params` to access properties
  const courseSlug = decodeURI(resolvedParams.course)

  // Convert slug to a human-readable title
  const courseTitle = courseSlug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  const filteredPosts = allCoreContent(
    sortPosts(
      allBlogs.filter((post: Blog) => post.course && generateSlug(post.course) === courseSlug)
    ).reverse()
  )

  if (filteredPosts.length === 0) {
    return notFound()
  }

  return <ListLayout posts={filteredPosts} title={courseTitle} />
}
