import React, { useContext, useMemo } from 'react'
import hydrogen from 'images/hydrogen.jpg'
import textFile from 'images/text-file.jpg'
import spells from 'images/spells.jpg'
import maze from 'images/maze.png'
import sprint from 'images/spooky.png'
import password from 'images/password.png'
import morse from 'images/morse.png'
import rainbow from 'images/rainbow.png'
import poetry from 'images/poetry.jpeg'
import periodicTable from 'images/periodic_table.svg'
import morseCode from 'images/morse.svg'
import { TranslatorContext } from './TranslatorLoader';

export type ItemType = {
  imageSrc: string
  name: string
  message: string
  element?: JSX.Element
  action?: () => void
}

export const BagItemsContext = React.createContext<BagItems>(null)

type BagItems = { [key: string] : ItemType }

export const BagItemsLoader: React.FC = ({ children }) => {
  const i18n = useContext(TranslatorContext)
  const bagItems = useMemo(() => ({
    'periodic_table': {
      imageSrc: hydrogen,
      name: i18n.t('bag.items.periodic_table.name'),
      message: i18n.t('bag.items.periodic_table.description'),
      element: <img src={periodicTable} />
    },
    'principles_of_life': {
      imageSrc: textFile,
      name: i18n.t('bag.items.principles_of_life.name'),
      message: i18n.t('bag.items.principles_of_life.description'),
      element: <div>
        <p>{i18n.t('bag.items.principles_of_life.content.1')}</p>
        <p>{i18n.t('bag.items.principles_of_life.content.2')}</p>
        <p>{i18n.t('bag.items.principles_of_life.content.3')}</p>
        <p>{i18n.t('bag.items.principles_of_life.content.4')}</p>
        <p>{i18n.t('bag.items.principles_of_life.content.5')}</p>
      </div>
    },
    'book_of_spells': {
      imageSrc: spells,
      name: i18n.t('bag.items.book_of_spells.name'),
      message: i18n.t('bag.items.book_of_spells.description'),
      element: <div>
        <h4>{i18n.t('bag.items.book_of_spells.content.1')}</h4>
        <p><li>{i18n.t('bag.items.book_of_spells.content.2')}</li></p>
        <p><li>{i18n.t('bag.items.book_of_spells.content.3')}</li></p>
        <p><li>{i18n.t('bag.items.book_of_spells.content.4')}</li></p>
        <p><li>{i18n.t('bag.items.book_of_spells.content.5')}</li></p>
        <br/>
        <h4>{i18n.t('bag.items.book_of_spells.content.6')}</h4>
        <p><li>{i18n.t('bag.items.book_of_spells.content.7')}</li></p>
        <p><li>{i18n.t('bag.items.book_of_spells.content.8')}</li></p>
        <p><li>{i18n.t('bag.items.book_of_spells.content.9')}</li></p>
        <p><li>{i18n.t('bag.items.book_of_spells.content.10')}</li></p>
        <p><li>{i18n.t('bag.items.book_of_spells.content.11')}</li></p>
        <p><li>{i18n.t('bag.items.book_of_spells.content.12')}</li></p>
        <p><li>{i18n.t('bag.items.book_of_spells.content.13')}</li></p>
      </div>
    },
    'maze_map_1': {
      imageSrc: maze,
      name: i18n.t('bag.items.maze_map_1.name'),
      message: i18n.t('bag.items.maze_map_1.description'),
      element: <div>
        <p>{i18n.t('ghost.directions.up')}</p>
        <p>{i18n.t('ghost.directions.up')}</p>
        <p>{i18n.t('ghost.directions.right')}</p>
        <p>{i18n.t('ghost.directions.up')}</p>
        <p>{i18n.t('ghost.directions.left')}</p>
        <p>{i18n.t('ghost.directions.left')}</p>
        <p>{i18n.t('ghost.directions.left')}</p>
        <p>{i18n.t('ghost.directions.left')}</p>
        <p>{i18n.t('ghost.directions.left')}</p>
        <p>{i18n.t('ghost.directions.down')}</p>
        <p>{i18n.t('ghost.directions.down')}</p>
        <p>{i18n.t('ghost.directions.down')}</p>
      </div>
    },
    'maze_map_2': {
      imageSrc: maze,
      name: i18n.t('bag.items.maze_map_2.name'),
      message: i18n.t('bag.items.maze_map_2.description'),
      element: <div>
        <p>{i18n.t('bag.items.maze_map_2.content.1')}</p>
        <p>{i18n.t('bag.items.maze_map_2.content.2')}</p>
        <p>{i18n.t('bag.items.maze_map_2.content.3')}</p>
        <p>{i18n.t('bag.items.maze_map_2.content.4')}</p>
        <p>{i18n.t('bag.items.maze_map_2.content.5')}</p>
        <p>{i18n.t('bag.items.maze_map_2.content.6')}</p>
        <p>{i18n.t('bag.items.maze_map_2.content.7')}</p>
        <p>{i18n.t('bag.items.maze_map_2.content.8')}</p>
        <p>{i18n.t('bag.items.maze_map_2.content.9')}</p>
        <p>{i18n.t('bag.items.maze_map_2.content.10')}</p>
        <p>{i18n.t('bag.items.maze_map_2.content.11')}</p>
        <p>{i18n.t('ghost.directions.up')}</p>
        <p>{i18n.t('ghost.directions.up')}</p>
        <p>{i18n.t('ghost.directions.left')}</p>
        <p>{i18n.t('ghost.directions.up')}</p>
        <p>{i18n.t('ghost.directions.up')}</p>
        <p>{i18n.t('ghost.directions.right')}</p>
        <p>{i18n.t('ghost.directions.right')}</p>
        <p>{i18n.t('ghost.directions.right')}</p>
        <p>{i18n.t('ghost.directions.down')}</p>
        <p>{i18n.t('ghost.directions.left')}</p>
        <p>{i18n.t('ghost.directions.down')}</p>
        <p>{i18n.t('ghost.directions.left')}</p>
        <p>{i18n.t('ghost.directions.left')}</p>
        <p>{i18n.t('ghost.directions.left')}</p>
        <p>{i18n.t('ghost.directions.down')}</p>
        <p>{i18n.t('ghost.directions.up')}</p>
        <p>{i18n.t('ghost.directions.up')}</p>
        <p>{i18n.t('ghost.directions.right')}</p>
        <p>{i18n.t('ghost.directions.right')}</p>
        <p>{i18n.t('ghost.directions.right')}</p>
      </div>
    },
    'maze_map_3': {
      imageSrc: maze,
      name: i18n.t('bag.items.maze_map_3.name'),
      message: i18n.t('bag.items.maze_map_3.description'),
      element: <div>
        <p>{i18n.t('bag.items.maze_map_3.content.1')}</p>
        <p>{i18n.t('bag.items.maze_map_3.content.2')}</p>
        <p>{i18n.t('bag.items.maze_map_3.content.3')}</p>
        <p>{i18n.t('bag.items.maze_map_3.content.4')}</p>
        <p>{i18n.t('bag.items.maze_map_3.content.5')}</p>
      </div>
    },
    'maze_map_4': {
      imageSrc: maze,
      name: i18n.t('bag.items.maze_map_4.name'),
      message: i18n.t('bag.items.maze_map_4.description'),
      element: <div>
        <p>{i18n.t('bag.items.maze_map_4.content.1')}</p>
        <p>{i18n.t('bag.items.maze_map_4.content.2')}</p>
        <p>{i18n.t('bag.items.maze_map_4.content.3')}</p>
        <p>{i18n.t('ghost.directions.right')}</p>
        <p>{i18n.t('ghost.directions.right')}</p>
        <p>{i18n.t('ghost.directions.right')}</p>
        <p>{i18n.t('ghost.directions.up')}</p>
        <p>{i18n.t('ghost.directions.up')}</p>
        <p>{i18n.t('ghost.directions.up')}</p>
        <p>{i18n.t('ghost.directions.left')}</p>
        <p>{i18n.t('ghost.directions.left')}</p>
        <p>{i18n.t('ghost.directions.up')}</p>
      </div>
    },
    'spooky_sprint': {
      imageSrc: sprint,
      name: i18n.t('bag.items.spooky_sprint.name'),
      message: i18n.t('bag.items.spooky_sprint.description'),
      element: <div>
        <p>{i18n.t('bag.items.spooky_sprint.content.1')}</p>
        <p>{i18n.t('bag.items.spooky_sprint.content.2')}</p>
        <p>{i18n.t('bag.items.spooky_sprint.content.3')}</p>
        <p>{i18n.t('bag.items.spooky_sprint.content.4')}</p>
        <p>{i18n.t('bag.items.spooky_sprint.content.5')}</p>
      </div>
    },
    'psychological_note': {
      imageSrc: textFile,
      name: i18n.t('bag.items.psychological_note.name'),
      message: i18n.t('bag.items.psychological_note.description'),
      element: <div>
        <h1>{i18n.t('bag.items.psychological_note.content.1')}</h1>
        <p>{i18n.t('bag.items.psychological_note.content.2')}</p>
        <p>{i18n.t('bag.items.psychological_note.content.3')}</p>
        <p>{i18n.t('bag.items.psychological_note.content.4')}</p>
        <br />
        <p>{i18n.t('bag.items.psychological_note.content.5')}</p>
        <p>{i18n.t('bag.items.psychological_note.content.6')}</p>
        <p>{i18n.t('bag.items.psychological_note.content.7')}</p>
        <p>{i18n.t('bag.items.psychological_note.content.8')}</p>
        <p>{i18n.t('bag.items.psychological_note.content.9')}</p>
        <br />
        <p>{i18n.t('bag.items.psychological_note.content.10')}</p>
        <p>{i18n.t('bag.items.psychological_note.content.11')}</p>
        <p>{i18n.t('bag.items.psychological_note.content.12')}</p>
        <p>{i18n.t('bag.items.psychological_note.content.13')}</p>
        <p>{i18n.t('bag.items.psychological_note.content.14')}</p>
        <p>{i18n.t('bag.items.psychological_note.content.15')}</p>
        <br />
        <p>{i18n.t('bag.items.psychological_note.content.16')}</p>
        <p>{i18n.t('bag.items.psychological_note.content.17')}</p>
        <p>{i18n.t('bag.items.psychological_note.content.18')}</p>
        <br />
        <p>{i18n.t('bag.items.psychological_note.content.19')}</p>
        <p>{i18n.t('bag.items.psychological_note.content.20')}</p>
      </div>
    },
    'password': {
      imageSrc: password,
      name: i18n.t('bag.items.password.name'),
      message: i18n.t('bag.items.password.description'),
      element: <div>
        <h1>{i18n.t('bag.items.password.content.1')}</h1>
        <br />
        <h4>{i18n.t('bag.items.password.content.2')}</h4>
      </div>
    },
    'morse': {
      imageSrc: morse,
      name: i18n.t('bag.items.morse.name'),
      message: i18n.t('bag.items.morse.description'),
      element: <img src={morseCode} />
    },
    'rainbow': {
      imageSrc: rainbow,
      name: i18n.t('bag.items.rainbow.name'),
      message: i18n.t('bag.items.rainbow.description'),
      element: <div>
        <p>1. {i18n.t('goat.colors.blue')}</p>
        <p>2. {i18n.t('goat.colors.orange')}</p>
        <p>3. {i18n.t('goat.colors.green')}</p>
        <p>4. {i18n.t('goat.colors.brown')}</p>
        <p>5. {i18n.t('goat.colors.grey')}</p>
        <p>6. {i18n.t('goat.colors.white')}</p>
        <p>7. {i18n.t('goat.colors.red')}</p>
        <p>8. {i18n.t('goat.colors.black')}</p>
        <p>9. {i18n.t('goat.colors.yellow')}</p>
        <p>10. {i18n.t('goat.colors.violet')}</p>
        <p>11. {i18n.t('goat.colors.pink')}</p>
        <p>12. {i18n.t('goat.colors.aqua')}</p>
      </div>
    },
    'ode': {
      imageSrc: poetry,
      name: i18n.t('bag.items.ode.name'),
      message: i18n.t('bag.items.ode.description'),
      element: <div>
        <p>{i18n.t('bag.items.ode.content.1')}</p>
        <p>{i18n.t('bag.items.ode.content.2')}</p>
        <p>{i18n.t('bag.items.ode.content.3')}</p>
        <p>{i18n.t('bag.items.ode.content.4')}</p>
        <p>{i18n.t('bag.items.ode.content.5')}</p>
        <p>{i18n.t('bag.items.ode.content.6')}</p>
        <p>{i18n.t('bag.items.ode.content.7')}</p>
      </div>
    },
    'prison_keeper': {
      imageSrc: textFile,
      name: i18n.t('bag.items.prison_keeper.name'),
      message: i18n.t('bag.items.prison_keeper.description'),
      element: <div>
      <p>{i18n.t('bag.items.prison_keeper.content.1')}</p>
      <p>{i18n.t('bag.items.prison_keeper.content.2')}</p>
      <ol>
        <li>{i18n.t('bag.items.prison_keeper.content.3')}</li>
        <li>{i18n.t('bag.items.prison_keeper.content.4')}</li>
        <li>{i18n.t('bag.items.prison_keeper.content.5')}</li>
        <li>{i18n.t('bag.items.prison_keeper.content.6')}</li>
      </ol>
    </div>
    }
  }), [i18n])

  return <BagItemsContext.Provider value={bagItems}>{children}</BagItemsContext.Provider>
}
