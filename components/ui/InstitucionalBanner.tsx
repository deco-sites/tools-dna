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
      <div class="flex flex-col-reverse lg:flex-row-reverse relative justify-end h-[1040px] lg:h-[610px]">
        <div class="flex flex-col absolute top-60 justify-around p-8 bg-[#164195] text-white w-full lg:max-w-[600px] rounded-[36px] gap-4 lg:h-[610px] lg:top-0 ">
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
        <div class="w-full overflow-hidden flex rounded-t-[36px] lg:rounded-[36px]">
          <Image
            class="object-cover lg:object-right w-full"
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
