import { useState, useEffect } from 'react';
import Sparkles from '../common/Sparkles';
import { motion } from 'motion/react';
import type { Card } from '../../types/prediction.types';

interface CardProps {
  card: Card;
  index: number;
}

const CardFlip = ({ card, index }: CardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  const imageUrl = `${apiUrl}/${card.image}`;
  const imageUrlCardBack = `${apiUrl}/static/CARD_BACK.svg`;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFlipped(true);
    }, index * 1000);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className="[perspective:1000px]">
      <motion.div
        style={{ transformStyle: 'preserve-3d' }}
        animate={{
          rotateY: isFlipped ? 180 : 0,
          scale: isFlipped ? 1.02 : 1,
          boxShadow: isFlipped
            ? '0 20px 40px rgba(0,0,0,0.25)'
            : '0 6px 18px rgba(0,0,0,0.12)',
        }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className={`relative w-[120px] h-[240px] md:h-[390px] md:w-[220px] ${isFlipped ? 'selected' : ''}`}>
        <figure
          className="absolute inset-0 h-full w-full rounded-[12px] overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}>
          <img
            src={imageUrlCardBack}
            alt="Reverso de la carta"
            className="w-full h-full pointer-events-none"
            loading="lazy"
          />
        </figure>

        <figure
          className="absolute inset-0 h-full w-full"
          style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}>
          <figcaption
            className="bg-opacity-50 w-full text-sm md:text-lg py-1 text-center rounded-md font-playfair-display text-shadow-2xs text-shadow-bone-white absolute -top-9 left-1/2 transform -translate-x-1/2 px-2"
          >{card.name}</figcaption>
          <Sparkles />
          <img
            src={imageUrl}
            alt="Frente de la carta"
            className="w-full h-full rounded-[12px] pointer-events-none"
            loading="lazy"
          />
        </figure>
      </motion.div>
    </div>
  );
};

export default CardFlip;
