import type { Card } from '../../types/prediction.types';
import Sparkles from '../common/Sparkles';

interface CardProps {
  card: Card;
  onClick: (Cardid: number) => void;
  isSelected: boolean;
  isDisabled: boolean;
}

const Card: React.FC<CardProps> = ({
  card,
  onClick,
  isSelected,
  isDisabled,
}) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const imageUrlCardBack = `${apiUrl}/static/CARD_BACK.svg`;

  const baseClasses =
    'w-[244px] h-[365px] relative cursor-pointer transition-transform duration-300 md:w-[120px] md:h-[200px] box-shadow-card rounded-lg';
  const selectedClasses =
    'scale-110 rounded-lg transform -translate-y-5 box-shadow-card selected';
  const disabledClasses = 'opacity-30 cursor-not-allowed pointer-events-none';
  const normalClasses = 'hover:scale-105';

  let finalClasses = baseClasses;

  if (isSelected) {
    finalClasses += ` ${selectedClasses}`;
  } else if (isDisabled) {
    finalClasses += ` ${disabledClasses}`;
  } else {
    finalClasses += ` ${normalClasses}`;
  }

  return (
    <div
      onClick={!isDisabled ? () => onClick(card.id) : undefined}
      className={finalClasses}
    >
      {isSelected && <Sparkles />}
      <figure className="w-full h-full">
        <img
          src={imageUrlCardBack}
          alt="Reverso de la carta"
          className="w-full h-full object-cover rounded-lg"
          loading="lazy"
        />
      </figure>
    </div>
  );
};
export default Card;
