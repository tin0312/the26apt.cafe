// app/showMenu/page.js  (if using Next.js 13+ with App Router)
// or pages/showMenu.js (if using Pages Router)

import Image from "next/image";

const drinks = [
  {
    id: 1,
    name: "Matcha Latte",
    image: "/images/matcha-latte.jpg",
  },
  {
    id: 2,
    name: "Creamy Matcha",
    image: "/images/creamy-matcha.jpg",
  },
  {
    id: 3,
    name: "Coco Matcha",
    image: "/images/coco-matcha.jpg",
  },
  {
    id: 4,
    name: "Grass Jelly Coffee",
    image: "/images/grass-jelly-coffee.jpg",
  },
  {
    id: 5,
    name: "Almond Coffee",
    image: "/images/almond-coffee.jpg",
  }
];

export default function ShowMenu() {
  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h1 className="text-2xl font-bold">Our Drinks</h1>
      
      <div className="flex flex-col gap-8">
        {drinks.map((drink) => (
          <div key={drink.id} className="flex flex-col items-center">
            <Image
              src={drink.image}
              alt={drink.name}
              width={300}
              height={300}
              className="rounded-xl shadow-lg"
            />
            <p className="mt-2 text-lg font-medium">{drink.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
