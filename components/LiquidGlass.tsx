"use client";

import type React from "react";
import { useEffect, useRef, useState, useCallback } from "react";

interface LiquidGlassProps {
  borderRadius?: number;
  className?: string;
  children?: React.ReactNode;
  allowOverflow?: boolean;
}

interface MousePosition {
  x: number;
  y: number;
}

export default function LiquidGlass({
  borderRadius = 20,
  className = "",
  children,
  allowOverflow = false,
}: LiquidGlassProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const feImageRef = useRef<SVGFEImageElement>(null);
  const feDisplacementMapRef = useRef<SVGFEDisplacementMapElement>(null);

  const [mouse, setMouse] = useState<MousePosition>({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [uniqueId] = useState(
    () => `liquid-glass-${Math.random().toString(36).substring(2, 11)}`
  );

  const canvasDPI = 1;
  let mouseUsed = false;

  
  const smoothStep = useCallback((a: number, b: number, t: number): number => {
    t = Math.max(0, Math.min(1, (t - a) / (b - a)));
    return t * t * (3 - 2 * t);
  }, []);

  const length = useCallback((x: number, y: number): number => {
    return Math.sqrt(x * x + y * y);
  }, []);

  const roundedRectSDF = useCallback(
    (
      x: number,
      y: number,
      width: number,
      height: number,
      radius: number
    ): number => {
      const qx = Math.abs(x) - width + radius;
      const qy = Math.abs(y) - height + radius;
      return (
        Math.min(Math.max(qx, qy), 0) +
        length(Math.max(qx, 0), Math.max(qy, 0)) -
        radius
      );
    },
    [length]
  );

  const texture = useCallback((x: number, y: number) => {
    return { type: "t", x, y };
  }, []);

  const updateShader = useCallback(() => {
    const canvas = canvasRef.current;
    const feImage = feImageRef.current;
    const feDisplacementMap = feDisplacementMapRef.current;

    if (
      !canvas ||
      !feImage ||
      !feDisplacementMap ||
      dimensions.width === 0 ||
      dimensions.height === 0
    )
      return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const mouseProxy = new Proxy(mouse, {
      get: (target, prop) => {
        mouseUsed = true;
        return target[prop as keyof MousePosition];
      },
    });

    mouseUsed = false;
    const w = Math.floor(dimensions.width * canvasDPI);
    const h = Math.floor(dimensions.height * canvasDPI);
    const data = new Uint8ClampedArray(w * h * 4);
    let maxScale = 0;
    const rawValues: number[] = [];

    const fragment = (uv: { x: number; y: number }, mouse: MousePosition) => {
      const ix = uv.x - 0.5;
      const iy = uv.y - 0.5;
      const distanceToEdge = roundedRectSDF(ix, iy, 0.3, 0.2, 0.6);
      const displacement = smoothStep(0.8, 0, distanceToEdge - 0.15);
      const scaled = smoothStep(0, 1, displacement);
      return texture(ix * scaled + 0.5, iy * scaled + 0.5);
    };

    for (let i = 0; i < data.length; i += 4) {
      const x = (i / 4) % w;
      const y = Math.floor(i / 4 / w);
      const pos = fragment({ x: x / w, y: y / h }, mouseProxy);
      const dx = pos.x * w - x;
      const dy = pos.y * h - y;
      maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy));
      rawValues.push(dx, dy);
    }

    maxScale *= 0.5;
    let index = 0;

    for (let i = 0; i < data.length; i += 4) {
      const r = rawValues[index++] / maxScale + 0.5;
      const g = rawValues[index++] / maxScale + 0.5;
      data[i] = r * 255;
      data[i + 1] = g * 255;
      data[i + 2] = 0;
      data[i + 3] = 255;
    }

    context.putImageData(new ImageData(data, w, h), 0, 0);
    feImage.setAttributeNS(
      "http://www.w3.org/1999/xlink",
      "href",
      canvas.toDataURL()
    );
    feDisplacementMap.setAttribute("scale", (maxScale / canvasDPI).toString());
  }, [mouse, dimensions, canvasDPI, smoothStep, roundedRectSDF, texture]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const roundedWidth = Math.max(1, Math.round(entry.contentRect.width));
        const roundedHeight = Math.max(1, Math.round(entry.contentRect.height));
        setDimensions({ width: roundedWidth, height: roundedHeight });
      }
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) return;

    canvas.width = dimensions.width * canvasDPI;
    canvas.height = dimensions.height * canvasDPI;
    updateShader();
  }, [dimensions, canvasDPI, updateShader]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const newMouse = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
    setMouse(newMouse);
  }, []);


  useEffect(() => {
    if (mouseUsed) {
      updateShader();
    }
  }, [mouse, updateShader]);

  return (
    <>
      {/* SVG Filter */}
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        width="0"
        height="0"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9998,
        }}
      >
        <defs>
          <filter
            id={`${uniqueId}_filter`}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
            x="0"
            y="0"
            width={dimensions.width}
            height={dimensions.height}
          >
            <feImage
              ref={feImageRef}
              id={`${uniqueId}_map`}
              width={dimensions.width}
              height={dimensions.height}
            />
            <feDisplacementMap
              ref={feDisplacementMapRef}
              in="SourceGraphic"
              in2={`${uniqueId}_map`}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <canvas ref={canvasRef} style={{ display: "none" }} />

      <div
        ref={containerRef}
        className={className}
        onMouseMove={handleMouseMove}
        style={{
          overflow: allowOverflow ? "visible" : "hidden",
          borderRadius: `${borderRadius}px`,
          backdropFilter: `url(#${uniqueId}_filter) blur(0.25px) brightness(1.5) saturate(1.1)`,
          position: "relative",
        }}
      >
        {children}
      </div>
    </>
  );
}
