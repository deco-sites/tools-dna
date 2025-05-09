import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";
import { Head } from "$fresh/runtime.ts";

export interface Props {
  alerts: string[];
  ctaButton: {
    buttonText: string;
    buttonLink: string;
    alertsActive: boolean;
  };

  /** @title Search Bar */
  searchbar?: Omit<SearchbarProps, "platform">;

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: SiteNavigationElement[] | null;

  /** @title Logo */
  logo?: { src: ImageWidget; alt: string };
}

function Header({
  alerts,
  ctaButton,
  searchbar,
  navItems,
  logo,
}: Props) {
  const platform = usePlatform();
  const items = navItems ?? [];

  return (
    <>
      <Head>
        <meta
          name="facebook-domain-verification"
          content="xlrui46nujovk2wvavt6pitnwakknm"
        />
      </Head>
      <header
        style={{ height: `${ctaButton.alertsActive ? headerHeight : "150px"}` }}
      >
        <Drawers
          menu={{ items }}
          searchbar={searchbar}
          platform={platform}
        >
          <div class="bg-primary fixed w-full z-50 base-100">
            <Alert alerts={alerts} ctaButton={ctaButton} />
            <Navbar
              items={items}
              searchbar={searchbar && { ...searchbar, platform }}
              logo={logo}
            />
          </div>
        </Drawers>
      </header>
    </>
  );
}

export default Header;
