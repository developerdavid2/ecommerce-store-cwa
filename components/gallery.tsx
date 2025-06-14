"use client";
import React from "react";

import NextImage from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image } from "@/types";

interface GalleryProps {
  images: Image[];
}

const Gallery: React.FC<GalleryProps> = ({ images = [] }) => {
  return (
    <Tabs
      defaultValue={images[0]?.id}
      className="max-w-[400px] flex flex-col-reverse"
    >
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <TabsList className="w-full h-full grid gap-2 p-2 grid-cols-4">
          {images.map((image) => (
            <TabsTrigger
              key={image.id}
              value={image.id}
              className="relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white data-[state=active]:ring-2 data-[state=active]:ring-amber-800 p-0 h-auto"
            >
              <span className="absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md">
                <NextImage
                  fill
                  src={image.url}
                  alt=""
                  className="object-cover object-center"
                />
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {images.map((image) => (
        <TabsContent
          key={image.id}
          value={image.id}
          className="mt-0 relative flex aspect-square cursor-pointer items-center justify-center rounded-md"
        >
          <div className="absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md border">
            <NextImage
              fill
              src={image.url}
              alt="Image"
              className="object-cover object-center"
            />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default Gallery;
