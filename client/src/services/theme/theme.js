export default {
  breakpoint: {
    phone: "0rem",
    tabletPortrait: "37.5rem", // >>> 600px
    tabletLandscape: "56.25rem", // >>> 900px
    desktopM: "75rem", // >>> 1200px
    desktopL: "93.75rem", // >>> 1500px
    desktopXL: "112.5rem", // >>> 1800px
    desktopXXL: "125*16rem" // >>> 2000px
  },
  font: {
    sansSerif: "Montserrat, sans-serif",
    serif: "PT Serif, serif",
    scale: {
      small: "0.875em", // >>> 14px
      base: "1em", // >>> 16px
      body: "1.1875em", // >>> 19px
      display4: "1.1875em", // >>> 24px
      display3: "1.5em", // >>> 24px
      display2: "2em", // >>> 32px
      display1: "3em" // >>> 48px
    },
    lineHeight: 1.5,
    letterSpacing: "0.04em"
  },
  color: {
    primary: {
      light: "#64B5F6",
      main: "#1E88E5",
      dark: "#0D47A1"
    },
    seconday: {
      main: "",
      light: "",
      dark: ""
    },
    tertiary: {
      main: "",
      light: "",
      dark: ""
    },
    light: "#FAFAFA",
    lightFixed: "#FAFAFA",
    dark: "#212121",
    white: "#FFFFFF",
    black: "#000000",
    grey: {
      light: "#F5F5F5",
      medium: "#9E9E9E",
      dark: "#424242"
    }
  },
  size: {
    xxs: "0.125rem", // >>> 2
    xs: "0.25rem", // >>> 4
    s: "0.5rem", // >>> 8
    m: "1rem", // >>> 16
    l: "2rem", // >>> 32
    xl: "4rem", // >>> 64
    base: "1.5rem" // >>> 24px/3em for desktop, 16px/1em for mobile,
  },
  sizeMobile: {
    xs: "0.17rem", //
    s: "0.33rem", //
    m: "0.67rem", //
    l: "1.33rem", //
    xl: "2.67rem", //
    base: "1rem" //
  },
  increment: increment => `calc(${increment} * var(--size-base))`,
  incrementFixed: increment => `calc(${increment} * var(--size-base-fixed))`,
  shadow: [
    "0 0.0625em 0.1875em rgba(0,0,0,0.12), 0 0.0625em 0.125em rgba(0,0,0,0.16)",
    "0 0.1875em 0.375em rgba(0,0,0,0.16), 0 0.1875em 0.375em rgba(0,0,0,0.16)",
    "0 0.625em 1.25em rgba(0,0,0,0.19), 0 0.375em 0.375em rgba(0,0,0,0.16)",
    "0 0.875em 1.75em rgba(0,0,0,0.25), 0 0.625em 0.625em rgba(0,0,0,0.16)",
    "0 1.1875em 2.375em rgba(0,0,0,0.30), 0 0.9375em 0.75em rgba(0,0,0,0.16)"
  ]
};
