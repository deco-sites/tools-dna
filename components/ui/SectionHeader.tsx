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
      {props.title || props.description ? (
        <div
          class={`showcase-header flex gap-2 ${
            props.alignment === "left" ? "text-left" : "text-center"
          }`}
        >
          {props.title && (
            <div
              class={`
                  flex flex-col md:flex-row items-center gap-6
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
                  loading={"lazy"}
                />
              )}

              <p class="text-success text-xl md:text-2xl items-start ">
                {props.title}
              </p>
            </div>
          )}
          {props.description && (
            <h3
              class={`
                  leading-6 lg:leading-8 text-left
                  ${props.colorReverse ? "text-neutral" : "text-[#737373]"}
                  ${props.fontSize === "Normal" ? "lg:text-sm" : "lg:text-sm"}
                `}
              dangerouslySetInnerHTML={{ __html: props.description }}
            >
              {/* {props.description} */}
            </h3>
          )}
        </div>
      ) : null}
    </>
  );
}

export default Header;
