import type { Platform } from "$store/apps/site.ts";
import { SendEventOnClick } from "$store/components/Analytics.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";

export interface Layout {
  basics?: {
    contentAlignment?: "Left" | "Center";
    oldPriceSize?: "Small" | "Normal";
    ctaText?: string;
  };
  elementsPositions?: {
    skuSelector?: "Top" | "Bottom";
    favoriteIcon?: "Top right" | "Top left";
  };
  hide?: {
    productName?: boolean;
    productDescription?: boolean;
    allPrices?: boolean;
    installments?: boolean;
    skuSelector?: boolean;
    cta?: boolean;
  };
  onMouseOver?: {
    image?: "Change image" | "Zoom image";
    card?: "None" | "Move up";
    showFavoriteIcon?: boolean;
    showSkuSelector?: boolean;
    showCardShadow?: boolean;
    showCta?: boolean;
  };
}

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  layout?: Layout;
  platform?: Platform;
}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

const _calculate = (item: number, item2: number) => {
  if ((item - item2) > 0) {
    const percentValue = Math.round((item - item2) / item * 100);
    return `${percentValue}% OFF`;
  }
};

const WIDTH = 314;
const HEIGHT = 272;

function ProductCardSuggestion(
  { product, preload, itemListName, layout, index }: Props,
) {
  const {
    url,
    productID,
    name,
    image: images,
    offers,
    isVariantOf,
  } = product;
  const id = `product-card-${productID}`;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const [front] = images ?? [];
  const { listPrice, price, pixPrice } = useOffer(offers);
  const possibilities = useVariantPossibilities(hasVariant, product);
  const variants = Object.entries(Object.values(possibilities)[0] ?? {});

  const l = layout;
  const align =
    !l?.basics?.contentAlignment || l?.basics?.contentAlignment == "Left"
      ? "left"
      : "center";
  const _skuSelector = variants.map(([value, link]) => (
    <li>
      <a href={link}>
        <Avatar
          variant={link === url ? "active" : link ? "default" : "disabled"}
          content={value}
        />
      </a>
    </li>
  ));

  return (
    <div
      id={id}
      class="flex flex-row max-w-full overflow-hidden mb-5"
      data-deco="view-product"
    >
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product,
                price,
                listPrice,
                index,
              }),
            ],
          },
        }}
      />

      <figure
        class="overflow-hidden card-figure max-w-[100px] min-w-[100px]"
        style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
      >
        {/* Product Images */}
        <a
          href={url && relative(url)}
          aria-label="view product"
          class="grid grid-cols-1 grid-rows-1 w-full card-image-link"
        >
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class={`card-image bg-base-100 col-span-full row-span-full rounded w-full ${
              l?.onMouseOver?.image == "Zoom image"
                ? "duration-100 transition-scale scale-100 lg:group-hover:scale-125"
                : ""
            }`}
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
        </a>
      </figure>
      {/* Prices & Name */}
      <div>
        {l?.hide?.productName && l?.hide?.productDescription ? "" : (
          <div>
            <a href={url && relative(url)}>
              {l?.hide?.productName ? "" : (
                <h2
                  class="card-name truncate text-base lg:text-lg text-base-content"
                  dangerouslySetInnerHTML={{ __html: name ?? "" }}
                />
              )}
            </a>
          </div>
        )}
        {l?.hide?.allPrices ? "" : (
          <div
            //   class="flex flex-col gap-2"
          >
            <div
              class={`flex flex-col gap-0 ${
                l?.basics?.oldPriceSize === "Normal"
                  ? "lg:flex-row lg:gap-2"
                  : ""
              } ${align === "center" ? "justify-center" : "justify-start"}`}
            >
              <div
                class={` card-oldPrice line-through text-base-300 text-xs ${
                  l?.basics?.oldPriceSize === "Normal" ? "lg:text-xl" : ""
                }`}
              >
                De {formatPrice(listPrice, offers?.priceCurrency)}
              </div>
              <div class="card-price text-base-600 text-xl lg:text-xl">
                {formatPrice(pixPrice, offers?.priceCurrency)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCardSuggestion;
