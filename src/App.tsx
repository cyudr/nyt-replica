import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Bookmark, 
  BookOpen, 
  MessageSquare, 
  Share2, 
  RotateCcw, 
  TrendingUp, 
  ChevronRight, 
  Award, 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudLightning, 
  TrendingDown, 
  Check, 
  Sliders, 
  Type as FontIcon, 
  Feather, 
  Sparkles, 
  User, 
  Clock, 
  Plus, 
  X, 
  Heart, 
  Newspaper, 
  Zap,
  Globe,
  Milestone
} from 'lucide-react';

// Interfaces for our application
interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  category: string;
  date: string;
  readingTime: string;
  imageUrl?: string;
  imageCaption: string;
  commentsCount: number;
  trending?: boolean;
}

interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
  votes: number;
  hasVoted?: 'up' | 'down';
}

type Theme = 'sepia' | 'light' | 'obsidian';

// Curated initial NYT news stories catalog
const INITIAL_ARTICLES: Article[] = [
  {
    id: 'global-plastics-treaty',
    title: 'Global Accord Targets Plastics, Aiming to Curb Pollution by 2040',
    summary: 'Negotiators from 175 nations reached a landmark consensus in Nairobi, establishing a legally binding framework to phase out single-use plastics. The treaty marks the most significant environmental pact since the Paris Agreement, though enforcement mechanisms remain a point of contention among major producers.',
    content: 'NAIROBI, Kenya — In what is being hailed as the most significant environmental agreement since the 2015 Paris Climate Accord, diplomats and representatives from 175 nations successfully concluded intense negotiations today to draft a legally binding treaty addressing global plastic pollution.\n\nThe landmark agreement, finalized after a grueling five-day summit, commits signatory nations to create comprehensive policies to curb the production, design, and disposal of single-use plastics. Under the treaty framework, nations must outline measurable national action plans to systematically phase out non-recyclable materials, reduce macro-plastics, and invest heavily in sustainable alternatives.\n\nWhile conservation groups celebrated the consensus as a monumental step forward, several delegations expressed concerns. Developing nations highlighted the massive financial and technical resources required to restructure waste systems, urging the creation of a global transition fund. Meanwhile, major oil and petrochemical-producing nations argued successfully for language that balances production limitations with recycling innovations.\n\n"We are witnessing history," remarked Dr. Elizabeth Cheng, one of the lead coordinators. "There is still difficult legislative and enforcement work ahead, but Nairobi has broken the decades-old stalemate. We now have a blueprint to rid our rivers, shorelines, and oceans of plastics by 2040."\n\nImplementation is slated to begin as early as next year, with subsequent working sessions scheduled in Geneva to codify auditing systems, standard designations, and enforcement penalties for defaulting states.',
    author: 'ELIZABETH CHENG and MARCUS VANCE',
    category: 'world',
    date: 'Thursday, May 21, 2026',
    readingTime: '5 min read',
    imageCaption: 'A coastal shoreline cluttered with debris undergoing cleanup in Southeast Asia.',
    commentsCount: 142,
    trending: true
  },
  {
    id: 'inflation-cooling',
    title: 'Inflation Cools for Third Month, Raising Hopes for Federal Rate Cuts',
    summary: 'The Consumer Price Index declined more than economists projected last month, driven by lower fuel price points and stable food pricing. Wall Street surged in response as investors gain confidence.',
    content: 'WASHINGTON — The domestic economy showed fresh signs of cooling last month as key inflation metrics receded for the third consecutive month, offering a sigh of relief to consumers and fueling optimistic rallies across global financial markets.\n\nThe Department of Labor reported that the Consumer Price Index (CPI) rose at an annualized pace of 2.8%, down from 3.1% the previous month. This marks the lowest baseline rate since late 2021. Core CPI, which excludes volatile food and energy sectors, also nudged down to 3.0%, signaling that broader pressure is slowly dissipating from the service economy.\n\neconomists point to several contributing catalysts. Supply chains have fully normalized, helping reduce wholesale pricing on durable goods. Additionally, global crude oil production increases have pulled fuel prices down, which trickled into reduced freight logistics costs.\n\n"The Fed\'s rigorous campaign of interest rate hikes is demonstrating its intended lag effect," said senior macro analyst Aris Vance. "We expect discussions during the next FOMC meeting to pivot heavily toward the timeline and size of the first rate cuts, likely arriving as soon as the late summer quarter."',
    author: 'SARAH JENKINS',
    category: 'business',
    date: 'Wednesday, May 20, 2026',
    readingTime: '4 min read',
    imageCaption: 'Brokerage desks on Wall Street reacting to the positive Department of Labor market reports.',
    commentsCount: 89,
    trending: true
  },
  {
    id: 'spacex-payload-record',
    title: 'SpaceX Launch Sets New Heavy Payload Record for Starship Iteration',
    summary: 'In an early morning launch from Starbase, Texas, the booster successfully deployed a massive payload of 42 next-gen satellites into low-Earth orbit, validating structural upgrades.',
    content: 'BOCA CHICA, Texas — Lighting up the early morning Gulf coast sky, SpaceX successfully launched its latest Starship vehicle prototype today, setting a historic payload weight record and marking a milestone in reusable heavy-lift orbital flight.\n\nThe integrated rocket system lifted off smoothly from the Starbase pad. Liquid oxygen and methane boosters burned perfectly for three minutes before performing an immaculate hot-staging separation procedure. While the massive booster returned to make a soft splashdown landing in ocean waters, the upper stage spacecraft accelerated into its intended transfer orbit.\n\nThe primary mission goal—deploying 42 next-generation Starlink constellation satellites weighing a combined 120 metric tons—was completed with precision. The heavy payload capacity represents a 40% increase over any previous launch capability.\n\n"Today we demonstrated that heavy lifting to orbit isn’t just possible; it can be incredibly consistent," Elon Vance, mission support manager, told reporters. "This payload configuration opens the commercial highway to deep lunar logistical drops and eventually crewed Martian runs."',
    author: 'DIANA CHEN',
    category: 'science',
    date: 'Wednesday, May 20, 2026',
    readingTime: '3 min read',
    imageCaption: 'The Starship vehicle ascending past the launch tower on its historical path.',
    commentsCount: 74
  },
  {
    id: 'urban-micro-gardens',
    title: 'The Hidden Power of Urban Micro-Gardens in Mitigating Concrete Heat',
    summary: 'Metropolitan studies in Phoenix and Madrid reveal how small, pocket-sized community gardens are cooling neighborhood blocks and boosting local biodiversity in high-density areas.',
    content: 'PHOENIX — As global temperatures rise, urban centers are struggling with the "heat island" effect, where dense concrete, asphalt, and steel buildings retain warmth long after the sun sets. However, researchers have identified an elegant, decentralized antidote: urban micro-gardens.\n\nA collaborative study published by environmental scientists in Phoenix and Madrid shows that transforming vacant 50-square-meter dirt parcels into heavily vegetated community micro-plots can reduce surrounding local pavement temperatures by up to 5.4°F (3°C) on hot afternoons.\n\nBy dense planting of native shrubs, low-lying flora, and micro-canopy trees, these community sanctuaries foster a pocket of continuous evaporative cooling. Additionally, they serve as crucial migratory stepping-stones for urban bee populations and local songbirds.\n\n"It turns out we don\'t always need several hundred acres of municipal parks to make citizens comfortable," noted project lead Maria Alvardo. "Grid-patterned micro-plots are inexpensive, easily managed by neighborhoods, and immediately lower home air conditioning loads in surrounding blocks."',
    author: 'MARIA ALVARADO',
    category: 'us',
    date: 'Tuesday, May 19, 2026',
    readingTime: '3 min read',
    imageCaption: 'Volunteers planting native sage brush and micro-canopies in a transformed Phoenix alleyway.',
    commentsCount: 52
  },
  {
    id: 'cop-debt-ceiling',
    title: 'The G.O.P. is Flirting With a Debt Ceiling Disaster, Again',
    summary: 'Opinion: Lawmakers are utilizing the nations credit rating as a political bargaining chip. It is a hazardous game that threatens global financial stability and targets working-class retirement funds.',
    content: 'The cyclical theater of Washington debt negotiations has returned, and with it, the same reckless playbook. Once again, house leaders are threatening to default on our national obligations unless sweeping, unpopular legislative riders are appended to the budget.\n\nLet us be clear: the debt ceiling is not a license for future spending. It is a mandate to pay for bills congress has already authorized. Utilizing the full faith and credit of the world\'s largest economy as an ideological lever is equivalent to taking the global financial system hostage.\n\nShould standard operations freeze, treasury yields will spike, interest rates on mortgages will jump, and millions of middle-class retirement plans will evaporate. Our leaders must pass a clean debt authorization immediately. Flirting with economic catastrophe is not clever statesmanship—it is active negligence.',
    author: 'THE EDITORIAL BOARD',
    category: 'opinion',
    date: 'Thursday, May 21, 2026',
    readingTime: '6 min read',
    imageCaption: 'The silhouette of the Capitol building in Washington D.C. as negotiations drag on.',
    commentsCount: 310,
    trending: true
  },
  {
    id: 'trade-schools-tech',
    title: 'A New Generation of Tech Workers Embraces Trade Schools over Universities',
    summary: 'Frustrated by rising tuition fees and tech-sector layoffs, young professionals are opting for condensed, practical vocational schooling in clean energy grids and high-precision machinery.',
    content: 'CHICAGO — For decades, the high school counselor’s mantra was simple: graduate, attend an elite university, acquire a four-year degree, and land a comfortable laboratory or software desk job. But for a growing segment of Generation Z, that promise has lost its luster.\n\nConfronted by exorbitant university student debt, automation anxieties, and recent sweeps of corporate tech layoffs, young high school graduates are increasingly flocking to tech-centric vocational trade schools.\n\nModern vocational centers are training individuals in highly complex, high-demand technical skill sets: managing automated manufacturing robots, operating modern electrical vehicle grids, maintaining sustainable wind turbine networks, and coding micro-controller chips on factory lines.\n\n"In two years, I acquired three industry certifications, carried zero debt, and signed a starting contract for $85,000," explained 21-year-old Leah Rosales. "While my childhood friends are writing cover letters and worrying about rent, I am out in the field managing clean energy sub-stations. The tech sector didn\'t shrink; it just moved into physical infrastructure."',
    author: 'KENNETH HIGGINS',
    category: 'tech',
    date: 'Monday, May 18, 2026',
    readingTime: '4 min read',
    imageCaption: 'A vocational student calibrating high-precision laser-cutting equipment in a Chicago lab.',
    commentsCount: 201
  },
  {
    id: 'blockbuster-fading-opinion',
    title: 'Why the Summer Blockbuster is Fading Into History',
    summary: 'Opinion: The algorithmic flatlining of cinema, saturated CGI sequels, and simultaneous stream releases have stripped the seasonal blockbuster of its theatrical marvel.',
    content: 'There was a time when summer arrived with a singular cultural expectation: the pilgrimage to a darkened, air-conditioned theater to witness a massive, original cinematic spectacle. We stood in block-long lines for movies that defined our collective memory.\n\nToday, that seasonal magic has been replaced by an uninspiring conveyor belt of intellectual property. Audiences are subjected to endless, fatigue-inducing sequels, CGI-saturated comic universes, and spin-offs designed by marketing committees rather than visionaries.\n\nWhen every movie is designed to fit a streaming algorithm, nothing feels like an event. We have traded the communal joy of standard cinema for isolated couch viewing. If cinema is to survive, studios must take risks on singular directory voices rather than digital sequels.',
    author: 'ROSS DOUTHAT',
    category: 'opinion',
    date: 'Tuesday, May 19, 2026',
    readingTime: '5 min read',
    imageCaption: 'A historic retro theater marquee in downtown Boston reflecting changing movie consumer trends.',
    commentsCount: 114
  },
  {
    id: 'digital-style-algorithm',
    title: 'The Algorithm Isn’t Coming for Your Job, It Is Coming for Your Style',
    summary: 'Opinion: Generative AI models are homogenizing cultural aesthetics. From interior design to high-fashion design, standard trends are flattening under uniform suggestions.',
    content: 'The conversation surrounding artificial intelligence focuses largely on occupational threat. Economists debate which white-collar jobs are on the cutting block. But what if the true casualty of the algorithm isn\'t our productivity—but our personal eccentricity?\n\nAs generative frameworks dominate design pipelines, recommendation systems are funneling human stylists, designers, and visual artists into a middle-of-the-road consensus. Standard layouts, palette trends, and clothing catalog drops are beginning to blend into a single, highly corporate aesthetic.\n\nTrue style requires friction, error, and personal deviance of taste. When we let algorithms curate our environments, we outsource the beautiful, erratic process of self-expression. We must resist the uniform convenience of default generations and embrace the untidy, personal style that defines human art.',
    author: 'TRESSIE MCMILLAN COTTOM',
    category: 'opinion',
    date: 'Monday, May 18, 2026',
    readingTime: '5 min read',
    imageCaption: 'Grid of identically styled, minimalist modern chairs generated by a curated corporate design catalog.',
    commentsCount: 95
  },
  {
    id: 'deep-sea-chile-trench',
    title: 'Stunning Creatures Discovered in Underserved Deep Ocean Trench Off Chile',
    summary: 'An oceanographic expedition mapped unexplored depths of the Peru-Chile Trench, cataloging fourteen new marine species, including transparent jelly invertebrates.',
    content: 'VALPARAÍSO, Chile — Marine biologists aboard the research vessel *Abyssus* returned to port yesterday with an extraordinary bounty: high-definition footage and biological samples of fourteen previously unknown marine species residing in the extreme depths of the Atacama (Peru-Chile) Trench.\n\nUsing a state-of-the-art robotic deep-sea submersible capable of enduring hydrostatic pressures exceeding 11,000 pounds per square inch, the scientific team conducted the first thorough floor-mapping survey of the trench, which plunges over 26,000 feet deep.\n\nAmong the cataloged organisms are a highly transparent, bioluminescent segmented sea cucumber, a unique predatory crustacean that uses specialized fan appendages to trap organic marine snow, and a spectacular species of glass sponge that hosts glowing colonies of micro-bacterial symbionts.\n\n"We are looking at an entirely alternative biosphere," exclaimed chief scientist Dr. Arthur Vance. "These creatures survive without sunlight in freezing temperatures near sulfur vents. Their cellular structures could hold revolutionary answers for pharmaceutical composites and genetic engineering resilience."',
    author: 'DR. HELENA ROSSI',
    category: 'science',
    date: 'Sunday, May 17, 2026',
    readingTime: '4 min read',
    imageCaption: 'A high-contrast robotic photo of the newly discovered bioluminescent deep-ocean invertebrate.',
    commentsCount: 61
  },
  {
    id: 'broadway-revival-interactive',
    title: 'Broadway Embraces Interactive Sensory Tech to Renew Live Theater Interest',
    summary: 'Producers are deploying high-density haptic seats, spatial audio grids, and responsive projection maps to craft an immersive experience, competing with digital streaming headsets.',
    content: 'NEW YORK — As theater capitals grapple with sluggish ticket sales, Broadway is turning to cutting-edge technology to redefine what it feels like to witness a live stage production.\n\nThree major musicals opening this season have integrated "Sensory Theater Fields"—an array of immersive technologies designed to engage audiences beyond standard sight and hearing. The installations include custom acoustic seating that transmits tactile bass frequencies directly to the theatergoers, three-dimensional directional speaker arrays that make whispering vocals spin around the theater, and dynamic laser projections that cast shifting weather, foliage, and scenery onto the theater walls based on the actors\' live step pacing.\n\n"We aren\'t trying to build video games on stage," says veteran Broadway director Marcus James. "Instead, we are amplifying the tactile reality of physical theater. You don\'t just watch the storm in the second act; your seats vibrate, the air cools, and the sound of raindrops sweeps through the rows. It is an experience you simply cannot reproduce in a VR headset or on a flat living room screen."',
    author: 'CLARA SULLIVAN',
    category: 'arts',
    date: 'Saturday, May 16, 2026',
    readingTime: '3 min read',
    imageCaption: 'Projections of celestial constellations washing over a fully filled, vintage Manhattan theater crowd.',
    commentsCount: 38
  }
];

// Initial weather simulations
const WEATHER_DATA = {
  'New York': { temp: '68°F', low: '54°', high: '70°', desc: 'Sunny and crisp', code: 'sun' },
  'London': { temp: '57°F', low: '46°', high: '60°', desc: 'Light drizzle', code: 'rain' },
  'Tokyo': { temp: '72°F', low: '59°', high: '75°', desc: 'Partly cloudy', code: 'cloud' },
  'Paris': { temp: '64°F', low: '51°', high: '67°', desc: 'Scattered clouds', code: 'cloud' },
  'San Francisco': { temp: '59°F', low: '49°', high: '63°', desc: 'Afternoon coastal fog', code: 'cloud' }
};

// Initial financial indexes
const MARKET_INDEXES = [
  { name: 'S&P 500', value: '5,082.91', change: '+24.15', percent: '+0.48%', trend: 'up', sparkline: [40, 42, 39, 45, 48, 47, 52] },
  { name: 'DOW JONES', value: '38,989.84', change: '-43.12', percent: '-0.11%', trend: 'down', sparkline: [55, 52, 53, 50, 46, 48, 42] },
  { name: 'NASDAQ', value: '16,091.92', change: '+182.20', percent: '+1.14%', trend: 'up', sparkline: [25, 28, 32, 30, 39, 41, 48] },
  { name: 'BRENT CRUDE', value: '82.94', change: '+1.02', percent: '+1.24%', trend: 'up', sparkline: [10, 12, 14, 13, 16, 17, 19] }
];

// Curated quiz data
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'How many nations negotiated the historic consensus treaty to curb global plastic pollution in Nairobi?',
    options: ['95 nations', '125 nations', '175 nations', '210 nations'],
    correct: 2,
    explanation: 'Negotiators from 175 nations reached a consensus to forge a legally binding global plastics treaty.'
  },
  {
    id: 2,
    question: 'Which city studies were cited in the article about the cooling effects of metropolitan micro-gardens?',
    options: ['New York and Boston', 'Phoenix and Madrid', 'Chicago and Paris', 'Los Angeles and Tokyo'],
    correct: 1,
    explanation: 'The research analyzed metropolitan plots in Phoenix and Madrid to test block-level temperature cooling.'
  },
  {
    id: 3,
    question: 'What is the target timeline defined in the Nairobi accord to phase out major plastic pollution?',
    options: ['By 2030', 'By 2035', 'By 2040', 'By 2050'],
    correct: 2,
    explanation: 'The negotiators aim to achieve robust systems to cease single-use plastic waste by 2040.'
  }
];

export default function App() {
  // Persistence local storage handles
  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('nyt_bento_articles');
    return saved ? JSON.parse(saved) : INITIAL_ARTICLES;
  });

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem('nyt_bento_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  const [commentsMap, setCommentsMap] = useState<Record<string, Comment[]>>(() => {
    const saved = localStorage.getItem('nyt_bento_comments');
    if (saved) return JSON.parse(saved);
    // Initialize with mock comments
    const init: Record<string, Comment[]> = {};
    INITIAL_ARTICLES.forEach(art => {
      init[art.id] = [
        { id: 'c1', author: 'Arthur Penton', text: 'This represents a long-overdue legislative victory. Our marine ecosystems are at a critical breaking point.', date: 'May 21, 2026', votes: 42 },
        { id: 'c2', author: 'Siobhan K.', text: 'The main issue will always be municipal auditing and enforcement. Without penalties, agreements are just empty ink.', date: 'May 21, 2026', votes: 19 },
        { id: 'c3', author: 'Rene G.', text: 'Interesting points raised about the petrochemical counterarguments. A balanced transition is needed so packaging costs do not skyrocket food items.', date: 'May 20, 2026', votes: 7 }
      ];
    });
    return init;
  });

  // Theme support
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('nyt_bento_theme');
    return (saved as Theme) || 'sepia';
  });

  // State handles
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<keyof typeof WEATHER_DATA>('New York');
  
  // Custom Breaking News Lede State (Editor roleplay)
  const [isLedeEditorOpen, setIsLedeEditorOpen] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customSummary, setCustomSummary] = useState('');
  const [customAuthor, setCustomAuthor] = useState('');
  const [customCategory, setCustomCategory] = useState('world');
  const [customContent, setCustomContent] = useState('');

  // Reader View state
  const [readingArticle, setReadingArticle] = useState<Article | null>(null);
  const [readerFontSize, setReaderFontSize] = useState<'normal' | 'large' | 'xlarge'>('large');
  const [readerFontFamily, setReaderFontFamily] = useState<'serif' | 'sans'>('serif');
  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [newCommentText, setNewCommentText] = useState('');

  // Daily Quiz state
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Mini Wordle Game state
  const wordleSecretWord = 'TIMES';
  const [wordleGuesses, setWordleGuesses] = useState<string[]>([]);
  const [currentWordleInput, setCurrentWordleInput] = useState('');
  const [wordleStatus, setWordleStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [wordleMessage, setWordleMessage] = useState('');

  // Mini Crossword Game state
  // 3x3 layout. Black cell at (1,1) indexed 0-8:
  // Row 0: Index 0 (Black), Index 1: T, Index 2: O
  // Row 1: Index 3: N,       Index 4: E, Index 5: W
  // Row 2: Index 6: T,       Index 7: N, Index 8 (Black)
  // Let's create a solid small 3x3 crossword that corresponds to clues.
  // We can let the layout represent:
  // [ # ] [ L ] [ O ]
  // [ N ] [ E ] [ W ]
  // [ O ] [ T ] [ # ]
  // Words: 
  // Across 1: Small woodwind instrument ending (LO) or look (LO)
  // Across 4: Fresh, modern category (NEW)
  // Across 6: Music pitch descriptor (OT) -> No, let's make it simpler:
  // Row 0: [ N ] [ E ] [ W ]
  // Row 1: [ E ] [ Y ] [ E ]
  // Row 2: [ WEB  ] (Internet host)
  // This is a perfect 3x3 grid! No black boxes!
  // Cell indexed 0-8:
  // Row 0: N, E, W
  // Row 1: E, Y, E
  // Row 2: W, E, B
  const crosswordAnswers = ['N', 'E', 'W', 'E', 'Y', 'E', 'W', 'E', 'B'];
  const [crosswordInputs, setCrosswordInputs] = useState<string[]>(Array(9).fill(''));
  const [crosswordChecked, setCrosswordChecked] = useState(false);
  const [crosswordSuccess, setCrosswordSuccess] = useState(false);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('nyt_bento_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('nyt_bento_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('nyt_bento_comments', JSON.stringify(commentsMap));
  }, [commentsMap]);

  useEffect(() => {
    localStorage.setItem('nyt_bento_theme', theme);
  }, [theme]);

  // Date formatted beautifully
  const getFormattedDate = () => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date('2026-05-21T08:52:57Z'));
  };

  // Filter & Search articles
  const filteredArticles = articles.filter(art => {
    const matchesCat = selectedCategory === 'all' || art.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = searchQuery === '' || 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Headline Breaking news story (Top left feature block model)
  // If there are filtered articles, we pick the first one as lead
  const mainLeadArticle = filteredArticles.find(art => art.category === selectedCategory || selectedCategory === 'all') || filteredArticles[0];
  const secondaryStories = filteredArticles.filter(art => art.id !== (mainLeadArticle?.id || ''));

  // Toggle bookmark function
  const handleToggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  // Submit custom article (Editor simulator)
  const handlePublishCustomLede = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle || !customSummary || !customContent) return;

    const newArticle: Article = {
      id: `custom-article-${Date.now()}`,
      title: customTitle,
      summary: customSummary,
      content: customContent,
      author: customAuthor || 'ASSOCIATED PRESS',
      category: customCategory,
      date: getFormattedDate(),
      readingTime: `${Math.max(1, Math.ceil(customContent.split(/\s+/).length / 200))} min read`,
      imageCaption: 'Submitted file image from the Newsroom desk editor.',
      commentsCount: 0
    };

    setArticles(prev => [newArticle, ...prev]);
    setSelectedCategory(customCategory);
    
    // Clear form and close dialog
    setCustomTitle('');
    setCustomSummary('');
    setCustomContent('');
    setCustomAuthor('');
    setIsLedeEditorOpen(false);
  };

  // Wordle Guess submission
  const handleWordleSubmit = () => {
    const guess = currentWordleInput.toUpperCase().trim();
    if (guess.length !== 5) {
      setWordleMessage('Word must be exactly 5 letters.');
      return;
    }

    if (wordleGuesses.includes(guess)) {
      setWordleMessage('Already guessed that word.');
      return;
    }

    const updatedGuesses = [...wordleGuesses, guess];
    setWordleGuesses(updatedGuesses);
    setCurrentWordleInput('');
    setWordleMessage('');

    if (guess === wordleSecretWord) {
      setWordleStatus('won');
      setWordleMessage('Spectacular! You cracked Wordle.');
    } else if (updatedGuesses.length >= 6) {
      setWordleStatus('lost');
      setWordleMessage(`Game Over! Word was ${wordleSecretWord}`);
    }
  };

  const handleWordleReset = () => {
    setWordleGuesses([]);
    setCurrentWordleInput('');
    setWordleStatus('playing');
    setWordleMessage('');
  };

  // Crossword checker
  const handleCrosswordCellChange = (index: number, val: string) => {
    const fresh = [...crosswordInputs];
    fresh[index] = val.toUpperCase().slice(0, 1);
    setCrosswordInputs(fresh);
    setCrosswordChecked(false);
  };

  const handleCheckCrossword = () => {
    const isCorrect = crosswordInputs.every((char, idx) => char === crosswordAnswers[idx]);
    setCrosswordChecked(true);
    setCrosswordSuccess(isCorrect);
  };

  const handleResetCrossword = () => {
    setCrosswordInputs(Array(9).fill(''));
    setCrosswordSuccess(false);
    setCrosswordChecked(false);
  };

  // Submit readers commentary
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentAuthor || !newCommentText || !readingArticle) return;

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      author: newCommentAuthor,
      text: newCommentText,
      date: 'Just now',
      votes: 1
    };

    setCommentsMap(prev => {
      const existing = prev[readingArticle.id] || [];
      return {
        ...prev,
        [readingArticle.id]: [newComment, ...existing]
      };
    });

    setNewCommentAuthor('');
    setNewCommentText('');
  };

  const handleVoteComment = (commentId: string, dir: 'up' | 'down') => {
    if (!readingArticle) return;
    setCommentsMap(prev => {
      const artComments = prev[readingArticle.id] || [];
      const updated = artComments.map(c => {
        if (c.id === commentId) {
          let scoreDiff = 0;
          let newVote: 'up' | 'down' | undefined = dir;

          if (c.hasVoted === dir) {
            // Undo vote
            scoreDiff = dir === 'up' ? -1 : 1;
            newVote = undefined;
          } else {
            // Change vote or initial vote
            if (c.hasVoted) {
              scoreDiff = dir === 'up' ? 2 : -2;
            } else {
              scoreDiff = dir === 'up' ? 1 : -1;
            }
          }
          return { ...c, votes: c.votes + scoreDiff, hasVoted: newVote };
        }
        return c;
      });
      return { ...prev, [readingArticle.id]: updated };
    });
  };

  // Quiz submission
  const handleAnswerQuiz = (optionIdx: number) => {
    if (selectedAnswer !== null) return; // Answered already
    setSelectedAnswer(optionIdx);
    const q = QUIZ_QUESTIONS[currentQuizIndex];
    if (optionIdx === q.correct) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    setSelectedAnswer(null);
    if (currentQuizIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setQuizScore(0);
    setQuizCompleted(false);
  };

  // Theme styling configurations based on selectedTheme state
  const getThemeClasses = () => {
    switch (theme) {
      case 'sepia':
        return {
          bg: 'bg-[#faf6ee]',
          card: 'bg-white border-[#dfd7c5] shadow-xs text-[#1a1917]',
          text: 'text-[#1a1917]',
          muted: 'text-[#615c50]',
          border: 'border-[#dfd7c5]',
          accent: 'text-amber-800 bg-amber-50 hover:bg-amber-100',
          badge: 'bg-amber-900 text-amber-50',
          divider: 'border-[#dfd7c5]',
          buttonActive: 'bg-[#1a1917] text-white',
          tabActive: 'border-b-2 border-amber-800 text-amber-900 font-bold',
          gridHighlight: 'bg-amber-50/50'
        };
      case 'obsidian':
        return {
          bg: 'bg-[#0b0c0d]',
          card: 'bg-[#131518] border-[#25282d] shadow-2xs text-[#eaebed]',
          text: 'text-[#eaebed]',
          muted: 'text-[#9ca3af]',
          border: 'border-[#25282d]',
          accent: 'text-amber-400 bg-neutral-900 hover:bg-neutral-800',
          badge: 'bg-[#faf6ee] text-black',
          divider: 'border-[#25282d]',
          buttonActive: 'bg-neutral-100 text-neutral-900',
          tabActive: 'border-b-2 border-amber-500 text-amber-400 font-bold',
          gridHighlight: 'bg-[#1a1d22]'
        };
      case 'light':
      default:
        return {
          bg: 'bg-neutral-50',
          card: 'bg-white border-neutral-200 shadow-sm text-neutral-900',
          text: 'text-neutral-900',
          muted: 'text-neutral-500',
          border: 'border-neutral-200',
          accent: 'text-neutral-800 bg-neutral-100 hover:bg-neutral-200',
          badge: 'bg-black text-white',
          divider: 'border-neutral-200',
          buttonActive: 'bg-neutral-900 text-white',
          tabActive: 'border-b-2 border-black text-neutral-900 font-bold',
          gridHighlight: 'bg-neutral-50'
        };
    }
  };

  const style = getThemeClasses();

  return (
    <div id="nyt-root-layout" className={`min-h-screen font-sans ${style.bg} ${style.text} transition-colors duration-200 pb-12`}>
      
      {/* Top Banner & Ad Simulator */}
      <div id="top-ticker" className={`text-center py-2 text-[11px] font-sans tracking-wide uppercase border-b ${style.border} ${theme === 'obsidian' ? 'bg-[#131518]' : 'bg-neutral-100'} px-4`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>{getFormattedDate()}</span>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-red-600 animate-pulse">● LIVE COVERAGE</span>
            <span className="hidden md:inline text-neutral-500">|</span>
            <button 
              id="desktop-newsletter-btn"
              onClick={() => {
                alert("Thank you for subscribing to NYT Bento newsletters!");
              }}
              className="hover:underline font-bold"
            >
              NEWSLETTER SIGNUP
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Historical/Visual Theme Controller Tray */}
        <div id="theme-controls" className="flex justify-between items-center py-3 border-b border-dashed border-neutral-300">
          <div className="flex items-center gap-1.5 md:gap-3">
            <Newspaper className="w-5 h-5 text-neutral-500" />
            <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline text-neutral-500">EDITION TYPOGRAPHY:</span>
            <div className="flex bg-neutral-200/60 dark:bg-neutral-800/80 p-0.5 rounded-lg text-xs font-semibold">
              <button 
                id="theme-sepia-btn"
                onClick={() => setTheme('sepia')}
                className={`px-3 py-1.5 rounded-md transition-all ${theme === 'sepia' ? 'bg-white text-amber-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-800'}`}
              >
                Newspaper Cream
              </button>
              <button 
                id="theme-light-btn"
                onClick={() => setTheme('light')}
                className={`px-3 py-1.5 rounded-md transition-all ${theme === 'light' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-800'}`}
              >
                Modern Crisp
              </button>
              <button 
                id="theme-obsidian-btn"
                onClick={() => setTheme('obsidian')}
                className={`px-3 py-1.5 rounded-md transition-all ${theme === 'obsidian' ? 'bg-[#131518] text-white shadow-xs' : 'text-neutral-500 hover:text-neutral-300'}`}
              >
                Bento Obsidian
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Newsroom Simulator Button */}
            <button
              id="open-editor-btn"
              onClick={() => setIsLedeEditorOpen(true)}
              className="flex items-center gap-2 bg-neutral-900 text-white hover:bg-neutral-800 text-xs font-bold tracking-tight px-3 py-1.5 rounded-lg shadow-sm cursor-pointer transition-transform hover:scale-105"
            >
              <Feather className="w-4 h-4 text-amber-400" />
              <span>LEDE WRITER</span>
            </button>

            {/* Weather City Quick Dropdown */}
            <div className="relative text-xs font-bold flex items-center gap-1">
              <Cloud className="w-4 h-4 text-neutral-400" />
              <select 
                id="weather-city-selector"
                value={selectedCity} 
                onChange={(e) => setSelectedCity(e.target.value as keyof typeof WEATHER_DATA)}
                className={`p-1 pr-4 bg-transparent outline-none cursor-pointer border-r ${style.border}`}
              >
                {Object.keys(WEATHER_DATA).map(city => (
                  <option key={city} value={city} className="bg-white text-black">{city}</option>
                ))}
              </select>
              <span className="font-semibold ml-1">{WEATHER_DATA[selectedCity].temp}</span>
            </div>
          </div>
        </div>

        {/* Masthead Header Container */}
        <header id="nyt-masthead" className={`flex flex-col items-center py-6 border-b ${style.border} mb-6`}>
          {/* Weather & Date Row descriptor */}
          <div className="w-full flex justify-between items-center text-xs font-semibold tracking-wider px-1 uppercase text-neutral-500 mb-2">
            <span className="text-left font-serif italic">VOL. CLXXV... No. 60,883</span>
            <span className="hidden sm:inline">Today’s Paper — Bento Grid Design</span>
            <span className="text-right flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
              {WEATHER_DATA[selectedCity].desc}
            </span>
          </div>

          {/* Logo Heading (Playfair Serif typography matching NYT design blueprint) */}
          <h1 
            id="nyt-logo-title"
            className="text-5xl sm:text-7xl md:text-8xl my-3 font-serif tracking-tighter select-none cursor-pointer text-center relative font-black italic hover:text-amber-800 transition-colors"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
          >
            The New York Times
            <span className="absolute bottom-1 right-0 sm:right-4 translate-y-3 px-1 py-0.5 text-[8px] sm:text-[10px] font-sans font-bold tracking-widest bg-amber-800 text-amber-50 rounded select-none not-italic uppercase">
              BENTO EDITION
            </span>
          </h1>

          {/* Main Category Filter Navigation Bar */}
          <div 
            id="categories-nav"
            className={`w-full border-t border-b ${style.border} mt-6 py-2 flex items-center justify-between overflow-x-auto scrollbar-none gap-2 text-xs font-bold uppercase transition-all`}
          >
            <div className="flex gap-4 md:gap-7 mx-auto whitespace-nowrap px-4 py-1">
              {[
                { label: 'All News', id: 'all' },
                { label: 'World', id: 'world' },
                { label: 'U.S.', id: 'us' },
                { label: 'Politics', id: 'politics' },
                { label: 'Business', id: 'business' },
                { label: 'Tech & Science', id: 'tech' },
                { label: 'Science', id: 'science' },
                { label: 'Opinion', id: 'opinion' },
                { label: 'Arts & Culture', id: 'arts' }
              ].map(cat => (
                <button
                  key={cat.id}
                  id={`cat-nav-link-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`cursor-pointer transition-colors hover:text-amber-800 py-1 ${selectedCategory === cat.id ? style.tabActive : style.muted}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Global Search and Info bar */}
        <div id="search-filter-belt" className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input 
              id="search-input-field"
              type="text"
              placeholder="Search current Bento coverage..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-4 py-2 text-sm rounded-lg border ${style.border} ${theme === 'obsidian' ? 'bg-[#181a1d] text-white' : 'bg-white text-black'} outline-none focus:ring-1 focus:ring-amber-500`}
            />
            {searchQuery && (
              <button 
                id="clear-search-btn"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-600 uppercase"
              >
                Clear
              </button>
            )}
          </div>
          
          <div className="flex gap-3 text-xs w-full sm:w-auto overflow-x-auto whitespace-nowrap self-end sm:self-center">
            {bookmarks.length > 0 && (
              <span className={`px-2.5 py-1 rounded bg-neutral-200/50 dark:bg-neutral-800 text-neutral-500 font-semibold flex items-center gap-1.5`}>
                <Bookmark className="w-3.5 h-3.5" /> Bookmarked ({bookmarks.length})
              </span>
            )}
            <span className={`px-2.5 py-1 rounded bg-neutral-200/50 dark:bg-neutral-800 text-neutral-500 font-semibold flex items-center gap-1.5`}>
              <TrendingUp className="w-3.5 h-3.5 text-red-500" /> 3 Stories Trending
            </span>
          </div>
        </div>

        {/* NO SEARCH RESULTS FALLBACK */}
        {filteredArticles.length === 0 && (
          <div id="no-results-panel" className={`py-16 text-center border rounded-xl ${style.card} px-6`}>
            <Newspaper className="w-12 h-12 mx-auto text-neutral-400 mb-4" />
            <h3 className="text-xl font-bold font-serif mb-2">No coverage matched your search</h3>
            <p className="text-sm text-neutral-500 max-w-md mx-auto">
              We couldn’t find any articles matching &ldquo;{searchQuery}&rdquo;. Try checking your spelling or navigating to another news category.
            </p>
            <button 
              id="reset-newsfilter-btn"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-6 px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs font-bold hover:bg-neutral-800"
            >
              Reset Search & Filter
            </button>
          </div>
        )}

        {filteredArticles.length > 0 && (
          /* CORE BENTO GRID NEWS PANEL */
          <div 
            id="nyt-news-grid"
            className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
          >
            
            {/* COLUMN 1-6 (Span 6): THE PRIMARY BREAKING COVERAGE LEDE ARTICLE */}
            {mainLeadArticle && (
              <section 
                id={`bento-cell-primary-${mainLeadArticle.id}`}
                onClick={() => setReadingArticle(mainLeadArticle)}
                className={`md:col-span-6 flex flex-col border p-6 rounded-2xl cursor-pointer ${style.card} hover:shadow-md transition-shadow group h-full justify-between relative`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400 flex items-center gap-1">
                      <Globe className="w-3 h-3 text-red-500" />
                      FRONT PAGE LEDE / {mainLeadArticle.category}
                    </span>
                    <button 
                      id={`bookmark-btn-${mainLeadArticle.id}`}
                      onClick={(e) => handleToggleBookmark(mainLeadArticle.id, e)}
                      className="text-neutral-400 hover:text-amber-800 transition-colors p-1"
                      title={bookmarks.includes(mainLeadArticle.id) ? "Remove Bookmark" : "Save Story"}
                    >
                      <Bookmark className={`w-4 h-4 ${bookmarks.includes(mainLeadArticle.id) ? 'fill-amber-800 text-amber-800' : ''}`} />
                    </button>
                  </div>

                  <article>
                    <h2 
                      id="main-lede-title"
                      className="text-3xl font-serif sm:text-4xl font-extrabold leading-tight mb-3 group-hover:text-amber-800 transition-colors tracking-tight"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {mainLeadArticle.title}
                    </h2>
                    
                    <p className="text-sm leading-relaxed text-neutral-500 mb-5 font-serif line-clamp-4">
                      {mainLeadArticle.summary}
                    </p>

                    {/* Image Block placeholder with beautiful gradient and caption */}
                    <div className="w-full h-64 bg-neutral-100 rounded-xl mb-4 relative overflow-hidden border border-neutral-200">
                      <div className="absolute inset-0 bg-linear-to-b from-neutral-100 to-neutral-200/50 flex flex-col justify-center items-center text-center p-6 text-neutral-400">
                        {/* High-quality vector illustration representing article style */}
                        <div className="text-xs uppercase font-semibold text-neutral-500 tracking-wider mb-2 flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-amber-500" /> Premium Photo Associated Press
                        </div>
                        <p className="text-[11px] px-8 italic font-serif leading-snug line-clamp-3 text-neutral-600">
                          &ldquo;{mainLeadArticle.imageCaption}&rdquo;
                        </p>
                      </div>
                      <div className="absolute top-3 left-3 bg-neutral-900/10 px-2 py-0.5 rounded text-[9px] uppercase tracking-wider font-semibold font-sans text-neutral-700">
                        Nairobi Press Group
                      </div>
                    </div>
                  </article>
                </div>

                <div className="pt-4 border-t border-dashed border-neutral-200 dark:border-neutral-800 flex justify-between items-center text-xs">
                  <div>
                    <span id="main-lede-author" className="font-bold uppercase tracking-tight text-neutral-500">{mainLeadArticle.author}</span>
                    <span className="mx-2 text-neutral-300">|</span>
                    <span className="text-neutral-400">{mainLeadArticle.readingTime}</span>
                  </div>
                  <span className="flex items-center gap-1 text-neutral-400 font-semibold bg-neutral-100 dark:bg-neutral-900 px-2.5 py-1 rounded-full text-[10px]">
                    <MessageSquare className="w-3.5 h-3.5" /> {mainLeadArticle.commentsCount} Comments
                  </span>
                </div>
              </section>
            )}

            {/* COLUMN 7-9 (Span 3): SECONDARY COLUMN (BENTO SMALL STORIES AND MARKETS CARD) */}
            <section className="md:col-span-3 flex flex-col gap-6 h-full">
              
              {/* MINI MARKETS INDEX WIDGET (Bento style) */}
              <div id="markets-bento-card" className={`border p-4 rounded-2xl ${style.card}`}>
                <h3 className="text-xs font-bold tracking-widest uppercase border-b pb-2 mb-3 text-neutral-400 flex items-center justify-between">
                  <span>MARKET TRACKER</span>
                  <sapn className="text-[10px] lowercase text-green-500 font-normal">Updated minute-by-minute</sapn>
                </h3>
                
                <div id="market-indexes-list" className="flex flex-col gap-3">
                  {MARKET_INDEXES.map((idx, i) => (
                    <div key={idx.name} id={`market-item-${i}`} className="flex justify-between items-center border-b border-dashed border-neutral-100 dark:border-neutral-800 pb-2 last:border-b-0 last:pb-0">
                      <div>
                        <div className="font-bold text-xs">{idx.name}</div>
                        <div className="text-[11px] text-neutral-400 font-mono">{idx.value}</div>
                      </div>

                      {/* SVG Line Sparkchart */}
                      <svg className="w-14 h-6 text-neutral-300" viewBox="0 0 60 20">
                        <path
                          d={`M ${idx.sparkline.map((val, xIdx) => `${(xIdx / (idx.sparkline.length - 1)) * 60} ${20 - val}`).join(' L ')}`}
                          fill="none"
                          stroke={idx.trend === 'up' ? '#10b981' : '#ef4444'}
                          strokeWidth="2"
                        />
                      </svg>

                      <div className="text-right">
                        <div className={`text-xs font-bold font-mono ${idx.trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                          {idx.change}
                        </div>
                        <div className={`text-[10px] font-medium font-mono ${idx.trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                          {idx.percent}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECONDARY ARTICLES */}
              {secondaryStories.slice(0, 2).map((art, i) => (
                <div 
                  key={art.id}
                  id={`secondary-story-card-${art.id}`}
                  onClick={() => setReadingArticle(art)}
                  className={`border p-5 rounded-2xl cursor-pointer ${style.card} hover:shadow-md transition-shadow group`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">{art.category}</span>
                    <button 
                      id={`bookmark-btn-sec-${art.id}`}
                      onClick={(e) => handleToggleBookmark(art.id, e)}
                      className="text-neutral-400 hover:text-amber-800 transition-colors"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${bookmarks.includes(art.id) ? 'fill-amber-800 text-amber-800' : ''}`} />
                    </button>
                  </div>
                  
                  <h3 className="font-serif text-lg font-bold leading-snug group-hover:text-amber-800 transition-colors mb-2">
                    {art.title}
                  </h3>
                  
                  <p className="text-xs text-neutral-500 line-clamp-3 mb-3">
                    {art.summary}
                  </p>

                  <div className="flex justify-between items-center text-[10px] text-neutral-400 font-semibold pt-2 border-t border-neutral-100 dark:border-neutral-800">
                    <span className="uppercase">{art.author}</span>
                    <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {art.commentsCount}</span>
                  </div>
                </div>
              ))}

            </section>

            {/* COLUMN 10-12 (Span 3): OPINION, PUZZLES, AND VALUE-ADDED WIDGETS */}
            <section id="column-opinion-puzzles" className="md:col-span-3 flex flex-col gap-6">
              
              {/* EDITORIAL COLUMN SELECTION */}
              <div 
                id="editorial-opinion-pento-card"
                className={`border p-5 rounded-2xl ${style.card}`}
              >
                <h4 className="text-xs font-sans font-black tracking-widest border-b pb-1.5 mb-3 uppercase text-neutral-400 flex items-center justify-between">
                  <span>EDITORIAL OPINION</span>
                  <Newspaper className="w-3.5 h-3.5 text-zinc-400" />
                </h4>
                
                <div className="flex flex-col gap-4">
                  {articles.filter(a => a.category === 'opinion').slice(0, 3).map((art, idx) => (
                    <div 
                      key={art.id} 
                      id={`opinion-link-${art.id}`}
                      onClick={() => setReadingArticle(art)}
                      className="pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800 last:border-b-0 last:pb-0 cursor-pointer group"
                    >
                      <p className="text-[10px] font-sans font-extrabold uppercase text-neutral-400 mb-1">
                        {art.author}
                      </p>
                      <h5 className="text-sm font-serif italic font-medium leading-snug group-hover:text-amber-800 transition-colors">
                        &ldquo;{art.title}&rdquo;
                      </h5>
                    </div>
                  ))}
                </div>
              </div>

              {/* INTEGRATED MINI WORDLE GAME */}
              <div id="wordle-bento-card" className={`border p-5 rounded-2xl ${style.card}`}>
                <div className="flex justify-between items-center border-b pb-2 mb-3">
                  <h4 className="text-xs font-black tracking-widest uppercase text-neutral-400 flex items-center gap-1.5">
                    <span className="bg-emerald-600 text-white p-0.5 rounded font-mono">W</span>
                    <span>MINI WORDLE GAME</span>
                  </h4>
                  <button 
                    id="wordle-reset-btn"
                    onClick={handleWordleReset}
                    className="text-neutral-400 hover:text-amber-800 p-1"
                    title="Reset Wordle Game"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-[11px] text-neutral-400 mb-3 font-medium leading-tight">
                  Guess the five-letter secret news word in 6 tries.
                </p>

                {/* WORDLE GRID LOG */}
                <div id="wordle-grid" className="grid grid-rows-6 gap-1 mb-3">
                  {Array(6).fill(null).map((_, rowIdx) => {
                    const guess = wordleGuesses[rowIdx] || '';
                    return (
                      <div key={rowIdx} className="grid grid-cols-5 gap-1">
                        {Array(5).fill(null).map((_, colIdx) => {
                          const char = guess[colIdx] || (rowIdx === wordleGuesses.length ? currentWordleInput[colIdx] || '' : '');
                          let bgClass = 'bg-neutral-100 dark:bg-neutral-900 text-neutral-400 border-neutral-200 dark:border-neutral-800';
                          
                          if (wordleGuesses[rowIdx]) {
                            if (char === wordleSecretWord[colIdx]) {
                              bgClass = 'bg-emerald-600 text-white border-transparent';
                            } else if (wordleSecretWord.includes(char)) {
                              bgClass = 'bg-amber-600 text-white border-transparent';
                            } else {
                              bgClass = 'bg-neutral-400 text-white border-transparent';
                            }
                          }

                          return (
                            <div 
                              key={colIdx} 
                              className={`aspect-square flex items-center justify-center font-bold text-sm tracking-tight border rounded-sm ${bgClass}`}
                            >
                              {char}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>

                {/* Wordle Keyboard Inputs */}
                {wordleStatus === 'playing' ? (
                  <div className="flex gap-1.5 items-center">
                    <input
                      id="wordle-text-input"
                      type="text"
                      maxLength={5}
                      placeholder="Type a 5-letter word..."
                      value={currentWordleInput}
                      onChange={(e) => setCurrentWordleInput(e.target.value.slice(0, 5).toUpperCase())}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleWordleSubmit();
                      }}
                      className={`w-full p-2 text-xs border rounded outline-none focus:ring-1 focus:ring-amber-500 font-mono tracking-widest ${theme === 'obsidian' ? 'bg-[#181a1d] text-white border-zinc-700' : 'bg-white text-black'}`}
                    />
                    <button
                      id="wordle-submit-btn"
                      onClick={handleWordleSubmit}
                      className="px-3 py-2 bg-emerald-600 text-white rounded text-xs font-bold hover:bg-emerald-700 cursor-pointer"
                    >
                      ENTER
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className={`text-xs font-bold mb-2 ${wordleStatus === 'won' ? 'text-emerald-500 animate-bounce' : 'text-red-500'}`}>
                      {wordleMessage}
                    </p>
                    <button 
                      id="wordle-replay-btn"
                      onClick={handleWordleReset}
                      className="px-4 py-1.5 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-bold rounded-lg text-xs"
                    >
                      Play Again
                    </button>
                  </div>
                )}
                {wordleMessage && wordleStatus === 'playing' && (
                  <p className="text-[10px] text-red-500 font-semibold mt-1">
                    {wordleMessage}
                  </p>
                )}
              </div>

              {/* DYNAMIC WEEKLY NEWS QUIZ (Bento style) */}
              <div id="quiz-bento-card" className={`border p-5 rounded-2xl ${style.card}`}>
                <div className="flex justify-between items-center border-b pb-2 mb-3">
                  <h4 className="text-xs font-black tracking-widest uppercase text-neutral-400 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>DAILY COGNITIVE QUIZ</span>
                  </h4>
                  <button 
                    id="quiz-reset-btn"
                    onClick={handleResetQuiz}
                    className="text-neutral-400 hover:text-amber-800 p-1"
                    title="Reset Weekly Quiz"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                {!quizCompleted ? (
                  <div>
                    <span className="text-[10px] tracking-wider uppercase font-bold text-amber-800">
                      QUESTION {currentQuizIndex + 1} OF {QUIZ_QUESTIONS.length}
                    </span>
                    <p className="text-xs font-bold font-serif my-2 leading-relaxed">
                      {QUIZ_QUESTIONS[currentQuizIndex].question}
                    </p>

                    <div className="flex flex-col gap-1.5 mt-3">
                      {QUIZ_QUESTIONS[currentQuizIndex].options.map((opt, i) => {
                        let btnStyle = `border ${style.border} ${theme === 'obsidian' ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'}`;
                        if (selectedAnswer !== null) {
                          if (i === QUIZ_QUESTIONS[currentQuizIndex].correct) {
                            btnStyle = 'bg-emerald-500 text-white border-transparent';
                          } else if (i === selectedAnswer) {
                            btnStyle = 'bg-red-500 text-white border-transparent';
                          } else {
                            btnStyle = `opacity-60 border ${style.border}`;
                          }
                        }

                        return (
                          <button
                            key={i}
                            id={`quiz-option-${i}`}
                            disabled={selectedAnswer !== null}
                            onClick={() => handleAnswerQuiz(i)}
                            className={`w-full text-left p-2.5 text-xs rounded-lg transition-all font-semibold ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {selectedAnswer !== null && (
                      <div className="mt-4">
                        <p className="text-[11px] text-neutral-500 bg-neutral-100 dark:bg-neutral-900 border dark:border-neutral-800 p-2.5 rounded-lg leading-relaxed">
                          <strong className="text-neutral-700 dark:text-neutral-200">Explanation:</strong> {QUIZ_QUESTIONS[currentQuizIndex].explanation}
                        </p>
                        
                        <button
                          id="quiz-next-btn"
                          onClick={handleNextQuiz}
                          className="mt-3 w-full py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg text-xs font-bold hover:scale-101 transition-transform"
                        >
                          {currentQuizIndex < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'Check Final Quiz Score'}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-2">
                    <p className="text-2xl font-black font-serif text-teal-600 mb-1">{quizScore} / {QUIZ_QUESTIONS.length}</p>
                    <p className="text-xs font-bold mb-3">
                      {quizScore === QUIZ_QUESTIONS.length ? 'Masterful! You are a perfect New York Times Reader.' : 'Good attempt! Read more items on the front page.'}
                    </p>
                    <button
                      id="quiz-replay-btn"
                      onClick={handleResetQuiz}
                      className="px-4 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-bold rounded-lg hover:bg-neutral-800 shadow-sm"
                    >
                      Retry Quiz Let’s Go
                    </button>
                  </div>
                )}
              </div>

              {/* INTEGRATED MINI CROSSWORD PUZZLE */}
              <div id="crossword-bento-card" className={`border p-4 rounded-2xl ${style.card}`}>
                <div className="flex justify-between items-center border-b pb-2 mb-2">
                  <h4 className="text-xs font-black tracking-widest uppercase text-neutral-400 flex items-center gap-1.5">
                    <span className="bg-amber-600 text-white p-0.5 rounded font-mono">C</span>
                    <span>3X3 MINI CROSSWORD</span>
                  </h4>
                  <button 
                    id="crossword-reset-btn"
                    onClick={handleResetCrossword}
                    className="text-neutral-400 hover:text-amber-800 p-1"
                    title="Reset Crossword grid"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex gap-4 items-center">
                  {/* Grid 3x3 */}
                  <div className="grid grid-cols-3 gap-1 w-24 h-24">
                    {Array(9).fill(null).map((_, idx) => (
                      <input
                        key={idx}
                        id={`crossword-cell-${idx}`}
                        type="text"
                        maxLength={1}
                        value={crosswordInputs[idx]}
                        onChange={(e) => handleCrosswordCellChange(idx, e.target.value)}
                        className={`w-full aspect-square text-center font-bold uppercase text-sm border rounded outline-none focus:bg-amber-50 dark:focus:bg-zinc-800 ${
                          crosswordChecked && crosswordInputs[idx] === crosswordAnswers[idx] 
                            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500' 
                            : crosswordChecked && crosswordInputs[idx] !== ''
                              ? 'bg-red-500/10 border-red-500 text-red-500'
                              : theme === 'obsidian' ? 'bg-[#181a1d] text-white border-zinc-700' : 'bg-white text-zinc-900 border-zinc-200'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Clues */}
                  <div className="flex-1 text-[10px]">
                    <p className="font-bold uppercase text-neutral-400 mb-1">Clues Across:</p>
                    <p className="mb-1 leading-tight"><strong className="text-neutral-500">Row 1:</strong> Category for breaking reporting (NEW)</p>
                    <p className="mb-1 leading-tight"><strong className="text-neutral-500">Row 2:</strong> Visual viewing organ (EYE)</p>
                    <p className="mb-1 leading-tight"><strong className="text-neutral-500">Row 3:</strong> Online portal host (WEB)</p>
                  </div>
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    id="crossword-check-btn"
                    onClick={handleCheckCrossword}
                    className="flex-1 py-1 px-3 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-bold rounded-lg text-xs"
                  >
                    Check Answers
                  </button>
                </div>

                {crosswordChecked && (
                  <p className={`text-[10px] font-bold mt-2 text-center ${crosswordSuccess ? 'text-emerald-500 text-lg blink' : 'text-red-500'}`}>
                    {crosswordSuccess ? '✓ Grid Correct!' : '✗ Some cells require revision.'}
                  </p>
                )}
              </div>

            </section>

          </div>
        )}

        {/* REST OF GENERAL STORIES GRID BELOW PRIMARY BLOCK */}
        {filteredArticles.length > 2 && (
          <div id="additional-bento-stories" className="mt-8">
            <h3 className="text-sm font-black tracking-widest border-b pb-1.5 mb-6 text-neutral-400 uppercase">
              ADDITIONAL COVERAGE IN THIS SECTION
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {filteredArticles.slice(2, 6).map((art, idx) => (
                <div 
                  key={art.id}
                  id={`additional-story-card-${idx}`}
                  onClick={() => setReadingArticle(art)}
                  className={`border p-4 rounded-2xl cursor-pointer ${style.card} hover:shadow-md transition-all group duration-150`}
                >
                  <p className="text-[10px] font-bold text-amber-800 uppercase mb-2">{art.category}</p>
                  <h4 className="font-serif font-bold text-base group-hover:text-amber-800 leading-snug mb-2 line-clamp-3">
                    {art.title}
                  </h4>
                  <p className="text-xs text-neutral-500 line-clamp-3 mb-4 leading-relaxed">
                    {art.summary}
                  </p>
                  <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex justify-between text-[10px] text-neutral-400">
                    <span className="uppercase">{art.author}</span>
                    <span>{art.readingTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* FOOTER METADATA (Bento style) */}
      <footer id="nyt-footer" className="max-w-7xl mx-auto px-4 md:px-6 mt-16">
        <div className={`border-t-2 ${style.border} pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans text-neutral-500 uppercase font-semibold`}>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <span className="font-bold text-neutral-800 dark:text-neutral-200">© 22066 The New York Times Company</span>
            <span className="font-serif lowercase text-neutral-400 font-normal">bento replica edition</span>
            <span className="cursor-pointer hover:underline">Privacy Policy</span>
            <span className="cursor-pointer hover:underline">Terms of Service</span>
            <span className="cursor-pointer hover:underline">Help & Guides</span>
          </div>

          <div className="flex gap-4">
            <button 
              id="footer-back-to-top"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-1.5 focus:outline-none hover:text-amber-800"
            >
              <span>Back to Top</span>
              <RotateCcw className="w-3.5 h-3.5 rotate-90" />
            </button>
          </div>
        </div>
      </footer>

      {/* READ READING STORY ARTICLE VIEW MODAL CONTAINER BACKGROUND */}
      {readingArticle && (
        <div 
          id="reader-modal-bg" 
          className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto"
          onClick={() => setReadingArticle(null)}
        >
          <div 
            id="reader-modal-content"
            className={`w-full max-w-3xl rounded-3xl p-6 md:p-8 max-h-[90vh] overflow-y-auto relative ${theme === 'obsidian' ? 'bg-[#131518] text-white border border-[#25282c]' : 'bg-[#faf6ee] text-[#121212] border border-[#e3dfd5]'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Controls Toolbar */}
            <div className="flex justify-between items-center pb-3 border-b border-neutral-300 dark:border-zinc-800 mb-6">
              
              {/* Resizer widget */}
              <div className="flex items-center gap-2">
                <FontIcon className="w-4 h-4 text-neutral-500" />
                <span className="text-xs font-bold uppercase text-neutral-500 hidden sm:inline">FONT FORMAT:</span>
                
                <div className="flex bg-neutral-200/50 dark:bg-neutral-800 p-0.5 rounded-lg text-xs leading-none">
                  {/* Sans vs Serif toggle */}
                  <button 
                    id="font-serif-btn"
                    onClick={() => setReaderFontFamily('serif')}
                    className={`px-2.5 py-1 rounded-md font-bold ${readerFontFamily === 'serif' ? 'bg-white text-zinc-900 shadow-xs' : 'text-neutral-500'}`}
                  >
                    Serif
                  </button>
                  <button 
                    id="font-sans-btn"
                    onClick={() => setReaderFontFamily('sans')}
                    className={`px-2.5 py-1 rounded-md font-bold ${readerFontFamily === 'sans' ? 'bg-white text-zinc-900 shadow-xs' : 'text-neutral-500'}`}
                  >
                    Sans
                  </button>
                </div>

                <div className="flex bg-neutral-200/50 dark:bg-neutral-800 p-0.5 rounded-lg text-xs leading-none">
                  <button 
                    id="size-normal-btn"
                    onClick={() => setReaderFontSize('normal')}
                    className={`px-2 py-1 rounded-md font-bold ${readerFontSize === 'normal' ? 'bg-white text-zinc-900' : 'text-neutral-500'}`}
                    title="Normal font size"
                  >
                    A
                  </button>
                  <button 
                    id="size-large-btn"
                    onClick={() => setReaderFontSize('large')}
                    className={`px-2 py-1 rounded-md font-bold ${readerFontSize === 'large' ? 'bg-white text-zinc-900' : 'text-neutral-500'}`}
                    title="Medium dynamic size"
                  >
                    A+
                  </button>
                  <button 
                    id="size-xlarge-btn"
                    onClick={() => setReaderFontSize('xlarge')}
                    className={`px-2 py-1 rounded-md font-bold ${readerFontSize === 'xlarge' ? 'bg-white text-zinc-900' : 'text-neutral-500'}`}
                    title="Extra large editorial scope"
                  >
                    A++
                  </button>
                </div>
              </div>

              {/* Action Buttons right */}
              <div className="flex items-center gap-3">
                <button
                  id="modal-bookmark-toggle"
                  onClick={() => handleToggleBookmark(readingArticle.id)}
                  className={`p-2 rounded-xl border ${style.border} hover:bg-neutral-100 dark:hover:bg-zinc-800 cursor-pointer transition-colors`}
                  title={bookmarks.includes(readingArticle.id) ? "Remove Bookmark" : "Save Article"}
                >
                  <Bookmark className={`w-4 h-4 ${bookmarks.includes(readingArticle.id) ? 'fill-amber-800 text-amber-800' : 'text-neutral-500'}`} />
                </button>
                
                <button
                  id="close-reader-modal-btn"
                  onClick={() => setReadingArticle(null)}
                  className={`p-2 rounded-xl border ${style.border} hover:bg-neutral-100 dark:hover:bg-zinc-800 cursor-pointer transition-colors`}
                >
                  <X className="w-4 h-4 text-neutral-500" />
                </button>
              </div>
            </div>

            {/* Core editorial rendering */}
            <div className={readerFontFamily === 'serif' ? 'font-serif' : 'font-sans'}>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded bg-amber-900 text-amber-50 uppercase tracking-widest font-sans font-bold text-[9px]">
                  {readingArticle.category}
                </span>
                <span className="text-xs uppercase text-neutral-400 font-sans tracking-wide">
                  Published {readingArticle.date}
                </span>
              </div>

              <h1 
                id="modal-article-title"
                className="text-3xl md:text-5xl font-black leading-tight tracking-tight mb-4 text-[#1a1917] dark:text-neutral-100"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {readingArticle.title}
              </h1>

              <p className="text-lg text-neutral-500 italic mb-6 leading-relaxed font-sans pr-4">
                {readingArticle.summary}
              </p>

              {/* Reading time & Journalist credit */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-zinc-800 mb-6 text-sm font-sans text-neutral-400">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-amber-800" />
                  <span className="font-extrabold uppercase text-neutral-700 dark:text-neutral-300">{readingArticle.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{readingArticle.readingTime}</span>
                </div>
              </div>

              {/* Styled Editorial Body text container */}
              <div 
                id="modal-article-body"
                className={`leading-relaxed tracking-normal font-sans pr-2 overflow-x-hidden whitespace-pre-wrap text-[#2a2927] dark:text-neutral-200 mb-8 ${
                  readerFontSize === 'normal' 
                    ? 'text-sm' 
                    : readerFontSize === 'large' 
                      ? 'text-base md:text-lg' 
                      : 'text-xl'
                }`}
                style={readerFontFamily === 'serif' ? { fontFamily: "'Lora', Georgia, serif", lineHeight: "1.75" } : { lineHeight: "1.75" }}
              >
                {readingArticle.content}
              </div>

            </div>

            {/* DISCUSSION SECTION BOARD */}
            <section id="discussion-comments-room" className="border-t-2 border-[#e3dfd5] dark:border-zinc-800 pt-6 mt-12 font-sans">
              <h3 className="text-lg font-extrabold flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-amber-800" />
                <span>Readers Discussion Room ({commentsMap[readingArticle.id]?.length || 0} Comments)</span>
              </h3>

              {/* Comment submission form */}
              <form id="comment-composition-form" onSubmit={handleAddComment} className="mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <input
                    id="commenter-name-input"
                    type="text"
                    required
                    placeholder="Describe your name (e.g. Liam Penton)"
                    value={newCommentAuthor}
                    onChange={(e) => setNewCommentAuthor(e.target.value)}
                    className={`p-2.5 text-xs rounded border ${style.border} ${theme === 'obsidian' ? 'bg-[#181a1d] text-white border-zinc-700' : 'bg-white text-black'} outline-none focus:ring-1 focus:ring-amber-500`}
                  />
                </div>
                <textarea
                  id="commenter-text-area"
                  required
                  rows={3}
                  placeholder="Express your perspective respectfully under NYT Bento Guidelines..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className={`w-full p-2.5 text-xs rounded border ${style.border} ${theme === 'obsidian' ? 'bg-[#181a1d] text-white border-zinc-700' : 'bg-white text-black'} outline-none focus:ring-1 focus:ring-amber-500 mb-3`}
                />
                <button
                  id="post-comment-btn"
                  type="submit"
                  className="px-4 py-2 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-bold rounded-lg text-xs"
                >
                  Publish Commentary Spot
                </button>
              </form>

              {/* Comments Feed List view */}
              <div id="comments-feed-list" className="flex flex-col gap-4">
                {(!commentsMap[readingArticle.id] || commentsMap[readingArticle.id].length === 0) ? (
                  <p className="text-xs text-neutral-400 italic">No comments have been written yet. Be the first to start the discussion!</p>
                ) : (
                  commentsMap[readingArticle.id].map(comment => (
                    <div 
                      key={comment.id} 
                      className={`p-4 rounded-xl border ${theme === 'obsidian' ? 'bg-[#1a1d22] border-zinc-800' : 'bg-[#faf6ee] border-neutral-200'}`}
                    >
                      <div className="flex justify-between items-center mb-1 text-xs">
                        <span className="font-bold text-amber-800">{comment.author}</span>
                        <span className="text-neutral-400">{comment.date}</span>
                      </div>
                      
                      <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-300 mb-3 whitespace-pre-wrap">
                        {comment.text}
                      </p>

                      <div className="flex items-center gap-3 text-[11px] font-bold text-neutral-400">
                        <span>Was this comment helpful?</span>
                        <button 
                          id={`comment-vote-up-${comment.id}`}
                          onClick={() => handleVoteComment(comment.id, 'up')}
                          className={`hover:text-emerald-500 font-mono ${comment.hasVoted === 'up' ? 'text-emerald-500' : ''}`}
                        >
                          ▲ ({comment.votes})
                        </button>
                        <button 
                          id={`comment-vote-down-${comment.id}`}
                          onClick={() => handleVoteComment(comment.id, 'down')}
                          className={`hover:text-red-500 font-mono ${comment.hasVoted === 'down' ? 'text-red-500' : ''}`}
                        >
                          ▼
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </section>

          </div>
        </div>
      )}

      {/* REGISTRY: NEWSROOM LEDE EDIT DIALOG BOX PANEL */}
      {isLedeEditorOpen && (
        <div 
          id="lede-writer-modal-bg" 
          className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto"
          onClick={() => setIsLedeEditorOpen(false)}
        >
          <div 
            id="lede-writer-content"
            className={`w-full max-w-lg rounded-3xl p-6 ${theme === 'obsidian' ? 'bg-[#131518] text-white border border-[#25282c]' : 'bg-white text-zinc-900 border border-neutral-200'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-3 border-b border-neutral-200 dark:border-zinc-800 mb-4">
              <h3 className="text-base font-extrabold flex items-center gap-2">
                <Feather className="w-5 h-5 text-amber-500 animate-bounce" />
                <span>The Newsroom — Compose Front Page Story</span>
              </h3>
              <button 
                id="close-editor-btn-x"
                onClick={() => setIsLedeEditorOpen(false)}
                className="p-1 text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-neutral-400 mb-4">
              Authorize a breaking story to replace the top feature reporting spot on the front page.
            </p>

            <form id="lede-editor-form" onSubmit={handlePublishCustomLede} className="flex flex-col gap-3">
              <div>
                <label className="block text-[10px] font-sans font-extrabold uppercase text-neutral-400 mb-1">STORY HEADLINE</label>
                <input
                  id="editor-headline-input"
                  type="text"
                  required
                  placeholder="e.g. Markets surge following climate innovations"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className={`w-full p-2.5 text-xs rounded border ${style.border} ${theme === 'obsidian' ? 'bg-[#181a1d] text-white border-zinc-700' : 'bg-white text-zinc-900 border-zinc-200'} outline-none focus:ring-1 focus:ring-amber-500`}
                />
              </div>

              <div>
                <label className="block text-[10px] font-sans font-extrabold uppercase text-neutral-400 mb-1">STORY ABSTRACT / LEDE BRIEF</label>
                <textarea
                  id="editor-summary-input"
                  required
                  rows={2}
                  placeholder="A concise, high-impact one-paragraph briefing summary."
                  value={customSummary}
                  onChange={(e) => setCustomSummary(e.target.value)}
                  className={`w-full p-2.5 text-xs rounded border ${style.border} ${theme === 'obsidian' ? 'bg-[#181a1d] text-white border-zinc-700' : 'bg-white text-zinc-900 border-zinc-200'} outline-none focus:ring-1 focus:ring-amber-500`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-sans font-extrabold uppercase text-neutral-400 mb-1">AUTHOR BYLINE</label>
                  <input
                    id="editor-author-input"
                    type="text"
                    placeholder="e.g. LIAM CHEN"
                    value={customAuthor}
                    onChange={(e) => setCustomAuthor(e.target.value)}
                    className={`w-full p-2.5 text-xs rounded border ${style.border} ${theme === 'obsidian' ? 'bg-[#181a1d] text-white border-zinc-700' : 'bg-white text-zinc-900 border-zinc-200'} outline-none focus:ring-1 focus:ring-amber-500`}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-sans font-extrabold uppercase text-neutral-400 mb-1">SECTION CATEGORY</label>
                  <select
                    id="editor-category-selector"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    className={`w-full p-2.5 text-xs rounded border ${style.border} ${theme === 'obsidian' ? 'bg-[#181a1d] text-white border-zinc-700' : 'bg-white text-zinc-900 border-zinc-200'} outline-none`}
                  >
                    <option value="world">World Reports</option>
                    <option value="us">United States</option>
                    <option value="politics">Politics Desk</option>
                    <option value="business">Business Scope</option>
                    <option value="tech">Tech & Innovation</option>
                    <option value="opinion">Editorial Opinion</option>
                    <option value="science">Applied Science</option>
                    <option value="arts">Arts & Culture</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-sans font-extrabold uppercase text-neutral-400 mb-1">FULL ARTICLE CONTENT</label>
                <textarea
                  id="editor-content-input"
                  required
                  rows={5}
                  placeholder="Draft full paragraphs here..."
                  value={customContent}
                  onChange={(e) => setCustomContent(e.target.value)}
                  className={`w-full p-2.5 text-xs rounded border ${style.border} ${theme === 'obsidian' ? 'bg-[#181a1d] text-white border-zinc-700' : 'bg-white text-zinc-900 border-zinc-200'} outline-none focus:ring-1 focus:ring-amber-500`}
                />
              </div>

              <div className="flex gap-2 justify-end mt-2">
                <button
                  id="cancel-editor-btn"
                  type="button"
                  onClick={() => setIsLedeEditorOpen(false)}
                  className="px-4 py-2 hover:bg-neutral-100 dark:hover:bg-zinc-800 text-xs font-bold rounded-lg border dark:border-zinc-800"
                >
                  Cancel
                </button>
                <button
                  id="submit-custom-lede-btn"
                  type="submit"
                  className="px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold rounded-lg"
                >
                  Publish Front Page
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
