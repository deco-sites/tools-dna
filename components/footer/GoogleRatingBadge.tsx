import { h } from "preact";
import { useEffect } from "preact/hooks";

const GoogleRatingBadge = () => {
  useEffect(() => {
    // Adiciona o script do Google dinamicamente
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js?onload=renderBadge";
    script.async = true;
    script.defer = true;

    // Define a função renderBadge no escopo global
    window.renderBadge = function () {
      console.log("Iniciando renderização do selo...");
      const ratingBadgeContainer = document.createElement("div");
      document.body.appendChild(ratingBadgeContainer);
      if (window.gapi) {
        console.log("Objeto gapi disponível:", window.gapi);
        window.gapi.load("ratingbadge", function () {
          console.log("Carregando módulo ratingbadge...");
          window.gapi.ratingbadge.render(ratingBadgeContainer, {
            merchant_id: "100653993",
            position: "INLINE",
          });
          console.log("Selo renderizado com sucesso.");
        });
      } else {
        console.error("Objeto gapi não está disponível.");
      }
    };

    document.body.appendChild(script);
  }, []);

  return (
    <div>
      {/* Container onde o selo será renderizado */}
      <div id="rating-badge-container"></div>
    </div>
  );
};

export default GoogleRatingBadge;