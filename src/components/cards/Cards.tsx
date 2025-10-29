import { useEffect, useState } from 'react';
import Card from './Card';
import CardFlip from './CardFlip';
import useAllCards from '../../hooks/useAllCards';
import type { TarotCardAPI } from '../../types/carts-types';
import Spinner from '../common/Spinner';
import { api } from '../../api/axios';

const MAX_SELECCTIONS = 3;

const Cards = () => {
  const [selectedCardIds, setSelectedCardIds] = useState<string[]>([]);
  const isPredictionReady: boolean = selectedCardIds.length === MAX_SELECCTIONS;

  const { dataCards, loading, error } = useAllCards();

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

  const handlePrediction = async () => {
    if (isPredictionReady) {
      console.log('Cartas seleccionadas para la predicción:', selectedCardIds);
      const selectedCards: TarotCardAPI[] = dataCards.filter(card =>
        selectedCardIds.includes(card.id)
      );
      const card_ids = selectedCards.map(c => c.id);

      try {
        const response = await api.post('/predictions', { card_ids });
        console.log(response.data);
      } catch (error) {
        console.error('Error en Predicción:', error);
      }

      //console.log('Detalles de las cartas seleccionadas:', selectedCards);
      //alert(
      //  `Has seleccionado: ${selectedCards.map(c => c.name).join(',')}. Revisa la consola para más detalles.`
      //);
      setIsDisabledReset(true);
    } else {
      console.log(
        `Selecciona ${MAX_SELECCTIONS} cartas para obtener una predicción.`
      );
    }
  };

  const filterSelectedCards = dataCards.filter(item =>
    selectedCardIds.includes(item.id)
  );

  const handleReset = () => {
    setSelectedCardIds([]);
    setIsDisabledReset(false);
    setShowButton(false);
  };

  const StyleContainerBase =
    'place-items-center mb-8 relative before:absolute before:left-0 before:right-0 before:top-0 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-old-gold before:to-transparentter:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] gradient-to-r after:from-transparent after:via-old-gold after:to-transparent';

  if (loading) {
    return (
      <div className="w-full h-dvh flex justify-center items-center backdrop-blur-sm bg-black/30 z-50">
        <Spinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-dvh flex justify-center items-center backdrop-blur-sm bg-black/30 z-50">
        <h1 className="text-6xl font-cardo text-old-gold">{error.message}</h1>
      </div>
    );
  }

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
          {selectedCardIds.length === 3 && (
            <div
              className={`${StyleContainerBase} w-[500px] h-[500px] grid grid-cols-3`}>
              {filterSelectedCards.map((card: TarotCardAPI, index) => (
                <CardFlip key={card.id} card={card} index={index} />
              ))}
            </div>
          )}

          {selectedCardIds.length < 3 && (
            <div
              className={`${StyleContainerBase} w-[1000px] h-[500px] grid grid-cols-12`}>
              {dataCards.map((card: TarotCardAPI) => (
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
