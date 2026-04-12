import * as THREE from 'three';
import { useRef, useState, useEffect, memo, useMemo } from 'react';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import {
  useFBO,
  useScroll,
  Image,
  Scroll,
  Preload,
  ScrollControls,
  MeshTransmissionMaterial,
  Text
} from '@react-three/drei';
import { easing } from 'maath';

export default function FluidGlass({ mode = 'lens', lensProps = {}, barProps = {}, cubeProps = {}, children }) {
  const Wrapper = mode === 'bar' ? Bar : mode === 'cube' ? Cube : Lens;
  const rawOverrides = mode === 'bar' ? barProps : mode === 'cube' ? cubeProps : lensProps;

  const {
    navItems = [],
    ...modeProps
  } = rawOverrides;

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '600px', cursor: 'none' }}>
      <Canvas camera={{ position: [0, 0, 20], fov: 15 }} gl={{ alpha: true }} eventSource={document.body}>
        <ScrollControls damping={0.2} pages={1} distance={0.4}>
          <Wrapper modeProps={modeProps}>
            <Scroll>
                {children /* Allow custom children */}
            </Scroll>
          </Wrapper>
        </ScrollControls>
      </Canvas>
    </div>
  );
}

const ModeWrapper = memo(function ModeWrapper({
  children,
  geometryFactory,
  lockToBottom = false,
  followPointer = true,
  modeProps = {},
  ...props
}) {
  const ref = useRef();
  const buffer = useFBO();
  const { viewport: vp } = useThree();
  const [scene] = useState(() => new THREE.Scene());
  const geoWidthRef = useRef(1);

  const geometry = useMemo(() => geometryFactory(), [geometryFactory]);

  useEffect(() => {
    if (geometry) {
      geometry.computeBoundingBox();
      geoWidthRef.current = geometry.boundingBox.max.x - geometry.boundingBox.min.x || 1;
    }
  }, [geometry]);

  useFrame((state, delta) => {
    const { gl, viewport, pointer, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    const destX = followPointer ? (pointer.x * v.width) / 2 : 0;
    const destY = lockToBottom ? -v.height / 2 + 0.2 : followPointer ? (pointer.y * v.height) / 2 : 0;
    easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);

    if (modeProps.scale == null) {
      const maxWorld = v.width * 0.9;
      const desired = maxWorld / geoWidthRef.current;
      ref.current.scale.setScalar(Math.min(0.2, desired));
    }

    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);

    // Background Color
    gl.setClearColor(0x161616, 1);
  });

  const { scale, ior, thickness, anisotropy, chromaticAberration, ...extraMat } = modeProps;

  return (
    <>
      {createPortal(children, scene)}
      <mesh scale={[vp.width, vp.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent />
      </mesh>
      <mesh ref={ref} scale={scale ?? 0.2} rotation-x={Math.PI / 2} geometry={geometry} {...props}>
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={ior ?? 1.15}
          thickness={thickness ?? 5}
          anisotropy={anisotropy ?? 0.01}
          chromaticAberration={chromaticAberration ?? 0.1}
          color="#ffffff"
          {...extraMat}
        />
      </mesh>
    </>
  );
});

function Lens({ modeProps, ...p }) {
  const geometryFactory = () => new THREE.CylinderGeometry(1.5, 1.5, 0.4, 64);
  return <ModeWrapper geometryFactory={geometryFactory} followPointer modeProps={modeProps} {...p} />;
}

function Cube({ modeProps, ...p }) {
  const geometryFactory = () => new THREE.BoxGeometry(2, 2, 2);
  return <ModeWrapper geometryFactory={geometryFactory} followPointer modeProps={modeProps} {...p} />;
}

function Bar({ modeProps = {}, ...p }) {
  const geometryFactory = () => new THREE.BoxGeometry(0.5, 0.5, 10);
  const defaultMat = {
    transmission: 1,
    roughness: 0,
    thickness: 10,
    ior: 1.15,
    color: '#ffffff',
    attenuationColor: '#ffffff',
    attenuationDistance: 0.25
  };

  return (
    <ModeWrapper
      geometryFactory={geometryFactory}
      lockToBottom
      followPointer={false}
      modeProps={{ ...defaultMat, ...modeProps }}
      {...p}
    />
  );
}
