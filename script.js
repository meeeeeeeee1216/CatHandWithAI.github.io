const catHand = document.getElementById('cat-hand');
let intervalId;
let lastDirection = 'left';

function getNearestEdge(x, y) {
  const edges = [
    { name: 'left', dist: x },
    { name: 'right', dist: window.innerWidth - x },
    { name: 'top', dist: y },
    { name: 'bottom', dist: window.innerHeight - y }
  ];
  edges.sort((a, b) => a.dist - b.dist);
  return edges[0].name;
}

function getStartPosition(direction, cursorX, cursorY) {
  switch (direction) {
    case 'left': return { x: -200, y: cursorY - 100 };
    case 'right': return { x: window.innerWidth + 200, y: cursorY - 100 };
    case 'top': return { x: cursorX - 100, y: -200 };
    case 'bottom': return { x: cursorX - 100, y: window.innerHeight + 200 };
  }
}

function getEndPosition(cursorX, cursorY) {
  return { x: cursorX - 100, y: cursorY - 100 };
}

function getRotation(direction) {
  switch (direction) {
    case 'left': return 'rotate(90deg)';
    case 'right': return 'rotate(-90deg)';
    case 'top': return 'rotate(180deg)';
    case 'bottom': return 'rotate(0deg)';
    default: return 'rotate(0deg)';
  }
}

function moveCatHandToCursor() {
  const cursorX = window.lastCursorX || window.innerWidth / 2;
  const cursorY = window.lastCursorY || window.innerHeight / 2;
  const direction = getNearestEdge(cursorX, cursorY);
  lastDirection = direction;
  const start = getStartPosition(direction, cursorX, cursorY);
  const end = getEndPosition(cursorX, cursorY);

  catHand.style.transition = 'none';
  catHand.style.left = start.x + 'px';
  catHand.style.top = start.y + 'px';
  catHand.style.transform = getRotation(direction);

  setTimeout(() => {
    catHand.style.transition = 'left 1.2s cubic-bezier(.7,1.5,.7,1), top 1.2s cubic-bezier(.7,1.5,.7,1), transform 0.3s';
    catHand.style.left = end.x + 'px';
    catHand.style.top = end.y + 'px';
    catHand.style.transform = getRotation(direction) + ' scaleX(1.3) scaleY(0.9)';
    setTimeout(() => {
      catHand.style.transform = getRotation(direction) + ' scale(1)';
      // 1秒後に元の方向へ帰る
      setTimeout(() => {
        catHand.style.transition = 'left 1.2s, top 1.2s, transform 0.3s';
        const returnPos = getStartPosition(lastDirection, cursorX, cursorY);
        catHand.style.left = returnPos.x + 'px';
        catHand.style.top = returnPos.y + 'px';
        catHand.style.transform = getRotation(lastDirection);
      }, 1000);
    }, 900);
  }, 100);
}

window.addEventListener('mousemove', (e) => {
  window.lastCursorX = e.clientX;
  window.lastCursorY = e.clientY;
});

intervalId = setInterval(moveCatHandToCursor, 5000);
moveCatHandToCursor();
