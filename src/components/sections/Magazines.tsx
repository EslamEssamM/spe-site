import { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useAnimation,
  useInView,
} from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
import { Link } from "@tanstack/react-router";
import { topMagazines as magazines } from "@/data/magazines"; // Import the magazines data

export default function PerfectedMagazinesSectionWithParticles() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const nextMagazine = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % magazines.length);
  };

  const prevMagazine = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + magazines.length) % magazines.length
    );
  };
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine as any);
  }, []);

  return (
    <>
      <section
        id="magazines"
        className="py-12 md:py-16  bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden relative"
      >
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            fullScreen: { enable: false },
            background: {
              color: {
                value: "transparent",
              },
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: false,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              collisions: {
                enable: true,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 1,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.2,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
            detectRetina: true,
          }}
          className="absolute inset-0"
        />
        <div className="container mx-auto px-4 relative" ref={ref}>
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-16 text-center text-white"
            initial={{ opacity: 0, y: -50 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: "easeOut" },
              },
            }}
          >
            Our Publications
          </motion.h2>
          <div className="relative h-[800px]  md:h-[600px]">
            <AnimatePresence initial={false}>
              {magazines.map((magazine, index) => (
                <motion.div
                  key={magazine.title}
                  className={`absolute top-0 left-0 right-0 ${
                    index === currentIndex ? "z-20" : "z-10"
                  }`}
                  initial={{ opacity: 0, x: 300 }}
                  animate={{
                    opacity: index === currentIndex ? 1 : 0,
                    x:
                      index === currentIndex
                        ? 0
                        : index < currentIndex
                          ? -300
                          : 300,
                    scale: index === currentIndex ? 1 : 0.8,
                  }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <Card
                    className={`bg-gradient-to-br ${magazine.color} text-white overflow-hidden shadow-2xl`}
                  >
                    <CardContent className="p-8 md:p-12 flex flex-col md:flex-row  items-center">
                      <div className="w-full md:w-1/2 mb-8 md:mb-0 md:mr-8">
                        <img
                          src={magazine.cover}
                          alt={magazine.title}
                          className="w-full md:w-2/3 h-max-content rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <div className="w-full md:w-1/2">
                        <h3 className="text-3xl md:text-4xl font-bold mb-4">
                          {magazine.title}
                        </h3>
                        <p className="text-xl mb-4 opacity-90">
                          {magazine.issue}
                        </p>
                        <p className="text-lg mb-8">{magazine.description}</p>
                        <div className="flex space-x-4">
                          <Link to={`/magazine/${magazine.id}`}>
                            <Button variant="outline" className="flex-1">
                              <ExternalLink className="mr-2 h-4 w-4" /> Read
                              Online
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 text-white"
              onClick={prevMagazine}
            >
              <ChevronLeft size={24} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 text-white"
              onClick={nextMagazine}
            >
              <ChevronRight size={24} />
            </Button>
          </div>
        </div>
      </section>
      <div className="flex justify-center mt-8 space-x-2">
        {magazines.map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            className={`w-3 h-3 rounded-full p-0 ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
      <motion.div
        className="my-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Link to="/magazines">
          <Button
            variant="outline"
            size="lg"
            className="border-white hover:bg-white hover:text-gray-900"
          >
            <span className="mr-2">Explore Magazine Archive</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </Link>
      </motion.div>
    </>
  );
}
