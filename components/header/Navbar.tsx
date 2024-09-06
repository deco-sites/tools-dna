import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { MenuButton } from "$store/islands/Header/Buttons.tsx";
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
import UserLoggedIn from "site/islands/UserLoggedIn.tsx";

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
        {logo && (
          <a
            href="/"
            class="flex-grow inline-flex items-center"
            style={{ minHeight: navbarHeight }}
            aria-label="Store logo"
          >
            <Image src={logo.src} alt={logo.alt} width={159} height={35} />
          </a>
        )}

        <div class="flex gap-1 wake-mobile-search">
          {/* <SearchButton /> */}
          <a
            class="w-auto flex btn btn-circle btn-sm btn-ghost"
            href="//checkout.worldtools.com.br/Login/Authenticate?"
            aria-label="Log in"
          >
            <Icon
              style="padding: 10px;border-radius: 100px;background: #4BAEE9; color: #ffffff;"
              id="User"
              class="h-[40px] w-[40px] md:h-[48px] md:w-[48px]"
              size={18}
              strokeWidth={0.4}
            />
          </a>
          {platform === "vtex" && <CartButtonVTEX />}
          {platform === "vnda" && <CartButtonVDNA />}
          {platform === "wake" && (
            <div class="wake-button transition-all">
              <CartButtonWake />
            </div>
          )}
          <MenuButton />
        </div>
      </div>
      <div class="flex-auto searchbar-content relative md:hidden p-4 pt-0">
        <Searchbar searchbar={searchbar} />
      </div>
      {/* Desktop Version */}
      <div
        style="gap: 5rem"
        class="container hidden md:flex flex-row justify-between items-center w-full py-1"
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
        <div class="flex-auto searchbar-content relative">
          <Searchbar searchbar={searchbar} />
        </div>
        <div class="flex-none flex items-center justify-end gap-2">
          {/* <SearchButton /> */}
          <UserLoggedIn />
          <a
            class="btn btn-circle btn-sm btn-ghost wishlist-button h-[40px] w-[40px] md:h-[48px] md:w-[48px]"
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
      <div class="relative hidden md:flex flex-row justify-between items-center border-t border-[#E9E9E9] w-full pl-2 pr-6 py-4">
        <div class="flex-auto flex justify-center">
          {items.map((item) => <NavItem item={item} />)}
        </div>
      </div>
    </>
  );
}

export default Navbar;
