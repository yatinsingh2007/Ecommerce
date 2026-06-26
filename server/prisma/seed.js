const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Delete in dependency order to satisfy foreign key constraints
  await prisma.cartProduct.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.orderProduct.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.seller.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("password123", 10);

  // ─── SELLER ──────────────────────────────────────────────────────────────────

  const seller = await prisma.seller.create({
    data: {
      name: "Wooniq Studio",
      email: "admin@wooniq.com",
      phone: "4155550100",
      address: "88 Design Boulevard",
      city: "San Francisco",
      state: "CA",
      country: "USA",
      pincode: "94103",
      password: hashedPassword,
    },
  });

  // ─── USERS ───────────────────────────────────────────────────────────────────

  const userData = [
    { name: "Alice Johnson",  email: "alice@example.com",  phone: "2125550101", address: "12 Park Avenue",        city: "New York",     state: "NY", country: "USA", pincode: "10001" },
    { name: "Bob Smith",      email: "bob@example.com",    phone: "3105550102", address: "44 Sunset Boulevard",   city: "Los Angeles",  state: "CA", country: "USA", pincode: "90028" },
    { name: "Carol Davis",    email: "carol@example.com",  phone: "3125550103", address: "700 N Michigan Ave",    city: "Chicago",      state: "IL", country: "USA", pincode: "60611" },
    { name: "David Lee",      email: "david@example.com",  phone: "7135550104", address: "220 Main Street",       city: "Houston",      state: "TX", country: "USA", pincode: "77002" },
    { name: "Emma Wilson",    email: "emma@example.com",   phone: "6025550105", address: "3001 E Camelback Rd",   city: "Phoenix",      state: "AZ", country: "USA", pincode: "85016" },
    { name: "Frank Garcia",   email: "frank@example.com",  phone: "2155550106", address: "1500 Market Street",    city: "Philadelphia", state: "PA", country: "USA", pincode: "19102" },
    { name: "Grace Kim",      email: "grace@example.com",  phone: "2105550107", address: "303 Commerce Street",   city: "San Antonio",  state: "TX", country: "USA", pincode: "78205" },
    { name: "Henry Brown",    email: "henry@example.com",  phone: "6195550108", address: "550 B Street",          city: "San Diego",    state: "CA", country: "USA", pincode: "92101" },
    { name: "Isla Martinez",  email: "isla@example.com",   phone: "2145550109", address: "1800 Pacific Avenue",   city: "Dallas",       state: "TX", country: "USA", pincode: "75201" },
    { name: "James Taylor",   email: "james@example.com",  phone: "4085550110", address: "200 E Santa Clara St",  city: "San Jose",     state: "CA", country: "USA", pincode: "95113" },
    { name: "Karen White",    email: "karen@example.com",  phone: "5125550111", address: "901 Congress Avenue",   city: "Austin",       state: "TX", country: "USA", pincode: "78701" },
    { name: "Liam Anderson",  email: "liam@example.com",   phone: "9045550112", address: "121 W Forsyth Street",  city: "Jacksonville", state: "FL", country: "USA", pincode: "32202" },
  ];

  const users = [];
  for (const u of userData) {
    const user = await prisma.user.create({
      data: { ...u, password: hashedPassword },
    });
    users.push(user);
  }

  // ─── PRODUCTS ─────────────────────────────────────────────────────────────────

  const productData = [
    // index 0
    {
      name: "Eames Lounge Chair & Ottoman",
      description:
        "A timeless icon of modern design. Molded plywood shells and hand-stitched genuine leather upholstery deliver unmatched comfort and elegance for any living space.",
      price: 5295.00,
      discountPrice: 4800.00,
      stock: 5,
      category: "Chairs",
      imageUrl: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=800&auto=format&fit=crop",
      dimensions: "32\"W × 32\"D × 31\"H",
      material: "Molded Plywood, Genuine Leather",
      brand: "Herman Miller",
      rating: 4.9,
      tags: ["Iconic", "Luxury", "Mid-Century"],
    },
    // index 1
    {
      name: "Moderno Cloud Sofa — 3 Seater",
      description:
        "Sink into unparalleled softness. Goose-down fill wrapped in premium Belgian linen creates a sofa that looks as good as it feels — all day, every day.",
      price: 3450.00,
      discountPrice: 2999.00,
      stock: 8,
      category: "Sofas",
      imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop",
      dimensions: "102\"W × 40\"D × 31\"H",
      material: "Belgian Linen, Goose Down",
      brand: "Restoration Hardware",
      rating: 4.8,
      tags: ["Comfort", "Minimalist", "Cloud"],
    },
    // index 2
    {
      name: "Solid White Oak Dining Table",
      description:
        "Kiln-dried solid white oak with hand-sanded surfaces and tapered turned legs. Seats up to 6 adults comfortably. Heirloom quality built to last generations.",
      price: 1200.00,
      discountPrice: 1050.00,
      stock: 12,
      category: "Dining Tables",
      imageUrl: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&auto=format&fit=crop",
      dimensions: "72\"W × 36\"D × 30\"H",
      material: "Solid White Oak",
      brand: "West Elm",
      rating: 4.6,
      tags: ["Solid Wood", "Dining", "Classic"],
    },
    // index 3
    {
      name: "Velvet Tufted Bed Frame — Queen",
      description:
        "A statement piece for the master bedroom. Diamond-tufted high headboard in deep navy velvet, mounted on a solid birchwood slatted base. No box spring needed.",
      price: 1850.00,
      discountPrice: null,
      stock: 10,
      category: "Beds",
      imageUrl: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&auto=format&fit=crop",
      dimensions: "65\"W × 85\"D × 55\"H",
      material: "Velvet, Solid Birch",
      brand: "Crate & Barrel",
      rating: 4.7,
      tags: ["Bedroom", "Tufted", "Navy"],
    },
    // index 4
    {
      name: "Reclaimed Wood Standing Desk",
      description:
        "Industrial-chic home office desk featuring a reclaimed pine top and hand-welded matte black steel frame. Includes a built-in cable management grommet.",
      price: 650.00,
      discountPrice: 599.00,
      stock: 15,
      category: "Office Furniture",
      imageUrl: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&auto=format&fit=crop",
      dimensions: "55\"W × 28\"D × 30\"H",
      material: "Reclaimed Pine, Steel",
      brand: "CB2",
      rating: 4.4,
      tags: ["Office", "Industrial", "Workspace"],
    },
    // index 5
    {
      name: "Walnut Media Console",
      description:
        "Sleek TV stand in walnut veneer with slatted sliding doors and built-in cable management. Supports TVs up to 70 inches. Sits low for a modern look.",
      price: 950.00,
      discountPrice: null,
      stock: 6,
      category: "Cabinets",
      imageUrl: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&auto=format&fit=crop",
      dimensions: "70\"W × 18\"D × 24\"H",
      material: "Walnut Veneer, MDF",
      brand: "Article",
      rating: 4.6,
      tags: ["Media", "Storage", "Living Room"],
    },
    // index 6
    {
      name: "Geometric Brass Pendant Light",
      description:
        "Open-cage geometric pendant in aged brass finish. Creates dramatic shadow patterns and warm ambient glow. UL listed, E26 base, compatible with dimmers.",
      price: 320.00,
      discountPrice: 280.00,
      stock: 25,
      category: "Lighting",
      imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop",
      dimensions: "12\"D × 15\"H",
      material: "Solid Brass",
      brand: "Schoolhouse Electric",
      rating: 4.9,
      tags: ["Lighting", "Brass", "Pendant"],
    },
    // index 7
    {
      name: "Hand-Tufted Wool Area Rug — 8×10",
      description:
        "Artisan hand-tufted in India using 100% New Zealand wool. Abstract geometric pattern in warm sand, taupe, and ivory. 0.5-inch pile height.",
      price: 450.00,
      discountPrice: 399.00,
      stock: 20,
      category: "Decor",
      imageUrl: "https://images.unsplash.com/photo-1531685250784-7569952593d2?w=800&auto=format&fit=crop",
      dimensions: "8' × 10'",
      material: "100% New Zealand Wool",
      brand: "Loloi",
      rating: 4.5,
      tags: ["Rug", "Handmade", "Natural"],
    },
    // index 8
    {
      name: "Cognac Leather Sling Chair",
      description:
        "Low-profile sling chair in top-grain cognac leather with a solid ash A-frame. Lightweight, stackable, and effortlessly stylish in any corner.",
      price: 850.00,
      discountPrice: 799.00,
      stock: 14,
      category: "Chairs",
      imageUrl: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&auto=format&fit=crop",
      dimensions: "28\"W × 30\"D × 32\"H",
      material: "Top-Grain Leather, Ash Wood",
      brand: "Joybird",
      rating: 4.7,
      tags: ["Leather", "Accent", "Scandinavian"],
    },
    // index 9
    {
      name: "Carrara Marble Coffee Table",
      description:
        "Genuine Italian Carrara marble top on a powder-coated black steel cross base. Natural veining ensures every table is one of a kind.",
      price: 550.00,
      discountPrice: null,
      stock: 11,
      category: "Living Room",
      imageUrl: "https://images.unsplash.com/photo-1519710164239-da123dc3800a?w=800&auto=format&fit=crop",
      dimensions: "36\" Diameter × 16\"H",
      material: "Carrara Marble, Steel",
      brand: "Interior Define",
      rating: 4.5,
      tags: ["Marble", "Living Room", "Coffee Table"],
    },
    // index 10
    {
      name: "Modular Wall Shelving System",
      description:
        "Expandable wall-mounted shelving in matte white lacquer. Mix and match modules to fit any wall width. Easy peg-and-slot assembly, no studs required.",
      price: 890.00,
      discountPrice: 750.00,
      stock: 9,
      category: "Storage",
      imageUrl: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&auto=format&fit=crop",
      dimensions: "48\"W × 12\"D × 72\"H (per unit)",
      material: "MDF, Lacquer",
      brand: "Blu Dot",
      rating: 4.3,
      tags: ["Storage", "Modular", "White"],
    },
    // index 11
    {
      name: "Steelcase Leap Ergonomic Chair",
      description:
        "The most researched office chair ever made. 4D-adjustable arms, LiveBack technology, and a Natural Glide System adapt to your body for all-day support.",
      price: 1495.00,
      discountPrice: 1295.00,
      stock: 20,
      category: "Office Furniture",
      imageUrl: "https://images.unsplash.com/photo-1505797149-35ebcb05a6fd?w=800&auto=format&fit=crop",
      dimensions: "26\"W × 26\"D × 38–44\"H",
      material: "Recycled Mesh, Die-Cast Aluminum",
      brand: "Steelcase",
      rating: 5.0,
      tags: ["Ergonomic", "Office", "Lumbar Support"],
    },
    // index 12
    {
      name: "Natural Rattan Daybed",
      description:
        "Hand-woven natural rattan over a powder-coated steel frame. Includes a 4-inch cushioned mattress in oatmeal linen. Perfect for sunrooms and reading nooks.",
      price: 1100.00,
      discountPrice: null,
      stock: 4,
      category: "Beds",
      imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop",
      dimensions: "75\"W × 40\"D × 28\"H",
      material: "Natural Rattan, Linen",
      brand: "Serena & Lily",
      rating: 4.6,
      tags: ["Coastal", "Rattan", "Natural"],
    },
    // index 13
    {
      name: "Hand-Thrown Ceramic Table Lamp",
      description:
        "Each base is wheel-thrown and kiln-fired individually, resulting in a one-of-a-kind matte finish. Paired with a 14-inch natural linen drum shade.",
      price: 185.00,
      discountPrice: 150.00,
      stock: 30,
      category: "Lighting",
      imageUrl: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=800&auto=format&fit=crop",
      dimensions: "10\"D × 22\"H (with shade)",
      material: "Ceramic, Natural Linen",
      brand: "Rejuvenation",
      rating: 4.8,
      tags: ["Lighting", "Handmade", "Ceramic"],
    },
    // index 14
    {
      name: "Boucle Storage Ottoman",
      description:
        "Generously sized round ottoman in creamy boucle. Works as extra seating, a footrest, or a soft coffee table. Solid oak legs, removable cover.",
      price: 295.00,
      discountPrice: null,
      stock: 18,
      category: "Living Room",
      imageUrl: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&auto=format&fit=crop",
      dimensions: "30\" Diameter × 18\"H",
      material: "Boucle, Foam Core, Oak",
      brand: "The Citizenry",
      rating: 4.4,
      tags: ["Ottoman", "Boucle", "Versatile"],
    },
    // index 15
    {
      name: "Grade A Teak Garden Bench",
      description:
        "Solid grade-A plantation teak with traditional mortise-and-tenon joinery. Naturally weather-resistant and oil-rich — no sealing required. Earns a silver patina over time.",
      price: 420.00,
      discountPrice: 380.00,
      stock: 10,
      category: "Outdoor",
      imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop",
      dimensions: "60\"W × 24\"D × 35\"H",
      material: "Grade A Teak",
      brand: "Outer",
      rating: 4.5,
      tags: ["Outdoor", "Teak", "Garden"],
    },
    // index 16
    {
      name: "Counter Height Bar Stools — Set of 2",
      description:
        "Sleek matte black metal stools with a low-profile back and integrated footrest ring. Counter height (26 inch seat). Sold as a set of 2.",
      price: 340.00,
      discountPrice: 299.00,
      stock: 15,
      category: "Chairs",
      imageUrl: "https://images.unsplash.com/photo-1503602642458-232111445657?w=800&auto=format&fit=crop",
      dimensions: "18\"W × 18\"D × 38\"H",
      material: "Powder-Coated Steel",
      brand: "Hay",
      rating: 4.3,
      tags: ["Bar Stool", "Kitchen", "Set of 2"],
    },
    // index 17
    {
      name: "Oversized Round Wall Mirror",
      description:
        "36-inch circular wall mirror with a slim brushed gold metal frame. Can lean against a wall or hang from two keyhole brackets (included).",
      price: 210.00,
      discountPrice: null,
      stock: 22,
      category: "Decor",
      imageUrl: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&auto=format&fit=crop",
      dimensions: "36\" Diameter",
      material: "Glass, Brushed Gold Metal",
      brand: "CB2",
      rating: 4.7,
      tags: ["Mirror", "Wall Decor", "Gold"],
    },
    // index 18
    {
      name: "Scandi Oak Sideboard",
      description:
        "Three soft-close drawers and two cabinet doors in solid white oak with a natural oil finish. Slim tapered legs keep the profile light and airy.",
      price: 1350.00,
      discountPrice: 1200.00,
      stock: 7,
      category: "Cabinets",
      imageUrl: "https://images.unsplash.com/photo-1493957988430-a5f2e15f39a3?w=800&auto=format&fit=crop",
      dimensions: "63\"W × 16\"D × 30\"H",
      material: "Solid White Oak",
      brand: "Muuto",
      rating: 4.9,
      tags: ["Sideboard", "Oak", "Scandinavian"],
    },
    // index 19
    {
      name: "Curved Blush Velvet Loveseat",
      description:
        "Contemporary curved silhouette upholstered in dusty rose velvet. Gold-tipped tapered steel legs. Compact enough for apartments, striking enough for estates.",
      price: 1650.00,
      discountPrice: 1450.00,
      stock: 3,
      category: "Sofas",
      imageUrl: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&auto=format&fit=crop",
      dimensions: "60\"W × 34\"D × 32\"H",
      material: "Velvet, Steel",
      brand: "Anthropologie",
      rating: 4.6,
      tags: ["Loveseat", "Velvet", "Curved"],
    },
    // index 20
    {
      name: "Marble Nesting Side Tables — Set of 2",
      description:
        "Two nesting side tables with genuine white marble tops and gold-finished steel frames. Nest away when not in use, pull apart when entertaining.",
      price: 395.00,
      discountPrice: null,
      stock: 12,
      category: "Living Room",
      imageUrl: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&auto=format&fit=crop",
      dimensions: "20\"D × 22\"H (large), 16\"D × 18\"H (small)",
      material: "White Marble, Gold Steel",
      brand: "AllModern",
      rating: 4.4,
      tags: ["Side Table", "Marble", "Set of 2"],
    },
    // index 21
    {
      name: "Japandi Platform Bed Frame — King",
      description:
        "Low-profile platform bed in Japandi style. Solid ash with a hand-applied natural oil finish. No box spring needed. Clean lines, lasting quality.",
      price: 2100.00,
      discountPrice: 1850.00,
      stock: 6,
      category: "Beds",
      imageUrl: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&auto=format&fit=crop",
      dimensions: "80\"W × 86\"D × 14\"H",
      material: "Solid Ash",
      brand: "Floyd",
      rating: 4.8,
      tags: ["Bed", "Japandi", "Platform"],
    },
  ];

  const products = [];
  for (const p of productData) {
    const product = await prisma.product.create({
      data: { ...p, sellerId: seller.id },
    });
    products.push(product);
  }

  // ─── ORDERS ───────────────────────────────────────────────────────────────────
  // Format: { userIdx, status, daysAgo, items: [[productIdx, qty], ...] }
  // Covers all four OrderStatus values: DELIVERED / SHIPPED / PENDING / CANCELLED
  const orderPlan = [
    { userIdx: 0,  status: "DELIVERED", daysAgo: 95, items: [[0, 1], [6, 2]] },   // Alice — Eames Chair + 2× Pendant Light
    { userIdx: 1,  status: "DELIVERED", daysAgo: 80, items: [[1, 1]] },             // Bob — Cloud Sofa
    { userIdx: 2,  status: "DELIVERED", daysAgo: 68, items: [[2, 1], [7, 1]] },    // Carol — Dining Table + Rug
    { userIdx: 3,  status: "DELIVERED", daysAgo: 58, items: [[3, 1]] },             // David — Velvet Bed
    { userIdx: 4,  status: "DELIVERED", daysAgo: 45, items: [[8, 1], [14, 1]] },   // Emma — Sling Chair + Ottoman
    { userIdx: 5,  status: "SHIPPED",   daysAgo: 36, items: [[4, 1], [11, 1]] },   // Frank — Desk + Ergonomic Chair
    { userIdx: 6,  status: "SHIPPED",   daysAgo: 28, items: [[5, 1], [17, 1]] },   // Grace — Media Console + Mirror
    { userIdx: 7,  status: "SHIPPED",   daysAgo: 20, items: [[9, 1]] },             // Henry — Marble Coffee Table
    { userIdx: 8,  status: "PENDING",   daysAgo: 14, items: [[12, 1]] },            // Isla — Rattan Daybed
    { userIdx: 9,  status: "PENDING",   daysAgo: 10, items: [[13, 2], [16, 2]] },  // James — 2× Ceramic Lamp + 2× Bar Stools
    { userIdx: 10, status: "PENDING",   daysAgo: 6,  items: [[21, 1], [10, 1]] },  // Karen — Japandi Bed + Shelving
    { userIdx: 11, status: "PENDING",   daysAgo: 3,  items: [[19, 1]] },            // Liam — Curved Loveseat
    { userIdx: 0,  status: "CANCELLED", daysAgo: 52, items: [[18, 1]] },            // Alice — Scandi Sideboard (cancelled)
    { userIdx: 2,  status: "CANCELLED", daysAgo: 40, items: [[20, 1], [15, 2]] },  // Carol — Nesting Tables + 2× Teak Bench (cancelled)
  ];

  for (const o of orderPlan) {
    const createdAt = new Date(Date.now() - o.daysAgo * 24 * 60 * 60 * 1000);
    const order = await prisma.order.create({
      data: {
        userId: users[o.userIdx].id,
        status: o.status,
        createdAt,
      },
    });

    for (const [productIdx, quantity] of o.items) {
      const product = products[productIdx];
      await prisma.orderProduct.create({
        data: {
          orderId: order.id,
          productId: product.id,
          quantity,
          finalPrice: (product.discountPrice ?? product.price) * quantity,
        },
      });
    }
  }

  // ─── CARTS ────────────────────────────────────────────────────────────────────
  // Active shopping carts for 4 users
  const cartPlan = [
    { userIdx: 1, items: [[0, 1]] },              // Bob — eyeing the Eames Chair
    { userIdx: 5, items: [[1, 1], [9, 1]] },      // Frank — Cloud Sofa + Marble Table
    { userIdx: 8, items: [[6, 2], [13, 1]] },     // Isla — 2× Pendant Lights + Ceramic Lamp
    { userIdx: 11, items: [[11, 1], [4, 1]] },    // Liam — Ergonomic Chair + Desk
  ];

  for (const c of cartPlan) {
    const cart = await prisma.cart.create({
      data: { userId: users[c.userIdx].id },
    });
    for (const [productIdx, quantity] of c.items) {
      await prisma.cartProduct.create({
        data: {
          cartId: cart.id,
          productId: products[productIdx].id,
          quantity,
        },
      });
    }
  }

  // ─── SUMMARY ──────────────────────────────────────────────────────────────────

  console.log("\nSeeding complete.");
  console.log(`  1  Seller`);
  console.log(`  ${users.length}  Users`);
  console.log(`  ${products.length}  Products`);
  console.log(`  ${orderPlan.length}  Orders  (5 DELIVERED, 3 SHIPPED, 4 PENDING, 2 CANCELLED)`);
  console.log(`  ${cartPlan.length}  Carts`);
  console.log("\nLogin credentials (password: password123)");
  console.log("  Seller  →  admin@wooniq.com");
  console.log("  User    →  alice@example.com");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
