import ProductCardCustom, {
  Layout as cardLayout,
} from "$store/components/product/ProductCardCustom.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";
import { useId } from "$store/sdk/useId.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { Product } from "apps/commerce/types.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  products: Product[] | null;
  title?: string;
  imageUrl: ImageWidget;
  description?: string;
  layout?: {
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large";
  };
  cardLayout?: cardLayout;
}

function CustomShelfGrid({
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
      <div id={id} class="shelf-custom-items">
        {products?.map((product, index) => (
          <ProductCardCustom
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

export default CustomShelfGrid;
