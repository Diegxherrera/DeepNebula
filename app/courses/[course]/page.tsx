import { allBlogs } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import ListLayout from '@/layouts/ListLayoutWithTags'
import fs from 'fs'
import path from 'path'
import courseData from 'app/course-data.json'
import slugify from 'slugify'

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

export async function generateMetadata({ params }: { params: { course: string } }) {
  const course = decodeURI(params.course)
  return {
    title: course,
    description: `Posts tagged under ${course}`,
  }
}

export default function CoursesPage({ params }: { params: { course: string } }) {
  const courseSlug = decodeURI(params.course)

  // Convert slug to a human-readable title
  const courseTitle = courseSlug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  const filteredPosts = allCoreContent(
    sortPosts(
      allBlogs.filter((post) => post.course && slugify(post.course, { lower: true }) === courseSlug)
    ).reverse()
  )

  if (filteredPosts.length === 0) {
    return notFound()
  }

  return <ListLayout posts={filteredPosts} title={courseTitle} />
}
