import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@ecid.eu" },
    update: {},
    create: {
      email: "admin@ecid.eu",
      name: "Admin",
      password: hashedPassword,
      role: "admin",
    },
  });

  const course = await prisma.course.create({
    data: {
      title: "Fundamentals of Esports Coaching",
      description: "Learn the basics of coaching esports players",
      order: 1,
      topics: {
        create: [
          { title: "Introduction to Coaching", description: "Understanding the role of a coach", order: 1 },
          { title: "Player Well-being", description: "Mental health and physical wellness", order: 2 },
          { title: "Communication Skills", description: "Effective communication with players", order: 3 },
        ],
      },
    },
  });

  console.log("Seeded admin user:", admin.email);
  console.log("Seeded course:", course.title);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
