export const hoverHighlights = (square: string) => {
  const el = document.querySelector(`#chessboard .square-${square}`) as HTMLElement;
  el.classList.add('hover-greysquare');
};

export const moveHighlights = (source: string, target: string) => {
  var elems = document.querySelectorAll('.movesquare');
  for (let i = 0; i < elems.length; i++) {
    elems[i].classList.remove('movesquare');
  }
  const fromEl = document.querySelector(`#chessboard .square-${source}`) as HTMLElement;
  const toEl = document.querySelector(`#chessboard .square-${target}`) as HTMLElement;
  if (fromEl) {
    fromEl.classList.add('movesquare');
  }
  if (toEl) {
    toEl.classList.add('movesquare');
  }
};