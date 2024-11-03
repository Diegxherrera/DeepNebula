interface Course {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const coursesData: Course[] = [
  {
    title: 'SQL Course',
    description: 'Introduction to SQL...',
    imgSrc: `/api/og?title=${encodeURIComponent('SQL Course')}`,
    href: '/courses/sql-course',
  },
  {
    title: 'NoSQL Course',
    description: 'Introduction to NoSQL',
    imgSrc: `/api/og?title=${encodeURIComponent('NoSQL Course')}`,
    href: '/courses/nosql-course',
  },
  {
    title: 'JavaScript Crash Course',
    description: 'Crash course for JavaScript...',
    imgSrc: `/api/og?title=${encodeURIComponent('JavaScript Crash Course')}`,
    href: '/courses/javascript-crash-course',
  },
  {
    title: 'JavaScript Deep Dive Course',
    description: 'Deep Dive course for JavaScript...',
    imgSrc: `/api/og?title=${encodeURIComponent('JavaScript Crash Course')}`,
    href: '/courses/javascript-deep-dive',
  },
]

export default coursesData
