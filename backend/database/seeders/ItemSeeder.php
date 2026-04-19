<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Models\User;
use Illuminate\Database\Seeder;

class ItemSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::firstOrCreate(
            ['email' => 'marketplace@baddalni.ma'],
            [
                'name' => 'Baddalni Market',
                'password' => bcrypt('baddalni2026'),
            ]
        );

        $items = [
            ['title' => 'Traditional Handcrafted Teapot', 'category' => 'Home', 'price' => 150, 'city' => 'Fes', 'description' => 'Authentic silver Moroccan teapot, slightly used but in great condition. Perfect for mint tea.', 'image' => '/images/moroccan_teapot_1776380244341.png', 'looking_for_desc' => 'Looking for an authentic rug.'],
            ['title' => 'Berber Wool Rug (Zarbiya)', 'category' => 'Home', 'price' => 800, 'city' => 'Marrakech', 'description' => 'Beautiful red and black traditional Berber rug. Very clean.', 'image' => '/images/moroccan_rug_1776380259013.png', 'looking_for_desc' => 'Looking for a tagine pot.'],
            ['title' => 'Vintage Leather Pouf', 'category' => 'Home', 'price' => 250, 'city' => 'Marrakech', 'description' => 'Hand-stitched leather pouf from Marrakech. Leather is aged beautifully.', 'image' => '/images/moroccan_pouf_1776380730200.png', 'looking_for_desc' => 'Looking for a handwoven blanket.'],
            ['title' => 'Moroccan Tagine Clay Pot', 'category' => 'Home', 'price' => 80, 'city' => 'Safi', 'description' => 'Medium size tagine from Safi. Hand painted and ready for cooking.', 'image' => '/images/moroccan_tagine_1776380279989.png', 'looking_for_desc' => 'Looking for tea glasses.'],
            ['title' => "Women's Caftan", 'category' => 'Clothing', 'price' => 1000, 'city' => 'Casablanca', 'description' => 'Beautiful green caftan with intricate embroidery.', 'image' => '/images/moroccan_caftan_1776380231578.png', 'looking_for_desc' => 'Looking for babouche slippers.'],
            ['title' => 'Leather Babouche Slippers', 'category' => 'Clothing', 'price' => 120, 'city' => 'Fes', 'description' => 'Handmade authentic yellow Moroccan babouche shoes.', 'image' => '/images/moroccan_babouche_1776382468296.png', 'looking_for_desc' => 'Looking for a leather bag.'],
            ['title' => 'Moroccan Zellige Table', 'category' => 'Home', 'price' => 700, 'city' => 'Meknes', 'description' => 'Mosaic tile table top, great for gardens.', 'image' => '/images/moroccan_pouf_1776380730200.png', 'looking_for_desc' => 'Looking for a teapot.'],
            ['title' => 'Traditional Copper Lamp', 'category' => 'Home', 'price' => 300, 'city' => 'Marrakech', 'description' => 'Brass lantern with beautiful glass cutouts.', 'image' => '/images/moroccan_tagine_1776380279989.png', 'looking_for_desc' => 'Looking for a decorative planter.'],
            ['title' => 'Argan Oil (100% Pure)', 'category' => 'Home', 'price' => 150, 'city' => 'Agadir', 'description' => 'Pure cosmetic argan oil sourced from Agadir.', 'image' => '/images/moroccan_teapot_1776380244341.png', 'looking_for_desc' => 'Looking for spices.'],
            ['title' => 'Spices Set (Saffron & Cumin)', 'category' => 'Home', 'price' => 90, 'city' => 'Tangier', 'description' => 'Authentic Moroccan spices from the vibrant souks.', 'image' => '/images/moroccan_rug_1776380259013.png', 'looking_for_desc' => 'Looking for argan oil.'],
            ['title' => 'Handwoven Blanket', 'category' => 'Home', 'price' => 400, 'city' => 'Rabat', 'description' => 'Warm Berber blanket with pom poms.', 'image' => '/images/moroccan_caftan_1776380231578.png', 'looking_for_desc' => 'Looking for a rug.'],
            ['title' => 'Moroccan Tea Glasses (Set of 6)', 'category' => 'Home', 'price' => 120, 'city' => 'Casablanca', 'description' => 'Colorful painted tea glasses.', 'image' => '/images/moroccan_teapot_1776380244341.png', 'looking_for_desc' => 'Looking for a copper lamp.'],
            ['title' => 'Leather Travel Bag', 'category' => 'Clothing', 'price' => 500, 'city' => 'Fes', 'description' => 'Large authentic leather weekender bag from Fes.', 'image' => '/images/moroccan_babouche_1776382468296.png', 'looking_for_desc' => 'Looking for a djellaba.'],
            ['title' => 'Vintage Oud Instrument', 'category' => 'Sports', 'price' => 1200, 'city' => 'Rabat', 'description' => 'Traditional wooden musical instrument.', 'image' => '/images/moroccan_rug_1776380259013.png', 'looking_for_desc' => 'Looking for a hand loom.'],
            ['title' => 'Ceramic Serving Bowl', 'category' => 'Home', 'price' => 110, 'city' => 'Safi', 'description' => 'Hand painted bowl from Safi.', 'image' => '/images/moroccan_tagine_1776380279989.png', 'looking_for_desc' => 'Looking for a wicker basket.'],
            ['title' => 'Woven Wicker Basket', 'category' => 'Home', 'price' => 60, 'city' => 'Tangier', 'description' => 'Great for shopping or storage.', 'image' => '/images/moroccan_pouf_1776380730200.png', 'looking_for_desc' => 'Looking for a serving bowl.'],
            ['title' => 'Moroccan Mint Leaves (Fresh)', 'category' => 'Home', 'price' => 20, 'city' => 'Meknes', 'description' => 'Locally grown fresh mint.', 'image' => '/images/moroccan_teapot_1776380244341.png', 'looking_for_desc' => 'Looking for tea glasses.'],
            ['title' => 'Traditional Hand Loom', 'category' => 'Home', 'price' => 350, 'city' => 'Rabat', 'description' => 'Small scale weaving loom for crafts.', 'image' => '/images/moroccan_rug_1776380259013.png', 'looking_for_desc' => 'Looking for a blanket.'],
            ['title' => "Djellaba (Men's)", 'category' => 'Clothing', 'price' => 300, 'city' => 'Casablanca', 'description' => 'Warm winter wool Djellaba.', 'image' => '/images/moroccan_caftan_1776380231578.png', 'looking_for_desc' => 'Looking for babouche slippers.'],
            ['title' => 'Decorative Majorelle Planter', 'category' => 'Home', 'price' => 180, 'city' => 'Marrakech', 'description' => 'Painted in iconic Majorelle blue.', 'image' => '/images/moroccan_pouf_1776380730200.png', 'looking_for_desc' => 'Looking for a zellige table.'],
        ];

        foreach ($items as $itemData) {
            Item::create([
                'user_id' => $user->id,
                'title' => $itemData['title'],
                'description' => $itemData['description'],
                'image' => $itemData['image'],
                'price' => $itemData['price'],
                'city' => $itemData['city'],
                'category' => $itemData['category'],
                'looking_for_desc' => $itemData['looking_for_desc'],
            ]);
        }
    }
}
