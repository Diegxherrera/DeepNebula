interface Course {
  title: string
  description: string
  href?: string
  imgSrc?: string
  posts: number[]
}

const coursesData: Course[] = [
  {
    title: 'SQL Roadmap',
    description: `What if you could look up any information in the world? Webpages, images, videos
    and more. Google has many features to help you find exactly what you're looking
    for.`,
    imgSrc: '/static/images/google.png',
    href: 'https://www.google.com',
    posts: [12, 21],
  },
  {
    title: 'NoSQL Roadmap',
    description: `What if you could look up any information in the world? Webpages, images, videos
    and more. Google has many features to help you find exactly what you're looking
    for.`,
    imgSrc: '/static/images/nosql.webp',
    href: 'https://www.nosql.com',
    posts: [12, 21],
  },
  {
    title: 'Java Roadmap',
    description: `What if you could look up any information in the world? Webpages, images, videos
    and more. Google has many features to help you find exactly what you're looking
    for.`,
    imgSrc: '/static/images/java.webp',
    href: 'https://www.java.com',
    posts: [12, 21],
  },
]

export default coursesData
