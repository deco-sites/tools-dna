import Sort from "$store/components/search/Sort.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "apps/commerce/types.ts";

export type Props =
  & Pick<ProductListingPage, "breadcrumb" | "sortOptions" | "pageInfo">
  & {
    displayFilter?: boolean;
  };

function CustomBreadCrumb(
  { breadcrumb, sortOptions, pageInfo }: Props,
) {
  const _open = useSignal(false);

  return (
    <div class="flex flex-col justify-between p-4 sm:mb-0 sm:p-0 sm:gap-4 sm:flex-row sm:h-[53px] mb-4">
      <div class="flex flex-row items-center sm:p-0 mb-2">
        <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
      </div>

      <div class="flex flex-row items-center justify-between border-b border-base-200 sm:gap-4 sm:border-none">
        {pageInfo.records} produtos encontrados
        {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
      </div>
    </div>
  );
}

export default CustomBreadCrumb;
