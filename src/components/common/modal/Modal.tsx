import type { PredictionData } from '../../../types/prediction.types';
import CardFlipModal from './CardFlipModal';

interface Props {
  dataPrediction: PredictionData | null;
  close: () => void;
}

const Modal = ({ dataPrediction, close }: Props) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  if (!dataPrediction) {
    return;
  }

  return (
    <div
      className="w-full min-h-screen bg-black/70 fixed top-0 bottom-0 left-0 flex justify-center items-center z-50 backdrop-blur-xs"
      onClick={close}>
      <div
        className="w-[90%] md:w-[1024px] h-[700px]  bg-dark-halloween rounded-3xl"
        onClick={handleStopPropagation}>
        <div className="h-full flex flex-col justify-evenly items-center p-4">
          <h2 className="text-5xl text-center font-cardo text-old-gold">
            Tus cartas
          </h2>

          <div className="w-full bg-occult-red rounded-xl p-4">
            <div className="flex justify-around py-2">
              {dataPrediction?.message_alternative?.map(message => (
                <p
                  className="text-xl font-bold text-antique-parchment"
                  key={message.position}>
                  {message.position}
                </p>
              ))}
            </div>

            <div className="min-h-72 flex justify-around">
              {dataPrediction?.cards?.map(card => (
                <CardFlipModal
                  key={card.id}
                  imageUrl={`${apiUrl}/static/${card.name}.jpg`}
                  cardName={card.name}
                  backText={card.meaning}
                />
              ))}

              {/*{dataPrediction?.cards?.map((card: Card) => (
                <figure key={card.id} className="w-[160px] h-[200px]">
                  <img
                    className="rounded-xl object-cover"
                    src={`${apiUrl}/static/${card.name}.jpg`}
                    alt={card.name}
                  />
                  <figcaption className="text-center mt-2">
                    {card.name}
                  </figcaption>
                </figure>
              ))}*/}
            </div>
          </div>

          <div className=" flex flex-col justify-evenly items-center">
            <h3 className="text-2xl font-cardo text-old-gold">Tu predicción</h3>
            <div className="w-11/12 text-center">
              <p>{dataPrediction?.message}</p>
            </div>
          </div>
          <button
            className="w-48 h-11 border rounded-3xl font-cardo text-xl hover:bg-occult-red transition-colors"
            onClick={close}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
