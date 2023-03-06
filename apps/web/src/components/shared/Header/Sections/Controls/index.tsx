'use client';

import BackwardIcon from '@/components/Shared/Icons/Backward';
import ForwardIcon from '@/components/Shared/Icons/Forward';
import PauseIcon from '@/components/Shared/Icons/Pause';
import PlayIcon from '@/components/Shared/Icons/Play';
import RepeatIcon from '@/components/Shared/Icons/Repeat';
import RepeatOnceIcon from '@/components/Shared/Icons/RepeatOnce';
import ShuffleIcon from '@/components/Shared/Icons/Shuffle';
import PlayerContext from '@/hooks/player-context';
import { useContext, useState } from 'react';
import HeaderButton from '../../Button';
import styles from './index.module.css';

export default function Controls() {
  const context = useContext(PlayerContext);
  const hasNoTrack = false; //context.track === undefined;

  return (
    <div className={styles.container}>
      <HeaderButton
        style={{
          color: context.shuffle ? '#e63e44' : undefined,
          fill: context.shuffle ? '#e63e44' : undefined,
        }}
        disabled={hasNoTrack}
        onClick={() => toggleShuffle()}
      >
        <ShuffleIcon style={{ maxWidth: '.9rem' }} />
      </HeaderButton>
      <HeaderButton disabled={hasNoTrack}>
        <BackwardIcon style={{ maxWidth: '1.5rem' }} />
      </HeaderButton>
      <HeaderButton disabled={hasNoTrack} onClick={() => togglePlaying()}>
        {context.playing ? (
          <PauseIcon style={{ maxHeight: '1.25rem' }} />
        ) : (
          <PlayIcon style={{ maxHeight: '1.25rem' }} />
        )}
      </HeaderButton>
      <HeaderButton disabled={hasNoTrack}>
        <ForwardIcon style={{ maxWidth: '1.5rem' }} />
      </HeaderButton>
      <HeaderButton
        disabled={hasNoTrack}
        style={{ color: context.replay ? '#e63e44' : undefined }}
        onClick={() => toggleReplay()}
      >
        {context.replay === 1 ? (
          <RepeatOnceIcon style={{ maxWidth: '.9rem', fill: '#e63e44' }} />
        ) : (
          <RepeatIcon
            style={{
              fill: context.replay === true ? '#e63e44' : undefined,
              maxWidth: '.9rem',
            }}
          />
        )}
      </HeaderButton>
    </div>
  );

  function togglePlaying() {
    context.setPlaying(!context.playing);
  }

  function toggleShuffle() {
    context.setShuffle(!context.shuffle);
  }

  function toggleReplay() {
    let newValue: boolean | 1;
    switch (context.replay) {
      case false:
        newValue = true;
        break;
      case true:
        newValue = 1;
        break;
      case 1:
        newValue = false;
        break;
    }
    context.setReplay(newValue);
  }
}
