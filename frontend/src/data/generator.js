const authenticItems = [
  { title: "Traditional Handcrafted Teapot", tag: "teapot", category: "Home", price: 150, desc: "Authentic silver Moroccan teapot, slightly used but in great condition. Perfect for mint tea.", imageDef: "/images/moroccan_teapot_1776380244341.png" },
  { title: "Berber Wool Rug (Zarbiya)", tag: "rug", category: "Home", price: 800, desc: "Beautiful red and black traditional Berber rug. Very clean.", imageDef: "/images/moroccan_rug_1776380259013.png" },
  { title: "Vintage Leather Pouf", tag: "pouf", category: "Home", price: 250, desc: "Hand-stitched leather pouf from Marrakech. Leather is aged beautifully.", imageDef: "/images/moroccan_pouf_1776380730200.png" },
  { title: "Moroccan Tagine Clay Pot", tag: "tagine", category: "Home", price: 80, desc: "Medium size tagine from Safi. Hand painted and ready for cooking.", imageDef: "/images/moroccan_tagine_1776380279989.png" },
  { title: "Women's Caftan", tag: "caftan", category: "Clothing", price: 1000, desc: "Beautiful green caftan with intricate embroidery.", imageDef: "/images/moroccan_caftan_1776380231578.png" },
  { title: "Leather Babouche Slippers", tag: "babouche", category: "Clothing", price: 120, desc: "Handmade authentic yellow Moroccan babouche shoes.", imageDef: "/images/moroccan_babouche_1776382468296.png" },
  { title: "Moroccan Zellige Table", tag: "zellige", category: "Home", price: 700, desc: "Mosaic tile table top, great for gardens.", imageDef: "/images/moroccan_pouf_1776380730200.png" },
  { title: "Traditional Copper Lamp", tag: "lamp", category: "Home", price: 300, desc: "Brass lantern with beautiful glass cutouts.", imageDef: "/images/moroccan_tagine_1776380279989.png" },
  { title: "Argan Oil (100% Pure)", tag: "argan", category: "Home", price: 150, desc: "Pure cosmetic argan oil sourced from Agadir.", imageDef: "/images/moroccan_teapot_1776380244341.png" },
  { title: "Spices Set (Saffron & Cumin)", tag: "spices", category: "Home", price: 90, desc: "Authentic Moroccan spices from the vibrant souks.", imageDef: "/images/moroccan_rug_1776380259013.png" },
  { title: "Handwoven Blanket", tag: "blanket", category: "Home", price: 400, desc: "Warm Berber blanket with pom poms.", imageDef: "/images/moroccan_caftan_1776380231578.png" },
  { title: "Moroccan Tea Glasses (Set of 6)", tag: "glasses", category: "Home", price: 120, desc: "Colorful painted tea glasses.", imageDef: "/images/moroccan_teapot_1776380244341.png" },
  { title: "Leather Travel Bag", tag: "bag", category: "Clothing", price: 500, desc: "Large authentic leather weekender bag from Fes.", imageDef: "/images/moroccan_babouche_1776382468296.png" },
  { title: "Vintage Oud Instrument", tag: "oud", category: "Sports", price: 1200, desc: "Traditional wooden musical instrument.", imageDef: "/images/moroccan_rug_1776380259013.png" },
  { title: "Ceramic Serving Bowl", tag: "bowl", category: "Home", price: 110, desc: "Hand painted bowl from Safi.", imageDef: "/images/moroccan_tagine_1776380279989.png" },
  { title: "Woven Wicker Basket", tag: "basket", category: "Home", price: 60, desc: "Great for shopping or storage.", imageDef: "/images/moroccan_pouf_1776380730200.png" },
  { title: "Moroccan Mint Leaves (Fresh)", tag: "mint", category: "Home", price: 20, desc: "Locally grown fresh mint.", imageDef: "/images/moroccan_teapot_1776380244341.png" },
  { title: "Traditional Hand Loom", tag: "loom", category: "Home", price: 350, desc: "Small scale weaving loom for crafts.", imageDef: "/images/moroccan_rug_1776380259013.png" },
  { title: "Djellaba (Men's)", tag: "djellaba", category: "Clothing", price: 300, desc: "Warm winter wool Djellaba.", imageDef: "/images/moroccan_caftan_1776380231578.png" },
  { title: "Decorative Majorelle Planter", tag: "planter", category: "Home", price: 180, desc: "Painted in iconic Majorelle blue.", imageDef: "/images/moroccan_pouf_1776380730200.png" }
];

const cities = ["Casablanca", "Rabat", "Marrakech", "Tangier", "Agadir", "Fes", "Meknes"];
const owners = ["Amine", "Youssef", "Fatima", "Sara", "Khadija", "Mehdi", "Hassan", "Nadia", "Ayoub", "Hajar"];

const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const generateFakeItems = () => {
  const fakeItems = [];
  const shuffledItems = shuffleArray(authenticItems);
  
  for (let i = 0; i < 50; i++) {
    const itemTpl = shuffledItems[i % shuffledItems.length];
    const lookTpl = shuffledItems[(i + 3) % shuffledItems.length];
    const randomPrice = itemTpl.price + (Math.floor(Math.random() * 5) * 10);

    fakeItems.push({
      id: Date.now() + i,
      isGenerated: true,
      title: itemTpl.title,
      description: itemTpl.desc,
      image: itemTpl.imageDef,
      price: randomPrice,
      city: cities[Math.floor(Math.random() * cities.length)],
      category: itemTpl.category,
      owner: owners[Math.floor(Math.random() * owners.length)],
      lookingForImage: lookTpl.imageDef,
      lookingForDesc: `Looking for an authentic ${lookTpl.tag}.`
    });
  }
  
  return fakeItems;
}
