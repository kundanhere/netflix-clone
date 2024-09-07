import { useEffect, useState } from 'react';
import axios from 'axios';

import Slider from './Slider';
import SimilarContentCard from './SimilarContentCard';
import { useContentStore } from '../store/content.store.js';

const SimilarContent = ({ id, ...props }) => {
  const [similarContent, setSimilarContent] = useState([]);
  const { contentType } = useContentStore();

  // fetch the similar content from the backend API
  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
        setSimilarContent(res.data.content);
      } catch (error) {
        if (error.message.includes('404')) setSimilarContent([]);
      }
    };
    getSimilarContent();
  }, [contentType, id]);

  return (
    similarContent?.length > 0 && (
      <Slider title="Similar Movies or TV Shows" {...props}>
        {similarContent?.map((item) =>
          item.poster_path === null ? null : <SimilarContentCard key={item.id} item={item} />
        )}
      </Slider>
    )
  );
};

export default SimilarContent;
