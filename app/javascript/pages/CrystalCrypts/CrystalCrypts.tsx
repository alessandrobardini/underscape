import AlchemistBossBattle from 'components/AlchemistAlcove/AlchemistBossBattle'
import HiddenElement from 'components/Layout/HiddenElement'
import AnswerSubmission from 'components/Layout/ModalContent/AnswerSubmission'
import { bagContains, CHARACTERS, DialogueBarMessageType, riddleSolved, SessionContext } from 'Game'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import './CrystalCrypts.scss'

const MAZE_1 = {
  allowedPath: [
    { row: 4, column: 5 },
    { row: 3, column: 5 },
    { row: 2, column: 5 },
    { row: 2, column: 6 },
    { row: 1, column: 6 },
    { row: 1, column: 5 },
    { row: 1, column: 4 },
    { row: 1, column: 3 },
    { row: 1, column: 2 },
    { row: 1, column: 1 },
    { row: 2, column: 1 },
    { row: 3, column: 1 },
    { row: 4, column: 1 }
  ],
  itemGivenOnMount: 'maze_map_1',
  messagesOnMount: [
    { character: 'ghost', message: `... Something about the first maze ... ` }
  ]
}

const MAZE_2 = {
  allowedPath: [
    { row: 7, column: 4 },
    { row: 6, column: 4 },
    { row: 5, column: 4 },
    { row: 5, column: 3 },
    { row: 4, column: 3 },
    { row: 3, column: 3 },
    { row: 3, column: 4 },
    { row: 3, column: 5 },
    { row: 3, column: 6 },
    { row: 3, column: 7 },
    { row: 4, column: 7 },
    { row: 4, column: 8 },
    { row: 5, column: 8 },
    { row: 6, column: 8 },
    { row: 7, column: 8 },
    { row: 7, column: 9 },
    { row: 8, column: 9 },
    { row: 9, column: 9 },
    { row: 9, column: 8 },
    { row: 9, column: 7 },
    { row: 9, column: 6 }
  ],
  itemGivenOnMount: 'maze_map_2',
  messagesOnMount: [
    { character: 'ghost', message: `... Something about the second maze ... ` }
  ]
}

const MAZE_3 = {
  numberOfRows: 5,
  numberOfColumns: 12,
  allowedPath: [
    { row: 0, column: 2 },
    { row: 1, column: 2 },
    { row: 2, column: 2 },
    { row: 3, column: 2 },
    { row: 4, column: 2 },
    { row: 4, column: 3 },
    { row: 4, column: 4 },
    { row: 4, column: 5 },
    { row: 3, column: 5 },
    { row: 2, column: 5 },
    { row: 2, column: 4 },
    { row: 2, column: 3 },
    { row: 1, column: 3 },
    { row: 0, column: 3 },
    { row: 0, column: 4 },
    { row: 0, column: 5 },
    { row: 0, column: 6 },
    { row: 0, column: 7 },
    { row: 0, column: 8 },
    { row: 1, column: 8 },
    { row: 2, column: 8 },
    { row: 2, column: 7 },
    { row: 2, column: 6 },
    { row: 3, column: 6 },
    { row: 4, column: 6 },
    { row: 4, column: 7 },
    { row: 4, column: 8 },
    { row: 4, column: 9 },
    { row: 4, column: 10 },
    { row: 4, column: 11 },
    { row: 3, column: 11 },
    { row: 2, column: 11 },
    { row: 2, column: 10 },
    { row: 2, column: 9 },
    { row: 1, column: 9 },
    { row: 0, column: 9 },
    { row: 0, column: 10 },
    { row: 0, column: 11 },
    { row: 1, column: 11 }
  ],
  exit: { row: 1, column: 11 },
  itemGivenOnMount: 'maze_map_3',
  messagesOnMount: [
    { character: 'ghost', message: `... Something about the third maze ... ` }
  ]
}

const MAZE_4 = {
  allowedPath: [
    { row: 4, column: 5 },
    { row: 4, column: 6 },
    { row: 4, column: 7 },
    { row: 4, column: 8 },
    { row: 3, column: 8 },
    { row: 2, column: 8 },
    { row: 1, column: 8 },
    { row: 1, column: 7 },
    { row: 1, column: 6 },
    { row: 0, column: 6 }
  ],
  itemGivenOnMount: 'maze_map_4',
  messagesOnMount: [
    { character: 'ghost', message: `... Something about the fourth maze ... ` }
  ],
  numberOfInvisibleLayers: 3
}

const MAZES = [MAZE_1, MAZE_2, MAZE_3, MAZE_4]

const CrystalCrypts: React.FC = () => {
  const { setDialogueBarMessages } = useContext(SessionContext)
  const [mazeIndex, setMazeIndex] = useState(null)
  const bagContainsMaze1Map = bagContains(MAZE_1.itemGivenOnMount)
  const bagContainsMaze2Map = bagContains(MAZE_2.itemGivenOnMount)
  const bagContainsMaze3Map = bagContains(MAZE_3.itemGivenOnMount)
  const bagContainsMaze4Map = bagContains(MAZE_4.itemGivenOnMount)

  useEffect(() => {
    if(!bagContainsMaze1Map) {
      setDialogueBarMessages([
        { character: 'ghost', message: 'Something...', onCloseMessage: () => setMazeIndex(0) }
      ])
    } else {
      if(bagContainsMaze4Map) {
        setMazeIndex(3)
      } else if(bagContainsMaze3Map) {
        setMazeIndex(2)
      } else if (bagContainsMaze2Map) {
        setMazeIndex(1)
      }
      else if(bagContainsMaze1Map) {
        setMazeIndex(0)
      }
    }
  }, [])

  const handleMazeSolved = () => { 
    setDialogueBarMessages([
      { character: 'ghost', message: 'Something that tells you that you cleared the maze', onCloseMessage: () => setMazeIndex(mazeIndex + 1) }
    ])
  }


  return <div className='CrystalCrypts'>
    {mazeIndex !== null ? <Maze key={mazeIndex} data={MAZES[mazeIndex]} onMazeSolved={handleMazeSolved}  /> : <div className='map' />}
  </div>
}

const VISITED_CHAR = 'X'
const UNVISITED_CHAR = '?'

type MazeProps = {
  data: {
    allowedPath: {row: number, column: number}[]
    itemGivenOnMount: string
    messagesOnMount: DialogueBarMessageType[]
    numberOfRows?: number,
    numberOfColumns?: number
    exit?: {row: number, column: number},
    numberOfInvisibleLayers?: number
  },
  onMazeSolved: () => void
}

const Maze: React.FC<MazeProps> = ({ data: { allowedPath, itemGivenOnMount, messagesOnMount, numberOfRows = 10, numberOfColumns = 10, exit, numberOfInvisibleLayers }, onMazeSolved }) => {
  const { setDialogueBarMessages, pickUpItem } = useContext(SessionContext)
  const [grid, setGrid] = useState(() => new Array(numberOfRows).fill(UNVISITED_CHAR).map(() => new Array(numberOfColumns).fill(UNVISITED_CHAR)))
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0)
  const [endReached, setEndReached] = useState(false)
  const [canClickOnMaze, setCanClickOnMaze] = useState(false)
  const bagContainsMazeMap = bagContains(itemGivenOnMount)

  useEffect(() => {
    if(!bagContainsMazeMap) {
      const onCloseLastMessage = () => {
        pickUpItem({ pickableItem: itemGivenOnMount, firstMessage: `${CHARACTERS['ghost'].name} threw a book over you!` })
        setCanClickOnMaze(true)
      }
      setDialogueBarMessages([...messagesOnMount.slice(0, -1), {...messagesOnMount.slice(-1)[0], onCloseMessage: onCloseLastMessage}])
    } else {
      setDialogueBarMessages([
        { character: 'ghost', message: 'Come on loser, retry!', onCloseMessage: () => setCanClickOnMaze(true) }
      ])
    }
    const copiedGrid = [...grid]
    copiedGrid[allowedPath[0].row][allowedPath[0].column] = VISITED_CHAR
    setGrid([...copiedGrid])
  }, [])

  useEffect(() => {
    if(endReached) {
      setCanClickOnMaze(false)
      onMazeSolved()
    }
  }, [endReached])

  const handleWrongCellClick = () => {
    setCanClickOnMaze(false)
    setDialogueBarMessages([
      { message: `Oh no! This cell contains a pit...` },
      { character: 'ghost', message: `Problems in exiting the maze?` },
      { title: 'GAME OVER!', message: '... but you can retry the game!', onCloseMessage: () => location.reload() }
    ])
  }

  const handleCellClick = (rowIndex, columnIndex) => {
    if(allowedPath[currentMoveIndex + 1].row !== rowIndex || allowedPath[currentMoveIndex + 1].column !== columnIndex) {
      handleWrongCellClick()
    } else {
      const copiedGrid = [...grid]
      copiedGrid[rowIndex][columnIndex] = VISITED_CHAR
      setGrid([...copiedGrid])
      setCurrentMoveIndex(currentMoveIndex + 1)
      if(currentMoveIndex + 1 === allowedPath.length - 1) {
        setEndReached(true)
      }
    }
  }

  const isInvisibleCell = (rowIndex, columnIndex) => {
    if(numberOfInvisibleLayers === undefined) {
      false
    }
    return ((rowIndex + 1) - numberOfInvisibleLayers < 0) || 
    ((rowIndex + 1) + numberOfInvisibleLayers > numberOfRows) ||
    ((columnIndex + 1) - numberOfInvisibleLayers < 0) || 
    ((columnIndex + 1) + numberOfInvisibleLayers > numberOfColumns)
  }

  return <div className='Grid'>
    <div className='board'>
      {Array.from(Array(numberOfRows).keys()).map((rowIndex) => {
        return <div key={rowIndex} className='row'>
          {Array.from(Array(numberOfColumns).keys()).map((columnIndex) => {
            const isExit = exit?.row === rowIndex && exit?.column === columnIndex
            return <div key={columnIndex} className={`${grid[rowIndex][columnIndex] == VISITED_CHAR ? 'visited' : 'unvisited'} ${isExit && 'exit'} ${isInvisibleCell(rowIndex, columnIndex) && 'hidden'} cell`} {...(canClickOnMaze && { onClick: () => handleCellClick(rowIndex, columnIndex) } )} >
              <span>{isExit ? 'EXIT' : grid[rowIndex][columnIndex]}</span>
            </div>
          })}
        </div>
      })}
    </div>
  </div>
}

export default CrystalCrypts 