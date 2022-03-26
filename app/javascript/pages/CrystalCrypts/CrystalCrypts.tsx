import { bagContains, CHARACTERS, DialogueBarMessageType, SessionContext } from 'Game'
import React, { useContext, useEffect, useState } from 'react'
import Button from 'ui/Button'
import axios from 'axios'
import csrfToken from 'helpers/csrfToken'
import { useHistory } from 'react-router-dom'

import './CrystalCrypts.scss'
import { appPath } from 'App'
import ghostFan from 'images/spooky.png'

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
    { character: 'ghost', message: 'So what? Are you already lost?' },
    { character: 'ghost', message: 'Come on, your current position is the blue cell! I really need to tell you everything...' },
    { character: 'ghost', message: 'Are you able to find the exit? Ehehe...' },
    { character: 'ghost', message: 'Take this and learn something new, you fool!' }
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
    { character: 'ghost', message: `The training is not over yet! Move on, slowpoke!` }
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
    { character: 'ghost', message: `Boring, boring, boring... You take ages to find the exit!` }
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
    { character: 'ghost', message: `Hmm... Actually, you are not so useless...` }
  ],
  numberOfInvisibleLayers: 3
}

const MAZES = [MAZE_1, MAZE_2, MAZE_3, MAZE_4]

const CrystalCrypts: React.FC = () => {
  const { setDialogueBarMessages, bosses } = useContext(SessionContext)
  const [mazeIndex, setMazeIndex] = useState(null)
  const bagContainsMaze1Map = bagContains(MAZE_1.itemGivenOnMount)
  const bagContainsMaze2Map = bagContains(MAZE_2.itemGivenOnMount)
  const bagContainsMaze3Map = bagContains(MAZE_3.itemGivenOnMount)
  const bagContainsMaze4Map = bagContains(MAZE_4.itemGivenOnMount)
  const bagContainsSpookySprint = bagContains('spooky_sprint')
  const history = useHistory()

  const canRenderSpookySprint = mazeIndex === 4 || bagContainsSpookySprint

  if(bosses.map(({ name }) => name).includes('ghost')) {
    history.replace(appPath('/map'))
  }
  

  useEffect(() => {
    if(!bagContainsMaze1Map) {
      setDialogueBarMessages([
        { character: 'ghost', message: 'Uhhh! It\'s been a long time since I received any visits, down here  at the Cyrstal Crypts!' },
        { character: 'ghost', message: '...' },
        { character: 'ghost', message: 'Who am I? Wait, are you serious or what?!' },
        { character: 'ghost', message: `How can you not recognize ${CHARACTERS['ghost'].name}, the great olympic champion?!` },
        { character: 'ghost', message: 'The king suggested me to come down here to train for the next kingdom games. This is the duty of a gold medalist champion like me!' },
        { character: 'ghost', message: 'This place is wonderful, full of scary caves and deadly labyrinths!' },
        { character: 'ghost', message: 'Do you know in which discipline I won my gold medal, right?' },
        { character: 'ghost', message: '...' },
        { character: 'ghost', message: 'Soccer? Did you really say "Soccer?"' },
        { character: 'ghost', message: 'I AM A F**KING GHOST WITH NO LEGS, HOW AM I SUPPOSED TO PLAY SOCCER?' },
        { character: 'ghost', message: 'Of course, I am the Spooky Sprint champion! It\'s the Magaland national sport!' },
        { character: 'ghost', message: 'Your insolence bothered me! I have no time to lose with dummies like you...' },
        { character: 'ghost', message: 'Let\'s test your orienteering skills, ehehe... They are the basis to become a good Spooky Sprint player!', onCloseMessage: () => setMazeIndex(0) }
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
        { character: 'ghost', message: 'Oh well... this was not really challenging, don\'t think you\'re special!', onCloseMessage: () => setMazeIndex(mazeIndex + 1) }
      ])
    }


  return <div className='CrystalCrypts'>
    {canRenderSpookySprint ? <SpookySprint /> : 
      (mazeIndex !== null) ?
        <Maze key={mazeIndex} data={MAZES[mazeIndex]} onMazeSolved={handleMazeSolved}  /> :
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
      { character: 'ghost', message: `Sorry, you will never become a Spooky Sprint champion...` },
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
        { character: 'ghost', message: 'Enough, you rookie! These mazes were easy as 1-2-3... ' },
        { character: 'ghost', message: 'It\'s time for a real challenge! Are you ready to challenge me at Spooky Sprint? ' },
        { character: 'ghost', message: 'Just for you to know... No one defeated me so far! Eheheh', onCloseMessage: () => { pickUpItem({ pickableItem: 'spooky_sprint', firstMessage: `${CHARACTERS['ghost'].name} wants to play Spooky Sprint with you!` }); setCanInteractWithGrid(true) } }
      ]
    )} else {
      setDialogueBarMessages(
        [
          { character: 'ghost', message: 'Come on!', onCloseMessage: () => setCanInteractWithGrid(true)},
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
          { message: `Oh no! ${CHARACTERS['ghost'].name} reached the exit...` },
          { character: 'ghost', message: 'And the Spooky Sprint champion is still...' },
          { title: 'GAME OVER!', message: '... but you can retry the game!', onCloseMessage: () => location.reload() }
        ])
      }
      if((isArrowCell(ghostPosition.row, ghostPosition.column) || isPlacedArrowCell(ghostPosition.row, ghostPosition.column)) && ghostPosition.direction !== getArrow(ghostPosition.row, ghostPosition.column).direction) {
        setDialogueBarMessages([
          { message: `${CHARACTERS['ghost'].name} changes direction!`, disappearAfterSeconds: 0.5 }
        ])
        setGhostPosition({...ghostPosition, direction: getArrow(ghostPosition.row, ghostPosition.column).direction})
      }
      if((isBombCell(ghostPosition.row, ghostPosition.column))) {
        setDialogueBarMessages([
          { message: `The bomb damaged ${CHARACTERS['ghost'].name}!`, disappearAfterSeconds: 0.5 }
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
        { character: 'ghost', message: `What the hell!? You won! This cannot be real!` },
        { character: 'ghost', message: `My fans... Do you still love me? Do you still want to marry me?` },
        { message: `Excellent! You defeated ${CHARACTERS['ghost'].name}. A bonus of 10 minutes has been granted to you. You can proceed to the next location now.`, disappearAfterSeconds: 3, onCloseMessage: () => handleBossDefeated() }
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
              <span>{`GO ${CHARACTERS['ghost'].name.toUpperCase()}!`}</span>
              <img src={ghostFan  } />
            </div>
            <div className='fan-2'>
              <img src={ghostFan  } />
              <span>I AM YOUR BIGGEST FAN!</span>
            </div>
            <div className='fan-3'>
              <span>{`YOU'RE AWESOME! MARRY ME ${CHARACTERS['ghost'].name.toUpperCase()}!`}</span>
              <img src={ghostFan  } />
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
              <span>You play the role of the saboteur!</span>
                <span>{`You need to place ${numberOfArrowsToPlaceYet} arrows yet.`}</span>
                <span>Click on the board to place an arrow.</span>
                <span>Click again to change its direction.</span>
                <Button size='s' onClick={handleResetPlacedArrows}>Reset placed arrows</Button>
              </div> : <div className='arrows'>
                {isGameInProgress ? <>
                  <span>SPOOKY SPRINT IS IN PROGRESS!</span>
                </> : <>
                  <Button size='s' onClick={handleStartSpookySprint}>Start Spooky Sprint!</Button>
                  <Button size='s' onClick={handleResetPlacedArrows}>Reset placed arrows</Button>
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
