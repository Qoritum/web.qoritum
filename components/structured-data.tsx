// One serializer for JSON-LD from the site's server-side SEO helpers.
export function StructuredData({
  data,
}: {
  data: Record<string, unknown> | null
}) {
  if (!data) return null
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  )
}
