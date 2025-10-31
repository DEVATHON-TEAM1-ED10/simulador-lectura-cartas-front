interface Props {
  imageUrl: string;
  cardName: string;
  backText: string;
}

const CardFlipModal = ({ imageUrl, cardName }: Props) => {
  return (
    <div className="[perspective:1000px]">
      <div
        className='w-[110px] h-[180px] md:w-[155px] md:h-[249px] relative'>
        <figure className="absolute inset-0">
          <img
            src={imageUrl}
            alt="Frente de la carta"
            loading="lazy"
            className="w-full h-full rounded-lg"
          />
          <figcaption className="font-cardo text-center text-md md:text-lg p-1">
            {cardName}
          </figcaption>
        </figure>
      </div>
    </div>
  );
};

export default CardFlipModal;
