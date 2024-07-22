import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  title: string;
  /**
        @format html
    */
  description: string;
  badge: string;
  image: {
    src: ImageWidget;
    width: number;
    height: number;
    alt: string;
  };
}

export default function InstitucionalBanner({
  title,
  description,
  badge,
  image,
}: Props) {
  return (
    <section class="container mt-4">
      <div class="flex flex-col-reverse relative justify-end h-[950px] lg:h-[610px]">
        <div class="flex flex-col absolute top-60 justify-around p-8 bg-[#164195] text-white w-full lg:max-w-[600px] rounded-[35px] gap-4 lg:h-[610px] lg:top-0 lg:left-4">
          <span class="bg-[#1D3B55] rounded-[42px] w-[124px] h-12 flex justify-center items-center mb-4">
            {badge}
          </span>
          <h2 class="text-[30px] font-semibold text-[#ffffff]">{title}</h2>
          <p
            dangerouslySetInnerHTML={{ __html: description }}
            class="text-[16px] font-normal text-[#ffffff]"
          >
          </p>
        </div>
        <div class="w-full overflow-hidden flex lg:rounded-s-full">
          <Image
            class="lg:object-contain lg:object-right w-full lg:w-[1400px]"
            src={image.src}
            width={image.width}
            height={image.height}
            alt={image.alt}
            loading={"lazy"}
          />
        </div>
      </div>
    </section>
  );
}
