import { Suspense } from 'react';
import type { PredictionData } from '../../../types/prediction.types';
import CardFlipModal from './CardFlipModal';
import BlurText from '../BlurText';
import { motion } from 'motion/react';

interface Props {
  dataPrediction: PredictionData | null;
  onNewPrediction: () => void;
  messagePrediction: string;
  tonePrediction: string;
}

const Modal = ({ dataPrediction, onNewPrediction, messagePrediction, tonePrediction }: Props) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };

  if (!dataPrediction) {
    return;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        exit={{ opacity: 0 }}
        onClick={handleStopPropagation}
        className="w-full min-h-screen bg-black/50 fixed top-0 bottom-0 left-0 flex justify-center items-center z-50 p-2">
        <div
          className="max-w-5xl flex flex-col items-center justify-center bg-[#1B140E]/95 rounded-3xl py-5 px-6 md:py-10 md:px-12 gap-5">
          <h2 className="relative text-3xl md:text-6xl font-bold text-center font-cardo text-old-gold uppercase p-4">
            Tus cartas
            <span className='absolute top-1/2 -left-6 w-1 h-1 rounded-full bg-old-gold'></span>
            <span className='absolute top-1/2 -right-6 w-1 h-1 rounded-full bg-old-gold'></span>
          </h2>

          <div className="relative flex flex-col justify-evenly items-center borders-cards-list py-4 gap-14 md:gap-20">

            <div className="w-full">
              <div className="flex justify-around py-2">
                {dataPrediction?.message_alternative?.map(message => (
                  <p
                    className="font-playfair-display text-2xl md:text-3xl font-semibold text-ashen-gray"
                    key={message.position}>
                    {message.position}
                  </p>
                ))}
              </div>

              <div className="flex justify-around">
                {dataPrediction?.cards?.map(card => (
                  <CardFlipModal
                    key={card.id}
                    imageUrl={`${apiUrl}/static/${card.name}.jpg`}
                    cardName={card.name}
                    backText={card.meaning}
                  />
                ))}
              </div>
            </div>

            <div className=" flex flex-col justify-center items-center md:gap-2">
              <h3 className="text-2xl md:text-3xl relative font-playfair-display text-old-gold">
                Tu predicción es <span className="font-bold text-bone-white">{tonePrediction}</span>
                <span className='absolute top-1/2 -left-6 w-1 h-1 rounded-full bg-old-gold'></span>
                <span className='absolute top-1/2 -right-6 w-1 h-1 rounded-full bg-old-gold'></span>
              </h3>
              <BlurText
                text={messagePrediction}
                delay={150}
                animateBy="words"
                direction="top"
                onAnimationComplete={handleAnimationComplete}
                className="font-crimson-pro  text-xl md:text-2xl justify-center"
              />
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px var(--color-old-gold)", cursor: "pointer", borderColor: "var(--color-old-gold)", color: "var(--color-old-gold)" }}
            whileTap={{ scale: 0.95 }}
            className="text-bone-white w-48 h-11 border rounded-3xl font-cardo text-xl"
            onClick={onNewPrediction}>
            Nueva Predicción
          </motion.button>
        </div>
      </motion.div>
    </Suspense>
  );
};

export default Modal;
