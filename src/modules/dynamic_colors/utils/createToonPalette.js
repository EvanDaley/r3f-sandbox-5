import * as THREE from "three"

export function createToonPalette({ p, e, s, t }) {
    return {
        p: new THREE.MeshToonMaterial({ color: p }),
        e: new THREE.MeshToonMaterial({
            color: e,
            emissive: e,
            emissiveIntensity: 1.9,
        }),
        s: new THREE.MeshToonMaterial({ color: s }),
        t: new THREE.MeshToonMaterial({ color: t }),
    }
}
