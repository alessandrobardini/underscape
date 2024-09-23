import { bagContains, CHARACTERS, DialogueBarMessageType, SessionContext } from 'Game'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import Button from 'ui/Button'
import axios from 'axios'
import csrfToken from 'helpers/csrfToken'
import { useHistory } from 'react-router-dom'
import { appPath } from 'App'
import ghostFan from 'images/spooky.png'
import { TranslatorContext } from 'containers/TranslatorLoader'

import './CrystalCrypts.scss'

const CrystalCrypts: React.FC = () => {
  const i18n = useContext(TranslatorContext)
  const mazes = useMemo(() => {
    const maze_1 = {
      allowedPath: [
        // START
        { row: 4, column: 5 },
        // UP
        { row: 3, column: 5 },
        // UP
        { row: 2, column: 5 },
        // RIGHT
        { row: 2, column: 6 },
        // UP
        { row: 1, column: 6 },
        // LEFT
        { row: 1, column: 5 },
        // LEFT
        { row: 1, column: 4 },
        // LEFT
        { row: 1, column: 3 },
        // LEFT
        { row: 1, column: 2 },
        // LEFT
        { row: 1, column: 1 },
        // DOWN
        { row: 2, column: 1 },
        // DOWN
        { row: 3, column: 1 },
        // DOWN
        { row: 4, column: 1 }
      ],
      itemGivenOnMount: 'maze_map_1',
      messagesOnMount: [
        { character: 'ghost', message: i18n.t('ghost.dialogues.15') },
        { character: 'ghost', message: i18n.t('ghost.dialogues.16') },
        { character: 'ghost', message: i18n.t('ghost.dialogues.17') },
        { character: 'ghost', message: i18n.t('ghost.dialogues.18') }
      ]
    }
    const maze_2 = {
      allowedPath: [
        // START
        { row: 7, column: 4 },
        // UP
        { row: 6, column: 4 },
        // UP
        { row: 5, column: 4 },
        // LEFT
        { row: 5, column: 3 },
        // UP
        { row: 4, column: 3 },
        // UP
        { row: 3, column: 3 },
        // RIGHT
        { row: 3, column: 4 },
        // RIGHT
        { row: 3, column: 5 },
        // RIGHT
        { row: 3, column: 6 },
        // RIGHT
        { row: 3, column: 7 },
        // DOWN
        { row: 4, column: 7 },
        // RIGHT
        { row: 4, column: 8 },
        // DOWN
        { row: 5, column: 8 },
        // DOWN
        { row: 6, column: 8 },
        // DOWN
        { row: 7, column: 8 },
        // RIGHT
        { row: 7, column: 9 },
        // DOWN
        { row: 8, column: 9 },
        // DOWN
        { row: 9, column: 9 },
        // LEFT
        { row: 9, column: 8 },
        // LEFT
        { row: 9, column: 7 },
        // LEFT
        { row: 9, column: 6 }
      ],
      itemGivenOnMount: 'maze_map_2',
      messagesOnMount: [
        { character: 'ghost', message: i18n.t('ghost.dialogues.19') }
      ]
    }
    const maze_3 = {
      numberOfRows: 5,
      numberOfColumns: 12,
      allowedPath: [
        // START
        { row: 0, column: 2 },
        // DOWN
        { row: 1, column: 2 },
        // DOWN
        { row: 2, column: 2 },
        // DOWN
        { row: 3, column: 2 },
        // DOWN
        { row: 4, column: 2 },
        // RIGHT
        { row: 4, column: 3 },
        // RIGHT
        { row: 4, column: 4 },
        // RIGHT
        { row: 4, column: 5 },
        // UP
        { row: 3, column: 5 },
        // UP
        { row: 2, column: 5 },
        // LEFT
        { row: 2, column: 4 },
        // LEFT
        { row: 2, column: 3 },
        // UP
        { row: 1, column: 3 },
        // UP
        { row: 0, column: 3 },
        // RIGHT
        { row: 0, column: 4 },
        // RIGHT
        { row: 0, column: 5 },
        // RIGHT
        { row: 0, column: 6 },
        // RIGHT
        { row: 0, column: 7 },
        // RIGHT
        { row: 0, column: 8 },
        // DOWN
        { row: 1, column: 8 },
        // DOWN
        { row: 2, column: 8 },
        // LEFT
        { row: 2, column: 7 },
        // LEFT
        { row: 2, column: 6 },
        // DOWN
        { row: 3, column: 6 },
        // DOWN
        { row: 4, column: 6 },
        // RIGHT
        { row: 4, column: 7 },
        // RIGHT
        { row: 4, column: 8 },
        // RIGHT
        { row: 4, column: 9 },
        // RIGHT
        { row: 4, column: 10 },
        // RIGHT
        { row: 4, column: 11 },
        // UP
        { row: 3, column: 11 },
        // UP
        { row: 2, column: 11 },
        // LEFT
        { row: 2, column: 10 },
        // LEFT
        { row: 2, column: 9 },
        // UP
        { row: 1, column: 9 },
        // UP
        { row: 0, column: 9 },
        // RIGHT
        { row: 0, column: 10 },
        // RIGHT
        { row: 0, column: 11 },
        // DOWN
        { row: 1, column: 11 }
      ],
      exit: { row: 1, column: 11 },
      itemGivenOnMount: 'maze_map_3',
      messagesOnMount: [
        { character: 'ghost', message: i18n.t('ghost.dialogues.20') }
      ]
    }
    const maze_4 = {
      allowedPath: [
        // START
        { row: 4, column: 5 },
        // RIGHT
        { row: 4, column: 6 },
        // RIGHT
        { row: 4, column: 7 },
        // RIGHT
        { row: 4, column: 8 },
        // UP
        { row: 3, column: 8 },
        // UP
        { row: 2, column: 8 },
        // UP
        { row: 1, column: 8 },
        // LEFT
        { row: 1, column: 7 },
        // LEFT
        { row: 1, column: 6 },
        // UP
        { row: 0, column: 6 }
      ],
      itemGivenOnMount: 'maze_map_4',
      messagesOnMount: [
        { character: 'ghost', message: i18n.t('ghost.dialogues.20') }
      ],
      numberOfInvisibleLayers: 3
    }
    return [maze_1, maze_2, maze_3, maze_4]
  }, [])
  const { setDialogueBarMessages, bosses } = useContext(SessionContext)
  const [mazeIndex, setMazeIndex] = useState(null)
  const bagContainsMaze1Map = bagContains(mazes[0].itemGivenOnMount)
  const bagContainsMaze2Map = bagContains(mazes[1].itemGivenOnMount)
  const bagContainsMaze3Map = bagContains(mazes[2].itemGivenOnMount)
  const bagContainsMaze4Map = bagContains(mazes[3].itemGivenOnMount)
  const bagContainsSpookySprint = bagContains('spooky_sprint')
  const history = useHistory()

  const canRenderSpookySprint = mazeIndex === 4 || bagContainsSpookySprint

  if(bosses.map(({ name }) => name).includes('ghost')) {
    history.replace(appPath('/map'))
  }
  

  useEffect(() => {
    if(!bagContainsMaze1Map) {
      setDialogueBarMessages([
        { character: 'ghost', message: i18n.t('ghost.dialogues.1') },
        { character: 'ghost', message: i18n.t('ghost.dialogues.2') },
        { character: 'ghost', message: i18n.t('ghost.dialogues.3') },
        { character: 'ghost', message: i18n.t('ghost.dialogues.4', { name: CHARACTERS['ghost'].name })},
        { character: 'ghost', message: i18n.t('ghost.dialogues.5') },
        { character: 'ghost', message: i18n.t('ghost.dialogues.6') },
        { character: 'ghost', message: i18n.t('ghost.dialogues.7') },
        { character: 'ghost', message: i18n.t('ghost.dialogues.8') },
        { character: 'ghost', message: i18n.t('ghost.dialogues.9') },
        { character: 'ghost', message: i18n.t('ghost.dialogues.10') },
        { character: 'ghost', message: i18n.t('ghost.dialogues.11') },
        { character: 'ghost', message: i18n.t('ghost.dialogues.12') },
        { character: 'ghost', message: i18n.t('ghost.dialogues.13'), onCloseMessage: () => setMazeIndex(0) }
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
        { character: 'ghost', message: i18n.t('ghost.dialogues.14'), onCloseMessage: () => setMazeIndex(mazeIndex + 1) }
      ])
    }


  return <div className='CrystalCrypts'>
    {canRenderSpookySprint ? <SpookySprint /> : 
      (mazeIndex !== null) ?
        <Maze key={mazeIndex} data={mazes[mazeIndex]} onMazeSolved={handleMazeSolved}  /> :
        <div className='map' />
    }
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
  const i18n = useContext(TranslatorContext)
  const { setDialogueBarMessages, pickUpItem } = useContext(SessionContext)
  const [grid, setGrid] = useState(() => new Array(numberOfRows).fill(UNVISITED_CHAR).map(() => new Array(numberOfColumns).fill(UNVISITED_CHAR)))
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0)
  const [endReached, setEndReached] = useState(false)
  const [canClickOnMaze, setCanClickOnMaze] = useState(false)
  const bagContainsMazeMap = bagContains(itemGivenOnMount)

  useEffect(() => {
    if(!bagContainsMazeMap) {
      const onCloseLastMessage = () => {
        pickUpItem({ pickableItem: itemGivenOnMount, firstMessage: i18n.t('ghost.dialogues.22', { name: CHARACTERS['ghost'].name }) })
        setCanClickOnMaze(true)
      }
      setDialogueBarMessages([...messagesOnMount.slice(0, -1), {...messagesOnMount.slice(-1)[0], onCloseMessage: onCloseLastMessage}])
    } else {
      setDialogueBarMessages([
        { character: 'ghost', message: i18n.t('ghost.dialogues.23'), onCloseMessage: () => setCanClickOnMaze(true) }
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
      { message: i18n.t('ghost.dialogues.24') },
      { character: 'ghost', message: i18n.t('ghost.dialogues.25') },
      { title: 'GAME OVER!', message: i18n.t('ghost.dialogues.26'), onCloseMessage: () => location.reload() }
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
            const isVisited = grid[rowIndex][columnIndex] == VISITED_CHAR
            return <div key={columnIndex} className={`${isVisited ? 'visited' : 'unvisited'} ${isExit && 'exit'} ${isInvisibleCell(rowIndex, columnIndex) && 'hidden'} cell`} {...((canClickOnMaze && !isVisited) && { onClick: () => handleCellClick(rowIndex, columnIndex) } )} >
              <span>{isExit ? 'EXIT' : grid[rowIndex][columnIndex]}</span>
            </div>
          })}
        </div>
      })}
    </div>
  </div>
}

const NUMBER_OF_SPOOKY_SPRINT_ROWS = 8
const NUMBER_OF_SPOOKY_SPRINT_COLUMNS = 8
const NUMBER_OF_ARROWS_TO_PLACE = 3
const INITIAL_GHOST_CELL = { row: 7, column: 4, direction: 'up' }
const EXIT_CELLS = []
const BOMB_CELLS = [
  { row: 2, column: 1 },
  { row: 3, column: 5 },
  { row: 5, column: 2 }
]
const ARROW_CELLS = [
  { row: 1, column: 1, direction: 'down' },
  { row: 2, column: 2 , direction: 'left' },
  { row: 1, column: 6, direction: 'left' },
  { row: 6, column: 6, direction: 'left' },
  { row: 5, column: 5, direction: 'right' },
  { row: 4, column: 5, direction: 'up' },
]

const NEXT_DIRECTION = {
  'up' : 'right',
  'right': 'down',
  'down': 'left',
  'left': 'up'
}

const SpookySprint = () => {
  const i18n = useContext(TranslatorContext)
  const history = useHistory()
  const { setDialogueBarMessages, pickUpItem } = useContext(SessionContext)
  const bagContainsSpookySprint = bagContains('spooky_sprint')
  const [canInteractWithGrid, setCanInteractWithGrid] = useState(false)
  const [placedArrows, setPlacedArrows] = useState([])
  const [isGameInProgress, setIsGameInProgress] = useState(false)
  const [ghostPosition, setGhostPosition] = useState(INITIAL_GHOST_CELL)
  const [timer, setTimer] = useState(null)
  const [bombCells, setBombCells] = useState(BOMB_CELLS)

  useEffect(() => {
    if(!bagContainsSpookySprint) {
    setDialogueBarMessages(
      [
        { character: 'ghost', message: i18n.t('ghost.dialogues.27') },
        { character: 'ghost', message: i18n.t('ghost.dialogues.28') },
        { character: 'ghost', message: i18n.t('ghost.dialogues.29'), onCloseMessage: () => { pickUpItem({ pickableItem: 'spooky_sprint', firstMessage: i18n.t('ghost.dialogues.30', { name: CHARACTERS['ghost'].name }) }); setCanInteractWithGrid(true) } }
      ]
    )} else {
      setDialogueBarMessages(
        [
          { character: 'ghost', message: i18n.t('ghost.dialogues.31'), onCloseMessage: () => setCanInteractWithGrid(true)},
        ]
      )}
  }, [])

  useEffect(() => {
    if(isGameInProgress) {
      setTimer(setInterval(() => {
        setGhostPosition(ghostPosition => ({...nextGhostPosition(ghostPosition), direction: ghostPosition.direction }))
      }, 1000))
      return () => timer && clearInterval(timer)
    }
  }, [isGameInProgress == true])

  useEffect(() => {
    if(ghostPosition !== INITIAL_GHOST_CELL) {
      if(isExit(ghostPosition.row, ghostPosition.column)) {
        clearInterval(timer)
        setDialogueBarMessages([
          { message: i18n.t('ghost.dialogues.32', { name: CHARACTERS['ghost'].name }) },
          { character: 'ghost', message: i18n.t('ghost.dialogues.33') },
          { title: 'GAME OVER!', message: i18n.t('ghost.dialogues.34'), onCloseMessage: () => location.reload() }
        ])
      }
      if((isArrowCell(ghostPosition.row, ghostPosition.column) || isPlacedArrowCell(ghostPosition.row, ghostPosition.column)) && ghostPosition.direction !== getArrow(ghostPosition.row, ghostPosition.column).direction) {
        setDialogueBarMessages([
          { message: i18n.t('ghost.dialogues.35', { name: CHARACTERS['ghost'].name }), disappearAfterSeconds: 0.5 }
        ])
        setGhostPosition({...ghostPosition, direction: getArrow(ghostPosition.row, ghostPosition.column).direction})
      }
      if((isBombCell(ghostPosition.row, ghostPosition.column))) {
        setDialogueBarMessages([
          { message: i18n.t('ghost.dialogues.36', { name: CHARACTERS['ghost'].name }), disappearAfterSeconds: 0.5 }
        ])
        setBombCells([...bombCells.filter(bombCell => bombCell.row !== ghostPosition.row || bombCell.column !== ghostPosition.column)])
      }
    }
  }, [ghostPosition])

  const handleBossDefeated = () => {
    axios.post(
      '/bosses',
      { boss: { name: 'ghost' }, authenticity_token: csrfToken() },
      { headers: { Accept: 'application/json' }, responseType: 'json' }
    ).then(() => history.replace(appPath('/map')))
  }

  useEffect(() => {
    if(bombCells.length === 0) {
      clearInterval(timer)
      setDialogueBarMessages([
        { character: 'ghost', message: i18n.t('ghost.dialogues.37') },
        { character: 'ghost', message: i18n.t('ghost.dialogues.38') },
        { message: i18n.t('ghost.dialogues.39', { name: CHARACTERS['ghost'].name }), disappearAfterSeconds: 3, onCloseMessage: () => handleBossDefeated() }
      ])
    }
  }, [bombCells])

  const isExit = (rowIndex, columnIndex) => {
    return ((rowIndex === 0) || 
    (rowIndex + 1 === NUMBER_OF_SPOOKY_SPRINT_ROWS) ||
    (columnIndex === 0) || 
    (columnIndex + 1) === NUMBER_OF_SPOOKY_SPRINT_COLUMNS) || EXIT_CELLS.filter(({ row: bombRowIndex, column: bombColumnIndex }) => bombRowIndex === rowIndex && bombColumnIndex === columnIndex).length > 0
  }

  const isBombCell = (rowIndex, columnIndex) => {
    return bombCells.filter(({ row: bombRowIndex, column: bombColumnIndex }) => bombRowIndex === rowIndex && bombColumnIndex === columnIndex).length > 0
  }

  const isArrowCell = (rowIndex, columnIndex) => {
    return ARROW_CELLS.filter(({ row: arrowRowIndex, column: arrowColumnIndex }) => arrowRowIndex === rowIndex && arrowColumnIndex === columnIndex).length > 0
  }

  const isPlacedArrowCell = (rowIndex, columnIndex) => {
    return placedArrows.filter(({ row: arrowRowIndex, column: arrowColumnIndex }) => arrowRowIndex === rowIndex && arrowColumnIndex === columnIndex).length > 0
  }

  const isPossibleToPlaceArrow = (rowIndex, columnIndex) => {
    return (NUMBER_OF_ARROWS_TO_PLACE - placedArrows.length > 0) &&!(isBombCell(rowIndex, columnIndex) || isExit(rowIndex, columnIndex) || isArrowCell(rowIndex, columnIndex)) 
  }

  const placeArrow = (rowIndex, columnIndex) => {
    setPlacedArrows([...placedArrows, { row: rowIndex, column: columnIndex, direction: 'up' }])
  }

  const changeArrowDirection = (rowIndex, columnIndex) => {
    const currentArrow = getArrow(rowIndex, columnIndex)
    const updatedArrows = [...placedArrows.filter((arrow) => arrow.row !== rowIndex || arrow.column !== columnIndex), { ...currentArrow, direction: NEXT_DIRECTION[currentArrow.direction]}]
    setPlacedArrows(updatedArrows)  
  }

  const getArrow = (rowIndex, columnIndex) => {
    return ARROW_CELLS.concat(placedArrows).find(({ row: arrowRowIndex, column: arrowColumnIndex }) => arrowRowIndex === rowIndex && arrowColumnIndex === columnIndex)
  }

  const isGhostPosition = (rowIndex, columnIndex) => {
    return ghostPosition.row  === rowIndex && ghostPosition.column === columnIndex
  }

  const nextGhostPosition = (ghostPosition) => {
    switch (ghostPosition.direction) {
      case 'up': return { row: ghostPosition.row - 1, column: ghostPosition.column }
      case 'down': return { row: ghostPosition.row + 1, column: ghostPosition.column }
      case 'left': return { row: ghostPosition.row, column: ghostPosition.column - 1 }
      case 'right': return { row: ghostPosition.row, column: ghostPosition.column + 1 }
    }
  }

  const handleResetPlacedArrows = () => {
    setPlacedArrows([])  
  }

  const handleStartSpookySprint = () => {
    setIsGameInProgress(true)
  }

  const numberOfArrowsToPlaceYet = NUMBER_OF_ARROWS_TO_PLACE - placedArrows.length

  return <div className='Grid'>
    <div className='container'>
      <div className='column'>
        {isGameInProgress && 
          <div className='ghost-fan'>
            <div className='fan-1'>
              <span>{i18n.t('ghost.spooky_sprint.3', { name: CHARACTERS['ghost'].name.toUpperCase() })}</span>
              <img src={ghostFan  } />
            </div>
            <div className='fan-2'>
              <img src={ghostFan} />
              <span>{i18n.t('ghost.spooky_sprint.1')}</span>
            </div>
            <div className='fan-3'>
              <span>{i18n.t('ghost.spooky_sprint.2', { name: CHARACTERS['ghost'].name.toUpperCase() })}</span>
              <img src={ghostFan} />
            </div>
          </div>
        }
      </div>
      <div className='column'>
        <div className='board'>
          {Array.from(Array(NUMBER_OF_SPOOKY_SPRINT_ROWS).keys()).map((rowIndex) => {
            return <div key={rowIndex} className='row'>
              {Array.from(Array(NUMBER_OF_SPOOKY_SPRINT_COLUMNS).keys()).map((columnIndex) => {
                const bomb = isBombCell(rowIndex, columnIndex)
                const exit = isExit(rowIndex, columnIndex)
                const ghost = isGhostPosition(rowIndex, columnIndex)
                const arrow = isArrowCell(rowIndex, columnIndex)
                const placedArrow = isPlacedArrowCell(rowIndex, columnIndex)
                const possibleToPlaceArrow = isPossibleToPlaceArrow(rowIndex, columnIndex)
                const possibleToChangeArrowPosition = isPlacedArrowCell(rowIndex, columnIndex)
                return <div key={columnIndex} className={`${(exit && !ghost) && 'exit'} ${bomb && 'bomb'} cell`} {...((canInteractWithGrid && !isGameInProgress) && { onClick: () => possibleToChangeArrowPosition ? changeArrowDirection(rowIndex, columnIndex) : possibleToPlaceArrow ? placeArrow(rowIndex, columnIndex) : null } )} >
                  <span>{ghost ? <img src={CHARACTERS['ghost'].imageSrc} /> : (arrow || placedArrow) ? <i className={`fa fa-arrow-${getArrow(rowIndex, columnIndex).direction}`} /> : bomb ? 'BOMB' : exit ? 'EXIT' : ''}</span>
                </div>
              })}
            </div>
          })}
        </div>
      </div>
      <div className='column'>
        <div className='commands'>
          {canInteractWithGrid &&
            <>
              {numberOfArrowsToPlaceYet > 0 ? <div className='arrows'>
              <span>{i18n.t('ghost.spooky_sprint.4')}</span>
                <span>{i18n.t('ghost.spooky_sprint.5', { arrows: numberOfArrowsToPlaceYet })}</span>
                <span>{i18n.t('ghost.spooky_sprint.6')}</span>
                <span>{i18n.t('ghost.spooky_sprint.7')}</span>
                <Button size='s' onClick={handleResetPlacedArrows}>{i18n.t('ghost.spooky_sprint.8')}</Button>
              </div> : <div className='arrows'>
                {isGameInProgress ? <>
                  <span>{i18n.t('ghost.spooky_sprint.9')}</span>
                </> : <>
                  <Button size='s' onClick={handleStartSpookySprint}>{i18n.t('ghost.spooky_sprint.10')}</Button>
                  <Button size='s' onClick={handleResetPlacedArrows}>{i18n.t('ghost.spooky_sprint.8')}</Button>
                </> }
              </div>
              }
            </>
          }
        </div>
      </div>
    </div>
  </div>
}

export default CrystalCrypts 
