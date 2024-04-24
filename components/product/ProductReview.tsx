import { useSignal } from "@preact/signals";
import { invoke } from "$store/runtime.ts";
import type { JSX } from "preact";
import Button from "deco-sites/tools-dna/components/ui/Button.tsx";

export interface Form {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Props {
  IDProduct: string;
  layout?: {
    tiled?: boolean;
  };
}

function ProductReview({ IDProduct, layout = {} }: Props) {
  const { tiled = false } = layout;
  const loading = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const name = (
        e.currentTarget.elements.namedItem("name") as RadioNodeList
      )?.value;
      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;
      const review =
        (e.currentTarget.elements.namedItem("review") as RadioNodeList)?.value;
      const rating =
        (e.currentTarget.elements.namedItem("ddlNota") as RadioNodeList)?.value;

      await invoke.wake.actions.review.create({
        email,
        name,
        productVariantId: Number(IDProduct),
        rating: Number(rating),
        review,
      });
    } finally {
      setTimeout(() => {
        loading.value = false;
      }, 3000);
    }
  };

  return (
    <div
      class={`flex ${
        tiled
          ? "flex-col gap-4 lg:flex-row lg:w-full lg:justify-between"
          : "flex-col gap-4"
      }`}
    >
      <div class="flex flex-col gap-4">
        <form
          class="form-control"
          onSubmit={handleSubmit}
        >
          <div class="flex flex-wrap flex-col gap-3 ">
            <input
              name="name"
              class="flex-auto md:flex-none input input-bordered md:w-80 text-base-content"
              placeholder={"Digite seu nome"}
            />
            <input
              name="email"
              class="flex-auto md:flex-none input input-bordered md:w-80 text-base-content"
              placeholder={"Digite seu email"}
            />
            <textarea
              class="input input-bordered w-full text-base-content pt-[10px]"
              name="review"
              placeholder={"O que achou do produto?"}
            >
            </textarea>

            <select name="ddlNota" class="input-bordered w-full">
              <option selected value="5">Excelente</option>
              <option value="4">Muito Bom</option>
              <option value="3">Bom</option>
              <option value="2">Ruim</option>
              <option value="1">Muito Ruim</option>
            </select>
            <Button
              type="submit"
              class="font-semibold text-white text-2xl bg-[#15AD40] min-h-[70px] rounded-xl w-full px-4"
            >
              {loading.value
                ? (
                  <span>
                    Enviado com sucesso!{" "}
                    <span class="loading loading-spinner loading-xs" />
                  </span>
                )
                : <span>Avaliar este produto</span>}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductReview;
