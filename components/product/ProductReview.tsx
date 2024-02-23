import { Signal, useSignal } from "@preact/signals";
import { useCallback, useState } from "preact/hooks";
import { invoke } from "$store/runtime.ts";

function ProductReview(productId: number) {
  const reviewRating = 5;
  const reviewName = "";
  const reviewEmail = "";
  const reviewContent = "";

  // const handleReview = useCallback(async () => {
  //   try {
  //     const createReview = invoke.wake.actions.review.create({
  //       email: reviewEmail,
  //       name: reviewName,
  //       productVariantId: productId,
  //       rating: reviewRating,
  //       review: reviewContent,
  //     });
  //     console.log(createReview);
  //   } catch (e) {
  //     console.log(e);
  //     return;
  //   } finally {
  //     console.log("deu erro total");
  //   }
  // }, []);

  return (
    <>
      <h2>
        Avalie esse produto
      </h2>
      <form
        id="formAvaliacao"
        class="form-antispam"
        method="post"
        onSubmit={(e) => {
          e.preventDefault();
          // handleReview();
        }}
      >
        <div class="avaliainputs">
          <div class="left">
            <input
              class="input inputAvaliacao"
              id="txtAvaliacaoNome"
              name="txtAvaliacaoNome"
              type={"text"}
              value="Nome"
            />
          </div>
          <div class="left">
            <input
              class="input inputAvaliacao"
              value={reviewEmail}
              // onChange={(e) => {
              //   reviewEmail.value = e.currentTarget.value;
              // }}
              id="txtAvaliacaoEmail"
              name="txtAvaliacaoEmail"
              type={"text"}
            />
          </div>
        </div>

        <div class="avaliacoment">
          <textarea
            class="input textAreaAvaliacao valid"
            id="txtAvaliacaoDescricao"
            name="txtAvaliacaoDescricao"
          >
            Comentários
          </textarea>
          <div style="display: none;">
            Número maximo de caracteres atingido (4000)
          </div>
        </div>

        <div class="pontosAvaliacao clear">
          <a href="javascript:Avaliar(1)">
            <img
              src="https://recursos.WORLDTOOLS.com.br/i/aval_on.png"
              id="aval1"
              alt="Muito Ruim"
            />
          </a>
          <a href="javascript:Avaliar(2)">
            <img
              src="https://recursos.WORLDTOOLS.com.br/i/aval_on.png"
              id="aval2"
              alt="Ruim"
            />
          </a>
          <a href="javascript:Avaliar(3)">
            <img
              src="https://recursos.WORLDTOOLS.com.br/i/aval_on.png"
              id="aval3"
              alt="Bom"
            />
          </a>
          <a href="javascript:Avaliar(4)">
            <img
              src="https://recursos.WORLDTOOLS.com.br/i/aval_on.png"
              id="aval4"
              alt="Muito Bom"
            />
          </a>
          <a href="javascript:Avaliar(5)">
            <img
              src="https://recursos.WORLDTOOLS.com.br/i/aval_on.png"
              id="aval5"
              alt="Excelente"
            />
          </a>

          <select id="ddlNota">
            <option selected={true} value="5">Excelente</option>
            <option value="4">Muito Bom</option>
            <option value="3">Bom</option>
            <option value="2">Ruim</option>
            <option value="1">Muito Ruim</option>
          </select>
        </div>

        <div class="">
          <button>Avaliar Produto</button>
        </div>
      </form>
    </>
  );
}

export default ProductReview;
