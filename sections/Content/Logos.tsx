import Image from "apps/website/components/Image.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";
import { useMemo } from "preact/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { SectionProps } from "deco/types.ts";

export interface Image {
  image: ImageWidget;
  altText: string;
}

export interface Secao {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher?: string;
  title?: string;
  description?: string;
  images?: Image[];
  layout?: {
    headerAlignment?: "center" | "left";
  };
}

const IMAGES = [
  {
    altText: "deco",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/fe7cd8ba-c954-45d6-9282-ee7d8ca8e3c7",
  },
  {
    altText: "deco",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/637e8601-6b86-4979-aa97-68013a2a60fd",
  },
];

function Logos(props: SectionProps<ReturnType<typeof loader>>) {
  const { logo } = props;

  if (!logo) {
    return null;
  }

  const { title, description, images, layout } = logo;

  const list = useMemo(
    () =>
      images && images.length > 0
        ? images
        : Array(20).fill(null).map((_, i) => IMAGES[i % 2]),
    [],
  );

  return (
    <div class="w-full container px-4 py-8 flex flex-col gap-8 lg:gap-12 lg:py-10 lg:px-0">
      <Header
        title={title}
        description={description}
        alignment={layout?.headerAlignment || "center"}
      />
      <div class="w-full logos-element text-center items-center justify-between flex">
        {list.map((element) => (
          <div class="w-36 lg:w-40 h-17 lg:h-20 px-4 lg:px-6 py-6 lg:py-4 inline-block align-middle">
            <div class="flex w-full h-full items-center justify-center">
              <a href={element.altText}>
                <img
                  class="max-w-full max-h-full"
                  src={element.image}
                  alt={element.altText || ""}
                  loading={"lazy"}
                />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const DEFAULT_PROPS = {
  banners: [
    {
      "title": "Navegue por marcas default",
      "images": [
        {
          "image":
            "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/3444/20efe83a-42be-4090-8158-707291b81501",
          "altText": "/",
        },
        {
          "image":
            "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/3444/35bf712a-dc8d-4a5c-b2cf-098ef465a710",
          "altText": "/",
        },
        {
          "image":
            "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/3444/8ea14f17-e198-468c-b441-e2551259f715",
          "altText": "/",
        },
        {
          "image":
            "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/3444/a7c62fc6-517c-4346-b416-107f86c101d8",
          "altText": "/",
        },
        {
          "image":
            "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/3444/65694d2d-c2c3-478f-87b9-5daf5115c4ef",
          "altText": "/",
        },
        {
          "image":
            "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/3444/f8ddcbef-c61b-418e-98b5-f3924ae77491",
          "altText": "/",
        },
      ],
      "layout": {
        "headerAlignment": "center",
      },
    },
  ],
};

export interface Props {
  logos?: Secao[];
}

export const loader = (props: Props, req: Request) => {
  const { logos } = { ...DEFAULT_PROPS, ...props };

  const logo = logos?.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );

  return { logo };
};

export default Logos;
