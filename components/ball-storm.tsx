"use client";

import { Circle } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

type Ball = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
};

const LAUNCHER_SIZE = 52;
const REST_POSITION = { x: 0, y: 0 };
const COLORS = ["#111111", "#ffffff", "#fd673d", "#33dca3", "#f6a4de"];

export function BallStorm() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const lastPointRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const [offset, setOffset] = useState(REST_POSITION);
  const [dragging, setDragging] = useState(false);
  const [burstActive, setBurstActive] = useState(false);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const startBurst = (originX: number, originY: number, seedVelocity: { x: number; y: number }) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    const balls: Ball[] = Array.from({ length: 44 }, (_, index) => ({
      x: originX,
      y: originY,
      vx:
        seedVelocity.x * 0.18 +
        (Math.random() - 0.5) * 17 +
        Math.cos(index * 0.8) * 4,
      vy:
        seedVelocity.y * 0.18 +
        (Math.random() - 0.5) * 15 -
        8 -
        Math.sin(index * 0.7) * 3,
      radius: 9 + Math.random() * 18,
      color: COLORS[index % COLORS.length],
    }));

    setBurstActive(true);

    const startTime = performance.now();
    let previousTime = startTime;

    const render = (time: number) => {
      const elapsed = time - startTime;
      const delta = Math.min(24, time - previousTime) / 16.6667;
      previousTime = time;

      context.clearRect(0, 0, width, height);

      for (const ball of balls) {
        ball.vy += 0.34 * delta;
        ball.x += ball.vx * delta;
        ball.y += ball.vy * delta;

        if (ball.x + ball.radius >= width) {
          ball.x = width - ball.radius;
          ball.vx *= -0.93;
        }
        if (ball.x - ball.radius <= 0) {
          ball.x = ball.radius;
          ball.vx *= -0.93;
        }
        if (ball.y + ball.radius >= height) {
          ball.y = height - ball.radius;
          ball.vy *= -0.9;
        }
        if (ball.y - ball.radius <= 0) {
          ball.y = ball.radius;
          ball.vy *= -0.9;
        }

        context.beginPath();
        context.fillStyle = ball.color;
        context.globalAlpha = Math.max(0.18, 1 - elapsed / 18000);
        context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1;

      if (elapsed < 15000) {
        animationFrameRef.current = window.requestAnimationFrame(render);
      }
    };

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = window.requestAnimationFrame(render);

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setBurstActive(false);
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, width, height);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }, 15000);
  };

  const resetLauncher = () => {
    setDragging(false);
    setOffset(REST_POSITION);
    lastPointRef.current = null;
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
    lastPointRef.current = {
      x: event.clientX,
      y: event.clientY,
      time: performance.now(),
    };
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!dragging) {
      return;
    }

    const rightOffset = window.innerWidth - event.clientX - LAUNCHER_SIZE / 2;
    const bottomOffset = window.innerHeight - event.clientY - LAUNCHER_SIZE / 2;

    setOffset({
      x: Math.max(-window.innerWidth + LAUNCHER_SIZE, Math.min(0, -rightOffset)),
      y: Math.max(-window.innerHeight + LAUNCHER_SIZE, Math.min(0, -bottomOffset)),
    });
    lastPointRef.current = {
      x: event.clientX,
      y: event.clientY,
      time: performance.now(),
    };
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!dragging) {
      return;
    }

    event.currentTarget.releasePointerCapture(event.pointerId);
    setDragging(false);

    const lastPoint = lastPointRef.current;
    const now = performance.now();
    const velocity = lastPoint
      ? {
          x: (event.clientX - lastPoint.x) / Math.max(1, now - lastPoint.time) * 36,
          y: (event.clientY - lastPoint.y) / Math.max(1, now - lastPoint.time) * 36,
        }
      : { x: 0, y: 0 };

    const movedFarEnough =
      Math.abs(offset.x) > 8 || Math.abs(offset.y) > 8;

    if (movedFarEnough) {
      startBurst(event.clientX, event.clientY, velocity);
    }

    resetLauncher();
  };

  return (
    <>
      <button
        type="button"
        className={`ball-launcher ${dragging ? "ball-launcher-dragging" : ""}`}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={resetLauncher}
        aria-label="Drag to trigger the ball storm"
        title="Drag and throw"
      >
        <Circle className="h-[18px] w-[18px]" strokeWidth={1.8} />
      </button>

      <canvas
        ref={canvasRef}
        className={`ball-storm-canvas ${burstActive ? "ball-storm-canvas-active" : ""}`}
        aria-hidden="true"
      />
    </>
  );
}
