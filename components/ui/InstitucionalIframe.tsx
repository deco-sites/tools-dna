export interface Props {
  link: string;
}

export default function InstitucionalIframe({ link }: Props) {
  return (
    <section class="container mt-4 rounded-[36px] overflow-hidden">
      <iframe
        height="450"
        loading="lazy"
        src={link}
        style="border:0;"
        width="100%"
      >
      </iframe>
    </section>
  );
}
