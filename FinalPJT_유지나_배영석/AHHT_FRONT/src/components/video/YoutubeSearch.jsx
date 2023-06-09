import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledInnerCarousel = styled(motion.div)`
  display: flex;
`;

const StyledCarousel = styled(motion.div)`
  cursor: grab;
  overflow: hidden;
  width: 100vw;
`;

const StyledItems = styled(motion.div)`
  min-height: 16rem;
  min-width: 20rem;
  padding: 40px;
`;

const StyledItemsImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 2rem;
  pointer-events: none;
  box-shadow: 0 0 20px grey;
`;

const YoutubeSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCardClick = (index) => {
    setSelectedCard(index);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    searchVideos();
  };

  useEffect(() => {
    setWidth(
      carousel.current
        ? carousel.current.scrollWidth - carousel.current.offsetWidth
        : 0
    );
  }, [videos]);

  const searchVideos = async () => {
    try {
      const response = await axios.get(
        'https://www.googleapis.com/youtube/v3/search',
        {
          params: {
            q: searchTerm,
            part: 'snippet',
            maxResults: 5,
            key: 'AIzaSyANeHG0NduLXjBiX11z-hTKYep9hjsTnog',
          },
        }
      );

      setVideos(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchTerm} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>

      {videos.map((video) => (
        <StyledCarousel
          key={video.id.videoId}
          whileTap={{ cursor: 'grabbing' }}
        >
          <StyledInnerCarousel
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
          >
            <StyledItems
              className="item"
              onClick={() => handleCardClick(video.id.videoId)}
              initial={{ scale: 1 }}
              animate={{
                scale: selectedCard === video.id.videoId ? 1.1 : 1,
                transition: { duration: 0.3 },
              }}
            >
              <StyledItemsImg
                src={video.snippet.thumbnails.default.url}
                alt=""
              />
            </StyledItems>
          </StyledInnerCarousel>
        </StyledCarousel>
      ))}
    </div>
  );
};

export default YoutubeSearch;
