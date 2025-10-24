
"use client";
import React, { useEffect, useState } from "react";
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export const SparklesCore = (props: {
  id: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
}) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (init) {
      return;
    }
    loadSlim(tsParticles).then(() => {
      setInit(true);
    });
  }, [init]);

  useEffect(() => {
    if (!init) {
      return;
    }

    tsParticles.load({
      id: props.id,
      options: {
        background: {
          color: {
            value: props.background || "#000",
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
              enable: false,
              mode: "repulse",
            },
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
            value: props.particleColor || "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: false,
            opacity: 0.5,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "out",
            },
            random: false,
            speed: 0.3,
            straight: false,
          },
          number: {
            density: {
              enable: true,
            },
            value: props.particleDensity || 80,
          },
          opacity: {
            value: {
              min: 0.1,
              max: 0.5,
            },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: props.minSize || 1, max: props.maxSize || 3 },
          },
        },
        detectRetina: true,
      },
    });

    return () => {
       const container = tsParticles.dom().find(c => c.id === props.id);
       if (container) {
           container.destroy();
       }
    }
  }, [init, props]);

  return <div className={props.className} id={props.id}></div>;
};
