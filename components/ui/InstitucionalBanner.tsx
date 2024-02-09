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
    }
}

export default function InstitucionalBanner({
    title, description, badge, image
}: Props) {
    return (
        <section class="container mt-4">
            <div class="flex items-center relative">
                <div class="flex flex-col justify-around pt-[60px] pr-[75px] pb-[60px] pl-[60px] absolute h-full left-0 top-0 bg-[#164195] text-white max-w-[600px] rounded-[35px]">
                    <span class="bg-[#1D3B55] rounded-[42px] w-[124px] h-12 flex justify-center items-center">{badge}</span>
                    <h2 class="text-[30px] font-semibold text-[#ffffff]">{title}</h2>
                    <p dangerouslySetInnerHTML={{__html: description}} class="text-[16px] font-normal text-[#ffffff]"></p>
                </div>
                <div class="w-full max-h-[610px] overflow-hidden flex">
                    <Image 
                        class="object-contain object-right w-full"
                        src={image.src}
                        width={image.width}
                        height={image.height}
                        alt={image.alt}
                    />
                </div>
            </div>
        </section>
    )
}