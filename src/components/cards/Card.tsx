import BACK from '../../assets/card-back/CARD_BACK.svg';

const Card = () => {
  return (
    <div>
      <div>
        <figure className="w-[120px] h-[190px] border-charred-umber border-2">
          <img src={BACK} alt="carta" className="w-full h-full object-cover" />
        </figure>
      </div>
    </div>
  );
};
export default Card;
