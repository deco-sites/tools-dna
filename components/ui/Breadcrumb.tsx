import type { BreadcrumbList } from "apps/commerce/types.ts";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
}

function Breadcrumb({ itemListElement = [] }: Props) {
  const items = [
    {
      name:
        '<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.978 1.73a.79.79 0 0 0-.97 0L.78 10.484l.971 1.228 1.373-1.07v9.67a1.566 1.566 0 0 0 1.563 1.563h15.625a1.565 1.565 0 0 0 1.562-1.562v-9.665l1.373 1.07.97-1.227zm1.085 18.583h-3.126v-6.25h3.126zm1.562 0v-6.25a1.564 1.564 0 0 0-1.562-1.563h-3.126a1.564 1.564 0 0 0-1.562 1.563v6.25H4.688V9.423L12.5 3.338l7.813 6.093v10.882z" fill="#164195"/></svg>',
      item: "/",
    },
    ...itemListElement,
  ];

  return (
    <div class="breadcrumbs">
      <ul>
        {items
          .filter(({ name, item }) => name && item)
          .map(({ name, item }) => (
            <li class="text-[#164195]">
              {name &&
                <a href={item} dangerouslySetInnerHTML={{ __html: name }}></a>}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Breadcrumb;
