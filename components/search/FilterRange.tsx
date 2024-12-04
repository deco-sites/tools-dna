import { useEffect, useId, useRef } from "preact/hooks";
import { RefObject } from "preact";
import { useSignal } from "@preact/signals";
import { formatPrice } from "site/sdk/format.ts";

function useDebounce(
  // deno-lint-ignore no-explicit-any
  func: (...args: any[]) => void,
  timeout = 300,
  // deno-lint-ignore no-explicit-any
): (...args: any[]) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}

const thumbsize = 14;

interface FilterRangeProps {
  min: number;
  max: number;
  currentUrlFilterPrice?: string;
  currentMaxFacet?: string;
  currentMinFacet?: string;
}

function applyFilterPrice(
  { min, max, currentUrlFilterPrice }: FilterRangeProps,
) {
  const searchParams = new URLSearchParams(currentUrlFilterPrice);
  console.log("searchParams", searchParams);
  searchParams.set("filter.price", `${min}:${max}`);
  const newUrl = `${window.location.pathname}?${searchParams.toString()}`;

  globalThis.location.href = newUrl;
}

const debouncedApplyFilterPrice = useDebounce((arg) => applyFilterPrice(arg));

function FilterRange(
  {
    min: minValue,
    max: maxValue,
    currentUrlFilterPrice = "",
    currentMinFacet,
    currentMaxFacet,
  }: FilterRangeProps,
) {
  const id = useId();
  const slider: RefObject<HTMLDivElement> = useRef(null);
  const min: RefObject<HTMLInputElement> = useRef(null);
  const max: RefObject<HTMLInputElement> = useRef(null);
  const rangemin = useSignal(Number(currentMinFacet));
  const rangemax = useSignal(Number(currentMaxFacet));

  const avgvalueprimary = (rangemin.value + rangemax.value) / 2;
  const dataValue = useSignal({
    min: minValue,
    max: maxValue,
    rangewitdh: 0,
  });

  function draw(splitvalue: number) {
    if (
      min.current &&
      max.current &&
      slider.current &&
      !!dataValue.value.rangewitdh
    ) {
      min.current.setAttribute("max", `${splitvalue}`);
      max.current.setAttribute("min", `${splitvalue}`);

      // Set css
      min.current.style.width = `${
        Math.floor(
          thumbsize +
            ((splitvalue - minValue) /
                (maxValue - minValue)) *
              (dataValue.value.rangewitdh - 2 * thumbsize),
        )
      }px`;
      max.current.style.width = `${
        Math.floor(
          thumbsize +
            ((maxValue - splitvalue) /
                (maxValue - minValue)) *
              (dataValue.value.rangewitdh - 2 * thumbsize),
        )
      }px`;

      min.current.style.left = "0px";
      max.current.style.left = min.current.style.width;

      slider.current.style.height = `${min.current.offsetHeight}px`;

      if (Number(max.current.value) > maxValue) {
        max.current.setAttribute("data-value", `${dataValue.value.max}`);
      }

      rangemin.value = Number(min.current.getAttribute("data-value"));
      rangemax.value = Number(max.current.getAttribute("data-value"));
    }
  }

  function update(props: FilterRangeProps): void {
    if (min.current && max.current) {
      const minvalue = props.min;
      const maxvalue = props.max;

      min.current.setAttribute("data-value", `${minvalue}`);
      max.current.setAttribute("data-value", `${maxvalue}`);

      const avgvalue = (minvalue + maxvalue) / 2;
      draw(Math.round(avgvalue));
    }
  }

  function handleInput(props: FilterRangeProps) {
    update(props);
    debouncedApplyFilterPrice({
      min: rangemin.value,
      max: rangemax.value,
      currentUrlFilterPrice,
    });
  }

  useEffect(() => {
    if (slider.current) {
      dataValue.value.rangewitdh = slider.current.offsetWidth;
      draw(Math.round(avgvalueprimary));
    }
  }, []);

  return (
    <div class="flex flex-col">
      <div ref={slider} class="relative w-full text-center inline-block">
        <label for="min" class="hidden">
          Preço minimo
        </label>
        <input
          ref={min}
          id={`min-${id}`}
          class="cursor-pointer absolute filter-range top-0"
          name="min"
          type="range"
          step="1"
          min={minValue}
          max={Math.round(maxValue)}
          data-value={rangemin.value}
          onInput={(ev: React.ChangeEvent<HTMLInputElement>) =>
            handleInput({
              min: Math.round(Number(ev.currentTarget.value)),
              max: rangemax.value,
            })}
          value={rangemin.value}
        />
        <label for="max" class="hidden">
          Preço máximo
        </label>
        <input
          ref={max}
          id={`max-${id}`}
          class="cursor-pointer absolute filter-range top-0"
          name="max"
          type="range"
          step="1"
          min={minValue}
          max={Math.round(maxValue)}
          data-value={Math.round(rangemax.value)}
          onInput={(ev: React.ChangeEvent<HTMLInputElement>) =>
            handleInput({
              max: Math.round(Number(ev.currentTarget.value)),
              min: rangemin.value,
            })}
          value={Math.round(rangemax.value)}
        />
      </div>
      <div class="flex justify-end items-center">
        <output class="font-caption text-caption">
          {formatPrice(rangemin.value, "BRL")}
        </output>
        <span class="font-caption text-caption block mx-1">-</span>
        <output class="font-caption text-caption">
          {formatPrice(rangemax.value, "BRL")}
        </output>
      </div>
    </div>
  );
}

export default FilterRange;
