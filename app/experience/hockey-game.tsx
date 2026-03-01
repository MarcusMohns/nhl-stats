"use client";
import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";

const HockeyGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const resetPositionsRef = useRef<(() => void) | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!canvasRef.current) return;

    // Destructure Matter modules
    const {
      Engine,
      Render,
      Runner,
      Bodies,
      Composite,
      Events,
      Mouse,
      MouseConstraint,
      Body,
    } = Matter;

    const isDark = resolvedTheme === "dark";

    const colors = {
      background: isDark ? "#18181b" : "#e4e4e7", // zinc-900 : zinc-200
      wall: isDark ? "#52525b" : "#3f3f46", // zinc-600 : zinc-700
      puck: isDark ? "#e4e4e7" : "#18181b", // zinc-200 : zinc-900
      striker: isDark ? "#a1a1aa" : "#4c4c52", // zinc-400 : zinc-600
      goalie: "#ef4444", // red-500
    };

    // Create engine
    const engine = Engine.create();
    engine.gravity.y = 0; // Top-down view (no gravity)

    // Create renderer
    const render = Render.create({
      canvas: canvasRef.current,
      engine: engine,
      options: {
        width: 500,
        height: 500,
        wireframes: false,
        background: colors.background,
        pixelRatio: window.devicePixelRatio,
      },
    });

    const width = 500;
    const height = 500;
    const wallThickness = 60;
    const goalWidth = 140;

    // Collision Categories
    const defaultCategory = 0x0001;
    const puckCategory = 0x0002;
    const strikerCategory = 0x0004;

    // Create Walls (Rink boundaries)
    const walls = [
      // Top Left
      Bodies.rectangle(
        (width - goalWidth) / 4,
        -wallThickness / 2,
        (width - goalWidth) / 2,
        wallThickness,
        { isStatic: true, render: { fillStyle: colors.wall } },
      ),
      // Top Right
      Bodies.rectangle(
        width - (width - goalWidth) / 4,
        -wallThickness / 2,
        (width - goalWidth) / 2,
        wallThickness,
        { isStatic: true, render: { fillStyle: colors.wall } },
      ),
      // Bottom
      Bodies.rectangle(
        width / 2,
        height + wallThickness / 2,
        width,
        wallThickness,
        {
          isStatic: true,
          render: { fillStyle: colors.wall },
        },
      ),
      // Left
      Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height, {
        isStatic: true,
        render: { fillStyle: colors.wall },
      }),
      // Right
      Bodies.rectangle(
        width + wallThickness / 2,
        height / 2,
        wallThickness,
        height,
        {
          isStatic: true,
          render: { fillStyle: colors.wall },
        },
      ),
    ];

    // Goal Sensor
    const goalSensor = Bodies.rectangle(width / 2, -20, goalWidth, 50, {
      isStatic: true,
      isSensor: true, // Sensor means it triggers events but doesn't physically block
      label: "goal",
      render: {
        fillStyle: "rgba(220, 38, 38, 0.3)",
        strokeStyle: "rgba(0, 0, 0, 0.3)",
        lineWidth: 2,
      },
    });

    // Puck
    const puck = Bodies.circle(width / 2, height - 100, 15, {
      restitution: 0.9, // Bouncy
      friction: 0.005, // Low friction (ice)
      frictionAir: 0.02, // Air resistance
      density: 0.002,
      label: "puck",
      render: {
        fillStyle: colors.puck,
        strokeStyle: "#000",
        lineWidth: 2,
      },
      collisionFilter: {
        category: puckCategory,
        mask: defaultCategory | strikerCategory,
      },
    });

    // Striker (Club)
    const striker = Bodies.circle(width / 2, height / 2, 20, {
      label: "striker",
      restitution: 0.5,
      friction: 0.1,
      frictionAir: 0.05,
      density: 0.01,
      render: {
        fillStyle: colors.striker,
        strokeStyle: "#221e1e",
        lineWidth: 2,
      },
      collisionFilter: {
        category: strikerCategory,
        mask: defaultCategory | puckCategory,
      },
    });

    // Goalie
    const goalie = Bodies.rectangle(width / 2, 45, 80, 20, {
      isStatic: true, // Static so we can control it manually
      label: "goalie",
      restitution: 1.5, // Extra bouncy
      render: { fillStyle: colors.goalie },
    });

    Composite.add(engine.world, [...walls, goalSensor, puck, goalie, striker]);

    resetPositionsRef.current = () => {
      Body.setPosition(puck, { x: width / 2, y: height - 100 });
      Body.setVelocity(puck, { x: 0, y: 0 });
      Body.setAngularVelocity(puck, 0);

      Body.setPosition(striker, { x: width / 2, y: height / 2 });
      Body.setVelocity(striker, { x: 0, y: 0 });
      Body.setAngularVelocity(striker, 0);
    };

    // Mouse Control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      // Only allow interaction with the striker
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
      collisionFilter: {
        mask: strikerCategory,
      },
    });
    Composite.add(engine.world, mouseConstraint);

    // Keep mouse in sync with rendering
    render.mouse = mouse;

    // Per-frame logic
    const MAX_PUCK_SPEED = 20;
    Events.on(engine, "beforeUpdate", () => {
      // --- Goalie Movement ---
      // Use a sine wave based on the engine's timestamp for smooth back-and-forth movement
      const time = engine.timing.timestamp;
      Body.setPosition(goalie, {
        x: width / 2 + Math.sin(time * 0.002) * 120, // 120 is the range of movement
        y: 45,
      });

      // --- Puck Speed Limit ---
      const speed = Matter.Vector.magnitude(puck.velocity);
      if (speed > MAX_PUCK_SPEED) {
        Body.setVelocity(
          puck,
          Matter.Vector.mult(
            Matter.Vector.normalise(puck.velocity),
            MAX_PUCK_SPEED,
          ),
        );
      }
    });

    // Collision Event
    Events.on(engine, "collisionStart", (event) => {
      event.pairs.forEach((pair) => {
        const { bodyA, bodyB } = pair;
        if (
          (bodyA.label === "goal" && bodyB.label === "puck") ||
          (bodyB.label === "goal" && bodyA.label === "puck")
        ) {
          setScore((s) => s + 1);
          // Reset puck
          Body.setPosition(puck, { x: width / 2, y: height - 100 });
          Body.setVelocity(puck, { x: 0, y: 0 });
          Body.setAngularVelocity(puck, 0);
        }
      });
    });

    // Run
    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
      Mouse.clearSourceEvents(mouse);
    };
  }, [resolvedTheme]);

  const reset = () => {
    setScore(0);
    resetPositionsRef.current?.();
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex flex-row items-center gap-2 justify-between w-full">
        <p className="font-bold text-2xl text-zinc-800 dark:text-zinc-400 font-mono ">
          SCORE:{score}
        </p>
        <button
          type="button"
          className="p-1 px-2 gap-1 bg-red-200 hover:bg-red-300 dark:bg-red-900 dark:hover:bg-red-800 rounded cursor-pointer text-sm font-bold uppercase flex items-center justify-center transition-colors duration-200 ease-in-out "
          onClick={reset}
        >
          Reset
          <XCircleIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="relative border-4 border-zinc-700 dark:border-zinc-600 rounded-xl overflow-hidden shadow-xl bg-white dark:bg-zinc-900 max-w-full">
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          className="max-w-full h-auto"
        />
      </div>
      <p className="text-zinc-500 text-sm"></p>
    </div>
  );
};

export default HockeyGame;
