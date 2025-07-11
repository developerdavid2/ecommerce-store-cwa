import React from "react";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import getColours from "@/actions/get-colours";
import getCategory from "@/actions/get-category";
import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import Filter from "@/app/(routes)/categories/[categoryId]/components/filter";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import { MobileFilters } from "@/app/(routes)/categories/[categoryId]/components/mobile-filters";

export const revalidate = 0;

interface CategoryPageProps {
  params: Promise<{
    categoryId: string;
  }>;
  searchParams: Promise<{
    colourId?: string;
    sizeId?: string;
  }>;
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  const { categoryId } = await params;
  const resolvedSearchParams = await searchParams;

  const products = await getProducts({
    categoryId: categoryId,
    colourId: resolvedSearchParams.colourId,
    sizeId: resolvedSearchParams.sizeId,
  });

  const sizes = await getSizes();
  const colours = await getColours();
  const category = await getCategory(categoryId);

  return (
    <div className="">
      <Container>
        {/* Only render Billboard if billboard data exists */}
        {category?.billboard && <Billboard data={category.billboard} />}

        {/* Rest of your content */}
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <MobileFilters sizes={sizes} colours={colours} />
            <div className="hidden lg:block">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
              <Filter valueKey="colourId" name="Colours" data={colours} />
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {products.length === 0 ? (
                <NoResults />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {products.map((item) => (
                    <ProductCard data={item} key={item.id} />
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Your products, filters, etc. */}
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
