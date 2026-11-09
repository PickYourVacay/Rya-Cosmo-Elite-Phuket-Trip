/* =====================================================================
   ITINERARY DATA  ·  edit this file to change the day-wise plan
   ---------------------------------------------------------------------
   Each day:  n = day number, th = Thai numeral on the stamp,
              place / date = small label, t = headline (<em> = pink italic),
              lede = intro line, scene = postcard picture (see scenes.js),
              acts = [time, title, details, 1 if it is a secret event],
              meals = 'L', 'D' or 'LD', stay = tonight's hotel (null = fly home)
   {transit:'ferry'} inserts the Phuket → Koh Samui road + ferry band.
   ===================================================================== */
/* ---------- Day data ---------- */
window.D=[
 {n:1,th:'๑',place:'Phuket',date:'Sun 22 Nov',t:'Sawasdee, <em>Phuket.</em>',lede:'Overnight flights, a veg lunch, a lazy afternoon by your own pool, and the first secret of the trip after dark.',scene:'arrive',
  acts:[['01:00','Fly Chennai → Bangkok → Phuket','TG 338 leaves Chennai T2 at 01:00 and lands in Bangkok at 05:55. Clear immigration, then TG 201 at 07:40 lands in Phuket at 09:10. <b>Tip:</b> sleep on the first flight, the day starts as soon as you land.'],
        ['09:30','Welcome & private transfer','Our team meets you at arrivals with a sign. Private AC vehicle for the group and your bags.'],
        ['Lunch','Pure veg lunch','At a vegetarian restaurant on the way to the villa.'],
        ['Afternoon','Check in to the private villa','Settle in, swim, sleep. The villa is yours for the next two nights.'],
        ['Evening','Secret event #1, with dinner','Details stay under wraps until tonight. Dinner is part of the event and is pure veg. <b>Wear:</b> smart casual, unless we tell you otherwise.',1]],
  meals:'LD',stay:'Private villa, Phuket'},
 {n:2,th:'๒',place:'Phuket',date:'Mon 23 Nov',t:'A slow morning, a <em>big afternoon.</em>',lede:'Sleep off night one. The second surprise lands after lunch.',scene:'secretNoon',
  acts:[['Morning','Free time at the villa','Pool, music, a late start. Nothing is planned before lunch.'],
        ['Lunch','Pure veg lunch','At a vegetarian restaurant or served at the villa.'],
        ['Afternoon','Secret event #2','Another surprise, revealed on the day. <b>Carry:</b> sunscreen and a change of clothes, just in case.',1],
        ['Evening','Pure veg dinner & pack','Dinner together, then pack and sleep early. Tomorrow is a long travel day.']],
  meals:'LD',stay:'Private villa, Phuket'},
 {transit:'ferry'},
 {n:3,th:'๓',place:'Koh Samui · Koh Phangan',date:'Tue 24 Nov',t:'Island hop to the <em>full moon.</em>',lede:'Across southern Thailand by road and sea, a quick reset at the resort, and then the night everyone came for.',scene:'fullmoon',
  acts:[['Early','Check out & drive to Donsak Pier','Private car from the villa across the mainland to Donsak, about 4 to 5 hours. <b>Carry:</b> a neck pillow and a power bank.'],
        ['Lunch','Pure veg lunch en route','A vegetarian lunch stop on the way to the pier.'],
        ['Afternoon','Ferry Donsak → Koh Samui','About 1.5 hours across the Gulf of Thailand. Transfer to ARKbar Beach Resort on Chaweng Beach and check in.'],
        ['Evening','Pure veg dinner','Eat well before the party. It is a long night.'],
        ['Night','Full Moon Party, Haad Rin','Boat across to Koh Phangan for Thailand\'s biggest beach party: music stages, neon paint and fire shows until sunrise. <b>Wear:</b> closed sandals. <b>Carry:</b> cash, phone in a waterproof pouch, passport copy only.']],
  meals:'LD',stay:'ARKbar Beach Resort, Koh Samui'},
 {n:4,th:'๔',place:'Koh Samui',date:'Wed 25 Nov',t:'Sunrise on the boat, <em>sleep till lunch.</em>',lede:'Back at the resort as the sun comes up. The rest of the day runs at your own pace.',scene:'relax',
  acts:[['Early','Boat back to Koh Samui','Group boat from Haad Rin at first light, then the short transfer to ARKbar.'],
        ['Morning','Sleep in','Nothing planned. Hang the do-not-disturb sign.'],
        ['Lunch','Pure veg lunch','A late, proper Indian vegetarian lunch.'],
        ['Afternoon','At your own pace','The pool and beach at ARKbar, a Thai massage, or a walk along Chaweng. Spa and activities are at your own cost.'],
        ['Evening','Pure veg dinner','The last dinner of the trip together.']],
  meals:'LD',stay:'ARKbar Beach Resort, Koh Samui'},
 {n:5,th:'๕',place:'Koh Samui → Bangkok → Chennai',date:'Thu 26 Nov',t:'Laa gon, <em>Thailand.</em>',lede:'One last lunch on the island, a short hop to Bangkok, and the late flight home.',scene:'depart',
  acts:[['Morning','Check out','Pack up and check out of ARKbar. Bags can be held at the resort.'],
        ['Lunch','Pure veg lunch','The last included meal of the trip.'],
        ['14:30','Transfer to Samui Airport','Private transfer to USM, two hours before the flight.'],
        ['16:30','PG 154 to Bangkok','Bangkok Airways, economy class, landing at Suvarnabhumi at 17:45. Collect your bags.'],
        ['23:45','TG 359 to Chennai','Check in again at Thai Airways, have dinner at the airport, and land in Chennai T2 at 01:50 on Friday.']],
  meals:'L',stay:null}
];

window.TRANSIT={
 ferry:{title:'Phuket → Donsak → Koh Samui',note:'Tue 24 Nov · by car, then ferry',from:'PHUKET',mid:'DONSAK PIER',mx:560,my:118,to:'KOH SAMUI',path:'M70 150 C 230 150, 380 150, 560 118 C 660 100, 760 110, 830 70',veh:'<g transform="translate(-30 -14)"><rect x="0" y="0" width="58" height="22" rx="6" fill="#D3236F"/><rect x="40" y="4" width="14" height="8" rx="2" fill="#fff" opacity=".85"/><rect x="6" y="4" width="8" height="7" rx="1" fill="#fff" opacity=".85"/><rect x="18" y="4" width="8" height="7" rx="1" fill="#fff" opacity=".85"/><rect x="30" y="4" width="8" height="7" rx="1" fill="#fff" opacity=".85"/><circle cx="14" cy="23" r="5" fill="#1B1E3A"/><circle cx="46" cy="23" r="5" fill="#1B1E3A"/></g>',veh2:'<g transform="translate(-34 -16)"><path d="M0 18 L68 18 L60 30 L6 30Z" fill="#fff" stroke="#1B1E3A" stroke-width="2"/><rect x="10" y="4" width="46" height="14" fill="#F6F5F9" stroke="#1B1E3A" stroke-width="2"/><rect x="16" y="8" width="8" height="5" fill="#1D6CB3"/><rect x="28" y="8" width="8" height="5" fill="#1D6CB3"/><rect x="40" y="8" width="8" height="5" fill="#1D6CB3"/><rect x="24" y="-6" width="18" height="10" fill="#D3236F"/></g>'}
};
window.FLY_HOME={title:'Koh Samui → Bangkok → Chennai',note:'✈ Thu 26 Nov · home by 01:50 Fri',from:'KOH SAMUI',mid:'BANGKOK',mx:620,my:90,to:'CHENNAI',path:'M830 150 C 800 170, 680 110, 620 90 C 480 30, 250 30, 70 170'};

