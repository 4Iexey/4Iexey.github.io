import { Canvas } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";
import { OrthographicCamera } from "@react-three/drei";
import { useLocation } from "react-router-dom";

function ParallaxScene() {
  const planeRef = useRef();
  const planeOffscreenFactor = useRef(2);
  let textureAspect = useRef(1);
  let yOffset = useRef();
  const [texture, setTexture] = useState(null);
  const { pathname } = useLocation();
  const backgrounds = {
    "/": "/climbing.jpeg",
    "/about": "/seperation.jpeg",
    "/projects": "/booster.jpeg",
    "/contact": "/reentry.jpeg",
  };

  useEffect(() => {
    const loader = new TextureLoader();
    loader.load(backgrounds[pathname] || backgrounds["/"], (loadedTexture) => {
      setTexture(loadedTexture);
      textureAspect.current = loadedTexture.image.width / loadedTexture.image.height;
      yOffset.current = window.innerHeight / 2 - planeRef.current.geometry.parameters.height / 2;
    });
  }, [pathname]);

  useEffect(() => {
    if (planeRef.current && texture) {
      planeRef.current.geometry = new THREE.PlaneGeometry(window.innerHeight * planeOffscreenFactor.current * textureAspect.current, window.innerHeight * planeOffscreenFactor.current);
      planeRef.current.geometry.dispose();
      planeRef.current.material.map = texture;
      planeRef.current.material.needsUpdate = true;
    }
  }, [texture]);

  useEffect(() => {
    if (planeRef.current) {
      yOffset.current = window.innerHeight / 2 - planeRef.current.geometry.parameters.height / 2;
      const totalPageHeight = document.body.scrollHeight - window.innerHeight;
      const scrollFraction = window.scrollY / totalPageHeight ? window.scrollY / totalPageHeight : 0;
      planeRef.current.position.y = yOffset.current + scrollFraction * window.innerHeight * (planeOffscreenFactor.current - 1);
    }

    const handleScroll = () => {
      const totalPageHeight = document.body.scrollHeight - window.innerHeight;
      const scrollFraction = window.scrollY / totalPageHeight;
      planeRef.current.position.y = yOffset.current + scrollFraction * window.innerHeight * (planeOffscreenFactor.current - 1);
    };

    const handleResize = () => {
      planeRef.current.geometry = new THREE.PlaneGeometry(window.innerHeight * planeOffscreenFactor.current * textureAspect.current, window.innerHeight * planeOffscreenFactor.current);
      planeRef.current.geometry.dispose();
      yOffset.current = window.innerHeight / 2 - planeRef.current.geometry.parameters.height / 2;
      const totalPageHeight = document.body.scrollHeight - window.innerHeight;
      const scrollFraction = window.scrollY / totalPageHeight ? window.scrollY / totalPageHeight : 0;
      planeRef.current.position.y = yOffset.current + scrollFraction * window.innerHeight * (planeOffscreenFactor.current - 1);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <OrthographicCamera
        makeDefault
        position={[0, 0, 10]}
        left={-window.innerWidth / 2}
        right={window.innerWidth / 2}
        top={window.innerHeight / 2}
        bottom={-window.innerHeight / 2}
        near={0.1}
        far={100}
      />
      <mesh ref={planeRef} position={[0, 0, 0]}>
        <planeGeometry args={[window.innerHeight * planeOffscreenFactor.current * textureAspect.current, window.innerHeight * planeOffscreenFactor.current]} />
        <meshBasicMaterial map={texture}/>
      </mesh>
    </>
  );
}

function Scene() {
  return (
    <div className="canvas-container">
      <Canvas>
        <ParallaxScene />
      </Canvas>
    </div>
  );
}

export default Scene;