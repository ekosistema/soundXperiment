/**
 * soundXperiment :: Sonorous adventures with p5.js
 * @author  Marcos Martí 
 * {@link https://github.com/ekosistema}
 * @version 0.1
 */

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);

  oscTri = new p5.Oscillator('triangle');
  oscTri.amp(0.1);
  oscSq = new p5.Oscillator('square');
  oscSq.amp(0.1);
  oscSin = new p5.Oscillator('sine');
  oscSin.amp(0.1);
  delay = new p5.Delay();

  // delay.process() accepts 4 parameters:
  // source, delayTime (in seconds), feedback, filter frequency
  delay.process(oscTri, 0.24, .6, 1000);
  delay.process(oscSq, 0.12, .7, 1500);
  delay.process(oscSin, 0.48, .8, 1000);


  cnv.mousePressed(oscStart);
  
  fft = new p5.FFT();
  oscTri.start();
  oscSq.start();
  oscSin.start();
}

function oscStart() {
  oscTri.start();
  oscSq.start();
  oscSin.start();
}

function mouseReleased() {
  oscTri.stop();
  oscSq.stop();
  oscSin.stop();
}

  function draw() {

    
    let waveform = fft.waveform(); // analyze waveform
  beginShape();
  strokeWeight(0.5);
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, height, 0);
    vertex(x, y);
  }
  endShape();

  // change freq oscillator with mouseX
  let freq = map(mouseX, 0, width, 40, 60);
  oscTri.freq(freq);
  oscSq.freq(freq);
  oscSin.freq(freq);

}
