import { useEffect, useState } from 'react';
import Card from './Card';
import CardFlip from './CardFlip';
import useAllCards from '../../hooks/useAllCards';
import type { TarotCardAPI } from '../../types/carts-types';
import Spinner from '../common/Spinner';
import { api } from '../../api/axios';
import Modal from '../common/modal/Modal';
import useModal from '../../hooks/useModal';
import type { PredictionData } from '../../types/prediction.types';
import { motion } from "motion/react"
import CardsMobile from './CardsMobile';

const MAX_SELECCTIONS = 3;

const Cards = () => {
  const [selectedCardIds, setSelectedCardIds] = useState<string[]>([]);
  const isPredictionReady: boolean = selectedCardIds.length === MAX_SELECCTIONS;

  const { dataCards, loading, error } = useAllCards();
  const { isOpen, openModal, closeModal } = useModal();

  const [isDisabledReset, setIsDisabledReset] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [dataPrediction, setDataPrediction] = useState<PredictionData | null>(
    null
  );

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
    const selectedCards: TarotCardAPI[] = dataCards.filter(card =>
      selectedCardIds.includes(card.id)
    );
    const card_ids = selectedCards.map(c => c.id);

    try {
      const response = await api.post('/predictions', { card_ids });
      setDataPrediction(response.data);
      openModal();
    } catch (error) {
      console.error('Error en Predicción:', error);
    }

    setIsDisabledReset(true);
  };

  const filterSelectedCards = dataCards.filter(item =>
    selectedCardIds.includes(item.id)
  );

  const handleReset = () => {
    setSelectedCardIds([]);
    setIsDisabledReset(false);
    setShowButton(false);
  };

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
      <div className="w-full flex flex-col items-center justify-center gap-8">
        <motion.div
          initial={{
            opacity: 0,
            y: -60,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1.5,
          }}
          className="w-full text-center flex flex-col gap-5">

          <h1 className="text-4xl font-bold font-cardo text-old-gold uppercase md:text-5xl lg:text-6xl">
            Lectura de Cartas
          </h1>
          <p className="text-lg font-medium font-playfair-display md:text-2xl lg:text-3xl">
            Descubre los secretos que las cartas tienen para relevarte.
          </p>

          <div className="font-cardo relative flex items-center justify-center gap-16 p-8">
            <div className="text-2xl md:text-4xl">
              Elige
            </div>

            <div className="circle-outline relative flex items-center justify-center">
              <div className={`text-5xl font-semibold z-10 ${selectedCardIds.length > 0 ? 'text-bone-white' : 'text-charred-umber'}`}>
                {selectedCardIds.length}
              </div>
              <span className='absolute -left-12 w-1 h-1 rounded-full bg-old-gold'></span>
              <span className='absolute -right-12 w-1 h-1 rounded-full bg-old-gold'></span>
              <span className='absolute -bottom-9 w-1 h-1 rounded-full bg-old-gold'></span>
              <span className='absolute -top-9 w-1 h-1 rounded-full bg-old-gold'></span>
            </div>

            <div className="text-2xl md:text-4xl">
              cartas
            </div>
          </div>
        </motion.div>

        {selectedCardIds.length === 3 && (
          <div
            className='relative grid grid-cols-3 place-items-center gap-8 lg:gap-30 lg:flex lg:flex-row lg:justify-center py-7'>
            {filterSelectedCards.map((card: TarotCardAPI, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{
                  opacity: 0,
                  y: -100,
                  x: index === 0 ? -100 : index === 2 ? 100 : 0,
                  rotate: index === 0 ? -15 : index === 2 ? 15 : 0,
                  pointerEvents: 'none',
                }}
                animate={{
                  opacity: 1,
                  y: index === 1 ? -10 : 0,
                  x: index === 0 ? 30 : index === 2 ? -30 : 0,
                  rotate: index === 0 ? -15 : index === 2 ? 15 : 0,
                  zIndex: index === 1 ? 1 : 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.5,
                }}
              >
                <CardFlip key={card.id} card={card} index={index} />
              </motion.div>
            ))}
          </div>
        )}

        {selectedCardIds.length < 3 && (
          <>
            <CardsMobile
              cards={dataCards}
              onCardClick={handleCardClick}
              selectedCardIds={selectedCardIds}
              className='lg:hidden'
            />
            <div
              className='hidden relative w-full lg:grid grid-cols-11 place-content-center borders-cards-list gap-4 md:py-11'>
              {dataCards.map((card: TarotCardAPI, index: number) => (
                <motion.div
                  key={index}
                  className="relative cursor-pointer"
                  style={{ zIndex: index }}
                  initial={{
                    opacity: 0,
                    x: -500,
                    y: -100,
                    rotate: -15,
                    scale: 0.8
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                    rotate: 0,
                    scale: 1
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                >
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
                </motion.div>
              ))}
            </div>
          </>
        )}

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
      {isOpen && <Modal dataPrediction={dataPrediction} close={closeModal} />}
    </>
  );
};
export default Cards;
