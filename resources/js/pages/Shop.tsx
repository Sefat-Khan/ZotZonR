
import Common from "@/Layouts/Common";
import ShopContent from "../Components/ShopContent";
import { Head } from "@inertiajs/react";

export default function Shop({products, categories, brands}) {

  return (
    <Common header="Shop">
      <Head title="Shop" />
    <ShopContent products={products}
      categories={categories}
      brands={brands} />
    </Common>
  );
}
