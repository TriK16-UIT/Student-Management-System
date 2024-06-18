import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material";

//color design tokens
export const tokens = (mode) => ({
    ...(mode === "dark"
      ? {
    grey: {
        100: "#e0e0e0",
        200: "#c2c2c2",
        300: "#a3a3a3",
        400: "#858585",
        500: "#666666",
        600: "#525252",
        700: "#3d3d3d",
        800: "#292929",
        900: "#141414"
    },
    primary: {
        100: "#cdcfd5",
        200: "#9c9faa",
        300: "#6a6f80",
        400: "#393f55",
        500: "#070f2b",
        600: "#060c22",
        700: "#04091a",
        800: "#030611",
        900: "#010309"
    },
    purpleAccent: {
        100: "#e9e9f3",
        200: "#d3d3e7",
        300: "#bebcdb",
        400: "#a8a6cf",
        500: "#9290c3",
        600: "#75739c",
        700: "#585675",
        800: "#3a3a4e",
        900: "#1d1d27"
    },
    redAccent: {
        100: "#fee3e3",
        200: "#fcc6c6",
        300: "#fbaaaa",
        400: "#f98d8d",
        500: "#f87171",
        600: "#c65a5a",
        700: "#954444",
        800: "#632d2d",
        900: "#321717"
    },
    blueAccent: {
        100: "#d1d1dd",
        200: "#a4a3bb",
        300: "#767699",
        400: "#494877",
        500: "#1b1a55",
        600: "#161544",
        700: "#101033",
        800: "#0b0a22",
        900: "#050511"
    }, 
    } 
    : {
        grey: {
            100: "#141414",
            200: "#292929",
            300: "#3d3d3d",
            400: "#525252",
            500: "#666666",
            600: "#858585",
            700: "#a3a3a3",
            800: "#c2c2c2",
            900: "#e0e0e0"
        },
        primary: {
            100: "#010309",
            200: "#030611",
            300: "#04091a",
            400: "#f2f0f0",
            500: "#070f2b",
            600: "#393f55",
            700: "#6a6f80",
            800: "#9c9faa",
            900: "#cdcfd5"
        },
        purpleAccent: {
            100: "#1d1d27",
            200: "#3a3a4e",
            300: "#585675",
            400: "#75739c",
            500: "#9290c3",
            600: "#a8a6cf",
            700: "#bebcdb",
            800: "#d3d3e7",
            900: "#e9e9f3"
        },
        redAccent: {
            100: "#321717",
            200: "#632d2d",
            300: "#954444",
            400: "#c65a5a",
            500: "#f87171",
            600: "#f98d8d",
            700: "#fbaaaa",
            800: "#fcc6c6",
            900: "#fee3e3"
        },
        blueAccent: {
            100: "#050511",
            200: "#0b0a22",
            300: "#101033",
            400: "#161544",
            500: "#1b1a55",
            600: "#494877",
            700: "#767699",
            800: "#a4a3bb",
            900: "#d1d1dd"
        }, 
        } ),
});

// mui theme settings
export const themeSettings = (mode) => {
    const colors = tokens(mode);
    return {
      palette: {
        mode: mode,
        ...(mode === "dark"
          ? {
              // palette values for dark mode
              primary: {
                main: colors.primary[500],
              },
              secondary: {
                main: colors.purpleAccent[500],
              },
              neutral: {
                dark: colors.grey[700],
                main: colors.grey[500],
                light: colors.grey[100],
              },
              background: {
                default: colors.primary[500],
              },
            }
          : {
              // palette values for light mode
              primary: {
                main: colors.primary[100],
              },
              secondary: {
                main: colors.purpleAccent[500],
              },
              neutral: {
                dark: colors.grey[700],
                main: colors.grey[500],
                light: colors.grey[100],
              },
              background: {
                default: "#fcfcfc",
              },
            }),
      },
      typography: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 12,
        h1: {
          fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
          fontSize: 40,
        },
        h2: {
          fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
          fontSize: 32,
        },
        h3: {
          fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
          fontSize: 24,
        },
        h4: {
          fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
          fontSize: 20,
        },
        h5: {
          fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
          fontSize: 16,
        },
        h6: {
          fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
          fontSize: 14,
        },
      },
    };
  };
  
  // context for color mode
  export const ColorModeContext = createContext({
    toggleColorMode: () => {},
  });
  
  export const useMode = () => {
    const [mode, setMode] = useState("dark");
  
    const colorMode = useMemo(
      () => ({
        toggleColorMode: () =>
          setMode((prev) => (prev === "light" ? "dark" : "light")),
      }),
      []
    );
  
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    return [theme, colorMode];
  };
