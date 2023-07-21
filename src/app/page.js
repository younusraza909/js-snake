export default function Home() {
  let totalGridSize = 20;

  function renderBoard() {
    let cellArray = [];

    for (let row = 0; row < totalGridSize; row++) {
      for (let col = 0; col < totalGridSize; col++) {
        let cell = <div className='cell'></div>;

        cellArray.push(cell);
      }
    }

    return cellArray;
  }

  return (
    <main className='main'>
      <div className='score'>
        Score : <span>30</span>
      </div>
      <div className='board'>{renderBoard()}</div>
    </main>
  );
}
