import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const existingCourse = await prisma.course.findFirst({
    where: { title: "Mental Performance in Esports" },
  });

  if (existingCourse) {
    console.log("Course already exists, skipping seed");
    return;
  }

  console.log("Seeding database...");

  const course = await prisma.course.create({
    data: {
      id: "clmp001",
      title: "Mental Performance in Esports",
      description:
        "Learn essential mental skills for peak gaming performance including focus, stress management, and resilience.",
      guidelines:
        "This course covers mental health and performance topics for esports athletes.",
      order: 1,
    },
  });

  const topics = [
    {
      id: "cltop001",
      title: "Introduction to Mental Performance",
      description:
        "Understanding the importance of mental skills in competitive gaming.",
      order: 1,
    },
    {
      id: "cltop002",
      title: "Focus and Concentration",
      description:
        "Techniques to maintain focus during long gaming sessions and high-pressure moments.",
      order: 2,
    },
    {
      id: "cltop003",
      title: "Stress Management",
      description: "Learn to manage competitive stress and perform under pressure.",
      order: 3,
    },
    {
      id: "cltop004",
      title: "Building Resilience",
      description:
        "Developing mental toughness and bouncing back from setbacks.",
      order: 4,
    },
    {
      id: "cltop005",
      title: "Team Communication",
      description: "Effective communication strategies for team-based games.",
      order: 5,
    },
    {
      id: "cltop006",
      title: "Goal Setting and Motivation",
      description:
        "Setting achievable goals and maintaining motivation throughout your esports journey.",
      order: 6,
    },
    {
      id: "cltop007",
      title: "Pre-Game Routines and Warm-ups",
      description:
        "Developing effective mental and physical preparation routines before competition.",
      order: 7,
    },
  ];

  for (const topic of topics) {
    await prisma.topic.create({
      data: {
        ...topic,
        courseId: course.id,
      },
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
