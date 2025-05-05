import { HTMLWidget as HTML } from "apps/admin/widgets.ts";

interface Props {
  content: HTML;
}

function InstitucionalContent({ content }: Props) {
  return (
    <section class="container">
      <div class="mt-4 mb-4" dangerouslySetInnerHTML={{ __html: content }}>
      </div>
    </section>
  );
}

export default InstitucionalContent;
