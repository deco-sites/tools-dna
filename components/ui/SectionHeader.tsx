import type { ImageWidget } from "apps/admin/widgets.ts";

interface Props {
  title?: string;
  fontSize?: "Normal" | "Large";
  description?: string;
  alignment: "center" | "left";
  colorReverse?: boolean;
  image?: ImageWidget;
}

function Header(props: Props) {
  return (
    <>
      {props.title || props.description
        ? (
          <div
            class={`showcase-header flex gap-2 ${
              props.alignment === "left" ? "text-left" : "text-center"
            }`}
          >
            {props.title &&
              (
                <h2
                  class={`
                  ${
                    props.colorReverse
                      ? "text-primary-content"
                      : "text-base-content"
                  } 
                  ${props.fontSize === "Normal" ? "lg:text-lg" : "lg:text-xl"}
                  `}
                >
                  {props.image && (
                    <img
                      src={props.image}
                      alt={props.title}
                      width={72}
                      height={72}
                    />
                  )}

                  {props.title}
                </h2>
              )}
            {props.description &&
              (
                <h3
                  class={`
                  leading-6 lg:leading-8
                  ${
                    props.colorReverse ? "text-neutral" : "text-primary-content"
                  }
                  ${props.fontSize === "Normal" ? "lg:text-sm" : "lg:text-sm"}
                `}
                  dangerouslySetInnerHTML={{ __html: props.description }}
                >
                  {/* {props.description} */}
                </h3>
              )}
          </div>
        )
        : null}
    </>
  );
}

export default Header;
