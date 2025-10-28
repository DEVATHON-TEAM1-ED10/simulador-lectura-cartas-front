import { useEffect, useState } from 'react';
import Card from './Card';
import CardFlip from './CardFlip';
import IMG1 from '../../assets/card-front/img1.png';

interface TarotCard {
  id: string;
  name: string;
  description: string;
  frontImage: string;
  backImage: string;
}

const allCards: TarotCard[] = [
  {
    id: '1',
    name: 'El Loco',
    description: 'descripción',
    frontImage: '../../src/assets/card-front/img1.png',
    backImage: '../../src/assets/card-back/CARD_BACK.svg',
  },
  {
    id: '2',
    name: 'El Mago',
    description: 'descripción',
    frontImage: '../../src/assets/card-front/img2.png',
    backImage: '../../src/assets/card-back/CARD_BACK.svg',
  },
  {
    id: '3',
    name: 'La Sacerdotisa',
    description: 'descripción',
    frontImage: '../../src/assets/card-front/img3.png',
    backImage: '../../src/assets/card-back/CARD_BACK.svg',
  },
  {
    id: '4',
    name: 'La Emperatriz',
    description: 'descripción',
    frontImage: { IMG1 },
    backImage: '../../src/assets/card-back/CARD_BACK.svg',
  },
  {
    id: '5',
    name: 'El Emperador',
    description: 'descripción',
    frontImage: { IMG1 },
    backImage: '../../src/assets/card-back/CARD_BACK.svg',
  },
  {
    id: '6',
    name: 'El Hierofante',
    description: 'descripción',
    frontImage: { IMG1 },
    backImage: '../../src/assets/card-back/CARD_BACK.svg',
  },
  {
    id: '7',
    name: 'Los Enamorados',
    description: 'descripción',
    frontImage: { IMG1 },
    backImage: '../../src/assets/card-back/CARD_BACK.svg',
  },
  {
    id: '8',
    name: 'El Carro',
    description: 'descripción',
    frontImage: { IMG1 },
    backImage: '../../src/assets/card-back/CARD_BACK.svg',
  },
  {
    id: '9',
    name: 'La Fuerza',
    description: 'descripción',
    frontImage: { IMG1 },
    backImage: '../../src/assets/card-back/CARD_BACK.svg',
  },
  {
    id: '10',
    name: 'El Ermitaño',
    description: 'descripción',
    frontImage: { IMG1 },
    backImage: '../../src/assets/card-back/CARD_BACK.svg',
  },
  {
    id: '11',
    name: 'La Rueda de la Fortuna',
    description: 'descripción',
    frontImage: { IMG1 },
    backImage: '../../src/assets/card-back/CARD_BACK.svg',
  },
  {
    id: '12',
    name: 'La Justicia',
    description: 'descripción',
    frontImage: { IMG1 },
    backImage: '../../src/assets/card-back/CARD_BACK.svg',
  },
  {
    id: '13',
    name: 'El Colgado',
    description: 'descripción',
    frontImage: { IMG1 },
    backImage: '../../src/assets/card-back/CARD_BACK.svg',
  },
  {
    id: '14',
    name: 'La Muerte',
    description: 'descripción',
    frontImage: { IMG1 },
    backImage: '../../src/assets/card-back/CARD_BACK.svg',
  },
  {
    id: '15',
    name: 'La Templanza',
    description: 'descripción',
    frontImage: { IMG1 },
    backImage: '../../src/assets/card-back/CARD_BACK.svg',
  },
  {
    id: '16',
    name: 'El Diablo',
    description: 'descripción',
    frontImage: { IMG1 },
    backImage: '../../src/assets/card-back/CARD_BACK.svg',
  },
  {
    id: '17',
    name: 'La Torre',
    description: 'descripción',
    frontImage: { IMG1 },
    backImage: '../../src/assets/card-back/CARD_BACK.svg',
  },
  {
    id: '18',
    name: 'La Estrella',
    description: 'descripción',
    frontImage: { IMG1 },
    backImage: '../../src/assets/card-back/CARD_BACK.svg',
  },
  {
    id: '19',
    name: 'La Luna',
    description: 'descripción',
    frontImage: { IMG1 },
    backImage: '../../src/assets/card-back/CARD_BACK.svg',
  },
  {
    id: '20',
    name: 'El Sol',
    description: 'descripción',
    frontImage: { IMG1 },
    backImage: '../../src/assets/card-back/CARD_BACK.svg',
  },
  {
    id: '21',
    name: 'El Juicio',
    description: 'descripción',
    frontImage: { IMG1 },
    backImage: '../../src/assets/card-back/CARD_BACK.svg',
  },
  {
    id: '22',
    name: 'El Mundo',
    description: 'descripción',
    frontImage: { IMG1 },
    backImage: '../../src/assets/card-back/CARD_BACK.svg',
  },
];
const MAX_SELECCTIONS = 3;

const Cards = () => {
  const [selectedCardIds, setSelectedCardIds] = useState<string[]>([]);
  const isPredictionReady: boolean = selectedCardIds.length === MAX_SELECCTIONS;

  const [isDisabledReset, setIsDisabledReset] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (isPredictionReady) {
      timer = setTimeout(() => setShowButton(true), 5000);
    }

    return () => clearTimeout(timer);
  }, [isPredictionReady]);

  const handleCardClick = (cardId: string) => {
    setSelectedCardIds(prevSelectedIds => {
      if (prevSelectedIds.includes(cardId)) {
        return prevSelectedIds.filter(id => id !== cardId);
      } else {
        if (prevSelectedIds.length < MAX_SELECCTIONS) {
          return [...prevSelectedIds, cardId];
        }
        return prevSelectedIds;
      }
    });
  };

  const handlePrediction = () => {
    if (isPredictionReady) {
      console.log('Cartas seleccionadas para la predicción:', selectedCardIds);
      const selectedCards: TarotCard[] = allCards.filter(card =>
        selectedCardIds.includes(card.id)
      );
      console.log('Detalles de las cartas seleccionadas:', selectedCards);
      alert(
        `Has seleccionado: ${selectedCards.map(c => c.name).join(',')}. Revisa la consola para más detalles.`
      );
      setIsDisabledReset(true);
    } else {
      console.log(
        `Selecciona ${MAX_SELECCTIONS} cartas para obtener una predicción.`
      );
    }
  };

  const filterSelectedCards = allCards.filter(item =>
    selectedCardIds.includes(item.id)
  );

  const handleReset = () => {
    setSelectedCardIds([]);
    setIsDisabledReset(false);
    setShowButton(false);
  };

  return (
    <>
      <div className="h-dvh">
        <div className="h-60 flex flex-col justify-evenly items-center">
          <h1 className="text-6xl font-cardo text-old-gold">
            Lectura de Cartas
          </h1>
          <p className="text-2xl font-playfair-display">
            Descubre los secretos que las cartas tienen para relevarte.
          </p>

          <p className="text-2xl font-cardo">
            Elige
            <span
              className={`inline-flex items-center justify-center w-16 h-16 rounded-full font-bold text-4xl border mx-2 ${isPredictionReady ? 'bg-old-gold text-charred-umber border-old-gold' : 'bg-gray-400 text-gray-700 border-gray-400'}`}>
              {selectedCardIds.length}
            </span>
            de
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full font-bold text-4xl border mx-2 text-old-gold border-old-gold">
              {MAX_SELECCTIONS}
            </span>
            cartas
          </p>
        </div>

        <div className="w-full flex flex-col items-center relative">
          {selectedCardIds.length === 3 ? (
            <div
              className="w-[500px] h-[500px] grid grid-cols-3 place-items-center mb-8 relative before:absolute before:left-0 before:right-0 before:top-0 before:h-[2px]
                before:bg-gradient-to-r before:from-transparent before:via-old-gold before:to-transparent
                after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px]
                after:bg-gradient-to-r after:from-transparent after:via-old-gold after:to-transparent">
              {filterSelectedCards.map((card: TarotCard, index) => (
                <CardFlip key={card.id} card={card} index={index} />
              ))}
            </div>
          ) : (
            <div
              className="w-[1000px] h-[500px] grid grid-cols-12 place-items-center mb-8 relative before:absolute before:left-0 before:right-0 before:top-0 before:h-[2px]
                before:bg-gradient-to-r before:from-transparent before:via-old-gold before:to-transparent
                after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px]
                after:bg-gradient-to-r after:from-transparent after:via-old-gold after:to-transparent">
              {allCards.map((card: TarotCard) => (
                <Card
                  key={card.id}
                  card={card}
                  onClick={handleCardClick}
                  isSelected={selectedCardIds.includes(card.id)}
                  isDisabled={
                    !selectedCardIds.includes(card.id) &&
                    selectedCardIds.length === MAX_SELECCTIONS
                  }
                />
              ))}
            </div>
          )}
        </div>

        <div className="w-full mt-6 text-center">
          {showButton && (
            <button
              onClick={handlePrediction}
              disabled={!isPredictionReady}
              className={`w-48 h-11 border-1 rounded-4xl font-cardo text-xl transition-colors
              ${isPredictionReady ? 'bg-old-gold text-charred-umber hover:bg-goldenrod hover:text-white cursor-pointer' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}>
              Predicción
            </button>
          )}
          {isDisabledReset && (
            <button
              onClick={handleReset}
              className="w-48 h-11 ml-10  border-1 rounded-4xl font-cardo text-xl transition-colors bg-gray-400 text-gray-700">
              Nueva Lectura
            </button>
          )}
        </div>
      </div>
    </>
  );
};
export default Cards;
