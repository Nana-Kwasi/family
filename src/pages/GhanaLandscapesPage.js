import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SoundPermissionModal from '../components/SoundPermissionModal';

const bs = (f) => encodeURI(`/audio/background sounds/${f}`);

// ── Data ──────────────────────────────────────────────────────────────────

const CASTLES = [
  {
    name: 'Cape Coast Castle',
    region: 'Cape Coast, Central Region',
    wikiTitle: 'Cape_Coast_Castle',
    colour: '#C9A558',
    facts: ['Built in 1653 by Swedish traders', 'UNESCO World Heritage Site since 1979', 'Held up to 1,500 enslaved Africans at a time in its dungeons'],
    narration: 'Cape Coast Castle stands on the edge of the Atlantic, its white walls catching the light of a sun that once watched thousands of enslaved Africans pass through its "Door of No Return" — a portal from which most would never look back at their homeland again. Built in 1653 by Swedish traders and later expanded by the Dutch and British, it served as the nerve centre of British colonial administration and the West African slave trade for over two centuries. Today it is a UNESCO World Heritage Site and one of the most visited and emotionally significant places on the continent. To walk through its dungeons is to feel history as a physical weight — the walls stained, the air still heavy. For the African diaspora, particularly Black Americans who trace their ancestry to the transatlantic slave trade, this castle is a place of pilgrimage, grief, and ultimately, reclamation.',
    cultural: 'The castle is not only a monument of tragedy — it is a symbol of survival. The people of Cape Coast have built a thriving cultural identity around it, and the annual PANAFEST festival draws diaspora Africans from across the world to its gates for a week of healing, music, and homecoming.',
    tourism: 'Open daily. Guided tours available. Museum on site. Annual PANAFEST held here in July.',
  },
  {
    name: 'Elmina Castle',
    region: 'Elmina, Central Region',
    wikiTitle: 'Elmina_Castle',
    colour: '#e07020',
    facts: ['Built in 1482 by the Portuguese — oldest European building in sub-Saharan Africa', 'Originally a gold trading post', 'UNESCO World Heritage Site'],
    narration: 'Elmina Castle — São Jorge da Mina in Portuguese — is the oldest European building surviving in sub-Saharan Africa. Built in 1482 by the Portuguese as a fortified trading post for West African gold, it became, over the following centuries, one of the busiest hubs of the transatlantic slave trade. The name "Elmina" is derived from "da mina" — "of the mine" — a reference to the gold the Portuguese came seeking. What they found was a sophisticated, thriving trading civilisation. What they left behind was a scar on the landscape and in the memory of a people that has never fully healed. The castle passed from Portuguese to Dutch to British hands across four centuries. Today it faces the Gulf of Guinea from a rocky promontory, its reflection shimmering in the lagoon below — hauntingly beautiful and deeply sobering in equal measure.',
    cultural: 'Elmina is home to the Edina people, who have maintained their own traditions and festivals alongside the castle\'s dark history. The annual Bakatue Festival is held here — a fishing ceremony of remarkable cultural depth.',
    tourism: 'Open daily. UNESCO guided tours. Direct access to Elmina beach and lagoon. Paired visits with Cape Coast Castle are recommended.',
  },
  {
    name: 'Kwame Nkrumah Memorial Park',
    region: 'Accra, Greater Accra',
    wikiTitle: 'Kwame_Nkrumah_Mausoleum',
    colour: '#5a9e6a',
    facts: ['Built on the site where Nkrumah declared independence in 1957', 'Houses his mausoleum and that of his wife', 'Features a museum of independence artefacts'],
    narration: 'On 6th March 1957, a man stood on this very ground and declared: "At long last, the battle has ended. Ghana, your beloved country, is free forever." Kwame Nkrumah — Ghana\'s first president and Pan-Africanism\'s greatest champion — delivered those words to a crowd of tens of thousands and to a watching world that doubted Africa\'s capacity for self-governance. He proved them wrong. The Kwame Nkrumah Memorial Park was built on the site of the old polo grounds where independence was proclaimed. His mausoleum sits at the centre, surrounded by fountains, his statue pointing forward — the direction he always insisted Africa must face. The park houses a museum of independence-era artefacts, photographs, and documents that capture the extraordinary story of a continent reclaiming its dignity.',
    cultural: 'Nkrumah\'s vision of Pan-Africanism — a unified, independent Africa — continues to shape political thought across the continent and the diaspora. His image and words appear in freedom movements from Harlem to Johannesburg.',
    tourism: 'Located in central Accra. Open daily except Mondays. Museum, garden, and gift shop on site.',
  },
  {
    name: 'Fort Amsterdam',
    region: 'Abandze, Central Region',
    wikiTitle: 'Fort_Amsterdam,_Ghana',
    colour: '#9b7fc8',
    facts: ['Built by the British in 1598', 'One of the earliest European forts on the Gold Coast', 'Offers spectacular panoramic views of the Atlantic coastline'],
    narration: 'Fort Amsterdam sits on a cliff above the Atlantic in the small fishing village of Abandze, its ancient walls crumbling in the salt air — a ruin more honest than most restored monuments about what colonialism actually left behind. Built by the British in 1598 and later captured by the Dutch, it is one of the earliest European fortifications on the Gold Coast. Unlike Cape Coast and Elmina, Fort Amsterdam is quieter, less visited, and for that reason more intimate. You can stand on its walls with the wind in your face and the ocean below and genuinely feel the weight of what passed through this coastline — the gold, the cloth, and the lives that crossed this stretch of water with no return.',
    cultural: 'The village of Abandze around the fort is a living fishing community that has maintained traditional ways of life for centuries — their daily routine unchanged from what European traders would have observed when the fort was first built.',
    tourism: 'Accessible by road from Cape Coast. Less crowded than the major castles. Best visited in the morning for light and coastal views.',
  },
];

const RIVERS = [
  {
    name: 'Lake Volta',
    type: 'Lake',
    region: 'Volta, Brong-Ahafo & Northern Regions',
    wikiTitle: 'Lake_Volta',
    colour: '#4a9ec4',
    facts: ['Largest man-made lake in the world by surface area', 'Created by the Akosombo Dam in 1965', 'Over 78,000 people were displaced during its creation'],
    narration: 'Lake Volta is the largest man-made lake in the world by surface area — 8,502 square kilometres of water that simply did not exist before 1965. It was created when the Akosombo Dam was built across the Volta River, flooding the Afram Plains and displacing over 78,000 people from their ancestral villages in one of the largest forced relocations in African history. The lake now generates the electricity that powers much of Ghana and several neighbouring countries. Its calm waters, dotted with the tops of old trees that never fully sank, stretch so far that from some shores you cannot see the other side — a vast inland sea where communities fish, trade, and travel by boat as they have always done, albeit in a landscape entirely reshaped by human hands. The Volta ferry is one of Africa\'s most atmospheric journeys — a slow crossing through floating islands of water hyacinth under a wide open sky.',
    cultural: 'Many communities submerged beneath Lake Volta maintain their cultural connections to the land that was lost. Annual ceremonies are held at the water\'s edge in remembrance of villages that now lie below the surface.',
    ecology: 'The lake supports diverse aquatic ecosystems including tilapia, catfish, and Nile perch. Invasive water hyacinth poses a significant conservation challenge.',
    communities: 'Communities along the shores depend on the lake for fishing, transportation, and irrigation. The Krobo, Ewe, and Akan communities have adapted their lives entirely to the waterway.',
  },
  {
    name: 'Lake Bosomtwe',
    type: 'Lake',
    region: 'Ashanti Region',
    wikiTitle: 'Lake_Bosomtwe',
    colour: '#5a9e6a',
    facts: ['The only natural lake in Ghana', 'Created by a meteorite impact 1.07 million years ago', 'Sacred to the Ashanti — forbidden to use boats; fishing done from floating logs'],
    narration: 'Lake Bosomtwe is unlike any other body of water in Ghana. It is the only natural lake in the country, cradled in the crater of a meteorite that struck the earth 1.07 million years ago — a collision so powerful it created a perfectly circular depression that filled, over millennia, with rainwater and became this extraordinary place. To the Ashanti people, Bosomtwe is deeply sacred. It is believed to be the dwelling place of Twi, the god to whom the souls of the dead must come to bid farewell before continuing their journey. For this reason, the use of boats on the lake is traditionally forbidden — fishermen use carved wooden planks called padua to float out and cast their nets. Standing at its edge, surrounded by forested hills dropping into dark water, you feel the weight of a million years of earth history and a thousand years of human reverence at once.',
    cultural: 'The Ashanti communities around the lake maintain strict cultural protocols around its use. The lake appears in Ashanti oral tradition, proverbs, and funeral rites.',
    ecology: 'As a closed lake with no outlet, Bosomtwe has its own unique ecosystem. The water is slightly alkaline and supports species found nowhere else.',
    communities: 'Over 30 farming and fishing villages surround the lake. The area has been designated a biosphere reserve by UNESCO.',
  },
  {
    name: 'Volta River',
    type: 'River',
    region: 'Eastern & Volta Regions',
    wikiTitle: 'Volta_River',
    colour: '#C9A558',
    facts: ['One of West Africa\'s great river systems', 'Formed by the confluence of the Black Volta, White Volta, and Red Volta', 'Empties into the Gulf of Guinea near Ada Foah'],
    narration: 'The Volta River is the lifeblood of Ghana. Formed far to the north by the confluence of the Black, White, and Red Volta rivers — tributaries that drain Burkina Faso, Ivory Coast, and Ghana itself — it flows southward for hundreds of kilometres before emptying into the Gulf of Guinea near the town of Ada Foah. For centuries before colonial borders were drawn, the Volta served as a highway connecting the peoples of the interior to the coast — a route for gold, cloth, cola nuts, and the cultural exchange that created the complex, interconnected civilisations of West Africa. At Ada Foah, where the river meets the sea in a wide, spectacular estuary, it creates one of Ghana\'s most beautiful natural landscapes: a place where freshwater and saltwater mix, where fishermen and sea birds share the same stretch of water, and where the river finally gives itself to the ocean after a journey of nearly a thousand kilometres.',
    cultural: 'The Volta system is central to the spiritual and cultural identity of the Ewe, Krobo, and numerous communities along its banks. The Ada Foah estuary is a major site of cultural festivals and traditional fishing ceremonies.',
    ecology: 'The Volta supports Ghana\'s most important freshwater fishing industry. The river\'s basin is home to hippos, crocodiles, and hundreds of bird species.',
    communities: 'Millions of Ghanaians depend on the Volta system for drinking water, irrigation, hydroelectric power, and transportation.',
  },
  /* Pra River — image pending
  {
    name: 'Pra River',
    type: 'River',
    region: 'Ashanti & Central Regions',
    wikiTitle: 'Pra_River',
    colour: '#8B6914',
    facts: ['One of Ghana\'s major rivers, flowing 240km to the sea', 'Sacred river in Akan tradition — associated with purification', 'Site of significant gold panning and artisanal mining'],
    narration: 'The Pra River flows 240 kilometres through the heart of the Akan homeland, passing through forest and farmland before reaching the Gulf of Guinea near Shama. To the Akan people, the Pra is more than a waterway — it is a boundary, a marker, and a spiritual presence. The great Asante Empire used the Pra as one of its southern frontiers. To cross the Pra was to cross into Asante territory — an act that required acknowledgement and respect. The river appears in numerous Akan proverbs and stories. Its banks were also the scene of many of the decisive battles of the Anglo-Ashanti Wars, when Akan warriors repeatedly repelled British attempts to push northward. The Pra is also one of Ghana\'s most significant sources of alluvial gold — for centuries, its waters have been panned by communities who know exactly where to look in the riverbed for the flakes that have made this region famous since the era of the great West African gold trade.',
    cultural: 'The Pra features prominently in Akan oral history, mythology, and funeral rites. Several communities hold annual festivals at its banks involving libation, sacrifice, and communal bathing for purification.',
    ecology: 'The Pra\'s forests harbour significant biodiversity. The river is under pressure from illegal artisanal gold mining (galamsey), which has caused severe water pollution in recent years — one of Ghana\'s most pressing environmental crises.',
    communities: 'Communities along the Pra depend on it for fishing, irrigation, and water supply. The conflict between traditional river use and commercial mining has become one of the defining environmental battles in modern Ghana.',
  },
  */
  {
    name: 'Tano River',
    type: 'River',
    region: 'Brong-Ahafo & Western Regions',
    wikiTitle: 'Tano_River',
    colour: '#9b7fc8',
    facts: ['Named after the Tano deity — one of the most important rivers in Akan religion', 'Flows from near Techiman to the Aby Lagoon in Ivory Coast', 'The Tano was consulted as an oracle by Akan rulers'],
    narration: 'Of all Ghana\'s rivers, none carries more spiritual weight than the Tano. In Akan religion, Tano is not merely a river — it is a god. One of the most powerful abosom (river deities) in the Akan pantheon, Tano is believed to be a son of Nyame, the Supreme God, and a protector of communities along its banks. Akan rulers and priests historically consulted the Tano oracle before going to war, making major political decisions, or consecrating new stools. The river has its own priests, its own festivals, and its own sacred days when certain activities — fishing, bathing, washing — were traditionally forbidden as acts of respect. The Tano flows from its source near Techiman in the Brong-Ahafo Region all the way to the Aby Lagoon in neighbouring Ivory Coast, tracing a path through some of Ghana\'s most historically significant landscapes and communities.',
    cultural: 'The Tano River is at the heart of some of the most important traditional religious practices in Ghana. The Apoo Festival in Techiman is directly connected to Tano worship and remains one of the most distinctive festivals in the country.',
    ecology: 'The Tano basin contains important forest ecosystems and is a habitat for forest elephants, primates, and rare bird species. The upper Tano area is adjacent to Ghana\'s forest reserves.',
    communities: 'Communities along the Tano maintain complex traditional relationships with the river involving priestly roles, ceremonial fishing rights, and seasonal festivals.',
  },
  {
    name: 'Ankobra River',
    type: 'River',
    region: 'Western Region',
    wikiTitle: 'Ankobra_River',
    colour: '#e07020',
    facts: ['One of the most important rivers in Ghana\'s Western Region', 'Has supported gold mining communities for centuries', 'Empties into the Gulf of Guinea near Axim'],
    narration: 'The Ankobra River winds through Ghana\'s Western Region — a landscape of forest, gold, and ancient trade routes. For centuries before European contact, the Ankobra was the lifeline of communities whose expertise in gold extraction made this region one of the most economically significant in West Africa. When Portuguese explorers arrived in the 15th century, they found established trade networks, sophisticated gold-working traditions, and a population that had been extracting and exchanging gold along the Ankobra\'s banks for generations. The river empties into the Gulf of Guinea near the historic port town of Axim — once one of the busiest trading posts on the Gold Coast. Today, the Ankobra faces the same challenges as many of Ghana\'s waterways: the pressure of illegal artisanal mining, forest encroachment, and agricultural runoff. But its communities continue their relationship with the river, fishing its waters and drawing from its banks as their ancestors have always done.',
    cultural: 'The communities of the Western Region — including the Nzema and Ahanta peoples — have distinct cultural traditions tied to the Ankobra. The river appears in their oral histories as a boundary, a provider, and a spiritual presence.',
    ecology: 'The Ankobra\'s lower reaches support mangrove ecosystems of significant biodiversity. The forest reserves along its upper reaches are among Ghana\'s most important.',
    communities: 'Fishing communities, artisanal miners, and farmers all depend on the Ankobra. The tension between these competing uses of the river is one of the defining challenges facing Western Region communities today.',
  },
  {
    name: 'Densu River',
    type: 'River',
    region: 'Eastern & Greater Accra Regions',
    wikiTitle: 'Densu_River',
    colour: '#5a9e6a',
    facts: ['Primary source of drinking water for Accra, Ghana\'s capital', 'Flows through the Weija Reservoir — critical urban infrastructure', 'The Densu Delta is a RAMSAR-protected wetland'],
    narration: 'The Densu River is one of Ghana\'s most strategically important waterways — not because of its size or spiritual significance, but because it supplies drinking water to Accra, a metropolis of over four million people. Rising in the forested hills of the Eastern Region, the Densu flows westward through farmland and urban sprawl before reaching the Weija Reservoir, where it is treated and piped to the taps of the capital. At its southern end, the Densu creates a delta wetland of extraordinary ecological richness — a RAMSAR-designated protected area where migratory birds from Europe and the Arctic stop to rest and feed on their annual journeys. The contrast is remarkable: within a few kilometres, the same river supports industrial water treatment, artisanal fishing, urban agriculture, and one of West Africa\'s most important bird habitats.',
    cultural: 'Communities along the Densu Delta maintain traditional fishing practices and have historically used the wetland\'s resources sustainably. The delta area is significant in the traditional history of the Ga-Adangbe people.',
    ecology: 'The Densu Delta hosts over 70 species of birds including Palaearctic migrants. It is critically important for biodiversity conservation in an increasingly urbanised coastal zone.',
    communities: 'The Densu faces severe pollution pressure from urban runoff, industrial discharge, and agricultural chemicals — directly threatening Accra\'s water security and the livelihoods of delta communities.',
  },
  /* Birim River — image pending
  {
    name: 'Birim River',
    type: 'River',
    region: 'Eastern Region',
    wikiTitle: 'Birim_River',
    colour: '#C9A558',
    facts: ['Ghana\'s most important diamond-bearing river', 'One of only a few rivers in the world with significant alluvial diamond deposits', 'Flows through the heart of the Eastern Region\'s farming belt'],
    narration: 'The Birim River runs through Eastern Region farmland in relative obscurity compared to Ghana\'s more famous waterways — but beneath its gravelly bed lies one of nature\'s most extraordinary concentrations of alluvial diamonds. The Birim Valley is one of the world\'s most significant sources of gem-quality alluvial diamonds, and communities along its banks have been diamond diggers for generations — some finding fortune, many finding only enough to survive. The river itself is unremarkable in appearance: narrow, seasonal, flowing through cocoa farms and palm groves. But what it carries in its sediment has made it one of the most economically significant rivers in West Africa. The tension between artisanal mining and environmental protection along the Birim mirrors the broader challenge facing Ghana as it tries to manage its extraordinary natural wealth for the benefit of all its people.',
    cultural: 'Diamond mining along the Birim has created distinct communities with their own culture, language, and social structures built around the rhythms of the digging season.',
    ecology: 'Illegal mining has severely degraded the Birim\'s water quality and riverbank vegetation. Restoration efforts are ongoing but face the reality that millions depend on the river for their livelihoods.',
    communities: 'The Birim Valley supports tens of thousands of artisanal diamond miners, most operating informally. Regularising and sustainably managing this industry is one of Ghana\'s most complex governance challenges.',
  },
  */
  {
    name: 'Korle Lagoon',
    type: 'Lagoon',
    region: 'Accra, Greater Accra',
    wikiTitle: 'Korle_Lagoon',
    colour: '#b05060',
    facts: ['Historical sacred site of the Ga people — home of the deity Korle', 'Once one of Accra\'s most important fishing grounds', 'Now severely polluted — subject of major remediation efforts'],
    narration: 'The Korle Lagoon sits at the heart of Accra\'s oldest neighbourhoods — Korle-Bu, Bukom, Jamestown — a body of water that was once sacred to the Ga people as the home of the deity Korle, one of the most powerful woyei (divine beings) in Ga religion. Fishermen once cast their nets here, priests made offerings at its banks, and the community organised its spiritual life around the rhythms of the lagoon and the god who lived within it. Today the Korle Lagoon is one of the most polluted urban water bodies in West Africa — decades of unchecked industrial discharge, domestic waste, and sewage have reduced it to a symbol of the environmental cost of rapid urbanisation without planning. But the lagoon is also a symbol of something else: the resilience of tradition in the face of degradation. The Ga community continues to hold ceremonies at its banks, and remediation efforts are slowly beginning to reverse what was done to this sacred place.',
    cultural: 'The Korle deity remains an active force in Ga religious life. The Korle wulomo (chief priest) is one of the most important traditional religious figures in Accra, and ceremonies connecting the community to the lagoon continue despite its pollution.',
    ecology: 'Once rich in marine biodiversity, the Korle now supports almost no aquatic life due to pollution. Major remediation projects, including a World Bank-funded effort, aim to restore the lagoon over the coming decades.',
    communities: 'The communities of James Town and Ussher Town — some of Accra\'s oldest urban neighbourhoods — built their identity around the Korle Lagoon. The story of its pollution is inseparable from the story of Accra\'s rapid and unplanned growth.',
  },
  /* Muni Lagoon — image pending
  {
    name: 'Muni Lagoon',
    type: 'Lagoon',
    region: 'Central Region',
    wikiTitle: 'Muni_Lagoon',
    colour: '#4a9ec4',
    facts: ['RAMSAR-listed wetland of international importance', 'Nesting site for several species of sea turtles', 'Home to the Muni Pomadze Ramsar Site — one of Ghana\'s most biodiverse coastal areas'],
    narration: 'The Muni Lagoon, designated a RAMSAR site in recognition of its international ecological importance, is one of Ghana\'s most pristine coastal wetlands. Located near Winneba in the Central Region, the lagoon and its surrounding mangrove forests support an extraordinary array of wildlife: nesting colonies of lesser flamingos, sea turtles that return to its beaches every year to lay eggs, abundant migratory waterfowl, and a richly productive fishery that has sustained the Effutu communities of Winneba for generations. The lagoon is part of the Muni-Pomadze Ramsar Site, a protected area that demonstrates what Ghana\'s coastal ecosystems look like when they are properly stewarded. In contrast to the degraded Korle Lagoon in Accra, Muni represents what is still possible when communities and conservation authorities work together to protect what remains.',
    cultural: 'The Effutu people of Winneba maintain cultural practices connected to the Muni Lagoon, including the remarkable Aboakyer deer hunting festival which draws participants from across Ghana and the diaspora.',
    ecology: 'The Muni-Pomadze site supports over 80 species of waterbirds and is one of West Africa\'s most important sea turtle nesting areas. The mangroves provide nursery habitat for juvenile fish.',
    communities: 'Local fishing communities have been involved in conservation management of the lagoon, demonstrating that ecological protection and livelihood support are not mutually exclusive.',
  },
  */
];

const FORESTS = [
  {
    name: 'Kakum National Park',
    region: 'Central Region',
    wikiTitle: 'Kakum_National_Park',
    colour: '#5a9e6a',
    facts: ['Home to the only canopy walkway in Africa', 'Protects over 200 species of birds and 40 mammal species', 'Forest elephants, bongo antelopes, and Diana monkeys live here'],
    narration: 'Kakum National Park is Ghana\'s most celebrated wilderness — 360 square kilometres of lowland tropical rainforest in the Central Region, home to some of the continent\'s most extraordinary biodiversity. But what makes Kakum truly unforgettable is its canopy walkway: a series of suspension bridges strung between the crowns of the tallest trees, 30 metres above the forest floor — the only such walkway in Africa. Standing on these bridges with the canopy spread below and around you, hearing the forest breathe and the birds call from every direction, is one of the most visceral and humbling experiences available on the continent. The forest itself is primeval — towering silk cotton trees, ancient mahogany, strangler figs that have consumed other trees entirely over centuries. The undergrowth is dense and dark. Somewhere below, African forest elephants move silently. Above, forest hornbills call with extraordinary volume.',
    wildlife: 'Forest elephants (smaller than savanna elephants), bongo antelopes, leopards, olive colobus and Diana monkeys, over 200 bird species including numerous rare forest specialists.',
    conservation: 'Kakum is one of Ghana\'s best-managed protected areas. Community benefit-sharing programmes have reduced poaching pressure and created a conservation economy in surrounding villages.',
    tourism: 'Open daily. Canopy walkway, guided forest walks, overnight lodge accommodation. 30km from Cape Coast — easily combined with castle visits.',
  },
  {
    name: 'Mole National Park',
    region: 'Northern Region',
    wikiTitle: 'Mole_National_Park',
    colour: '#C9A558',
    facts: ['Ghana\'s largest wildlife sanctuary — 4,577 square kilometres', 'Over 300 bird species and 93 mammal species', 'Best place in Ghana to see African elephants on foot'],
    narration: 'Mole National Park is Ghana\'s great wilderness — a vast savanna landscape in the north of the country that feels utterly unlike anywhere else in this forest-dominated nation. At 4,577 square kilometres, it is Ghana\'s largest protected area and home to the most remarkable diversity of large mammals anywhere in the country: African elephants (over 600 individuals), buffalos, waterbucks, roans, kobs, warthogs, baboons, green monkeys, and the occasional leopard. What makes Mole unique as an African game reserve is the intimacy it offers: guided walking safaris take you on foot among the elephants at the watering holes in the valley below the lodge — a proximity to wild Africa that is rare even on the continent. The landscape is open Guinea savanna, punctuated by baobab trees, seasonal streams, and the extraordinary sounds of a northern Ghanaian dry season: the call of hornbills, the bark of baboons, the distant rumble of elephants.',
    wildlife: 'West African savanna elephants, buffalos, warthogs, waterbucks, kobs, roans, baboons, patas monkeys, over 300 bird species including the rare white-necked picathartes.',
    conservation: 'Mole faces pressures from human-wildlife conflict, poaching, and the encroachment of farming communities. Community conservation programmes and ecotourism revenue are critical to its future.',
    tourism: 'Located near Larabanga, accessible by road from Tamale. Mole Motel offers accommodation with a swimming pool overlooking the watering hole — one of the most extraordinary views in Ghana.',
  },
  {
    name: 'Ankasa Conservation Area',
    region: 'Western Region',
    wikiTitle: 'Ankasa_Conservation_Area',
    colour: '#2d6e3e',
    facts: ['One of the wettest places in Ghana — receives over 1,800mm of rain annually', 'Protects the last intact lowland rainforest in Ghana', 'Home to forest elephants, chimpanzees, and extremely rare mammals'],
    narration: 'Ankasa Conservation Area in Ghana\'s far Western Region is the country\'s most biodiverse protected wilderness — and one of its most difficult to reach. This is by design, and by the forest\'s own nature. The Ankasa receives over 1,800mm of rainfall annually, making it one of the wettest places in Ghana and creating conditions for a lowland tropical rainforest of extraordinary density and biodiversity. The forest floor is a tangle of buttressed roots, giant ferns, and fungi. The canopy is continuous and impenetrable from above. Within this darkness live species that have survived undisturbed for millions of years: the pygmy hippopotamus, forest elephants, chimpanzees, bongo antelopes, Bates\'s pygmy antelope, and over 630 species of butterfly. Ankasa is where Ghana\'s remaining primary forest — the original, undisturbed ecosystem that once covered much of the country — can still be experienced.',
    wildlife: 'Pygmy hippopotamus (critically endangered), forest elephants, chimpanzees, diana monkeys, bongos, over 630 butterfly species, 400+ bird species.',
    conservation: 'Ankasa is managed jointly with the adjacent Nini-Suhien National Park. The combined area represents Ghana\'s most important refuge for primary forest biodiversity.',
    tourism: 'Limited tourist infrastructure — this is for serious wildlife observers. Guided walks only. Accommodation in basic camp facilities. Advance booking essential.',
  },
  /* Atewa Forest Reserve — image pending
  {
    name: 'Atewa Forest Reserve',
    region: 'Eastern Region',
    wikiTitle: 'Atewa_Range',
    colour: '#8B6914',
    facts: ['One of West Africa\'s most important upland forests', 'Headwaters of three of Ghana\'s major rivers: Densu, Birim, and Ayensu', 'Home to critically endangered species found nowhere else on earth'],
    narration: 'The Atewa Forest Reserve in Eastern Region is one of Ghana\'s most ecologically critical landscapes — not because of its size, but because of what it protects. The headwaters of three of Ghana\'s most important rivers — the Densu, Birim, and Ayensu — begin in Atewa\'s upland forests. This means that the water supply of millions of Ghanaians, including the residents of Accra, depends directly on the health of this forest. Without Atewa\'s trees, the watershed that feeds these rivers degrades, and the water that flows from them diminishes and dirties. Atewa is also home to species found nowhere else on earth — endemic plants, rare amphibians, and critically endangered animals whose existence is directly tied to this specific patch of forest. For these reasons, conservation organisations and traditional authorities have fought strenuously to prevent bauxite mining concessions from being extended into Atewa — a battle that continues and that represents one of the defining conservation conflicts in contemporary Ghana.',
    wildlife: 'Critically endangered species include the Togo slippery frog, Atewa forest robin, and several endemic plant species. The forest also supports chimpanzees and forest hornbills.',
    conservation: 'Atewa is at the centre of a major conservation controversy: significant bauxite deposits beneath the forest have attracted mining interest. Conservation scientists, traditional authorities, and communities are fighting to protect it.',
    tourism: 'Limited access. Guided walks through the Community Resource Management Areas on the forest periphery. The village of Apapam serves as a base.',
  },
  */
  {
    name: 'Bia National Park',
    region: 'Western Region',
    wikiTitle: 'Bia_National_Park',
    colour: '#9b7fc8',
    facts: ['Established in 1974 as Ghana\'s second national park', 'Part of the Upper Guinean Forest hotspot — one of the most biodiverse regions on earth', 'Protects significant populations of forest primates'],
    narration: 'Bia National Park, established in 1974 in the Western Region near the Ivory Coast border, is part of the Upper Guinean Forest ecosystem — one of the most biodiverse and most threatened forest regions on earth. The Upper Guinean Forest once stretched in an unbroken band from Sierra Leone to Togo, and the animals and plants it contains are found nowhere else in the world. Today this forest is fragmented into islands, of which Bia is one of Ghana\'s most important. The park protects dense lowland rainforest with a rich canopy of mahogany, odum, and wawa trees, and beneath it a world of primates, forest birds, and rare mammals. The adjacent Bia Resource Reserve serves as a buffer zone, and together they form one of the Western Region\'s most significant conservation landscapes. Bia is quieter and less visited than Kakum or Mole, offering an authentically wild experience for those who make the effort to reach it.',
    wildlife: 'Diana monkeys, olive colobus, chimpanzees, bongo antelopes, forest elephants, leopards. Over 150 bird species including the white-breasted guineafowl.',
    conservation: 'The park faces pressure from illegal logging, agricultural encroachment, and bushmeat hunting. Community engagement and anti-poaching patrols are the primary conservation tools.',
    tourism: 'Basic facilities. Best reached from Sunyani or Goaso. Walking safaris with Ghana Wildlife Division guides. Recommended for serious naturalists.',
  },
];

const MOUNTAINS = [
  /* Mount Afadjato — image pending
  {
    name: 'Mount Afadjato',
    region: 'Volta Region',
    wikiTitle: 'Afadjato',
    colour: '#9b7fc8',
    facts: ['Highest mountain in Ghana at 885 metres', 'Located near the village of Liati Wote in the Volta Region', 'Sacred to the Avatime and Ewe peoples'],
    narration: 'Mount Afadjato stands 885 metres above sea level in the Volta Region — the highest point in Ghana, and one of the highest in West Africa. The mountain rises steeply from the surrounding forest, its forested slopes home to butterflies, birds, and the kind of stillness you only find at altitude. The climb to the summit takes approximately 2–3 hours through dense montane forest, and what awaits at the top is one of Ghana\'s most extraordinary views: the Volta Region\'s rolling hills, the distant shimmer of Lake Volta, and on clear days, the border with Togo. The summit is sacred to the Avatime and Ewe communities of the Volta Region. They do not call this place simply a mountain — it is a residence. Local beliefs hold that the spirit of Afadjato watches over the surrounding communities, and offerings are still made at specific points on the mountain by traditional priests and community leaders who maintain the relationship between the living and the highland divine.',
    cultural: 'The Ewe and Avatime communities have deep spiritual connections to Mount Afadjato. The mountain appears in oral histories as both a physical landmark and a spiritual being. Ceremonies of respect and petition are conducted at its slopes.',
    geography: 'Part of the Akwapim-Togo chain of hills, which runs northeast from the Ghanaian coast into Togo and Benin. The range was formed by ancient volcanic activity and has been shaped by millions of years of erosion.',
    tourism: 'Guided hikes from Liati Wote village. Basic accommodation in the village. Butterfly sanctuary nearby. Best climbed in the early morning. Rainy season (April–October) offers green but muddy conditions.',
  },
  */
  /* Mount Gemi — image pending
  {
    name: 'Mount Gemi',
    region: 'Volta Region',
    wikiTitle: 'Mount_Gemi',
    colour: '#C9A558',
    facts: ['Second highest peak in Ghana at 832 metres', 'Contains a sacred cave used for traditional ceremonies', 'Situated near the town of Tafi Atome — famous for its monkey sanctuary'],
    narration: 'Mount Gemi sits near Afadjato as the second highest peak in Ghana, and while it receives fewer visitors than its more famous neighbour, it offers something Afadjato does not: a sacred cave within its slopes that has been used for traditional ceremonies for centuries. The cave is a place of prayer, of offering, of communion between the Ewe communities of the Volta Region and the spiritual forces they believe inhabit the mountain. To enter with a guide from the village is to step into a space where the boundary between the physical and the spiritual has always been considered permeable — where the walls hold the memory of countless generations of petitions, blessings, and thanksgivings. The walk to Gemi passes through dense forest and open highland scrub, with views across a landscape that looks today very much as it must have looked before any border or colonial boundary was drawn across it.',
    cultural: 'The sacred cave at Gemi is maintained by traditional priests from the surrounding Ewe communities. Access to certain parts of the cave is restricted to ceremonial purposes, and visitors are asked to observe these boundaries with respect.',
    geography: 'Mount Gemi is part of the same volcanic chain as Afadjato. The two peaks are visible from each other and are often hiked together over two days.',
    tourism: 'Guided hikes from Amedzofe or Tafi Atome. Can be combined with a visit to the Tafi Atome Monkey Sanctuary, where habituated mona monkeys interact freely with visitors.',
  },
  */
  {
    name: 'Akwapim Ridge',
    region: 'Eastern Region',
    wikiTitle: 'Akwapim_Hills',
    colour: '#5a9e6a',
    facts: ['A highland escarpment rising abruptly from the Accra plains', 'Home to the Akuapem people — known for their role in Ghanaian Christianity and education', 'The Christiansborg Castle governors used the ridge as a cool-season retreat from coastal Accra'],
    narration: 'The Akwapim Ridge rises abruptly from the coastal plains just 40 kilometres north of Accra — a dramatic escarpment that reaches nearly 500 metres above sea level and separates the hot lowlands of the coast from the cooler, greener highlands of the Eastern Region. The ridge is home to the Akuapem people, one of Ghana\'s most historically significant communities: it was here that the Basel Mission established some of West Africa\'s first Western-style schools in the 19th century, creating an educated class that would play a central role in Ghana\'s independence movement. The Akuapem have their own distinct dialect, their own paramount stool, and a unique cultural tradition that blends Akan heritage with the Presbyterian Christianity that has deep roots in the ridge communities. The town of Aburi on the ridge is famous for its botanical gardens — established by the British in 1890 and still one of the most beautiful formal gardens in West Africa.',
    cultural: 'The Akuapem people have produced some of Ghana\'s most important intellectuals, politicians, and artists. The ridge has a distinct cultural identity that is simultaneously deeply Akan and shaped by its particular history of early education and missionary encounter.',
    geography: 'The Akwapim-Togo Range extends from the Accra plains northeastward into Togo and Benin. The Akwapim section is the most accessible from the capital.',
    tourism: 'Aburi Botanical Gardens. Hiking trails along the escarpment edge. The town of Akropong (traditional capital of Akuapem) has important cultural sites. Easily accessible as a day trip from Accra.',
  },
  /* Atiwa Range — image pending
  {
    name: 'Atiwa Range',
    region: 'Eastern Region',
    wikiTitle: 'Atewa_Range',
    colour: '#e07020',
    facts: ['Upland forest reserve of extraordinary ecological importance', 'Source of headwaters for three major rivers', 'Under conservation threat from bauxite mining concessions'],
    narration: 'The Atiwa Range is both a physical highland and the centre of one of Ghana\'s most important environmental battles. Rising above the eastern plains, this upland forest reserve protects the headwaters of the Densu, Birim, and Ayensu rivers — the water supply of millions of people, including the residents of Accra. The forest itself is ancient: upland equatorial rainforest that has persisted here through centuries of human pressure because of its steep terrain and relative inaccessibility. The Atiwa is also home to species found nowhere else on earth, including several endemic amphibians and plant species that were only scientifically described in the 21st century. In recent years, the Atiwa has become the site of a major conservation conflict: large bauxite deposits beneath its soils have attracted mining interest, and the question of whether Ghana should extract this mineral wealth or protect the forest above it has divided communities, politicians, and scientists. The outcome of this debate will shape the future of Ghana\'s water supply and its remaining primary forest for generations.',
    cultural: 'The Akyem communities of the Eastern Region have traditional connections to the Atiwa Range, with sacred sites and community forest management traditions that predate modern conservation concepts.',
    geography: 'The Atiwa forms part of the eastern uplands of Ghana, at elevations reaching approximately 760 metres. Its position at the confluence of multiple river headwaters makes it hydrologically critical.',
    tourism: 'Limited infrastructure. Community-guided walks from adjacent villages. The area around Apapam offers access to forest edge habitats. Best for birdwatchers and botanists.',
  },
  */
  {
    name: 'Togo Highlands (Ghanaian section)',
    region: 'Volta Region',
    wikiTitle: 'Wli_Waterfalls',
    colour: '#b05060',
    facts: ['The most dramatic highland scenery in Ghana', 'Includes the Wli Waterfalls — the highest waterfall in West Africa', 'Home to diverse communities including Ewe, Avatime, Buem, and Likpe peoples'],
    narration: 'The Togo Highlands — or the Akwapim-Togo chain — reach their most dramatic expression in Ghana\'s Volta Region, where forest-covered slopes, seasonal waterfalls, and communities of extraordinary cultural diversity create one of the country\'s most rewarding highland landscapes. The jewel of this area is the Wli Waterfalls near Hohoe: at 80 metres, the highest waterfall in West Africa, where water crashes down into a pool surrounded by hundreds of thousands of fruit bats that hang from the cliff faces above in vast, rustling colonies. The sound when they take flight is overwhelming — a thunderous beating of wings that makes the forest tremble. The highlands also shelter the Tafi Atome Monkey Sanctuary, where wild mona monkeys have been habituated to human presence by local communities and move freely among visitors in the village — a conservation success story that emerged entirely from traditional community beliefs about the sanctity of these animals.',
    cultural: 'The Volta Region\'s highlands are home to some of Ghana\'s most culturally diverse communities. The Ewe, Avatime, Tafi, Buem, and Likpe peoples each have distinct languages, traditions, and relationships with the landscape they inhabit. The region\'s cultural tourism potential is among the highest in Ghana.',
    geography: 'The Akwapim-Togo chain is the western extension of a longer geological formation that crosses Togo and Benin. The highest point in Ghana (Mount Afadjato) is part of this chain.',
    tourism: 'Wli Waterfalls. Tafi Atome Monkey Sanctuary. Mount Afadjato and Mount Gemi hikes. Amedzofe hill station. Hohoe as a base. This is Ghana\'s most rewarding ecotourism region for visitors with time to explore beyond the coast.',
  },
];

// ── Sound map ─────────────────────────────────────────────────────────────
const SOUNDS = {
  castles:   { src: bs('soundsforyou-wind-in-trees-117477.mp3'),                              label: 'Coastal wind' },
  rivers:    { src: bs('freesound_community-calm-stream-in-forest-19355.mp3'),                label: 'River ambience' },
  forests:   { src: bs('freesound_community-forest-with-small-river-birds-and-nature-field-recording-6735.mp3'), label: 'Forest sounds' },
  mountains: { src: bs('prem_adhikary-mountain-forest-high-quality-sound-176826.mp3'),        label: 'Mountain air' },
};

const TABS = [
  { key: 'castles',   label: 'Castles & Sites',    colour: '#C9A558', data: CASTLES  },
  { key: 'rivers',    label: 'Rivers & Lakes',     colour: '#4a9ec4', data: RIVERS   },
  { key: 'forests',   label: 'Forests & Parks',    colour: '#5a9e6a', data: FORESTS  },
  { key: 'mountains', label: 'Mountains',          colour: '#9b7fc8', data: MOUNTAINS },
];

const SOUND_PERMISSION_KEY = 'mamaAfrica_soundPermission';

// ── WikiImage component ───────────────────────────────────────────────────
function WikiImage({ wikiTitle, name, colour }) {
  const [imgSrc, setImgSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!wikiTitle) {
      setLoading(false);
      setFailed(true);
      return;
    }
    setLoading(true);
    setFailed(false);
    setImgSrc(null);
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiTitle)}`)
      .then(r => r.json())
      .then(data => {
        const src = data.originalimage?.source || data.thumbnail?.source;
        if (src) {
          setImgSrc(src);
        } else {
          setFailed(true);
        }
        setLoading(false);
      })
      .catch(() => {
        setFailed(true);
        setLoading(false);
      });
  }, [wikiTitle]);

  if (loading) {
    return (
      <div style={{
        width: '100%', height: '100%', minHeight: 220,
        background: `linear-gradient(135deg, ${colour}18, ${colour}06)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          border: `2px solid ${colour}44`,
          borderTopColor: colour,
          animation: 'wikiSpin 0.8s linear infinite',
        }} />
        <style>{`@keyframes wikiSpin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (failed || !imgSrc) {
    return (
      <div style={{
        width: '100%', height: '100%', minHeight: 220,
        background: `linear-gradient(135deg, ${colour}22, ${colour}08)`,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        border: `1px dashed ${colour}44`,
      }}>
        <div style={{ fontSize: 32, marginBottom: 8, opacity: 0.4 }}>🏔</div>
        <p style={{
          fontFamily: "'Montserrat', sans-serif", fontSize: 10,
          color: colour, letterSpacing: '0.12em', textTransform: 'uppercase',
          opacity: 0.6, textAlign: 'center', padding: '0 16px',
        }}>
          {name}
        </p>
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={name}
      onError={() => setFailed(true)}
      style={{
        width: '100%', height: '100%', objectFit: 'cover',
        display: 'block', minHeight: 220,
      }}
    />
  );
}

export default function GhanaLandscapesPage() {
  const [activeTab, setActiveTab] = useState('castles');
  const [selectedItem, setSelectedItem] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const [showSoundModal, setShowSoundModal] = useState(false);
  const audioRef = useRef(null);

  const tab = TABS.find(t => t.key === activeTab);
  const item = tab.data[selectedItem] || tab.data[0];
  const sound = SOUNDS[activeTab];

  // Check sound permission on mount, show modal after 1s if not yet decided
  useEffect(() => {
    const perm = localStorage.getItem(SOUND_PERMISSION_KEY);
    if (perm === 'granted') {
      setSoundOn(true);
    } else if (perm !== 'denied') {
      const timer = setTimeout(() => setShowSoundModal(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    setSelectedItem(0);
  }, [activeTab]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = sound.src;
    audio.volume = 0.28;
    audio.loop = true;
    if (soundOn) audio.play().catch(() => {});
    else audio.pause();
  }, [activeTab, soundOn, sound.src]);

  // Start playback inside the user gesture — mobile browsers (iOS) block
  // audio.play() that isn't directly triggered by a tap.
  function startSoundFromGesture() {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.src) audio.src = sound.src;
    audio.volume = 0.28;
    audio.loop = true;
    audio.play().catch(() => {});
  }

  function handleAllowSound() {
    localStorage.setItem(SOUND_PERMISSION_KEY, 'granted');
    startSoundFromGesture();
    setSoundOn(true);
    setShowSoundModal(false);
  }

  function handleDenySound() {
    localStorage.setItem(SOUND_PERMISSION_KEY, 'denied');
    setShowSoundModal(false);
  }

  return (
    <div className="page-wrapper" style={{ background: '#050300', minHeight: '100vh' }}>
      <style>{`
        @keyframes landscapeFadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .landscape-tab { transition: all 0.2s ease; }
        .landscape-tab:hover { background: rgba(255,255,255,0.06) !important; }
        .landscape-item-btn:hover { border-color: rgba(255,255,255,0.25) !important; }
        .landscape-layout { display: grid; grid-template-columns: 260px 1fr; gap: 20px; align-items: start; }
        .landscape-items { display: flex; flex-direction: column; gap: 6px; }
        @media (max-width: 768px) {
          .landscape-layout { grid-template-columns: 1fr; gap: 16px; }
          .landscape-items {
            flex-direction: row; overflow-x: auto; gap: 8px;
            padding-bottom: 8px; -webkit-overflow-scrolling: touch;
          }
          .landscape-items > button { flex: 0 0 auto; min-width: 160px; }
        }
      `}</style>

      {showSoundModal && (
        <SoundPermissionModal
          pageName="landscapes"
          onAllow={handleAllowSound}
          onDeny={handleDenySound}
        />
      )}

      <audio ref={audioRef} preload="none" />

      {/* Header */}
      <div style={{ padding: '32px 24px 0', maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/culture" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '0.16em', color: '#7C5F48', textDecoration: 'none', textTransform: 'uppercase' }}>
          ← Culture Hub
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: tab.colour, boxShadow: `0 0 8px ${tab.colour}` }} />
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.2em', color: '#9E7D42', textTransform: 'uppercase' }}>
            Ghana Landscapes & Heritage
          </span>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 24px 64px' }}>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 4vw, 40px)', color: '#FAF0E0', margin: '0 0 10px' }}>
            The Land of Ghana
          </h1>
          <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 17, color: '#BA9D7C', fontStyle: 'italic', margin: 0 }}>
            Castles that held history. Rivers that carry memory. Forests that breathe with life. Mountains that watch over the living.
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
          {TABS.map(t => (
            <button
              key={t.key}
              className="landscape-tab"
              onClick={() => setActiveTab(t.key)}
              style={{
                background: activeTab === t.key ? `${t.colour}18` : 'rgba(255,255,255,0.03)',
                border: `1px solid ${activeTab === t.key ? t.colour : 'rgba(255,255,255,0.1)'}`,
                borderRadius: 999, padding: '9px 20px', cursor: 'pointer',
                fontFamily: "'Montserrat', sans-serif", fontSize: 12,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: activeTab === t.key ? t.colour : '#7C5F48',
                fontWeight: activeTab === t.key ? 700 : 400,
              }}
            >
              {t.label}
            </button>
          ))}

          {/* Sound toggle */}
          <button
            onClick={() => { if (!soundOn) startSoundFromGesture(); setSoundOn(s => !s); }}
            style={{
              marginLeft: 'auto',
              background: soundOn ? 'rgba(90,158,106,0.15)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${soundOn ? '#5a9e6a' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: 999, padding: '9px 16px', cursor: 'pointer',
              fontFamily: "'Montserrat', sans-serif", fontSize: 11,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: soundOn ? '#5a9e6a' : '#7C5F48',
              display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            {soundOn ? '🔊' : '🔇'} {sound.label}
          </button>
        </div>

        {/* Main layout */}
        <div className="landscape-layout">

          {/* Item list */}
          <div className="landscape-items">
            {tab.data.map((d, i) => (
              <button
                key={i}
                className="landscape-item-btn"
                onClick={() => setSelectedItem(i)}
                style={{
                  background: i === selectedItem ? `${tab.colour}14` : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${i === selectedItem ? tab.colour + '66' : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: 8, padding: '10px 14px', cursor: 'pointer', textAlign: 'left',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: i === selectedItem ? tab.colour : '#7C5F48', fontWeight: 600, marginBottom: 2 }}>
                  {d.name}
                </div>
                {d.region && (
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em' }}>
                    {d.region.split(',')[0]}
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Detail pane */}
          <div key={`${activeTab}-${selectedItem}`} style={{ animation: 'landscapeFadeIn 0.35s ease' }}>

            {/* Image */}
            <div style={{
              borderRadius: 12, overflow: 'hidden',
              border: `1px solid ${tab.colour}22`,
              marginBottom: 20, aspectRatio: '16/9', background: '#0A0600',
              position: 'relative',
            }}>
              <WikiImage wikiTitle={item.wikiTitle} name={item.name} colour={tab.colour} />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(to top, rgba(5,3,0,0.9) 0%, transparent 100%)',
                padding: '32px 20px 18px',
                pointerEvents: 'none',
              }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(18px, 2.5vw, 26px)', color: '#FAF0E0', margin: '0 0 4px' }}>
                  {item.name}
                </h2>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: tab.colour, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
                  {item.region}
                </p>
              </div>
            </div>

            {/* Facts */}
            {item.facts && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                {item.facts.map((f, i) => (
                  <span key={i} style={{
                    fontFamily: "'Montserrat', sans-serif", fontSize: 11,
                    color: tab.colour, background: `${tab.colour}12`,
                    border: `1px solid ${tab.colour}30`,
                    borderRadius: 999, padding: '4px 12px',
                  }}>
                    {f}
                  </span>
                ))}
              </div>
            )}

            {/* Narration */}
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderLeft: `3px solid ${tab.colour}`,
              borderRadius: 10, padding: '20px 22px', marginBottom: 16,
            }}>
              <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 18, color: '#D4B896', lineHeight: 1.9, margin: 0 }}>
                {item.narration}
              </p>
            </div>

            {/* Additional fields */}
            {['cultural', 'wildlife', 'conservation', 'tourism', 'ecology', 'communities', 'geography'].map(key => item[key] && (
              <div key={key} style={{
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: 8, padding: '14px 16px', marginBottom: 10,
              }}>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: tab.colour, margin: '0 0 6px' }}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </p>
                <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 16, color: '#BA9D7C', lineHeight: 1.75, margin: 0 }}>
                  {item[key]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
