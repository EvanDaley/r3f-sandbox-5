import React from "react"
import { useAbilityStore } from "../stores/abilityStore"
import "./Abilities.css"

export default function AbilityBarOverlay() {
  const { abilities, castAbility, selectedAbilityId, selectAbility } = useAbilityStore()

  return (
    <div className="ability-bar">
      {abilities.map((ability) => {
        const isSelected = ability.id === selectedAbilityId
        const isReady = ability.charge >= 1

        return (
          <div
            key={ability.id}
            onClick={() => isReady && selectAbility(ability.id)}
            className={[
              "ability",
              isSelected ? "selected" : "",
              isReady ? "ready" : "cooldown",
            ].join(" ")}
          >
            <div
              className="ability-charge"
              style={{ height: `${ability.charge * 100}%` }}
            />
            <span className="ability-emoji">{ability.emoji}</span>
          </div>
        )
      })}
    </div>
  )
}
