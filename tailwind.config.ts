import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#ffffff", // Branco
          neutral: "#ffffff", // Branco
          "base-100": "#ffffff", // Fundo branco
        },
      },
    ],
    logs: false,
  },
  content: ["./**/*.tsx"],
  theme: {
    container: { center: true },
    extend: {
      screens: {
        totem: "2535px", // Breakpoint para a largura do totem
      },
    },
  },
};
