interface Course {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const coursesData: Course[] = [
  {
    title: 'JavaScript Crash Course',
    description:
      'A comprehensive introduction to JavaScript, perfect for beginners looking to understand the basics of web development. Learn the fundamental concepts of programming with JavaScript, including variables, loops, functions, and object-oriented programming.',
    imgSrc: `/static/images/javascript.svg`,
    href: '/courses/javascript-crash-course',
  },
  {
    title: 'JavaScript Deep Dive Course',
    description:
      'An advanced JavaScript course designed to deepen your understanding of the language. Explore in-depth topics such as closures, asynchronous programming, JavaScript engines, and modern ES6+ features to master JavaScript for real-world applications.',
    imgSrc: `/static/images/javascript-deep-dive.svg`,
    href: '/courses/javascript-deep-dive',
  },
  {
    title: 'TypeScript Crash Course',
    description:
      'Get started with TypeScript, a superset of JavaScript that brings static typing to web development. This crash course covers TypeScript basics, type annotations, interfaces, classes, and the benefits of using TypeScript in large codebases.',
    imgSrc: `/static/images/typescript.svg`,
    href: '/courses/typescript-crash-course',
  },
  {
    title: 'SQL Course',
    description:
      'Master the fundamentals of SQL with this comprehensive course. Learn how to query databases, manage data, and perform complex data operations to become proficient in SQL and enhance your data analysis skills.',
    imgSrc: `/static/images/sql.svg`,
    href: '/courses/sql-course',
  },
]

export default coursesData
