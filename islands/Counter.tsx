import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";
import { useEffect } from "preact/compat";

export default function Counter() {
  useEffect(() => {
    const swiper = new Swiper(".swiper", {
      slidesPerView: 1,
    });
  });
  return (
    <div class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
      </div>
    </div>
  );
}
