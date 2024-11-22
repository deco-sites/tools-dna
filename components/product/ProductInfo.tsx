import { SendEventOnView } from "$store/components/Analytics.tsx";
import AddToCartButtonLinx from "$store/islands/AddToCartButton/linx.tsx";
import AddToCartButtonShopify from "$store/islands/AddToCartButton/shopify.tsx";
import AddToCartButtonVNDA from "$store/islands/AddToCartButton/vnda.tsx";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";
import AddToCartButtonWake from "$store/islands/AddToCartButton/wake.tsx";
import AddToCartButtonNuvemshop from "$store/islands/AddToCartButton/nuvemshop.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Slider from "site/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Icon from "site/components/ui/Icon.tsx";
import Shipping from "$store/islands/Shipping.tsx";
import { calculate } from "site/components/product/ProductCardCustom.tsx";
import ProductReview from "$store/islands/ProductReview.tsx";
import Breadcrumb from "site/components/ui/Breadcrumb.tsx";
import { useSignal } from "@preact/signals";
import Image from "apps/website/components/Image.tsx";
import ImageZoom from "site/islands/ImageZoom.tsx";

interface Props {
  page: ProductDetailsPage | null;
  layout: {
    /**
     * @title Product Name
     * @description How product title will be displayed. Concat to concatenate product and sku names.
     * @default product
     */
    name?: "concat" | "productGroup" | "product";
  };
}

function range(start: number, end: number) {
  return new Array(end - start + 1).fill(1).map((_d, i) => i + start);
}

function ProductInfo({ page }: Props) {
  const platform = usePlatform();
  const id = useId();
  const _openReview = useSignal(false);

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { breadcrumbList, product } = page;
  const {
    productID,
    offers,
    name = "",
    isVariantOf,
    additionalProperty = [],
  } = product;
  const _description = product.description || isVariantOf?.description;
  const {
    pixPrice,
    price = 0,
    listPrice,
    seller = "1",
    installments,
    availability,
    parcelamentoValue,
    inventory,
  } = useOffer(offers);
  const productGroupID = isVariantOf?.productGroupID ?? "";
  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  const eventItem = mapProductToAnalyticsItem({
    product,
    breadcrumbList: breadcrumb,
    price,
    listPrice,
  });

  const informacoes = product.additionalProperty?.find(
    (property) => property.name === "Informações"
  );
  const DadosTecnicos = product.additionalProperty?.find(
    (property) => property.name === "Dados Técnicos"
  );
  const tabelaDeMedidas = product.additionalProperty?.find(
    (property) => property.name === "Tabela de Medidas"
  );

  const selections = product.additionalProperty?.filter(
    (property) => property.valueReference === "SELECTIONS"
  );

  const prazoDeEnvio = product.additionalProperty?.filter(
    (property) => property.name === "Sinopse"
  );

  console.log(prazoDeEnvio);

  const ratingValueCustom = product.aggregateRating?.ratingValue
    ? product.aggregateRating?.ratingValue
    : 0;

  return (
    <div class="container">
      <section class="mt-4">
        <Breadcrumb itemListElement={breadcrumb.itemListElement} />
      </section>
      <section class="mt-4 flex flex-col md:flex-row justify-between items-start gap-[30px]">
        <div
          id={id}
          class="grid grid-flow-row sm:grid-flow-col w-full max-w-[100vw] md:max-w-[515px]"
        >
          <div
            class="relative max-w-[100vw] md:max-w-[515px] justify-center flex flex-col gap-4 items-center"
            id={id}
          >
            <div class="absolute top-3 right-3 z-10">
              {platform === "wake" && (
                <WishlistButton
                  productGroupID={productGroupID}
                  productID={productID}
                />
              )}
            </div>
            <Slider class="carousel carousel-center gap-6">
              {product.image &&
                product.image.map((img, index) => {
                  return (
                    <>
                      {img.url && (
                        <Slider.Item index={index} class="carousel-item w-full">
                          <ImageZoom src={img.url} />

                          {/* <Image
                          class="w-full"
                          src={img.url}
                          alt={img.alternateName}
                          width={1000}
                          height={1000}
                          // Preload LCP image for better web vitals
                          preload={index === 0}
                          loading={index === 0 ? "eager" : "lazy"}
                        /> */}
                        </Slider.Item>
                      )}
                    </>
                  );
                })}
            </Slider>

            <Slider.PrevButton
              class="no-animation absolute left-2 top-[90%]"
              disabled
            >
              <Icon size={18} id="ChevronLeftCustom" strokeWidth={3} />
            </Slider.PrevButton>

            <Slider.NextButton
              class=" absolute right-2 top-[90%]"
              disabled={Boolean(product.image && product.image.length < 2)}
            >
              <Icon size={18} id="ChevronRightCustom" strokeWidth={3} />
            </Slider.NextButton>

            {/* Dots */}
            <Slider.Dots class="carousel max-w-[400px] carousel-center gap-1 px-4 sm:px-0 sm:flex-row order-2 sm:order-1">
              {product.image &&
                product.image.map((img, index) => (
                  <Slider.Dot
                    class="w-1/3 carousel-item justify-center"
                    index={index}
                  >
                    <Image
                      class="group-disabled:border-[#164195] border-2 border-solid border-[#E9E9E9] rounded-[22px] "
                      width={125}
                      height={108}
                      src={img.url!}
                      alt={img.alternateName}
                    />
                  </Slider.Dot>
                ))}
            </Slider.Dots>

            <SliderJS rootId={id} />
          </div>
        </div>

        <div
          class="flex flex-col w-full md:min-w-[376px] max-w-[376px]"
          id={id}
        >
          {/* Code and name */}
          <div class="mt-4 sm:mt-8">
            <div>
              {product.sku && (
                <span class="text-sm text-[#727272]">COD.: {product.sku}</span>
              )}
            </div>
            <h1 class="mb-4">
              <span class="font-medium text-[25px] leading-[32px]">
                {name?.toLocaleLowerCase().charAt(0).toUpperCase()}
                {name?.toLocaleLowerCase().slice(1)}
                {/* {layout?.name === "concat" ? `${isVariantOf?.name} ${name}` : layout?.name === "productGroup" ? isVariantOf?.name : name} */}
              </span>
            </h1>
            {/* <p class="mt-3">Vendido e entregue por World Tools</p> */}
            <div class="rating rating-half flex items-center mb-6">
              {range(0, 4).map((num) => {
                return (
                  <input
                    onClick={(e) => e.preventDefault()}
                    type="radio"
                    name={`rating-${num}`}
                    class={`!w-4 !h-4 mask mask-star-2 !bg-[#E9E9E9] checked:!bg-[#FFC700]`}
                    checked={num <= ratingValueCustom - 1}
                  />
                );
              })}
              {product.aggregateRating && (
                <div class="ml-3">
                  {product.aggregateRating.ratingCount} Avaliações
                </div>
              )}
            </div>
            {prazoDeEnvio && (
              <p class="text-[#717171]">
                Prazo de envio:{" "}
                <span class={"text-[#385fa6] font-bold"}>
                  {prazoDeEnvio[0].value}
                </span>
              </p>
            )}
            <div class="mt-2.5 pt-2.5 border-t-[#E9E9E9] border-t border-solid">
              {product.brand && product.brand.logo && (
                <a style="display: block" href={product.brand?.url}>
                  <Image
                    class="max-w-[90px]"
                    loading={"lazy"}
                    width={90}
                    src={product.brand.logo}
                    alt={product.brand.name}
                  />
                </a>
              )}
            </div>
            <div class="selections mt-2.5 border-t-[#E9E9E9] border-t border-solid">
              <h3 class="text-[#727272] text-base mb-4 mt-2">
                Opções de Escolha
              </h3>
              <ul class="overflow-y-auto overflow-hidden flex flex-col max-h-[200px] custom-scrollbar">
                {selections &&
                  selections.map((selection, index) => (
                    <li
                      class={`${selection.value == "true" ? "-order-1" : ""}`}
                      key={index}
                    >
                      <a
                        href={selection.url}
                        class={`
                      mb-2 max-w-full md:max-w-[280px] p-3 justify-evenly text-xs flex items-center border rounded-[10px] border-solid border-[#164195] 
                      ${
                        selection.value == "false"
                          ? "opacity-50"
                          : "opacity-100"
                      }`}
                      >
                        {selection.name}
                        {selection.value == "true" && (
                          <Icon
                            style={{ color: "#164195" }}
                            size={16}
                            id="CheckSelection"
                            strokeWidth={3}
                          />
                        )}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          {/* Sku Selector */}
          {/* <div class="mt-4 sm:mt-6">
        <ProductSelector product={product} />
      </div> */}
        </div>

        <div
          class="py-[20px] px-6 md:px-[44px] flex flex-col w-full md:min-w-[415px] max-w-[415px] rounded-3xl md:bg-base-300 bg-white md:border-none border border-black"
          id={id}
        >
          {/* Prices */}
          <div class="mt-4">
            <div class="flex flex-col relative">
              <div class="floating-tags right-0 -top-4 !flex-nowrap">
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
                  {listPrice && pixPrice && calculate(listPrice, pixPrice)}
                </div>
                <div class="installmentsTag">
                  {installments}
                  <br /> sem juros
                </div>
              </div>
              {pixPrice && (listPrice ?? 0) > pixPrice && (
                <span class="line-through leading-[20px] text-md font-normal text-[#727272]">
                  {formatPrice(listPrice, offers?.priceCurrency)}
                </span>
              )}
              <div class="flex items-end gap-2">
                <span class="leading-[44px] text-[35px] font-bold text-[#020202]">
                  {formatPrice(pixPrice, offers?.priceCurrency)}
                </span>
                <p class="font-semibold text-lg">a vista</p>
              </div>
            </div>
            <span class="text-[#164195]">
              ou em{" "}
              <strong>
                {installments} de{" "}
                {formatPrice(parcelamentoValue, offers?.priceCurrency)}
              </strong>{" "}
              sem juros <strong>no cartão</strong>
            </span>
          </div>
          {/* Sku Selector */}
          {/* <div class="mt-4 sm:mt-6">
        <ProductSelector product={product} />
      </div> */}
          {/* Add to Cart and Favorites button */}
          <div class="mt-4 sm:mt-10 flex flex-col gap-2">
            {availability === "https://schema.org/InStock" ? (
              <>
                {platform === "vtex" && (
                  <>
                    <AddToCartButtonVTEX
                      eventParams={{ items: [eventItem] }}
                      productID={productID}
                      seller={seller}
                    />
                    <WishlistButton
                      variant="full"
                      productID={productID}
                      productGroupID={productGroupID}
                    />
                  </>
                )}
                {platform === "wake" && (
                  <AddToCartButtonWake
                    eventParams={{ items: [eventItem] }}
                    productID={productID}
                  />
                )}
                {platform === "linx" && (
                  <AddToCartButtonLinx
                    eventParams={{ items: [eventItem] }}
                    productID={productID}
                    productGroupID={productGroupID}
                  />
                )}
                {platform === "vnda" && (
                  <AddToCartButtonVNDA
                    eventParams={{ items: [eventItem] }}
                    productID={productID}
                    additionalProperty={additionalProperty}
                  />
                )}
                {platform === "shopify" && (
                  <AddToCartButtonShopify
                    eventParams={{ items: [eventItem] }}
                    productID={productID}
                  />
                )}
                {platform === "nuvemshop" && (
                  <AddToCartButtonNuvemshop
                    productGroupID={productGroupID}
                    eventParams={{ items: [eventItem] }}
                    additionalProperty={additionalProperty}
                  />
                )}
                {inventory && inventory < 20 && (
                  <p class="mt-3 text-center">
                    Apenas {inventory} peças no estoque
                  </p>
                )}
              </>
            ) : (
              <OutOfStock productID={productID} />
            )}
          </div>

          {/* Shipping Simulation */}
          <div class="mt-8 pt-4 md:pt-0 border-t border-[#DFEAFF]">
            {platform === "wake" && (
              <Shipping
                items={{
                  id: Number(product.productID),
                  quantity: 1,
                  seller: seller,
                }}
              />
            )}
          </div>

          {/* <div class="mt-10">
          <div dangerouslySetInnerHTML={{ __html: informacoes?.value }}></div>
          <div dangerouslySetInnerHTML={{ __html: DadosTecnicos?.value }}></div>
        </div> */}

          {/* Description card */}
          {/* <div class="mt-4 sm:mt-6">
        <span class="text-sm">
          {product.additionalProperty?.map((property) => {
            return (
              <div>
                {property.name}<br />
                {property.value && (
                  <span dangerouslySetInnerHTML={{__html: property.value}}></span>
                )} <br />
              </div>
            )
          })}
          {description && (
            <details>
              <summary class="cursor-pointer">Descrição</summary>
              <div
                class="ml-2 mt-2"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </details>
          )}
        </span>
      </div> */}
          {/* Analytics Event */}
          <SendEventOnView
            id={id}
            event={{
              name: "view_item",
              params: {
                item_list_id: "product",
                item_list_name: "Product",
                items: [eventItem],
              },
            }}
          />
        </div>
      </section>

      <section class="max-w-[100vw]">
        <div class="description mt-10">
          <div class="informacoes">
            <div class="mb-4 flex items-center gap-8">
              <h3 class="whitespace-nowrap uppercase ml-0 text-[1.125rem] font-semibold text-[#173C51] pl-0">
                {informacoes?.name}
              </h3>
              <span class="flex w-full h-px border-b-[5px] border-b-[#3e90c2] border-solid left-0 top-[9px] md:top-[7px]"></span>
            </div>
            {informacoes && informacoes.value && (
              <div
                dangerouslySetInnerHTML={{ __html: informacoes?.value }}
              ></div>
            )}
          </div>
          <div class="DadosTecnicos">
            <div class="mb-4 flex items-center gap-8">
              <h3 class="whitespace-nowrap uppercase ml-0 text-[1.125rem] font-semibold text-[#173C51] pl-0">
                {DadosTecnicos?.name}
              </h3>
              <span class="flex w-full h-px border-b-[5px] border-b-[#3e90c2] border-solid left-0 top-[9px] md:top-[7px]"></span>
            </div>
            {DadosTecnicos && DadosTecnicos.value && (
              <div
                dangerouslySetInnerHTML={{ __html: DadosTecnicos?.value }}
              ></div>
            )}
          </div>
          <div class="tabelaDeMedidas">
            <div class="mb-4 flex items-center gap-8">
              <h3 class="whitespace-nowrap uppercase ml-0 text-[1.125rem] font-semibold text-[#173C51] pl-0">
                {tabelaDeMedidas?.name}
              </h3>
              <span class="flex w-full h-px border-b-[5px] border-b-[#3e90c2] border-solid left-0 top-[9px] md:top-[7px]"></span>
            </div>
            {tabelaDeMedidas && tabelaDeMedidas.value && (
              <div
                dangerouslySetInnerHTML={{ __html: tabelaDeMedidas?.value }}
              ></div>
            )}
          </div>
          <div class="reviews mt-6 pt-6 border-t-[#e9e9e9] border-t border-solid">
            <div class="flex justify-between mb-5 flex-col md:flex-row">
              <h3 class="font-semibold text-3xl leading-8 text-black flex items-center md:flex-row flex-col gap-16">
                Avaliações
                <div class="rating rating-half flex items-center">
                  {range(0, 4).map((num) => {
                    return (
                      <input
                        onClick={(e) => e.preventDefault()}
                        type="radio"
                        name={`rating-down-${num}`}
                        class={`!w-4 !h-4 mask mask-star-2 !bg-[#E9E9E9] checked:!bg-[#FFC700]`}
                        checked={num <= ratingValueCustom - 1}
                      />
                    );
                  })}
                </div>
                <div class="flex items-center font-semibold text-3xl text-black">
                  {product.aggregateRating?.ratingValue}
                  <span class="font-normal text-base text-[#727272]">
                    ({product.aggregateRating?.reviewCount} avaliações)
                  </span>
                </div>
              </h3>

              <div id={id}>
                <ProductReview IDProduct={productID} />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
              {product.review &&
                product.review.map((item) => (
                  <div class="border p-8 md:p-[50px] rounded-[22px] border-solid border-[#E9E9E9]">
                    <p class="text-[#727272] text-base leading-5 font-medium">
                      {item.reviewBody}
                    </p>
                    <span class="text-black text-base leading-5 font-medium">
                      {item.author && item.author[0].name}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductInfo;
