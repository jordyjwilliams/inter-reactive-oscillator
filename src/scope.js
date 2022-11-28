import { useEffect, useRef } from "react";

export default function Scope({ gainNodeRef, audioContextRef }) {
  
  const canvasRef = useRef(null); // hook up to the <canvas> DOM element
  const analyser = useRef(null);  // AnalyserNode
  const dataArray = useRef([]);  // array to hold final data


  // run once when component loads
  // empty dependency array makes this run like .componentDidMount()
  useEffect(() => {
    analyser.current = new AnalyserNode(audioContextRef.current, {
      smoothingTimeConstant: 1,
      fftSize: 2048, // 2048 is just the size I've seen used
    });

    // using a typed array because it's faster
    // frequencyBinCount length is always half the analyser fftSize
    dataArray.current = new Uint8Array(analyser.current.frequencyBinCount);

    // connect to the analyser
    gainNodeRef.current.connect(analyser.current);

    requestAnimationFrame(tick); // start the animation
  }, []);



  const tick = () => {
    // prevent animation after component unmounted
    if (!canvasRef.current) return;

    renderFrame(); // draw stuff

    // start the recursive animation loop
    requestAnimationFrame(tick);
  };
  

  // actually draw canvas stuff
  const renderFrame = () => {
    
    const canvas = canvasRef.current;
    const c = canvasRef.current.getContext("2d");
    let segmentWidth;

    c.fillStyle = "#333";
    c.strokeStyle = "#eee";

    // set internal canvas width to size of <canvas> element
    c.width = canvas.offsetWidth;

    // set background
    c.fillStyle = "#333";
    c.fillRect(0, 0, canvas.width, canvas.height);

    // fill dataArray with data each frame
    analyser.current.getByteTimeDomainData(dataArray.current);

    // calculate width between each 'point'
    segmentWidth = canvas.width / analyser.current.frequencyBinCount;

    // start creating the path
    c.beginPath();
    
    // start path off the left side of the canvas
    c.moveTo(-100, canvas.height / 2);

    for (let i = 1; i < analyser.current.frequencyBinCount; i += 1) {
      let x = i * segmentWidth;
      let v = dataArray.current[i] / 128.0; // normalize (max value is 128)
      let y = (v * canvas.height) / 2; // scale to fit canvas height
      c.lineTo(x, y);
    }
    
    // end path off the right side of the canvas
    c.lineTo(canvas.width + 100, canvas.height / 2);
    
    c.stroke();  // actually draw the path
  };

  const style = {
    width: "100%", // make it fit width of parent
    height: "100px",
  };

  return <canvas style={style} ref={canvasRef} />;
}
