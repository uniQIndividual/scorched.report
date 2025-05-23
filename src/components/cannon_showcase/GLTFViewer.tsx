import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Html, useProgress } from '@react-three/drei';
import { Bloom, EffectComposer, ToneMapping, Vignette } from '@react-three/postprocessing'
import { ToneMappingMode } from 'postprocessing'
import GUI from 'lil-gui';
import { LoadingAnimationWithTitle } from '../LoadingAnimation';

const Model = ({ url }) => {

  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
};


const PerformanceMonitor = ({ setPerformanceData }) => {
  const frameCount = useRef(0);
  const startTime = useRef(performance.now());

  useFrame(() => {
    frameCount.current += 1;
    const elapsed = performance.now() - startTime.current;
    if (elapsed >= 1000) {
      setPerformanceData({ fps: frameCount.current });
      frameCount.current = 0;
      startTime.current = performance.now();
    }
  });

  return null; // This component does not render anything
};

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress()
  return <Html center> <LoadingAnimationWithTitle title={typeof progress == "number" ? (progress.toFixed(0) + "% loaded") : ""} /> </Html>
}

const GLTFViewer = ({ modelURL, modelHash, view }: { modelURL: string, modelHash: string, view: "tiny" | "large" }) => {
  const [performanceData, setPerformanceData] = useState({ fps: 0 });
  const [show, setShow] = useState(false);
  const [tooltip, setTooltip] = useState('');
  const [hdriIndex, setHdriIndex] = useState(0);
  const hdriUrls = [
    { url: '/data/3d/rainforest_trail_1k.hdr', description: '"Rainforest Trail" by Dimitrios Savva and Jarod Guest from Poly Haven' },
    { url: '/data/3d/pink_sunrise_1k.hdr', description: 'Test 1' },
    { url: '/data/3d/studio_small_03_1k.hdr', description: 'Test 2' },
  ];

  const handleHdriChange = (index) => {
    setHdriIndex(index);
  };
  useEffect(() => {
    if (view == 'tiny') {
      return;
    }

    const gui = new GUI({
      container: document.getElementById('GLTFViewer-large-controls'),
      title: "3D CONTROLS",
    });


    gui.add({
      show
    }, 'show')
    .name("Use 3D Model")
    .onChange((newVal) => {
      setShow(newVal);
      const twoDimImage = document.getElementById("cannon_preview_image" + modelHash)
      if (twoDimImage) {
        twoDimImage.toggleAttribute("hidden")
      }
    })

    gui.add({
      hdriIndex
    }, 'hdriIndex', [ 0, 1, 2 ])
    .name("HDRI")
    .onChange((newIndex) => {setHdriIndex(newIndex)})


    // Clean up the GUI on component unmount
    return () => {
      gui.destroy();
    };
  }, []);


  if (!show) {
    return <button id={'GLTFViewer_button_' + modelHash} className='show' onClick={() => {
      setShow(false)
    }}>
    </button>
  }

  return (
    <div
      className={'rounded-lg ' + (view == 'tiny' ? ' h-[226px] ' : ' w-full ')}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
      <img
        src={"/images/3d/background_dark_small.webp"}
        alt="Background"
        className='backdrop-blur-3xl rounded-lg'
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <Canvas style={{ height: '100%', width: '100%' }} camera={{
        position: [-0.6, 0, 1.2],
        fov: 40,
        near: 0.1,
        far: 100,
      }} >
        <ambientLight intensity={0.0} />
        <group rotation={[0, 0 /*Math.PI*/, 0]}>
          <Environment files={hdriUrls[hdriIndex].url} />
        </group>
        <Suspense fallback={<Loader />}>
          <Model url={modelURL} />
        </Suspense>
        <OrbitControls />
        <EffectComposer>
          <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.2} height={1000} />
          <ToneMapping
            mode={ToneMappingMode.OPTIMIZED_CINEON}
          //adaptive={true}
          //resolution={256}
          //middleGrey={0.6}
          //maxLuminance={16.0}
          //averageLuminance={1.0}
          //adaptationRate={1.0}
          />
          <PerformanceMonitor setPerformanceData={setPerformanceData} />
        </EffectComposer>
      </Canvas>
      {true ? "" : <div style={{
        position: 'absolute',
        top: 10,
        left: 10,
        color: 'white',
        background: 'rgba(0, 0, 0, 0.5)',
        padding: '10px',
        borderRadius: '5px',
      }}>
        <p>FPS: {performanceData.fps}</p>
        <p>Drag to rotate, scroll to zoom</p>
        inspired by https://paracausalforge.com
      </div>}
      {true ? "" : <div style={{
        position: 'absolute', bottom: '10px', left: '10px',
        color: 'white',
        background: 'rgba(0, 0, 0, 0.5)',
        padding: '10px',
        borderRadius: '5px'
      }}>
        {hdriUrls.map((hdri, index) => (
          <div key={index} style={{ position: 'relative', margin: '5px' }}>
            <button
              onMouseEnter={() => setTooltip(hdri.description)}
              onMouseLeave={() => setTooltip('')}
              onClick={() => handleHdriChange(index)}
            >
              HDRI {index + 1}
            </button>
            {tooltip && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '30px',
                  left: '0',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  padding: '5px',
                  borderRadius: '5px',
                  whiteSpace: 'nowrap',
                }}
              >
                {tooltip}
              </div>
            )}
          </div>
        ))}
      </div>}
      <button id={'GLTFViewer_button_' + modelHash} className='show' onClick={() => {
        setShow(true)
      }}>
      </button>
    </div>
  );
};

export default GLTFViewer;
