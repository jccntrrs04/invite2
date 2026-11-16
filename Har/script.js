const $ = id => document.getElementById(id);
$("title").innerHTML = `Hey ${INVITE.friendName}, <br>let's go on a <span class="bounce">trip!</span>`;
$("lead").textContent = INVITE.message;
$("where").textContent = INVITE.destination;
$("when").textContent = INVITE.datesText;
$("meet").textContent = INVITE.meetup;

/* ---------- sound effects (built in, no files needed) ---------- */
let ctx, muted = false;
const audioCtx = () => (ctx ||= new (window.AudioContext || window.webkitAudioContext)());
function tone(freq, t0, dur, type = "sine", vol = .18){
  if (muted) return;
  const a = audioCtx(), o = a.createOscillator(), g = a.createGain();
  o.type = type; o.frequency.value = freq;
  g.gain.setValueAtTime(0, a.currentTime + t0);
  g.gain.linearRampToValueAtTime(vol, a.currentTime + t0 + .02);
  g.gain.exponentialRampToValueAtTime(.001, a.currentTime + t0 + dur);
  o.connect(g).connect(a.destination);
  o.start(a.currentTime + t0); o.stop(a.currentTime + t0 + dur + .05);
}
const chime = () => [523.25,659.25,783.99,1046.5,1318.5,1568].forEach((f,i)=>{ tone(f,i*.11,.9); tone(f*2,i*.11,.5,"triangle",.05); });
const pop   = () => { tone(700,0,.12,"triangle",.2); tone(1050,.07,.15,"triangle",.15); };
const yay   = () => [784,988,1175,1568,1976].forEach((f,i)=>tone(f,i*.09,.5,"triangle",.16));
const boop  = () => { tone(330,0,.18,"sine",.2); tone(262,.12,.25,"sine",.2); };

/* ---------- your songs (from config.js) ---------- */
const tracks = {};
function track(name){
  const src = INVITE.songs && INVITE.songs[name];
  if (!src) return null;
  if (!tracks[name]){
    const a = new Audio(src);
    a.loop = true; a.preload = "auto"; a.volume = INVITE.volume ?? .7;
    tracks[name] = a;
  }
  return tracks[name];
}
function playSong(name){
  Object.keys(tracks).forEach(k => k !== name && tracks[k].pause());
  const a = track(name);
  if (a && !muted){ a.currentTime = 0; a.play().catch(() => {}); }
}
function pauseSongs(){ Object.values(tracks).forEach(a => a.pause()); }
let currentSong = null;
$("mute").onclick = e => {
  muted = !muted;
  e.currentTarget.textContent = muted ? "🔇" : "🔊";
  if (muted) pauseSongs(); else if (currentSong) track(currentSong)?.play().catch(() => {});
};

/* ---------- confetti ---------- */
function confetti(n = 40){
  const set = ["🎉","✨","⛰️","🌲","⭐","🏕️","💚","🍃"];
  for (let i = 0; i < n; i++){
    const s = document.createElement("span");
    s.className = "fly"; s.textContent = set[Math.random()*set.length|0];
    s.style.left = Math.random()*100 + "vw";
    s.style.fontSize = 16 + Math.random()*20 + "px";
    s.style.animationDuration = 2.5 + Math.random()*2.5 + "s";
    s.style.animationDelay = Math.random()*.8 + "s";
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 6500);
  }
}

/* ---------- open envelope (this tap also unlocks audio on Android) ---------- */
$("env").onclick = () => {
  $("env").classList.add("open");
  $("hint").style.display = "none";
  pop(); setTimeout(chime, 250);
  currentSong = "invite"; playSong("invite");
  setTimeout(() => { $("card").classList.add("show"); confetti(45); }, 900);
};

/* ---------- countdown ---------- */
function tick(){
  let d = Math.max(0, new Date(INVITE.startDate) - Date.now()) / 1000;
  $("count").innerHTML = [["days",86400],["hrs",3600],["min",60],["sec",1]].map(([l,s]) => {
    const v = Math.floor(d / s); d -= v * s;
    return `<b>${String(v).padStart(2,"0")}<small>${l}</small></b>`;
  }).join("");
}
tick(); setInterval(tick, 1000);

/* ---------- RSVP email ---------- */
let lastAnswer = "yes";
function rsvp(answer){
  const subject = `RSVP: ${answer === "yes" ? "I'm IN! 🤙" : "Let me check 🤔"} – ${INVITE.destination} trip`;
  const body = answer === "yes"
    ? `Count me in for ${INVITE.destination} (${INVITE.datesText})! 🏖️🌴\n\n– ${INVITE.friendName}`
    : `Thanks for the invite to ${INVITE.destination} (${INVITE.datesText}). Let me check my schedule and I'll confirm soon!\n\n– ${INVITE.friendName}`;
  location.href = `mailto:${INVITE.rsvpEmails.join(",")}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

$("sendRsvp").onclick = () => rsvp("yes");

/* ---------- buttons ---------- */
$("yes").onclick = () => {
  lastAnswer = "yes";
  yay(); confetti(70);
  $("thanks").textContent = "Yesss! Get ready! 🎉";
  currentSong = "yes"; playSong("yes");
  $("sendRsvp").hidden = false;
};
$("maybe").onclick = () => {
  boop();
  const b = $("maybe");
  b.classList.add("gone");
  $("yes").classList.add("only");
  $("thanks").textContent = "Oops, that button vanished! Only one choice left 😄";
  setTimeout(() => b.remove(), 500);
};