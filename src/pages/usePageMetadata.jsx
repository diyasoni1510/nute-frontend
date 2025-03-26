// usePageMetadata.js

import { useEffect } from 'react';

const usePageMetadata = ({ title, description }) => {
  useEffect(() => {
    // Update the document title
    document.title = title;

    // Update the meta description tag
    const metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (metaDescriptionTag) {
      metaDescriptionTag.content = description;
    } else {
      // If the meta tag doesn't exist, create and append it
      const newMetaTag = document.createElement('meta');
      newMetaTag.name = 'description';
      newMetaTag.content = description;
      document.head.appendChild(newMetaTag);
    }
  }, [title, description]);
};

export default usePageMetadata;
