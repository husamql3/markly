"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import Spline from "@splinetool/react-spline";
import type { Application } from "@splinetool/runtime";

export const SplineAnimation = () => {
  const cube = useRef<Application | null>(null);

  return (
    <motion.div
      className="flex w-full justify-center"
      initial={{ y: 0 }}
      animate={{
        y: [0, -20, 0],
      }}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        times: [0, 0.5, 1],
      }}
    >
      <motion.div
        className="relative h-[500px] w-full overflow-hidden"
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
        animate={{
          rotateY: [0, 5, -5, 0],
        }}
        transition={{
          rotateY: {
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
        }}
      >
        <Spline
          scene="https://prod.spline.design/0Ts-kzyXin4fT011/scene.splinecode"
          style={{
            width: "100%",
            height: "100%",
          }}
          onLoad={(splineApp) => {
            cube.current = splineApp;
            if (cube.current) {
              try {
                // Disable zoom controls
                if (cube.current.controls) {
                  cube.current.controls.enableZoom = false;
                  cube.current.controls.enableDamping = true;
                  cube.current.controls.dampingFactor = 0.05;
                }

                cube.current.setZoom = () => {};

                // Scale up the cube to make it bigger
                const cubeObject = cube.current.findObjectByName("Cube");
                if (cubeObject) {
                  cubeObject.scale.set(1.5, 1.5, 1.5);
                }

                // Disable wheel events
                const canvas = cube.current.canvas;
                if (canvas) {
                  canvas.onwheel = null;
                  canvas.removeEventListener("wheel", () => {});

                  canvas.addEventListener(
                    "wheel",
                    (e) => {
                      e.preventDefault();
                      e.stopImmediatePropagation();
                      return false;
                    },
                    { passive: false, capture: true },
                  );
                }

                // Add continuous rotation animation to the cube
                const animateCube = () => {
                  if (cubeObject) {
                    cubeObject.rotation.y += 0.01;
                    cubeObject.rotation.x += 0.005;
                  }
                  requestAnimationFrame(animateCube);
                };
                animateCube();
              } catch (error) {
                console.log("Error configuring cube:", error);
              }
            }
          }}
        />
      </motion.div>
    </motion.div>
  );
};
