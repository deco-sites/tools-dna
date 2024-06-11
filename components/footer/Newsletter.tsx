// import { useSignal } from "@preact/signals";
// import { invoke } from "$store/runtime.ts";
// import type { JSX } from "preact";

// export interface Form {
//   placeholder?: string;
//   buttonText?: string;
//   /** @format html */
//   helpText?: string;
// }

// export interface Props {
//   content: {
//     title?: string;
//     /** @format textarea */
//     description?: string;
//     form?: Form;
//   };
//   layout?: {
//     tiled?: boolean;
//   };
// }

// function Newsletter(
//   { content, layout = {} }: Props,
// ) {
//   const { tiled = false } = layout;
//   const loading = useSignal(false);

//   const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
//     e.preventDefault();

//     try {
//       loading.value = true;
//       const name = "";
//       const email =
//         (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;
//       await invoke.wake.actions.newsletter.register({ email, name });

//       // await invoke.vtex.actions.newsletter.subscribe({ email });
//     } finally {
//       setTimeout(() => {
//         loading.value = false;
//       }, 3000);
//     }
//   };

//   return (
//     <div
//       class={`flex ${
//         tiled
//           ? "flex-col gap-4 lg:flex-row lg:w-full lg:justify-between"
//           : "flex-col gap-4"
//       }`}
//     >
//       <div class="flex flex-col gap-4">
//         {content?.title && (
//           <h3 class={tiled ? "text-2xl lg:text-3xl" : "text-lg"}>
//             {content?.title}
//           </h3>
//         )}
//         {content?.description && <div>{content?.description}</div>}
//       </div>
//       <div class="flex flex-col gap-4">
//         <form
//           class="form-control"
//           onSubmit={handleSubmit}
//         >
//           <div class="flex flex-wrap gap-3">
//             <input
//               name="email"
//               class="flex-auto md:flex-none input input-bordered md:w-80 text-base-content"
//               placeholder={content?.form?.placeholder || "Digite seu email"}
//             />
//             <button
//               type="submit"
//               class="btn disabled:loading"
//               disabled={loading}
//             >

//               {loading.value
//                 ? (
//                   <span>
//                     Assinado com sucesso!{" "}
//                     <span class="loading loading-spinner loading-xs" />
//                   </span>
//                 )
//                 : <span>{content?.form?.buttonText || "Inscrever"}</span>
//               }

//             </button>
//           </div>
//         </form>
//         {content?.form?.helpText && (
//           <div
//             class="text-sm"
//             dangerouslySetInnerHTML={{ __html: content?.form?.helpText }}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default Newsletter;

import Header from "$store/components/ui/SectionHeader.tsx";
import { useSignal } from "@preact/signals";
import { invoke } from "$store/runtime.ts";
import type { JSX } from "preact";
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

  const loading = useSignal(false);
  const submitStatus = useSignal("");

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;
      submitStatus.value = "ENVIANDO";

      const name = (e.currentTarget.elements.namedItem("name") as RadioNodeList)
        ?.value;
      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;
      console.log("Email do cliente: ", email, name);
      await invoke.wake.actions.newsletter.register({ email, name });

      submitStatus.value = "ENVIADO COM SUCESSO";
    }
    // deno-lint-ignore no-unused-vars
    catch (err) {
      submitStatus.value = "ERRO AO ENVIAR";
    }
    finally {
      setTimeout(() => {
        loading.value = false;
        submitStatus.value = "";
      }, 2000);
    }
  };

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
    <form onSubmit={handleSubmit} class="w-full flex flex-col gap-4">
      <div class="relative flex flex-col lg:flex-row gap-3">
        <input
          class="w-full input input-bordered"
          type="text"
          name="email"
          placeholder={form.placeholder}
        />
        <input type={"hidden"} value={"."} name={"name"} />
        <button
          type="submit"
          class={`btn ${isReverse ? "btn-accent" : ""}`}
        >
          {loading.value ? (
            <span>
              {submitStatus.value === "ENVIANDO" ? (
                <>
                  Enviando suas informações!{" "}
                  <span class="loading loading-spinner loading-xs" />
                </>
              ) : submitStatus.value === "ENVIADO COM SUCESSO" ? (
                <span>Enviado com sucesso!</span>
              ) : <span>Cadastrar</span>
              }

            </span>
          ) : <span id={"botao-avaliacao"}>Cadastrar</span>
          }

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
      class={`${bordered
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
