import { useState, useEffect } from 'react';
import BACK from '../../assets/card-back/CARD_BACK.svg';
import type { TarotCardAPI } from '../../types/carts-types';

interface CardProps {
  card: TarotCardAPI;
  index: number;
}

const CardFlip = ({ card, index }: CardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;
  const imageUrl = `${apiUrl}/${card.image}`;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFlipped(true);
    }, index * 1000);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className="[perspective:1000px]">
      <div
        className={`relative h-[190px] w-[120px] transition-all duration-[5000ms] [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}>
        <figure className="absolute inset-0 h-full w-full border-charred-umber border-2 [backface-visibility:hidden]">
          <img
            src={BACK}
            alt="Reverso de la carta"
            className="w-full h-full object-cover pointer-events-none"
            loading="lazy"
          />
        </figure>

        <figure className="absolute inset-0 h-full w-full border-charred-umber border-2 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <img
            src={imageUrl}
            alt="Frente de la carta"
            className="w-full h-full object-cover pointer-events-none"
            loading="lazy"
          />
          <figcaption>{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
};

export default CardFlip;
