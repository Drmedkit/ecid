import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Sequence,
} from "remotion";
import { ECID_COLORS } from "../colors";

const CYCLE_STEPS = [
  { label: "High Pressure\nSituation", color: ECID_COLORS.secondary, icon: "⚡" },
  { label: "Increased\nSelf-Focus", color: ECID_COLORS.primary, icon: "👁️" },
  { label: "Overthinking", color: ECID_COLORS.primary, icon: "🤔" },
  { label: "Disrupted\nAutomaticity", color: "#ff6b6b", icon: "⚠️" },
  { label: "Performance\nDecline", color: "#ff6b6b", icon: "📉" },
  { label: "More Anxiety", color: ECID_COLORS.secondary, icon: "😰" },
];

export const ChokingUnderPressure: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Title animation
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [0, 30], [30, 0], { extrapolateRight: "clamp" });

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
      {/* Warning gradient */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(ellipse at 50% 50%, #ff6b6b10 0%, transparent 60%)`,
        }}
      />

      {/* Title */}
      <Sequence from={0} durationInFrames={durationInFrames}>
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          <h1
            style={{
              fontSize: 56,
              fontWeight: "bold",
              color: ECID_COLORS.text,
              fontFamily: "Arial, sans-serif",
              margin: 0,
            }}
          >
            Choking Under Pressure
          </h1>
          <p
            style={{
              fontSize: 24,
              color: "#ff6b6b",
              fontFamily: "Arial, sans-serif",
              marginTop: 12,
            }}
          >
            The vicious cycle of performance anxiety
          </p>
        </div>
      </Sequence>

      {/* Cycle visualization */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ position: "relative", width: 800, height: 600, marginTop: 60 }}>
          {/* Circular arrows background */}
          <Sequence from={60}>
            <CircularArrows frame={frame - 60} fps={fps} />
          </Sequence>

          {/* Steps */}
          {CYCLE_STEPS.map((step, index) => (
            <Sequence key={index} from={90 + index * 40}>
              <CycleStep
                step={step}
                index={index}
                total={CYCLE_STEPS.length}
                frame={frame - (90 + index * 40)}
                fps={fps}
              />
            </Sequence>
          ))}

          {/* Pulsing warning in center */}
          <Sequence from={330}>
            <WarningPulse frame={frame - 330} />
          </Sequence>
        </div>
      </AbsoluteFill>

      {/* Footer message */}
      <Sequence from={360}>
        <FooterMessage frame={frame - 360} fps={fps} />
      </Sequence>
    </AbsoluteFill>
  );
};

const CycleStep: React.FC<{
  step: typeof CYCLE_STEPS[0];
  index: number;
  total: number;
  frame: number;
  fps: number;
}> = ({ step, index, total, frame, fps }) => {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  const radius = 250;
  const x = Math.cos(angle) * radius + 400;
  const y = Math.sin(angle) * radius + 300;

  const scale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x - 80,
        top: y - 50,
        width: 160,
        transform: `scale(${scale})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: "50%",
          backgroundColor: `${step.color}20`,
          border: `2px solid ${step.color}`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 28,
          marginBottom: 8,
        }}
      >
        {step.icon}
      </div>
      {/* Label */}
      <span
        style={{
          fontSize: 16,
          fontWeight: "bold",
          color: step.color,
          fontFamily: "Arial, sans-serif",
          whiteSpace: "pre-line",
          lineHeight: 1.3,
        }}
      >
        {step.label}
      </span>
    </div>
  );
};

const CircularArrows: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const rotation = interpolate(frame, [0, 300], [0, 360], { extrapolateRight: "extend" });
  const opacity = interpolate(frame, [0, 30], [0, 0.3], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        left: 400 - 200,
        top: 300 - 200,
        width: 400,
        height: 400,
        opacity,
      }}
    >
      <svg width="400" height="400" viewBox="0 0 400 400">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#ff6b6b" />
          </marker>
        </defs>
        <circle
          cx="200"
          cy="200"
          r="180"
          fill="none"
          stroke="#ff6b6b"
          strokeWidth="2"
          strokeDasharray="20 10"
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: "center",
          }}
        />
      </svg>
    </div>
  );
};

const WarningPulse: React.FC<{ frame: number }> = ({ frame }) => {
  const pulse = Math.sin(frame * 0.1) * 0.1 + 1;
  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        left: 400 - 60,
        top: 300 - 60,
        width: 120,
        height: 120,
        borderRadius: "50%",
        backgroundColor: "#ff6b6b20",
        border: "2px solid #ff6b6b",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: `scale(${pulse})`,
        opacity,
      }}
    >
      <span
        style={{
          fontSize: 14,
          fontWeight: "bold",
          color: "#ff6b6b",
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
        }}
      >
        CYCLE
        <br />
        REPEATS
      </span>
    </div>
  );
};

const FooterMessage: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 80 },
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 60,
        left: 0,
        right: 0,
        textAlign: "center",
        opacity,
      }}
    >
      <p
        style={{
          fontSize: 24,
          color: ECID_COLORS.primary,
          fontFamily: "Arial, sans-serif",
          margin: 0,
        }}
      >
        💡 Breaking this cycle requires awareness and specific techniques
      </p>
    </div>
  );
};
