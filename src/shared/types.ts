export const DIRECTIONS = ["NORTH", "EAST", "SOUTH", "WEST"] as const;
export type CardinalDirection = typeof DIRECTIONS[number];

export const isCardinalDirection = (value: string): value is CardinalDirection => {
  return DIRECTIONS.includes(
    value as CardinalDirection,
  );
};