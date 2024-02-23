import type { ComponentChildren, JSX } from "preact";

function Dot({ index, children, class: className }: {
  index: number;
  children: ComponentChildren;
  class?: string;
}) {
  return (
    <button
      data-dot={index}
      aria-label={`go to slider item ${index}`}
      class={`focus:outline-none group ${className}`}
    >
      {children}
    </button>
  );
}

function Dots(props: JSX.IntrinsicElements["div"]) {
  return <div data-dots-slider {...props} />;
}

function Slider(props: JSX.IntrinsicElements["ul"]) {
  return <ul data-slider {...props} />;
}

function Item({
  index,
  ...props
}: JSX.IntrinsicElements["li"] & { index: number }) {
  return <li data-slider-item={index} {...props} />;
}

function NextButton(props: JSX.IntrinsicElements["button"]) {
  return <button data-slide="next" aria-label="Next item" {...props} />;
}

function PrevButton(props: JSX.IntrinsicElements["button"]) {
  return <button data-slide="prev" aria-label="Previous item" {...props} />;
}

Slider.Dots = Dots;
Slider.Dot = Dot;
Slider.Item = Item;
Slider.NextButton = NextButton;
Slider.PrevButton = PrevButton;

export default Slider;
