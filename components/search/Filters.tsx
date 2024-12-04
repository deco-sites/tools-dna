import Avatar from "$store/components/ui/Avatar.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";
import ClearFilters from "site/islands/ClearFilters.tsx";
// import FilterRange from "site/components/search/FilterRange.tsx";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  return (
    <>
      {quantity > 0 && (
        <a href={url} rel="nofollow" class="flex items-center gap-2">
          <div aria-checked={selected} class="checkbox" />
          <span class="text-sm">{label}</span>
          {quantity > 0 && (
            <span class="text-sm text-base-300">({quantity})</span>
          )}
        </a>
      )}
    </>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-row"
    : "flex-col";

  return (
    <>
      <ul class={`flex flex-wrap gap-2 ${flexDirection}`}>
        {values.map((item) => {
          const { url, selected, value } = item;

          if (key === "cor" || key === "tamanho") {
            return (
              <a href={url} rel="nofollow">
                <Avatar
                  content={value}
                  variant={selected ? "active" : "default"}
                />
              </a>
            );
          }

          if (key === "price") {
            const range = parseRange(item.value);

            return range && (
              <>
                <ValueItem
                  {...item}
                  label={`${formatPrice(range.from)} - ${
                    formatPrice(range.to)
                  }`}
                />
              </>
            );
          }

          return <ValueItem {...item} />;
        })}
      </ul>
    </>
  );
}

function Filters({ filters }: Props) {
  return (
    <ul class="flex flex-col py-4">
      <div class="collapse collapse-plus collapse-open">
        <input type="checkbox" />
        <div class="mb-2.5 rounded-none border-b-[#e9e9e9] border-b border-solid collapse-title font-semibold text-[18px] leading-9 after:!w-[30px] after:!h-[30px] after:!flex after:!items-center after:!justify-center after:rounded-md after:border after:border-solid after:border-[#164195]">
          SELECIONADOS
        </div>
        <div class="collapse-content">
          {filters.filter(isToggle)
            .map((filter) => (
              filter.values.map((item) => (
                item.selected && <FilterValues {...filter} />
              ))
            ))}
          <ClearFilters />
        </div>
      </div>

      {filters
        .filter(isToggle)
        .map((filter) => (
          <div class="collapse collapse-plus">
            <input type="checkbox" />
            <div class="mb-2.5 rounded-none border-b-[#e9e9e9] border-b border-solid collapse-title font-semibold text-[18px] leading-9 after:!w-[30px] after:!h-[30px] after:!flex after:!items-center after:!justify-center after:rounded-md after:border after:border-solid after:border-[#164195]">
              {filter.label}
            </div>
            <div class="collapse-content">
              <FilterValues {...filter} />
            </div>
          </div>
          // <li class="flex flex-col gap-4">
          //   <span>{filter.label}</span>
          //   <FilterValues {...filter} />
          // </li>
        ))}
    </ul>
  );
}

export default Filters;
