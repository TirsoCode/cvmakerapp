import React from "react";
import { Composition } from "remotion";
import { CvMakerInstagram } from "./CvMakerInstagram";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="CvMakerInstagram"
      component={CvMakerInstagram}
      durationInFrames={450}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
