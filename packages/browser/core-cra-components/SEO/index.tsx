import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLocation } from "react-router";

import { favicons } from "./favicons";

interface ISEOProps {
  date?: string;
  title?: string;
  siteName?: string;
  author?: string;
  description?: string;
  url?: string;
  type?: string;
  robots?: string;
  image?: string;
}

const SEO: React.FC<ISEOProps> = ({
  title = "eDonec Ultimate monorepo",
  siteName = "eDonec Ultimate monorepo",
  author = "eDonec",
  description = "A monorepo for eDonec with microservice architecture and stuff",
  url = "https://staging.themerchant.site",
  type = "website",
  robots = "follow, index",
  // !NOTE to self: Create a system that generates images!! inspirations https://github.com/theodorusclarence/og // https://github.com/vercel/og-image#readme
  image = "https://image.freepik.com/photos-gratuite/bagages-jaunes-plat-copie-espace_23-2148786124.jpg",
  date,
}) => {
  const { pathname } = useLocation();

  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="robots" content={robots} />
        <meta content={description} name="description" />
        <meta property="og:url" content={`${url}${pathname}`} />
        <link rel="canonical" href={`${url}${pathname}`} />
        {/* Open Graph */}
        <meta property="og:type" content={type} />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:description" content={description} />
        <meta property="og:title" content={title} />
        <meta name="image" property="og:image" content={image} />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={`${url}${pathname}`} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        {date && (
          <>
            <meta property="article:published_time" content={date} />
            <meta
              name="publish_date"
              property="og:publish_date"
              content={date}
            />
            <meta name="author" property="article:author" content={author} />
          </>
        )}
        {/* Favicons */}
        {favicons.map((linkProps) => (
          <link key={linkProps.href} {...linkProps} />
        ))}
        {/* // !STARTERCONF Change to the primary color chosen!!! */}
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="/favicon/ms-icon-144x144.png"
        />
        <meta name="theme-color" content="#ffffff" />
      </Helmet>
    </HelmetProvider>
  );
};

export default SEO;
