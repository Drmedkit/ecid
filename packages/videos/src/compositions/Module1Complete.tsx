import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { ModuleIntro } from "./ModuleIntro";
import { PerformanceModel } from "./PerformanceModel";
import { ChokingUnderPressure } from "./ChokingUnderPressure";
import { ECID_COLORS } from "../colors";

export const Module1Complete: React.FC = () => {
  const { fps } = useVideoConfig();

  // Timing (in frames at 30fps)
  const INTRO_START = 0;
  const INTRO_DURATION = 180; // 6 seconds

  const TRANSITION_1_START = INTRO_DURATION;
  const TRANSITION_1_DURATION = 30; // 1 second

  const PERF_MODEL_START = TRANSITION_1_START + TRANSITION_1_DURATION;
  const PERF_MODEL_DURATION = 390; // 13 seconds

  const TRANSITION_2_START = PERF_MODEL_START + PERF_MODEL_DURATION;
  const TRANSITION_2_DURATION = 30; // 1 second

  const CHOKING_START = TRANSITION_2_START + TRANSITION_2_DURATION;
  const CHOKING_DURATION = 450; // 15 seconds

  const OUTRO_START = CHOKING_START + CHOKING_DURATION;
  const OUTRO_DURATION = 120; // 4 seconds

  return (
    <AbsoluteFill style={{ backgroundColor: ECID_COLORS.background }}>
      {/* 1. Module Intro */}
      <Sequence from={INTRO_START} durationInFrames={INTRO_DURATION}>
        <ModuleIntro
          moduleNumber={1}
          moduleTitle="Foundation of Performance"
          subtitle="Understanding what drives peak performance in esports"
        />
      </Sequence>

      {/* Transition 1 */}
      <Sequence from={TRANSITION_1_START} durationInFrames={TRANSITION_1_DURATION}>
        <TransitionSlide text="The Performance Model" />
      </Sequence>

      {/* 2. Performance Model */}
      <Sequence from={PERF_MODEL_START} durationInFrames={PERF_MODEL_DURATION}>
        <PerformanceModel />
      </Sequence>

      {/* Transition 2 */}
      <Sequence from={TRANSITION_2_START} durationInFrames={TRANSITION_2_DURATION}>
        <TransitionSlide text="What Can Go Wrong?" />
      </Sequence>

      {/* 3. Choking Under Pressure */}
      <Sequence from={CHOKING_START} durationInFrames={CHOKING_DURATION}>
        <ChokingUnderPressure />
      </Sequence>

      {/* 4. Outro */}
      <Sequence from={OUTRO_START} durationInFrames={OUTRO_DURATION}>
        <Outro />
      </Sequence>
    </AbsoluteFill>
  );
};

const TransitionSlide: React.FC<{ text: string }> = ({ text }) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: ECID_COLORS.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontSize: 48,
          fontWeight: "bold",
          color: ECID_COLORS.secondary,
          fontFamily: "Arial, sans-serif",
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

const Outro: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: ECID_COLORS.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: 48,
            fontWeight: "bold",
            color: ECID_COLORS.text,
            fontFamily: "Arial, sans-serif",
            marginBottom: 24,
          }}
        >
          Module 1 Complete
        </h2>
        <p
          style={{
            fontSize: 28,
            color: ECID_COLORS.primary,
            fontFamily: "Arial, sans-serif",
            marginBottom: 40,
          }}
        >
          Next: Managing Performance Pressure
        </p>
        <div
          style={{
            fontSize: 24,
            color: ECID_COLORS.muted,
            fontFamily: "Arial, sans-serif",
          }}
        >
          ECID - Mental Performance in Esports
        </div>
      </div>
    </AbsoluteFill>
  );
};
