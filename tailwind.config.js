module.exports = {
  content: [`./*.{html,js}`],
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
    },
  },
  plugins: [],
};
