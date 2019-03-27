require('./style.css');
const io = require('socket.io-client/dist/socket.io');

function init() {
  let mouse = {
    click: false,
    move: false,
    position: {
      x: 0,
      y: 0,
    },
    position_preview: false,
  };

  // canvas
  const canvas = document.getElementById('drawing');
  const ctx = canvas.getContext('2d');
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  // conexion con socketIO

  const socket = io();

  canvas.addEventListener('mousedown', e => {
    mouse.click = true;
  });

  canvas.addEventListener('mouseup', e => {
    mouse.click = false;
  });

  canvas.addEventListener('mousemove', e => {
    mouse.position = {
      x: e.clientX / width,
      y: e.clientY / height,
    };
    mouse.move = true;
  });

  socket.on('draw_line', data => {
    let line = data.line;
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(line[0].x * width, line[0].y * height);
    ctx.lineTo(line[1].x * width, line[1].y * height);
    ctx.stroke();
  });

  function mainloop() {
    if (mouse.click && mouse.move && mouse.position_preview) {
      // conexion de websocket
      socket.emit('draw_line', {line: [mouse.position, mouse.position_preview]});
      mouse.move = false;
    }
    mouse.position_preview = {x: mouse.position.x, y: mouse.position.y};
    setTimeout(mainloop, 25);
  }

  mainloop();
}
document.addEventListener('DOMContentLoaded', init);
