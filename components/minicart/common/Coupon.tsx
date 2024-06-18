import Button from "$store/components/ui/Button.tsx";
import { useState } from "preact/hooks";

export interface Props {
  coupon?: string;
  onAddCoupon: (text: string) => Promise<void>;
}

function Coupon({ coupon, onAddCoupon }: Props) {
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState(false);

  return (
    <div class="flex justify-between items-center px-4">
      <span class="text-sm text-[#727272]">
        {/* Cupom de desconto */}
      </span>
      {display
        ? (
          <form
            class="join my-4 w-full relative"
            onSubmit={async (e) => {
              e.preventDefault();
              const { currentTarget: { elements } } = e;

              const input = elements.namedItem("coupon") as HTMLInputElement;
              const text = input.value;

              if (!text) return;

              try {
                setLoading(true);
                await onAddCoupon(text);
                setDisplay(false);
              } finally {
                setLoading(false);
              }
            }}
          >
            <input
              name="coupon"
              class="w-full input input-bordered rounded-full"
              type="text"
              value={coupon ?? ""}
              placeholder={"Insira o cupom"}
            />
            <Button
              class="btn text-white absolute !max-h-[32px] !min-h-[32px] rounded-full right-6 h-8 top-2 w-auto text-sm bg-[#4BAEE9]"
              type="submit"
              htmlFor="coupon"
              loading={loading}
            >
              Adicionar
            </Button>
          </form>
        )
        : (
          <Button
            class="btn-ghost underline font-normal text-sm text-[#727272]"
            onClick={() => setDisplay(true)}
          >
            {coupon || "Aplicar cupom de desconto"}
          </Button>
        )}
    </div>
  );
}

export default Coupon;
