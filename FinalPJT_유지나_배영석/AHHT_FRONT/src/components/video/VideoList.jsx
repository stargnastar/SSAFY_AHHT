import React, { useRef, useState, useEffect } from 'react';
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

const VideoList = ({ videos }) => {
  const carousel = useRef();
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (index) => {
    setSelectedCard(index);
  };
  const [width, setWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);

  const handleCardMouseMove = (e) => {
    if (!isDragging) return;
    carousel.current.scrollLeft += dragStartX - e.clientX;
    setDragStartX(e.clientX);
  };

  const handleCardMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);
  return (
    <div>
      {videos.map((video) => (
        <StyledCarousel
          ref={carousel}
          whileTap={{ cursor: 'grabbing' }}
          onMouseMove={handleCardMouseMove}
          onMouseUp={handleCardMouseUp}
        >
          <StyledInnerCarousel
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
          >
            <StyledItems
              className="item"
              key={video.id.videoId}
              onClick={() => handleCardClick(video)}
              initial={{ scale: 1 }}
              animate={{
                scale: selectedCard === 0 ? 1.1 : 1,
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

export default VideoList;
