/**
 * Structured data. The JSON is serialised by us, not by user input, so the
 * only escaping needed is for a literal "</script>" sequence.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
