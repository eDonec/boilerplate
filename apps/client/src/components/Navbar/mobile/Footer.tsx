import React from "react";

import FacebookAlternativeSVG from "components/svgs/SocialMediaSVGs/FacebookAlternativeSVG";
import InstagramAlternativeSVG from "components/svgs/SocialMediaSVGs/InstagramAlternativeSVG";
import TiktokAlternativeSVG from "components/svgs/SocialMediaSVGs/TiktokAlternativeSVG";

const MobileFooter = () => {
  return (
    <>
      <p className="my-4 text-xs text-gray-700">
        <span data-config-id="contact">Contactez nous </span>
        <a
          className="text-blue-600 underline hover:text-blue-600"
          href="mailto:khalilmelaouhia@hotmail.fr"
        >
          khalilmelaouhia@hotmail.fr
        </a>
      </p>
      <div className="mb-3">
        <a
          className="inline-block px-1"
          href="https://www.facebook.com/profile.php?id=100089015385069"
        >
          <FacebookAlternativeSVG
            width={22}
            aria-label="Facebook page"
            height={22}
            className="ml-auto mr-3 fill-gray-800"
          />
        </a>
        <a
          className="inline-block px-1"
          href="https://www.tiktok.com/@khalil.melaouhia?fbclid=IwAR3UOz5AcHd5ydfcKb68zB0xt1qYEJuvqcfBesx9ra3oFN_0e7Y5nxxNuIQ"
        >
          <TiktokAlternativeSVG
            width={22}
            aria-label="Tiktok profile"
            height={22}
            className="ml-auto mr-3 fill-gray-800"
          />
        </a>
        <a
          className="inline-block px-1"
          href="https://www.instagram.com/khalil_melaouhia/?fbclid=IwAR0SSigqYfPgOgfD0JfOQxmqsZUAqpUX3HsRFqlHtUHTi4dS5VHYGUTAKHg"
        >
          <InstagramAlternativeSVG
            width={22}
            aria-label="Instagram page"
            height={22}
            className="ml-auto mr-3 fill-gray-800"
          />
        </a>
      </div>
    </>
  );
};

export default MobileFooter;
