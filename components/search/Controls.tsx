import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Sort from "$store/components/search/Sort.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "apps/commerce/types.ts";
import { ImageWidget } from "apps/admin/widgets.ts";
import { type SectionProps } from "@deco/deco";
/**
 * @titleBy matcher
 */
export interface Banner {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;
  image: {
    /** @description Image for big screens */
    desktop: ImageWidget;
    /** @description image alt text */
    alt?: string;
  };
}
const DEFAULT_PROPS = {
  banners: [
    {
      image: {
        mobile:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/91102b71-4832-486a-b683-5f7b06f649af",
        desktop:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/ec597b6a-dcf1-48ca-a99d-95b3c6304f96",
        alt: "a",
      },
      matcher: "/*",
    },
  ],
};
export type Props =
  & Pick<
    ProductListingPage,
    "filters" | "breadcrumb" | "sortOptions" | "pageInfo"
  >
  & {
    displayFilter?: boolean;
    banners?: Banner[];
  };
function SearchControls(
  { filters, breadcrumb, displayFilter, sortOptions, pageInfo }: Props,
  props: SectionProps<ReturnType<typeof loader>>,
) {
  const open = useSignal(false);
  const itemName = breadcrumb.itemListElement.slice(-1);
  const { banner } = props;
  return (
    <Drawer
      loading="lazy"
      open={open.value}
      onClose={() => open.value = false}
      aside={
        <>
          <div class="bg-base-100 flex flex-col h-full divide-y overflow-y-hidden">
            <div class="flex justify-between items-center">
              <h1 class="px-4 py-3">
                <span class="font-medium text-2xl">Filtrar</span>
              </h1>
              <Button class="btn btn-ghost" onClick={() => open.value = false}>
                <Icon id="XMark" size={24} strokeWidth={2} />
              </Button>
            </div>
            <div class="flex-grow overflow-auto">
              <Filters filters={filters} />
            </div>
          </div>
        </>
      }
    >
      <div class="flex flex-col justify-between p-4 sm:mb-0 sm:p-0 sm:gap-4 sm:flex-row sm:h-[53px] mb-4">
        <div class="flex flex-row items-center sm:p-0 mb-2">
          <span class="text-2xl md:text-[30px] text-[#020202] font-semibold">
            {banner?.image && (
              <img
                src={banner.image.desktop}
                alt={banner.image.alt}
                width={72}
                height={72}
                loading={"lazy"}
              />
            )}
            {itemName[0].name}
          </span>
          {/*<Breadcrumb itemListElement={breadcrumb?.itemListElement} />*/}
        </div>

        <div class="flex flex-row-reverse md:flex-row items-center justify-between border-b border-base-200 sm:gap-4 sm:border-none">
          <Button
            class={displayFilter
              ? "btn-ghost"
              : "btn-ghost sm:hidden w-full max-w-[130px] border border-[#e9e9e9] rounded-md flex items-center justify-center flex-row-reverse gap-2 p-1"}
            onClick={() => {
              open.value = true;
            }}
          >
            Filtrar
            <Icon id="FilterList" width={16} height={16} />
          </Button>
          <>
            {pageInfo.records} produtos encontrados
          </>
          {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
        </div>
      </div>
    </Drawer>
  );
}
export const loader = (props: Props, req: Request) => {
  const { banners } = { ...DEFAULT_PROPS, ...props };
  const banner = banners.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );
  return { banner };
};
export default SearchControls;
