import BACK from '../../assets/card-back/CARD_BACK.svg';

interface TarotCard {
  id: string;
  name: string;
  description: string;
}

interface CardProps {
  card: TarotCard;
  onClick: (Cardid: string) => void;
  isSelected: boolean;
  isDisabled: boolean;
}

const Card:React.FC<CardProps> = ({card, onClick, isSelected, isDisabled}) => {
  const baseClasses = 'w-[120px] h-[190px] border-charred-umber border-2 cursor-pointer transition-transform duration-300';
  const selectedClasses = 'border-4 border-green-500 scale-110 transform -translate-y-4 shadow-lg';
  const disabledClasses = 'opacity-50 cursor-not-allowed';
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
    <div onClick={!isDisabled ? () => onClick(card.id):undefined }
      className={finalClasses}
      title = {card.name}
    >
      <div>
        <figure className="w-[120px] h-[190px] border-charred-umber border-2">
          <img src={BACK} alt="carta" className="w-full h-full object-cover" />
        </figure>
      </div>
    </div>
  );
};
export default Card;
