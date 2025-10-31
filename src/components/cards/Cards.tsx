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
  const [selectedCardIds, setSelectedCardIds] = useState<number[]>([]);
  const isPredictionReady: boolean = selectedCardIds.length === MAX_SELECCTIONS;

  const { dataCards, loading, error } = useAllCards();
  const { isOpen, openModal, closeModal } = useModal();

  const [showButton, setShowButton] = useState(false);
  const [dataPrediction, setDataPrediction] = useState<PredictionData | null>(
    null
  );

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (isPredictionReady) {
      timer = setTimeout(() => setShowButton(true), 3000);
    }

    return () => clearTimeout(timer);
  }, [isPredictionReady]);

  const handleCardClick = (cardId: number) => {
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
    const selectedCards: TarotCardAPI[] = dataCards.filter(item =>
      selectedCardIds.includes(item.card.id)
    );
    const card_ids = selectedCards.map(c => c.card.id);

    try {
      const response = await api.post('/predictions', { card_ids });
      setDataPrediction(response.data);
      openModal();
    } catch (error) {
      console.error('Error en Predicción:', error);
    }

  };

  const filterSelectedCards = dataCards.filter(item =>
    selectedCardIds.includes(item.card.id)
  );

  const handleReset = () => {
    setSelectedCardIds([]);
    setShowButton(false);
    closeModal();
  };

  if (loading) {
    return (
      <div className="w-full h-dvh absolute flex justify-center items-center backdrop-blur-sm bg-black/30 z-50">
        <Spinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-dvh absolute flex justify-center items-center backdrop-blur-sm bg-black/30 z-50">
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
            {filterSelectedCards.map((item: TarotCardAPI, index: number) => (
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
                <CardFlip key={item.card.id} card={item.card} index={index} />
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
            <motion.div
              transition={{ duration: 1 }}
              exit={{ opacity: 0, y: 50 }}
              className='hidden relative w-full lg:grid grid-cols-11 place-content-center borders-cards-list gap-4 md:py-11'>
              {dataCards.map((item: TarotCardAPI, index: number) => (
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
                    key={item.card.id}
                    card={item.card}
                    onClick={handleCardClick}
                    isSelected={selectedCardIds.includes(item.card.id)}
                    isDisabled={
                      !selectedCardIds.includes(item.card.id) &&
                      selectedCardIds.length === MAX_SELECCTIONS
                    }
                  />
                </motion.div>
              ))}
            </motion.div>
          </>
        )}

        {showButton && (
          <motion.button
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1.4,
            }}
            onClick={handlePrediction}
            disabled={!isPredictionReady}
            className={`absolute z-10 bottom-16 md:bottom-9 button_outline w-48 h-11 border-1 rounded-full font-cardo text-xl transition-colors
    ${isPredictionReady ? 'text-bone-white hover:bg-ashen-gray/20 hover:text-white cursor-pointer' : 'text-charred-umber cursor-not-allowed'}`
            }>

            {isPredictionReady && (
              <>
                <motion.span
                  className='absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-old-gold shadow-[0_0_8px_2px_rgba(212,175,55,0.6)]'
                  animate={{
                    opacity: [1, 0.6, 1],
                    scale: [1, 1.2, 1],
                    x: [0, 80, 80, 0, -80, -80, 0],
                    y: [0, -20, 20, 40, 20, -20, 0],
                  }}
                  transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 1
                  }}
                  style={{ marginLeft: '-4px', marginTop: '-4px' }}
                />

                <motion.span
                  className='absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-bone-white shadow-[0_0_6px_2px_rgba(255,255,255,0.5)]'
                  animate={{
                    x: [0, -70, -70, 0, 70, 70, 0],
                    y: [0, 25, -25, -35, -25, 25, 0],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ marginLeft: '-3px', marginTop: '-3px' }}
                />

                <motion.span
                  className='absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-old-gold shadow-[0_0_5px_1px_rgba(212,175,55,0.7)]'
                  animate={{
                    x: [0, 60, 0, -60, 0],
                    y: [0, -30, -40, -30, 0],
                  }}
                  transition={{
                    duration: 13.5,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 1
                  }}
                  style={{ marginLeft: '-2px', marginTop: '-2px' }}
                />

                <motion.span
                  className='absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-bone-white/80 shadow-[0_0_6px_1px_rgba(255,255,255,0.4)]'
                  animate={{
                    x: [0, -50, 0, 50, 0],
                    y: [0, 30, 35, 30, 0],
                  }}
                  transition={{
                    duration: 14.5,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 1.5,
                  }}
                  style={{ marginLeft: '-3px', marginTop: '-3px' }}
                />

                <span className='absolute top-1/2 -left-6 w-1 h-1 rounded-full bg-old-gold'></span>
                <span className='absolute top-1/2 -right-6 w-1 h-1 rounded-full bg-old-gold'></span>
              </>
            )}

            Predicción
          </motion.button>
        )}
      </div>
      {isOpen && <Modal dataPrediction={dataPrediction} onNewPrediction={handleReset} />}
    </>
  );
};
export default Cards;
