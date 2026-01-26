import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Sequence,
} from "remotion";
import { ECID_COLORS } from "../colors";

interface ModuleIntroProps {
  moduleNumber: number;
  moduleTitle: string;
  subtitle?: string;
}

export const ModuleIntro: React.FC<ModuleIntroProps> = ({
  moduleNumber,
  moduleTitle,
  subtitle,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Animation timings
  const moduleNumberOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleProgress = spring({
    frame: frame - 30,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const subtitleOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Fade out at the end
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: ECID_COLORS.background,
        opacity: fadeOut,
      }}
    >
      {/* Decorative gradient */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 50% 50%, ${ECID_COLORS.primary}15 0%, transparent 50%)`,
        }}
      />

      {/* Module number */}
      <Sequence from={0}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            opacity: moduleNumberOpacity,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "25%",
              fontSize: 120,
              fontWeight: "bold",
              color: ECID_COLORS.primary,
              fontFamily: "Arial, sans-serif",
            }}
          >
            MODULE {moduleNumber}
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Main title */}
      <Sequence from={30}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: "bold",
              color: ECID_COLORS.text,
              fontFamily: "Arial, sans-serif",
              textAlign: "center",
              maxWidth: "80%",
              transform: `translateY(${interpolate(titleProgress, [0, 1], [50, 0])}px)`,
              opacity: titleProgress,
            }}
          >
            {moduleTitle}
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Subtitle */}
      {subtitle && (
        <Sequence from={60}>
          <AbsoluteFill
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "62%",
                fontSize: 36,
                color: ECID_COLORS.secondary,
                fontFamily: "Arial, sans-serif",
                opacity: subtitleOpacity,
              }}
            >
              {subtitle}
            </div>
          </AbsoluteFill>
        </Sequence>
      )}

      {/* ECID Branding */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 40,
          fontSize: 24,
          color: ECID_COLORS.muted,
          fontFamily: "Arial, sans-serif",
        }}
      >
        ECID - Mental Performance in Esports
      </div>
    </AbsoluteFill>
  );
};
