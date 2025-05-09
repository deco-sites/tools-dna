import type { Platform } from "$store/apps/site.ts";
import { SendEventOnClick } from "$store/components/Analytics.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import type { ImageObject } from "apps/commerce/types.ts";

export interface Layout {
  customProductImages?: {
    items: ImageObject[];
  };
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

const calculate = (item: number, item2: number) => {
  if ((item - item2) > 0) {
    const percentValue = Math.round((item - item2) / item * 100);
    return `${percentValue}% OFF`;
  }
};

function ProductCardOdd(
  { product, itemListName, layout, index }: Props,
) {
  const {
    url,
    productID,
    name,
    image: images,
    offers,
    isVariantOf,
    // brand,
  } = product;
  const id = `product-card-${productID}`;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const description = product.description || isVariantOf?.description;
  const [front] = images ?? [];
  const { listPrice, price, installments, pixPrice } = useOffer(offers);
  const possibilities = useVariantPossibilities(hasVariant, product);
  const variants = Object.entries(Object.values(possibilities)[0] ?? {});
  const insttallmentsValue = Number(installments?.replace(/\D/g, ""));
  const pricePerInstallment = listPrice && listPrice / insttallmentsValue;

  const l = layout;
  const align =
    !l?.basics?.contentAlignment || l?.basics?.contentAlignment == "Left"
      ? "left"
      : "center";
  const skuSelector = variants.map(([value, link]) => (
    <li>
      <a href={link}>
        <Avatar
          variant={link === url ? "active" : link ? "default" : "disabled"}
          content={value}
        />
      </a>
    </li>
  ));
  const cta = (
    <a
      href={url && relative(url)}
      aria-label="view product"
      class="btn btn-block"
    >
      {l?.basics?.ctaText || "Ver produto"}
    </a>
  );
  // const brandContent = brand?.name;

  return (
    <div
      class={`flex relative md:flex-row flex-col-reverse gap-0 w-full ${
        index && index > 3 ? "hidden md:flex" : "flex md:flex"
      }`}
    >
      <div class="floating-tags top-2 right-2">
        <div class="percentageTag">
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.463 7.07h1.214m3.643 4.858h1.214m0-5.464-6.07 6.071M8.65 1.351 7.28 2.72a1.2 1.2 0 0 1-.848.352h-2.16a1.2 1.2 0 0 0-1.199 1.2V6.43a1.2 1.2 0 0 1-.352.847L1.35 8.652a1.2 1.2 0 0 0 0 1.696l1.372 1.371a1.198 1.198 0 0 1 .351.848v2.159a1.2 1.2 0 0 0 1.2 1.2h2.159c.318 0 .623.126.847.352l1.372 1.37a1.2 1.2 0 0 0 1.697 0l1.37-1.371a1.2 1.2 0 0 1 .848-.351h2.16a1.2 1.2 0 0 0 1.199-1.2v-2.16c0-.317.126-.622.352-.847l1.37-1.372a1.2 1.2 0 0 0 0-1.696L16.278 7.28a1.2 1.2 0 0 1-.351-.848v-2.16a1.2 1.2 0 0 0-1.2-1.199h-2.159a1.2 1.2 0 0 1-.847-.352l-1.374-1.37a1.2 1.2 0 0 0-1.696 0Z"
              stroke="#164195"
            />
          </svg>
          {listPrice && pixPrice &&
            calculate(listPrice, pixPrice)}
        </div>
      </div>
      <div
        id={id}
        data-index={index}
        style={{
          backgroundImage: `url(
          ${
            index != undefined
              ? (
                layout?.customProductImages?.items[index] != undefined
                  ? layout?.customProductImages?.items[index].url
                  : front.url!
              )
              : front.url!
          }
          )`,
        }}
        class={`${
          index ? (index > 2 ? "!bg-white" : "") : ""
        } bg-right-bottom card card-compact card-odd group w-full bg-no-repeat bg-[length:140px] ${
          align === "center" ? "text-center" : "text-start"
        } ${l?.onMouseOver?.showCardShadow ? "lg:hover:card-bordered" : ""}
        ${
          l?.onMouseOver?.card === "Move up" &&
          "duration-500 transition-translate ease-in-out lg:hover:-translate-y-2"
        }
      `}
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

        {/* Prices & Name */}
        <div>
          {/* SKU Selector */}
          {(!l?.elementsPositions?.skuSelector ||
            l?.elementsPositions?.skuSelector === "Top") && (
            <>
              {l?.hide?.skuSelector ? "" : (
                <ul>
                  {skuSelector}
                </ul>
              )}
            </>
          )}

          {l?.hide?.productName && l?.hide?.productDescription ? "" : (
            <div>
              <a href={url && relative(url)}>
                {l?.hide?.productName ? "" : (
                  <h2
                    class={`${
                      index ? (index > 2 ? "!text-[#164195]" : "") : ""
                    } card-name truncate text-base lg:text-lg text-base-content max-w-[70%]`}
                  >
                    {name?.toLocaleLowerCase().charAt(0).toUpperCase()}
                    {name?.toLocaleLowerCase().slice(1)}
                  </h2>
                )}
              </a>
              {l?.hide?.productDescription ? "" : (
                <div
                  class="card-description truncate text-sm lg:text-sm text-neutral"
                  dangerouslySetInnerHTML={{ __html: description ?? "" }}
                />
              )}
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
                  class={`${
                    index ? (index > 2 ? "!text-[#020202]" : "") : ""
                  } card-oldPrice line-through text-base-300 text-xs ${
                    l?.basics?.oldPriceSize === "Normal" ? "lg:text-xl" : ""
                  }`}
                >
                  De {formatPrice(listPrice, offers?.priceCurrency)}
                </div>
                <div
                  class={`${
                    index ? (index > 2 ? "!text-[#020202]" : "") : ""
                  } card-price text-base-600 text-xl lg:text-xl flex items-end gap-2`}
                >
                  {formatPrice(pixPrice, offers?.priceCurrency)}{" "}
                  <p class="font-semibold text-lg">a vista</p>
                </div>
              </div>
              {l?.hide?.installments ? "" : (
                <div
                  class={`${
                    index ? (index > 2 ? "!text-[#020202]" : "") : ""
                  } card-installments text-base lg:text-base truncate`}
                >
                  ou em <strong>{installments}</strong> de{" "}
                  {formatPrice(pricePerInstallment, offers?.priceCurrency)}{" "}
                  sem juros no cartão
                </div>
              )}
            </div>
          )}

          {/* SKU Selector */}
          {l?.elementsPositions?.skuSelector === "Bottom" && (
            <>
              {l?.hide?.skuSelector ? "" : (
                <ul
                  class={`flex items-center gap-2 w-full ${
                    align === "center" ? "justify-center" : "justify-start"
                  } ${l?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
                >
                  {skuSelector}
                </ul>
              )}
            </>
          )}

          {!l?.hide?.cta
            ? (
              <div
                class={`flex-auto flex items-end ${
                  l?.onMouseOver?.showCta ? "lg:hidden" : ""
                }`}
              >
                {cta}
              </div>
            )
            : ""}
        </div>
      </div>

      {
        /*<div class="rounded-2xl justify-center md:max-w-[32%] border border-solid border-[#164195] flex flex-col items-center">
        <figure
          class="relative overflow-hidden card-figure"
          style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
        >

          <div
            class={`absolute top-2 z-10
          ${l?.elementsPositions?.favoriteIcon === "Top left"
                ? "left-2"
                : "right-2"
              }
          ${l?.onMouseOver?.showFavoriteIcon
                ? "lg:hidden lg:group-hover:block"
                : "lg:hidden"
              }
        `}
          >
            {platform === "vtex" && (
              <WishlistButton
                productGroupID={productGroupID}
                productID={productID}
              />
            )}
          </div>

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
              class={`card-image bg-base-100 col-span-full row-span-full rounded w-full ${l?.onMouseOver?.image == "Zoom image"
                  ? "duration-100 transition-scale scale-100 lg:group-hover:scale-125"
                  : ""
                }`}
              sizes="(max-width: 640px) 50vw, 20vw"
              preload={preload}
              loading={preload ? "eager" : "lazy"}
              decoding="async"
            />
            {(!l?.onMouseOver?.image ||
              l?.onMouseOver?.image == "Change image") && (
                <Image
                  src={back?.url ?? front.url!}
                  alt={back?.alternateName ?? front.alternateName}
                  width={WIDTH}
                  height={HEIGHT}
                  class="card-image-hover bg-base-100 col-span-full row-span-full transition-opacity rounded w-full opacity-0 lg:group-hover:opacity-100"
                  sizes="(max-width: 640px) 50vw, 20vw"
                  loading="lazy"
                  decoding="async"
                />
              )}
          </a>
          <figcaption
            class={`
          absolute bottom-1 left-0 w-full flex flex-col gap-3 p-2 ${l?.onMouseOver?.showSkuSelector || l?.onMouseOver?.showCta
                ? "transition-opacity opacity-0 lg:group-hover:opacity-100"
                : "lg:hidden"
              }`}
          >

            {l?.onMouseOver?.showSkuSelector && (
              <ul>
                {skuSelector}
              </ul>
            )}
            {l?.onMouseOver?.showCta && cta}
          </figcaption>
        </figure>
      </div> */
      }
    </div>
  );
}

export default ProductCardOdd;
