import React, { useEffect, useRef } from 'react';

const AboutBlock = ({
  index,
  bumpedBrickIndex,
  setBumpedBrickIndex,
  showModal,
  blockRefs,
  aboutCloseButtonRef,
  aboutLinkedInButtonRef,
  aboutGitHubButtonRef,
  handleLinkedInClick,
  handleGitHubClick,
}) => {
  const ref = useRef();

  // Register in blockRefs
  useEffect(() => {
    if (ref.current) {
      blockRefs.current[index] = ref.current;
    }
  }, [blockRefs, index]);

  return (
    <div
      className={`about-block ${bumpedBrickIndex === index ? 'bump' : ''}`}
      ref={ref}
      onClick={showModal} // optional: also open on click
    />
  );
};

export default AboutBlock;
