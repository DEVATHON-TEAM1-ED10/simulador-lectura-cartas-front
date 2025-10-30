import { useState } from 'react';

interface Props {
  imageUrl: string;
  cardName: string;
  backText: string;
}

const CardFlipModal = ({ imageUrl, cardName, backText }: Props) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="[perspective:1000px]" onClick={handleFlip}>
      <div
        className={`w-[160px] h-[250px] relative transition-all duration-700 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}>
        <figure className=" absolute inset-0 [backface-visibility:hidden] rounded-xl ">
          <img
            src={imageUrl}
            alt="Frente de la carta"
            loading="lazy"
            className="w-full h-full object-contain rounded-xl"
          />
          <figcaption className="text-center mt-2 text-lg">
            {cardName}
          </figcaption>
        </figure>

        <div className="absolute top-0 bottom-0 h-[280px]  rounded-xl bg-dark-halloween flex flex-col justify-center items-center p-4  [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <h5 className="text-lg pb-1">{cardName}</h5>
          <p className="text-old-gold text-center font-cardo">{backText}</p>
        </div>
      </div>
    </div>
  );
};

export default CardFlipModal;
