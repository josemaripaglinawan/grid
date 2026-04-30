# 🧭 CustomGrid Component

A React grid visualization component that parses a coordinate-based input string and renders a directional marker on a 5×5 grid.

It is built using **React**, **TypeScript**, **Material UI**, and documented using **Storybook**.

---

## 📦 Features

- 5×5 coordinate grid system
- Parses input in the format: "X,Y DIRECTION"
- Supports cardinal directions:
- NORTH
- EAST
- SOUTH
- WEST
- Displays directional marker using icon rotation
- Input validation with error feedback (Snackbar + Alert)
- Handles invalid inputs gracefully

---

## 🧠 Input Format

The component expects a single string: "X,Y DIRECTION"



| Part      | Description                     |
|-----------|---------------------------------|
| X         | Horizontal coordinate (0–4)     |
| Y         | Vertical coordinate (0–4)       |
| DIRECTION | NORTH / EAST / SOUTH / WEST     |

---

## 🚫 Validation Rules

The component handles:

- Empty input
- Invalid numbers (NaN values)
- Out-of-bounds coordinates
- Missing direction
- Invalid direction strings
- Extra spaces and casing issues (partially supported)

---

## 🧱 Tech Stack

- React 18
- TypeScript
- Material UI (MUI)
- Storybook (Vite setup)

---

# 🚀 Running the Project

### Install dependencies

```bash
npm install
npm run storybook

