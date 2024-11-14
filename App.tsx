/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {JSX} from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Header, Transcript} from './src/components';

const App = (): React.JSX.Element => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.lighter} />
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        {Array.from({length: 10}).map(
          (_, i): JSX.Element => (
            <Transcript key={i} />
          ),
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
});
