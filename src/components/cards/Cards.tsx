import Card from './Card';

const Cards = () => {
  const allCards = [
    {
      id: '1',
      name: 'El Loco',
      description: 'descripción',
    },
    {
      id: '2',
      name: 'El Mago',
      description: 'descripción',
    },
    {
      id: '3',
      name: 'La Sacerdotisa',
      description: 'descripción',
    },
    {
      id: '4',
      name: 'La Emperatriz',
      description: 'descripción',
    },
    {
      id: '5',
      name: 'El Emperador',
      description: 'descripción',
    },
    {
      id: '6',
      name: 'El Hierofante',
      description: 'descripción',
    },
    {
      id: '7',
      name: 'Los Enamorados',
      description: 'descripción',
    },
    {
      id: '8',
      name: 'El Carro',
      description: 'descripción',
    },
    {
      id: '9',
      name: 'La Fuerza',
      description: 'descripción',
    },
    {
      id: '10',
      name: 'El Ermitaño',
      description: 'descripción',
    },
    {
      id: '11',
      name: 'La Rueda de la Fortuna',
      description: 'descripción',
    },
    {
      id: '12',
      name: 'La Justicia',
      description: 'descripción',
    },
    {
      id: '13',
      name: 'El Colgado',
      description: 'descripción',
    },
    {
      id: '14',
      name: 'La Muerte',
      description: 'descripción',
    },
    {
      id: '15',
      name: 'La Templanza',
      description: 'descripción',
    },
    {
      id: '16',
      name: 'El Diablo',
      description: 'descripción',
    },
    {
      id: '17',
      name: 'La Torre',
      description: 'descripción',
    },
    {
      id: '18',
      name: 'La Estrella',
      description: 'descripción',
    },
    {
      id: '19',
      name: 'La Luna',
      description: 'descripción',
    },
    {
      id: '20',
      name: 'El Sol',
      description: 'descripción',
    },
    {
      id: '21',
      name: 'El Juicio',
      description: 'descripción',
    },
    {
      id: '22',
      name: 'El Mundo',
      description: 'descripción',
    },
  ];

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
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full font-bold text-4xl border mx-2">
              3
            </span>
            cartas
          </p>
        </div>

        <div className="w-full flex flex-col items-center relative">
          <div
            className="w-[1000px] h-[500px] grid grid-cols-12 place-items-center before:absolute before:left-0 before:right-0 before:top-0 before:h-[2px]
                before:bg-gradient-to-r before:from-transparent before:via-old-gold before:to-transparent
                after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px]
                after:bg-gradient-to-r after:from-transparent after:via-old-gold after:to-transparent">
            {allCards.map(card => (
              <Card key={card.id} />
            ))}
          </div>
        </div>

        <div className="w-full mt-6 text-center">
          <button className="w-48 h-11 border-1 rounded-4xl font-cardo text-xl">
            Predicción
          </button>
        </div>
      </div>
    </>
  );
};
export default Cards;
