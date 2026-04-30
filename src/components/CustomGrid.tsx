import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Snackbar from "@mui/material/Snackbar";
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import Alert from "@mui/material/Alert";
import { useMemo } from "react";
import type { CardinalDirection } from "../shared/types";
import { isCardinalDirection } from "../shared/types";

export const GRID_SIZE = 5;

type ParseResult = {
  x: number;
  y: number;
  cardinalDirection: CardinalDirection;
};

type SuccessParseResult = {
  success: true;
  result: ParseResult;
};

type FailedParseResult = {
  success: false;
  errorMessages: string[];
};

const parseInput = (
  input: string,
  gridSize: number,
): SuccessParseResult | FailedParseResult => {
  if (!input) {
    return {
      success: false,
      errorMessages: ["No input"],
    };
  }

  let errorMessages: string[] = [];

  const [xString, yDirectionString] = input.toUpperCase().trim().split(",");
  const x = +xString;
  if (isNaN(x)) {
    errorMessages = [...errorMessages, "Invalid X Value"];
  } else if (x < 0 || x > gridSize - 1) {
    errorMessages.push("X value is out of bounds");
  }

  const [yString, directionString] = (yDirectionString.trim() || "").split(" ");
  const y = +yString;
  if (isNaN(y)) {
    errorMessages.push("Invalid Y Value");
  } else if (y < 0 || y > gridSize - 1) {
    errorMessages.push("Y value is out of bounds");
  }

  if (!isCardinalDirection(directionString)) {
    errorMessages.push("Invalid Direction Value");
  }

  const cardinalDirection: CardinalDirection =
    directionString as CardinalDirection;

  if (errorMessages.length > 0) {
    return {
      success: false,
      errorMessages,
    };
  }

  return {
    success: true,
    result: {
      x,
      y,
      cardinalDirection,
    },
  };
};

export interface MarkerProps {
  direction: CardinalDirection;
}

const rotationMap = {
  NORTH: 0,
  EAST: 90,
  SOUTH: 180,
  WEST: 270,
};

const Marker = ({ direction }: MarkerProps) => {
  return (
    <ArrowUpward
      sx={{
        transform: `rotate(${rotationMap[direction]}deg)`
      }}
    />
  );
};

export interface CustomGridProps {
  input: string;
}

export const CustomGrid = ({ input }: CustomGridProps) => {
  const parseResult = useMemo(() => parseInput(input, GRID_SIZE), [input]);

  return (
    <>
      <Snackbar
        open={!parseResult.success}
        autoHideDuration={3000}
        onClose={() => {}}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error">
          {!parseResult.success &&
            parseResult.errorMessages.map((errorMsg, i) => (
              <div key={i}>{errorMsg}</div>
            ))}
        </Alert>
      </Snackbar>
      <Card sx={{ width: "fit-content", padding: 2 }}>
        <Table>
          <TableBody>
            {Array.from({ length: GRID_SIZE }).map((_, rowIndex) => {
              const x = GRID_SIZE - rowIndex - 1;

              return (
                <TableRow key={rowIndex}>
                  {Array.from({ length: GRID_SIZE }).map((_, y) => {
                    const isSelected =
                      parseResult.success &&
                      parseResult.result.x === x &&
                      parseResult.result.y === y;
                    const coordinate = `${x},${y}`;
                    return (
                      <TableCell
                        key={coordinate}
                        sx={{
                          width: 90,
                          height: 90,
                          padding: 0,
                          textAlign: "center",
                          verticalAlign: "middle",
                          border: "1px solid rgba(0,0,0,0.12)",
                        }}
                      >
                        {isSelected && parseResult.success && (
                          <Marker
                            direction={parseResult.result.cardinalDirection}
                          />
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </>
  );
};
