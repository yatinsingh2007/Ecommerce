const { prisma } = require("../db/dbConfig");

const getDashboardStats = async (req, res) => {
  try {
    // 1. Basic Stats
    const totalRevenue = await prisma.orderProduct.aggregate({
      _sum: {
        finalPrice: true,
      },
    });

    const totalOrders = await prisma.order.count();
    const totalProducts = await prisma.product.count();
    const totalCustomers = await prisma.user.count();

    // 2. Recent Sales
    const recentSales = await prisma.order.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        products: {
          include: {
            product: true,
          },
        },
      },
    });

    // 3. Revenue by Month (Last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: sixMonthsAgo,
        },
      },
      include: {
        products: true,
      },
    });

    const monthlyRevenue = {};
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    orders.forEach((order) => {
      const month = monthNames[order.createdAt.getMonth()];
      const revenue = order.products.reduce((sum, p) => sum + (p.finalPrice * p.quantity), 0);
      monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenue;
    });

    const revenueData = Object.keys(monthlyRevenue).map((month) => ({
      name: month,
      total: monthlyRevenue[month],
    }));

    // 4. Products Inventory
    const inventory = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        stock: true,
        price: true,
        category: true,
      },
      orderBy: {
        stock: "asc",
      },
    });

    return res.status(200).json({
      stats: {
        revenue: totalRevenue._sum.finalPrice || 0,
        orders: totalOrders,
        products: totalProducts,
        customers: totalCustomers,
      },
      recentSales,
      revenueData,
      inventory,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
        products: {
          include: {
            product: true,
          },
        },
      },
    });

    return res.status(200).json({ orders });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getAllOrders,
};
