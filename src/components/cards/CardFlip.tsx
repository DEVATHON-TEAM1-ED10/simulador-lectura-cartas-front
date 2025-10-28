import { useState, useEffect } from 'react';

interface TarotCard {
  id: string;
  name: string;
  description: string;
  frontImage: string;
  backImage: string;
}

interface CardProps {
  card: TarotCard;
  index: number;
}

const CardFlip = ({ card, index }: CardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

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
        {/* CARA TRASERA */}
        <figure className="absolute inset-0 h-full w-full border-charred-umber border-2 [backface-visibility:hidden]">
          <img
            src={card.backImage}
            alt="Cara frontal de la carta"
            className="w-full h-full object-cover pointer-events-none"
            loading="lazy"
          />
        </figure>

        {/* CARA FRONTAL */}
        <figure className="absolute inset-0 h-full w-full border-charred-umber border-2 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <img
            src={card.frontImage}
            alt={card.name}
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
