"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { prefersReducedMotion } from "@/lib/gsap";

function Model({ src }: { src: string }) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(src) as unknown as { scene: THREE.Group; animations: THREE.AnimationClip[] };
  const { actions, mixer, names } = useAnimations(animations, group);

  useEffect(() => {
    if (!scene) return;
    scene.traverse((o) => {
      const n = (o.name || "").toLowerCase();
      if (n.startsWith("text") || n === "desirefx.me_001") (o as THREE.Object3D).visible = false;
      if ((o as THREE.Mesh).isMesh) (o as THREE.Mesh).frustumCulled = false;
    });
  }, [scene]);

  useEffect(() => {
    if (!names.length || !actions[names[0]]) return;
    const action = actions[names[0]]!;
    if (prefersReducedMotion()) {
      action.play();
      action.paused = true;
      mixer.setTime(0);
      return;
    }
    action.clampWhenFinished = true;
    action.setLoop(THREE.LoopOnce, 1);
    let t: ReturnType<typeof setTimeout>;
    const play = () => {
      action.reset().fadeIn(0.25).play();
      action.paused = false;
    };
    const onFinished = (e: { action: THREE.AnimationAction }) => {
      if (e.action !== action) return;
      action.paused = true;
      t = setTimeout(play, 6000);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mixer.addEventListener("finished", onFinished as any);
    play();
    return () => {
      clearTimeout(t);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mixer.removeEventListener("finished", onFinished as any);
      action.stop();
    };
  }, [actions, mixer, names]);

  return (
    <group ref={group}>
      <primitive object={scene} position={[0, -11, 0]} />
    </group>
  );
}

export default function WavingAvatar({ src = "/models/waving-gesture.glb" }: { src?: string }) {
  return (
    <div className="relative h-[520px] w-full max-w-[600px] lg:h-[560px] lg:w-[700px] lg:max-w-[700px] translate-x-6 lg:translate-x-12 bg-transparent">
      <Canvas
        camera={{ position: [0, 1.75, 17.5], fov: 36, near: 0.1, far: 50 }}
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl, camera }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.2;
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.setClearColor(0x14110d, 0);
          (camera as THREE.PerspectiveCamera).lookAt(0, 1.15, 0);
        }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={1.7} />
        <directionalLight position={[2, 5, 3]} intensity={1.9} castShadow />
        <directionalLight position={[-1.8, 2.5, -1.5]} intensity={0.7} />
        <hemisphereLight args={["#ffffff", "#0d0a08", 0.6]} />
        <Suspense fallback={null}>
          <Model src={src} />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/waving-gesture.glb");
