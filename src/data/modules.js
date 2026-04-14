import { buildQuiz } from '../utils.js';
import { GLOSSARY, PRIOR_TO_PASSING } from './constants.js';
import {
  EA_GLOSSARY, EA_PREPARATION_REASONS, EA_WORKING_TOOLS,
  EA_CEREMONY_SECTIONS, EA_FACTS_QA, FILL_BLANK_EA,
} from './ea-data.js';
import {
  OPENING_DIALOGUE, CEREMONY_SECTIONS, FC_WORKING_TOOLS,
  FC_FACTS_QA, FILL_BLANK_FC, FC_OBLIGATION_CARDS, FC_TOOLS_QUIZ,
  EA_TOOLS_QUIZ,
} from './fc-data.js';

export const EA_MODULES = [
  { id:'ea-vocab',     icon:'📚', degree:'ea', title:'EA Vocabulary',          sub:'15 key terms of the First Degree',                 type:'flash',    xp:50,  data:EA_GLOSSARY },
  { id:'ea-prep',      icon:'🎭', degree:'ea', title:'Preparation & Reasons',  sub:'Why you were prepared as you were',                type:'flash',    xp:60,  data:EA_PREPARATION_REASONS },
  { id:'ea-tools',     icon:'🪛', degree:'ea', title:'EA Working Tools',       sub:'24-inch gauge, common gavel & chisel',             type:'tools',    xp:60,  toolsData:EA_WORKING_TOOLS, quizItems:EA_TOOLS_QUIZ, degreeLabel:'The three working tools of an Entered Apprentice Freemason', chargeText:'Bro ..., I now present to your notice the working tools of an EAF. They are the 24-inch gauge, the common gavel, and the chisel. The 24-inch gauge is to measure the work, the common gavel to knock off all superfluous knobs and excrescences, and the chisel to further smooth and prepare the stone. But as we are met not as operative, but rather as Free and Accepted or Symbolic Masons, it is the moral to be derived from the contemplation of these tools to which I would direct your attention.' },
  { id:'ea-ceremony',  icon:'🕯️', degree:'ea', title:'Ceremony of Initiation', sub:'Admission, obligation & secrets at the pedestals', type:'ritual',   xp:80,  sections:EA_CEREMONY_SECTIONS },
  { id:'ea-facts',     icon:'🔑', degree:'ea', title:'EA Knowledge Quiz',      sub:'Test your First Degree knowledge',                 type:'quiz',     xp:80,  quizData:buildQuiz(EA_FACTS_QA), label:'First Degree Knowledge' },
  { id:'ea-fillblank', icon:'✏️', degree:'ea', title:'Fill the Blanks — EA',   sub:'Decode every abbreviation of the First Degree',    type:'fillblank',xp:70,  data:FILL_BLANK_EA },
];

export const FC_MODULES = [
  { id:'glossary',     icon:'📖', degree:'fc', title:'Masonic Vocabulary',           sub:'35 terms every Mason should know',                    type:'flash',    xp:60,  data:GLOSSARY },
  { id:'officers',     icon:'🎖️', degree:'fc', title:'Officers, Positions & Jewels',  sub:'Who sits where, and what it means',                  type:'officers', xp:80 },
  { id:'prior',        icon:'🗝️', degree:'fc', title:'Prior to Passing Q&A',          sub:'The questions you must answer perfectly',             type:'flash',    xp:70,  data:PRIOR_TO_PASSING },
  { id:'fc-facts',     icon:'🏛️', degree:'fc', title:'Fellow Craft Knowledge',        sub:'Key facts, signs, symbols and words',                 type:'quiz',     xp:80,  quizData:buildQuiz(FC_FACTS_QA), label:'Fellow Craft Knowledge' },
  { id:'opening',      icon:'🕍', degree:'fc', title:'Opening in Second Degree',      sub:'The full ritual dialogue for opening',                type:'ritual',   xp:60,  sections:[{ title:'Opening the Lodge in the Second Degree', exchanges:OPENING_DIALOGUE }] },
  { id:'ceremony',     icon:'🤝', degree:'fc', title:'Ceremony of Passing',           sub:"Dialogue at the wardens' pedestals — fully filled in", type:'ritual',   xp:90,  sections:CEREMONY_SECTIONS },
  { id:'fc-tools',     icon:'🔨', degree:'fc', title:'FC Working Tools',              sub:'The Square, Level and Plumb Rule',                    type:'tools',    xp:70,  toolsData:FC_WORKING_TOOLS, quizItems:FC_TOOLS_QUIZ, degreeLabel:'The three principal working tools of a Fellow Craft Freemason', chargeText:'Bro ..., I now present to your notice the working tools of a Fellow Craft Freemason. They are the square, level and plumb rule. As we are met not as operative but rather as Free and Accepted or Symbolic Masons, it is the moral to be derived from the contemplation of these tools to which I would direct your attention.' },
  { id:'obligation',   icon:'📜', degree:'fc', title:'The Obligation',               sub:'Key phrases of the FC Obligation',                    type:'flash',    xp:60,  data:FC_OBLIGATION_CARDS },
  { id:'fc-fillblank', icon:'✏️', degree:'fc', title:'Fill the Blanks — FC',          sub:'Decode every abbreviation of the Second Degree',      type:'fillblank',xp:70,  data:FILL_BLANK_FC },
];

export const ALL_MODULES = [...EA_MODULES, ...FC_MODULES];
