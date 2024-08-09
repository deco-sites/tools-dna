import { useSignal } from "@preact/signals";
import { invoke } from "$store/runtime.ts";
import type { JSX } from "preact";
import Button from "site/components/ui/Button.tsx";
import { useId } from "site/sdk/useId.ts";
import Icon from "site/components/ui/Icon.tsx";
import Modal from "site/components/ui/Modal.tsx";

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
  const id = useId();
  const open = useSignal(false);
  const submitStatus = useSignal(""); // Nova variável de estado para o status do envio

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;
      submitStatus.value = "ENVIANDO";

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

      // Atualiza o status para "ENVIADO COM SUCESSO" quando a requisição for bem-sucedida
      submitStatus.value = "ENVIADO COM SUCESSO";
    } catch {
      // Trate o erro aqui, se necessário
      submitStatus.value = "ERRO AO ENVIAR"; // Adicionei uma mensagem de erro opcional
    } finally {
      setTimeout(() => {
        loading.value = false;
        setTimeout(() => {
          submitStatus.value = ""; // Retorna ao estado normal após 2 segundos
          open.value = false;
        }, 2000); // 2 segundos para mostrar "ENVIADO COM SUCESSO"
      }, 2000);
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
        <Button
          class="hidden sm:inline-flex btn-ghost"
          onClick={() => open.value = true}
        >
          <div class="font-semibold text-white text-2xl bg-[#15AD40] min-h-[70px] rounded-xl w-full px-4 flex items-center justify-center">
            <span>Avaliar este produto</span>
          </div>
        </Button>

        <div id={id}>
          <Modal
            loading="lazy"
            open={open.value}
            onClose={() => open.value = false}
          >
            <div class="modal-box w-2/5 max-w-7xl">
              <form
                class="form-control"
                onSubmit={handleSubmit}
              >
                <div class="flex flex-wrap flex-col gap-3 ">
                  <input
                    name="name"
                    class="flex-auto md:flex-none input input-bordered md:w-full text-base-content"
                    placeholder={"Digite seu nome"}
                  />
                  <input
                    name="email"
                    class="flex-auto md:flex-none input input-bordered md:w-full text-base-content"
                    placeholder={"Digite seu email"}
                  />
                  <textarea
                    class="input input-bordered w-full text-base-content pt-[10px]"
                    cols={40}
                    rows={40}
                    name="review"
                    placeholder={"O que achou do produto?"}
                  >
                  </textarea>

                  <select
                    name="ddlNota"
                    class="input-bordered w-full border h-8"
                  >
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
                        <span id={"botao-avaliacao"}>
                          {submitStatus.value === "ENVIANDO"
                            ? (
                              <>
                                Enviando
                                <span class="loading loading-spinner loading-xs" />
                              </>
                            )
                            : submitStatus.value === "ENVIADO COM SUCESSO"
                            ? <span>Enviado com sucesso!</span>
                            : <span>Avaliar este produto</span>}
                        </span>
                      )
                      : (
                        <span id={"botao-avaliacao"}>
                          Avaliar este produto
                        </span>
                      )}
                  </Button>
                </div>
              </form>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default ProductReview;
