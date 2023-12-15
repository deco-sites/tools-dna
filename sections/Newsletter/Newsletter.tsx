import Header from "$store/components/ui/SectionHeader.tsx";

export interface Form {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Props {
  title?: string;
  /** @format textarea */
  description?: string;
  form?: Form;
  layout?: {
    headerFontSize?: "Large" | "Normal";
    content?: {
      border?: boolean;
      alignment?: "Center" | "Left" | "Side to side";
      bgColor?: "Normal" | "Reverse";
    };
  };
}

const DEFAULT_PROPS: Props = {
  title: "",
  description: "",
  form: {
    placeholder: "Digite seu email",
    buttonText: "Inscrever",
    helpText:
      'Ao se inscrever, você concorda com nossa <a class="link" href="/politica-de-privacidade">Política de privacidade</a>.',
  },
  layout: {
    headerFontSize: "Large",
    content: {
      border: false,
      alignment: "Center",
    },
  },
};

export default function Newsletter(props: Props) {
  const { title, description, form, layout } = { ...DEFAULT_PROPS, ...props };
  const isReverse = layout?.content?.bgColor === "Reverse";
  const bordered = Boolean(layout?.content?.border);

  const headerLayout = (
    <Header
      title={title}
      description={description}
      alignment={layout?.content?.alignment === "Left" ? "left" : "center"}
      colorReverse={isReverse}
      fontSize={layout?.headerFontSize}
    />
  );

  const formLayout = form && (
    <form action="/" class="w-full flex flex-col gap-4">
      <div class="relative flex flex-col lg:flex-row gap-3">
        <input
          class="w-full input input-bordered"
          type="text"
          placeholder={form.placeholder}
        />
        <button
          class={`btn ${isReverse ? "btn-accent" : ""}`}
          type="submit"
        >
          {form.buttonText}
        </button>
      </div>
      {
        /* {form.helpText && (
        <div
          class="text-sm"
          dangerouslySetInnerHTML={{ __html: form.helpText }}
        />
      )} */
      }
    </form>
  );

  const bgLayout = isReverse
    ? "bg-secondary text-secondary-content"
    : "bg-transparent";

  return (
    <div
      class={`${
        bordered
          ? isReverse ? "bg-secondary-content" : "bg-secondary"
          : bgLayout
      } ${bordered ? "p-4 lg:p-16" : "p-0"}`}
    >
      {(!layout?.content?.alignment ||
        layout?.content?.alignment === "Center") && (
        <div
          class={`newsletter-content container flex flex-col rounded p-4 gap-6 lg:p-16 lg:gap-12 ${bgLayout}`}
        >
          {headerLayout}
          <div class="flex justify-center form-content">
            {formLayout}
          </div>
        </div>
      )}
      {layout?.content?.alignment === "Left" && (
        <div
          class={`newsletter-content container flex flex-col rounded p-4 gap-6 lg:p-16 lg:gap-12 ${bgLayout}`}
        >
          {headerLayout}
          <div class="flex justify-start">
            {formLayout}
          </div>
        </div>
      )}
      {layout?.content?.alignment === "Side to side" && (
        <div
          class={`newsletter-content container flex flex-col rounded justify-between lg:flex-row p-4 gap-6 lg:p-16 lg:gap-12 ${bgLayout}`}
        >
          {headerLayout}
          <div class="form-content w-full flex justify-center">
            {formLayout}
          </div>
        </div>
      )}
    </div>
  );
}
