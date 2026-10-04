import { Role, AccountStatus } from "@prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
      /** Sign-up approval status (PENDING/APPROVED/REJECTED) - gates onboarding/approval flow. */
      accountStatus: AccountStatus;
      icName?: string;
      robloxUsername?: string;
      class?: string;
      age?: number;
      /**
       * Display status - StudentStatus value for students, composed label for
       * staff. Deliberately NOT named `status` - that name collides with the
       * `User.status` (AccountStatus) augmentation below via DefaultSession.
       */
      displayStatus?: string;
      subject?: string;
      /** TEACHER vs COACH - only set when role is ADMIN. */
      teacherRole?: "TEACHER" | "COACH";
    } & DefaultSession["user"];
  }

  interface User {
    role: Role;
    status: AccountStatus;
  }
}
