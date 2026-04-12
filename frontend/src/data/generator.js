const itemTemplates = [
  { title: "Traditional Handcrafted Teapot", tag: "teapot", category: "Home", price: 150, desc: "Authentic silver Moroccan teapot, slightly used but in great condition. Perfect for mint tea." },
  { title: "Berber Wool Rug (Zarbiya)", tag: "rug", category: "Home", price: 800, desc: "Beautiful red and black traditional Berber rug. Very clean." },
  { title: "Used iPhone 12 - 128GB", tag: "smartphone", category: "Electronics", price: 3500, desc: "Screen is slightly cracked at the bottom but works perfectly. Battery at 85%." },
  { title: "Vintage Leather Pouf", tag: "pouf", category: "Home", price: 250, desc: "Hand-stitched leather pouf from Marrakech. Leather is aged beautifully." },
  { title: "Mathematics Textbook", tag: "textbook", category: "Books", price: 100, desc: "Calculus 101 textbook. No highlights inside. Needed for engineering students." },
  { title: "Acoustic Guitar - Bwin", tag: "guitar", category: "Sports", price: 400, desc: "Good for beginners. Strings are new." },
  { title: "Moroccan Tagine Clay Pot", tag: "tagine", category: "Home", price: 80, desc: "Medium size tagine from Safi. Hand painted and ready for cooking." },
  { title: "PlayStation 4 Console", tag: "playstation", category: "Electronics", price: 1500, desc: "Comes with one controller and FIFA 22." },
  { title: "Men's Winter Jacket", tag: "jacket", category: "Clothing", price: 300, desc: "Size L. Worn twice. Very warm for winter." },
  { title: "Mountain Bike (VTT)", tag: "bicycle", category: "Vehicles", price: 1200, desc: "Rockrider mountain bike. Tires need some air." },
  { title: "Traditional Men's Djellaba", tag: "djellaba", category: "Clothing", price: 400, desc: "Handmade Djellaba, size Medium. Worn once for Eid." },
  { title: "Wooden Dining Chair", tag: "chair", category: "Home", price: 150, desc: "Classic wooden chair, sturdy. Has a tiny scratch on the leg." },
  { title: "HP Laptop Core i5", tag: "laptop", category: "Electronics", price: 2500, desc: "Used for 3 years. Battery lasts 2 hours. Good for studying." },
  { title: "Historical Novel", tag: "novel", category: "Books", price: 50, desc: "Famous historical novel. Good condition." },
  { title: "Set of 6 Moroccan Tea Glasses", tag: "tea", category: "Home", price: 90, desc: "Colorful tea glasses with gold traditional patterns." },
  { title: "Dumbbell Weights 10kg", tag: "dumbbell", category: "Sports", price: 200, desc: "Set of two 5kg dumbbells. Barely used." },
  { title: "Baby Stroller", tag: "stroller", category: "Toys", price: 600, desc: "Foldable baby stroller. Very clean and safe." },
  { title: "Motorcycle Helmet", tag: "helmet", category: "Vehicles", price: 150, desc: "Black helmet size M. DOT certified." },
  { title: "Women's Caftan", tag: "caftan", category: "Clothing", price: 1000, desc: "Beautiful green caftan with intricate embroidery." },
  { title: "Small Microwave", tag: "microwave", category: "Electronics", price: 500, desc: "Small microwave, heats up food perfectly." }
];

const lookingForTemplates = [
  { tag: "laptop", desc: "Looking to exchange this for a working laptop for my studies. Don't mind if it's old." },
  { tag: "smartphone", desc: "Need a smartphone. Willing to add a bit of cash if your phone is worth more." },
  { tag: "bicycle", desc: "I want a bicycle to commute to work every day." },
  { tag: "playstation", desc: "Looking to trade for a gaming console, preferably a PS4 or Xbox." },
  { tag: "microwave", desc: "I need a microwave for my new apartment." },
  { tag: "book", desc: "I'll trade this for any interesting historical, science, or philosophy books." },
  { tag: "desk", desc: "Looking for a small computer desk or a comfortable chair." },
  { tag: "jacket", desc: "Exchange for traditional Moroccan clothing or modern branded jackets." },
  { tag: "guitar", desc: "Want to learn music, looking for a beginner acoustic guitar!" },
  { tag: "carpet", desc: "Looking for a clean traditional rug for my living room." }
];

const cities = ["Casablanca", "Rabat", "Marrakech", "Tangier", "Agadir", "Fes", "Meknes"];
const owners = ["Amine", "Youssef", "Fatima", "Sara", "Khadija", "Mehdi", "Hassan", "Nadia", "Ayoub", "Hajar"];

export const generateFakeItems = () => {
  const fakeItems = [];
  
  // We generate 50 highly realistic items by looping and randomizing combinations
  for (let i = 0; i < 50; i++) {
    const itemTpl = itemTemplates[Math.floor(Math.random() * itemTemplates.length)];
    const lookTpl = lookingForTemplates[Math.floor(Math.random() * lookingForTemplates.length)];
    
    // Add a bit of randomness to price to make it seem unique
    const randomPrice = itemTpl.price + (Math.floor(Math.random() * 5) * 10);
    
    // Generate images randomly using loremflickr targeting semantic keywords natively
    const itemImage = `https://loremflickr.com/400/300/${itemTpl.tag}?random=${i}`;
    const lookingImage = `https://loremflickr.com/400/300/${lookTpl.tag}?random=${i}`;

    fakeItems.push({
      id: Date.now() + i,
      isGenerated: true,
      title: itemTpl.title,
      description: itemTpl.desc,
      image: itemImage,
      price: randomPrice,
      city: cities[Math.floor(Math.random() * cities.length)],
      category: itemTpl.category,
      owner: owners[Math.floor(Math.random() * owners.length)],
      lookingForImage: lookingImage,
      lookingForDesc: lookTpl.desc
    });
  }
  
  return fakeItems;
}
