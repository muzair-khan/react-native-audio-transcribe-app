import Slider from '@react-native-community/slider';
import React, {JSX, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import TrackPlayer, {
  Event,
  PlaybackState,
  Progress,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import icons from './../../assets/icons';
import {Colors} from './../utils/colors';
import {HEIGHT} from './../utils/constants';
import exampleData from './../utils/example_audio.json';

const setupPlayer = async (): Promise<void> => {
  await TrackPlayer.setupPlayer({});

  const track = {
    url: require('./../../assets/audio/example_audio.mp3'), // Load media from the file system
    title: 'Example Audio',
    artist: 'React Native',
    artwork: '',
    duration: 411,
  };

  await TrackPlayer.add([track]);
};

const togglePlayback = async (playbackState): Promise<void> => {
  if (
    playbackState.state === State.Paused ||
    playbackState.state === State.Stopped
  ) {
    await TrackPlayer.play();
  } else {
    await TrackPlayer.pause();
  }
};

const AudioPlayer = (): JSX.Element => {
  const playbackState:
    | PlaybackState
    | {
        state: undefined;
      } = usePlaybackState();
  const progress: Progress = useProgress();

  useTrackPlayerEvents(
    [Event.PlaybackActiveTrackChanged, Event.PlaybackQueueEnded],
    async event => {
      // if (
      //   event.type === Event.PlaybackActiveTrackChanged &&
      //   event.track !== null
      // ) {
      //   const {title, artwork, artist} = await TrackPlayer.getTrack(
      //     event.index as number,
      //   );
      // } else if (event.type === Event.PlaybackQueueEnded) {
      //   console.log('Track completed. Stopping playback...');
      //   await TrackPlayer.stop(); // Stop playback when the track ends
      // }

      if (event.type === Event.PlaybackQueueEnded) {
        console.log('Track completed. Stopping playback...');
        await TrackPlayer.stop(); // Stop playback when the track ends
      }
    },
  );

  const [sequence, setSequence] = useState([]);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    setupPlayer();

    // Combine phrases into a single sequence
    const combinedSequence = [];
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
    // Update the current phrase index based on the playback position
    if (!sequence.length) return;

    let elapsed = progress.position * 1000; // Convert to milliseconds
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

  const handleRewind = async () => {
    if (sequence.length > 0 && currentPhraseIndex >= 0) {
      const elapsedTime =
        sequence
          .slice(0, currentPhraseIndex)
          .reduce((acc, phrase) => acc + phrase.time + exampleData.pause, 0) /
        1000; // Convert to seconds

      await TrackPlayer.seekTo(elapsedTime);
    }
  };

  const handleForward = async () => {
    if (sequence.length > 0 && currentPhraseIndex < sequence.length - 1) {
      const elapsedTime =
        sequence
          .slice(0, currentPhraseIndex + 1)
          .reduce((acc, phrase) => acc + phrase.time + exampleData.pause, 0) /
        1000; // Convert to seconds

      await TrackPlayer.seekTo(elapsedTime);
    }
  };

  // Show play button in Stopped state
  const isPlayButtonVisible =
    playbackState.state === State.Paused ||
    playbackState.state === State.Ready ||
    playbackState.state === State.Stopped;

  return (
    <View style={styles.container}>
      <Slider
        value={progress.position}
        minimumValue={0}
        maximumValue={progress.duration}
        minimumTrackTintColor={Colors.amberYellow}
        maximumTrackTintColor={Colors.lavenderBlue}
        onSlidingComplete={async (value: number): Promise<void> => {
          await TrackPlayer.seekTo(value);
        }}
      />
      <View style={styles.durationContainer}>
        <Text style={styles.startTime}>
          {new Date(progress.position * 1000).toISOString().substr(14, 5)}
        </Text>
        <Text style={styles.endTime}>
          {new Date((progress.duration - progress.position) * 1000)
            .toISOString()
            .substr(14, 5)}
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRewind}>
          <Image source={icons.rewindIcon} style={styles.rewindIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.bgLavender]}
          onPress={() => togglePlayback(playbackState)}>
          {isPlayButtonVisible ? (
            <Image source={icons.playIcon} style={styles.playPauseIcon} />
          ) : (
            <Image source={icons.pauseIcon} style={styles.playPauseIcon} />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleForward}>
          <Image
            source={icons.fastForwardIcon}
            style={styles.fastForwardIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(AudioPlayer);

const styles = StyleSheet.create({
  container: {
    height: HEIGHT / 7,
  },
  durationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  startTime: {
    color: Colors.black,
    fontSize: 12,
    fontFamily: 'Outfit-Medium',
  },
  endTime: {
    color: Colors.black,
    fontSize: 12,
    fontFamily: 'Outfit-Medium',
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  bgLavender: {
    backgroundColor: Colors.lavenderBlue,
  },
  rewindIcon: {
    width: 20,
    height: 20,
  },
  playPauseIcon: {
    width: 20,
    height: 20,
  },
  fastForwardIcon: {
    width: 20,
    height: 20,
  },
});
