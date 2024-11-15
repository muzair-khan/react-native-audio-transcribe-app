import React, {JSX} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from './../utils/colors';
import {HEIGHT, WIDTH} from './../utils/constants';

const Transcript = ({
  containerStyle,
  textStyle,
  onPress,
}: ITranscript): JSX.Element => {
  return (
    <TouchableOpacity
      style={[styles.container, styles.border, containerStyle]}
      onPress={onPress}>
      <View style={styles.textContainer}>
        <Text
          style={[styles.text, styles.bgAlign, styles.border, styles.padding]}>
          EN
        </Text>
        <Text style={[styles.text, styles.grow10, textStyle]}>
          Are you ready to practice?
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(Transcript);

const styles = StyleSheet.create({
  container: {
    marginTop: HEIGHT / 35,
    marginHorizontal: WIDTH / 15,
    paddingVertical: 10,
    paddingHorizontal: 5,
    justifyContent: 'space-between',
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
  },
  textContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  text: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 15,
    borderRadius: 10,
  },
  bgAlign: {
    textAlign: 'center',
    backgroundColor: Colors.white,
  },
  padding: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  grow10: {
    flexGrow: 10,
  },
  border: {
    borderWidth: 1,
    borderColor: '#E7E7E7',
  },
});
