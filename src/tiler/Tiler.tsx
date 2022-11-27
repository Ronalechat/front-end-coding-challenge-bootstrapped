import React, { useEffect, BaseSyntheticEvent, SyntheticEvent } from "react";
import { getTilePath } from "./getTile";
import Button from "../button/Button";

const MAX_ZOOM = 3;

const VIEWPORT_SIZE = 500;

const Tiler: React.FC = () => {
  const [zoom, setZoom] = React.useState(1);
  // Added this state for smooth zoom
  const [toggle, setToggle] = React.useState<"zoom-in" | "zoom-out" | null>(
    null
  );
  const [isPanning, setPanning] = React.useState(false);
  const [origin, setOrigin] = React.useState([0, 0]);

  // Was hoping to just pass in toggle as a param.
  const getScaleFactor = (zoom: "zoom-in" | "zoom-out") => {
    return zoom === "zoom-in" ? 2 : 0.5;
  };

  // Zoom in/out internal functions.
  const zoomInInternal = () => {
    setToggle("zoom-in");
    setTimeout(() => {
      setZoom((zoom) => zoom + 1);
      const scaleModifier =
        (zoom === 0 ? VIEWPORT_SIZE / 4 : VIEWPORT_SIZE / 2) *
        (1 - getScaleFactor("zoom-in"));
      setOrigin([origin[0] + scaleModifier, origin[1] + scaleModifier]);
      setToggle(null);
    }, 500);
  };

  const zoomOutInternal = () => {
    setToggle("zoom-out");
    setTimeout(() => {
      setZoom((zoom) => zoom - 1);
      setToggle(null);
      const scaleModifier =
        (zoom === 1 ? VIEWPORT_SIZE / 2 : VIEWPORT_SIZE) *
        (1 - getScaleFactor("zoom-out"));
      setOrigin([origin[0] + scaleModifier, origin[1] + scaleModifier]);
    }, 500);
  };

  // Zoom in/out validation + guts of zoom animations and positioning.
  const zoomIn = () => (zoom !== MAX_ZOOM && !toggle ? zoomInInternal() : null);
  const zoomOut = () => (zoom !== 0 && !toggle ? zoomOutInternal() : null);

  // Extracted zoom in and out into their own functions for buttons and keypresses.
  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    const isZoomingIn = event.deltaY > -1;
    if (isZoomingIn) {
      zoomIn();
    }
    if (!isZoomingIn) {
      zoomOut();
    }
  };

  // Function to handle "+" and "-" key presses (and their non-shift counterparts)
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "=" || event.key === "+") {
      zoomIn();
    }
    if (event.key === "-" || event.key === "_") {
      zoomOut();
    }
  };

  const onPan = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isPanning) {
      return;
    }

    setOrigin(([originX, originY]) => {
      return [originX + event.movementX, originY + event.movementY];
    });
  };

  // Array of button OBJs so I have easy access to indexes for styling.
  const buttons = [
    { label: "+", onPress: zoomIn },
    { label: "-", onPress: zoomOut },
  ];

  const rowsAndCols = [...Array(zoom + 1)].map((_, i) => i);

  // Listeners for "+" and "-" key presses
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  const zoomClassName =
    toggle === "zoom-in"
      ? "zoom-in"
      : toggle === "zoom-out"
      ? "zoom-out"
      : undefined;

  return (
    <div
      style={{
        width: VIEWPORT_SIZE,
        height: VIEWPORT_SIZE,
        background: "#0009",
        overflow: "hidden",
      }}
      onMouseDown={() => setPanning(true)}
      onMouseUp={() => setPanning(false)}
      onMouseMove={onPan}
      onMouseLeave={() => setPanning(false)}
    >
      <div
        style={{
          position: "absolute",
          zIndex: 25,
          width: "32px",
          margin: 0,
          padding: "10px 0 0 10px",
        }}
      >
        {buttons.map((btn, i) => {
          const { label, onPress } = btn;
          return <Button label={label} onPress={onPress} order={i} key={i} />;
        })}
      </div>
      <div
        onWheel={handleScroll}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "ceter",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
          left: origin[0],
          top: origin[1],
        }}
        className={zoomClassName}
        draggable={false}
      >
        {rowsAndCols.map((col) => (
          <div
            draggable={false}
            key={col}
            style={{ display: "flex", flexDirection: "column" }}
          >
            {rowsAndCols.map((row) => (
              <img
                draggable={false}
                key={row}
                src={getTilePath(zoom, col, row)}
                alt="1"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tiler;
