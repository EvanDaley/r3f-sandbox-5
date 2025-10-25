import * as THREE from "three"

export function createToonPalette({ p, e, s, t, d }) {
    const texture = new THREE.TextureLoader().load(
      window.location.href + "/images/textures/simple1_rotated_64.png"
    )

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    texture.flipY = false
    texture.needsUpdate = true

    return {
        p: new THREE.MeshToonMaterial({ color: p }),
        e: new THREE.MeshToonMaterial({
            color: e,
            emissive: e,
            emissiveIntensity: 1.9,
        }),
        s: new THREE.MeshToonMaterial({ color: s }),
        t: new THREE.MeshToonMaterial({ color: t }),
        d: new THREE.MeshToonMaterial({ color: d }),

        p1: new THREE.MeshToonMaterial({
            color: p,
            map: texture,
            // combine: THREE.MultiplyOperation,
        }),

    }
}
