"use client";

/* eslint-disable @next/next/no-img-element */
import React from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

import { DailDevLogo, DailDevTextLogo } from "./svgs";

export default function Card() {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const glareRef = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const glareX = useMotionValue(0);
  const glareY = useMotionValue(0);
  const rotateY = useTransform(x, [0, 356], [15, -15]);
  const rotateX = useTransform(y, [0, 504], [-15, 15]);
  const rotateYSpring = useSpring(rotateY);
  const rotateXSpring = useSpring(rotateX);

  return (
    <motion.div
      className="w-full max-w-[356px] aspect-card rounded-32 relative overflow-hidden"
      onMouseMove={(e) => {
        if (!cardRef.current || !glareRef.current) return;
        const cardRect = cardRef.current.getBoundingClientRect();
        const glareRect = glareRef.current.getBoundingClientRect();
        x.set(e.clientX - cardRect.left);
        y.set(e.clientY - cardRect.top);
        glareX.set(e.clientX - cardRect.left - glareRect.width / 2);
        glareY.set(e.clientY - cardRect.top - glareRect.height / 2);
      }}
      onMouseLeave={() => {
        if (!cardRef.current || !glareRef.current) return;
        const cardRect = cardRef.current.getBoundingClientRect();
        x.set(cardRect.width / 2);
        y.set(cardRect.height / 2);
        glareX.set(-1000);
        glareY.set(-1000);
      }}
      ref={cardRef}
      style={{
        rotateY: rotateYSpring,
        rotateX: rotateXSpring,
      }}
    >
      <motion.div
        className="bg-gradient-radial from-white from-20% to-white/0 to-70% opacity-25 absolute size-[600px]"
        style={{
          x: glareX,
          y: glareY,
        }}
        ref={glareRef}
      />

      <div className="absolute inset-4 bg-white rounded-32 flex flex-col">
        <div className="flex-1 bg-pattern border-8 border-gray-300 rounded-32 bg-cover relative">
          <img
            src="https://avatars.githubusercontent.com/u/7213352?v=4"
            alt="Profile picture"
            className="border-8 border-white -rotate-3 rounded-[48px] absolute left-[3%] top-[3%] w-[55%]"
          />

          <div className="bg-black shadow-[rgba(0,0,0,0.8)_1px_1px_15px] p-4 absolute bottom-0 inset-x-0 text-gray-500 text-xs rounded-2xl translate-y-1/2 flex space-x-3">
            <span className="space-x-1 flex items-center">
              <b className="text-white text-lg">10</b>
              <span className="line-clamp-1">Reputation</span>
            </span>
            <span className="space-x-1 flex items-center">
              <b className="text-white text-lg">103</b>
              <span className="line-clamp-1">Posts read</span>
            </span>
          </div>
        </div>

        <div className="flex-1 text-black rounded-32 px-2 pb-2">
          <div className="shadow-[rgba(0,0,0,0.3)_1px_1px_1px] h-full rounded-32 px-4 relative overflow-hidden">
            <div className="pt-8">
              <h1 className="font-bold text-2xl">Johan le Roch</h1>
              <div className="text-xs space-x-2">
                <span>@johanleroch</span>
                <span className="text-gray-400">Dec 02, 2022</span>
              </div>
            </div>
            <hr className="my-4" />

            <div className="text-xs flex flex-wrap gap-2">
              {["#css", "#data-analysis", "#database", "#frontend", "#cli"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="border border-black px-2 py-1 rounded-lg"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
            <div className="absolute bottom-0 right-0 bg-black rounded-tl-32 text-white px-4 py-4 flex space-x-1">
              <DailDevLogo className="h-[18px]" />
              <DailDevTextLogo className="h-[18px]" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-pattern {
          background-image: url(https://res.cloudinary.com/daily-now/image/upload/s--VMbOMIjj--/f_auto/v1710057765/public/DevCard-cover);
        }
      `}</style>
    </motion.div>
  );
}

// https://res.cloudinary.com/daily-now/image/upload/s--VMbOMIjj--/f_auto/v1710057765/public/DevCard-cover
