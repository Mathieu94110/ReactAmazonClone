type pricesRange = {
  id: number;
  name: string;
  array: number[];
};

export const prices: pricesRange[] = [
  {
    id: 0,
    name: "Tout",
    array: [0, 50000],
  },
  {
    id: 1,
    name: "50€ à 150€",
    array: [50, 150],
  },
  {
    id: 2,
    name: "151€ à 250€",
    array: [151, 250],
  },
  {
    id: 3,
    name: "251€ à 350€",
    array: [251, 350],
  },
  {
    id: 4,
    name: "351€ à 450€",
    array: [351, 450],
  },
  {
    id: 5,
    name: "451€ à 650€",
    array: [451, 650],
  },
  {
    id: 6,
    name: "651€ à 850€",
    array: [651, 850],
  },
  {
    id: 7,
    name: "Plus de 851€",
    array: [851, 50000],
  },
];
