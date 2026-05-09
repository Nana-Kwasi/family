import React from 'react';
import HeritageLongformEssay from './HeritageLongformEssay';
import { traditionalMarriageMeta, traditionalMarriageBlocks } from '../data/traditionalMarriageStory';

export default function TraditionalMarriageEssay() {
  return (
    <HeritageLongformEssay
      id="ghanaian-traditional-marriage"
      meta={traditionalMarriageMeta}
      blocks={traditionalMarriageBlocks}
    />
  );
}
