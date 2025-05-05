/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */
import ProductCardSuggestion from "$store/components/product/ProductCardSuggestion.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useSuggestions } from "$store/sdk/useSuggestions.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { Suggestion } from "apps/commerce/types.ts";
import { useEffect, useRef } from "preact/compat";
import type { Platform } from "$store/apps/site.ts";
import { type Resolved } from "@deco/deco";
// Editable props
export interface Props {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default What are you looking for?
   */
  placeholder?: string;
  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /s
   */
  action?: string;
  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default q
   */
  name?: string;
  /**
   * @title Suggestions Integration
   * @todo: improve this typings ({query: string, count: number}) => Suggestions
   */
  loader: Resolved<Suggestion | null>;
  platform?: Platform;
}
function Searchbar(
  {
    placeholder = "What are you looking for?",
    action = "/s",
    name = "q",
    loader,
    platform,
  }: Props,
) {
  const id = useId();
  const { displaySearchPopup } = useUI();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { setQuery, payload, loading } = useSuggestions(loader);
  const { products = [], searches = [] } = payload.value ?? {};
  const hasProducts = Boolean(products.length);
  const hasTerms = Boolean(searches.length);
  useEffect(() => {
    if (displaySearchPopup.value === true) {
      searchInputRef.current?.focus();
    }
  }, [displaySearchPopup.value]);
  return (
    <div class="w-full grid gap-8 overflow-y-hidden px-1" // style={{ gridTemplateRows: "min-content auto" }}
    >
      <form id={id} action={action} class="join">
        <Button
          type="submit"
          class="join-item btn-square"
          aria-label="Search"
          for={id}
          tabIndex={-1}
        >
          {loading.value
            ? <span class="loading loading-spinner loading-xs" />
            : <Icon id="MagnifyingGlass" size={24} strokeWidth={0.01} />}
        </Button>
        <input
          ref={searchInputRef}
          id="search-input"
          class="input input-bordered flex-grow"
          name={name}
          onInput={(e) => {
            const value = e.currentTarget.value;
            if (value) {
              sendEvent({
                name: "search",
                params: { search_term: value },
              });
            }
            setQuery(value);
          }}
          placeholder={placeholder}
          role="combobox"
          aria-controls="search-suggestion"
          autocomplete="off"
        />
        <Button
          type="button"
          class="md:hidden join-item btn-ghost btn-square hidden sm:inline-flex"
          onClick={() => (displaySearchPopup.value = false)}
        >
          <Icon id="XMark" size={24} strokeWidth={2} />
        </Button>
      </form>

      <div
        class={`md:absolute w-full top-full bg-white z-10 overflow-y-scroll search-result ${
          !hasProducts && !hasTerms ? "hidden" : ""
        }`}
      >
        <div class="gap-4 grid grid-cols-1 sm:grid-rows-1 rounded-2xl p-4 shadow-md">
          <div class="flex flex-col gap-6">
            <span class="font-medium text-xl" role="heading" aria-level={3}>
              Sugestões
            </span>
            <ul id="search-suggestion" class="flex flex-col gap-1">
              {searches.slice(0, 4).map(({ term }) => (
                <li>
                  <a href={`/s?busca=${term}`} class="flex gap-4 items-center">
                    <span dangerouslySetInnerHTML={{ __html: term }} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div class="flex flex-col pt-6 md:pt-0 gap-6 overflow-x-hidden">
            <span class="font-medium text-xl" role="heading" aria-level={3}>
              Produtos sugeridos
            </span>
            <ul class="flex flex-col">
              {products.slice(0, 4).map((product, index) => (
                <ProductCardSuggestion
                  product={product}
                  platform={platform}
                  index={index}
                  itemListName="Suggestions"
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Searchbar;
