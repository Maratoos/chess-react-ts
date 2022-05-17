import React, { FC, useEffect, useState } from 'react'
import { Board } from '../models/Board'
import { Cell } from '../models/Cell'
import { Figure } from '../models/figures/Figure'
import CellComponent from './CellComponent'

interface BoardProps{
  board: Board,
  setBoard: (board: Board) => void
}

const BoardComponent: FC<BoardProps> = ({board, setBoard}) => {
  const [selectedCell, setCelectedCell] = useState<Cell | null>(null)

  function click(cell: Cell) {
    if(selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell)
      setCelectedCell(null)
      updateBoard()
    } else {
      setCelectedCell(cell)
    }
  }

  useEffect(() => {
    highLightCells()
  }, [selectedCell])

  function highLightCells() {
    board.highLightCells(selectedCell)
    updateBoard()
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard()
    setBoard(newBoard)
  }

  return (
    <div className='board'>
      {board.cells.map((row, index) => 
      <React.Fragment key={index}>
        {row.map(cell =>
          <CellComponent
          key={cell.id} 
          cell={cell} 
          click={click} 
          selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y} />  
        )}
      </React.Fragment>
      )}
    </div>
  )
}

export default BoardComponent