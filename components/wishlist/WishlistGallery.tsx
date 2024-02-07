import { WishlistReducedProductFragment } from "apps/wake/utils/graphql/storefront.graphql.gen.ts";
import { AppContext } from "apps/wake/mod.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import ProductCardCustom, {
  Layout as cardLayout,
} from "$store/components/product/ProductCardCustom.tsx";
export type Props = {
  wishlist: WishlistReducedProductFragment[];
  cardLayout?: cardLayout;
};

export const loader = async (props: Props, req: Request, ctx: AppContext) => {
  const { invoke } = ctx;

  const productId = props.wishlist.map((item) => Number(item.productId));

  const products = productId.length > 0
    ? await invoke.wake.loaders.productList({
      first: 50,
      sortDirection: "ASC",
      sortKey: "NAME",
      filters: {
        productId,
        mainVariant: true,
      },
    })
    : [];

  return {
    products,
  };
};

function WishlistGallery(
  { products }: Awaited<ReturnType<typeof loader>>,
  props: Props,
) {
  const platform = usePlatform();
  return (
    <>
      <div class="bg-[#ff0000]">
        <div class="container">
          <div class="shelf-custom-items">
            {products?.map((product, index) => (
              <ProductCardCustom
                product={product}
                itemListName={"Wishlist"}
                layout={props.cardLayout}
                platform={platform}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default WishlistGallery;
