import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { MenuButton, SearchButton } from "$store/islands/Header/Buttons.tsx";
import CartButtonLinx from "$store/islands/Header/Cart/linx.tsx";
import CartButtonShopify from "$store/islands/Header/Cart/shopify.tsx";
import CartButtonVDNA from "$store/islands/Header/Cart/vnda.tsx";
import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
import CartButtonWake from "$store/islands/Header/Cart/wake.tsx";
import CartButtonNuvemshop from "$store/islands/Header/Cart/nuvemshop.tsx";
import Searchbar from "$store/islands/Header/Searchbar.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";

function Navbar({ items, searchbar, logo }: {
  items: SiteNavigationElement[];
  // extras: SiteNavigationElement[];
  searchbar?: SearchbarProps;
  logo?: { src: string; alt: string };
}) {
  const platform = usePlatform();

  return (
    <>
      {/* Mobile Version */}
      <div
        style={{ height: navbarHeight }}
        class="md:hidden flex flex-row justify-between items-center border-b border-base-200 w-full pl-2 pr-6 gap-2"
      >
        <MenuButton />

        {logo && (
          <a
            href="/"
            class="flex-grow inline-flex items-center"
            style={{ minHeight: navbarHeight }}
            aria-label="Store logo"
          >
            <Image src={logo.src} alt={logo.alt} width={126} height={16} />
          </a>
        )}

        <div class="flex gap-1 wake-mobile-search">
          <SearchButton />
          {platform === "vtex" && <CartButtonVTEX />}
          {platform === "vnda" && <CartButtonVDNA />}
          {platform === "wake" && (
            <div class="wake-button">
              <CartButtonWake />
            </div>
          )}
        </div>
      </div>

      {/* Desktop Version */}
      <div
        style="gap: 5rem"
        class="container hidden md:flex flex-row justify-between items-center w-full"
      >
        <div class="flex-none">
          {logo && (
            <a
              href="/"
              aria-label="Store logo"
              class="block px-4 py-3 w-[204px]"
            >
              <Image src={logo.src} alt={logo.alt} width={204} height={45} />
            </a>
          )}
        </div>
        <div class="flex-auto searchbar-content">
          <Searchbar searchbar={searchbar} />
        </div>
        <div class="flex-none flex items-center justify-end gap-2">
          {/* <SearchButton /> */}
          <a
            class="w-auto flex btn btn-circle btn-sm btn-ghost"
            href="//checkout.worldtools.com.br/Login/Authenticate?"
            aria-label="Log in"
            style="border: 1px solid #4BAEE9; height: auto;border-radius: 30px;
             padding-right: 15px"
          >
            <Icon
              style="padding: 10px;border-radius: 100px;background: #4BAEE9; width: 48px; height:48px; color: #ffffff;"
              id="User"
              size={24}
              strokeWidth={0.4}
            />
            <p>
              Olá! Faça seu <strong class="strong-color">Login</strong>
              <br></br>
              ou <strong class="strong-color">Cadastre-se</strong>
            </p>
          </a>
          <a
            class="btn btn-circle btn-sm btn-ghost wishlist-button"
            href="/wishlist"
            aria-label="Wishlist"
          >
            <Icon
              id="Heart"
              size={24}
              strokeWidth={2}
              fill="none"
            />
          </a>
          {platform === "vtex" && <CartButtonVTEX />}
          {platform === "wake" && (
            <div class="wake-button">
              <CartButtonWake />
            </div>
          )}
          {platform === "vnda" && <CartButtonVDNA />}
          {platform === "linx" && <CartButtonLinx />}
          {platform === "shopify" && <CartButtonShopify />}
          {platform === "nuvemshop" && <CartButtonNuvemshop />}
        </div>
      </div>
      <div class="relative hidden md:flex flex-row justify-between items-center border-t border-base-200 w-full pl-2 pr-6 py-4">
        <div class="flex-auto flex justify-center">
          {items.map((item) => <NavItem item={item} />)}
        </div>
      </div>
    </>
  );
}

export default Navbar;
