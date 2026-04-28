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
  await prisma.admin.deleteMany();

  const hashedPassword = await bcrypt.hash("password123", 10);

  // Create Admin
  await prisma.admin.create({
    data: {
      name: "Super Admin",
      email: "admin@wooniq.com",
      password: hashedPassword,
    },
  });

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
      sellerId: seller.id,
    },
    {
      name: "Classic Yellow Chair",
      description: "Ergonomic design meets vibrant style. This yellow armchair is both a statement piece and a comfort zone.",
      price: 249.50,
      stock: 25,
      category: "Seating",
      sellerId: seller.id,
    },
    {
      name: "Minimalist Grey Armchair",
      description: "Sleek, grey, and sophisticated. Fits perfectly in any contemporary office or lounge setting.",
      price: 329.00,
      stock: 15,
      category: "Seating",
      sellerId: seller.id,
    },
    {
      name: "Nordic Oak Coffee Table",
      description: "Handcrafted from solid oak, this minimalist coffee table brings a touch of nature to your home.",
      price: 189.00,
      stock: 20,
      category: "Living Room",
      sellerId: seller.id,
    },
    {
      name: "Midnight Blue Velvet Bed",
      description: "A queen-sized bed frame upholstered in premium midnight blue velvet for a royal sleeping experience.",
      price: 1299.00,
      stock: 5,
      category: "Bedroom",
      sellerId: seller.id,
    },
    {
      name: "Industrial Metal Bookshelf",
      description: "A sturdy 5-tier bookshelf with a black metal frame and reclaimed wood shelves.",
      price: 450.00,
      stock: 12,
      category: "Storage",
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
