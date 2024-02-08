import { SendEventOnView } from "$store/components/Analytics.tsx";
import { Layout as CardLayout } from "$store/components/product/ProductCard.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import SearchControls from "$store/islands/SearchControls.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { ProductListingPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductGallery, { Columns } from "../product/ProductGallery.tsx";
import Image from "apps/website/components/Image.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import type { SectionProps } from "deco/types.ts";

export interface Layout {
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  /**
   * @description Number of products per line on grid
   */
  columns?: Columns;
}

export interface Props {
  /** @title Integration */
  page: ProductListingPage | null;
  layout?: Layout;
  cardLayout?: CardLayout;
  /** @description 0 for ?page=0 as your first page */
  startingPage?: 0 | 1;
}

function NotFound() {
  return (
    <div class="w-full container flex justify-center items-center py-10">
      <div class="flex flex-row items-start justify-between">
        <div class="content text-left flex flex-col justify-start items-start gap-2">
          <h2 class="font-bold text-[80px] leading-[100px] text-[#020202]">Desculpe!</h2>
          <span class="font-normal text-[55px] leading-[70px] text-[#727272]">Mas não encontramos o que você está buscando</span>
          <a class="bg-[#164195] mt-6 flex justify-center items-center rounded-full w-[246px] h-[60px] uppercase text-white text-center"href="/">IR PARA PRODUTOS</a>
        </div>
        <div class="image">
          <img
            src={"https://s3-alpha-sig.figma.com/img/f19e/4bd9/0f73e31a9eefd72f8da92bb56a612a6e?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MDou-nXEj0KkLeo6ZS8tuEvMBVRFwMFTkxnf4OYuZKF9PYcPtAVc90RLrGLIQuyeqP6ntyk1jpm8FIrN4sK-5H4idhVtPiV7NdnXc4d6OKoVlxO~GmMbyrNAjGtcsLdHQKbbLufQsSYiqEcH3jaSyRR0r4Ot2cDm7dMoqHzc5pvUh5DuCw3GnKwcGE67t0pZQ0tWN5B65sD7S9eLg4caCAOVO09nJBQ5Pdfeg2oMZKRCeCN3kGfv~aPPvYmWcHrEpw6XPBBrgO9Z0RTi5La5Y3WqmkzRT5i098Zdrw8yunQvvOS5S959BccNNwXMCjOGYgOPqiBNR4URuJINqdUi~Q__"}
          />
          {
            /* {notFound?.image && (
            <Image
              src={notFound?.image}
              width={notFound?.imageWidth}
              height={notFound?.imageHeight}
              />
            )} */
          }
        </div>
      </div>
    </div>
  );
}

function Result({
  page,
  layout,
  cardLayout,
  startingPage = 0,
}: Omit<Props, "page"> & { page: ProductListingPage }) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const perPage = pageInfo.recordPerPage || products.length;

  const id = useId();

  const zeroIndexedOffsetPage = pageInfo.currentPage - startingPage;
  const offset = zeroIndexedOffsetPage * perPage;

  console.log(breadcrumb)

  return (
    <>
      <div class="container px-4 sm:py-10">
        <SearchControls
          sortOptions={sortOptions}
          filters={filters}
          breadcrumb={breadcrumb}
          displayFilter={layout?.variant === "drawer"}
        />

        <div class="flex flex-row gap-8">
          {layout?.variant === "aside" && filters.length > 0 && (
            <aside class="hidden sm:block w-min min-w-[262px]">
              <Filters filters={filters} />
            </aside>
          )}
          <div class="flex-grow" id={id}>
            <ProductGallery
              products={products}
              offset={offset}
              layout={{ card: cardLayout, columns: layout?.columns }}
            />
          </div>
        </div>

        <div class="flex justify-center my-4">
          <div class="join">
            <a
              aria-label="previous page link"
              rel="prev"
              href={pageInfo.previousPage ?? "#"}
              class="btn btn-ghost join-item"
            >
              <Icon id="ChevronLeft" size={24} strokeWidth={2} />
            </a>
            <span class="btn btn-ghost join-item">
              Page {zeroIndexedOffsetPage + 1}
            </span>
            <a
              aria-label="next page link"
              rel="next"
              href={pageInfo.nextPage ?? "#"}
              class="btn btn-ghost join-item"
            >
              <Icon id="ChevronRight" size={24} strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>
      <SendEventOnView
        id={id}
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: breadcrumb.itemListElement?.at(-1)?.name,
            item_list_id: breadcrumb.itemListElement?.at(-1)?.item,
            items: page.products?.map((product, index) =>
              mapProductToAnalyticsItem({
                ...(useOffer(product.offers)),
                index: offset + index,
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </>
  );
}

function SearchResult({ page, ...props }: Props) {
  if (!page) {
    return <NotFound />;
  }

  return <Result {...props} page={page} />;
}

export default SearchResult;
