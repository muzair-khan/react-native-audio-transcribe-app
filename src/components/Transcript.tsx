import React, {JSX} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from './../utils/colors';
import {HEIGHT, WIDTH} from './../utils/constants';

const Transcript = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={[styles.text, styles.bgAlign]}>EN</Text>
        <Text style={[styles.text, styles.grow10]}>
          Are you ready to practice?
        </Text>
      </View>
    </View>
  );
};

export default React.memo(Transcript);

const styles = StyleSheet.create({
  container: {
    marginTop: HEIGHT / 35,
    marginHorizontal: WIDTH / 15,
    paddingHorizontal: 5,
    justifyContent: 'space-between',
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
  },
  textContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    gap: 15,
  },
  text: {
    flexGrow: 1,
    width: 35,
    fontFamily: 'Outfit-SemiBold',
    fontSize: 15,
    borderRadius: 20,
    padding: 2,
  },
  bgAlign: {
    textAlign: 'center',
    backgroundColor: Colors.White,
  },
  grow10: {
    flexGrow: 10,
  },
});
