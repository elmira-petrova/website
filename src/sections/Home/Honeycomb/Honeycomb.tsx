import React from "react";
import {
  Bodies,
  Composite,
  Composites,
  Engine,
  Mouse,
  MouseConstraint,
  Render,
  Runner,
} from "matter-js";
import { InView } from "react-intersection-observer";
import { useResizeObserver } from "../../../utils/hooks/useResizeObserver/useResizeObserver";
import { getRandomInt } from "../../../utils/numbers/numbers";
import { HEADER_CHAR_HOVER_COLORS } from "../Hero/Header/constants";

import css from "./Honeycomb.module.scss";

const ROWS = 5;
const MIN_CELLS_IN_ROW = 5;
const MAX_CELL_WIDTH_PX = 60;
const BOTTOM_EXTRA_SPACE_PX = 2;
const MAX_FREE_SPACE_PX = 8;
const CELL_COLORS = HEADER_CHAR_HOVER_COLORS;

export const Honeycomb = () => {
  const [containerRect, setContainerRect] = React.useState({
    width: 0,
    height: 0,
  });
  const [launched, setLaunched] = React.useState(false);

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const matterDataRef = React.useRef<{
    engine: Engine | null;
    mouseConstraint: MouseConstraint | null;
    inradius: number;
    circumradius: number;
  }>({
    engine: null,
    mouseConstraint: null,
    inradius: 0,
    circumradius: 0,
  });

  const resizeObserver = useResizeObserver({
    onResize: (rect) => {
      if (
        rect.width === containerRect.width &&
        rect.height === containerRect.height
      )
        return;

      const cellMaxWidth = Math.min(
        Math.floor(rect.width / MIN_CELLS_IN_ROW),
        MAX_CELL_WIDTH_PX,
      );
      const inradius = findMaxSize(rect.width, cellMaxWidth) / 2;
      const circumradius = inradius / (Math.sqrt(3) / 2);
      const canvasHeight = Math.ceil(
        ROWS * circumradius * 2 -
          (circumradius / 2) * (ROWS - 1) +
          BOTTOM_EXTRA_SPACE_PX,
      );

      matterDataRef.current = {
        ...matterDataRef.current,
        inradius,
        circumradius,
      };
      setContainerRect({ width: rect.width, height: canvasHeight });
    },
  });

  React.useEffect(() => {
    if (!containerRect.width || !canvasRef.current || !launched) return;

    if (!matterDataRef.current.engine) {
      matterDataRef.current.engine = Engine.create({
        enableSleeping: true,
      });
    }

    const columns = Math.floor(
      containerRect.width / (matterDataRef.current.inradius * 2),
    );
    const excessSpace =
      containerRect.width - matterDataRef.current.inradius * 2 * columns;

    const verticalStepDesired = matterDataRef.current.circumradius * 2 * 0.05;
    const verticalStepMaxSafe = containerRect.height / (columns - 1);

    const verticalStep = Math.min(verticalStepDesired, verticalStepMaxSafe);
    const rowGap = verticalStep * (columns - 1);
    const x = Math.floor(excessSpace / 2);
    const y = -containerRect.height - rowGap * ROWS;

    const stack = Composites.stack(
      x,
      y,
      columns,
      ROWS,
      0,
      rowGap,
      (currentX: number, currentY: number, column: number, row: number) => {
        const isRowOdd = row % 2;
        const isFirstItem = column === 0;
        const isLastItem = column === columns - 1;
        if (isRowOdd && isLastItem) return null;
        const x =
          isRowOdd && isFirstItem
            ? currentX + matterDataRef.current.inradius
            : currentX;
        const y = isRowOdd
          ? currentY - verticalStep * column
          : currentY - verticalStep * (columns - column - 1);

        return Bodies.polygon(x, y, 6, matterDataRef.current.circumradius, {
          restitution: 0.2,
          render: {
            fillStyle: CELL_COLORS[getRandomInt(0, CELL_COLORS.length)],
            strokeStyle: "currentColor",
            lineWidth: 4,
          },
        });
      },
    );

    const wallOptions = {
      isStatic: true,
      render: {
        visible: false,
      },
    };
    const wallThickness = 500;
    const wallHeight = containerRect.height * 5;
    const wallY = -wallHeight / 2 + containerRect.height;

    const leftWall = Bodies.rectangle(
      -wallThickness / 2,
      wallY,
      wallThickness,
      wallHeight,
      wallOptions,
    );
    const rightWall = Bodies.rectangle(
      containerRect.width + wallThickness / 2,
      wallY,
      wallThickness,
      wallHeight,
      wallOptions,
    );
    const ground = Bodies.rectangle(
      containerRect.width / 2,
      containerRect.height + wallThickness / 2 - BOTTOM_EXTRA_SPACE_PX,
      containerRect.width,
      wallThickness,
      wallOptions,
    );

    const render = Render.create({
      canvas: canvasRef.current,
      engine: matterDataRef.current.engine,
      options: {
        width: containerRect.width,
        height: containerRect.height,
        showSleeping: false,
        wireframes: false,
        background: "currentColor",
        // @ts-expect-error 'auto'
        pixelRatio: "auto",
      },
    });

    if (!matterDataRef.current.mouseConstraint) {
      matterDataRef.current.mouseConstraint = MouseConstraint.create(
        matterDataRef.current.engine,
        {
          mouse: Mouse.create(render.canvas),
          constraint: {
            stiffness: 0.2,
            render: {
              visible: false,
            },
          },
        },
      );

      matterDataRef.current.mouseConstraint.mouse.element.removeEventListener(
        "wheel",
        // @ts-expect-error mousewheel
        matterDataRef.current.mouseConstraint.mouse.mousewheel,
      );
    }

    render.mouse = matterDataRef.current.mouseConstraint.mouse;

    Composite.add(matterDataRef.current.engine.world, [
      ground,
      leftWall,
      rightWall,
      stack,
      matterDataRef.current.mouseConstraint,
    ]);

    Render.run(render);

    const runner = Runner.create();

    Runner.run(runner, matterDataRef.current.engine);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      if (matterDataRef.current.engine) {
        Engine.clear(matterDataRef.current.engine);
        Composite.clear(matterDataRef.current.engine.world, false, false);
      }
    };
  }, [containerRect.height, containerRect.width, launched]);

  return (
    <section className={css.container}>
      <div
        ref={resizeObserver.refCallback}
        className={css.poster}
        style={{ height: containerRect.height }}
      >
        <canvas ref={canvasRef} className={css.canvas} />
        <InView
          rootMargin={`0px 0px ${containerRect.height * 0.5}px`}
          triggerOnce={true}
          onChange={setLaunched}
        />
      </div>
    </section>
  );
};

const findMaxSize = (space: number, size: number) => {
  const freeSpace = space % size;
  if (freeSpace <= MAX_FREE_SPACE_PX) return size;

  return findMaxSize(space, size - 1);
};
