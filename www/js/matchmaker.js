

var matchMakerModel = (function(){
	"use strict";

	var settings = {},
		_categories = {
			foodtype:{
				bg:'img/Matchmaker_generic1.jpg',
				bc:'Food type',
				cats:[
					{name:'Light Bites & Starters',id:'lightbiteandstarters'},
					{name:'Fish',id:'fish'},
					{name:'Meat',id:'meat'},
					{name:'World Cuisine',id:'worldcuisine'},
					{name:'Cheese',id:'cheese'},
					{name:'Desserts',id:'desserts'}
				]
			},
			
			/*LB&S*/
			lightbiteandstarters:{
				bg:'img/matchmakercats/Category light bites.jpg',
				bc:'Light Bites & Starters',
				cats:[
					{name:'Salads',id:'salads'},
					{name:'Soups',id:'soups'},
					{name:'Starters Meat & Fish',id:'startersmeatandfish'},
					{name:'Starters Vegetarian',id:'startersvegetarian'}
				]
			},
			/* Sub category of lb&s*/
			salads:{
				bg:'img/matchmakercats/subcats/subcategory salad.jpg',
				bc:'Light Bites & Starters / Salads',
				cats:[
					{name:'Caesar Salad',id:'caesarsalad'},
					{name:'Niçoise',id:'nicoise'},
					{name:'Tomato and mozzarella salad',id:'tms'},
					{name:'Greek salad',id:'greeksalad'}
				]
			},
			/* Sub sub category -- salads*/
			caesarsalad:{
				bgcolor:'white',
				bc:'Caesar Salad',
				grapes:[
					'Sauvignon Blanc', 'Chardonnay', 'Cortese'
				],
				styles:[
					'Sancerre', 'Chablis', 'Gavi'
				],
				notes:[
					'Pair a wine that is as light and refreshing as a Caesar salad such as an aromatic Sauvignon Blanc or bone-dry Chablis. If you’re topping your greens with grilled chicken, Gavi or Spanish Albarino works perfectly too.'
				]
			},
			nicoise:{
				bgcolor:'rose',
				bc:'Niçoise',
				grapes:[
					'Grenache', 'Syrah', 'Verdicchio'
				],
				styles:[
					'Provence Rosé','Côtes du Rhône','Verdicchio dei Castelli di Jesi'
				],
				notes:[
					'Provencal rosé is a sure winner with niçoise, Côtes du Rhône rosés work very well too as the flavours can stand up to the meaty texture of tuna.'
				]
			},
			tms:{
				bgcolor:'white',
				bc:'Tomato and mozzarella salad',
				grapes:[
					'Sauvignon Blanc', 'Verdicchio', 'Albarino'
				],
				styles:[
					'Sancerre', 'Vinho Verde', 'Verdicchio dei Castelli di Jesi'
				],
				notes:[
					'A tomato and mozzarella salad is wonderful with a generous topping of basil, to which aromatic or herbacious wines such as Loire Sauvignon Blanc or Verdicchio are perfectly suited.'
				]
			},
			greeksalad:{
				bgcolor:'white',
				bc:'Greek Salad',
				grapes:[
					'Sauvignon Blanc', 'Verdejo', 'Viura'
				],
				styles:[
					'Rueda Blanco', 'Sancerre', 'Marlborough Sauvignon Blanc'
				],
				notes:[
					'Feta and olives work with citrus dominant wines such as Sauvignon Blanc (both old and new world) or Spanish Rueda.'
				]
			},
			/* end Sub sub category -- salads*/
			soups:{
				bg:'img/matchmakercats/subcats/subcategory soup.jpg',
				bc:'Light Bites & Starters / Soups',
				cats:[
					{name:'Onion soup',id:'onionsoup'},
					{name:'Mushroom',id:'mushroom'},
					{name:'Tomato and basil',id:'tb'},
					{name:'Carrot',id:'soupcarrot'}
				]
			},
			/* start sub sub category - soups*/
			onionsoup:{
				bgcolor:'white',
				bc:'Onion Soup',
				grapes:[
					'Chardonnay', 'Gamay', 'Dolcetto'
				],
				styles:[
					'Bourgogne Blanc', "Dolcetto d’Alba", 'Beaujolais'
				],
				notes:[
					'French Onion soup is a hearty dish as it combines beef stock and toppings of melted cheese. A flavoursome wine with bright acidity to break up the dish works well, such as Bourgogne Chardonnay or Italian Dolcetto.'
				]
			},
			mushroom:{
				bgcolor:'white',
				bc:'Mushroom',
				grapes:[
					'Chardonnay', 'Pinot Noir', 'Viognier'
				],
				styles:[
					'Bourgogne Blanc', 'Chablis', 'Southern Rhône white'
				],
				notes:[
					'With creamy mushroom soup pair a creamy white such as Bourgogne Chardonnay. For darker, more rustic mushroom soups pair with Pinot Noir or a full bodied Viognier.'
				]
			},
			tb:{
				bgcolor:'white',
				bc:'Tomato and basil',
				grapes:[
					'Albarino', 'Sauvignon Blanc', 'Tempranillo'
				],
				styles:[
					'Rias Baixas Albarino', 'Sancerre', 'Rioja Crianza'
				],
				notes:[
					'For light, fresh tomato soup pair with citrus flavoured wines such as Sauvignon Blanc. For richer, sundried flavours pair with a young Rioja.'
				]
			},
			soupcarrot:{
				bgcolor:'white',
				bc:'Carrot',
				grapes:[
					'Pinot Grigio', 'Pinot Blanc', 'Sauvignon Blanc'
				],
				styles:[
					'Bordeaux Blanc', 'Italian Pinot Grigio','Alsatian Pinot Blanc'
				],
				notes:[
					'For lighter styles of carrot soup you need a wine that won’t overpower the sweet, delicate flavour such as a Soave or Bordeaux Sauvignon Blanc. The creamier the soup the fuller the wine pairing, try Alsatian Pinot Blanc.'
				]
			},
			/* end Sub sub category -- soups*/
			startersmeatandfish:{
				bg:'img/matchmakercats/subcats/subcategory meat and fish.jpg',
				bc:'Light Bites & Starters / Starters Meat & Fish',
				cats:[
					{name:'Prawn Cocktail',id:'prawncocktail'},
					{name:'Satay chicken',id:'sataychicken'},
					{name:'Smoked Salmon',id:'smokedsalmon'},
					{name:'Fish Cakes',id:'fishcakes'}
				]
			},
			/* start sub sub category -- startersmeatandfish*/
			prawncocktail:{
				bgcolor:'white',
				bc:'Prawn Cocktail',
				grapes:[
					'Sauvignon Blanc', 'Sémillon', 'Riesling'
				],
				styles:[
					'Bordeaux Blanc', 'Alsatian Off-dry Riesling', 'Marlborough Sauvignon Blanc'
				],
				notes:[
					'The most important flavour to match is the marie-rose sauce which can be slightly spicy/ zingy. Try pairing with an off-dry Riesling or if your prawn cocktail has a splash of lemon juice, with a New Zealand Sauvignon Blanc.'
				]
			},
			sataychicken:{
				bgcolor:'white',
				bc:'Satay Chicken',
				grapes:[
					'Corvina', 'Riesling', 'Chardonnay'
				],
				styles:[
					'Valpolicella', 'Alsatian Off-dry Riesling', 'Montrachet'
				],
				notes:[
					'Satay chicken isn’t necessarily spicy, but it is full-flavour. Try pairing with an off-dry Riesling or a wine with full-fruit appeal, like a Valpolicella.'
				]
			},
			smokedsalmon:{
				bgcolor:'white',
				bc:'Smoked Salmon',
				grapes:[
					'Pinot Noir', 'Riesling', 'Sauvignon Blanc'
				],
				styles:[
					'Sancerre', 'Rosé Champagne', 'German Kabinett Riesling (dry)'
				],
				notes:[
				'Smoked salmon is salmon in its tastiest, full-flavour form. The wine should have enough acidity and flavour to break through the oily texture. Try a Rosé Champagne or a bright, citrusy Sancerre.'
				]
			},
			fishcakes:{
				bgcolor:'white',
				bc:'Fish Cakes',
				grapes:[
					'Chenin Blanc', 'Sauvignon Blanc', 'Sémillon'
				],
				styles:[
					'Bordeaux Blanc', 'South African Chenin Blanc', 'Sancerre'
				],
				notes:[
					'Pairing wine with fish cakes depends on the fish you use, but as a general rule pair with a dry white such as Bordeaux Sauvignon Blanc or a bright Chenin Blanc from South Africa.'
				]
			},
			/* end Sub sub category -- startsmeatandfish*/
			startersvegetarian:{
				bg:'img/matchmakercats/subcats/subcategory vegetarian.jpg',
				bc:'Light Bites & Starters / Starters Vegetarian',
				cats:[
					{name:'Onion Bahji',id:'onionbahji'},
					{name:'Stuffed Mushrooms',id:'stuffedmushrooms'},
					{name:'Stuffed Peppers',id:'stuffedpeppers'},
					{name:'Beetroot and Goats Cheese',id:'bagc'}
				]
			},
			/* start sub sub category -- startersvegetarian*/
			onionbahji:{
				bgcolor:'white',
				bc:'Onion Bahji',
				grapes:[
					'Riesling', 'Gewurztraminer', 'Chenin Blanc'
				],
				styles:[
					'Alsatian off-dry Riesling', 'German Spatlese', 'Off-dry Vouvray'
				],
				notes:[
					'This spicy starter needs an off-dry white with high acidity to balance the flavours and cut through any excess grease.'
				]
			},
			stuffedmushrooms:{
				bgcolor:'red',
				bc:'Stuffed Mushrooms',
				grapes:[
					'Syrah', 'Zinfandel', 'Cabernet Sauvignon'
				],
				styles:[
					'Rhône reds', 'Bordeaux Cabernet Sauvignon', 'Californian Zinfandel'
				],
				notes:[
					'Flat mushrooms have a fabulous earthy flavour which pairs wonderfully with earthy reds with rustic charm. Try French classics such as Côtes du Rhône or left bank Bordeaux (Cabernet Sauvignon).'
				]
			},
			stuffedpeppers:{
				bgcolor:'red',
				bc:'Stuffed Peppers',
				grapes:[
					'Tempranillo', 'Grenache', 'Merlot'
				],
				styles:[
					'Rioja Crianza', 'Mainland Spain Grenache', 'Californian Merlot'
				],
				notes:[
					'A lovely Mediterranean starter, packed full of flavour needs an equally impressive wine. Try a youthful, fruit driven Rioja Crianza or Californian Merlot.'
				]
			},
			bagc:{
				bgcolor:'white',
				bc:'Beetroot and Goats Cheese',
				grapes:[
					'Sauvignon Blanc', 'Chenin Blanc', 'Albarino'
				],
				styles:[
					'Sancerre', 'Marlborough Sauvignon Blanc', 'Vouvray Demi-Sec'
				],
				notes:[
					'Two delicious flavours on one plate, both equally fresh components to be paired with fresh white wine. Marlborough Sauvignon Blanc is a classic choice or add a touch of sweetness to compliment the beet with Vouvray demi-sec from the Loire Valley.'
				]
			},
			/* end Sub sub category -- startersvegetarian*/
			/* end sub category lb&s*/

			/* Fish */
			fish:{
				bg:'img/matchmakercats/Category Fish.jpg',
				bc:'Fish',
				cats:[
					{name:'Oily Fish',id:'oilyfish'},
					{name:'Seafood',id:'seafood'},
					{name:'Light Fish',id:'lightfish'},
					{name:'Meaty Fish',id:'meatyfish'}
				]
			},

			/* Sub cats of fish*/
			oilyfish:{
				bg:'img/matchmakercats/subcats/Subcategory Oily fish.jpg',
				bc:'Fish / Oily Fish',
				cats:[
					{name:'Kippers',id:'kippers'},
					{name:'Mackerel',id:'mackerel'},
					{name:'Anchovy',id:'anchovy'},
					{name:'Sardines',id:'sardines'}
				]
			},
			/* sub sub category -- oilyfish*/
			kippers:{
				bgcolor:'white',
				bc:'Kippers',
				grapes:[
					'Pedro Ximinez',  'Grenache Blanc', 'Chardonnay' 
				],
				styles:[
					'Fino Sherry', 'Champagne Blanc de Blancs', 'Languedoc-Roussillon Blanc', 'Chablis'
				],
				notes:[
				'Kippers needn’t be a tricky fish to pair with wine. Pair its rich, salty flavour with a high acidity wine that will cut through the oil, such as NV Champagne or a fresh and vibrant Fino.'
				]
			},
			mackerel:{
				bgcolor:'white',
				bc:'Mackerel',
				grapes:[
					'Sauvignon Blanc', 'Picpoul', 'Cinsault'
				],
				styles:[
					'Provence Rosé', 'Marlborough Sauvignon Blanc', 'Picpoul de Pinet', 'Loire Sauvignon Blanc'
				],
				notes:[
					'A classic fish for a summer salad, pair with a fresh and vibrant summer wine such as Picpoul de Pinet or Provence Rosé.'
				]
			},
			anchovy:{
				bgcolor:'white',
				bc:'Anchovy',
				grapes:[
					'Albarino', 'Muscadet', 'Grenache Blanc', 'Chardonnay'
				],
				styles:[
					'Muscadet Sur Lie', 'Banyuls from Languedoc Roussillon','Vinho Verde'
				],
				notes:[
					'Anchovies are great in salads and on top of pizzas due to their injection of salt and full flavour. Pair with a savoury white such as a high mineral Vinho Verde or textured white Grenache from the South of France.'
				]
			},
			sardines:{
				bgcolor:'white',
				bc:'Sardines',
				grapes:[
					'Riesling', 'Sauvignon Blanc', 'Viura'
				],
				styles:[
					'Austrian Riesling', 'Marlborough Sauvignon Blanc', 'White Rioja'
				],
				notes:[
					'Sardines need a wine that can provide an equal amount of flavour whilst providing fresh acidity to break through their oily texture. Pair with a mature Riesling or lively Spanish Rioja Blanco'
				]
			},
			/* end Sub sub category -- oilyfish*/
			seafood:{
				bg:'img/matchmakercats/subcats/Subcategory Seafood.jpg',
				bc:'Fish / Seafood',
				cats:[
					{name:'Prawns',id:'prawns'},
					{name:'Scallops',id:'scallops'},
					{name:'Mussels',id:'mussels'},
					{name:'Oysters',id:'oysters'}
				]
			},
			/* sub sub ccategory -- seafood*/
			prawns:{
				bgcolor:'white',
				bc:'Prawns',
				grapes:[
					'Sauvignon Blanc', 'Chardonnay', 'Picpoul'
				],
				styles:[
					'Sancerre Blanc', 'Marlborough Sauvignon Blanc', 'Picpoul de Pinet', 'Crémant de Loire'
				],
				notes:[
					'Prawns are so versatile. If you’re baking, grilling or gently sautéing pair you dish with a light Sancerre or Picpoul de Pinet. If you’re BBQing, pair with a fruity Marlborough Sauvignon Blanc or toasty sparkling Cremant from the Loire.'
				]
			},
			scallops:{
				bgcolor:'white',
				bc:'Scallops',
				grapes:[
					'Chenin Blanc', 'Albarino', 'Chardonnay' 
				],
				styles:[
					'NV Champagne', 'Rias Baixas Albarino', 'South African Cape Chenin Blanc'
				],
				notes:[
					'Scallops have a very delicate texture but full flavour when sautéd in a knob of butter. Pair with a confident and fish friendly wine such as Chenin Blanc from Stellenbosch or an Albarino from the coast of Northern Spain.'
				]
			},
			mussels:{
				bgcolor:'white',
				bc:'Mussels',
				grapes:[
					'Muscadet', 'Picpoul', 'Gruner Veltliner'
				],
				styles:[
					'Austrian Gruner Veltliner', 'Picpoul de Pinet', 'Muscadet Sur Lie'
				],
				notes:[
					'Mussels are deliciously salty so pair with a savoury character such as Muscadet from the Loire valley in France or a vibrant Gruner Veltliner from Austria.'
				]
			},
			oysters:{
				bgcolor:'white',
				bc:'Oysters',
				grapes:[
					'Chardonnay', 'Sauvignon Blanc', 'Picpoul'
				],
				styles:[
					'Chablis', 'Champagne', 'Bordeaux Sauvignon Blanc','Picpoul de Pinet'
				],
				notes:[
					'Oysters can be dressed with anything from tabasco, red wine sauce or lemon. Or you can simply eat them fresh from the sea with a crisp glass of Champagne or steely Chablis from Burgundy.'
				]
			},
			/* end Sub sub category -- seafood*/
			lightfish:{
				bg:'img/matchmakercats/subcats/Subcategory Light Fish.jpg',
				bc:'Fish / Light Fish',
				cats:[
					{name:'Seabass',id:'seabass'},
					{name:'Cod',id:'cod'},
					{name:'Haddock',id:'haddock'},
					{name:'Salmon',id:'salmon'}
				]
			},
			/* sub sub category -- lightfish*/
			seabass:{
				bgcolor:'white',
				bc:'Seabass',
				grapes:[
					'Gruner Veltliner', 'Pinot Grigio', 'Sauvignon Blanc'
				],
				styles:[
					'Italian Pinot Grigio', 'Austrian Gruner Veltliner', 'Sancerre Blanc', 'Martinborough Sauvignon Blanc'
				],
				notes:[
					'Seabass is a light and flaky fish which needs an elegant white wine to accompany but not overpower it. Try a bone dry Austrian Gruner Veltliner or a fresh Sauvignon Blanc from the Loire Valley in France.'
				]
			},
			cod:{
				bgcolor:'white',
				bc:'Cod',
				grapes:[
					'Sauvignon Blanc', 'Pinot Gris', 'Chardonnay'
				],
				styles:[
					'NV Champagne Blanc de Blancs', 'Marlborough Sauvignon Blanc', 'Bourgogne Blanc', 'Austrian Pinot Gris', 'Italian Pinot Grigio'
				],
				notes:[
					'Cod is a light but flavoursome fish to enjoy steamed or battered. Try an oily textured Pinot Gris from Austria when steamed or a crisp glass of Champagne with battered cod and chips to cut through the oily batter.'
				]
			},
			haddock:{
				bgcolor:'white',
				bc:'Haddock',
				grapes:[
					'Sauvignon Blanc', 'Chardonnay', 'Pinot Grigio'
				],
				styles:[
					'Sancerre Blanc', 'NV Champagne', 'Italian Pinot Grigio', 'Chablis'
				],
				notes:[
					'Haddock is a light and flaky fish to pair with a light dry wine such as a glass of non-vintage Champagne or simple Pinot Grigio from Trentino, Italy.'
				]
			},
			salmon:{
				bgcolor:'white',
				bc:'Salmon',
				grapes:[
					'Muscadet', 'Pinot Noir', 'Viura', 'Viognier'
				],
				styles:[
					'Bourgogne Rouge', 'Rioja Blanco', 'Vouvray', 'English Rosé'	
				],
				notes:[
					'Salmon is a versatile fish to grill, BBQ, add to salads or in pasta dishes. However you have it pair with a fruity, dry white such as white Rioja or a light red from Burgundy. Rosé is a great match in colour and taste!'
				]
			},
			/* end Sub sub category -- lightfish*/
			meatyfish:{
				bg:'img/matchmakercats/subcats/Subcategory Meaty Fish.jpg',
				bc:'Fish / Meaty Fish',
				cats:[
					{name:'Tuna',id:'tuna'},
					{name:'Trout',id:'trout'},
					{name:'Swordfish',id:'swordfish'},
					{name:'Monkfish',id:'monkfish'}
				]
			},
			/* sub sub category -- meatyfish*/
			tuna:{
				bgcolor:'white',
				bc:'Tuna',
				grapes:[
					'Cabernet Franc', 'Pinot Noir', 'Sauvignon Blanc'
				],
				styles:[
					'Chinon Rouge', 'Bourgogne Rouge', 'Pinot Noir Rosé'	
				],
				notes:[
					'Tuna is the steak of the ocean. It’s meaty texture means a light red such as Burgundy Pinot and Cabernet Franc from the Loire Valley. '
				]
			},
			trout:{
				bgcolor:'white',
				bc:'Trout',
				grapes:[
					'Albarino', 'Riesling', 'Garnacha', 'Viura'
				],
				styles:[
					'Spanish Rosé', 'Rioja Blanco', 'Rias Baixas Albarino'
				],
				notes:[
					'Trout is very similar to salmon, it can be eaten smoked or pan fried. If you’re grilling or pan-frying trout try a flavoursome Rioja Blanco, which has spent a little time in oak. A fresh Albarino is great with smoked trout.'
				]
			},
			swordfish:{
				bgcolor:'white',
				bc:'Swordfish',
				grapes:[
					'Chardonnay', 'Viognier', 'Grenache' 
				],
				styles:[
					'Oaked', 'South Australian Chardonnay', 'Viognier from the Rhone Valley', 'Spanish Rosé'
				],
				notes:[
					'Swordfish is a white and meaty fish full of flavour. Pair with an equally flavoursome wine such as a buttery, New World Chardonnay or full-bodied Viognier from Southern Rhone.'
				]
			},
			monkfish:{
				bgcolor:'red',
				bc:'Monkfish',
				grapes:[
					'Pinot Noir', 'Cabernet Franc', 'Pinot Gris'
				],
				styles:[
					'Martinborough Pinot Noir', 'Chinon Rouge', 'Austrian Pinot Gris'
				],
				notes:[
					'Monk fish is fresh and rich, perfect steamed or in a rich and satisfying stew. It can be paired with a light red such as Loire Valley Chinon or a full bodied white such as Pinot Gris from Austria.'
				]
			},
			/* end Sub sub category -- meatyfish*/
			/* End sub cats of fish*/


			meat:{
				bg:'img/matchmakercats/Meat Category.jpg',
				bc:'Meat',
				cats:[
					{name:'Red Meat',id:'redmeat'},
					{name:'White Meat',id:'whitemeat'},
					{name:'Game',id:'game'},
					{name:'BBQ',id:'bbq'}
				]
			},
			/* sub cats meat */
			redmeat:{
				bg:'img/matchmakercats/subcats/Subcategory Red Meat.jpg',
				bc:'Meat / Red Meat',
				cats:[
					{name:'Beef',id:'beef'},
					{name:'Lamb',id:'lamb'},
					{name:'Duck',id:'duck'},
					{name:'Venison',id:'venison'}
				]
			},
			/* sub sub cat -- red meat*/
			beef:{
				bgcolor:'red',
				bc:'Beef',
				grapes:[
					'Zinfandel', 'Malbec', 'Cabernet Sauvignon'
				],
				styles:[
					'Haut Medoc Bordeaux', 'Cahors', 'Mendoza Malbec'
				],
				notes:[
					'Stew, steak, roasting joint or stir-fried, however you like your beef, pair it with a rich and hearty red such as a claret or US Zinfandel. Tip: If you like your steak rare choose a high minerality Malbec from Cahors.'
				]
			},
			lamb:{
				bgcolor:'red',
				bc:'Lamb',
				grapes:[
					'Syrah', 'Malbec', 'Carménére'
				],
				styles:[
					'Chateauneuf-du-Pape', 'Chilean Carmenere', 'Mendoza Malbec'
				],
				notes:[
					'Lamb is packed full of flavour due to the high fat content. It pairs incredibly well with a rich and slightly spicy red, such as a soft and silky Carmenere from Chile or Chateauneuf du Pape reminiscent of Christmas spices.'
				]
			},
			duck:{
				bgcolor:'red',
				bc:'Duck',
				grapes:[
					'Pinot Noir', 'Merlot', 'Sangiovese'
				],
				styles:[
					'Sonoma Pinot Noir', 'Chilean Merlot', 'Chianti'
				],
				notes:[
					'Roasted duck pairs beautifully with a fruit driven wine such as a jammy New World Pinot Noir or voluptuous Merlot from Chile.'
				]
			},
			venison:{
				bgcolor:'red',
				bc:'Venison',
				grapes:[
					'Carignan', 'Tempranillo', 'Syrah'
				],
				styles:[
					'Languedoc-Roussillon Red', 'Rioja Reserva', 'Hawkes Bay Syrah'
				],
				notes:[
					'Venison isn’t for the feint hearted, a rich and supple red meat that needs a rich wine to support. Try pairing with a higher-alcohol red from the Languedoc region in the South of France or an oaked Rioja.'
				]
			},
			/* end Sub sub category -- red meat*/
			whitemeat:{
				bg:'img/matchmakercats/subcats/Subcategory White Meat.jpg',
				bc:'Meat / White Meat',
				cats:[
					{name:'Chicken',id:'chicken'},
					{name:'Turkey',id:'turkey'},
					{name:'Pork',id:'pork'},
					{name:'Veal',id:'veal'}
				]
			},
			/* sub sub cat -- white meat*/
			chicken:{
				bgcolor:'white',
				bc:'Chicken',
				grapes:[
					'Chardonnay', 'Chenin Blanc', 'Grenache'
				],
				styles:[
					'Stellenbosch Chenin Blanc', 'Cotes du Rhone Rouge', 'Bourgogne Blanc'
				],
				notes:[
					'Chicken is versatile depending on which part of the bird you go for. The dark meat can be paired with fruit driven red wines such as Cotes du Rhone, the white meat on the other hand pairs nicely with a crisp and slightly creamy Chardonnay, new or old world depending on your preference.'
				]
			},
			turkey:{
				bgcolor:'white',
				bc:'Turkey',
				grapes:[
					'Pinot Noir', 'Zinfandel', 'Chardonnay'
				],
				styles:[
					'Elqui Valley Pinot Noir', 'Californian Zinfandel', 'Sonoma Chardonnay'
				],
				notes:[
					'Turkey is a light white meat, when cooked slowly can release an impressive amount of flavour. Try pairing with soft but flavoursome reds from the New World, especially when accompanied by cranberry sauce!'
				]
			},
			pork:{
				bgcolor:'red',
				bc:'Pork',
				grapes:[
					'Syrah', 'Chenin Blanc', 'Sangiovese'
				],
				styles:[
					'Cotes du Rhone', 'Vouvray', 'Chianti'
				],
				notes:[
					'Pork is a wonderfully versatile meat, both sweet and savoury in flavour. This enables it to be paired with savoury styled red such as Chianti or off dry Chenin Blanc from Vouvray.'
				]
			},
			veal:{
				bgcolor:'white',
				bc:'Veal',
				grapes:[
					'Chardonnay', 'Pinot Noir', 'Gruner Veltliner'
				],
				styles:[
					'Wachau Gruner Veltliner', 'Bourgogne Rouge', 'Sonoma Chardonnay'
				],
				notes:[
					'Famously made into the schnitzel why not pair with the Austrian classic, Gruner Veltliner, whose high acidity cuts through the oily batter. If you prefer a more rounded wine try a traditional Bourgogne rouge or buttery Sonoma Chardonnay.'
				]
			},
			/* end Sub sub category -- white meat*/
			game:{
				bg:'img/matchmakercats/subcats/Subcategory Game Meat.jpg',
				bc:'Meat / Game',
				cats:[
					{name:'Pheasant',id:'pheasant'},
					{name:'Goose',id:'goose'},
					{name:'Partridge',id:'partridge'},
					{name:'Rabbit',id:'rabbit'}
				]
			},
			/* sub sub cat -- game*/
			pheasant:{
				bgcolor:'red',
				bc:'Pheasant',
				grapes:[
					'Pinot Noir', 'Cabernet Sauvignon', 'Grenache'
				],
				styles:[
					'Bourgogne Rouge',' St Julien Bordeaux', 'Youthful Chateauneuf-du-Pape'
				],
				notes:[
					'Pheasant can make a wonderful change to the everyday chicken. The flavours are in abundance, justifying a classic red with a sturdy backbone. Try a masculine claret such as St Julien or youthful Chateauneuf-du-Pape, full of fruit, spice and all things nice.'
				]
			},
			goose:{
				bgcolor:'red',
				bc:'Goose',
				grapes:[
					'Riesling', 'Tempranillo', 'Pinot Noir'
				],
				styles:[
					'Off-dry Riesling', 'Rioja Crianza', 'Bourgogne Pinot Noir'
				],
				notes:[
					'Goose can sometimes be mistaken for red meat due its rich flavour and heavier texture compared to chicken or turkey. Which is why it pairs nicely with fruit driven reds such as new world Pinot Noir and lightly oaked Rioja Crianza.'
				]
			},
			partridge:{
				bgcolor:'red',
				bc:'Partridge',
				grapes:[
					'Tempranillo', 'Sangiovese', 'Merlot'
				],
				styles:[
					'Rioja Reserva', 'Chianti Classico', 'St Emilion Bordeaux'
				],
				notes:[
					'Partridge isn’t just for Christmas, this is a full flavoured bird that owns a dish without the need for supporting side. Pair with an equally bold wine with oak influence such as a Chianti Classico or Merlot dominant St Emilion.'
				]
			},
			rabbit:{
				bgcolor:'red',
				bc:'Rabbit',
				grapes:[
					'Pinot Noir', 'Syrah', 'Pinot Gris'
				],
				styles:[
					'Martinborough Pinot Noir', 'Hawkes Bay Syrah', 'Ontago Pinot Gris'	
				],
				notes:[
					'Rabbit is a brilliant addition to stews due to its rich and flavoursome meat. Pair with a fruit driven red from a warm climate to provide plumier character such as New Zealand Pinot Noir or Syrah.'
				]
			},
			/* end Sub sub category -- game*/
			bbq:{
				bg:'img/matchmakercats/subcats/Subcategory BBQ Meat.jpg',
				bc:'Meat / BBQ',
				cats:[
					{name:'Sausages',id:'sausages'},
					{name:'Burgers',id:'burgers'},
					{name:'Ribs',id:'ribs'},
					{name:'Steak',id:'steak'}
				]
			},
			/* sub sub cat -- bbq*/
			sausages:{
				bgcolor:'red',
				bc:'Sausages',
				grapes:[
					'Carménére', 'Cabernet Sauvignon', 'Zinfandel'
				],
				styles:[
					'Elqui Valley Carménére', 'Californian Zinfandel', 'Napa Valley Cabernet Sauvignon'
				],
				notes:[
					'Sausages come in all shapes and sizes, all flavours including spices! Which is why they can be paired with a huge variety of wines. For the traditional Cumberland sausage try a soft and fruity Zinfandel. For fuller flavoured boar sausages try a Napa Valley Cabernet Sauvignon, a real treat for the senses!'
				]
			},
			burgers:{
				bgcolor:'red',
				bc:'Burgers',
				grapes:[
					'Zinfandel', 'Syrah', 'Cabernet Sauvignon', 'Malbec'
				],
				styles:[
					'Californian Zinfandel', 'Bordeaux Supérieur', 'Cahors'
				],
				notes:[
					'Burgers are usually dressed up with salads, cheeses, pickles and all sorts of sauces to accentuate the delicious taste of the meat. For the traditional beef burger try a classic Malbec from Cahors in France. For a lamb burger try something with a little more spice such as a US Zinfandel.'
				]
			},
			ribs:{
				bgcolor:'red',
				bc:'Ribs',
				grapes:[
					'Syrah', 'Zinfandel', 'Mourvèdre'
				],
				styles:[
					'orbières', 'Primitivo', 'Coonawarra Shiraz'
				],
				notes:[
					'Ribs can be sticky and delicious, try pairing with an earthy Corbières from the Languedoc-Roussillon region in Southern France or a warming blackcurrant-rich Shiraz from Coonawarra from Southern Australia.'
				]
			},
			steak:{
				bgcolor:'red',
				bc:'Steak',
				grapes:[
					'Cabernet Sauvignon', 'Merlot', 'Malbec'
				],
				styles:[
					'Mendoza Malbec', 'Napa Valley Cabernet Sauvignon', 'Bordeaux Superieur'
				],
				notes:[
					'Steak was born in Argentina and naturally pairs well with their national grape, Malbec. America has also made a name for itself for their steakhouses and incredibly sumptuous Cabernets from the Napa Valley.'
				]
			},
			/* end Sub sub category -- bbq*/
			/* end sub cats meat*/

			worldcuisine:{
				bg:'img/matchmakercats/Category World Cuisine.jpg',
				bc:'World Cuisine',
				cats:[
					{name:'Italian',id:'italian'},
					{name:'Spanish',id:'spanish'},
					{name:'French',id:'french'},
					{name:'Asian',id:'asian'}
				]
			},
			/* world cuisine sub cats*/
			italian:{
				bg:'img/matchmakercats/subcats/subcategory italian.jpg',
				bc:'World Cuisine / Italian',
				cats:[
					{name:'Pizza',id:'pizza'},
					{name:'Pasta',id:'pasta'},
					{name:'Risotto',id:'risotto'},
					{name:'Antipasti',id:'antipasti'}
				]
			},
			/* sub sub cat -- italian*/
			pizza:{
				bgcolor:'red',
				bc:'Pizza',
				grapes:[
					'Tempranillo', 'Sangiovese', 'Dolcetto'
				],
				styles:[
					'Rioja Crianza', 'Chianti Classico', "Dolcetto d’Alba"
				],
				notes:[
					'When pairing pizza with wine, you’re pairing with the tomato sauce on the base. Choose a red wine with bright acidity and fresh fruity character. Italian classics such as Chianti Classico and Dolcetto d’Alba are perfecto! '
				]
			},
			pasta:{
				bgcolor:'red',
				bc:'Pasta',
				grapes:[
					'Chardonnay', 'Montepulciano', 'Sangiovese'
				],
				styles:[
					'Sicilian white', "Montepulciano d’Abruzzo", 'Rosso di Montalcino'
				],
				notes:[
					'Pasta comes in all shapes and sizes but it’s the sauce you’re looking to pair. With creamy sauces such as Carbonara pair with a rich and creamy Chardonnay. With tomato pasta dishes pair with a youthful, vibrant red such as Montepulciano d’Abruzzo.'
				]
			},
			risotto:{
				bgcolor:'white',
				bc:'Risotto',
				grapes:[
					'Cortese', 'Glera', 'Chardonnay'
				],
				styles:[
					'Gavi', 'Prosecco', 'White Burgundy'
				],
				notes:[
					'A rich risotto including chicken pairs beautifully with a rounded Chardonnay. More delicately flavoured risottos with asparagus and/or seafood require a vibrant style of white such as Gavi or a Prosecco Spumante.'
				]
			},
			antipasti:{
				bgcolor:'red',
				bc:'Antipasti',
				grapes:[
					'Pinot Grigio', 'Dolcetto', 'Sangiovese'
				],
				styles:[
					'Veneto Pinot Grigio', "Dolcetto d’Alba", 'Chianti Classico'
				],
				notes:[
					'Italian cured hams such as Prosciutto and Serrano are salty and dry, which makes a light and refreshing Pinot Grigio a wonderful contrast. The high acidity of classic Italian reds such as Dolcetto d’Alba and Chianti Classico help to cut through the fat and saltiness of the meat.'
				]
			},
			/* end Sub sub category -- italian*/
			spanish:{
				bg:'img/matchmakercats/subcats/subcategory spanish.jpg',
				bc:'World Cuisine / Spanish',
				cats:[
					{name:'Paella',id:'paella'},
					{name:'Tapas',id:'tapas'},
					{name:'Fish',id:'wcspanishfish'},
					{name:'Cold meats',id:'coldmeats'}
				]
			},
			/* sub sub cat -- spanish*/
			paella:{
				bgcolor:'red',
				bc:'Paella',
				grapes:[
					'Garnacha', 'Tempranillo', 'Albarino'
				],
				styles:[
					'Navarra Rosato', 'Rioja Crianza', 'Rias Baixas Albarino'
				],
				notes:[
					'For paellas packed full of shellfish and seafood, pair with a crisp Spanish white. Albarino is made on the Atlantic coast and pairs wonderfully with salty, seafood flavours. For meat paellas pair with a youthful, fruit driven Rioja Crianza or a juicy rosé from Navarra.'
				]
			},
			tapas:{
				bgcolor:'red',
				bc:'Tapas',
				grapes:[
					'Albarino', 'Tempranillo', 'Parellada'
				],
				styles:[
					'Cava', 'Rias Baixas Albarino', 'Rioja Crianza'
				],
				notes:[
					'Traditional styles of Spanish wines including rosato, fino sherry Cava and Albarino pair wonderfully with cold meats, olives and egg based dishes. For warm tomato based tapas, pair with a young, fruity Rioja.'
				]
			},
			wcspanishfish:{
				bgcolor:'red',
				bc:'Fish',
				grapes:[
					'Albarino', 'Viura', 'Verdejo'	
				],
				styles:[
					'Rueda', 'Rias Baxias Albarino', 'Cava'
				],
				notes:[
					'Spain is surrounded by ocean water and so is renowned for its fresh fish such as cod, sardines, boquerones and anchovies. High acidity white wines such as Albarino and Rueda blanco pair with the salty, delicate flavours of these fish. '
				]
			},
			coldmeats:{
				bgcolor:'red',
				bc:'Cold meats',
				grapes:[
					'Syrah', 'Grenache', 'Gamay'
				],
				styles:[
					'Beaujolais', 'Navarra Garnacha', 'Jumilla Syrah Blend'
				],
				notes:[
					'Light red wines, with vibrant fruit flavours and hints of pepper, work well with cured meats including Iberico ham and chorizo.'
				]
			},
			/* end Sub sub category -- spanish*/
			french:{
				bg:'img/matchmakercats/subcats/subcategory french.jpg',
				bc:'World Cuisine / French',
				cats:[
					{name:'Stews',id:'stews'},
					{name:'Paté',id:'pate'},
					{name:'Cheese',id:'wcfrenchcheese'},
					{name:'Potato Dauphinoise',id:'potatodauphinoise'}
				]
			},
			/* sub sub cat -- french*/
			stews:{
				bgcolor:'red',
				bc:'Stews',
				grapes:[
					'Syrah', 'Pinot Noir', 'Gamay'
				],
				styles:[
					'Beaujolais', 'Bourgogne Rouge', 'Côtes du Rhône'
				],
				notes:[
					'Hearty stews with rich red meats such as Beef Bourguignon pair with well-structured reds, including Côtes du Rhône. Creamier or lighter stews such as Coq au Vin require a lighter red such as Bourgogne or Beaujolais.'
				]
			},
			pate:{
				bgcolor:'red',
				bc:'Paté',
				grapes:[
					'Cabernet Franc', 'Pinot Noir', 'Gamay'
				],
				styles:[
					'Chinon Rouge', 'Bourgogne Rouge', 'Bourgueil'
				],
				notes:[
					'Meat pâtés have a high fat content so look for a wine with high acidity to cut through the fat and refresh the palate, such as Chinon Rouge or Beaujolais. Alternatively, Sauternes is traditionally paired at the beginning of a meal with pâté, for the ultimate indulgent'
				]
			},
			wcfrenchcheese:{
				bgcolor:'white',
				bc:'Cheese',
				grapes:[
					'Grenache', 'Sémillon', 'Chardonnay'
				],
				styles:[
					'Châteauneuf-du-Pape', 'Côtes du Rhône', 'Sauternes'
				],
				notes:[
					'As a rule of thumb, intensely flavoured cheeses pair with intensely flavoured wines, such as Grenache and 				Sauternes . Mature cheese such as Gruyère and Brie loves sweet berried wines such as Pinot Noir. Fresh, white cheeses such as goats cheese pair well with fresh, vibrant whites such as Sauvignon Blanc. Creamy, washed cheese, such as Epoisses, is best with a creamy white, such as Bourgogne Blanc.'
				]
			},
			potatodauphinoise:{
				bgcolor:'white',
				bc:'Potato Dauphinoise',
				grapes:[
					'Merlot', 'Cabernet Sauvignon', 'Chardonnay'
				],
				styles:[
					'Pomerol', 'Margaux', 'Chassagne-Montrachet'
				],
				notes:[
					'A grati(n)fying treat to pair with mature red or white wines. Full, rounded white Burgundy complements the cream while aged Bordeaux provides a contrast to the spices and cheese.'
				]
			},
			/* end Sub sub category -- french*/
			asian:{
				bg:'img/matchmakercats/subcats/subcategory asian.jpg',
				bc:'World Cuisine / Asian',
				cats:[
					{name:'Curry',id:'curry'},
					{name:'Dim Sum',id:'dimsum'},
					{name:'Stir Fries',id:'stirfries'},
					{name:'Sushi',id:'sushi'}
				]
			},
			/* sub sub cat - asian*/
			curry:{
				bgcolor:'white',
				bc:'Curry',
				grapes:[
					'Riesling', 'Gewürztraminer', 'Torrontes'
				],
				styles:[
					'Alsatian off-dry Riesling', 'German Spatlese', 'Mendoza Torrontes'
				],
				notes:[
					'A rule of thumb in pairing spicy food is to balance the intensity with something sweet. Aromatic varieties such as Riesling and Gewürztraminer also work in complementing fresh herb flavours.'
				]
			},
			dimsum:{
				bgcolor:'white',
				bc:'Dim Sum',
				grapes:[
					'Chardonnay', 'Glera', 'Sauvignon Blanc'
				],
				styles:[
					'Champagne', 'Prosecco', 'Sancerre'
				],
				notes:[
					'Dim sum tends to be fresh, light and salty, therefore, pair them with a wine that complements rather than dominates your palate, such as brut Champagne or an off-dry Frizzante Prosecco.'
				]
			},
			stirfries:{
				bgcolor:'white',
				bc:'Stir Fries',
				grapes:[
					'Gewürztraminer', 'Riesling', 'Gamay'
				],
				styles:[
					'Beaujolais', 'German Spatlese', 'New World Off-Dry Riesling' 
				],
				notes:[
					'For meat stir-fries with a spicy kick, pair with an off-dry white to balance the intensity. Vegetarian and tofu stir-fries can benefit from a light fruity red such as Beaujolais.'
				]
			},
			sushi:{
				bgcolor:'white',
				bc:'Sushi',
				grapes:[
					 'Chardonnay', 'Cortese', 'Grüner Veltliner'
				],
				styles:[
					'Chablis', 'Austrian Grüner Veltliner', 'Gavi'
				],
				notes:[
					'Sushi is incredibly fresh with delicate flavours, so choose a wine with similarly subtle flavours. Citrus and herb flavours, such as in a Grüner Veltliner or Gavi, work really well with fresh seafood. '
				]
			},
			/* end Sub sub category -- asian*/
			/* end sub cats world cuisine*/
			desserts:{
				bg:'img/matchmakercats/Category Dessert.jpg',
				bc:'Desserts',
				cats:[
					{name:'Chocolate',id:'chocolate'},
					{name:'Fruit',id:'fruit'},
					{name:'Pastries',id:'pastries'},
					{name:'cake',id:'cake'}
				]
			},
			/* desserts sub cats*/
			chocolate:{
				bg:'img/matchmakercats/subcats/Subcategory Chocolate.jpg',
				bc:'Desserts / Chocolate',
				cats:[
					{name:'Fondant',id:'fondant'},
					{name:'Ice-cream',id:'icecream'},
					{name:'Gateau',id:'gateau'},
					{name:'Mousse',id:'mousse'}
				]
			},
			/* sub sub cat -- chocolate*/
			fondant:{
				bgcolor:'red',
				bc:'Fondant',
				grapes:[
					 'Pinot Noir', 'Muscat', 'Pedro Ximenez'
				],
				styles:[
					'Rosé Champagne', 'PX Sherry', 'Californian Pinot Noir'
				],
				notes:[
					'For molten chocolate try an intensely flavoured sweet wine such as PX sherry. If it comes with a fruit coulis on the side, pair with a sweet red berried wine such as New World Pinot Noir. '
				]
			},
			icecream:{
				bgcolor:'red',
				bc:'Ice-cream',
				grapes:[
					 'Lambrusco', 'Furmint', 'Touriga Nacional'
				],
				styles:[
					'Sparkling Lambrusco', 'Tokaji', 'Tawny Port'
				],
				notes:[
					'Ice cream is a tricky dessert to pair. Try a light, sparkling red such as Lambrusco which will compliment rather than overpower milk chocolate ice cream. You can also compliment the sweet flavours with Tawny Port or dessert wines.'
				]
			},
			gateau:{
				bgcolor:'red',
				bc:'Gateau',
				grapes:[
					 'Grenache', 'Syrah', 'Touriga Nacional'
				],
				styles:[
					'Sweet Maury', 'Ruby Port', 'Languedoc Red Blend'
				],
				notes:[
					'Dark chocolate gateaux long for intense cherry flavoured wines such as sweet Maurys from Southern France or vibrant ruby ports.'
				]
			},
			mousse:{
				bgcolor:'white',
				bc:'Mousse',
				grapes:[
					 'Muscat', 'Pinot Noir', 'Chardonnay'
				],
				styles:[
					'Asti', 'Rosé Champagne', 'Spanish Moscatel'
				],
				notes:[
					'Mousse is a light textured pudding so can be paired with light, fruity wines such as Muscat or even a glass of rosé Champagne.'
				]
			},
			/* end Sub sub category -- chocolate*/
			fruit:{
				bg:'img/matchmakercats/subcats/Subcategroy fruit.jpg',
				bc:'Desserts / Fruit',
				cats:[
					{name:'Fruit Salad',id:'fruitsalad'},
					{name:'Fruit Sorbet',id:'fruitsorbet'},
					{name:'Fruit Tart',id:'fruittart'},
					{name:'Crumble',id:'crumble'}
				]
			},
			/* sub sub cat -- fruit*/
			fruitsalad:{
				bgcolor:'white',
				bc:'Fruit Salad',
				grapes:[
					 'Viognier', 'Torrontes', 'Riesling'
				],
				styles:[
					'lare Valley Riesling', 'Mendoza Torrontes', 'Southern Australian Viognier'
				],
				notes:[
					'Fresh, unoaked whites are delicious with fresh fruit. Try pairing with wines that bring their own fruit character to the pairing, such as aromatic varietiels: Viognier or Riesling.'
				]
			},
			fruitsorbet:{
				bgcolor:'white',
				bc:'Fruit Sorbet',
				grapes:[
					 'Riesling', 'Muscat', 'Glera'
				],
				styles:[
					'Prosecco', 'German Spatlese', "Moscato d’Asti"
				],
				notes:[
					'Sorbet brings even more freshness to fruit, pair with an elegant, fruit driven sweet white wine such as off-dry Riesling or Italian Moscato.'
				]
			},
			fruittart:{
				bgcolor:'red',
				bc:'Fruit Tart',
				grapes:[
					 'Pinot Noir', 'Sémillon', 'Gewürztraminer'
				],
				styles:[
					'Rosé Champagne', 'Sauternes', 'German Spatlese'
				],
				notes:[
					'You can choose to compliment the rich, concentrated flavours of a fruit tart with a sweet wine such as Sauternes. Or you can refresh your palate with a fruit driven rosé Champagne or high acidity off-dry white.'
				]
			},
			crumble:{
				bgcolor:'white',
				bc:'Crumble',
				grapes:[
					 'Chenin Blanc', 'Sauvignon Blanc', 'Sémillon'
				],
				styles:[
					'Vouvray Sec', 'Sauternes', 'German Spatlese'
				],
				notes:[
					'When pairing wine with fruit crumbles you need to consider the fruit flavour and the crumble topping. Full-flavoured whites, such as Chenin Blanc and sweet wines like Sauternes can offer both components.'
				]
			},
			/* end Sub sub category -- fruit*/
			pastries:{
				bg:'img/matchmakercats/subcats/subcategory pastries.jpg',
				bc:'Desserts / Pastries',
				cats:[
					{name:'Danish',id:'danish'},
					{name:'Tart',id:'tart'},
					{name:'Strudel',id:'strudel'},
					{name:'Profiteroles',id:'profiteroles'}
				]
			},
			/* sub sub cat pastries*/
			danish:{
				bgcolor:'white',
				bc:'Danish',
				grapes:[
					 'Chenin Blanc', 'Pinot Noir', 'Sauvignon Blanc'
				],
				styles:[
					'Demi Sec Vouvray', 'Californian Pinot Noir', 'Chilean Sauvignon Blanc'
				],
				notes:[
					'With a cheese Danish choose a crisp white such as Sauvignon Blanc to cut through the fat. With a sweet, fruit Danish pair with a fruit-driven, youthful wine such as Pinot Noir.'
				]
			},
			tart:{
				bgcolor:'white',
				bc:'Tart',
				grapes:[
					 'Riesling', 'Vidal Blanc', 'Chenin Blanc'
				],
				styles:[
					'German Auslese', 'Canadian Icewine', 'Demi-sec Vouvray'
				],
				notes:[
					'You can choose to compliment the rich, concentrated flavours of  a fruit tart with a sweet wine such as Icewine. Or you can refresh your palate with a high acidity off-dry white such as Vouvray.'
				]
			},
			strudel:{
				bgcolor:'white',
				bc:'Strudel',
				grapes:[
					 'Glera', 'Riesling', 'Gewürztraminer', 'Muscat'
				],
				styles:[
					'Prosecco', 'German Spatlese', 'Sauternes'
				],
				notes:[
					'The sweetness of an apple strudel comes from the fruit itself rather than the pastry so it can be paired with a range of wines from off-dry Prosecco to light and sticky Sauternes.'
				]
			},
			profiteroles:{
				bgcolor:'red',
				bc:'Profiteroles',
				grapes:[
					'Muscat', 'Grenache', 'Pedro Ximenez'
				],
				styles:[
					'Rutherglen Muscat', 'Muscat de Beaumes de Venise', 'Sweet Maury'
				],
				notes:[
					'Profiteroles with lashings of cream and chocolate sauce, pairs with something equally rich like a Rutherglen Muscat or Muscat de Beaumes de Venise.'
				]
			},
			/* end Sub sub category -- pastries*/
			cake:{
				bg:'img/matchmakercats/subcats/Subcategory cake.jpg',
				bc:'Desserts / Cake',
				cats:[
					{name:'Chocolate',id:'dcakechocolate'},
					{name:'Carrot',id:'dcakecarrot'},
					{name:'Victoria',id:'victoria'},
					{name:'Red Velvet',id:'redvelvet'}
				]
			},
			/* sub sub cat -- cake*/
			dcakechocolate:{
				bgcolor:'red',
				bc:'Chocolate',
				grapes:[
					'Touriga Nacional', 'Grenache', 'Muscat'
				],
				styles:[
					'LBV Port', 'Sweet Maury', "Moscato d’Asti"
				],
				notes:[
					'You can choose to match the richness of a chocolate cake with an equally rich wine such as sweet Maury, which also adds the flavour of ripe cherry. Or break through the richness with a light Moscato.'
				]
			},
			dcakecarrot:{
				bgcolor:'white',
				bc:'Carrot',
				grapes:[
					'Gewürztraminer', 'Semillon', 'Glera'
				],
				styles:[
					'German Spatlese', 'Sauternes', 'Prosecco'
				],
				notes:[
					'Carrot cake can sometimes taste more savoury than sweet so you can choose to add a little sweetness with your wine choice. Off-dry sparkling or high acidity dessert wines won’t overpower flavours and will contribute to fresh fruit flavours.'
				]
			},
			victoria:{
				bgcolor:'white',
				bc:'Victoria',
				grapes:[
					'Glera', 'Muscat', 'Palamino'
				],
				styles:[
					'Cream Sherry', "Moscato d’Asti", 'Prosecco'
				],
				notes:[
					'Victoria sponge isn’t a sweet cake, and tends to be accompanied with unsweetened fruit such as strawberries and raspberries. Therefore, it pairs well with an off-dry sparkling wine such as Prosecco or match the buttery flavour with a cream sherry.'
				]
			},
			redvelvet:{
				bgcolor:'red',
				bc:'Red Velvet',
				grapes:[
					'Pinot Noir', 'Chardonnay', 'Grenache'
				],
				styles:[
					'Rose Champagne', 'Maury', 'Banyuls'
				],
				notes:[
					'The chocolate ingredient in red velvet is sometimes perceived to taste more like cherry, which is why it pairs well with wines with red fruit flavours, such as sweet Maury from southern France or Rose Champagne'
				]
			},
			/* end Sub sub category -- cake*/
			/* end of sub cats desserts*/
			cheese:{
				bg:'img/matchmakercats/category cheese.jpg',
				bc:'Cheese',
				cats:[
					{name:'Hard',id:'hard'},
					{name:'Soft',id:'soft'},
					{name:'Mature',id:'mature'},
					{name:'Smoked',id:'smoked'}
				]
			},
			/* Sub cats Cheese*/
			hard:{
				bg:'img/matchmakercats/subcats/subcategory hard cheese.jpg',
				bc:'Cheese / Hard',
				cats:[
					{name:'Manchego',id:'manchego'},
					{name:'Parmesan',id:'parmesan'},
					{name:'Cheddar',id:'cheddar'},
					{name:'comté',id:'comte'}
				]
			},
			/* sub sub cat -- hard*/
			manchego:{
				bgcolor:'red',
				bc:'Manchego',
				grapes:[
					'Malbec', 'Sangiovese', 'Tempranillo'
				],
				styles:[
					'Cahors', 'Mendoza Malbec', 'Chianti Classico'
				],
				notes:[
					'Manchego is made from 100% sheep’s milk, possessing a unique aroma and taste due to the wild herbs grown in La Mancha, where is made. It makes a good partner to lively red wines with bold flavours and a dry structure.'
				]
			},
			parmesan:{
				bgcolor:'red',
				bc:'Parmesan',
				grapes:[
					'Chardonnay', 'Barbera', 'Dolcetto'
				],
				styles:[
					"Barbera d’Alba", "Dolcetto d’Alba", "Chassagne-Montrachet"
				],
				notes:[
					'The world’s most loved hard cheese from Italy needs a confident wine to compliment its concentrated flavours and salty taste. Try a fresh red Italian red or full-flavoured white Burgundy.'
				]
			},
			cheddar:{
				bgcolor:'red',
				bc:'Cheddar',
				grapes:[
					'Cabernet Sauvignon', 'Gamay', 'Cabernet Franc'
				],
				styles:[
					'Beaujolais', 'Chinon Rouge', 'Bordeaux Red Blend'
				],
				notes:[
					'For young or semi-mature cheddar pair with a fruity Beaujolais or Burgundy. For mature cheddar with more of a bite, you can pair with more rustic styles (not necessarily oaked) such as Chinon Rouge.'
				]
			},
			comte:{
				bgcolor:'red',
				bc:'comté',
				grapes:[
					'Cabernet Sauvignon', 'Gamay', 'Pinot Noir'
				],
				styles:[
					'Bordeaux Red Blend', 'Beaujolais', 'Nuits-Saint-Georges (Red Burgundy)'
				],
				notes:[
					'For France’s most popular cheese comes with strong nutty flavours. Try soft reds such as Pinot Noir and young Bordeaux , and try to avoid high levels of tannin. '
				]
			},
			/* end Sub sub category -- hard*/
			soft:{
				bg:'img/matchmakercats/subcats/subcategory soft cheese.jpg',
				bc:'Cheese / Soft',
				cats:[
					{name:'Brie',id:'brie'},
					{name:"Goat's",id:'goats'},
					{name:'Camembert',id:'camembert'},
					{name:'Mozzarella',id:'mozzarella'}
				]
			},
			/* sub sub cat -- soft*/
			brie:{
				bgcolor:'white',
				bc:'Brie',
				grapes:[
					'Chardonnay', 'Gamay', 'Grüner Veltliner'
				],
				styles:[
					'Aligote', 'Beaujolais', 'Austrian Grüner Veltliner'
				],
				notes:[
					'Brie has a subtle flavour and creamy texture, choose a wine that won’t overpower it. A dry Aligoté or fruity Pinot Noir can transform the flavour of Brie, bringing added flavour and elegance to the palate.'
				]
			},
			goats:{
				bgcolor:'white',
				bc:"Goat's",
				grapes:[
					'Sauvignon Blanc', 'Grüner Veltliner', 'Chardonnay'
				],
				styles:[
					'Sancerre', 'Marlborough Sauvignon Blanc', 'Wachau Grüner Veltliner'
				],
				notes:[
					'New World Sauvignon Blanc is a classic pairing with goats cheese as its aromatic, bright acidity breaks through the creamy, farm character of the cheese. Other dry whites work too and can offer less flavour if you want to focus on the cheese, such as Grüner Veltliner.'
				]
			},
			camembert:{
				bgcolor:'white',
				bc:"Camembert",
				grapes:[
					'Merlot', 'Chardonnay', 'Pinot Blanc'
				],
				styles:[
					'Bordeaux Rouge Blend', 'NV Champagne', 'Austrian Pinot Blanc'
				],
				notes:[
					'Camembert is a soft cheese with a delicate, sometimes sweet(ish) flavour, which pairs wonderfully with light and dry styles of wine, including Champagne or Austrian Pinot Blanc.'
				]
			},
			mozzarella:{
				bgcolor:'white',
				bc:"Mozzarella",
				grapes:[
					'Verdicchio', 'Albarino', 'Sauvignon Blanc'
				],
				styles:[
					'Verdicchio dei Castelli di Jesi', 'Vinho Verde', 'Sancerre'
				],
				notes:[
					'Mozzarella is a fresh cheese, requiring a fresh wine to compliment rather than contrast its gentle flavours. Bright styles with citrus character are a certain match.'
				]
			},
			/* end Sub sub category -- soft*/
			mature:{
				bg:'img/matchmakercats/subcats/subcategory mature cheese.jpg',
				bc:'Cheese / Mature',
				cats:[
					{name:'Cheddar',id:'cmaturecheddar'},
					{name:"Stilton",id:'stilton'},
					{name:'Camembert',id:'cmaturecamembert'},
					{name:'Roquefort',id:'roquefort'}
				]
			},
			/* sub sub cat -- mature*/
			cmaturecheddar:{
				bgcolor:'white',
				bc:"Cheddar",
				grapes:[
					'Pinot Noir', 'Riesling', 'Touriga Nacional'
				],
				styles:[
					'Nuits-Saint-Georges', 'German Auslese', 'LBV Port'
				],
				notes:[
					'For mature cheddar with more of a bite, you can pair with more rustic styles (not necessarily oaked) of red such as aged Bourgogne Rouge. Also, Port compliments the salty flavours with concentrated flavour and sweetness.'
				]
			},
			stilton:{
				bgcolor:'white',
				bc:"Stilton",
				grapes:[
					'Sémillon', 'Grüner Veltliner', 'Viognier'
				],
				styles:[
					'Rhone Valley Whites', 'Austrian Grüner Veltliner', 'Sauternes'
				],
				notes:[
					'You’re looking to pair the salty flavours of Stilton with wine. Sweet wines such as Sauternes offer a divine element of sugar and concentrated fruit flavour. Other dry whites such as Grüner Veltliner compliment the savoury, salt flavour.'
				]
			},
			cmaturecamembert:{
				bgcolor:'white',
				bc:"Camembert",
				grapes:[
					'Chenin Blanc', 'Gamay', 'Pinot Blanc'	
				],
				styles:[
					'Demi-Sec Vouvray', 'Beaujolais', 'Alsatian Pinot Blanc'
				],
				notes:[
					'Camembert is a soft  cheese with a delicate, sometimes sweet(ish) flavour, which with age is accentuated. It paired wonderfully with light and dry styles of wine, including Austrian Pinot Blanc or add a sweet element with off-dry Vouvray.'
				]
			},
			roquefort:{
				bgcolor:'white',
				bc:"Roquefort",
				grapes:[
					'Sauvignon Blanc', 'Sémillon', 'Touriga Nacional'
				],
				styles:[
					'Sauternes', 'LBV Port', 'Monbazillac'
				],
				notes:[
					'The salty flavours of Roquefort require a sweet element from the wine. The wine also needs to have flavour intensity and structure. Try a mouth-watering Monbazillac or Late Bottle Vintage Port.'
				]
			},
			/* end Sub sub category -- mature*/
			smoked:{
				bg:'img/matchmakercats/subcats/subcategory smoked cheese.jpg',
				bc:'Cheese / Smoked',
				cats:[
					{name:'Bavarian',id:'bavarian'},
					{name:"Gruyère",id:'gruyere'},
					{name:'Gouda',id:'gouda'},
					{name:'Smoked Cheddar',id:'smokedcheddar'}
				]
			},
			/* sub sub cat smoked */
			bavarian:{
				bgcolor:'red',
				bc:"Bavarian",
				grapes:[
					'Blaufrankisch', 'Syrah', 'Zweigelt'
				],
				styles:[
					'Austrian Blaufrankisch', 'Cotes du Rhone Rouge', 'Austrian Zweigelt'
				],
				notes:[
					' Bavarian cheese is characterised by spicy flavours and a strong, nutty aroma, which is sometimes compared to Bacon! This meaty cheese can be paired with stronger red wine styles such as Syrah and Blaufrankisch. '
				]
			},
			gruyere:{
				bgcolor:'red',
				bc:"Gruyère",
				grapes:[
					'Chardonnay', 'Merlot', 'Pinot Noir'
				],
				styles:[
					'Aligoté', 'Chilian Merlot', 'Californian Pinot Noir'
				],
				notes:[
					'Gruyère combines flavours of sweet and salt. Younger Gruyère is nutty with a slighty smoked flavour, so try pairing with a dry Bourgogne. For older Gruyère, which are earthier with more pronounced flavours, pair with a fruit-driven Merlot or Pinot Noir.'
				]
			},
			gouda:{
				bgcolor:'red',
				bc:"Gouda",
				grapes:[
					'Blaufrankisch', 'Merlot', 'Pinot Noir'
				],
				styles:[
					'Chilian Merlot', 'Californian Pinot Noir', 'Austrian Blaufrankish'
				],
				notes:[
					'Gouda has nutty, caramel and buttery flavours all rolled into one. Pair with a smooth, rounded and fruit driven red such as Merlot or Pinot Noir.'
				]
			},
			smokedcheddar:{
				bgcolor:'red',
				bc:"Smoked Cheddar",
				grapes:[
					'Gewurztraminer', 'Zweigelt', 'Merlot'
				],
				styles:[
					'German Spatlese', 'Austrian Zweigelt','Chilean Merlot'
				],
				notes:[
					'Smoked cheddar is a dense, semi-hard cheese with pronounced flavours including paprika spice. Off-dry whites balance the saltiness of cheddar, whilst Austrian reds such as Zweigelt compliment the smoke and spice.'
				]
			},
			/* end Sub sub category -- smoked*/
			/* end sub cats cheese*/
		};

	settings.getCategory = function(id){
		if(typeof(id)==='undefined' || !_categories[id]){ debug&&console.error('id is invalid'); return false;}
		return $.extend(true,{},_categories[id]);
	};
	settings.getCategories = function(){
		return $.extend(true,{},_categories);	
	};

	return settings;
}());


/*  */
var matchMakerCatOneView = (function(){
	"use strict";

	var settings = {},
		_pageTransitions = null,
		_id = 'matchMakerCatOneView',
		//_iosScrollView = null,
		_template = null,
		_inView = false;

	settings.backButtonClicked = new Event(_id);
	settings.homeButtonClicked = new Event(_id);
	settings.selectionClicked = new Event(_id);


	settings.start = function(){
		
		$('#matchmaker-cat-1').on('click','.mp3-header .icon-left',function(){
			settings.backButtonClicked.notify();
		});
		$('#matchmaker-cat-1').on('click','.mp3-header .icon-right',function(){
			settings.homeButtonClicked.notify();
		});
		$('#matchmaker-cat-1').on('click','.scroller > .list > .item',function(){
			$(this).addClass('active');
			settings.selectionClicked.notify({id:$(this).attr('data-id')});
		});

		_pageTransitions =  new PageTransitions({
			el:'#matchmaker-cat-1',
			transition:'left'
		});
		_template = _.template($('.matchmaker-list-template').html());
	};

	settings.show = function(callback,args){
		_inView = true;
		$('#matchmaker-cat-1, .trans-overlay').addClass('active');
		args = (!$.isEmptyObject(args) && args&&typeof(args.dir)!=='undefined') ? args.dir : 'left';
		_pageTransitions.in(args,null,function(){
			$('.trans-overlay').removeClass('active');
			if(typeof(callback)==='function'){ callback(); };
		});
	};

	settings.hide = function(callback,args){
		_inView = false;
		args = (!$.isEmptyObject(args) && args&&typeof(args.dir)!=='undefined') ? args.dir : 'left';
		_pageTransitions.out(args,null,function(){
			$('#matchmaker-cat-1').removeClass('active');
			if(typeof(callback)==='function'){ callback(); };
		});
	};

	settings.populateTemplate = function(templateData){
		$('#matchmaker-cat-1 .content-wrapper').append(_template(templateData));
		//if(_iosScrollView){
		//	_iosScrollView.destroy();
		//	_iosScrollView = null;
		/////}
		//_iosScrollView = new IScroll('#matchmaker-cat-1 .wrapper-scroller',{hScrollbar:false, vScrollbar:false,hideScrollbar: true, hideScrollbars: true,preventDefaultException: { tagName:/.*/ },click:true});
	};

	settings.removeTemplate = function(){
		$('#matchmaker-cat-1 .wrapper-scroller').remove();
	};

	settings.showLoader = function(){
		$('.disable-overlay').addClass('show');
	};

	settings.hideLoader = function(){
		$('.disable-overlay').removeClass('show');
	};

	return settings;
}());
var matchMakerCatOneController = (function(){
	"use strict";

	var settings = {},
		_inView = false,
		_model = matchMakerModel,
		_view = matchMakerCatOneView;

	globalEvent.attach("app:ready",function(args){
		// initialise now that the app is ready.
		settings.start();
	});

	globalEvent.attach("matchmakercat1:show",function(args){
		_view.populateTemplate(_model.getCategory('foodtype'));
		settings.show(function(){
		},args);
	});

	globalEvent.attach("matchmakercat1:hide",function(args){
		settings.hide(false,args);
	});

	_view.backButtonClicked.attach(function(sender, args){
		_goToHome();
	});
	_view.homeButtonClicked.attach(function(sender, args){
		_goToHome();
	});
	_view.selectionClicked.attach(function(sender, args){
		globalEvent.notify('matchmakercat2:show',args);
		settings.hide(false,{dir:'right'});
	});

	function _goToHome(){
		globalEvent.notify("home:show",{dir:'right'});
		settings.hide();
	};

	function _backButton(e){
		e.preventDefault();
		_goToHome();
	};

	function _addBackEvents(){
		document.addEventListener("backbutton",_backButton, false);
	};
	function _removeBackEvents(){
		document.removeEventListener("backbutton",_backButton,false);
	};

	settings.start = function(){
		_view.start();
	};

	settings.hide = function(callback,args){
		_inView = false;
		_removeBackEvents();
		_view.hide(function(){
			_view.removeTemplate();
			if(typeof(callback)==='function'){ callback(); };
		},args);
	};

	settings.show = function(callback,args){
		_inView = true;
		//globalEvent.notify('history:add',{id:'matchmakercat1:show',dir:'left'});
		_view.showLoader();
		_view.show(function(){
			_addBackEvents();
		_view.hideLoader();
			if(typeof(callback)==='function'){ callback(); };
		},args);
	};

	return settings;
}());


/* Match maker cat 2*/

var matchMakerCatTwoView = (function(){
	"use strict";

	var settings = {},
		_pageTransitions = null,
		_id = 'matchMakerCatTwoView',
		_template = null,
		_inView = false;

	settings.backButtonClicked = new Event(_id);
	settings.homeButtonClicked = new Event(_id);
	settings.selectionClicked = new Event(_id);

	settings.start = function(){
		
		$('#matchmaker-cat-2').on('click','.mp3-header .icon-left',function(){
			settings.backButtonClicked.notify();
		});
		$('#matchmaker-cat-2').on('click','.mp3-header .icon-right',function(){
			settings.homeButtonClicked.notify();
		});
		$('#matchmaker-cat-2').on('click','.scroller > .list > .item',function(){
			$(this).addClass('active');
			settings.selectionClicked.notify({id:$(this).attr('data-id')});
		});

		_pageTransitions =  new PageTransitions({
			el:'#matchmaker-cat-2',
			transition:'left'
		});
		_template = _.template($('.matchmaker-list-template').html());
	};

	settings.show = function(callback,args){
		_inView = true;
		$('#matchmaker-cat-2, .trans-overlay').addClass('active');
		args = (!$.isEmptyObject(args) && args&&typeof(args.dir)!=='undefined') ? args.dir : 'left';
		_pageTransitions.in(args,null,function(){
			$('.trans-overlay').removeClass('active');
			if(typeof(callback)==='function'){ callback(); };
		});
	};

	settings.hide = function(callback,args){
		_inView = false;
		args = (!$.isEmptyObject(args) && args&&typeof(args.dir)!=='undefined') ? args.dir : 'left';
		_pageTransitions.out(args,null,function(){
			$('#matchmaker-cat-2').removeClass('active');
			if(typeof(callback)==='function'){ callback(); };
		});
	};

	settings.populateTemplate = function(templateData){
		$('#matchmaker-cat-2 .content-wrapper').append(_template(templateData));
		//if(_iosScrollView){
		//	_iosScrollView.destroy();
		//	_iosScrollView = null;
		//}
		//_iosScrollView = new IScroll('#matchmaker-cat-2 .wrapper-scroller',{hScrollbar:false, vScrollbar:false,hideScrollbar: true, hideScrollbars: true,preventDefaultException: { tagName:/.*/ },click:true});
	};

	settings.removeTemplate = function(){
		$('#matchmaker-cat-2 .wrapper-scroller').remove();
	};

	settings.showLoader = function(){
		$('.disable-overlay').addClass('show');
	};

	settings.hideLoader = function(){
		$('.disable-overlay').removeClass('show');
	};

	return settings;
}());
var matchMakerCatTwoController = (function(){
	"use strict";

	var settings = {},
		_inView = false,
		_model = matchMakerModel,
		_cachedID = null,
		_view = matchMakerCatTwoView;

	globalEvent.attach("app:ready",function(args){
		// initialise now that the app is ready.
		settings.start();
	});

	globalEvent.attach("matchmakercat2:show",function(args){
		_cachedID = typeof(args.id)!=='undefined' ? args.id : _cachedID;
		_view.populateTemplate(_model.getCategory(_cachedID));
		settings.show(function(){
		},args);
	});
	globalEvent.attach("matchmakercat2:hide",function(args){
		settings.hide(false,args);
	});

	_view.backButtonClicked.attach(function(sender, args){
		globalEvent.notify("matchmakercat1:show",{dir:'right'});
		settings.hide();
	});
	_view.homeButtonClicked.attach(function(sender, args){
		_goToHome();
	});

	_view.selectionClicked.attach(function(sender, args){
		globalEvent.notify('matchmakercat3:show',args);
		settings.hide(false,{dir:'right'});
	});

	function _goToHome(){
		globalEvent.notify("home:show",{dir:'right'});
		settings.hide();
	};

	settings.start = function(){
		_view.start();
	};

	function _backButton(e){
		e.preventDefault();
		globalEvent.notify("matchmakercat1:show",{dir:'right'});
		settings.hide();
	};

	function _addBackEvents(){
		document.addEventListener("backbutton",_backButton, false);
	};
	function _removeBackEvents(){
		document.removeEventListener("backbutton",_backButton,false);
	};

	settings.hide = function(callback,args){
		_inView = false;
		_removeBackEvents();
		_view.hide(function(){
			_view.removeTemplate();
			if(typeof(callback)==='function'){ callback(); };
		},args);
	};

	settings.show = function(callback,args){
		_inView = true;
		
		//globalEvent.notify('history:add',{id:'matchmakercat2:show',dir:'left'});
		_view.showLoader();
		_view.show(function(){
			_addBackEvents();
		_view.hideLoader();
			if(typeof(callback)==='function'){ callback(); };
		},args);
	};

	return settings;
}());


/* Match maker cat 3*/

var matchMakerCatThreeView = (function(){
	"use strict";

	var settings = {},
		_pageTransitions = null,
		_id = 'matchMakerCatThreeView',
		_template = null,
		_inView = false;

	settings.backButtonClicked = new Event(_id);
	settings.homeButtonClicked = new Event(_id);
	settings.selectionClicked = new Event(_id);

	settings.start = function(){
		
		$('#matchmaker-cat-3').on('click','.mp3-header .icon-left',function(){
			settings.backButtonClicked.notify();
		});
		$('#matchmaker-cat-3').on('click','.mp3-header .icon-right',function(){
			settings.homeButtonClicked.notify();
		});
		$('#matchmaker-cat-3').on('click','.scroller > .list > .item',function(){
			$(this).addClass('active');
			settings.selectionClicked.notify({id:$(this).attr('data-id')});
		});

		_pageTransitions =  new PageTransitions({
			el:'#matchmaker-cat-3',
			transition:'left'
		});
		_template = _.template($('.matchmaker-list-template').html());
	};

	settings.show = function(callback,args){
		_inView = true;
		$('#matchmaker-cat-3, .trans-overlay').addClass('active');
		args = (!$.isEmptyObject(args) && args&&typeof(args.dir)!=='undefined') ? args.dir : 'left';
		_pageTransitions.in(args,null,function(){
			$('.trans-overlay').removeClass('active');
			if(typeof(callback)==='function'){ callback(); };
		});
	};

	settings.hide = function(callback,args){
		_inView = false;
		args = (!$.isEmptyObject(args) && args&&typeof(args.dir)!=='undefined') ? args.dir : 'left';
		_pageTransitions.out(args,null,function(){
			$('#matchmaker-cat-3').removeClass('active');
			if(typeof(callback)==='function'){ callback(); };
		});
	};

	settings.populateTemplate = function(templateData){
		$('#matchmaker-cat-3 .content-wrapper').append(_template(templateData));
		//if(_iosScrollView){
		//	_iosScrollView.destroy();
		//	_iosScrollView = null;
		//}
		//_iosScrollView = new IScroll('#matchmaker-cat-3 .wrapper-scroller',{hScrollbar:false, vScrollbar:false,hideScrollbar: true, hideScrollbars: true,preventDefaultException: { tagName:/.*/ },click:true});
	};

	settings.removeTemplate = function(){
		$('#matchmaker-cat-3 .wrapper-scroller').remove();
	};

	settings.showLoader = function(){
		$('.disable-overlay').addClass('show');
	};

	settings.hideLoader = function(){
		$('.disable-overlay').removeClass('show');
	};

	return settings;
}());
var matchMakerCatThreeController = (function(){
	"use strict";

	var settings = {},
		_inView = false,
		_model = matchMakerModel,
		_cachedID = null,
		_view = matchMakerCatThreeView;

	globalEvent.attach("app:ready",function(args){
		// initialise now that the app is ready.
		settings.start();
	});

	globalEvent.attach("matchmakercat3:show",function(args){
		_cachedID = typeof(args.id)!=='undefined' ? args.id : _cachedID;
		_view.populateTemplate(_model.getCategory(_cachedID));
		settings.show(function(){
		},args);
	});
	globalEvent.attach("matchmakercat3:hide",function(args){
		settings.hide(false,args);
	});

	_view.backButtonClicked.attach(function(sender, args){
		globalEvent.notify("matchmakercat2:show",{dir:'right'});
		settings.hide();
	});
	_view.homeButtonClicked.attach(function(sender, args){
		_goToHome();
	});

	_view.selectionClicked.attach(function(sender, args){
		globalEvent.notify('matchmakerdesc:show',args);
		settings.hide(false,{dir:'right'});
	});

	function _goToHome(){
		globalEvent.notify("home:show",{dir:'right'});
		settings.hide();
	};

	settings.start = function(){
		_view.start();
	};

	function _backButton(e){
		e.preventDefault();
		globalEvent.notify("matchmakercat2:show",{dir:'right'});
		settings.hide();
	};

	function _addBackEvents(){
		document.addEventListener("backbutton",_backButton, false);
	};
	function _removeBackEvents(){
		document.removeEventListener("backbutton",_backButton,false);
	};

	settings.hide = function(callback,args){
		_inView = false;
		_removeBackEvents();
		_view.hide(function(){
			_view.removeTemplate();
			if(typeof(callback)==='function'){ callback(); };
		},args);
	};

	settings.show = function(callback,args){
		_inView = true;
		
		//globalEvent.notify('history:add',{id:'matchmakercat3:show',dir:'left'});
		_view.showLoader();
		_view.show(function(){
			_addBackEvents();
		_view.hideLoader();
			if(typeof(callback)==='function'){ callback(); };
		},args);
	};

	return settings;
}());


/* Match Maker Description */

var matchMakerDescView = (function(){
	"use strict";

	var settings = {},
		_pageTransitions = null,
		_id = 'matchMakerDescView',
		//_iosScrollView = null,
		_template = null,
		_inView = false;

	settings.backButtonClicked = new Event(_id);
	settings.homeButtonClicked = new Event(_id);
	settings.startAgainClicked = new Event(_id);
	settings.shareButtonClicked = new Event(_id);


	settings.start = function(){
		
		$('#matchmaker-desc').on('click','.mp3-header .icon-left',function(){
			settings.backButtonClicked.notify();
		});
		$('#matchmaker-desc').on('click','.mp3-header .icon-right',function(){
			settings.homeButtonClicked.notify();
		});
		$('#matchmaker-desc').on('click','.breadcrumb > .startagain',function(){
			settings.startAgainClicked.notify();
		});
		$('#matchmaker-desc').on('click','.sharebutton',function(){
			settings.shareButtonClicked.notify();
		});

		_pageTransitions =  new PageTransitions({
			el:'#matchmaker-desc',
			transition:'left'
		});
		_template = _.template($('.matchmaker-desc-template').html());
	};

	settings.show = function(callback,args){
		_inView = true;
		$('#matchmaker-desc, .trans-overlay').addClass('active');
		args = (!$.isEmptyObject(args) && args&&typeof(args.dir)!=='undefined') ? args.dir : 'left';
		_pageTransitions.in(args,null,function(){
			$('.trans-overlay').removeClass('active');
			if(typeof(callback)==='function'){ callback(); };
		});
	};

	settings.hide = function(callback,args){
		_inView = false;
		args = (!$.isEmptyObject(args) && args&&typeof(args.dir)!=='undefined') ? args.dir : 'left';
		_pageTransitions.out(args,null,function(){
			$('#matchmaker-desc').removeClass('active');
			if(typeof(callback)==='function'){ callback(); };
		});
	};

	settings.populateTemplate = function(templateData){
		$('#matchmaker-desc .content-wrapper').append(_template(templateData));
		//if(_iosScrollView){
		//	_iosScrollView.destroy();
		//	_iosScrollView = null;
		//}
		//_iosScrollView = new IScroll('#matchmaker-desc .wrapper-scroller',{hScrollbar:false, vScrollbar:false,hideScrollbar: true, hideScrollbars: true,preventDefaultException: { tagName:/.*/ },click:true});
	};

	settings.removeTemplate = function(){
		$('#matchmaker-desc .wrapper-scroller').remove();
	};

	settings.showLoader = function(){
		$('.disable-overlay').addClass('show');
	};

	settings.hideLoader = function(){
		$('.disable-overlay').removeClass('show');
	};

	return settings;
}());

var matchMakerDescController = (function(){
	"use strict";

	var settings = {},
		_inView = false,
		_model = matchMakerModel,
		_cachedID = null,
		_view = matchMakerDescView;

	globalEvent.attach("app:ready",function(args){
		// initialise now that the app is ready.
		settings.start();
	});

	globalEvent.attach("matchmakerdesc:show",function(args){
		_cachedID = typeof(args.id)!=='undefined' ? args.id : _cachedID;
		_view.populateTemplate(_model.getCategory(_cachedID));
		settings.show(function(){
		},args);
	});
	globalEvent.attach("matchmakerdesc:hide",function(args){
		settings.hide(false,args);
	});

	_view.backButtonClicked.attach(function(sender, args){
		globalEvent.notify("matchmakercat3:show",{dir:'right'});
		settings.hide();
	});
	_view.homeButtonClicked.attach(function(sender, args){
		_goToHome();
	});
	_view.startAgainClicked.attach(function(sender, args){
		globalEvent.notify("matchmakercat1:show",{dir:'right'});
		settings.hide();
	});
	_view.shareButtonClicked.attach(function(sender, args){
		globalEvent.notify("share",{id:'matchmaker_sharefriend',content:''});
	});

	function _goToHome(){
		globalEvent.notify("home:show",{dir:'right'});
		settings.hide();
	};

	settings.start = function(){
		_view.start();
	};

	function _backButton(e){
		e.preventDefault();
		globalEvent.notify("matchmakercat3:show",{dir:'right'});
		settings.hide();
	};

	function _addBackEvents(){
		document.addEventListener("backbutton",_backButton, false);
	};
	function _removeBackEvents(){
		document.removeEventListener("backbutton",_backButton,false);
	};

	settings.hide = function(callback,args){
		_inView = false;
		_removeBackEvents();
		_view.hide(function(){
			_view.removeTemplate();
			if(typeof(callback)==='function'){ callback(); };
		},args);
	};

	settings.show = function(callback,args){
		_inView = true;
		//globalEvent.notify('history:add',{id:'matchmakerdesc:show',dir:'left'});
		_view.showLoader();
		_view.show(function(){
			_addBackEvents();
			_view.hideLoader();
			if(typeof(callback)==='function'){ callback(); };
		},args);
	};

	return settings;
}());
