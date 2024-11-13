import React, {JSX} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Transcript = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text>Transcript</Text>
    </View>
  );
};

export default React.memo(Transcript);

const styles = StyleSheet.create({
  container: {},
  text: {},
});
