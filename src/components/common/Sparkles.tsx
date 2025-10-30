import { Sparkle } from "lucide-react";

function Sparkles() {
  const sparkles = [
    { delay: 0, size: 14, top: -5, left: 20 },
    { delay: 0.2, size: 13, top: -8, left: 50 },
    { delay: 0.4, size: 15, top: -3, left: 80 },
    { delay: 0.6, size: 13, top: 25, left: -5 },
    { delay: 0.8, size: 14, top: 50, left: 105 },
    { delay: 1, size: 13, top: 75, left: -8 },
    { delay: 1.2, size: 15, top: 97, left: 25 },
    { delay: 1.4, size: 14, top: 100, left: 70 },
  ];
  return (
    <>
      {
        sparkles.map((sparkle, index) => (
          <div
            key={index}
            className="absolute pointer-events-none"
            style={{
              top: `${sparkle.top}%`,
              left: `${sparkle.left}%`,
              animation: `sparkle 1.5s ease-in-out ${sparkle.delay}s infinite`,
            }}
          >
            <Sparkle
              className="text-occult-red"
              style={{
                width: `${sparkle.size}px`,
                height: `${sparkle.size}px`,
              }}
            />
          </div>
        )
        )}
    </>
  );
}

export default Sparkles;
