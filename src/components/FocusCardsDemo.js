"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";

export function FocusCardsDemo() {
  const fallbackImage = "https://cdn-icons-png.flaticon.com/512/847/847969.png";

  const cards = [
    { title: "Forest Adventure", src: "" },
    { title: "Valley of life", src: "" },
    { title: "Sala behta hi jayega", src: "" },
  ];

  const [selectedCard, setSelectedCard] = useState(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [erroredImages, setErroredImages] = useState({});

  const bgColors = [
    "bg-red-100",
    "bg-green-100",
    "bg-blue-100",
    "bg-yellow-100",
    "bg-purple-100",
    "bg-pink-100",
    "bg-gray-200",
  ];

  const getRandomBg = (idx) => {
    return bgColors[idx % bgColors.length];
  };

  const handleError = (key) => {
    setErroredImages((prev) => ({ ...prev, [key]: true }));
  };

  const renderImage = (src, idxOrTitle, className) => {
    const errored = erroredImages[idxOrTitle];
    const bg = getRandomBg(typeof idxOrTitle === "number" ? idxOrTitle : idxOrTitle.length);

    return errored ? (
      <div
        className={clsx(
          "flex items-center justify-center w-full h-full",
          bg,
          className
        )}
      >
        <Image
          src={fallbackImage}
          alt="fallback"
          width={100}
          height={100}
          className="w-24 h-24 object-contain opacity-70"
        />
      </div>
    ) : (
      <Image
        src={src}
        alt="image"
        width={800}
        height={600}
        className={className}
        onError={() => handleError(idxOrTitle)}
      />
    );
  };

  return (
    <>
      {selectedCard ? (
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          {/* Left: Image */}
          <div className="w-full md:w-1/2 h-[300px]">
            {renderImage(
              selectedCard.src,
              selectedCard.title,
              "rounded-xl w-full h-full object-cover"
            )}
          </div>

          {/* Right: Info */}
          <div className="w-full md:w-1/2 space-y-4">
            <h2 className="text-2xl font-bold">{selectedCard.title}</h2>
            <TextGenerateEffect
              words={`This is a detailed view of ${selectedCard.title}. You can put more description here if needed.`}
            />
            <Button onClick={() => setSelectedCard(null)}>Go Back</Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 group">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={clsx(
                "relative group/card cursor-pointer rounded-xl overflow-hidden shadow-md transition duration-300 h-64",
                hoveredIdx !== null &&
                  hoveredIdx !== idx &&
                  "blur-sm scale-95 opacity-80"
              )}
              onClick={() => setSelectedCard(card)}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {renderImage(
                card.src,
                idx,
                "object-cover w-full h-full rounded-xl transition-transform duration-300 group-hover/card:scale-105"
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm px-3 py-2">
                {card.title}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
