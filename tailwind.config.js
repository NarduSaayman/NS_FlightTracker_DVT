module.exports = {
  content: [`./*.{html,js,ts}`,`./src/*.{html,js,ts}`],
  theme: {
    extend: {
      height: {
        "map-half": `55vh`,
      },
      borderRadius: {
        none: `0`,
      },
      gridTemplateColumns: {
        large: `400px 1fr`,
      },
      transitionProperty: {
        'width': `width`
      },
      colors: {
        "jawgdark": {
          "continent": `#343332`,
          "50": `#E8E9E9`,
          "100": `#D0D2D2`,
          "200": `#A1A5A5`,
          "300": `#737878`,
          "400": `#464949`,
          "500": `#191A1A`,
          "600": `#141515`,
          "700": `#0F1010`,
          "800": `#0A0A0A`,
          "900": `#050505`
        }
      },
      boxShadow: {
        'white-glow' : `0 0 10px 0px #fff`,
      }
    },
  },
  plugins: [],
};
