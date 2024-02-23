import { Signal, useSignal } from "@preact/signals";
import { useCallback, useState } from "preact/hooks";
import Button from "$store/components/ui/Button.tsx";
import { invoke } from "$store/runtime.ts";
import { formatPrice } from "$store/sdk/format.ts";

export interface IProps {
  id: number;
  quantity: number;
  seller: string;
}
export interface Props {
  items: IProps;
}

export interface Simulate {
  deadline?: number | null;
  name?: string | null;
  value?: number | null;
}

const formatShippingEstimate = (estimate: string) => {
  const [, time, type] = estimate.split(/(\d+)/);

  if (type === "bd") return `${time} dias úteis`;
  if (type === "d") return `${time} dias`;
  if (type === "h") return `${time} horas`;
};

function Shipping({ items }: Props) {
  const postalCode = useSignal("");
  const loading = useSignal(false);
  const [simulateResult, setSimuteResult] = useState<
    Simulate[] | null | undefined
  >([]);

  const handleSimulation = useCallback(async () => {
    if (postalCode.value.length !== 8) {
      return;
    }

    try {
      loading.value = true;
      const result = await invoke.wake.actions.shippingSimulation({
        cep: postalCode.value,
        productVariantId: items.id,
        quantity: items.quantity,
      });

      const filterResult = result?.map((obj) => ({
        value: obj?.value,
        deadline: obj?.deadline,
        name: obj?.name,
      }));
      console.log(filterResult);
      setSimuteResult(filterResult);
    } catch (e) {
      setSimuteResult(null);
    } finally {
      loading.value = false;
    }
  }, [postalCode.value, items.id, items.quantity]);

  return (
    <div class="flex flex-col gap-2">
      <div class="flex flex-col">
        <span class="text-[#0C0B0B] text-xs lg:text-sm">
          Calcule o frete e prazo de entrega
        </span>
      </div>

      <form
        class="join"
        onSubmit={(e) => {
          e.preventDefault();
          handleSimulation();
        }}
      >
        <div class="border-[0.5px] border-[#A1A1A1] p-1 rounded-s w-full flex justify-between">
          <input
            type="text"
            class="appearance-none focus:outline-none w-[70%] outline-0 pl-3"
            placeholder="Informar um CEP"
            value={postalCode.value}
            maxLength={8}
            onChange={(e) => {
              postalCode.value = e.currentTarget.value;
            }}
          />
          <Button
            type="submit"
            loading={loading.value}
            class="font-bold text-white text-base bg-[#15AD40] w-24 rounded-xl h-[36px]"
          >
            Calcular
          </Button>
        </div>
      </form>
      <div>
        <a
          href="https://buscacepinter.correios.com.br/app/endereco/index.php?t"
          target="_blank"
          rel="noopener noreferrer"
          class="text-[#656464] text-[10px] underline lg:text-xs"
        >
          Não sei meu CEP
        </a>
      </div>
      {simulateResult
        ? (
          <ul class="flex flex-col gap-2">
            {simulateResult?.map((item, index) => (
              <li
                key={index}
                class="flex justify-between bg-[#F5F5F5] px-4 py-2 items-center rounded-lg"
              >
                <div class="flex flex-col gap 2">
                  <span class="text-xs text-[#282828] font-semibold">
                    {item.value != null && item?.value > 0
                      ? formatPrice(item.value)
                      : "Frete grátis"}
                  </span>
                  <span class="text-[#A1A1A1] text-xs font-normal">
                    receber em até {item.deadline} dia úteis
                  </span>
                </div>
                <p class="text-[#656464] font-semibold uppercase text-sm">
                  {item.name}
                </p>
              </li>
            ))}
          </ul>
        )
        : <p class="text-red-600">CEP ERRADO!</p>}
      <div>
      </div>
    </div>
  );
}

export default Shipping;
