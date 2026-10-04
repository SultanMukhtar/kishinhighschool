import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Minimal structural seed - just the 6 classes so the onboarding form has
 * something to assign a new student to. Rich content (description, lore,
 * Discord links, etc.) still lives in Google Sheets until Phase 2 migrates
 * it into these same rows.
 */
const CLASS_NAMES = ["CLASS A", "CLASS B", "CLASS C", "CLASS D", "CLASS E", "CLASS INTERNATIONAL"];

async function main() {
  for (const name of CLASS_NAMES) {
    await prisma.class.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
  console.log(`Seeded ${CLASS_NAMES.length} classes.`);
  console.log(
    "Reminder: promote your own account to SUPERADMIN manually (via `npx prisma studio`) after logging in with Discord once - there's no one else yet to approve the first superadmin."
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
