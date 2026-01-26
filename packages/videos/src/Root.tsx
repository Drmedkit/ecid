import { Composition } from "remotion";
import { ModuleIntro } from "./compositions/ModuleIntro";
import { PerformanceModel } from "./compositions/PerformanceModel";
import { ChokingUnderPressure } from "./compositions/ChokingUnderPressure";
import { Module1Complete } from "./compositions/Module1Complete";
export { ECID_COLORS } from "./colors";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Individual compositions for preview/testing */}
      <Composition
        id="ModuleIntro"
        component={ModuleIntro}
        durationInFrames={180}  // 6 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          moduleNumber: 1,
          moduleTitle: "Foundation of Performance",
          subtitle: "Understanding the Performance Model",
        }}
      />

      <Composition
        id="PerformanceModel"
        component={PerformanceModel}
        durationInFrames={390}  // 13 seconds
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          showTitle: true,
        }}
      />

      <Composition
        id="ChokingUnderPressure"
        component={ChokingUnderPressure}
        durationInFrames={450}  // 15 seconds
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />

      {/* Full Module 1 Video */}
      <Composition
        id="Module1Complete"
        component={Module1Complete}
        durationInFrames={1200}  // 40 seconds total
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
