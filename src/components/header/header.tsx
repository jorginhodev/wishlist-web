import Link from "next/link";
import { Heart, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { memo } from "react";

export const Header = memo(function Header() {
  return (
    <header className="bg-[#7B1FA2]" role="banner">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="text-2xl font-bold text-white hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#7B1FA2]"
          aria-label="DEVSHOES - Ir para página inicial"
        >
          DEVSHOES
        </Link>

        <nav className="flex items-center gap-6" aria-label="Menu principal">
          <Link
            href="/wishlist"
            className="flex items-center gap-2 text-white hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#7B1FA2]"
            aria-label="Ver lista de desejos"
          >
            <Heart className="h-5 w-5" aria-hidden="true" />
            <span>Wishlist</span>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-white hover:bg-white/20 hover:text-white focus-visible:bg-white/20 focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#7B1FA2]"
                aria-label="Menu do usuário"
              >
                <UserCircle className="h-5 w-5" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              aria-label="Opções do usuário"
              className="rounded-md border border-gray-200 bg-white shadow-md"
            >
              <DropdownMenuItem className="cursor-pointer data-[highlighted]:bg-gray-200">
                Entrar
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer data-[highlighted]:bg-gray-200">
                Minha Conta
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer data-[highlighted]:bg-gray-200">
                Endereços
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer data-[highlighted]:bg-gray-200">
                Minha Netshoes
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
});
