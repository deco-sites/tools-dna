import { h } from "preact";

const GoogleRatingBadge = () => {
  return (
    <div>
      {/* Container onde o selo será renderizado */}
      <div id="rating-badge-container"></div>

      {/* Script para carregar o Google API */}
      <script
        src="https://apis.google.com/js/platform.js?onload=renderBadge"
        async
        defer
      ></script>

      {/* Script para definir a função renderBadge */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.renderBadge = function() {
              console.log("Iniciando renderização do selo...");
              var ratingBadgeContainer = document.getElementById("rating-badge-container");
              if (ratingBadgeContainer && window.gapi) {
                console.log("Objeto gapi disponível:", window.gapi);
                window.gapi.load('ratingbadge', function() {
                  try {
                    console.log("Carregando módulo ratingbadge...");
                    window.gapi.ratingbadge.render(
                      ratingBadgeContainer, {
                        "merchant_id": "100653993",
                        "position": "INLINE",
                        "origin": window.location.origin
                      }
                    );
                    console.log("Selo renderizado com sucesso.");
                  } catch (e) {
                    console.error("Erro ao renderizar o selo:", e);
                  }
                });
              } else {
                console.error("Objeto gapi não está disponível ou o container não foi encontrado.");
              }
            };
          `,
        }}
      ></script>
    </div>
  );
};

export default GoogleRatingBadge;