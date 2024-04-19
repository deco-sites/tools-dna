import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";

export interface Props {
  alerts: string[];
  ctaButton: {
    buttonText: string;
    buttonLink: string;
  },
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function Alert({ alerts = [], interval = 5, ctaButton }: Props) {
  const id = useId();

  return (
    <div id={id}>
      <Slider class="topbar-carousel carousel carousel-center w-screen bg-secondary gap-6">
        {alerts.map((alert, index) => (
          <Slider.Item index={index} class="carousel-item">
            <span class="text-sm text-secondary-content flex justify-center items-center w-screen h-[38px]">
              <p dangerouslySetInnerHTML={{ __html: alert }}></p>
              <a
                class="button-alert flex items-center justify-center bg-blue-500 text-white font-bold text-base gap-1 rounded-3xl"
                href={ctaButton.buttonLink}
              >
                <svg
                  width="12"
                  height="16"
                  viewBox="0 0 12 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.235 5.207c-.068.73-.116 2.021.315 2.571 0 0-.203-1.419 1.616-3.2.732-.716.901-1.69.645-2.421-.145-.415-.41-.757-.64-.996a.215.215 0 0 1 .164-.363c1.183.052 3.102.381 3.917 2.427.357.898.384 1.826.213 2.77-.108.602-.492 1.941.385 2.106.625.118.927-.38 1.063-.737a.213.213 0 0 1 .358-.067c1.056 1.201 1.146 2.617.928 3.835-.423 2.355-2.808 4.07-5.178 4.07-2.96 0-5.316-1.694-5.927-4.76-.246-1.238-.121-3.687 1.787-5.415.142-.13.373-.015.354.18Z"
                    fill="url(#a)"
                  />
                  <path
                    d="M7.103 9.611C6.012 8.207 6.5 6.604 6.768 5.965c.036-.084-.06-.163-.136-.111-.469.32-1.43 1.07-1.878 2.128-.606 1.43-.563 2.13-.204 2.984.216.515-.035.625-.161.644-.123.019-.235-.063-.325-.148a1.932 1.932 0 0 1-.533-.912c-.02-.075-.117-.095-.161-.034-.336.465-.51 1.21-.519 1.737-.026 1.63 1.32 2.95 2.947 2.95 2.052 0 3.546-2.27 2.367-4.166-.342-.552-.664-.913-1.062-1.426Z"
                    fill="url(#b)"
                  />
                  <defs>
                    <radialGradient
                      id="a"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="rotate(-179.751 2.734 7.613) scale(8.47341 13.9032)"
                    >
                      <stop offset=".314" stop-color="#FF9800" />
                      <stop offset=".662" stop-color="#FF6D00" />
                      <stop offset=".972" stop-color="#F44336" />
                    </radialGradient>
                    <radialGradient
                      id="b"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="matrix(-.08954 8.86533 -6.67183 -.06739 5.91 6.807)"
                    >
                      <stop offset=".214" stop-color="#FFF176" />
                      <stop offset=".328" stop-color="#FFF27D" />
                      <stop offset=".487" stop-color="#FFF48F" />
                      <stop offset=".672" stop-color="#FFF7AD" />
                      <stop offset=".793" stop-color="#FFF9C4" />
                      <stop
                        offset=".822"
                        stop-color="#FFF8BD"
                        stop-opacity=".804"
                      />
                      <stop
                        offset=".863"
                        stop-color="#FFF6AB"
                        stop-opacity=".529"
                      />
                      <stop
                        offset=".91"
                        stop-color="#FFF38D"
                        stop-opacity=".209"
                      />
                      <stop
                        offset=".941"
                        stop-color="#FFF176"
                        stop-opacity="0"
                      />
                    </radialGradient>
                  </defs>
                </svg>
                {ctaButton.buttonText ?? "EU QUERO"}
              </a>
            </span>
          </Slider.Item>
        ))}
      </Slider>

      <SliderJS rootId={id} interval={interval && interval * 1e3} />
    </div>
  );
}

export default Alert;
