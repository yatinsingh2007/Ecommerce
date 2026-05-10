const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database with realistic furniture data...");

  // Clean existing data
  await prisma.cartProduct.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.orderProduct.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.seller.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("password123", 10);

  // 1. Create Sellers (Admins)
  const seller = await prisma.seller.create({
    data: {
      name: "Wooniq Luxury Interiors",
      email: "admin@wooniq.com",
      password: hashedPassword,
      phone: "1234567890",
      address: "88 Design Boulevard",
      city: "San Francisco",
      state: "CA",
      country: "USA",
      pincode: "94103",
    },
  });

  // 2. Create Users (Customers)
  const customerData = [
    { name: "Alice Johnson", email: "alice@example.com" },
    { name: "Bob Smith", email: "bob@example.com" },
    { name: "Charlie Brown", email: "charlie@example.com" },
    { name: "Diana Prince", email: "diana@example.com" },
    { name: "Edward Norton", email: "edward@example.com" },
    { name: "Fiona Gallagher", email: "fiona@example.com" },
    { name: "George Miller", email: "george@example.com" },
    { name: "Hannah Abbott", email: "hannah@example.com" },
    { name: "Ian Wright", email: "ian@example.com" },
    { name: "Julia Roberts", email: "julia@example.com" },
  ];

  const users = [];
  for (const c of customerData) {
    const user = await prisma.user.create({
      data: {
        name: c.name,
        email: c.email,
        phone: Math.floor(Math.random() * 9000000000 + 1000000000).toString(),
        password: hashedPassword,
        address: "123 Customer St",
        city: "New York",
        state: "NY",
        country: "USA",
        pincode: "10001",
      },
    });
    users.push(user);
  }

  // 3. Create Products (20+)
  const furnitureProducts = [
    {
      name: "Eames Lounge Chair & Ottoman",
      description: "A classic icon of modern design, combining comfort and style with plywood shells and leather upholstery.",
      price: 5295.00,
      discountPrice: 4800.00,
      stock: 5,
      category: "Chairs",
      imageUrl: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=800&auto=format&fit=crop",
      dimensions: "32\"W x 32\"D x 31\"H",
      material: "Plywood, Leather",
      brand: "Herman Miller",
      rating: 4.9,
      tags: ["Iconic", "Luxury", "Modern"],
      sellerId: seller.id,
    },
    {
      name: "Cloud Sofa 3-Seater",
      description: "The world's most comfortable sofa. Upholstered in premium linen for a soft, cloud-like feel.",
      price: 3450.00,
      discountPrice: 2999.00,
      stock: 8,
      category: "Sofas",
      imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop",
      dimensions: "102\"W x 40\"D x 31\"H",
      material: "Linen, Goose Down",
      brand: "Restoration Hardware",
      rating: 4.8,
      tags: ["Comfort", "Minimalist", "Large"],
      sellerId: seller.id,
    },
    {
      name: "Mid-Century Oak Dining Table",
      description: "Solid oak dining table with tapered legs and a natural finish. Seats up to 6 comfortably.",
      price: 1200.00,
      discountPrice: 1050.00,
      stock: 12,
      category: "Dining Tables",
      imageUrl: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&auto=format&fit=crop",
      dimensions: "72\"W x 36\"D x 30\"H",
      material: "Solid Oak",
      brand: "West Elm",
      rating: 4.5,
      tags: ["Classic", "Solid Wood", "Dining"],
      sellerId: seller.id,
    },
    {
      name: "Velvet Tufted Bed Frame",
      description: "Elegant queen-sized bed frame with a high-back tufted headboard in deep navy velvet.",
      price: 1850.00,
      discountPrice: null,
      stock: 10,
      category: "Beds",
      imageUrl: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&auto=format&fit=crop",
      dimensions: "65\"W x 85\"D x 55\"H",
      material: "Velvet, Wood",
      brand: "Crate & Barrel",
      rating: 4.7,
      tags: ["Elegant", "Bedroom", "Tufted"],
      sellerId: seller.id,
    },
    {
      name: "Industrial Steel Desk",
      description: "Minimalist workspace solution featuring a reclaimed wood top and heavy-duty steel frame.",
      price: 650.00,
      discountPrice: 599.00,
      stock: 15,
      category: "Office Furniture",
      imageUrl: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&auto=format&fit=crop",
      dimensions: "55\"W x 28\"D x 30\"H",
      material: "Reclaimed Wood, Steel",
      brand: "CB2",
      rating: 4.3,
      tags: ["Workspace", "Industrial", "Sturdy"],
      sellerId: seller.id,
    },
    {
      name: "Walnut Media Console",
      description: "Sleek media unit with slatted doors and hidden cable management. Perfect for clean living rooms.",
      price: 950.00,
      discountPrice: null,
      stock: 6,
      category: "Cabinets",
      imageUrl: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&auto=format&fit=crop",
      dimensions: "70\"W x 18\"D x 24\"H",
      material: "Walnut Veneer",
      brand: "Article",
      rating: 4.6,
      tags: ["Storage", "Media", "Modern"],
      sellerId: seller.id,
    },
    {
      name: "Pendant Brass Light",
      description: "Geometric brass pendant light that creates beautiful shadow patterns on your walls.",
      price: 320.00,
      discountPrice: 280.00,
      stock: 25,
      category: "Lighting",
      imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop",
      dimensions: "12\"D x 15\"H",
      material: "Brass",
      brand: "Schoolhouse",
      rating: 4.9,
      tags: ["Ambient", "Gold", "Modern"],
      sellerId: seller.id,
    },
    {
      name: "Abstract Wool Rug",
      description: "Hand-tufted wool rug featuring a minimalist abstract pattern in neutral earth tones.",
      price: 450.00,
      discountPrice: 399.00,
      stock: 20,
      category: "Decor",
      imageUrl: "https://images.unsplash.com/photo-1531685250784-7569952593d2?w=800&auto=format&fit=crop",
      dimensions: "8' x 10'",
      material: "100% Wool",
      brand: "Loloi",
      rating: 4.4,
      tags: ["Soft", "Artistic", "Floor"],
      sellerId: seller.id,
    },
    {
      name: "Leather Sling Accent Chair",
      description: "Tan cognac leather sling chair with a solid ash wood frame. Lightweight and durable.",
      price: 850.00,
      discountPrice: 799.00,
      stock: 14,
      category: "Chairs",
      imageUrl: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&auto=format&fit=crop",
      dimensions: "28\"W x 30\"D x 32\"H",
      material: "Top Grain Leather, Ash Wood",
      brand: "Joybird",
      rating: 4.7,
      tags: ["Leather", "Scandinavian", "Accent"],
      sellerId: seller.id,
    },
    {
      name: "Marble Top Coffee Table",
      description: "Genuine Italian Carrara marble top on a sleek black metal cross-base.",
      price: 550.00,
      discountPrice: null,
      stock: 11,
      category: "Living Room",
      imageUrl: "https://images.unsplash.com/photo-1519710164239-da123dc3800a?w=800&auto=format&fit=crop",
      dimensions: "36\"D x 16\"H",
      material: "Marble, Steel",
      brand: "Interior Define",
      rating: 4.5,
      tags: ["Luxury", "Marble", "Living Room"],
      sellerId: seller.id,
    },
    {
      name: "Modular Bookshelf Unit",
      description: "Expandable shelving system that grows with your collection. Matte white finish.",
      price: 890.00,
      discountPrice: 750.00,
      stock: 9,
      category: "Storage",
      imageUrl: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&auto=format&fit=crop",
      dimensions: "48\"W x 12\"D x 72\"H",
      material: "MDF, Lacquer",
      brand: "Blu Dot",
      rating: 4.2,
      tags: ["Modular", "Clean", "Office"],
      sellerId: seller.id,
    },
    {
      name: "Ergonomic Office Chair",
      description: "State-of-the-art ergonomic chair with mesh back and adjustable lumbar support.",
      price: 995.00,
      discountPrice: 895.00,
      stock: 20,
      category: "Office Furniture",
      imageUrl: "https://images.unsplash.com/photo-1505797149-35ebcb05a6fd?w=800&auto=format&fit=crop",
      dimensions: "26\"W x 26\"D x 42\"H",
      material: "Mesh, Recycled Plastic",
      brand: "Steelcase",
      rating: 5.0,
      tags: ["Ergonomic", "Work", "High Quality"],
      sellerId: seller.id,
    },
    {
      name: "Rattan Daybed",
      description: "Beautifully woven natural rattan daybed, perfect for a sunroom or guest bedroom.",
      price: 1100.00,
      discountPrice: null,
      stock: 4,
      category: "Beds",
      imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop",
      dimensions: "75\"W x 40\"D x 28\"H",
      material: "Natural Rattan",
      brand: "Serena & Lily",
      rating: 4.6,
      tags: ["Coastal", "Natural", "Relax"],
      sellerId: seller.id,
    },
    {
      name: "Ceramic Table Lamp",
      description: "Hand-thrown ceramic base with a linen drum shade. Provides soft, warm lighting.",
      price: 185.00,
      discountPrice: 150.00,
      stock: 30,
      category: "Lighting",
      imageUrl: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=800&auto=format&fit=crop",
      dimensions: "10\"D x 22\"H",
      material: "Ceramic, Linen",
      brand: "Rejuvenation",
      rating: 4.8,
      tags: ["Handmade", "Lighting", "Bedroom"],
      sellerId: seller.id,
    },
    {
      name: "Linen Ottoman",
      description: "Versatile linen ottoman that doubles as extra seating or a plush coffee table.",
      price: 295.00,
      discountPrice: null,
      stock: 18,
      category: "Decor",
      imageUrl: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&auto=format&fit=crop",
      dimensions: "24\"W x 24\"D x 18\"H",
      material: "Linen, Foam",
      brand: "The Citizenry",
      rating: 4.4,
      tags: ["Versatile", "Soft", "Living Room"],
      sellerId: seller.id,
    },
    {
      name: "Teak Garden Bench",
      description: "Weather-resistant solid teak bench with a classic slatted design.",
      price: 420.00,
      discountPrice: 380.00,
      stock: 10,
      category: "Outdoor",
      imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop",
      dimensions: "60\"W x 24\"D x 35\"H",
      material: "Solid Teak",
      brand: "Outer",
      rating: 4.5,
      tags: ["Outdoor", "Durable", "Garden"],
      sellerId: seller.id,
    },
    {
      name: "Bar Stool Set of 2",
      description: "Modern black metal bar stools with a low profile back and footrest.",
      price: 340.00,
      discountPrice: 299.00,
      stock: 15,
      category: "Chairs",
      imageUrl: "https://images.unsplash.com/photo-1503602642458-232111445657?w=800&auto=format&fit=crop",
      dimensions: "18\"W x 18\"D x 30\"H",
      material: "Steel",
      brand: "Hay",
      rating: 4.3,
      tags: ["Kitchen", "Modern", "Set"],
      sellerId: seller.id,
    },
    {
      name: "Gold Framed Wall Mirror",
      description: "Large circular wall mirror with a thin gold-finished metal frame.",
      price: 210.00,
      discountPrice: null,
      stock: 22,
      category: "Decor",
      imageUrl: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&auto=format&fit=crop",
      dimensions: "36\" Diameter",
      material: "Glass, Metal",
      brand: "Target",
      rating: 4.7,
      tags: ["Mirror", "Wall Art", "Gold"],
      sellerId: seller.id,
    },
    {
      name: "Scandi Oak Sideboard",
      description: "Minimalist sideboard with three drawers and two cabinets. Solid wood construction.",
      price: 1350.00,
      discountPrice: 1200.00,
      stock: 7,
      category: "Cabinets",
      imageUrl: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&auto=format&fit=crop",
      dimensions: "63\"W x 16\"D x 30\"H",
      material: "Oak Wood",
      brand: "Muuto",
      rating: 4.9,
      tags: ["Storage", "Oak", "Kitchen"],
      sellerId: seller.id,
    },
    {
      name: "Curved Velvet Loveseat",
      description: "Contemporary curved loveseat upholstered in blush pink velvet with brass legs.",
      price: 1650.00,
      discountPrice: 1450.00,
      stock: 3,
      category: "Sofas",
      imageUrl: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&auto=format&fit=crop",
      dimensions: "60\"W x 34\"D x 32\"H",
      material: "Velvet, Steel",
      brand: "Anthropologie",
      rating: 4.6,
      tags: ["Pink", "Curved", "Luxury"],
      sellerId: seller.id,
    },
    {
      name: "Marble Nesting Tables",
      description: "Set of two nesting side tables with marble tops and gold frames.",
      price: 395.00,
      discountPrice: null,
      stock: 12,
      category: "Living Room",
      imageUrl: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&auto=format&fit=crop",
      dimensions: "20\"D x 22\"H (Large)",
      material: "Marble, Metal",
      brand: "AllModern",
      rating: 4.4,
      tags: ["Space Saving", "Marble", "Living Room"],
      sellerId: seller.id,
    },
  ];

  const createdProducts = [];
  for (const p of furnitureProducts) {
    const product = await prisma.product.create({
      data: p,
    });
    createdProducts.push(product);
  }

  // 4. Create Orders (10+)
  const statuses = ["PENDING", "SHIPPED", "DELIVERED"];
  for (let i = 0; i < 12; i++) {
    const user = users[i % users.length];
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
      },
    });

    // Add 1-3 random products to each order
    const numProducts = Math.floor(Math.random() * 3) + 1;
    const shuffled = [...createdProducts].sort(() => 0.5 - Math.random());
    const orderProducts = shuffled.slice(0, numProducts);

    for (const op of orderProducts) {
      await prisma.orderProduct.create({
        data: {
          orderId: order.id,
          productId: op.id,
          quantity: Math.floor(Math.random() * 2) + 1,
          finalPrice: op.discountPrice || op.price,
        },
      });
    }
  }

  console.log("✅ Seeding completed successfully!");
  console.log(`- Created 1 Seller`);
  console.log(`- Created ${users.length} Users`);
  console.log(`- Created ${createdProducts.length} Products`);
  console.log(`- Created 12 Orders`);
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
