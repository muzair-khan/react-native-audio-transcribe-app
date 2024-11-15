import {StyleProp, TextStyle, ViewStyle} from 'react-native';

declare global {
  interface IColor {
    amberYellow: string;
    black: string;
    lightGray: string;
    lavenderBlue: string;
    white: string;
  }

  interface ITranscript {
    containerStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    text: string;
    onPress?: () => void;
  }

  interface IPhrase {
    words: string;
    time: number;
  }
}

export {};
