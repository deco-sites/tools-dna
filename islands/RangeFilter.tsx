import { useEffect, useRef, useState } from "preact/hooks";

export interface Props {
  /** @description O valor minimo esta definido em R$0,00 se quiser mudar o valor preencher o campo abaixo */
  min?: number;
  /** @description O valor maximo esta definido em R$10.000,00 se quiser mudar o valor preencher o campo abaixo */
  max?: number;
  /** @hide step */
  step?: number;
}

const RangeFilter = ({ min = 0, max = 10000, step = 1 }: Props) => {
  const [rangeSliderMin, setRangeSliderMin] = useState<number>(min);
  const [rangeSliderMax, setRangeSliderMax] = useState<number>(max);

  const rangeSliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (rangeSliderRef.current) {
      const rangeSlider = rangeSliderRef.current;
      const updateSlider = () => {
        const percentageMin = rangeSliderMin / max;
        const percentageMax = rangeSliderMax / max;

        rangeSlider.querySelector<HTMLElement>(
          ".range-slider-val-left",
        )!.style.width = `${percentageMin * 100}%`;
        rangeSlider.querySelector<HTMLElement>(
          ".range-slider-val-right",
        )!.style.width = `${(1 - percentageMax) * 100}%`;
        rangeSlider.querySelector<HTMLElement>(
          ".range-slider-val-range",
        )!.style.left = `${percentageMin * 100}%`;
        rangeSlider.querySelector<HTMLElement>(
          ".range-slider-val-range",
        )!.style.right = `${(1 - percentageMax) * 100}%`;
        rangeSlider.querySelector<HTMLElement>(
          ".range-slider-handle-left",
        )!.style.left = `${percentageMin * 100}%`;
        rangeSlider.querySelector<HTMLElement>(
          ".range-slider-handle-right",
        )!.style.left = `${percentageMax * 100}%`;
        rangeSlider.querySelector<HTMLElement>(
          ".range-slider-tooltip-left .range-slider-tooltip-text",
        )!.innerText = rangeSliderMin.toString();
        rangeSlider.querySelector<HTMLElement>(
          ".range-slider-tooltip-right .range-slider-tooltip-text",
        )!.innerText = rangeSliderMax.toString();
      };

      updateSlider();

      const handleLeftInputChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const newValue = Math.min(
          parseInt(target.value, 10),
          rangeSliderMax - step,
        );
        setRangeSliderMin(newValue);
      };

      const handleRightInputChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const newValue = Math.max(
          parseInt(target.value, 10),
          rangeSliderMin + step,
        );
        setRangeSliderMax(newValue);
      };

      rangeSlider
        .querySelector(".range-slider-input-left")!
        .addEventListener("input", handleLeftInputChange);
      rangeSlider
        .querySelector(".range-slider-input-right")!
        .addEventListener("input", handleRightInputChange);

      return () => {
        rangeSlider
          .querySelector(".range-slider-input-left")!
          .removeEventListener("input", handleLeftInputChange);
        rangeSlider
          .querySelector(".range-slider-input-right")!
          .removeEventListener("input", handleRightInputChange);
      };
    }
  }, [rangeSliderMin, rangeSliderMax, max, step]);

  return (
    <div>
      <p class="mb-2.5 rounded-none font-semibold text-[18px] leading-9 p-[1rem]">
        Preço
      </p>
      <div id="RangeSlider" className="range-slider" ref={rangeSliderRef}>
        <div>
          <div className="range-slider-val-left"></div>
          <div className="range-slider-val-right"></div>
          <div className="range-slider-val-range"></div>
          <span className="range-slider-handle range-slider-handle-left"></span>
          <span className="range-slider-handle range-slider-handle-right">
          </span>
          <div className="range-slider-tooltip range-slider-tooltip-left">
            <span className="range-slider-tooltip-text"></span>
          </div>
          <div className="range-slider-tooltip range-slider-tooltip-right">
            <span className="range-slider-tooltip-text"></span>
          </div>
        </div>
        <input
          type="range"
          className="range-slider-input-left"
          min={min.toString()}
          max={max.toString()}
          step={step.toString()}
          value={rangeSliderMin}
        />
        <input
          type="range"
          className="range-slider-input-right"
          min={min.toString()}
          max={max.toString()}
          step={step.toString()}
          value={rangeSliderMax}
        />
      </div>
      <div class="flex justify-between w-full px-4 mt-5">
        <p>{`R$${rangeSliderMin},00`}</p>
        <p>{`R$${rangeSliderMax},00`}</p>
      </div>

      <a
        href={`${globalThis.location.href}${
          globalThis.location?.href?.includes("?") ? "&" : "?"
        }precoPor=${rangeSliderMin}%3B${rangeSliderMax}`}
        class="btn btn-neutral btn-outline uppercase mt-3"
      >
        filtrar por preço
      </a>
    </div>
  );
};

export default RangeFilter;
