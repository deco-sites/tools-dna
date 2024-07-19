import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { navbarHeight } from "./constants.ts";

function NavItem({ item }: { item: SiteNavigationElement }) {
  const { url, name, children } = item;
  const image = item?.image?.[0];

  return (
    <li class="group flex items-center categories-items">
      <a
        href={url}
        class="px-4 py-3 hover:bg-[#e6e6e6] hover:text-[#25498f] hover:font-bold transition-all rounded-[40px]"
      >
        <span class={`${children && children.length > 0 ? "relative" : ""}`}>
          {name}
          {children && children.length > 0 && (
            <svg
              style="position: absolute;top: 50%;right: -10px;"
              width="5"
              height="4"
              viewBox="0 0 5 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M.067.573A.227.227 0 0 1 .14.52a.21.21 0 0 1 .248.054L2.5 2.896 4.612.573A.217.217 0 0 1 4.772.5c.06 0 .119.026.161.073C4.976.62 5 .683 5 .75c0 .066-.024.13-.067.177l-2.272 2.5a.227.227 0 0 1-.074.054.21.21 0 0 1-.248-.054L.067.927a.272.272 0 0 1 0-.354Z"
                fill="#000"
              />
            </svg>
          )}
        </span>
      </a>

      {children && children.length > 0 && (
        <div
          class="h-[55vh] overflow-hidden overflow-y-auto absolute hidden hover:flex group-hover:flex bg-base-100 z-50 items-start justify-center gap-6 border-t border-b-2 border-base-200 w-screen"
          style={{ top: "0px", left: "0px", marginTop: "60px" }}
        >
          {image?.url && (
            <Image
              class="p-6"
              src={image.url}
              alt={image.alternateName}
              width={300}
              height={332}
              loading="lazy"
            />
          )}
          <ul class="flex items-start justify-center gap-6 first-submenu">
            {children.map((node) => (
              <li class="p-6">
                <a class="font-bold" href={node.url}>
                  <span>{node.name}</span>
                </a>

                <ul class="flex flex-col gap-1 mt-4 max-h-80">
                  {node.children?.map((leaf) => (
                    <li>
                      <a
                        class="hover:bg-[#e6e6e6] px-2 py-[2px] rounded-3xl"
                        href={leaf.url}
                      >
                        <span class="text-xs font-semibold !hover:text-[#25498f]">{leaf.name}</span>
                      </a>
                      {leaf.children && (
                        <ul>
                          {leaf.children?.map((i) => (
                            <li class="pl-4">
                              <a class="hover:bg-[#e6e6e6] px-2 py-[2px] rounded-3xl" href={i.url}>
                                <span class="text-xs !hover:text-[#25498f]">{i.name}</span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

export default NavItem;
