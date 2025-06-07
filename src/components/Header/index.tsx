import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import Logo from "@/assets/icons/logo.svg";
import cs from "classnames";

export function Header() {
  const router = useRouter();

  const items = [
    { name: "Home", pathName: "/" },
    { name: "About", pathName: "/about" },
    { name: "Contact Us", pathName: "/contact" },
    { name: "Blogs", pathName: "/blogs"},
  ];

  return (
    <div className="py-2 fixed z-50 bg-white border-b w-full transition-all duration-300">
      <div className="container mx-auto flex items-center">
        <Link href="/">
          <Image className="h-10 w-auto" src={Logo} alt="Logo" />
        </Link>

        <nav className="flex-1 flex gap-10 items-center justify-center">
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
        </nav>
      </div>
    </div>
  );
}

export default Header;
