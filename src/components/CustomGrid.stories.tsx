import type { Meta, StoryObj } from '@storybook/react-vite';
import { CustomGrid, GRID_SIZE } from "./CustomGrid";
import { DIRECTIONS } from "../shared/types"

const meta: Meta<typeof CustomGrid> = {
    title: 'Components/CustomGrid',
    component: CustomGrid,
    parameters: {
        docs: {
            description: {
                component: 'Displays a grid and places a directional marker based on an input string in the format "X,Y DIRECTION".'
            }
        }
    }
}

export default meta;

type Story = StoryObj<typeof CustomGrid>;

export const VALID_NORTH: Story = {
    args: { input: '1,1 NORTH' },
    parameters: {
        docs: { description: { story: 'Valid input with marker facing NORTH at position (1,1).' } }
    }
}

export const VALID_EAST: Story = {
    args: { input: '3,2 EAST' },
    parameters: {
        docs: { description: { story: 'Valid input with marker facing EAST at position (3,2).' } }
    }
}

export const VALID_WEST: Story = {
    args: { input: '2,4 WEST' },
    parameters: {
        docs: { description: { story: 'Valid input with marker facing WEST at position (2,4).' } }
    }
}

export const VALID_SOUTH: Story = {
    args: { input: '4,3 SOUTH' },
    parameters: {
        docs: { description: { story: 'Valid input with marker facing SOUTH at position (4,3).' } }
    }
}

export const VALID_CORNER_1: Story = {
    args: { input: '0,0 SOUTH' },
    parameters: {
        docs: { description: { story: 'Marker positioned at bottom-left corner (0,0).' } }
    }
}

export const VALID_CORNER_2: Story = {
    args: { input: '0,4 EAST' },
    parameters: {
        docs: { description: { story: 'Marker positioned at top-left corner (0,4).' } }
    }
}

export const VALID_CORNER_3: Story = {
    args: { input: '4,4 NORTH' },
    parameters: {
        docs: { description: { story: 'Marker positioned at top-right corner (4,4).' } }
    }
}

export const VALID_CORNER_4: Story = {
    args: { input: '4,0 WEST' },
    parameters: {
        docs: { description: { story: 'Marker positioned at bottom-right corner (4,0).' } }
    }
}

export const VALID_RANDOM: Story = {
  render: (args) => {
    const randomX = Math.floor(Math.random() * GRID_SIZE);
    const randomY = Math.floor(Math.random() * GRID_SIZE);
    const randomDirection = Math.floor(Math.random() * 4);

    return (
      <CustomGrid
        {...args}
        input={`${randomX},${randomY} ${DIRECTIONS[randomDirection]}`}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Generates a random valid position and direction on each render.'
      }
    }
  }
};

export const INVALID_X_NAN_VALUE: Story = {
    args: { input: 'X,0 WEST' },
    parameters: {
        docs: { description: { story: 'Invalid input where X is not a number.' } }
    }
}

export const INVALID_Y_NAN_VALUE: Story = {
    args: { input: '0,Y WEST' },
    parameters: {
        docs: { description: { story: 'Invalid input where Y is not a number.' } }
    }
}

export const INVALID_DIRECTION_VALUE: Story = {
    args: { input: '0,0 INVALID' },
    parameters: {
        docs: { description: { story: 'Invalid input where direction is not one of the allowed values.' } }
    }
}

export const INVALID_X_OUT_OF_BOUNDS: Story = {
    args: { input: '10,0 NORTH' },
    parameters: {
        docs: { description: { story: 'Invalid input where X is outside the grid bounds.' } }
    }
}

export const INVALID_Y_OUT_OF_BOUNDS: Story = {
    args: { input: '0,11 NORTH' },
    parameters: {
        docs: { description: { story: 'Invalid input where Y is outside the grid bounds.' } }
    }
}

export const INVALID_XY_OUT_OF_BOUNDS: Story = {
    args: { input: '11,20 NORTH' },
    parameters: {
        docs: { description: { story: 'Invalid input where both X and Y are outside the grid bounds.' } }
    }
}

export const INVALID_NO_INPUT: Story = {
    args: { input: '' },
    parameters: {
        docs: { description: { story: 'Invalid input where no value is provided.' } }
    }
}

export const INVALID_NO_DIRECTION: Story = {
    args: { input: '0,0' },
    parameters: {
        docs: { description: { story: 'Invalid input where direction is missing.' } }
    }
}

export const VALID_WITH_SPACES: Story = {
    args: { input: ' 0 , 0 NORTH ' },
    parameters: {
        docs: { description: { story: 'Valid input with extra spaces; demonstrates tolerance to minor formatting issues.' } }
    }
}