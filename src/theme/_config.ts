import type { ThemeConfiguration } from '@/theme/types/config';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const enum Variant {
  DARK = 'dark',
}

const colorsLight = {
  gold50: '#FFFAED',
  gold200: '#FCE8B8',
  gold500: '#FFB100',
  gold600: '#EEA721',
  green500: '#1F820A',
  red500: '#D63030',
  blue900: '#1A2332',
  blue700: '#3D5166',
  white: '#FFFFFF',
  background: '#FCFCF9',
  border: '#E8E5D8',
  gray50: '#F7F8FA',
  gray100: '#EEF1F3',
  gray200: '#DDE1E4',
  gray300: '#BDC3C7',
  gray400: '#A0ADB4',
  gray500: '#7F8C8D',
  gray600: '#556B7F',
  gray700: '#3D5166',
  gray800: '#2C3E50',
  skeleton: '#DDE1E4',
} as const;

const colorsDark = {
  ...colorsLight,
} as const;

const sizes = [12, 16, 24, 32, 40, 80] as const;

export const config = {
  backgrounds: colorsLight,
  borders: {
    colors: colorsLight,
    radius: [4, 16],
    widths: [1, 2],
  },
  colors: colorsLight,
  fonts: {
    colors: colorsLight,
    sizes,
  },
  gutters: sizes,
  navigationColors: {
    ...DefaultTheme.colors,
    background: colorsLight.background,
    card: colorsLight.white,
  },
  variants: {
    dark: {
      backgrounds: colorsDark,
      borders: {
        colors: colorsDark,
      },
      colors: colorsDark,
      fonts: {
        colors: colorsDark,
      },
      navigationColors: {
        ...DarkTheme.colors,
        background: colorsDark.background,
        card: colorsDark.background,
      },
    },
  },
} as const satisfies ThemeConfiguration;
