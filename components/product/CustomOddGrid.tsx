import ProductCardOdd, {
  Layout as cardLayout,
} from "$store/components/product/ProductCardOdd.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";
import { useId } from "$store/sdk/useId.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { Product } from "apps/commerce/types.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
// import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
// import { useOffer } from "$store/sdk/useOffer.ts";

export interface Props {
  products: Product[] | null;
  title?: string;
  imageUrl?: ImageWidget;
  description?: string;
  layout?: {
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large";
  };
  cardLayout?: cardLayout;
}

function CustomOddGrid({
  products,
  title,
  description,
  cardLayout,
  imageUrl,
}: Props) {
  const id = useId();
  const platform = usePlatform();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div class="w-full container">
      <Header
        title={title || ""}
        description={description || ""}
        fontSize={"Large"}
        alignment={"center"}
        image={imageUrl}
      />
      <div id={id} class="shelf-custom-items odd">
        {products?.map((product, index) => (
          <ProductCardOdd
            product={product}
            itemListName={title}
            layout={cardLayout}
            platform={platform}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

export default CustomOddGrid;
