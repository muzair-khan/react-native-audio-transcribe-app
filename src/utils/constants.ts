import {Dimensions, Platform} from 'react-native';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

const isIos: boolean = Platform.OS === 'ios';

export {HEIGHT, isIos, WIDTH};
