import React from "react";
import getBillboard from "@/actions/get-billboard";
import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";
import getProducts from "@/actions/get-products";

export const dynamic = "force-dynamic";
const HomePage = async () => {
  const billboard = await getBillboard("78089423-5567-4ec3-9a83-ab3b2a357be3");
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
