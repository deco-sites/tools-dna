function ClearFilters() {
  const resetParams = () => {
    const urlParam = globalThis.location.href.split(/[?#]/)[0];
    globalThis.location.href = urlParam;
  };
  return (
    <button class="btn btn-block mt-4" onClick={resetParams}>
      LIMPAR TODOS OS FILTROS
    </button>
  );
}

export default ClearFilters;
