import './App.css';
import Cards from './components/cards/Cards';
import LightRays from './components/common/LightRays';
import Noise from './components/common/Noise';

function App() {
  return (
    <div className="min-h-dvh w-full flex flex-col items-center justify-center p-4 md:p-8 max-w-7xl m-auto overflow-x-hidden">
      <LightRays
        raysOrigin="top-right"
        raysSpeed={1.2}
        lightSpread={0.8}
        rayLength={1.2}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0.1}
        distortion={0.08}
        className='hidden md:block'
      />
      <Noise />
      <Cards />
    </div>
  );
}

export default App;
