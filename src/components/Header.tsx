import React, {JSX} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import icons from './../../assets/icons';
import {HEIGHT, WIDTH} from './../../src/utils/constants';

const Header = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.flagContainer}>
        <Image source={icons.usIcon} alt="US" style={styles.image} />
        <Image source={icons.spainIcon} alt="Spain" style={styles.image} />
      </View>
    </View>
  );
};

export default React.memo(Header);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: HEIGHT / 90,
    paddingBottom: HEIGHT / 35,
    borderBottomWidth: 1,
    borderColor: '#cdcdcd',
  },
  flagContainer: {
    width: WIDTH / 4,
    borderWidth: 1,
    borderColor: '#E1E4FF',
    borderRadius: WIDTH / 10,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: WIDTH / 13,
    height: HEIGHT / 30,
  },
});
