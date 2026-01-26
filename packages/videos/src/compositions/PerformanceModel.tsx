import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Sequence,
} from "remotion";
import { ECID_COLORS } from "../colors";

interface PerformanceModelProps {
  showTitle?: boolean;
}

const PILLARS = [
  { name: "Mental", color: ECID_COLORS.primary, icon: "🧠", description: "Focus, confidence, emotional control" },
  { name: "Physical", color: ECID_COLORS.secondary, icon: "💪", description: "Reaction time, endurance, health" },
  { name: "Tactical", color: ECID_COLORS.primary, icon: "🎯", description: "Strategy, game sense, adaptation" },
  { name: "Technical", color: ECID_COLORS.secondary, icon: "🎮", description: "Mechanics, precision, execution" },
];

export const PerformanceModel: React.FC<PerformanceModelProps> = ({ showTitle = true }) => {
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
      {/* Background gradient */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(ellipse at 50% 100%, ${ECID_COLORS.primary}10 0%, transparent 50%)`,
        }}
      />

      {/* Title */}
      {showTitle && (
        <Sequence from={0} durationInFrames={durationInFrames}>
          <div
            style={{
              position: "absolute",
              top: 80,
              left: 0,
              right: 0,
              textAlign: "center",
              opacity: titleOpacity,
              transform: `translateY(${titleY}px)`,
            }}
          >
            <h1
              style={{
                fontSize: 64,
                fontWeight: "bold",
                color: ECID_COLORS.text,
                fontFamily: "Arial, sans-serif",
                margin: 0,
              }}
            >
              The Performance Model
            </h1>
            <p
              style={{
                fontSize: 28,
                color: ECID_COLORS.muted,
                fontFamily: "Arial, sans-serif",
                marginTop: 16,
              }}
            >
              Four pillars of peak esports performance
            </p>
          </div>
        </Sequence>
      )}

      {/* Center circle - Peak Performance */}
      <Sequence from={60}>
        <CenterCircle frame={frame - 60} fps={fps} />
      </Sequence>

      {/* Four pillars */}
      {PILLARS.map((pillar, index) => (
        <Sequence key={pillar.name} from={90 + index * 30}>
          <Pillar
            pillar={pillar}
            index={index}
            frame={frame - (90 + index * 30)}
            fps={fps}
          />
        </Sequence>
      ))}

      {/* Connecting lines */}
      <Sequence from={210}>
        <ConnectingLines frame={frame - 210} fps={fps} />
      </Sequence>
    </AbsoluteFill>
  );
};

const CenterCircle: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const scale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const glowOpacity = interpolate(frame, [0, 60], [0, 0.5], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      {/* Glow effect */}
      <div
        style={{
          position: "absolute",
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${ECID_COLORS.primary}40 0%, transparent 70%)`,
          opacity: glowOpacity,
          transform: `scale(${scale * 1.5})`,
        }}
      />
      {/* Main circle */}
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${ECID_COLORS.primary}30, ${ECID_COLORS.secondary}30)`,
          border: `3px solid ${ECID_COLORS.primary}`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${scale})`,
        }}
      >
        <span style={{ fontSize: 20, color: ECID_COLORS.muted, fontFamily: "Arial, sans-serif" }}>
          PEAK
        </span>
        <span
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: ECID_COLORS.text,
            fontFamily: "Arial, sans-serif",
          }}
        >
          PERFORMANCE
        </span>
      </div>
    </AbsoluteFill>
  );
};

const Pillar: React.FC<{
  pillar: typeof PILLARS[0];
  index: number;
  frame: number;
  fps: number;
}> = ({ pillar, index, frame, fps }) => {
  const positions = [
    { x: -300, y: -200 }, // Top-left (Mental)
    { x: 300, y: -200 },  // Top-right (Physical)
    { x: -300, y: 200 },  // Bottom-left (Tactical)
    { x: 300, y: 200 },   // Bottom-right (Technical)
  ];

  const pos = positions[index];

  const scale = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const descriptionOpacity = interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          position: "absolute",
          transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 250,
        }}
      >
        {/* Icon circle */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            backgroundColor: `${pillar.color}20`,
            border: `3px solid ${pillar.color}`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 48,
            marginBottom: 16,
          }}
        >
          {pillar.icon}
        </div>
        {/* Name */}
        <span
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: pillar.color,
            fontFamily: "Arial, sans-serif",
          }}
        >
          {pillar.name}
        </span>
        {/* Description */}
        <span
          style={{
            fontSize: 18,
            color: ECID_COLORS.muted,
            fontFamily: "Arial, sans-serif",
            textAlign: "center",
            marginTop: 8,
            opacity: descriptionOpacity,
          }}
        >
          {pillar.description}
        </span>
      </div>
    </AbsoluteFill>
  );
};

const ConnectingLines: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const progress = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 50 },
  });

  // SVG lines connecting pillars to center
  const lines = [
    { x1: 960 - 200, y1: 540 - 120, x2: 960 - 70, y2: 540 - 50 },  // Mental to center
    { x1: 960 + 200, y1: 540 - 120, x2: 960 + 70, y2: 540 - 50 },  // Physical to center
    { x1: 960 - 200, y1: 540 + 120, x2: 960 - 70, y2: 540 + 50 },  // Tactical to center
    { x1: 960 + 200, y1: 540 + 120, x2: 960 + 70, y2: 540 + 50 },  // Technical to center
  ];

  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1920,
        height: 1080,
        pointerEvents: "none",
      }}
    >
      {lines.map((line, i) => {
        const length = Math.sqrt(
          Math.pow(line.x2 - line.x1, 2) + Math.pow(line.y2 - line.y1, 2)
        );
        const dashOffset = length * (1 - progress);

        return (
          <line
            key={i}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={i % 2 === 0 ? ECID_COLORS.primary : ECID_COLORS.secondary}
            strokeWidth={3}
            strokeDasharray={length}
            strokeDashoffset={dashOffset}
            opacity={0.6}
          />
        );
      })}
    </svg>
  );
};
