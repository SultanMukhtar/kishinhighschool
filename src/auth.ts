import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { teacherStatusLabel } from "@/lib/auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Discord],
  session: { strategy: "database" },
  trustHost: true,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      session.user.role = user.role;
      session.user.accountStatus = user.status;

      if (user.role === "USER") {
        const profile = await prisma.studentProfile.findUnique({
          where: { userId: user.id },
          include: { class: true },
        });
        if (profile) {
          session.user.icName = profile.icName;
          session.user.robloxUsername = profile.robloxUsername ?? undefined;
          session.user.class = profile.class.name;
          session.user.age = profile.age;
          session.user.displayStatus = profile.status;
        }
      } else {
        const profile = await prisma.teacherProfile.findUnique({
          where: { userId: user.id },
          include: { classes: { where: { role: "HOMEROOM" }, include: { class: true } } },
        });
        if (profile) {
          const homeroom = profile.classes[0]?.class.name;
          session.user.icName = profile.icName;
          session.user.robloxUsername = profile.robloxUsername ?? undefined;
          session.user.age = profile.age ?? undefined;
          session.user.subject = profile.subject;
          session.user.teacherRole = profile.role;
          session.user.class = homeroom ?? "SEMUA KELAS";
          session.user.displayStatus = teacherStatusLabel(profile.role, profile.subject, homeroom);
        }
      }

      return session;
    },
  },
});
