import type { Venue, Area, Category, Confidence, RegionId } from "./types";

export function v(
  id: string,
  name: string,
  area: Area,
  category: Category,
  address: string,
  looks: number,
  ratio: number,
  nightlife: boolean,
  peak: string,
  blurb: string,
  notes: string,
  tags: string[],
  confidence: Confidence = "medium",
  region: RegionId = "downtown",
): Venue {
  return {
    id,
    name,
    region,
    area,
    category,
    address,
    looks,
    ratio,
    confidence,
    nightlife,
    peak,
    blurb,
    notes,
    tags,
  };
}

export const CORE: Venue[] = [
	v("preservation-pub", "Preservation Pub", "Market Square", "Bar", "28 Market Square", 7, 6, true, "Thu–Sat 9pm–2am", "Three-floor Market Square institution with nightly live music, pizza, and Knoxville’s longest-running rooftop.", "Weekend nights pull dressed-up 20s–30s mixed with locals. Rooftop and speakeasy levels skew better-looking than the main floor. More even than Old City clubs; groups of women on the roof after dinner.", [
		"rooftop",
		"live music",
		"late night",
		"happy hour"
	], "high"),
	v("scruffy-city-hall", "Scruffy City Hall", "Market Square", "Bar", "32 Market Square", 7, 6, true, "Fri–Sat 8pm–1am", "Sister to Pres Pub: gothic main hall, loggia overlooking the Square, and the Scroof cinepub under the stars.", "People-watching loggia is a magnet for mixed groups. Live-music nights draw a dressed-but-not-club crowd. Ratio sits near even, with more women on the balcony than the main hall.", [
		"rooftop",
		"live music",
		"people watching"
	], "high"),
	v("bernadettes", "Bernadette's Crystal Gardens", "Market Square", "Rooftop", "26 Market Square", 8, 7, true, "Fri–Sat 8pm–1am", "Crystal-lit barrooms stacked three levels, including a lively rooftop on the Square.", "One of the better-looking rooftop rooms downtown. Cocktail-and-photos crowd, bachelorette-adjacent on weekends. Women outnumber men more than at Pres Pub next door.", [
		"rooftop",
		"cocktails",
		"instagram"
	], "high"),
	v("peter-kern", "Peter Kern Library", "Market Square", "Speakeasy", "Alley beside Oliver Hotel, 407 Union Ave", 9, 7, true, "Thu–Sat 8pm–midnight", "Reservation-style speakeasy behind a red alley light. Craft cocktails in a library-themed room.", "Dressy date-night and girls-night destination. Highest looks draw on the Square. Couples plus well-put-together groups; ratio leans female on weeknights, more even when the room fills.", [
		"speakeasy",
		"date night",
		"dressy",
		"cocktails"
	], "high"),
	v("oliver-royale", "Oliver Royale", "Market Square", "Restaurant", "407 Union Ave", 8, 7, true, "Fri–Sat dinner 7–10pm", "Candle-lit restaurant in the Oliver Hotel with a rotating menu and serious cocktails.", "Date-night uniform: dresses, nice shirts. Attractive, slightly older-than-college crowd. Women often the ones who picked the reservation.", [
		"date night",
		"hotel",
		"cocktails"
	], "high"),
	v("oliver-hotel", "Oliver Hotel", "Market Square", "Hotel", "407 Union Ave", 7, 6, false, "Lobby evenings", "Historic boutique hotel (1876 building) anchoring the Square with Royale and Peter Kern attached.", "Lobby and courtyard see dressed hotel guests and dinner traffic. Not a pickup bar; quality of the room is high because of the restaurants.", ["hotel", "historic"], "medium"),
	v("tomato-head", "The Tomato Head", "Market Square", "Restaurant", "12 Market Square", 6, 6, true, "Fri–Sat dinner", "Downtown pioneer since 1990. Pizza, vegetarian plates, patio on the Square.", "All-ages, slightly crunchy, mixed. Patio people-watching is strong but not a dressed-up scene. Ratio near even; more women at weekend brunch.", [
		"patio",
		"brunch",
		"local institution"
	], "high"),
	v("tupelo-honey", "Tupelo Honey", "Market Square", "Restaurant", "1 Market Square", 7, 7, true, "Weekend brunch; Fri dinner", "New South kitchen on the corner of the Square. Cathead biscuits, patio, full bar.", "Brunch is one of the more female-skewed rooms downtown. Dinner is date-and-groups. Attractive 25–40 crowd, especially on the patio.", [
		"brunch",
		"patio",
		"southern"
	], "high"),
	v("cafe-4", "Cafe 4", "Market Square", "Restaurant", "4 Market Square", 6, 6, true, "Fri–Sat patio 7–10pm", "Comfort-food staple with a prime Square patio, punchbowls, and lobster mac.", "After-work and tourist mix. Patio is the draw. Looks average-plus; punchbowl tables can be groups of women. Not a late club.", [
		"patio",
		"happy hour",
		"brunch"
	], "medium"),
	v("stock-barrel", "Stock & Barrel", "Market Square", "Restaurant", "35 Market Square", 7, 5, true, "Fri–Sat 8–11pm", "Burgers, bourbon, and a long wait. Sister to Brass Pearl.", "Bourbon program pulls more men; the room still fills with couples and dressed groups. Looks above average because people wait for it. Ratio slightly male after 9.", [
		"bourbon",
		"burgers",
		"date night"
	], "high"),
	v("brass-pearl", "Brass Pearl", "Market Square", "Restaurant", "37 Market Square", 7, 6, true, "Fri–Sat dinner", "Raw oyster bar with a lively, slightly louder personality than Stock & Barrel.", "Oysters-and-natural-wine energy. Attractive 20s–30s, more even ratio than the bourbon next door. Weekend nights feel social.", [
		"oysters",
		"seafood",
		"lively"
	], "medium"),
	v("emilia", "Emilia", "Market Square", "Restaurant", "4 Market Square", 8, 7, true, "Thu–Sat dinner", "Regional Italian, house pasta, brick room. One of the city’s real date-night tables.", "Well-dressed couples and small groups of women. Looks high, ratio leans female. Not a bar-hop stop — reservation crowd.", [
		"date night",
		"italian",
		"wine"
	], "high"),
	v("soccer-taco", "Soccer Taco", "Market Square", "Restaurant", "4 Market Square", 5, 5, true, "Game days; Fri night", "Tacos, margs, and soccer on the Square patio.", "Casual, mixed, game-day male bump. Summer patio brings more women. Looks average; it’s a pregame more than a destination.", [
		"patio",
		"margs",
		"sports"
	], "medium"),
	v("kabuki-ms", "Kabuki Downtown", "Market Square", "Restaurant", "6 Market Square", 6, 6, true, "Fri–Sat dinner", "Japanese fusion, hibachi, sushi, poke on the Square.", "Date and friend-group dinners. Slightly more women at sushi hour. Not a late bar.", ["sushi", "fusion"], "medium"),
	v("not-watsons", "Not Watson's Kitchen + Bar", "Market Square", "Restaurant", "35 Market Square", 6, 6, true, "Fri–Sat dinner", "New American in a stylish room — steak, pasta, burgers, full bar.", "Tourist-meets-local dinner. Looks average-plus, ratio even. Bar rail is quieter than Stock & Barrel.", ["american", "full bar"], "medium"),
	v("ruby-sunshine", "Ruby Sunshine", "Market Square", "Restaurant", "22 Market Square", 7, 8, true, "Weekend brunch 10am–2pm", "New Orleans brunch all day: beignets, eye-openers, patio.", "One of the most female-skewed rooms on the Square at brunch. Mimosas, groups of women, dressed-casual. Dinner is milder.", [
		"brunch",
		"mimosas",
		"patio"
	], "high"),
	v("myrtles", "Myrtle's Chicken + Beer", "Market Square", "Restaurant", "Market Square", 5, 5, true, "Fri dinner", "Fried chicken, southern sides, craft beer and cocktails.", "Casual comfort. Mixed families early, mixed adults later. Neither a looks magnet nor a sausage fest.", [
		"chicken",
		"southern",
		"beer"
	], "low"),
	v("knox-brew-hub", "Knox Brew Hub", "Market Square", "Bar", "Market Square", 4, 4, true, "Thu trivia; Sat sports", "Craft beer, board games, trivia, Singo, Cajun kitchen (Fred Beans & Rice).", "Beer-and-games crowd leans male. Friendly, not dressy. Ratio improves on trivia teams with mixed groups.", [
		"beer",
		"trivia",
		"games"
	], "medium"),
	v("alice-appalachia", "Alice in Appalachia", "Market Square", "Cocktail", "Market Square", 7, 8, true, "Thu–Sat afternoon–evening", "Fairytale shop plus Down the Rabbit Hole all-day bar: coffee, tea, cocktails, tea sandwiches.", "Shopping-and-sipping. Heavily female. Looks above average because it’s a boutique cocktail concept, not a dive.", [
		"cocktails",
		"shopping",
		"day drinking"
	], "medium"),
	v("square-room", "The Square Room", "Market Square", "Live music", "4 Market Square", 6, 6, true, "Show nights 8pm–close", "Downstairs concert room on the Square. National and regional acts.", "Crowd follows the bill. Indie/pop nights look better and more even; metal/jam skews male. Scores assume a typical mixed show.", ["concerts", "late night"], "medium"),
	v("earth-to-old-city-ms", "Earth to Old City", "Market Square", "Retail", "Market Square", 6, 8, false, "Sat afternoon", "Scruffy little gift shop — clothes, soaps, notebooks, 30 years on.", "Browsing crowd is mostly women. Not nightlife.", ["gifts", "local"], "medium"),
	v("nothing-too-fancy", "Nothing Too Fancy", "Market Square", "Retail", "Market Square", 6, 7, false, "Game days; Sat", "Local hoodies, tees, game-day merch, glassware.", "More even on Vols Saturdays; otherwise female-leaning shoppers.", ["merch", "vols"], "low"),
	v("urban-outfitters", "Urban Outfitters", "Market Square", "Retail", "Market Square", 7, 8, false, "Sat afternoon", "National lifestyle retailer on the Square.", "Young women are the core customer. Looks above average for a shop. Daytime only.", ["fashion", "youth"], "medium"),
	v("earthbound", "Earthbound Trading Co.", "Market Square", "Retail", "Market Square", 5, 7, false, "Sat afternoon", "International décor, jewelry, incense, apparel.", "Tourist and teen-to-30s women. Not a night scene.", ["gifts", "jewelry"], "low"),
	v("union-ave-books", "Union Ave Books", "Union & Clinch", "Retail", "517 Union Ave", 5, 7, false, "Weekday lunch hour", "Independent neighborhood bookstore just off the Square.", "Quiet, female-leaning browsers. No bar.", ["books"], "medium"),
	v("tree-vine", "Tree & Vine", "Market Square", "Retail", "Market Square", 5, 8, false, "Sat", "Olive oil and balsamic tasting bar, gourmet pantry.", "Almost entirely women shopping. Daytime.", ["gourmet", "tasting"], "low"),
	v("vowd", "Vow'd Weddings", "Market Square", "Retail", "Market Square", 8, 10, false, "Appointment hours", "Affordable bridal shop on the Square.", "Bridal appointments — as female as it gets. Looks high by definition of the room.", ["bridal"], "high"),
	v("proper-popcorn", "Proper Popcorn", "Market Square", "Dessert", "Market Square", 5, 7, false, "Evening stroll", "50+ flavors of craft popcorn.", "Families and women with bags of caramel. Foot traffic, not a hang.", ["snacks"], "low"),
	v("rocket-fizz", "Rocket Fizz", "Market Square", "Retail", "Market Square", 4, 6, false, "Afternoon", "Vintage candy and weird sodas.", "Tourists, kids, mixed adults. Neutral.", ["candy"], "low"),
	v("citifid-o", "CitiFid-O", "Market Square", "Retail", "Market Square", 5, 7, false, "Daytime", "Premium pet shop on the Square.", "Dog people, more women than men.", ["pets"], "low"),
	v("eddies-health", "Eddie's Health Shoppe", "Market Square", "Retail", "Market Square", 5, 5, false, "Daytime", "Vitamins, supplements, wellness.", "Gym-adjacent mix. Slightly more men in the supplement aisle.", ["wellness"], "low"),
	v("subway-ms", "Subway", "Market Square", "Restaurant", "Market Square", 3, 5, false, "Weekday lunch", "The only national sandwich chain in the central business district.", "Office lunch. No scene.", ["lunch", "chain"], "low"),
	v("lunchbox", "The Lunchbox", "Union & Clinch", "Restaurant", "Union Ave", 4, 6, false, "Weekday 11:30–1:30", "Deli sandwiches, soup, cookies — downtown worker favorite.", "Office women slightly outnumber men at lunch. Closed nights.", ["lunch", "deli"], "medium"),
	v("tommy-trents", "Tommy Trent's", "Market Square", "Sports bar", "Market Square", 4, 4, true, "Vols games; Sat night", "Smash burgers, saloon fries, vintage sports-bar energy.", "Game-day male bump. Looks average. More of a guys-and-couples burger stop than a club.", ["burgers", "sports"], "medium"),
	v("petes", "Pete's Restaurant", "Union & Clinch", "Restaurant", "540 Union Ave", 4, 5, false, "Sat breakfast", "Knoxville diner since 1986. Biscuits, omelets, burgers.", "Locals of every age. No nightlife. Ratio even-to-male at breakfast.", ["diner", "breakfast"], "high"),
	v("jc-holdway", "J.C. Holdway", "Union & Clinch", "Restaurant", "501 Union Ave", 8, 6, true, "Thu–Sat dinner", "James Beard chef Joseph Lenn. Wood fire, Appalachian plates, Michelin Guide nod.", "The dressiest dinner in the district after Peter Kern. Couples; looks high; ratio near even because men book it too. Bar seats are the social bit.", [
		"date night",
		"fine dining",
		"wood fire"
	], "high"),
	v("chesapeakes", "Chesapeake's", "Union & Clinch", "Restaurant", "500 Henley St", 6, 6, true, "Fri–Sat dinner", "Big nautical seafood house just off Union. Oysters, crab, Slow Delaware pie.", "Tourists, families, some dates. Looks average-plus. Not a bar crawl stop.", ["seafood", "tourists"], "medium"),
	v("coffee-chocolate", "Coffee & Chocolate", "Union & Clinch", "Coffee", "Union Ave", 6, 8, false, "Sat 11am–3pm", "Lattes plus truffles and macarons next to the Strong Alley mural.", "Heavily female, especially weekend. Looks above average for a cafe. Closes before nightlife.", [
		"coffee",
		"chocolate",
		"mural"
	], "medium"),
	v("mahalo", "Mahalo Coffee Roasters", "Union & Clinch", "Coffee", "Union Ave", 6, 7, false, "Weekday mornings; Sat", "Specialty coffee on Union.", "Remote-work and weekend lines. More women than men. Daytime.", ["coffee"], "medium"),
	v("five-thirty", "Five Thirty Lounge", "Gay Street", "Rooftop", "510 S Gay St (Hyatt Place)", 9, 7, true, "Fri–Sat 8pm–midnight", "Indoor/outdoor rooftop at Hyatt Place. Fire pit, gold bar, mountain and Sunsphere views.", "Consistently cited as the stylish rooftop. Date night and dressed groups of women. Highest looks draw on Gay Street. Ratio leans female until the room packs, then evens out.", [
		"rooftop",
		"dressy",
		"cocktails",
		"views"
	], "high"),
	v("radius", "Radius Rooftop Lounge", "Gay Street", "Rooftop", "618 S Gay St (Embassy Suites)", 8, 6, true, "Fri–Sat 9pm–1am", "Circular rooftop bar and pool at Embassy Suites. 360 views, louder than Five Thirty.", "Younger and more ‘lit’ than Five Thirty. Party rooftop — good-looking college-to-late-20s. More men hunting than Five Thirty, so ratio is closer to even. Pool season looks better.", [
		"rooftop",
		"pool",
		"party",
		"hotel"
	], "high"),
	v("the-vault", "The Vault", "Gay Street", "Cocktail", "Holston Building basement, S Gay St", 9, 6, true, "Thu–Sat 8pm–midnight", "Cocktails in a former bank vault under Vida. Dress code (no hats, hoodies, flip-flops, camo).", "Dress code filters for a better-looking room. Date night and dressed-up groups. Ratio near even-to-female. One of downtown’s highest looks scores.", [
		"dress code",
		"speakeasy",
		"cocktails",
		"date night"
	], "high"),
	v("vida", "Vida", "Gay Street", "Restaurant", "Holston Building, S Gay St", 8, 6, true, "Fri–Sat dinner", "Pan-Latin share plates and small-batch cocktails in the old Holston Bank.", "Swanky, reservation-driven. Attractive couples. Bar is social; dining room is dates.", [
		"latin",
		"date night",
		"cocktails"
	], "high"),
	v("tern-club", "Tern Club", "Gay Street", "Cocktail", "100 block S Gay St", 8, 7, true, "Thu–Sat 7pm–11pm", "Tropical cocktail bar with a colorful patio on the 100 block.", "Tiki-adjacent, photogenic, popular with women and dates. Patio is the looks magnet. Ratio leans female.", [
		"tiki",
		"patio",
		"cocktails"
	], "high"),
	v("fat-tuesday", "Fat Tuesday", "Gay Street", "Bar", "417 S Gay St", 6, 7, true, "Fri–Sat 8pm–1am", "New Orleans daiquiri bar in the Kress Building. Frozen drinks day and night.", "Bachelorette and girls-night fuel. Looks mixed (to-go cups, tourists). Ratio leans female, especially daytime and early night.", [
		"daiquiris",
		"to-go",
		"bachelorette"
	], "medium"),
	v("clancys", "Clancy's Tavern & Whiskey House", "Gay Street", "Bar", "Gay Street", 5, 4, true, "Thu–Sat 8pm–close", "Irish pub with deep whiskey flights — Tennessee, Scotland, themed tours.", "Whiskey lists pull more men. Friendly mixed pub by day; male-leaning after 9. Not a looks destination.", [
		"irish",
		"whiskey",
		"pub"
	], "medium"),
	v("suttrees", "Suttree's High Gravity Tavern", "Gay Street", "Bar", "S Gay St", 5, 4, true, "Fri–Sat 8pm–close", "32 rotating high-gravity taps, tap takeovers, beer-nerd hang.", "Craft-beer male skew. Quality drinkers, not a dressed scene. Ratio low-to-mid.", ["beer", "taps"], "medium"),
	v("dgb", "Downtown Grill & Brewery", "Gay Street", "Brewery", "424 S Gay St", 5, 5, true, "Vols games; Fri 8–11pm", "DGB — 15-barrel house, burgers, pizza, pasta. Classic downtown gathering place.", "Big, loud, mixed ages. Game days more male. After-work more even. Looks average. Reliable, not sexy.", [
		"brewery",
		"sports",
		"happy hour"
	], "high"),
	v("lilou", "Lilou", "Gay Street", "Restaurant", "Hotel Cleo, S Gay St", 8, 7, true, "Fri–Sat dinner; Sun brunch", "French brasserie in Hotel Cleo. Tartare, duck, escargot, brunch.", "Dressy, attractive, date-forward. Brunch leans female. One of Gay Street’s prettiest rooms.", [
		"french",
		"date night",
		"hotel"
	], "high"),
	v("hotel-cleo", "Hotel Cleo", "Gay Street", "Hotel", "S Gay St", 7, 6, false, "Evenings in common spaces", "Boutique hotel in a historic building; Lilou is the restaurant.", "Hotel guests and dinner spillover. Quality crowd, not a club.", ["hotel", "boutique"], "medium"),
	v("bistro-bijou", "Bistro at the Bijou", "Gay Street", "Restaurant", "803 S Gay St", 7, 6, true, "Weekend jazz dinner", "Farm-to-table next to the Bijou. Live jazz on weekends. Sister to Dazzo’s.", "Jazz nights are date night — attractive 30s–50s. Ratio even-to-female. Not a late bar.", [
		"jazz",
		"date night",
		"farm to table"
	], "medium"),
	v("chivo", "Chivo Taqueria", "Gay Street", "Restaurant", "S Gay St", 7, 6, true, "Fri–Sat dinner", "Tacos, tequila, award margs, local sourcing.", "Lively, good-looking casual. Bar is social. Ratio near even; marg nights pull more women.", [
		"tacos",
		"tequila",
		"margs"
	], "high"),
	v("nama", "Nama Sushi Bar", "Gay Street", "Restaurant", "S Gay St", 7, 6, true, "Happy hour 3–6; Fri dinner", "Creative sushi and cocktails. Fusion rolls, vegetarian options, daily happy hour.", "Date and after-work sushi. Attractive room. Ratio even, slightly more women at happy hour.", [
		"sushi",
		"happy hour",
		"cocktails"
	], "high"),
	v("kopita", "KoPita", "Gay Street", "Restaurant", "Embassy Suites mezzanine", 6, 6, true, "Dinner", "Elevated Mediterranean / Israeli family recipes on the Embassy mezzanine.", "Hotel diners and locals. Looks average-plus. Quiet compared with Radius upstairs.", ["mediterranean", "hotel"], "medium"),
	v("harvest", "Harvest", "Gay Street", "Restaurant", "S Gay St", 7, 6, true, "Fri–Sat dinner", "Seasonal small plates, charcuterie, steak and seafood, local ingredients.", "Date-night small plates. Attractive, slightly older. Ratio even.", ["seasonal", "small plates"], "medium"),
	v("humble-hog", "Humble Hog", "Gay Street", "Restaurant", "S Gay St", 5, 5, true, "Lunch and early dinner", "BBQ slice on Gay Street.", "Casual, mixed, not a night scene.", ["bbq"], "low"),
	v("dazzos", "Dazzo's Pizzeria", "Gay Street", "Restaurant", "S Gay St", 5, 5, true, "Late slices Fri–Sat", "NY-style slices, pasta, daily lunch specials. Sister to Bistro at the Bijou.", "Late-night pizza after bars. Mixed, slightly more men after midnight.", ["pizza", "late night"], "medium"),
	v("dicarlos", "DiCarlo's Pizza", "Gay Street", "Restaurant", "S Gay St", 4, 5, true, "Late night", "Ohio Valley-style pizza — sauce and cheese on after the bake.", "Late-night soak-up-the-beer stop. Ratio even-to-male. Looks not the point.", ["pizza", "late night"], "low"),
	v("brown-bag", "Brown Bag", "Gay Street", "Restaurant", "S Gay St", 4, 6, false, "Weekday lunch", "Simple healthy weekday lunches.", "Office lunch, slightly more women. Closed nights.", ["lunch", "healthy"], "low"),
	v("hello-tea", "Hello Tea House", "Gay Street", "Cafe", "S Gay St", 6, 8, false, "Sat afternoon", "Bubble tea and crepes.", "Young, heavily female. Looks above average for a tea shop. Daytime/early evening.", ["boba", "crepes"], "medium"),
	v("jacks-knox", "Jacks of Knoxville", "Gay Street", "Coffee", "S Gay St", 6, 8, false, "Sat", "Plants, local goods, patio lattes.", "Women buying plants and candles. Cute patio. Not nightlife.", [
		"coffee",
		"plants",
		"gifts"
	], "medium"),
	v("starbucks-gay", "Starbucks on Gay Street", "Gay Street", "Coffee", "S Gay St (Hyatt Place)", 5, 6, false, "Mornings; pregame", "Full-service Starbucks off the Hyatt lobby.", "Hotel guests and shoppers. Slightly more women. No night scene.", [
		"coffee",
		"chain",
		"hotel"
	], "medium"),
	v("k-brew-gay", "K Brew Coffee & Bagels", "Gay Street", "Coffee", "S Gay St", 6, 7, false, "Weekend mornings", "Handheld bagel sandwiches and seasonal coffee.", "Brunch-adjacent, female-leaning lines. Daytime.", ["coffee", "bagels"], "medium"),
	v("status-dough", "Status Dough", "Gay Street", "Dessert", "S Gay St", 5, 7, false, "Weekend mornings", "Doughnuts, pączki, iced coffee.", "Sweet-tooth line, more women. Morning.", ["doughnuts"], "low"),
	v("cruze-farm", "Cruze Farm Ice Cream", "Gay Street", "Dessert", "S Gay St", 6, 7, false, "Evening stroll, especially summer", "Jersey-cow soft serve, dips, sprinkles. Local staple.", "Families plus groups of women walking Gay Street. Looks average-plus because it’s a night-stroll stop between bars.", ["ice cream", "stroll"], "high"),
	v("phoenix-fountain", "Phoenix Pharmacy & Fountain", "Gay Street", "Dessert", "S Gay St", 6, 7, false, "Evening", "Working pharmacy with a vintage soda fountain — shakes, floats, sundaes.", "Dates and families. Cute, female-leaning. Not a bar.", ["soda fountain", "historic"], "medium"),
	v("kilwins", "Kilwins", "Gay Street", "Dessert", "S Gay St", 5, 7, false, "Evening stroll", "Fudge, caramel apples, ice cream, chocolates.", "Tourist stroll. More women. Day and early night.", ["candy", "ice cream"], "medium"),
	v("ham-n-goodys", "Ham'n Goodys", "Gay Street", "Dessert", "Embassy Suites", 5, 7, false, "Afternoon", "Lemon cookies since 1978, cakes, treats.", "Gift-and-cookie crowd, mostly women.", ["bakery", "cookies"], "medium"),
	v("downtown-wine", "Downtown Wine + Spirits", "Gay Street", "Retail", "S Gay St", 5, 4, false, "Fri 5–7pm", "Boutique bottles, artisan spirits, seasonal beer.", "Bottle-shop mix, slightly more men. Tastings vary.", ["wine", "spirits"], "low"),
	v("maple-hall", "Maple Hall", "Gay Street", "Entertainment", "S Gay St", 7, 6, true, "Fri–Sat 8pm–midnight", "11-lane bowling with leather couches, full bar, cocktails, HD TVs.", "Date-night bowling. Attractive dressed-casual 20s–30s. Groups of women on weekend nights. Ratio near even-to-female.", [
		"bowling",
		"date night",
		"cocktails"
	], "high"),
	v("maple-room", "Maple Room", "Gay Street", "Bar", "Above Maple Hall", 6, 6, true, "Fri–Sat evening", "Life-size vintage board games and a lounge bar above Maple Hall.", "Couples and friend groups. Less of a meat market than the lanes. Even ratio.", ["games", "lounge"], "medium"),
	v("harrogates", "Harrogate's Lounge", "Gay Street", "Bar", "S Gay St", 5, 4, true, "Fri–Sat 9pm–close", "Barcade: pinball, Pac-Man, pool, darts, craft beer, ramen.", "Arcade bars skew male. Ramen helps. Looks average. Fun, not dressy.", [
		"arcade",
		"ramen",
		"beer"
	], "medium"),
	v("knox-box", "Knox Box Karaoke", "Gay Street", "Entertainment", "Basement, S Gay St", 6, 6, true, "Fri–Sat 10pm–2am", "Neon basement karaoke, late.", "Groups of women singing; men at the bar. Ratio near even, looks mixed. Peak after 11.", ["karaoke", "late night"], "medium"),
	v("topgolf-suite", "TOPGOLF Swing Suite", "Gay Street", "Entertainment", "Embassy Suites", 5, 4, true, "Fri evening", "Golf simulators and virtual sports at Embassy Suites.", "Bachelor, corporate, and dude energy. Some mixed groups. More men.", ["golf", "hotel"], "medium"),
	v("skybox", "SkyBox Sports Bar & Grill", "Gay Street", "Sports bar", "S Gay St", 4, 3, true, "Vols games; NFL Sundays", "Dozen-plus TVs, game-day food.", "Classic sports-bar male skew. Looks average. Ratio lowest on football Saturdays.", ["sports", "vols"], "medium"),
	v("regal-riviera", "Regal Riviera", "Gay Street", "Entertainment", "S Gay St", 5, 6, false, "Fri–Sat evening shows", "Eight-screen movie house with historic vibe.", "Date night mixed, slightly more women at rom-coms. Not a bar.", ["movies"], "medium"),
	v("tennessee-theatre", "Tennessee Theatre", "Gay Street", "Live music", "604 S Gay St", 6, 6, true, "Show nights", "The South’s most beautiful theatre. Concerts, organ, marquee photos.", "Crowd follows the act. Typical concert is even and reasonably dressed. Marquee photos pull groups of women before doors.", [
		"concerts",
		"historic",
		"landmark"
	], "high"),
	v("bijou", "Bijou Theatre", "Gay Street", "Live music", "803 S Gay St", 6, 6, true, "Show nights", "Oldest performance venue in Tennessee. Intimate, great sound.", "Same as any good room: the bill sets the ratio. Folk/indie more women; comedy more even.", ["concerts", "historic"], "high"),
	v("embassy-suites", "Embassy Suites by Hilton", "Gay Street", "Hotel", "618 S Gay St", 6, 5, false, "Evenings", "Historic-shell hotel with Radius, KoPita, Ham'n Goodys, TOPGOLF, Wake Foot.", "Hotel traffic. The rooftop is the scene, not the lobby.", ["hotel"], "medium"),
	v("hyatt-place", "Hyatt Place Downtown", "Gay Street", "Hotel", "510 S Gay St", 6, 5, false, "Evenings", "Gay Street hotel under Five Thirty Lounge, Starbucks in lobby.", "Same — rooftop is the draw.", ["hotel"], "medium"),
	v("mast-general", "Mast General Store", "Gay Street", "Retail", "S Gay St", 5, 6, false, "Sat afternoon", "Two floors of candy barrels, outdoor gear, kitchen, apparel.", "Tourist families, even-to-female. Daytime anchor.", ["general store", "tourists"], "high"),
	v("bliss", "Bliss & Tori Mason Shoes", "Gay Street", "Retail", "S Gay St", 8, 9, false, "Sat", "Award-winning boutique: clothes, shoes, gifts, home.", "Well-dressed women shopping. Highest looks among retail. Daytime.", ["fashion", "boutique"], "medium"),
	v("brandy-melville", "Brandy Melville", "Gay Street", "Retail", "S Gay St", 8, 9, false, "Sat afternoon", "Youth fashion — one-size, teen-to-college women.", "Young, conventionally attractive female shoppers. Not nightlife.", ["fashion", "youth"], "medium"),
	v("spice-tea", "Spice & Tea Exchange", "Gay Street", "Retail", "S Gay St", 5, 8, false, "Daytime", "Spices, blends, loose-leaf teas.", "Almost entirely women browsing.", ["gourmet"], "low"),
	v("addisons", "Addison's", "Gay Street", "Retail", "126 S Gay St", 5, 6, false, "Afternoon", "Two-story used and rare books on the 100 block.", "Quiet mixed browsers, slightly more women.", ["books"], "medium"),
	v("nouveau-classics", "Nouveau Classics", "Gay Street", "Retail", "S Gay St", 5, 6, false, "Daytime", "Contemporary furniture.", "Couples shopping. Neutral.", ["furniture"], "low"),
	v("wake-foot", "Wake Foot Sanctuary", "Gay Street", "Salon", "Embassy Suites", 7, 9, false, "Afternoon–evening", "Handmade foot soaks at Embassy Suites.", "Almost all women, often dressed to go out after. Looks above average.", ["spa", "pregame"], "medium"),
	v("nail-room", "Nail Room", "Gay Street", "Salon", "S Gay St", 7, 9, false, "Fri–Sat afternoon", "Mani/pedi with a complimentary glass of wine.", "Pregame for girls’ night. Heavily female, looks high because they’re headed out.", ["nails", "pregame"], "medium"),
	v("sugar-coated", "Sugar Coated", "Gay Street", "Salon", "S Gay St", 7, 9, false, "Fri", "Custom spray tans and sugaring.", "Almost all women, often before a night out.", ["tanning", "pregame"], "medium"),
	v("culture-hair", "Culture Hair Studio", "Gay Street", "Salon", "S Gay St", 7, 8, false, "Fri–Sat", "Creative downtown hair studio.", "Clients are mostly women getting ready for the weekend.", ["hair"], "low"),
	v("aveda", "Douglas J Aveda Institute", "Gay Street", "Salon", "S Gay St", 6, 8, false, "Daytime", "Student salon, affordable services.", "Young women. Daytime.", ["hair", "school"], "low"),
	v("meadowsweet", "Meadowsweet Massage", "Gay Street", "Salon", "S Gay St", 6, 8, false, "Daytime", "Massage therapy and wellness studio.", "Mostly women. Not a hangout.", ["spa"], "low"),
	v("amulet", "Amulet", "Old City", "Salon", "103 W Jackson Ave", 7, 8, false, "Daytime", "Appalachian salon, spa, and curated gift shop.", "Stylish women. Daytime Old City.", ["salon", "gifts"], "medium"),
	v("emporium", "Emporium Center", "Gay Street", "Attraction", "100 S Gay St", 5, 6, false, "First Friday", "Fine arts center, First Friday ArtWalk hub, event venue.", "ArtWalk nights mix evenly and dress a bit. Looks average-plus those nights.", ["art", "first friday"], "medium"),
	v("art-market", "Art Market Gallery", "Gay Street", "Retail", "S Gay St", 5, 7, false, "First Friday", "Co-op of 50+ East Tennessee artists.", "Browsers lean female.", ["art"], "low"),
	v("east-tn-history", "Museum of East Tennessee History", "Gay Street", "Attraction", "601 S Gay St", 4, 5, false, "Weekend afternoons", "Voices of the Land and regional exhibits.", "Families and older visitors. Even-to-male. Daytime.", ["museum"], "medium"),
	v("blount-mansion", "Blount Mansion", "Gay Street", "Attraction", "200 W Hill Ave", 4, 5, false, "Tour hours", "1792 National Historic Landmark, birthplace of Tennessee.", "Tourists, mixed ages. No nightlife.", ["historic"], "medium"),
	v("visitors-center", "Knoxville Visitors Center", "Gay Street", "Attraction", "Gay & Summit Hill", 5, 6, false, "Daytime", "WDVX Blue Plate Special live noon shows, visitor info.", "Tourists. Blue Plate audience is older mixed.", ["visitor", "radio"], "medium"),
	v("mirage", "Mirage Knoxville", "Gay Street", "Bar", "S Gay St", 5, 4, true, "Thu–Sat 10pm–2am", "Hookah bar with Mediterranean fare.", "Late, mixed, slightly more men. Looks average. Different crowd than rooftops.", ["hookah", "late night"], "low"),
	v("holistic", "The Holistic Connection", "Gay Street", "Retail", "S Gay St", 4, 4, false, "Evening", "Cannabis dispensary and dab bar.", "Mixed, slightly male. Not a dressed scene.", ["cannabis"], "low"),
	v("chismoso", "Chismoso", "Old City", "Cocktail", "131 S Gay St", 7, 6, true, "Fri–Sat 8pm–close", "Mexican-American cocktails and comida on the Gay/Old City seam.", "Good-looking cocktail crowd, date and groups. Ratio near even.", ["cocktails", "mexican"], "medium"),
	v("dulces", "Dulce's Cafe", "Old City", "Restaurant", "145 S Gay St", 5, 6, false, "Lunch; early dinner", "Family-run Jamaican cafe.", "Casual, mixed. Not nightlife.", ["jamaican", "lunch"], "low"),
	v("yassins", "Yassin's Falafel House", "Jackson & Depot", "Restaurant", "Marble City Market (temp downtown)", 5, 6, false, "Lunch and dinner", "GMA’s Nicest Place in America. Falafel, hummus, gyros. Temporarily in Marble City Food Hall.", "All-ages, wholesome, slightly more women. No bar scene.", ["mediterranean", "local legend"], "high"),
	v("drawing-room", "Drawing Room at The Tennessean", "Gay Street", "Restaurant", "The Tennessean Hotel", 7, 6, true, "Fri–Sat dinner", "Elegant hotel dining.", "Hotel dates and business. Looks above average, ratio even. Quiet.", ["hotel", "fine dining"], "medium"),
	v("tennessean", "The Tennessean Hotel", "Gay Street", "Hotel", "S Gay St", 6, 5, false, "Evenings", "Luxury urban hotel.", "Guests. Drawing Room is the public scene.", ["hotel"], "medium"),
	v("french-market", "French Market Creperie", "Union & Clinch", "Cafe", "Clinch Ave", 6, 7, false, "Brunch and afternoon", "Sweet and savory crepes on Clinch.", "Women and couples. Looks average-plus. Daytime.", ["crepes", "brunch"], "medium"),
	v("toast-cafe", "Toast Cafe", "Union & Clinch", "Cafe", "Downtown", 5, 6, false, "Breakfast and lunch", "NYC-style corner cafe.", "Morning mix. Slightly more women.", ["breakfast"], "low")
];
