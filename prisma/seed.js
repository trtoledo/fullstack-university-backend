const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function main() {
  const csDept = await prisma.department.create({
    data: {
      name: "Computer Science",
      description: "Department of Computer Science",
      bannerImage: "https://example.com/cs-banner.jpg",
      contactInfo: "cs@fullstackuni.edu",
      professors: {
        create: [
          {
            name: "Dr. Ada Lovelace",
            bio: "Pioneer of computing.",
            email: "ada@fullstackuni.edu",
            profileImage: "https://example.com/ada.jpg",
          },
          {
            name: "Dr. Alan Turing",
            bio: "Father of theoretical computer science.",
            email: "turing@fullstackuni.edu",
            profileImage: "https://example.com/turing.jpg",
          },
        ],
      },
    },
  });

  console.log("Seeded data:", csDept);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());