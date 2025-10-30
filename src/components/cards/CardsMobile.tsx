import { motion } from "motion/react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/effect-cards";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "./Card";

const MAX_SELECCTIONS = 3;

interface CardsMobileProps {
  cards: any[];
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  spaceBetween?: number;
  onCardClick: (cardId: string) => void;
  selectedCardIds: string[];
}

function CardsMobile({
  cards,
  className,
  showPagination = false,
  showNavigation = true,
  loop = true,
  autoplay = false,
  spaceBetween = 0,
  onCardClick,
  selectedCardIds,
}: CardsMobileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 1.5,
        delay: 0.5,
      }}
      className={`${className || ''} relative w-full max-w-4xl`}
    >
      <Swiper
        spaceBetween={spaceBetween}
        autoplay={
          autoplay
            ? {
              delay: 1500,
              disableOnInteraction: true,
            }
            : false
        }
        effect="coverflow"
        grabCursor={true}
        slidesPerView="auto"
        centeredSlides={true}
        loop={loop}
        coverflowEffect={{
          rotate: 0,
          slideShadows: false,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={
          showPagination
            ? {
              clickable: true,
            }
            : false
        }
        navigation={
          showNavigation
            ? {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }
            : false
        }
        style={{
          width: "100%",
          height: "100%",
          padding: "40px 0",
          overflow: "visible",
          paddingBottom: "60px",
        }}
        modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index}
            style={{
              width: 'auto',
              height: 'auto',
              backgroundColor: "transparent",
              backgroundImage: `url(${card.imageUrl})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              boxShadow: "none",
              border: "0 solid black",
              borderRadius: "32px"
            }}>
            <Card
              key={card.id}
              card={card}
              onClick={onCardClick}
              isSelected={selectedCardIds.includes(card.id)}
              isDisabled={
                !selectedCardIds.includes(card.id) &&
                selectedCardIds.length === MAX_SELECCTIONS
              }
            />
          </SwiperSlide>
        ))}
        {showNavigation && (
          <div>
            <div className="swiper-button-next !text-transparent !w-[70px] after:hidden">
              <div className="transform -rotate-90 rounded-full">
                <img
                  className="w-full h-full fill-bone-white drop-shadow-lg drop-shadow-bone-white"
                  src="/src/assets/icons/down-arrow.svg" alt="Siguiente" />
              </div>
            </div>
            <div className="swiper-button-prev !w-[70px] !text-transparent after:hidden">
              <div className="text-white transform rotate-90">
                <img className="w-full h-full fill-bone-white drop-shadow-lg drop-shadow-bone-white" src="/src/assets/icons/down-arrow.svg" alt="Anterior" />
              </div>
            </div>
          </div>
        )}
      </Swiper>
    </motion.div>
  );
}

export default CardsMobile
