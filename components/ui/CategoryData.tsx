import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { SectionProps } from "deco/types.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";

/**
 * @titleBy matcher
 */
export interface Banner {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;
  /** @description text to be rendered on top of the image */
  title?: string;
  /** @description text to be rendered on top of the image */
  subtitle?: string;
  image: {
    /** @description Image for big screens */
    desktop: ImageWidget;
    /** @description image alt text */
    alt?: string;
  };
}

const DEFAULT_PROPS = {
  banners: [
    {
      image: {
        mobile:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/91102b71-4832-486a-b683-5f7b06f649af",
        desktop:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/ec597b6a-dcf1-48ca-a99d-95b3c6304f96",
        alt: "a",
      },
      title: "Woman",
      matcher: "/*",
      subtitle: "As",
    },
  ],
};

function Banner(props: SectionProps<ReturnType<typeof loader>>) {
  const { banner } = props;

  if (!banner) {
    return null;
  }
  const { title, subtitle, image } = banner;
  return (
    <div class="container">
      {title || subtitle
        ? (
          <div
            class={`showcase-header flex gap-2 text-left`}
          >
            {title &&
              (
                <h2
                  class={`text-base-content lg:text-lg`}
                >
                  {image && (
                    <img
                      src={image.desktop}
                      alt={image.alt}
                      width={72}
                      height={72}
                      loading={"lazy"}
                    />
                  )}

                  
                </h2>
              )}
            {subtitle &&
              (
                <h3
                  class={`leading-6 lg:leading-8 text-primary-content lg:text-sm`}
                  dangerouslySetInnerHTML={{ __html: subtitle }}
                >
                </h3>
              )}
          </div>
        )
        : null}
    </div>
  );
}

export interface Props {
  banners?: Banner[];
}

export const loader = (props: Props, req: Request) => {
  const { banners } = { ...DEFAULT_PROPS, ...props };

  const banner = banners.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );

  return { banner };
};

export default Banner;
