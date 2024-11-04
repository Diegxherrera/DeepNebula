import { ImageResponse } from 'next/og'

export async function GET(req) {
  const courseSlug = decodeURIComponent(req.nextUrl.pathname.split('/').pop())

  // If courseSlug is null or empty, provide a fallback title
  const courseTitle = courseSlug
    ? courseSlug
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : 'Default Course Title' // Fallback if title is missing

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f3f4f6',
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          fontFamily: 'Arial, sans-serif',
          color: '#1f2937',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            padding: '2rem',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '0.5rem',
          }}
        >
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>{courseTitle}</h1>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
