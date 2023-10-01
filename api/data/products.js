const products = [
  {
    image:
      "https://www.backmarket.fr/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D1920/https://d2e6ccujb3mkqf.cloudfront.net/8905dbe1-9cec-4485-8ce9-2fdb8fe154b5-1_860c177c-8302-4f6b-8f26-e3e31c9aca71.jpg",
    name: "Ordinateur portable HP",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    category: "Ordinateurs portables",
    brand: "HP",
    price: 999,
    rating: 5,
    numRev: 11,
    stock: 16,
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeNUClUTkvwZ_UO7FHKRoSwVGl2KwonHNB-A&usqp=CAU",
    name: "Ordinateur portable Lenovo",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    category: "Ordinateurs portables",
    brand: "Lenovo",
    price: 580,
    rating: 4.5,
    numRev: 25,
    stock: 20,
  },
  {
    image: "https://m.media-amazon.com/images/I/71vCYXh6IXL._AC_UL320_.jpg",
    name: "Ordinateur portable Lenovo",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    category: "Ordinateurs portables",
    brand: "iSTYLE",
    price: 400,
    rating: 4.5,
    numRev: 25,
    stock: 15,
  },
  {
    image:
      "data:image/jpeg;base64,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",
    name: "Souris",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    category: "Accessoires d'ordinateurs",
    brand: "Redgear",
    price: 350,
    rating: 3,
    numRev: 46,
    stock: 2,
  },
  {
    image: "https://m.media-amazon.com/images/I/71hhHx4BSkL._AC_UY218_.jpg",
    name: "Télévision Sony Bravia",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    category: "Télévisions",
    brand: "Sony",
    price: 770,
    rating: 4.5,
    numRev: 17,
    stock: 9,
  },
  {
    image:
      "data:image/jpeg;base64,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",
    name: "Téléphone mobile",
    rating: "5",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    category: "Téléphones mobiles",
    brand: "Oppo",
    price: 300,
    rating: 2,
    numRev: 33,
    stock: 0,
  },
  {
    image: "https://m.media-amazon.com/images/I/71zkY0wuu5L._AC_UL320_.jpg",
    name: "Téléphone mobile",
    rating: "4.5",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    category: "Téléphones mobiles",
    brand: "Samsung",
    price: 302.42,
    rating: 4,
    numRev: 33,
    stock: 10,
  },
  {
    image: "https://m.media-amazon.com/images/I/610pghkO81L._AC_UL320_.jpg",
    name: "Téléphone mobile",
    rating: "4.5",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    category: "Téléphones mobiles",
    brand: "Apple",
    price: 1300,
    rating: 4.5,
    numRev: 33,
    stock: 30,
  },
  {
    image:
      "https://i.pcmag.com/imagery/roundups/007y4PjTbtgMMDz5SnUq9Em-1.fit_lim.size_1838x.jpg",
    name: "Clavier",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    category: "Accessoires d'ordinateurs",
    brand: "HP",
    price: 120,
    rating: 4,
    numRev: 20,
    stock: 50,
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCRrVj0auKueDwvlAc6czV92ee1kkXYjDSGQ&usqp=CAU",
    name: "Écouteur",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    category: "Écouteurs",
    brand: "Boat",
    price: 90,
    rating: 5,
    numRev: 14,
    stock: 4,
  },

  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdOnc-l4LAoW_xfugMRR9iUj_6tH4sKpcDgg&usqp=CAU",
    name: "Souris Apple",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    category: "Accessoires d'ordinateurs",
    brand: "Apple",
    price: 500,
    rating: 5,
    numRev: 180,
    stock: 80,
  },
  {
    image:
      "https://specials-images.forbesimg.com/imageserve/5ede6a4407e58a0007201a40/960x0.jpg?cropX1=33&cropX2=1935&cropY1=0&cropY2=1267",
    name: "Télévision Ultrawide",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    category: "Télévisions",
    brand: "LG",
    price: 320,
    rating: 4.0,
    numRev: 60,
    stock: 14,
  },
  {
    image: "https://m.media-amazon.com/images/I/81m+F5v-n9L._AC_UL320_.jpg",
    name: "Télévision Toshiba",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    category: "Télévisions",
    brand: "LG",
    price: 356,
    rating: 4.0,
    numRev: 60,
    stock: 14,
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZnLxLWRYFqu5bscSZe09eCmptznpnGfD18w&usqp=CAU",
    name: "Écouteur Tiitan",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    category: "Écouteurs",
    brand: "Tiitan",
    price: 80,
    rating: 5,
    numRev: 14,
    stock: 160,
  },
  {
    image: "https://m.media-amazon.com/images/I/71Nb5eyKrpL._AC_UL320_.jpg",
    name: "Écouteur Qxq",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    category: "Écouteurs",
    brand: "QXQ",
    price: 70,
    rating: 5,
    numRev: 14,
    stock: 160,
  },
];
module.exports = products;
