import { Suspense } from 'react';
import type { PredictionData } from '../../../types/prediction.types';
import CardFlipModal from './CardFlipModal';
import BlurText from '../BlurText';
import { motion } from 'motion/react';

interface Props {
  dataPrediction: PredictionData | null;
  onNewPrediction: () => void;
}

const Modal = ({ dataPrediction, onNewPrediction }: Props) => {
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
          className="max-w-5xl flex flex-col items-center justify-center bg-[#1B140E]/95 rounded-3xl py-5 px-6 md:py-10 md:px-12 gap-8 ">
          <h2 className="relative text-3xl md:text-6xl font-bold text-center font-cardo text-old-gold uppercase">
            Tus cartas
            <span className='absolute top-1/2 -left-6 w-1 h-1 rounded-full bg-old-gold'></span>
            <span className='absolute top-1/2 -right-6 w-1 h-1 rounded-full bg-old-gold'></span>
          </h2>

          <div className="relative flex flex-col justify-evenly items-center borders-cards-list gap-7">

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

            <div className=" flex flex-col justify-center items-center">
              <h3 className="text-2xl md:text-3xl relative font-playfair-display text-old-gold">
                Tu predicción
                <span className='absolute top-1/2 -left-6 w-1 h-1 rounded-full bg-old-gold'></span>
                <span className='absolute top-1/2 -right-6 w-1 h-1 rounded-full bg-old-gold'></span>
              </h3>
              <div className="">
                {dataPrediction?.message_alternative?.map(message => (
                  <div
                    key={message.position}
                    className="text-2xl font-crimson-pro font-normal"
                  >
                    <motion.span
                      className="block text-center font-bold text-ashen-gray"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >{message.position}</motion.span>
                    <BlurText
                      text={message.text}
                      delay={150}
                      animateBy="words"
                      direction="top"
                      onAnimationComplete={handleAnimationComplete}
                      className="text-xl md:text-2xl justify-center"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            className="w-48 h-11 border rounded-3xl font-cardo text-xl hover:bg-occult-red transition-colors"
            onClick={onNewPrediction}>
            Cerrar
          </button>
        </div>
      </motion.div>
    </Suspense>
  );
};

export default Modal;
