import type {
  AggregateOffer,
  UnitPriceSpecification,
} from "apps/commerce/types.ts";

const bestInstallment = (
  acc: UnitPriceSpecification | null,
  curr: UnitPriceSpecification,
) => {
  if (curr.priceComponentType !== "https://schema.org/Installment") {
    return acc;
  }

  if (!acc) {
    return curr;
  }

  if (acc.price > curr.price) {
    return curr;
  }

  if (acc.price < curr.price) {
    return acc;
  }

  if (
    acc.billingDuration && curr.billingDuration &&
    acc.billingDuration < curr.billingDuration
  ) {
    return curr;
  }

  return acc;
};

const installmentToString = (
  installment: UnitPriceSpecification,
  // sellingPrice: number,
) => {
  const {
    billingDuration,
    billingIncrement,
    // price
  } = installment;

  if (!billingDuration || !billingIncrement) {
    return "";
  }

  // const withTaxes = sellingPrice < price;

  // return `${ billingDuration }x de R$ ${ billingIncrement } ${ withTaxes ? "com juros" : "sem juros" }`;
  return `${billingDuration}x`;
};

export const useOffer = (aggregateOffer?: AggregateOffer) => {
  const offer = aggregateOffer?.offers[0];
  const listPrice = offer?.priceSpecification.find((spec) =>
    spec.priceType === "https://schema.org/ListPrice"
  );
  const installment = offer?.priceSpecification.reduce(bestInstallment, null);
  const seller = offer?.seller;
  const price = offer?.price;
  const parcelamentoValue = offer?.priceSpecification.find((item) =>
    item.billingDuration === 10
  );
  const pixPrice = offer?.priceSpecification.find((item) =>
    item.name === "PIX"
  );
  const availability = offer?.availability;
  const inventory = offer?.inventoryLevel.value;

  return {
    price,
    listPrice: listPrice?.price,
    availability,
    seller,
    inventory,
    pixPrice: pixPrice?.price,
    parcelamentoValue: parcelamentoValue?.billingIncrement,
    installments: installment && price
      ? installmentToString(installment)
      : null,
  };
};
