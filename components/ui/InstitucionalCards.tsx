export interface Cards {
  title: string;
  /**
        @format html
    */
  description: string;
}

export interface Props {
  cards: Cards[];
}

export default function InstitucionalCards(cards: Props) {
  return (
    <section class="container mt-4">
      <div class="lg:grid grid-cols-3 gap-5">
        {cards && cards.cards.map((card) => {
          return (
            <div class="card border p-[45px] rounded-[22px] border-solid border-[#E9E9E9] mb-4">
              <h3 class="mb-6 font-semibold text-[30px] leading-9">
                {card.title}
              </h3>
              <p
                dangerouslySetInnerHTML={{ __html: card.description }}
                class="font-normal text-base leading-5"
              >
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
