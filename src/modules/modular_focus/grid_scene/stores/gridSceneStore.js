import create from 'zustand';

/**
 * Grid Scene Store
 * 
 * Manages the state of objects placed on a grid-based scene.
 * Objects are stored with their grid coordinates (gridX, gridZ) and can be serialized to JSON.
 */

// Grid cell size in world units (1 unit = 1 grid cell)
export const GRID_CELL_SIZE = 1;

/**
 * Convert grid coordinates to world position
 * @param {number} gridX - Grid X coordinate
 * @param {number} gridZ - Grid Z coordinate
 * @returns {{x: number, y: number, z: number}} World position
 */
export function gridToWorld(gridX, gridZ) {
  return {
    x: gridX * GRID_CELL_SIZE,
    y: 0,
    z: gridZ * GRID_CELL_SIZE,
  };
}

/**
 * Convert world position to grid coordinates
 * @param {number} worldX - World X coordinate
 * @param {number} worldZ - World Z coordinate
 * @returns {{gridX: number, gridZ: number}} Grid coordinates
 */
export function worldToGrid(worldX, worldZ) {
  return {
    gridX: Math.round(worldX / GRID_CELL_SIZE),
    gridZ: Math.round(worldZ / GRID_CELL_SIZE),
  };
}

export const useGridSceneStore = create((set, get) => ({
  // Objects stored as: { id: { type, gridX, gridZ, rotation? } }
  objects: {},

  // Currently selected object type for placement ('desk' | 'wall' | null)
  selectedObjectType: null,

  // Delete mode - when true, clicking will delete objects instead of placing
  deleteMode: false,

  // Rotation mode - when true, clicking will rotate objects by 90 degrees
  rotationMode: false,

  // Preview rotation - rotation for the preview/ghost object (in radians)
  previewRotation: 0,

  // Overwrite mode - when true, placing on occupied squares replaces the existing object
  overwrite: true,

  // Selection system
  selectedObjectIds: [], // Array of selected object IDs
  selectionMode: false, // When true, selection tool is active
  moveMode: false, // When true, selected objects are being moved
  moveOffset: { gridX: 0, gridZ: 0 }, // Offset for moving selected objects

  /**
   * Add an object to the grid
   * @param {string} type - Object type ('desk' | 'wall')
   * @param {number} gridX - Grid X coordinate
   * @param {number} gridZ - Grid Z coordinate
   * @param {number} rotation - Rotation in radians (default: 0)
   * @returns {string} The ID of the created object
   */
  addObject: (type, gridX, gridZ, rotation = 0) => {
    const id = `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    set((state) => ({
      objects: {
        ...state.objects,
        [id]: {
          type,
          gridX,
          gridZ,
          rotation,
        },
      },
    }));
    return id;
  },

  /**
   * Remove an object from the grid
   * @param {string} id - Object ID
   */
  removeObject: (id) => {
    set((state) => {
      const next = { ...state.objects };
      delete next[id];
      return { objects: next };
    });
  },

  /**
   * Update an object's position
   * @param {string} id - Object ID
   * @param {number} gridX - New grid X coordinate
   * @param {number} gridZ - New grid Z coordinate
   */
  updateObjectPosition: (id, gridX, gridZ) => {
    set((state) => {
      const object = state.objects[id];
      if (!object) return state;
      return {
        objects: {
          ...state.objects,
          [id]: {
            ...object,
            gridX,
            gridZ,
          },
        },
      };
    });
  },

  /**
   * Update an object's rotation
   * @param {string} id - Object ID
   * @param {number} rotation - Rotation in radians
   */
  updateObjectRotation: (id, rotation) => {
    set((state) => {
      const object = state.objects[id];
      if (!object) return state;
      return {
        objects: {
          ...state.objects,
          [id]: {
            ...object,
            rotation,
          },
        },
      };
    });
  },

  /**
   * Set the selected object type for placement
   * @param {string|null} type - Object type ('desk' | 'wall' | null)
   */
  setSelectedObjectType: (type) => {
    set({ selectedObjectType: type, deleteMode: false, rotationMode: false, previewRotation: 0 });
  },

  /**
   * Rotate the preview by 90 degrees (π/2 radians)
   */
  rotatePreview: () => {
    set((state) => ({
      previewRotation: (state.previewRotation + Math.PI / 2) % (Math.PI * 2),
    }));
  },

  /**
   * Toggle overwrite mode
   */
  setOverwrite: (enabled) => {
    set({ overwrite: enabled });
  },

  /**
   * Selection system methods
   */
  setSelectionMode: (enabled) => {
    set({ 
      selectionMode: enabled, 
      selectedObjectType: enabled ? null : undefined, // Clear placement tool when selecting
      deleteMode: false,
      rotationMode: false,
    });
  },

  selectObject: (id) => {
    set((state) => {
      if (state.selectedObjectIds.includes(id)) {
        // Deselect if already selected
        return { selectedObjectIds: state.selectedObjectIds.filter((i) => i !== id) };
      } else {
        // Add to selection
        return { selectedObjectIds: [...state.selectedObjectIds, id] };
      }
    });
  },

  selectObjects: (ids) => {
    set({ selectedObjectIds: ids });
  },

  clearSelection: () => {
    set({ selectedObjectIds: [] });
  },

  setMoveMode: (enabled) => {
    set({ moveMode: enabled });
  },

  setMoveOffset: (gridX, gridZ) => {
    set({ moveOffset: { gridX, gridZ } });
  },

  applyMove: () => {
    set((state) => {
      if (state.selectedObjectIds.length === 0 || !state.moveMode) return state;

      const newObjects = { ...state.objects };
      const { gridX: offsetX, gridZ: offsetZ } = state.moveOffset;

      // Move all selected objects
      state.selectedObjectIds.forEach((id) => {
        const obj = newObjects[id];
        if (obj) {
          newObjects[id] = {
            ...obj,
            gridX: obj.gridX + offsetX,
            gridZ: obj.gridZ + offsetZ,
          };
        }
      });

      return {
        objects: newObjects,
        moveMode: false,
        moveOffset: { gridX: 0, gridZ: 0 },
      };
    });
  },

  /**
   * Set delete mode
   * @param {boolean} enabled - Whether delete mode is enabled
   */
  setDeleteMode: (enabled) => {
    set({ deleteMode: enabled, selectedObjectType: null, rotationMode: false });
  },

  /**
   * Set rotation mode
   * @param {boolean} enabled - Whether rotation mode is enabled
   */
  setRotationMode: (enabled) => {
    set({ rotationMode: enabled, selectedObjectType: null, deleteMode: false });
  },

  /**
   * Rotate an object by 90 degrees (π/2 radians)
   * @param {string} id - Object ID
   */
  rotateObject: (id) => {
    set((state) => {
      const object = state.objects[id];
      if (!object) return state;
      const newRotation = (object.rotation || 0) + Math.PI / 2;
      return {
        objects: {
          ...state.objects,
          [id]: {
            ...object,
            rotation: newRotation,
          },
        },
      };
    });
  },

  /**
   * Clear all objects
   */
  clearAll: () => {
    set({ objects: {} });
  },

  /**
   * Serialize the scene to JSON
   * @returns {string} JSON string representation of the scene
   */
  serialize: () => {
    const state = get();
    return JSON.stringify({
      version: '1.0',
      objects: state.objects,
    }, null, 2);
  },

  /**
   * Deserialize and load a scene from JSON
   * @param {string} jsonString - JSON string representation of the scene
   */
  deserialize: (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      if (data.objects && typeof data.objects === 'object') {
        set({ objects: data.objects });
      } else {
        console.warn('Invalid scene format: missing objects');
      }
    } catch (error) {
      console.error('Failed to deserialize scene:', error);
    }
  },

  /**
   * Load scene from a data object (for programmatic loading)
   * @param {Object} data - Scene data object with objects property
   */
  loadScene: (data) => {
    if (data && data.objects && typeof data.objects === 'object') {
      set({ objects: data.objects });
    } else {
      console.warn('Invalid scene format: missing objects');
    }
  },
}));

