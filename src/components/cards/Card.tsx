import type { TarotCardAPI } from '../../types/carts-types';

interface CardProps {
  card: TarotCardAPI;
  onClick: (Cardid: string) => void;
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
    'w-[120px] h-[190px]  bg-dark-halloween border-charred-umber border-2 cursor-pointer transition-transform duration-300';
  const selectedClasses =
    'border-2 border-old-gold scale-110 transform -translate-y-4 shadow-lg';
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
      className={finalClasses}>
      <figure className="w-[120px] h-[190px">
        <img
          src={imageUrlCardBack}
          alt="Reverso de la carta"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </figure>
    </div>
  );
};
export default Card;
