const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clean existing data
  await prisma.cartProduct.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.orderProduct.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.seller.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("password123", 10);

  // Create Seller
  const seller = await prisma.seller.create({
    data: {
      name: "Wooniq Furniture Store",
      email: "seller@wooniq.com",
      password: hashedPassword,
      phone: "1234567890",
      address: "123 Furniture St",
      city: "Design City",
      state: "Modern State",
      country: "Ecom Land",
      pincode: "123456",
    },
  });

  // Create Products
  const products = [
    {
      name: "Velvet Emerald Sofa",
      description: "A luxurious velvet sofa in deep emerald green with gold-accented legs. Perfect for modern living rooms.",
      price: 899.99,
      stock: 10,
      category: "Living Room",
      imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop",
      sellerId: seller.id,
    },
    {
      name: "Classic Yellow Chair",
      description: "Ergonomic design meets vibrant style. This yellow armchair is both a statement piece and a comfort zone.",
      price: 249.50,
      stock: 25,
      category: "Seating",
      imageUrl: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&auto=format&fit=crop",
      sellerId: seller.id,
    },
    {
      name: "Minimalist Grey Armchair",
      description: "Sleek, grey, and sophisticated. Fits perfectly in any contemporary office or lounge setting.",
      price: 329.00,
      stock: 15,
      category: "Seating",
      imageUrl: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&auto=format&fit=crop",
      sellerId: seller.id,
    },
    {
      name: "Nordic Oak Coffee Table",
      description: "Handcrafted from solid oak, this minimalist coffee table brings a touch of nature to your home.",
      price: 189.00,
      stock: 20,
      category: "Living Room",
      imageUrl: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=800&auto=format&fit=crop",
      sellerId: seller.id,
    },
    {
      name: "Midnight Blue Velvet Bed",
      description: "A queen-sized bed frame upholstered in premium midnight blue velvet for a royal sleeping experience.",
      price: 1299.00,
      stock: 5,
      category: "Bedroom",
      imageUrl: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&auto=format&fit=crop",
      sellerId: seller.id,
    },
    {
      name: "Industrial Metal Bookshelf",
      description: "A sturdy 5-tier bookshelf with a black metal frame and reclaimed wood shelves.",
      price: 450.00,
      stock: 12,
      category: "Storage",
      imageUrl: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&auto=format&fit=crop",
      sellerId: seller.id,
    },
    {
      name: "Walnut Dining Table",
      description: "A stunning 6-seater dining table crafted from solid American walnut, with a natural finish.",
      price: 1150.00,
      stock: 8,
      category: "Dining",
      imageUrl: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&auto=format&fit=crop",
      sellerId: seller.id,
    },
    {
      name: "Rattan Accent Chair",
      description: "Boho-chic rattan chair with a plush white cushion. Lightweight and perfect for sunlit corners.",
      price: 195.00,
      stock: 18,
      category: "Seating",
      imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop",
      sellerId: seller.id,
    },
    {
      name: "Marble & Gold Side Table",
      description: "An elegant side table featuring a genuine white marble top on gold geometric legs.",
      price: 310.00,
      stock: 14,
      category: "Living Room",
      imageUrl: "https://images.unsplash.com/photo-1519710164239-da123dc3800a?w=800&auto=format&fit=crop",
      sellerId: seller.id,
    },
    {
      name: "Scandinavian Floor Lamp",
      description: "A minimalist arc floor lamp with a matte black finish and a warm-toned fabric shade.",
      price: 125.00,
      stock: 30,
      category: "Lighting",
      imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop",
      sellerId: seller.id,
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  // Create Demo User
  await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
      phone: "9876543210",
      password: hashedPassword,
      address: "456 User Lane",
      city: "User City",
      state: "User State",
      country: "User Land",
      pincode: "654321",
    },
  });

  console.log("✅ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
