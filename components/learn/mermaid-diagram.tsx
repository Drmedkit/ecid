"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

// Initialize mermaid with dark theme
mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  themeVariables: {
    primaryColor: "#0EF0EB",
    primaryTextColor: "#ffffff",
    primaryBorderColor: "#0EF0EB",
    lineColor: "#888888",
    secondaryColor: "#F6F400",
    tertiaryColor: "#1a1a1a",
    background: "#0a0a0a",
    mainBkg: "#1a1a1a",
    secondBkg: "#2a2a2a",
    nodeBorder: "#0EF0EB",
    clusterBkg: "#1a1a1a",
    clusterBorder: "#0EF0EB",
    titleColor: "#ffffff",
    edgeLabelBackground: "#1a1a1a",
  },
  flowchart: {
    htmlLabels: true,
    curve: "basis",
  },
});

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

export function MermaidDiagram({ chart, className = "" }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!containerRef.current || !chart.trim()) return;

      try {
        // Generate unique ID for this diagram
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

        // Render the diagram
        const { svg: renderedSvg } = await mermaid.render(id, chart);
        setSvg(renderedSvg);
        setError(null);
      } catch (err) {
        console.error("Mermaid rendering error:", err);
        setError("Failed to render diagram");
      }
    };

    renderDiagram();
  }, [chart]);

  if (error) {
    return (
      <div className={`p-4 bg-red-500/10 border border-red-500/30 rounded-lg ${className}`}>
        <p className="text-red-400 text-sm">{error}</p>
        <pre className="mt-2 text-xs text-gray-500 overflow-auto">{chart}</pre>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`mermaid-container p-6 bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-auto ${className}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
