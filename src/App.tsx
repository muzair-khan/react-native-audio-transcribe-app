import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet} from 'react-native';
import {useProgress} from 'react-native-track-player';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {AudioPlayer, Header, Transcript} from './components';
import {Colors as AppColor} from './utils/colors';
import exampleData from './utils/example_audio.json';

const App: React.FC = () => {
  const progress = useProgress();
  const [sequence, setSequence] = useState<IPhrase[]>([]);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState<number>(0);

  useEffect(() => {
    const combinedSequence: IPhrase[] = [];
    const maxLength = Math.max(
      exampleData.speakers[0].phrases.length,
      exampleData.speakers[1].phrases.length,
    );

    for (let i = 0; i < maxLength; i++) {
      if (exampleData.speakers[0].phrases[i]) {
        combinedSequence.push(exampleData.speakers[0].phrases[i]);
      }
      if (exampleData.speakers[1].phrases[i]) {
        combinedSequence.push(exampleData.speakers[1].phrases[i]);
      }
    }

    setSequence(combinedSequence);
  }, []);

  useEffect(() => {
    if (sequence.length === 0) return;

    const elapsed = progress.position * 1000; // Convert to milliseconds
    let cumulativeTime = 0;

    for (let i = 0; i < sequence.length; i++) {
      const phraseDuration = sequence[i].time;
      const pauseDuration = i < sequence.length - 1 ? exampleData.pause : 0;

      cumulativeTime += phraseDuration + pauseDuration;

      if (elapsed < cumulativeTime) {
        setCurrentPhraseIndex(i);
        break;
      }
    }
  }, [progress.position, sequence]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.lighter} />
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        {sequence.map((phrase, i) => (
          <Transcript
            key={i}
            textStyle={i === currentPhraseIndex ? styles.highlightText : {}}
            containerStyle={
              i === currentPhraseIndex ? styles.highlightContainer : {}
            }
            text={phrase.words}
          />
        ))}
      </ScrollView>
      <AudioPlayer />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  highlightText: {
    color: AppColor.amberYellow,
  },
  highlightContainer: {
    backgroundColor: AppColor.lavenderBlue,
  },
});
