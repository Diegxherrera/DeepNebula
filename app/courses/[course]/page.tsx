import { allBlogs, Blog } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import ListLayout from '@/layouts/ListLayoutWithTags'
import fs from 'fs'
import path from 'path'
import { slug } from 'github-slugger'

// Generate static params for SSG
export const generateStaticParams = async () => {
  const filePath = path.join(process.cwd(), 'app', 'course-data.json')

  if (!fs.existsSync(filePath) || fs.readFileSync(filePath, 'utf-8').trim() === '') {
    console.error('Error: course-data.json is missing or empty')
    return []
  }

  const courseData = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  const paths = Object.keys(courseData).map((courseSlug) => ({
    course: courseSlug,
  }))

  console.log('Generated paths:', paths) // Inspect generated paths in the console
  return paths
}

// Metadata generation for the course page
export async function generateMetadata({ params }: { params: { course: string } }) {
  const courseSlug = decodeURI(params.course) // No need for await here
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
export default function CoursesPage({ params }: { params: { course: string } }) {
  const courseSlug = decodeURI(params.course) // No need for await here

  // Convert slug to a human-readable title
  const courseTitle = courseSlug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  // Filter and sort posts by course
  const filteredPosts = allCoreContent(
    sortPosts(
      allBlogs.filter((post: Blog) => post.course && slug(post.course) === courseSlug)
    ).reverse()
  )

  if (filteredPosts.length === 0) {
    return notFound()
  }

  return <ListLayout posts={filteredPosts} title={courseTitle} />
}
