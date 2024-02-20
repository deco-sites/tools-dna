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
import Slider from "deco-sites/tools-dna/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Icon from "deco-sites/tools-dna/components/ui/Icon.tsx";
import Image from "https://denopkg.com/deco-cx/apps@0.32.26/website/components/Image.tsx";
import Shipping from "$store/islands/Shipping.tsx";

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

function ProductInfo({ page, layout }: Props) {
  const platform = usePlatform();
  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    breadcrumbList,
    product,
  } = page;
  const {
    productID,
    offers,
    name = "",
    gtin,
    isVariantOf,
    additionalProperty = [],
  } = product;
  const description = product.description || isVariantOf?.description;
  const {
    pixPrice,
    price = 0,
    listPrice,
    seller = "1",
    installments,
    availability,
    parcelamentoValue,
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

  const informacoes = product.additionalProperty?.find((property) =>
    property.name === "Informações"
  );
  const DadosTecnicos = product.additionalProperty?.find((property) =>
    property.name === "Dados Técnicos"
  );
  const tabelaDeMedidas = product.additionalProperty?.find((property) =>
    property.name === "Tabela de Medidas"
  );

  const selections = product.additionalProperty?.filter((property) => 
    property.valueReference === "SELECTIONS"
  );

  return (
    <div class="container">
      <section class="flex flex-col md:flex-row justify-between items-start gap-[30px]">
        <div
          id={id}
          class="grid grid-flow-row sm:grid-flow-col w-full max-w-[515px]"
        >
          <div class="relative max-w-[515px]" id={id}>
            <Slider class="carousel carousel-center gap-6">
              {product.image && product.image.map((img, index) => {
                return (
                  <>
                    {img.url && (
                      <Slider.Item
                        index={index}
                        class="carousel-item w-full"
                      >
                        <Image
                          class="w-full"
                          src={img.url}
                          alt={img.alternateName}
                          width={1000}
                          height={1000}
                          // Preload LCP image for better web vitals
                          preload={index === 0}
                          loading={index === 0 ? "eager" : "lazy"}
                        />
                      </Slider.Item>
                    )}
                  </>
                );
              })}
            </Slider>

            <Slider.PrevButton
              class="no-animation absolute left-2 top-1/2 btn btn-circle btn-outline"
              disabled
            >
              <Icon size={24} id="ChevronLeft" strokeWidth={3} />
            </Slider.PrevButton>

            <Slider.NextButton
              class="no-animation absolute right-2 top-1/2 btn btn-circle btn-outline"
              disabled={product.image && product.image.length < 2}
            >
              <Icon size={24} id="ChevronRight" strokeWidth={3} />
            </Slider.NextButton>

            {/* Dots */}
            <ul class="carousel carousel-center gap-1 px-4 sm:px-0 sm:flex-row order-2 sm:order-1">
              {product.image &&
                product.image.map((img, index) => (
                  <li class="carousel-item min-w-[63px]">
                    <Slider.Dot index={index}>
                      <Image
                        class="group-disabled:border-base-300 border rounded "
                        width={80}
                        height={80}
                        src={img.url!}
                        alt={img.alternateName}
                      />
                    </Slider.Dot>
                  </li>
                ))}
            </ul>

            <SliderJS rootId={id} />
          </div>
        </div>

        <div class="flex flex-col w-full min-w-[376px] max-w-[376px]" id={id}>
          {/* <Breadcrumb itemListElement={breadcrumb.itemListElement} /> */}
          {/* Code and name */}
          <div class="mt-4 sm:mt-8">
            <div>
              {productID && (
                <span class="text-sm text-base-300">
                  COD.: {productID}
                </span>
              )}
            </div>
            <h1>
              <span class="font-medium text-[25px] leading-[32px] lowercase">
                {layout?.name === "concat"
                  ? `${isVariantOf?.name} ${name}`
                  : layout?.name === "productGroup"
                    ? isVariantOf?.name
                    : name}
              </span>
            </h1>
            <p class="mt-3">Vendido e entregue por World Tools</p>
            <div>
              {product.aggregateRating && (
                <>
                  {product.aggregateRating.ratingValue} --
                  {product.aggregateRating.ratingCount} Avaliações
                </>
              )}
            </div>
            <div>
              {product.brand && (
                <img src={product.brand.logo} alt={product.brand.name} />
              )}
              
            </div>
            <div class="selections mt-2.5 border-t-[#E9E9E9] border-t border-solid">
              <h3 class="text-[#727272] text-base mb-4 mt-2">Opções de Escolha</h3>
              <ul>
                {selections && selections.map((selection, index) => (
                  <li key={index}>
                    <a href={selection.url} class={`
                      mb-2 max-w-[280px] p-3 justify-evenly text-xs flex items-center border rounded-[10px] border-solid border-[#164195] 
                      ${selection.value == "false" ? "opacity-50" : "opacity-100"}`
                    }>
                      {selection.name}
                      {selection.value == "true" && (
                        <Icon style={{color: "#164195"}} size={16} id="CheckSelection" strokeWidth={3}/>
                      )} 
                    </a>
                  </li>
                )) }
              </ul>
              
            </div>
          </div>
          {/* Sku Selector */}
          {
            /* <div class="mt-4 sm:mt-6">
        <ProductSelector product={product} />
      </div> */
          }
        </div>

        <div
          class="py-[20px] px-[48px] flex flex-col w-full min-w-[415px] max-w-[415px] border rounded-3xl border-solid border-[#E9E9E9]"
          id={id}
        >
          {/* Prices */}
          <div class="mt-4">
            <div class="flex flex-col">
              {pixPrice && (listPrice ?? 0) > pixPrice && (
                <span class="line-through leading-[20px] text-md font-normal text-[#727272]">
                  {formatPrice(listPrice, offers?.priceCurrency)}
                </span>
              )}
              <span class="leading-[44px] text-[35px] font-bold text-[#020202]">
                {formatPrice(pixPrice, offers?.priceCurrency)}
              </span>
            </div>
            <span class="">
              ou em{" "}
              <strong>
                {installments} de{" "}
                {formatPrice(parcelamentoValue, offers?.priceCurrency)}
              </strong>{" "}
              sem juros
            </span>
          </div>
          {/* Sku Selector */}
          {
            /* <div class="mt-4 sm:mt-6">
        <ProductSelector product={product} />
      </div> */
          }
          {/* Add to Cart and Favorites button */}
          <div class="mt-4 sm:mt-10 flex flex-col gap-2">
            {availability === "https://schema.org/InStock"
              ? (
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
                </>
              )
              : <OutOfStock productID={productID} />}
          </div>

          {/* Shipping Simulation */}
          <div class="mt-8">
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

          {
            /* <div class="mt-10">
          <div dangerouslySetInnerHTML={{ __html: informacoes?.value }}></div>
          <div dangerouslySetInnerHTML={{ __html: DadosTecnicos?.value }}></div>
        </div> */
          }

          {/* Description card */}
          {
            /* <div class="mt-4 sm:mt-6">
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
      </div> */
          }
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
      <section>
        <div class="description mt-10">
          <div class="informacoes">
            <div class="mb-4 flex items-center gap-8">
              <h3 class="whitespace-nowrap uppercase ml-0 text-[1.125rem] font-semibold text-[#173C51] pl-0">
                {informacoes?.name}
              </h3>
              <span class="flex w-full h-px border-b-[5px] border-b-[#3e90c2] border-solid left-0 top-[9px] md:top-[7px]">
              </span>
            </div>
            {informacoes && informacoes.value && (
              <div dangerouslySetInnerHTML={{ __html: informacoes?.value }}>
              </div>
            )}
          </div>
          <div class="DadosTecnicos">
            <div class="mb-4 flex items-center gap-8">
              <h3 class="whitespace-nowrap uppercase ml-0 text-[1.125rem] font-semibold text-[#173C51] pl-0">
                {DadosTecnicos?.name}
              </h3>
              <span class="flex w-full h-px border-b-[5px] border-b-[#3e90c2] border-solid left-0 top-[9px] md:top-[7px]">
              </span>
            </div>
            {DadosTecnicos && DadosTecnicos.value && (
              <div dangerouslySetInnerHTML={{ __html: DadosTecnicos?.value }}>
              </div>
            )}
          </div>
          <div class="tabelaDeMedidas">
            <div class="mb-4 flex items-center gap-8">
              <h3 class="whitespace-nowrap uppercase ml-0 text-[1.125rem] font-semibold text-[#173C51] pl-0">
                {tabelaDeMedidas?.name}
              </h3>
              <span class="flex w-full h-px border-b-[5px] border-b-[#3e90c2] border-solid left-0 top-[9px] md:top-[7px]">
              </span>
            </div>
            {tabelaDeMedidas && tabelaDeMedidas.value && (
              <div dangerouslySetInnerHTML={{ __html: tabelaDeMedidas?.value }}>
              </div>
            )}
          </div>
          <div class="reviews mt-6 pt-6 border-t-[#e9e9e9] border-t border-solid">
            <div class="flex justify-around mb-5">
              <h3 class="font-semibold text-3xl leading-8 text-black">
                Avaliações
              </h3>
              <div class="flex items-end font-semibold text-3xl text-black">
                {product.aggregateRating?.ratingValue}
                <span class="font-normal text-base text-[#727272]">
                  ({product.aggregateRating?.reviewCount} avaliações)
                </span>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-5">
              {product.review &&
                product.review.map((item) => (
                  <div class="border p-[50px] rounded-[22px] border-solid border-[#E9E9E9]">
                    <p class="text-[#727272] text-base leading-5 font-medium">
                      {item.reviewBody}
                    </p>
                    <span class="text-black text-base leading-5 font-medium">
                      {item.author && (item.author[0].name)}
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
