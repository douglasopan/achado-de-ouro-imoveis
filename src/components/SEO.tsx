import { Helmet } from "react-helmet-async";

type SEOProps = {
  title: string;
  description?: string;
  canonicalPath?: string;
  imageUrl?: string;
  structuredData?: Record<string, any>;
};

const BASE_TITLE = "Achadourado";

const SEO = ({ title, description, canonicalPath, imageUrl, structuredData }: SEOProps) => {
  const fullTitle = `${title} | ${BASE_TITLE}`;
  const url = typeof window !== "undefined" ? window.location.origin : "https://achadourado.com.br";
  const canonical = canonicalPath ? `${url}${canonicalPath}` : url;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />} 
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}

      {structuredData && (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}
    </Helmet>
  );
};

export default SEO;
