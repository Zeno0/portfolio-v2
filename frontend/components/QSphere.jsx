// "use client";

// import { useEffect, useRef } from "react";
// import * as THREE from "three";

// export default function QSphere() {
//   const mountRef = useRef(null);

//   useEffect(() => {
//     const container = mountRef.current;
//     if (!container) return;

//     // ✅ FIX: force reliable size
//     const size = Math.min(window.innerWidth, window.innerHeight) * 0.45;

//     // Scene
//     const scene = new THREE.Scene();

//     // Camera
//     const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
//     camera.position.z = 4;

//     // Renderer
//     const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
//     renderer.setSize(size, size);

//     container.appendChild(renderer.domElement);

//     // ✅ SIMPLE TEST OBJECT FIRST
//     const geometry = new THREE.SphereGeometry(2, 32, 32);
//     const material = new THREE.MeshBasicMaterial({
//       color: 0x00ffcc,
//       wireframe: true,
//     });

//     const sphere = new THREE.Mesh(geometry, material);
//     scene.add(sphere);

//     // Animation
//     let frameId;
//     const animate = () => {
//       frameId = requestAnimationFrame(animate);

//       sphere.rotation.y += 0.01;
//       sphere.rotation.x += 0.005;

//       renderer.render(scene, camera);
//     };
//     animate();

//     // Cleanup
//     return () => {
//       cancelAnimationFrame(frameId);
//       renderer.dispose();
//       container.removeChild(renderer.domElement);
//     };
//   }, []);

//   return (
//     <div
//       ref={mountRef}
//       style={{
//         position: "fixed",
//         top: 0,
//         right: 0,
//         width: "45vmin",
//         height: "45vmin",
//         zIndex: 9999, // 🔥 temporarily high for visibility
//         background: "transparent", // debug layer
//       }}
//     />
//   );
// }

"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function QSphere() {
  const mountRef = useRef(null);
  
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const size = Math.min(window.innerWidth, window.innerHeight) * 0.45;
    const renderSize = size * 1.3;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(renderSize, renderSize);
    container.appendChild(renderer.domElement);

    // 🧠 ROOT GROUP (important)
    const group = new THREE.Group();
    scene.add(group);

    // -------------------------------
    // ⚙️ CONFIG
    // -------------------------------
    const nQubits = 3; // try 2–4
    const radius = 2.1;
    const topPoint = new THREE.Vector3(0, radius, 0);
    const bottomPoint = new THREE.Vector3(0, -radius, 0);
    // -------------------------------
    // 🟢 LATITUDE RINGS
    // -------------------------------
    const ringMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.15,
    });

    const segments = 128;

    for (let k = 0; k <= nQubits; k++) {
      const phi = (k / nQubits) * Math.PI;

      const y = radius * Math.cos(phi);
      const r = radius * Math.sin(phi);

      if (r < 0.01) continue; // skip poles

      const geometry = new THREE.BufferGeometry();
      const vertices = [];

      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * 2 * Math.PI;

        const x = r * Math.cos(theta);
        const z = r * Math.sin(theta);

        vertices.push(x, y, z);
      }

      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3)
      );

      const ring = new THREE.LineLoop(geometry, ringMaterial);
      group.add(ring);
    }

    // -------------------------------
    // 🔵 VERTICAL AXIS
    // -------------------------------
    const axisMaterial = new THREE.LineBasicMaterial({
      color: 0x4f7cff,
      transparent: true,
      opacity: 0.6,
    });

    const axisGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, radius, 0),
      new THREE.Vector3(0, -radius, 0),
    ]);

    const axis = new THREE.Line(axisGeometry, axisMaterial);
    group.add(axis);

    // -------------------------------
    // 🧠 Q-SPHERE STATE LOGIC
    // -------------------------------

    function generateStates(n) {
      const states = [];
      for (let i = 0; i < 2 ** n; i++) {
        const bin = i.toString(2).padStart(n, "0");
        const ones = [...bin].filter(b => b === "1").length;
        states.push({ bin, ones });
      }
      return states;
    }

    function mapToSphere(states, n) {
      const layers = {};

      states.forEach(s => {
        if (!layers[s.ones]) layers[s.ones] = [];
        layers[s.ones].push(s);
      });


      const mapped = [];

      Object.keys(layers).forEach(k => {
        const layer = layers[k];
        const layerIndex = parseInt(k);

        const phi = (layerIndex / n) * Math.PI;

        layer.forEach((state, i) => {
          const theta = (i / layer.length) * 2 * Math.PI;

          const x = radius * Math.sin(phi) * Math.cos(theta);
          const y = radius * Math.sin(phi) * Math.sin(theta);
          const z = radius * Math.cos(phi);

          mapped.push({
            ...state,
            position: { x, y, z },
          });
        });
      });

      return mapped;
    }

    function phaseToColor(phase) {
      const hue = (phase + Math.PI) / (2 * Math.PI);
      const color = new THREE.Color();
      color.setHSL(hue, 0.6, 0.5);
      return color;
    }

    const states = generateStates(nQubits);
    const mapped = mapToSphere(states, nQubits);

    const points = [];

    mapped.forEach((s, i) => {
      const phase = i * 0.5;

      const color = phaseToColor(phase);

      const mat = new THREE.MeshBasicMaterial({ color });
      const geo = new THREE.SphereGeometry(0.1, 16, 16);

      const pos = new THREE.Vector3(
        s.position.x,
        s.position.y,
        s.position.z
      );

      // 🔵 POINT
      const point = new THREE.Mesh(geo, mat);
      point.position.copy(pos);

      // 📏 AMPLITUDE LINE
      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        pos,
      ]);

      const lineMaterial = new THREE.LineBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.6,
      });

      const line = new THREE.Line(lineGeometry, lineMaterial);

      group.add(line);
      group.add(point);

      points.push({ mesh: point, line, state: s.bin });
    });

    let topState = null;
    let bottomState = null;
    points.forEach(p => {
      if (p.state === "0".repeat(nQubits)) {
        topState = p.mesh;
      }
      if (p.state === "1".repeat(nQubits)) {
        bottomState = p.mesh;
      }
    });


    function projectMesh(mesh) {
      if (!mesh) return null;

      const vector = mesh.position.clone();
      vector.applyMatrix4(group.matrixWorld);
      vector.project(camera);

      const rect = container.getBoundingClientRect();

      return {
        x: rect.left + (vector.x * 0.5 + 0.5) * rect.width,
        y: rect.top + (-vector.y * 0.5 + 0.5) * rect.height,
        visible: vector.z > -1 && vector.z < 1,
      };
    }
    function updateLabelPositions() {
      window.__qsphere_positions = {
        top: projectMesh(topState),
        bottom: projectMesh(bottomState),
      };
    }
    // -------------------------------
    // 🔄 ANIMATION
    // -------------------------------
    let frameId;

    const animate = (t) => {
      frameId = requestAnimationFrame(animate);
      
      const time = t * 0.001;

      const spinSpeed = 0.004;   // main spin
      const wobbleAmount = 0.25; // tilt intensity
      const wobbleSpeed = 0.5;   // wobble frequency

      group.rotation.y += spinSpeed;

      // smooth precession (wobble)
      group.rotation.x = Math.sin(time * wobbleSpeed) * wobbleAmount;
      group.rotation.z = Math.cos(time * wobbleSpeed) * wobbleAmount * 0.3;

      // smooth phase evolution
      points.forEach((obj, i) => {
        const phase = Math.sin(time + i * 0.5);

        const hue = (phase + Math.PI) / (2 * Math.PI);

        obj.mesh.material.color.setHSL(hue, 0.6, 0.5);
        obj.line.material.color.setHSL(hue, 0.6, 0.5);
      });
      updateLabelPositions();
      renderer.render(scene, camera);
    };

    animate();

    // cleanup
    return () => {
      cancelAnimationFrame(frameId);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "65vmin",
        height: "85vmin",
        pointerEvents: "none",
        zIndex: 9,
        opacity: 1.5,
        background: "transparent",
        // 🌌 smooth blending into UI
        maskImage: "radial-gradient(circle, white 60%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(circle, white 60%, transparent 100%)",
      }}
    />
  );
}