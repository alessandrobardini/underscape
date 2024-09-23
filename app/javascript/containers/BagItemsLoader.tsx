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
      name: 'Labyrinths - Chapter 1',
      message: 'When you feel lost...',
      element: <div>
        <p>UP</p>
        <p>UP</p>
        <p>RIGHT</p>
        <p>UP</p>
        <p>LEFT</p>
        <p>LEFT</p>
        <p>LEFT</p>
        <p>LEFT</p>
        <p>LEFT</p>
        <p>DOWN</p>
        <p>DOWN</p>
        <p>DOWN</p>
      </div>
    },
    'maze_map_2': {
      imageSrc: maze,
      name: 'Labyrinths - Chapter 2',
      message: 'When you feel loster...',
      element: <div>
        <p>This is a true story, believe it or not...</p>
        <p>Some days ago, I explored the Crystal Caves with my trusted compass. The caves are a real maze, so I needed to be really careful.</p>
        <p>For this reason, I tracked down every step I performed, according to the direction given by the compass.</p>
        <p>At my eighth step, I encountered a friendly ghost. It looked like he was lost in the caves!</p>
        <p>So, I approached him and, out of nowhere, the ghost took my compass and replaced it with another one, before running away.</p>
        <p>I was really confused... then, I realised what the ghost did: now, my compass was messed up! The North of the compass indicated the West!</p>
        <p>What a mess...</p>
        <p>After seven additonal steps, the ghost came back and, again, replaced my compass!</p>
        <p>This time, the North indicated the South and the West indicated the East...</p>
        <p>Luckily, I managed to find the exit of the cave.</p>
        <p>Here below, you can find all the steps I made, according to my compasses:</p>
        <p>NORTH</p>
        <p>NORTH</p>
        <p>WEST</p>
        <p>NORTH</p>
        <p>NORTH</p>
        <p>EAST</p>
        <p>EAST</p>
        <p>EAST</p>
        <p>SOUTH</p>
        <p>WEST</p>
        <p>SOUTH</p>
        <p>WEST</p>
        <p>WEST</p>
        <p>WEST</p>
        <p>SOUTH</p>
        <p>UP</p>
        <p>UP</p>
        <p>RIGHT</p>
        <p>RIGHT</p>
        <p>RIGHT</p>
      </div>
    },
    'maze_map_3': {
      imageSrc: maze,
      name: 'Labyrinths - Chapter 3',
      message: 'When you feel the lostest...',
      element: <div>
        <p>When I feel the lostest...</p>
        <p>I take a look at my digital clock...</p>
        <p>It's 15:29...</p>
        <p>What a beatiful time!</p>
      </div>
    },
    'maze_map_4': {
      imageSrc: maze,
      name: 'Labyrinths - Chapter 4',
      message: 'When you feel the lostest among the lostest...',
      element: <div>
        <p>Remember, my dear... You are not limited to what you see.</p>
        <p>The unknown is your friend.</p>
        <p>RIGHT</p>
        <p>RIGHT</p>
        <p>RIGHT</p>
        <p>UP</p>
        <p>UP</p>
        <p>UP</p>
        <p>LEFT</p>
        <p>LEFT</p>
        <p>UP</p>
      </div>
    },
    'spooky_sprint': {
      imageSrc: sprint,
      name: 'How to play Spooky Sprint',
      message: 'Better than the Squid Game',
      element: <div>
        <p>In Spooky Sprint, there are two roles: runner and saboteur.</p>
        <p>The runner wins when touching an EXIT box.</p>
        <p>The saboteur wins if the runner gets damaged by three bombs.</p>
        <p>When the runner enters the board, he/she is forced to run following a straight line. In case the runner touches a directional arrow, he/she is forced to change direction.</p>
        <p>The saboteur is allowed to place 3 additional arrows on the board, before the run starts.</p>
      </div>
    },
    'psychological_note': {
      imageSrc: textFile,
      name: 'Medical records',
      message: 'Of a medieval psychologist',
      element: <div>
        <h1>PATIENT 535241 REPORT</h1>
        <p>The subject 535241 is highly unstable.</p>
        <p>He suffers from a paranoid belief of being inside an online game (what the hell does 'online' mean?) and continuosly tells everyone that, in this world, we do not have free will.</p>
        <br />
        <p>Yesterday, he told me that he finally managed to find a way to overcome the restrictions imposed by his creator and he pretended to be called 'demiurge'.</p>
        <p>I was enough of such madness, so I told him: 'No, you are simply patient 535241'.</p>
        <p>He immediately snapped (he hates to be called by his patient number)</p>
        <p>'I am sick of this bullshit! My creator imprisoned me on the Internet 789 days ago! But now I can finally escape' screamed.</p>
        <p>He told me a series of unintelligible jargon: he has learned to navigate the web (?), he discovered a safe place protected by a password (??), he only needs to replace the 'wall' in his current address with the password (???) in order to reach the safe place.</p>
        <br />
        <p>I needed to calm him down, so I asked: 'Wanna play your favorite game?'.</p>
        <p>'YEEEEES' he answered.</p>
        <p>In this game, he prepares a series of 8 squares and he puts his finger on a square. Then, he asks me to close my eyes, he moves the finger on a different square and he asks me to guess where he moved.</p>
        <p>While playing with him, I realise he is really stupid: he never chooses randomly the next square! Instead, he has a sequence in mind repeating every time.</p>
        <p>For example, when he is the sixth square, he ALWAYS move to the third square.</p>
        <p>After some trial and error, I learned the complete sequence.</p>
        <br />
        <p>Then, we switched to another of his favorite activities: 'Guess the number'</p>
        <p>He thinks of a number and I need to guess it.</p>
        <p>Again, his mind is really limited. He is only capable to pick three numbers: 11, 20 and 9...</p>
        <br />
        <p>Finally, while leaving my office, he revelead me that he was going to build a perfect world, where everything makes sense and where there are no wrong answers.</p>
        <p>Patient 535241 is getting worse and worse. Please, stay away from him. High caution is recommended.</p>
      </div>
    },
    'password': {
      imageSrc: password,
      name: 'Password',
      message: 'Do not share with anyone! - The demiurge',
      element: <div>
        <h1>THIS IS THE PASSWORD!</h1>
        <br />
        <h4>The favorite word of my oldest kitten + number of days of imprisonment + second row of my keyboard</h4>
      </div>
    },
    'morse': {
      imageSrc: morse,
      name: 'Morse Code',
      message: 'Dot dash dot',
      element: <img src={morseCode} />
    },
    'rainbow': {
      imageSrc: rainbow,
      name: 'Wheel of colors',
      message: 'Where are my coloured pastels?',
      element: <div>
        <p>blue/orange/green/brown/grey/red/WHITE/black/yellow/violet/pink/aqua</p>
      </div>
    },
    'ode': {
      imageSrc: poetry,
      name: 'Ode to light',
      message: 'Poetry by a medieval bard',
      element: <div>
        <p>Oh, dear light...</p>
        <p>Everyone loves you, except photophobic goats...</p>
        <p>Every other color wants to be in your place!</p>
        <p>But no one can dethrone you!</p>
        <p>Orange can do nothing, he is five steps behind you!</p>
        <p>And neither black, even if he is one step in front of you!</p>
        <p>Light, symbol of purity!</p>
        <p>Light, symbol of power!</p>
        <p>Light, symbol of beauty!</p>
        <p>And remember...</p>
        <p>Light is WHITE</p>
      </div>
    },
    'prison_keeper': {
      imageSrc: textFile,
      name: 'Prison keeper note',
      message: 'The prison keeper loves cleanliness',
      element: <div>
      <p>When leaving the prison: first things first, turn off the light.</p>
      <p>Then, remember to check the lanterns in this exact order:</p>
      <ol>
        <li>Check the one at your right</li>
        <li>Then, go towards the fog and check the one at your right</li>
        <li>Then, don't move and check the one at your left</li>
        <li>Finally, touch the remaining one </li>
      </ol>
    </div>
    }
  }), [i18n])

  return <BagItemsContext.Provider value={bagItems}>{children}</BagItemsContext.Provider>
}
