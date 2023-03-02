import Image from "next/image";
import Link from "next/link";
import { MutableRefObject, useCallback, useRef, useState } from "react";
import { Autoplay, Controller, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

import useSliderAutoplay from "@hooks/useSliderAutoplay";
import useWindowDimensions from "@hooks/useWindowDimensions";
import { useHeroSliderInit } from "@state/index";
import React, { useEffect } from "react";
import { HeroSliderProps } from "src/types";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowNav from "./ArrowNav";
import DownSliderWrapper from "./DownSliderWrapper";
import MobileDownSlider from "./MobileDownSlider";
import NumberSlider from "./NumberSlider";
import SmallerImageSlider from "./SmallerImageSlider";
import TextSlider from "./TextSlider";
import { homeSliderData } from "src/constant/slider";
import LazyLoad from "react-lazy-load";

const MultipleSwiperSliderSync = ({}: HeroSliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const [controlledSwiper, setControlledSwiper] =
    useState<React.SetStateAction<null | any>>(null);
  const [controlledSwiper2, setControlledSwiper2] =
    useState<React.SetStateAction<null | any>>(null);
  const [controlledSwiper3, setControlledSwiper3] =
    useState<React.SetStateAction<null | any>>(null);
  const [controlledSwiper4, setControlledSwiper4] =
    useState<React.SetStateAction<null | any>>(null);
  const [controlledSwiper5, setControlledSwiper5] =
    useState<React.SetStateAction<null | any>>(null);

  const sliderRef = useRef<any>(null);
  const progressRef = useRef<any>(null);
  const mobileProgressRef = useRef<any>(null);
  const { width }: any = useWindowDimensions();
  const { pauseAutoplay, resumeAutoplay, resetDelayTimer } =
    useSliderAutoplay(sliderRef);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    // @ts-ignore
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    // @ts-ignore
    sliderRef.current.swiper.slideNext();
  }, []);

  const navigationNextElement = useRef<MutableRefObject<any>>(null);
       
  // Jotai State
  const [heroSliderInit, setHeroSliderInit] = useHeroSliderInit();

  const hasC =
    controlledSwiper &&
    controlledSwiper2 &&
    controlledSwiper3 &&
    controlledSwiper4 &&
    controlledSwiper5;

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => (prev += 1));
    }, 10);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="h-[100svh]">
      <div
        className="space-y-5 relative z-[3] group h-full _mobileSliderTrigger lg:h-[calc(100vh-140px)]"
        onMouseEnter={() => {
          if (width >= 1024) {
            pauseAutoplay();
            // sliderRef.current.swiper.autoplay.pause();
            progressRef.current.style.animationPlayState = "paused";
            mobileProgressRef.current.style.animationPlayState = "paused";
          }
        }}
        onMouseLeave={() => {
          if (width >= 1024) {
            // sliderRef.current.swiper.autoplay.run();
            resumeAutoplay();
            progressRef.current.style.animationPlayState = "running";
            mobileProgressRef.current.style.animationPlayState = "running";
          }
        }}
      > 
        <div className="h-full w-full absolute right-0 top-0 heroControllerSlider rotate-180 !bg-[#000000]">
          <div className="w-full h-full -rotate-180">
            <Swiper
              // @ts-ignore
              ref={sliderRef}
              modules={[Controller, Navigation, Autoplay]}
              controller={
                hasC
                  ? {
                      control: [
                        controlledSwiper,
                        controlledSwiper2,
                        controlledSwiper3,
                        controlledSwiper4,
                        controlledSwiper5,
                      ],
                      by: "container",
                    }
                  : undefined
              }
              slidesPerView={1}
              loop
              slideToClickedSlide={true}
              // autoplay={{
              //   disableOnInteraction: false,
              //   pauseOnMouseEnter: true,
              //   delay: 6000,
              // }}
              autoplay={false}
              className="w-full h-full mySwiper2"
              onInit={(swiper: any) => {
                swiper.params.navigation.nextEl = "#smallImageSlider";
                swiper.navigation.init();
                swiper.navigation.update();
                setHeroSliderInit(true);
              }}
              onSlideChange={() => {
                resetDelayTimer();
                // @ts-ignore
                setActiveIndex(sliderRef?.current?.swiper?.activeIndex);
                document
                  .getElementById("_heroDownSliderProgressBar")
                  ?.classList.remove("_heroDownSliderProgressBarAnimation");
                document
                  .getElementById("_heroDownSliderProgressBar2")
                  ?.classList.remove("_heroDownSliderProgressBarAnimation");
                setTimeout(() => {
                  document
                    .getElementById("_heroDownSliderProgressBar")
                    ?.classList.add("_heroDownSliderProgressBarAnimation");
                }, 1);
                setTimeout(() => {
                  document
                    .getElementById("_heroDownSliderProgressBar2")
                    ?.classList.add("_heroDownSliderProgressBarAnimation");
                }, 1);

                window.addEventListener("blur", () => {
                  document
                    .getElementById("_heroDownSliderProgressBar")
                    ?.classList.remove("_heroDownSliderProgressBarAnimation");
                });
                window.addEventListener("focus", () => {
                  setTimeout(() => {
                    document
                      .getElementById("_heroDownSliderProgressBar")
                      ?.classList.add("_heroDownSliderProgressBarAnimation");
                  }, 1);
                });
              }}
            >
              {homeSliderData.map(
                ({ imageUrl, linkUrl, imageTitle, videoSrc, id }, i) => {
                  return (
                    <SwiperSlide key={"dhasjd_" + i}>
                      <Link href={linkUrl} passHref prefetch={false}>
                        <a
                          href="#"
                          className="inline-block h-full w-full relative slider-overlay"
                          aria-label="case study"
                        >
                          {videoSrc ? (
                            <>
                              <LazyLoad className="h-full w-full object-cover">
                                <video
                                  className="h-full w-full hidden lg:block object-cover"
                                  autoPlay
                                  muted
                                  loop={true}
                                  key={id}
                                  playsInline
                                  preload="none"
                                >
                                  <source src={videoSrc} />
                                </video>
                              </LazyLoad>
                              <div className="block lg:hidden">
                                <LazyLoad>
                                  <Image
                                    src={imageUrl}
                                    className="lg:group-hover:scale-125 duration-[400ms] ease-in-out w-full h-full opacity-[0.8]"
                                    alt={imageTitle}
                                    layout="fill"
                                    priority
                                  />
                                </LazyLoad>
                              </div>
                            </>
                          ) : (
                            <LazyLoad>
                              <Image
                                src={imageUrl}
                                className="object-cover block lg:group-hover:scale-125 duration-[400ms] ease-in-out w-full h-full opacity-[0.8]"
                                alt={imageTitle}
                                layout="fill"
                                priority
                              />
                            </LazyLoad>
                          )}
                        </a>
                      </Link>
                    </SwiperSlide>
                  );
                }
              )}
            </Swiper>        
            <TextSlider setControlledSwiper3={setControlledSwiper3} />
          </div>
        </div>
        <NumberSlider setControlledSwiper={setControlledSwiper} />
        <SmallerImageSlider
          ref={navigationNextElement}
          setControlledSwiper2={setControlledSwiper2}
        />
        <MobileDownSlider
          setControlledSwiper4={setControlledSwiper5}
          progressRef={mobileProgressRef}
        />
        <ArrowNav
          // ref={nextRef}
          activeIndex={activeIndex}
          handlePrev={handlePrev}
          handleNext={handleNext}
          setControlledSwiper2={setControlledSwiper2}
        />
      </div>
      <DownSliderWrapper
        setControlledSwiper4={setControlledSwiper4}
        progressRef={progressRef}
      />
    </div>
  );
};

export default MultipleSwiperSliderSync;
