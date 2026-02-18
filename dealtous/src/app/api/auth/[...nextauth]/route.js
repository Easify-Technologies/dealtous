import NextAuthPkg from "next-auth";
import { authOptions } from "../../../../lib/auth-options.js";

const NextAuth = NextAuthPkg.default ?? NextAuthPkg;
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };