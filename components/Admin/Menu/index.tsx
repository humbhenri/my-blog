"use client";

import { HouseIcon, FileTextIcon, MenuIcon, CircleXIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
const linkClass =
  "px-4 flex items-center gap-2 bg-slate-900 text-slate-100 hover:bg-slate-800 transition shrink-0 rounded-lg h-10 cursor-pointer";

export function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathName]);

  const navClass =
    `flex flex-col sm:flex-row sm:flex-wrap bg-slate-900 rounded-lg mb-8 ${!isOpen && "h-10 overflow-hidden"} sm:overflow-visible sm:h-auto`;
  return (
    <nav className={navClass}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={` ${linkClass} text-blue-200 italic sm:hidden`}
      >
        {!isOpen && (
            <>
                <MenuIcon size={16} />
                Menu
            </>
        )}
        {isOpen && (
            <>
                <CircleXIcon size={16} />
                Fechar
            </>
        )}
      </button>
      <a href="/" target="_blank" className={linkClass}>
        <HouseIcon size={16} />
        Home
      </a>
      <Link href="/admin/post" className={linkClass}>
        <FileTextIcon size={16} />
        Admin Posts
      </Link>
      <Link href="/admin/post/new" className={linkClass}>
        <PlusIcon size={16} />
        Criar post
      </Link>
    </nav>
  );
}
