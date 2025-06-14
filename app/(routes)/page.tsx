import React from "react";
import getBillboard from "@/actions/get-billboard";
import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";
import getProducts from "@/actions/get-products";

const HomePage = async () => {
  const billboard = await getBillboard("ca8ab8b4-feef-4d3c-b83e-0427b530bdb6");
  const products = await getProducts({ isFeatured: true });

  if (!billboard) {
    // Handle the case where billboard is undefined (e.g., show a fallback UI or return null)
    return (
      <Container>
        <div className="space-y-10 pb-10">
          <div>No billboard data available.</div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
      </div>

      <div className="flex flex-col gap-y-10 px-4 sm:px-6 lg:px-8">
        <ProductList title="Featured Products" items={products} />
      </div>
    </Container>
  );
};

export default HomePage;
