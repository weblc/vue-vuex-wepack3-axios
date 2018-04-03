let xhr = new XMLHttpRequest();//xhr对象;
let audioCon = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext)();
let gainNode = audioCon.createGain() || audioCon.createGainNode(); //音频控制对象
let analyser = audioCon.createAnalyser();
let source = null;
let currentSong = 0;

let size = 128;
// analyser.fftSize = 512;//设置频域数据
analyser.fftSize = size * 2;//设置频域数据(高度)
analyser.connect(gainNode);
gainNode.connect(audioCon.destination);

//设置canvas
let canvas = document.createElement('canvas');
canvas.width = 600;
canvas.height = 400;
let ctx = canvas.getContext('2d');

let line = ctx.createLinearGradient(0, 0, 0, canvas.height);
line.addColorStop(0.14,'#FF0000');
line.addColorStop(0.28,'#FF7F00');
line.addColorStop(0.42,'#FFFF00 ');
line.addColorStop(0.56,'#00FF00');
line.addColorStop(0.70,'#00FFFF ');
line.addColorStop(0.84,'#0000FF');
line.addColorStop(1,'#8B00FF ');
ctx.fillStyle = line;
/**
 *
 * @param {*请求地址} url
 */
export function loadMusic1 (url) {
    let num = ++currentSong;
    source && source[source.stop ? 'stop' : 'noteOff']();
    xhr.abort();
    xhr.open('GET',url);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function () {
        if (num !== currentSong) {
            return false;
        }
        audioCon.decodeAudioData(xhr.response,buffer => {
            if (num !== currentSong) {
                return false;
            }
            decodeMusic(buffer);
        },err => {
            console.log(err);
        });
    };
    xhr.send();
}
getAnalyserData();

export function creatArea (dom) {
    document.getElementById(dom).appendChild(canvas);
}
function draw (arr) {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    let w = canvas.width / size;
    for (var i = 0; i < size; i++) {
        let h = arr[i] / 256 * canvas.height;
        ctx.fillRect(w * i,canvas.height - h,w * 0.6,h);
    }
}
/**
 *
 * @param {请求的buffer流} buffer
 */
function decodeMusic (buffer) {
    let bufferSource = audioCon.createBufferSource();
    bufferSource.buffer = buffer;
    bufferSource.connect(analyser);
    bufferSource[bufferSource.start ? 'start' : 'noteOn'](0);
    source = bufferSource;
}
/**
 * 把音频频域数据解析
 */
function getAnalyserData () {
    let arr = new Uint8Array(analyser.frequencyBinCount);

    let requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;

    function updataArr () {
        analyser.getByteFrequencyData(arr);
        draw(arr);
        requestAnimationFrame(updataArr);
    }
    requestAnimationFrame(updataArr);
}
/**
 * 停止播放
 */
export function stopMusic () {
    source && source[source.stop ? 'stop' : 'noteOff']();
}

/**
 *
 * @param {音量} val
 * @param {最大音量} max
 */
export function changeVolume (val,max) {
    var prec = val / max;
    gainNode.gain.value = prec;
}