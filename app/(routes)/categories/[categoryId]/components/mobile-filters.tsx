import React from "react";
import { Colour, Size } from "@/types";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Filter from "@/app/(routes)/categories/[categoryId]/components/filter";

interface MobileFiltersProps {
  sizes: Size[];
  colours: Colour[];
}

export function MobileFilters({ sizes, colours }: MobileFiltersProps) {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="rounded-full">
            Filters
            <PlusIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Filter Products</SheetTitle>
            <SheetDescription>
              Choose your preferred size and color options
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-4 p-4">
            <Filter valueKey="sizeId" name="Sizes" data={sizes} />
            <Filter valueKey="colourId" name="Colours" data={colours} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
