import { TextStyle } from 'react-native';

export enum AppFonts {
  Poppins = 'Poppins',
}
const fonts: Record<
  AppFonts,
  {
    fontWeights: Record<NonNullable<TextStyle['fontWeight']>, string>;
    fontStyles: {
      normal: string;
      italic: string;
    };
  }
> = {
  Poppins: {
    fontWeights: {
      100: 'Thin',
      200: 'ExtraLight',
      300: 'Light',
      400: 'Regular',
      500: 'Medium',
      600: 'SemiBold',
      700: 'Bold',
      800: 'ExtraBold',
      900: 'Black',
      normal: 'Regular',
      bold: 'Bold',
    },
    fontStyles: {
      normal: '',
      italic: 'Italic',
    },
  },
};

const getFontFamily = (
  baseFontFamily: AppFonts = AppFonts.Poppins,
  styles: TextStyle = {},
) => {
  const { fontWeight, fontStyle } = styles;
  const font = fonts[baseFontFamily];

  if (!font) {
    throw new Error(`Font '${baseFontFamily}' is not supported.`);
  }

  const weight = fontWeight
    ? font.fontWeights[fontWeight]
    : font.fontWeights.normal;

  if (typeof weight === 'undefined') {
    throw new Error(
      `Font '${baseFontFamily}' is not configured for a font weight of '${fontWeight}'.`,
    );
  }

  const style = fontStyle ? font.fontStyles[fontStyle] : font.fontStyles.normal;

  if (typeof style === 'undefined') {
    throw new Error(
      `Font '${baseFontFamily}' is not configured for a font style of '${fontStyle}'.`,
    );
  }

  if (style === font.fontStyles.italic && weight === font.fontWeights.normal) {
    return `${baseFontFamily}-${style}`;
  }

  return `${baseFontFamily}-${weight}${style}`;
};

export default getFontFamily;
