import {Html, Loader} from '@react-three/drei'
import {Canvas} from '@react-three/fiber'
import React, {Suspense} from 'react'
import useSceneStore from '../stores/sceneStore'

export default function ThreeCanvas() {
    const SceneComponent = useSceneStore(state => state.getCurrentSceneComponent())

    // We have a list of scenes in the scene store, and we mount whichever one is selected.
    return (
        <>
            <Canvas
                dpr={[1, 2]}
                style={{
                    zIndex: 20
                }}
            >
                <Suspense fallback={null}>
                    {SceneComponent && React.createElement(SceneComponent)}
                </Suspense>
            </Canvas>
            <Loader/>
        </>
    )
}
