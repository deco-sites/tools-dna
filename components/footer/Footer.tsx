import BackToTop from "$store/components/footer/BackToTop.tsx";
import ColorClasses from "$store/components/footer/ColorClasses.tsx";
import Divider from "$store/components/footer/Divider.tsx";
import ExtraLinks from "$store/components/footer/ExtraLinks.tsx";
import FooterItems from "$store/components/footer/FooterItems.tsx";
import Logo from "$store/components/footer/Logo.tsx";
import MobileApps from "$store/components/footer/MobileApps.tsx";
import PaymentMethods from "$store/components/footer/PaymentMethods.tsx";
import RegionSelector from "$store/components/footer/RegionSelector.tsx";
import Social from "$store/components/footer/Social.tsx";
import Newsletter from "$store/islands/Newsletter.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import PoweredByDeco from "apps/website/components/PoweredByDeco.tsx";
import { asset } from "$fresh/runtime.ts";

export type Item = {
  label: string;
  href: string;
};

export type Section = {
  label: string;
  items: Item[];
};

export interface SocialItem {
  label:
    | "Discord"
    | "Facebook"
    | "Instagram"
    | "Linkedin"
    | "Tiktok"
    | "Twitter";
  link: string;
}

export interface PaymentItem {
  label: "Diners" | "Elo" | "Mastercard" | "Pix" | "Visa";
}

export interface MobileApps {
  /** @description Link to the app */
  apple?: string;
  /** @description Link to the app */
  android?: string;
}

export interface RegionOptions {
  currency?: Item[];
  language?: Item[];
}

export interface NewsletterForm {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Layout {
  backgroundColor?:
    | "Primary"
    | "Secondary"
    | "Accent"
    | "Base 100"
    | "Base 100 inverted";
  variation?:
    | "Variation 1"
    | "Variation 2"
    | "Variation 3"
    | "Variation 4"
    | "Variation 5";
  hide?: {
    logo?: boolean;
    newsletter?: boolean;
    sectionLinks?: boolean;
    socialLinks?: boolean;
    paymentMethods?: boolean;
    mobileApps?: boolean;
    regionOptions?: boolean;
    extraLinks?: boolean;
    backToTheTop?: boolean;
  };
}

export interface Props {
  logo?: {
    image: ImageWidget;
    description?: string;
  };
  newsletter?: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: NewsletterForm;
  };
  sections?: Section[];
  social?: {
    title?: string;
    items: SocialItem[];
  };
  payments?: {
    title?: string;
    items: PaymentItem[];
  };
  mobileApps?: MobileApps;
  regionOptions?: RegionOptions;
  extraLinks?: Item[];
  backToTheTop?: {
    text?: string;
  };
  layout?: Layout;
}

function Footer({
  logo,
  newsletter = {
    title: "Newsletter",
    description: "",
    form: { placeholder: "", buttonText: "", helpText: "" },
  },
  sections = [{
    "label": "Sobre",
    "items": [
      {
        "href": "/quem-somos",
        "label": "Quem somos",
      },
      {
        "href": "/termos-de-uso",
        "label": "Termos de uso",
      },
      {
        "href": "/trabalhe-conosco",
        "label": "Trabalhe conosco",
      },
    ],
  }, {
    "label": "Atendimento",
    "items": [
      {
        "href": "/centraldeatendimento",
        "label": "Central de atendimento",
      },
      {
        "href": "/whatsapp",
        "label": "Fale conosco pelo WhatsApp",
      },
      {
        "href": "/trocaedevolucao",
        "label": "Troca e devolução",
      },
    ],
  }],
  social = {
    title: "Redes sociais",
    items: [{ label: "Instagram", link: "/" }, { label: "Tiktok", link: "/" }],
  },
  payments = {
    title: "Formas de pagamento",
    items: [{ label: "Mastercard" }, { label: "Visa" }, { label: "Pix" }],
  },
  mobileApps = { apple: "/", android: "/" },
  regionOptions = { currency: [], language: [] },
  extraLinks = [],
  backToTheTop,
  layout = {
    backgroundColor: "Primary",
    variation: "Variation 1",
    hide: {
      logo: false,
      newsletter: false,
      sectionLinks: false,
      socialLinks: false,
      paymentMethods: false,
      mobileApps: false,
      regionOptions: false,
      extraLinks: false,
      backToTheTop: false,
    },
  },
}: Props) {
  const _logo = layout?.hide?.logo ? <></> : <Logo logo={logo} />;
  const _newsletter = layout?.hide?.newsletter ? <></> : (
    <Newsletter
      content={newsletter}
      layout={{
        tiled: layout?.variation == "Variation 4" ||
          layout?.variation == "Variation 5",
      }}
    />
  );
  const _sectionLinks = layout?.hide?.sectionLinks ? <></> : (
    <FooterItems
      sections={sections}
      justify={layout?.variation == "Variation 2" ||
        layout?.variation == "Variation 3"}
    />
  );
  const _social = layout?.hide?.socialLinks
    ? <></>
    : <Social content={social} vertical={layout?.variation == "Variation 3"} />;
  const _payments = layout?.hide?.paymentMethods
    ? <></>
    : <PaymentMethods content={payments} />;
  const _apps = layout?.hide?.mobileApps
    ? <></>
    : <MobileApps content={mobileApps} />;
  const _region = layout?.hide?.regionOptions
    ? <></>
    : <RegionSelector content={regionOptions} />;
  const _links = layout?.hide?.extraLinks
    ? <></>
    : <ExtraLinks content={extraLinks} />;

  return (
    <footer
      class={`w-full flex flex-col pt-10 pb-2 md:pb-10 gap-10`}
    >
      <div class="lg:container mx-6 lg:mx-auto">
        {(!layout?.variation || layout?.variation == "Variation 1") && (
          <div class="flex flex-col gap-10">
            <Divider />
            <div class="flex flex-col  items-center md:items-start md:flex-row md:justify-between md:flex-wrap lg:flex-nowrap gap-8 lg:gap-12">
              <div class="flex flex-col">
                <div class="flex flex-row gap-4">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 31 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="58c90baf">
                      <path
                        id="193b5345"
                        d="M6.23444 13.4161C8.71444 18.29 12.71 22.2856 17.5839 24.7656L21.3728 20.9767C21.855 20.4944 22.5267 20.3567 23.1294 20.5461C25.0583 21.1833 27.125 21.5278 29.2778 21.5278C29.7345 21.5278 30.1726 21.7092 30.4956 22.0322C30.8186 22.3552 31 22.7932 31 23.25V29.2778C31 29.7345 30.8186 30.1726 30.4956 30.4956C30.1726 30.8186 29.7345 31 29.2778 31C21.5128 31 14.0659 27.9154 8.57526 22.4247C3.08461 16.9341 0 9.48717 0 1.72222C0 1.26546 0.181448 0.827406 0.504427 0.504427C0.827406 0.181448 1.26546 0 1.72222 0H7.75C8.20676 0 8.64482 0.181448 8.96779 0.504427C9.29077 0.827406 9.47222 1.26546 9.47222 1.72222C9.47222 3.875 9.81667 5.94167 10.4539 7.87056C10.6433 8.47333 10.5056 9.145 10.0233 9.62722L6.23444 13.4161Z"
                        fill="#164195"
                      >
                      </path>
                    </g>
                  </svg>
                  <h2 class="text-lg telefone-contatos">
                    47 3027-1106 / 47 3027-1106
                  </h2>
                </div>
                <div class="flex flex-row">
                  <p class="endereco-new">
                    Rua Desembargador Guilherme Abry, 667 - Saguaçú -
                    Joinville/SC - 89.221-600
                  </p>
                </div>
              </div>
              <div class="flex flex-row gap-8">
                <svg
                  width="32"
                  height="25"
                  viewBox="0 0 32 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="640d0d93">
                    <path
                      id="54747a60"
                      d="M31.0588 0H0.941177C0.691561 0 0.452169 0.0991593 0.275664 0.275664C0.0991593 0.452169 0 0.691561 0 0.941177V22.2745C0 22.8569 0.231372 23.4155 0.643217 23.8274C1.05506 24.2392 1.61364 24.4706 2.19608 24.4706H29.8039C30.3864 24.4706 30.9449 24.2392 31.3568 23.8274C31.7686 23.4155 32 22.8569 32 22.2745V0.941177C32 0.691561 31.9008 0.452169 31.7243 0.275664C31.5478 0.0991593 31.3084 0 31.0588 0ZM16 13.4682L3.36 1.88235H28.64L16 13.4682ZM11.8698 12.2353L1.88235 21.3898V3.08078L11.8698 12.2353ZM13.2627 13.5122L15.3726 15.4384C15.5461 15.5972 15.7727 15.6852 16.0078 15.6852C16.243 15.6852 16.4696 15.5972 16.6431 15.4384L18.7451 13.5122L28.64 22.5882H3.36157L13.2627 13.5122ZM20.1302 12.2353L30.1176 3.08078V21.3898L20.1302 12.2353Z"
                      fill="#164195"
                    >
                    </path>
                  </g>
                </svg>
                <a href={`mailto:vendas@worldtools.com.br`}>
                  vendas@worldtools.com.br
                </a>
              </div>
              {_social}
            </div>

            <Divider />
            <div class="flex flex-col md:flex-row md:justify-between md:flex-wrap lg:flex-nowrap gap-8 lg:gap-12">
              {_logo}
              {_payments}
              <div class="flex flex-col gap-4">
                <h3 class="text-lg">Selos de Segurança</h3>
                <ul class="flex items-center gap-4 flex-wrap">
                  <li title="Selo Google">
                    <img
                      style="max-width: 228px"
                      src={asset(`/exemplo-selos-de-seguranca.png`)}
                      alt=""
                    />
                  </li>
                </ul>
              </div>
              {_sectionLinks}
              {_newsletter}
            </div>

            <Divider />
            <div class="flex flex-col copyright">
              © 2010 - 2023 - WORLD TOOLS COMERCIO DE FERRAMENTAS LTDA - CNPJ:
              13.064.755/0001-00. Todos os Direitos Reservados.
              <br></br>
              Rua Desembargador Guilherme Abry, 667 - Saguaçú - Joinville/SC -
              89.221-600
            </div>
            {
              /* <div class="flex flex-col md:flex-row gap-10 md:gap-14 md:items-end">

              {_social}
              <div class="flex flex-col lg:flex-row gap-10 lg:gap-14 lg:items-end">
                {_apps}
                {_region}
              </div>
            </div>
            <Divider /> */
            }
            {
              /* <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10">
              <PoweredByDeco />
              {_links}
            </div> */
            }
          </div>
        )}
        {layout?.variation == "Variation 2" && (
          <div class="flex flex-col gap-10">
            <div class="flex flex-col md:flex-row gap-10">
              <div class="flex flex-col gap-10 lg:w-1/2">
                {_logo}
                {_social}
                {_payments}
                {_apps}
                {_region}
              </div>
              <div class="flex flex-col gap-10 lg:gap-20 lg:w-1/2 lg:pr-10">
                {_newsletter}
                {_sectionLinks}
              </div>
            </div>
            <Divider />
            <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10">
              <PoweredByDeco />
              {_links}
            </div>
          </div>
        )}
        {layout?.variation == "Variation 3" && (
          <div class="flex flex-col gap-10">
            {_logo}
            <div class="flex flex-col lg:flex-row gap-14">
              <div class="flex flex-col md:flex-row lg:flex-col md:justify-between lg:justify-normal gap-10 lg:w-2/5">
                {_newsletter}
                <div class="flex flex-col gap-10">
                  {_payments}
                  {_apps}
                </div>
              </div>
              <div class="flex flex-col gap-10 lg:gap-20 lg:w-3/5 lg:items-end">
                <div class="flex flex-col md:flex-row gap-10">
                  {_sectionLinks}
                  {_social}
                </div>
                {_region}
              </div>
            </div>
            <Divider />
            <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10">
              <PoweredByDeco />
              {_links}
            </div>
          </div>
        )}
        {layout?.variation == "Variation 4" && (
          <div class="flex flex-col gap-10">
            {_newsletter}
            {layout?.hide?.newsletter ? <></> : <Divider />}
            <div class="flex flex-col lg:flex-row gap-10 lg:gap-20 lg:justify-between">
              {_sectionLinks}
              <div class="flex flex-col md:flex-row lg:flex-col gap-10 lg:gap-10 lg:w-2/5 lg:pl-10">
                <div class="flex flex-col md:flex-row gap-10 lg:gap-20">
                  <div class="lg:flex-auto">
                    {_payments}
                  </div>
                  <div class="lg:flex-auto">
                    {_social}
                  </div>
                </div>
                <div class="flex flex-col gap-10 lg:gap-10">
                  {_region}
                  {_apps}
                </div>
              </div>
            </div>
            <Divider />
            <div class="flex flex-col md:flex-row md:justify-between gap-10 md:items-center">
              {_logo}
              <PoweredByDeco />
            </div>
          </div>
        )}
        {layout?.variation == "Variation 5" && (
          <div class="flex flex-col gap-10">
            {_newsletter}
            {layout?.hide?.newsletter ? <></> : <Divider />}
            {_logo}
            <div class="flex flex-col md:flex-row gap-10 lg:gap-20 md:justify-between">
              {_sectionLinks}
              <div class="flex flex-col gap-10 md:w-2/5 lg:pl-10">
                {_payments}
                {_social}
                {_apps}
              </div>
            </div>
            <Divider />
            <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10 md:items-center">
              <PoweredByDeco />
              <div class="flex flex-col md:flex-row gap-10 md:items-center">
                {_links}
                {_region}
              </div>
            </div>
          </div>
        )}
      </div>
      {layout?.hide?.backToTheTop
        ? <></>
        : <BackToTop content={backToTheTop?.text} />}
    </footer>
  );
}

export default Footer;
