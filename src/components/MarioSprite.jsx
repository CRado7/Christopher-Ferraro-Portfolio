import React from 'react';
import marioSpriteSheet from '../assets/mario-sprite.png'; // Replace with actual sprite sheet

export default function MarioSprite({ x, y, frame, facing }) {
  const frameWidth = 64;
  const frameHeight = 80;
  const backgroundX = -frame * frameWidth;

  return (
    <div
      className="mario"
      style={{
        position: 'absolute',
        transform: `translate(${x}px, ${y}px) scaleX(${facing === 'left' ? -1 : 1})`,
        width: `${frameWidth}px`,
        height: `${frameHeight}px`,
        backgroundImage: `url(${marioSpriteSheet})`,
        backgroundPosition: `${backgroundX}px 0`,
        backgroundRepeat: 'no-repeat',
        imageRendering: 'pixelated',
      }}
    />
  );
}
