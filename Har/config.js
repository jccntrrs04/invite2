/* ===========================================================
   EDIT THIS FILE to customize everything. No other file needed.
   =========================================================== */
const INVITE = {
  friendName: "Harry",                // his name
  fromName: "SAMAHAN NG MGA SINGLE",        // who is inviting (shown at the bottom)
  destination: "Dona Remedios Trinidad, Bulacan",
  datesText: "Fri, Dec 19 – Sun, Dec 20",
  startDate: "2026-12-19T06:00:00",   // countdown target
  meetup: "Meet at our place, 10:00 AM",
  who: "The whole squad (and you!)",  // who he'll be meeting

  // First-time-meeting message
  message: "We haven't met yet, but we've heard so much about you and we'd love for you to join us. Come for the mountains, stay for the laughs. No pressure, no awkwardness, just good food and good people. We can't wait to finally meet you!",

  // Little reassurance chips shown on the card (add or remove any)
  chips: ["🍜 We'll bring snacks", "🎶 Good music", "🌄 Great views", "🤝 Easy-going crew"],

  // RSVP emails go to both of these
  rsvpEmails: ["princesskang0522@gmail.com", "contrerasjeff04@gmail.com"],

  /* ---------- YOUR SONGS ----------
     Put your mp3 files in the "audio" folder, then write the file names here.
     Leave "" to use the built-in sweet chimes instead. */
  songs: {
    invite: "audio/NAPUTOL.mp3",  // plays when he opens the envelope (loops)
    yes:    "audio/simot.mp3"      // plays after he taps "I'm in!"
  },
  volume: 0.7                         // 0 to 1
};
