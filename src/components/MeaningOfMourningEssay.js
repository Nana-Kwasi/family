import React from 'react';
import HeritageLongformEssay from './HeritageLongformEssay';
import { meaningOfMourningMeta, meaningOfMourningBlocks } from '../data/meaningOfMourningStory';

export default function MeaningOfMourningEssay() {
  return (
    <HeritageLongformEssay
      id="meaning-of-mourning"
      meta={meaningOfMourningMeta}
      blocks={meaningOfMourningBlocks}
    />
  );
}
