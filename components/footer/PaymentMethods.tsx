import Icon from "$store/components/ui/Icon.tsx";

export interface PaymentItem {
  label:
    | "Diners"
    | "Elo"
    | "Mastercard"
    | "Pix"
    | "Visa"
    | "Boleto"
    | "JCB"
    | "Aura"
    | "American Express"
    | "Discover"
    | "Hipercard";
}

export default function PaymentMethods(
  { content }: { content?: { title?: string; items?: PaymentItem[] } },
) {
  return (
    <>
      {content && content.items && content.items.length > 0 && (
        <div class="flex flex-col gap-4">
          {content.title && <h3 class="text-lg">{content.title}</h3>}
          <ul class="gap-4 grid grid-cols-5">
            {content.items.map((item) => {
              return (
                <li
                  class="border"
                  title={item.label}
                >
                  <Icon
                    width={48}
                    height={32}
                    strokeWidth={1}
                    id={item.label}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
