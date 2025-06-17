// components/Header.tsx
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import Logo from "@/assets/icons/logo.svg";
import cs from "classnames";
import { signOut, useSession } from "next-auth/react";
import Button from "../shared/Button"; // Assuming this is your Button component

export function Header() {
  const { data: session, status } = useSession(); // status can be 'loading', 'authenticated', 'unauthenticated'
  const router = useRouter();

  const items = [
    { name: "Home", pathName: "/" },
    { name: "About", pathName: "/about" },
    { name: "Contact Us", pathName: "/contact" },
    { name: "Blogs", pathName: "/blogs" },
    { name: "News", pathName: "/news" },
  ];

  return (
    <div className="py-2 fixed z-50 bg-white border-b w-full transition-all duration-300">
      <div className="container mx-auto flex items-center">
        <Link href="/">
          <Image className="h-10 w-auto" src={Logo} alt="Logo" />
        </Link>

        <div className="flex-1 flex gap-10 items-center justify-center">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.pathName}
              aria-current={router.pathname === item.pathName ? "page" : undefined}
              className={cs("text-black", {
                "underline font-semibold": router.pathname === item.pathName,
              })}
            >
              {item.name}
            </Link>
          ))}

          {/* ✨ Add Admin Dashboard link here ✨ */}
          {status === "authenticated" && session.user?.role === "admin" && (
            <Link
              href="/dashboard" // Assuming your admin dashboard page is at /admin/dashboard
              aria-current={router.pathname === "/dashboard" ? "page" : undefined}
              className={cs("text-black", {
                "underline font-semibold": router.pathname === "/dashboard",
              })}
            >
              Admin Dashboard
            </Link>
          )}
        </div>

        <div className="flex gap-5">
          {status === "loading" && <p>Loading...</p>} {/* Optional: Show loading state for session */}

          {status === "authenticated" ? (
            <Button
              onClick={() => signOut({ callbackUrl: "/sign-in" })}
              text="Dil" // "Sign Out"
            />
          ) : (
            <>
              <Button
                onClick={() => router.push("/sign-up")}
                text="Regjistrohu" // "Register"
              />
              <Button
                onClick={() => router.push("/sign-in")}
                variant="secondary"
                text="Kycu" // "Sign In"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;