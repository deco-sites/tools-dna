export interface extraLink {
  title: string;
  href: string;
}

export interface Props {
  links?: Array<extraLink>;
}
// { item }: {item: extraLink[];}

function ExtraItems() {
  return (
    <>
      {
        /* {links.map(({ href, title }) => (
        <a href={href} aria-label={title}>
          <p>{title}</p>
        </a>
      ))} */
      }
    </>
  );
}

export default ExtraItems;
