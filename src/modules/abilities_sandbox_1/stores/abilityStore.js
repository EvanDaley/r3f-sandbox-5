import create from "zustand"

export const useAbilityStore = create((set, get) => ({
  abilities: [
    { id: 1, name: "🔥 Fireball", emoji: "🔥", charge: 1 },
    { id: 2, name: "💧 Ice Spike", emoji: "💧", charge: 1 },
    { id: 3, name: "⚡ Lightning", emoji: "⚡", charge: 1 },
    { id: 4, name: "🌪️ Tornado", emoji: "🌪️", charge: 1 },
  ],
  selectedAbilityId: null,

  tick: () => {
    set({
      abilities: get().abilities.map(ability => ({
        ...ability,
        charge: Math.min(ability.charge + 0.01, 1),
      })),
    })
  },

  selectAbility: (id) => set({ selectedAbilityId: id }),

  castAbility: (id) => {
    set({
      abilities: get().abilities.map(ability =>
        ability.id === id ? { ...ability, charge: 0 } : ability
      ),
      // selectedAbilityId: null,
    })
  },

  getSelectedAbility: () =>
    get().abilities.find((s) => s.id === get().selectedAbilityId),
}))
