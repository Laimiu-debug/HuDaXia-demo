/* 胡大侠 · 手绘矢量胸像与远景行人 */
(function (root) {
  const HDX = root.HDX = root.HDX || {};

  function svg(inner, vb) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + (vb || "0 0 200 250") + '" aria-hidden="true">' + inner + "</svg>";
  }

  const chen = svg(
    '<defs>' +
      '<linearGradient id="skC" x1="20%" y1="10%" x2="90%" y2="90%"><stop offset="0%" stop-color="#f6ddbc"/><stop offset="50%" stop-color="#d8ab7c"/><stop offset="100%" stop-color="#b07a52"/></linearGradient>' +
      '<linearGradient id="jkC" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3d5552"/><stop offset="100%" stop-color="#1e2f2e"/></linearGradient>' +
    '</defs>' +
    '<ellipse cx="100" cy="248" rx="88" ry="14" fill="#0a1011" opacity=".28"/>' +
    '<path d="M18 250 Q36 168 100 162 Q164 168 186 250 Z" fill="url(#jkC)"/>' +
    '<path d="M70 162 l14 36 h32 l14-36" fill="url(#skC)"/>' +
    /* thermos + hand */
    '<g transform="translate(14,168)">' +
      '<path d="M18 48 q-6 8 2 18 h22 q6-6 2-18z" fill="url(#skC)"/>' +
      '<rect x="8" y="8" width="26" height="52" rx="5" fill="#a63d2e"/>' +
      '<rect x="8" y="22" width="26" height="8" fill="#7c241c"/>' +
      '<rect x="13" y="0" width="16" height="10" rx="2" fill="#e8d8b8"/>' +
      '<path d="M2 50 q12 3 24 0" fill="none" stroke="#f3e6d4" stroke-width="3.2" stroke-linecap="round"/>' +
      '<path d="M6 47 q10 2 20 0" fill="none" stroke="#8a4e42" stroke-width="1.1" opacity=".55"/>' +
    '</g>' +
    /* ear */
    '<path d="M54 118 q-12 8 -8 24 q8 10 16 4" fill="#c4966e"/>' +
    /* head */
    '<ellipse cx="102" cy="112" rx="50" ry="58" fill="url(#skC)"/>' +
    /* age wrinkles */
    '<path d="M72 86 q16 6 28 0" fill="none" stroke="#c49a74" stroke-width="1.2"/>' +
    '<path d="M108 88 q14 5 24 0" fill="none" stroke="#c49a74" stroke-width="1.2"/>' +
    '<path d="M64 128 q-8 2 -12 8" fill="none" stroke="#c49a74" stroke-width="1.1"/>' +
    '<path d="M136 128 q8 2 12 8" fill="none" stroke="#c49a74" stroke-width="1.1"/>' +
    /* gray hair, thinning top */
    '<path d="M54 108 Q50 46 102 40 Q156 46 152 108 Q148 78 102 70 Q58 78 54 108 Z" fill="#8d8a84"/>' +
    '<path d="M70 58 Q102 48 136 60" fill="none" stroke="#c5c1b8" stroke-width="2" opacity=".5"/>' +
    /* brows */
    '<path d="M68 96 q16 -9 30 1" fill="none" stroke="#6a6560" stroke-width="3.2" stroke-linecap="round"/>' +
    '<path d="M112 97 q14 -8 28 2" fill="none" stroke="#6a6560" stroke-width="3.2" stroke-linecap="round"/>' +
    /* eyes — kind, slightly squint */
    '<path d="M70 114 q16 8 28-1" fill="none" stroke="#3a2a1c" stroke-width="1.4"/>' +
    '<ellipse cx="84" cy="112" rx="9" ry="5.2" fill="#f7efe6"/>' +
    '<ellipse cx="122" cy="112" rx="9" ry="5.2" fill="#f7efe6"/>' +
    '<circle cx="85" cy="112.5" r="3.1" fill="#4a321c"/>' +
    '<circle cx="123" cy="112.5" r="3.1" fill="#4a321c"/>' +
    '<circle cx="86.2" cy="111.2" r="1.1" fill="#fff"/>' +
    '<circle cx="124.2" cy="111.2" r="1.1" fill="#fff"/>' +
    '<path d="M72 110 q12 -3 22 0" fill="none" stroke="#3a2a1c" stroke-width="1.3"/>' +
    '<path d="M111 110 q12 -3 22 0" fill="none" stroke="#3a2a1c" stroke-width="1.3"/>' +
    /* nose */
    '<path d="M100 108 q6 20 -8 28" fill="none" stroke="#a06748" stroke-width="2" stroke-linecap="round"/>' +
    '<path d="M92 136 q8 4 12-2" fill="none" stroke="#a06748" stroke-width="1.3"/>' +
    /* mouth smile + folds */
    '<path d="M88 152 q16 11 30 -2" fill="none" stroke="#8a4e42" stroke-width="2.2" stroke-linecap="round"/>' +
    '<path d="M86 150 q2 8 -2 12" fill="none" stroke="#c49a74" stroke-width="1"/>' +
    /* jacket collar */
    '<path d="M72 170 q30 14 60 0" fill="none" stroke="#1a2827" stroke-width="2" opacity=".7"/>'
  );

  const boy = svg(
    '<defs>' +
      '<linearGradient id="skB" x1="20%" y1="10%" x2="90%" y2="90%"><stop offset="0%" stop-color="#f8e0c4"/><stop offset="60%" stop-color="#e0b48a"/><stop offset="100%" stop-color="#c08a60"/></linearGradient>' +
      '<linearGradient id="jkB" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a6d3a"/><stop offset="100%" stop-color="#5c4524"/></linearGradient>' +
    '</defs>' +
    '<ellipse cx="100" cy="248" rx="80" ry="12" fill="#0a1011" opacity=".25"/>' +
    '<path d="M28 250 Q40 175 100 170 Q160 175 176 250 Z" fill="url(#jkB)"/>' +
    '<path d="M78 168 l10 28 h24 l10-28" fill="url(#skB)"/>' +
    '<path d="M48 128 q-10 6 -6 20 q6 8 14 4" fill="#e0b48a"/>' +
    '<ellipse cx="100" cy="116" rx="46" ry="52" fill="url(#skB)"/>' +
    /* hair with cowlick */
    '<path d="M54 120 Q50 52 100 48 Q152 52 148 120 Q140 78 100 74 Q62 78 54 120 Z" fill="#1c1814"/>' +
    '<path d="M96 50 q8 -18 22 -8" fill="none" stroke="#1c1814" stroke-width="7" stroke-linecap="round"/>' +
    '<path d="M68 100 q14 -6 26 2" fill="none" stroke="#1c1814" stroke-width="2.6" stroke-linecap="round"/>' +
    '<path d="M110 101 q12 -6 24 2" fill="none" stroke="#1c1814" stroke-width="2.6" stroke-linecap="round"/>' +
    /* shy downcast eyes */
    '<ellipse cx="82" cy="118" rx="8" ry="5" fill="#f7efe6"/>' +
    '<ellipse cx="118" cy="118" rx="8" ry="5" fill="#f7efe6"/>' +
    '<circle cx="83" cy="119.5" r="2.8" fill="#3a2a1c"/>' +
    '<circle cx="119" cy="119.5" r="2.8" fill="#3a2a1c"/>' +
    '<circle cx="84" cy="118.4" r="0.9" fill="#fff"/>' +
    '<path d="M74 114 q8 -2 16 1" fill="none" stroke="#1c1814" stroke-width="1.4"/>' +
    '<path d="M110 114 q8 -2 16 1" fill="none" stroke="#1c1814" stroke-width="1.4"/>' +
    '<path d="M96 122 q4 16 -6 24" fill="none" stroke="#c08a60" stroke-width="1.8" stroke-linecap="round"/>' +
    '<path d="M90 156 q10 4 18-1" fill="none" stroke="#a06748" stroke-width="1.8" stroke-linecap="round"/>' +
    /* bag strap */
    '<path d="M40 190 L160 210" stroke="#5c4524" stroke-width="7" fill="none"/>' +
    '<path d="M40 190 L160 210" stroke="#c4a14a" stroke-width="2" fill="none"/>'
  );

  const rider = svg(
    '<defs>' +
      '<linearGradient id="skR" x1="20%" y1="10%" x2="85%" y2="90%"><stop offset="0%" stop-color="#f3cda8"/><stop offset="55%" stop-color="#d09a6c"/><stop offset="100%" stop-color="#a86c46"/></linearGradient>' +
      '<linearGradient id="hlm" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#4e8a84"/><stop offset="100%" stop-color="#1e4441"/></linearGradient>' +
    '</defs>' +
    '<ellipse cx="100" cy="248" rx="88" ry="12" fill="#0a1011" opacity=".25"/>' +
    '<path d="M16 250 Q34 172 100 166 Q166 172 188 250 Z" fill="#1e4441"/>' +
    '<path d="M22 250 Q40 200 70 190 L40 250 Z" fill="#3c6a66"/>' +
    /* meal box */
    '<g transform="translate(8,186)">' +
      '<rect width="64" height="44" rx="3" fill="#3c6a66" stroke="#e8d8b8" stroke-width="1.5"/>' +
      '<rect x="6" y="8" width="52" height="6" fill="#e8d8b8" opacity=".7"/>' +
      '<text x="32" y="32" text-anchor="middle" font-size="11" fill="#e8d8b8" font-family="sans-serif">餐</text>' +
    '</g>' +
    '<path d="M76 164 l12 30 h24 l12-30" fill="url(#skR)"/>' +
    '<path d="M54 122 q-10 6 -6 18 q6 8 14 4" fill="#d09a6c"/>' +
    '<ellipse cx="102" cy="118" rx="46" ry="50" fill="url(#skR)"/>' +
    /* short hair under helmet */
    '<path d="M58 108 Q56 70 102 66 Q148 70 146 108" fill="#1a1612"/>' +
    /* helmet, visor UP so face is clear */
    '<path d="M48 100 Q50 36 102 32 Q156 36 158 100 L148 96 Q102 86 56 96 Z" fill="url(#hlm)"/>' +
    '<path d="M48 100 Q102 88 158 100" fill="none" stroke="#c9a14a" stroke-width="2"/>' +
    '<rect x="46" y="52" width="18" height="10" rx="2" fill="#f0cf7a" opacity=".35"/>' +
    /* visor flipped up */
    '<path d="M58 56 Q102 36 148 56 L146 70 Q102 54 60 70 Z" fill="#1a3332" opacity=".85"/>' +
    /* impatient brows */
    '<path d="M70 100 q14 -4 26 4" fill="none" stroke="#1a1612" stroke-width="3" stroke-linecap="round"/>' +
    '<path d="M112 102 q12 -6 26 2" fill="none" stroke="#1a1612" stroke-width="3" stroke-linecap="round"/>' +
    /* eyes */
    '<ellipse cx="84" cy="118" rx="9" ry="5.5" fill="#f7efe6"/>' +
    '<ellipse cx="122" cy="118" rx="9" ry="5.5" fill="#f7efe6"/>' +
    '<circle cx="86" cy="118" r="3.2" fill="#2c1c12"/>' +
    '<circle cx="124" cy="118" r="3.2" fill="#2c1c12"/>' +
    '<circle cx="87.2" cy="116.8" r="1" fill="#fff"/>' +
    /* frown, sweat */
    '<path d="M98 114 q5 18 -6 26" fill="none" stroke="#a86c46" stroke-width="2" stroke-linecap="round"/>' +
    '<path d="M90 156 q12 2 22-3" fill="none" stroke="#8a4e42" stroke-width="2.2" stroke-linecap="round"/>' +
    '<circle cx="64" cy="128" r="2.2" fill="#d9c4a0" opacity=".8"/>' +
    '<circle cx="70" cy="140" r="1.6" fill="#d9c4a0" opacity=".7"/>'
  );

  const solicitor = svg(
    '<defs>' +
      '<linearGradient id="skS" x1="20%" y1="8%" x2="90%" y2="90%"><stop offset="0%" stop-color="#f8e6cc"/><stop offset="55%" stop-color="#e2c49a"/><stop offset="100%" stop-color="#c49a72"/></linearGradient>' +
    '</defs>' +
    '<ellipse cx="100" cy="248" rx="86" ry="12" fill="#0a1011" opacity=".25"/>' +
    '<path d="M20 250 Q38 170 100 164 Q164 170 184 250 Z" fill="#4a4038"/>' +
    '<path d="M24 250 Q40 200 80 188" fill="#6a5a4a"/>' +
    /* flyers */
    '<g transform="translate(6,170) rotate(-12)">' +
      '<rect width="54" height="70" fill="#f4ead4" stroke="#a63d2e" stroke-width="2"/>' +
      '<rect x="6" y="10" width="42" height="5" fill="#a63d2e"/>' +
      '<rect x="6" y="20" width="36" height="3" fill="#8a6d32"/>' +
      '<rect x="6" y="28" width="40" height="3" fill="#8a6d32"/>' +
      '<text x="27" y="54" text-anchor="middle" font-size="12" fill="#a63d2e" font-family="serif">惠</text>' +
    '</g>' +
    '<g transform="translate(12,176) rotate(-4)">' +
      '<rect width="54" height="70" fill="#f7e6d4" stroke="#b03a2e" stroke-width="1.5" opacity=".9"/>' +
    '</g>' +
    '<path d="M74 164 l12 32 h28 l12-32" fill="url(#skS)"/>' +
    '<path d="M148 124 q10 4 8 18 q-4 10 -14 6" fill="#e2c49a"/>' +
    '<ellipse cx="104" cy="116" rx="47" ry="52" fill="url(#skS)"/>' +
    /* slicked back hair, shiny */
    '<path d="M58 118 Q52 48 104 42 Q160 48 154 118 Q148 72 104 68 Q64 72 58 118 Z" fill="#2a2018"/>' +
    '<path d="M80 52 Q120 44 140 72" fill="none" stroke="#6a5344" stroke-width="3" opacity=".45"/>' +
    /* brows raised, too even */
    '<path d="M70 96 q16 -4 28 0" fill="none" stroke="#2a2018" stroke-width="2.6" stroke-linecap="round"/>' +
    '<path d="M114 96 q16 -4 28 0" fill="none" stroke="#2a2018" stroke-width="2.6" stroke-linecap="round"/>' +
    /* staring open eyes — smile doesn't reach them */
    '<ellipse cx="86" cy="116" rx="10" ry="7" fill="#f7efe6"/>' +
    '<ellipse cx="126" cy="116" rx="10" ry="7" fill="#f7efe6"/>' +
    '<circle cx="86" cy="116" r="3.6" fill="#3a2a1c"/>' +
    '<circle cx="126" cy="116" r="3.6" fill="#3a2a1c"/>' +
    '<circle cx="87.4" cy="114.6" r="1.1" fill="#fff"/>' +
    /* shiny forehead */
    '<ellipse cx="100" cy="78" rx="16" ry="6" fill="#fff" opacity=".18"/>' +
    /* fake wide smile */
    '<path d="M98 122 q6 18 -4 26" fill="none" stroke="#c49a72" stroke-width="1.8"/>' +
    '<path d="M80 154 q24 16 46-2" fill="none" stroke="#8a4e42" stroke-width="2.4" stroke-linecap="round"/>' +
    '<path d="M86 156 q18 8 34-1" fill="none" stroke="#f4ead4" stroke-width="2"/>'
  );

  const nephew = svg(
    '<defs>' +
      '<linearGradient id="skN" x1="20%" y1="10%" x2="90%" y2="90%"><stop offset="0%" stop-color="#e8c49a"/><stop offset="55%" stop-color="#c99266"/><stop offset="100%" stop-color="#a06a44"/></linearGradient>' +
      '<linearGradient id="jkN" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#8a5a32"/><stop offset="100%" stop-color="#5a3a20"/></linearGradient>' +
    '</defs>' +
    '<ellipse cx="100" cy="248" rx="88" ry="12" fill="#0a1011" opacity=".25"/>' +
    '<path d="M16 250 Q36 172 100 166 Q166 172 188 250 Z" fill="url(#jkN)"/>' +
    /* heavy bag strap */
    '<path d="M36 200 L170 230" stroke="#3a2a1c" stroke-width="10"/>' +
    '<path d="M36 200 L170 230" stroke="#c9a14a" stroke-width="2.5"/>' +
    '<path d="M74 166 l12 32 h28 l12-32" fill="url(#skN)"/>' +
    '<path d="M54 126 q-10 6 -6 18 q6 8 14 4" fill="#c99266"/>' +
    '<ellipse cx="102" cy="116" rx="47" ry="52" fill="url(#skN)"/>' +
    /* messy travel hair */
    '<path d="M55 120 Q48 50 102 44 Q160 50 152 122 Q144 74 102 70 Q62 74 55 120 Z" fill="#2c2018"/>' +
    '<path d="M70 58 q8-12 4-2" fill="#2c2018"/>' +
    '<path d="M128 56 q10-14 8 0" fill="#2c2018"/>' +
    '<path d="M70 98 q16 -8 28 1" fill="none" stroke="#2c2018" stroke-width="3" stroke-linecap="round"/>' +
    '<path d="M114 99 q14 -7 28 2" fill="none" stroke="#2c2018" stroke-width="3" stroke-linecap="round"/>' +
    /* honest open tired eyes */
    '<ellipse cx="84" cy="118" rx="9.5" ry="6.2" fill="#f7efe6"/>' +
    '<ellipse cx="124" cy="118" rx="9.5" ry="6.2" fill="#f7efe6"/>' +
    '<circle cx="84" cy="118" r="3.4" fill="#3a2416"/>' +
    '<circle cx="124" cy="118" r="3.4" fill="#3a2416"/>' +
    '<circle cx="85.4" cy="116.6" r="1.1" fill="#fff"/>' +
    /* faint stubble */
    '<path d="M78 150 q24 20 50 0" fill="#5a4030" opacity=".25"/>' +
    '<path d="M98 114 q6 20 -6 28" fill="none" stroke="#a06a44" stroke-width="2" stroke-linecap="round"/>' +
    '<path d="M88 156 q16 8 28-1" fill="none" stroke="#8a4e42" stroke-width="2" stroke-linecap="round"/>'
  );

  const nephewFake = svg(
    '<defs>' +
      '<linearGradient id="skF" x1="20%" y1="10%" x2="90%" y2="90%"><stop offset="0%" stop-color="#f4d8b4"/><stop offset="55%" stop-color="#d8b088"/><stop offset="100%" stop-color="#b88860"/></linearGradient>' +
      '<linearGradient id="jkF" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#7a5a3a"/><stop offset="100%" stop-color="#4a3624"/></linearGradient>' +
    '</defs>' +
    '<ellipse cx="100" cy="248" rx="86" ry="12" fill="#0a1011" opacity=".25"/>' +
    '<path d="M20 250 Q38 174 100 168 Q164 174 184 250 Z" fill="url(#jkF)"/>' +
    /* thin light strap */
    '<path d="M48 210 L150 226" stroke="#3a2a1c" stroke-width="5"/>' +
    '<path d="M74 168 l12 30 h28 l12-30" fill="url(#skF)"/>' +
    '<path d="M150 124 q10 4 7 18 q-4 10 -14 6" fill="#d8b088"/>' +
    '<ellipse cx="102" cy="116" rx="46" ry="51" fill="url(#skF)"/>' +
    /* neater gelled hair */
    '<path d="M58 116 Q54 50 102 44 Q152 50 148 116 Q142 74 102 70 Q64 74 58 116 Z" fill="#241c16"/>' +
    '<path d="M86 50 Q130 42 144 80" fill="none" stroke="#5a4a3a" stroke-width="2.5" opacity=".4"/>' +
    '<path d="M70 98 q14 -5 26 3" fill="none" stroke="#241c16" stroke-width="2.8" stroke-linecap="round"/>' +
    '<path d="M114 98 q14 -6 26 3" fill="none" stroke="#241c16" stroke-width="2.8" stroke-linecap="round"/>' +
    /* eyes glancing right, narrower */
    '<ellipse cx="84" cy="116" rx="8.5" ry="5.2" fill="#f7efe6"/>' +
    '<ellipse cx="124" cy="116" rx="8.5" ry="5.2" fill="#f7efe6"/>' +
    '<circle cx="87" cy="116" r="3" fill="#3a2a1c"/>' +
    '<circle cx="127" cy="116" r="3" fill="#3a2a1c"/>' +
    '<circle cx="88" cy="114.8" r="0.9" fill="#fff"/>' +
    /* clean-shaven, tight smile */
    '<path d="M98 114 q5 18 -4 26" fill="none" stroke="#b88860" stroke-width="1.8"/>' +
    '<path d="M90 154 q16 5 26 0" fill="none" stroke="#8a4e42" stroke-width="2" stroke-linecap="round"/>'
  );

  const lin = svg(
    '<defs>' +
      '<linearGradient id="skL" x1="25%" y1="8%" x2="90%" y2="90%"><stop offset="0%" stop-color="#f6e0c8"/><stop offset="55%" stop-color="#e0b494"/><stop offset="100%" stop-color="#c08a6c"/></linearGradient>' +
      '<linearGradient id="ctL" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2a2a2c"/><stop offset="100%" stop-color="#141416"/></linearGradient>' +
    '</defs>' +
    '<ellipse cx="100" cy="248" rx="88" ry="12" fill="#0a1011" opacity=".25"/>' +
    '<path d="M18 250 Q36 174 100 166 Q166 174 186 250 Z" fill="url(#ctL)"/>' +
    /* work bag */
    '<g transform="translate(138,186)">' +
      '<rect width="50" height="56" rx="3" fill="#5c4524"/>' +
      '<rect x="4" y="8" width="42" height="4" fill="#c9a14a" opacity=".6"/>' +
      '<path d="M10 -8 h30 v10 h-30z" fill="#5c4524"/>' +
    '</g>' +
    '<path d="M78 166 l10 30 h24 l10-30" fill="url(#skL)"/>' +
    /* long hair behind / sides */
    '<path d="M48 110 Q40 40 100 36 Q164 42 156 114 L160 230 Q100 200 46 230 Z" fill="#1a1410"/>' +
    '<path d="M52 130 q-8 40 2 100" fill="none" stroke="#2a2018" stroke-width="8"/>' +
    '<path d="M148 128 q6 44 -2 100" fill="none" stroke="#2a2018" stroke-width="8"/>' +
    '<path d="M50 126 q-9 6 -5 18 q6 8 14 4" fill="#e0b494"/>' +
    '<ellipse cx="100" cy="116" rx="44" ry="52" fill="url(#skL)"/>' +
    /* loose strands over face */
    '<path d="M120 48 q18 10 10 40" fill="none" stroke="#1a1410" stroke-width="3.2" stroke-linecap="round"/>' +
    '<path d="M70 70 q-8 16 -2 36" fill="none" stroke="#1a1410" stroke-width="2.4" stroke-linecap="round"/>' +
    /* hair top */
    '<path d="M56 114 Q52 46 100 42 Q152 48 148 114 Q140 72 100 68 Q62 72 56 114 Z" fill="#1a1410"/>' +
    /* tired brows */
    '<path d="M70 100 q14 -3 26 4" fill="none" stroke="#1a1410" stroke-width="2.4" stroke-linecap="round"/>' +
    '<path d="M112 101 q14 -4 26 3" fill="none" stroke="#1a1410" stroke-width="2.4" stroke-linecap="round"/>' +
    /* half-lidded eyes, makeup */
    '<path d="M72 114 q14 -2 24 2" fill="none" stroke="#5a3040" stroke-width="2.2" opacity=".55"/>' +
    '<ellipse cx="84" cy="118" rx="9" ry="5" fill="#f7efe6"/>' +
    '<ellipse cx="122" cy="118" rx="9" ry="5" fill="#f7efe6"/>' +
    '<ellipse cx="84" cy="119" rx="8" ry="3.6" fill="#3a2a1c"/>' +
    '<ellipse cx="122" cy="119" rx="8" ry="3.6" fill="#3a2a1c"/>' +
    '<circle cx="85.5" cy="118" r="1" fill="#fff"/>' +
    /* dark circles */
    '<path d="M74 126 q10 4 20 0" fill="none" stroke="#c08a8a" stroke-width="2" opacity=".45"/>' +
    '<path d="M112 126 q10 4 20 0" fill="none" stroke="#c08a8a" stroke-width="2" opacity=".45"/>' +
    '<path d="M98 114 q5 18 -5 26" fill="none" stroke="#c08a6c" stroke-width="1.8" stroke-linecap="round"/>' +
    /* weary mouth + mole */
    '<path d="M90 154 q12 3 22-1" fill="none" stroke="#8a4e42" stroke-width="2" stroke-linecap="round"/>' +
    '<circle cx="128" cy="148" r="1.6" fill="#8a4e42"/>' +
    /* small gold earring */
    '<circle cx="52" cy="136" r="3" fill="none" stroke="#c9a14a" stroke-width="1.6"/>'
  );

  const zhou = svg(
    '<defs>' +
      '<linearGradient id="skZ" x1="20%" y1="8%" x2="90%" y2="90%"><stop offset="0%" stop-color="#f0d4b4"/><stop offset="55%" stop-color="#d4a880"/><stop offset="100%" stop-color="#b0825c"/></linearGradient>' +
      '<linearGradient id="jkZ" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2a3c44"/><stop offset="100%" stop-color="#152228"/></linearGradient>' +
    '</defs>' +
    '<ellipse cx="100" cy="248" rx="88" ry="12" fill="#0a1011" opacity=".25"/>' +
    '<path d="M16 250 Q34 170 100 164 Q168 170 188 250 Z" fill="url(#jkZ)"/>' +
    /* briefcase */
    '<g transform="translate(6,196)">' +
      '<rect width="70" height="42" rx="2" fill="#1a2428" stroke="#c9a14a" stroke-width="1.4"/>' +
      '<rect x="28" y="-8" width="14" height="10" fill="none" stroke="#c9a14a" stroke-width="1.6"/>' +
    '</g>' +
    '<path d="M74 164 l12 32 h28 l12-32" fill="url(#skZ)"/>' +
    '<path d="M56 124 q-10 6 -6 18 q6 8 14 4" fill="#d4a880"/>' +
    '<ellipse cx="102" cy="114" rx="48" ry="52" fill="url(#skZ)"/>' +
    /* receding salt-and-pepper */
    '<path d="M54 108 Q52 58 86 50 L102 78 L122 50 Q154 58 152 108 Q148 78 102 74 Q58 78 54 108 Z" fill="#5a5856"/>' +
    '<path d="M86 52 L102 78 L122 52" fill="url(#skZ)"/>' +
    '<path d="M58 100 Q54 70 78 58" fill="#5a5856"/>' +
    '<path d="M148 100 Q152 70 128 58" fill="#5a5856"/>' +
    /* sharp brows */
    '<path d="M68 96 q16 -8 28 0" fill="none" stroke="#2a241c" stroke-width="3.2" stroke-linecap="round"/>' +
    '<path d="M114 96 q16 -8 28 0" fill="none" stroke="#2a241c" stroke-width="3.2" stroke-linecap="round"/>' +
    /* glasses */
    '<circle cx="84" cy="116" r="16" fill="none" stroke="#c9a14a" stroke-width="2"/>' +
    '<circle cx="124" cy="116" r="16" fill="none" stroke="#c9a14a" stroke-width="2"/>' +
    '<path d="M100 116 h8" stroke="#c9a14a" stroke-width="2"/>' +
    '<path d="M68 114 h-16" stroke="#c9a14a" stroke-width="2"/>' +
    '<path d="M140 114 h16" stroke="#c9a14a" stroke-width="2"/>' +
    '<ellipse cx="84" cy="116" rx="9" ry="5.6" fill="#f7efe6"/>' +
    '<ellipse cx="124" cy="116" rx="9" ry="5.6" fill="#f7efe6"/>' +
    '<circle cx="84" cy="116" r="3.3" fill="#2c2018"/>' +
    '<circle cx="124" cy="116" r="3.3" fill="#2c2018"/>' +
    '<circle cx="85.3" cy="114.6" r="1" fill="#fff"/>' +
    /* glass shine */
    '<path d="M74 108 l8 4" stroke="#fff" stroke-width="1.2" opacity=".45"/>' +
    '<path d="M98 112 q6 20 -6 28" fill="none" stroke="#b0825c" stroke-width="2" stroke-linecap="round"/>' +
    /* thin composed mouth */
    '<path d="M90 154 h26" stroke="#8a4e42" stroke-width="2.2" stroke-linecap="round"/>'
  );

  const ma = svg(
    '<defs>' +
      '<linearGradient id="skM" x1="20%" y1="8%" x2="90%" y2="90%"><stop offset="0%" stop-color="#f0c8a0"/><stop offset="55%" stop-color="#d09464"/><stop offset="100%" stop-color="#a86a42"/></linearGradient>' +
      '<linearGradient id="jkM" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3c6a66"/><stop offset="100%" stop-color="#1e3a38"/></linearGradient>' +
    '</defs>' +
    '<ellipse cx="100" cy="248" rx="92" ry="13" fill="#0a1011" opacity=".25"/>' +
    '<path d="M10 250 Q28 168 100 162 Q176 168 196 250 Z" fill="url(#jkM)"/>' +
    /* towel */
    '<path d="M40 176 Q100 200 164 170 Q168 188 100 208 Q36 188 40 176 Z" fill="#e8d8b8"/>' +
    '<path d="M48 180 Q100 196 154 176" fill="none" stroke="#c9a14a" stroke-width="1.2" opacity=".5"/>' +
    '<path d="M72 164 l14 28 h32 l14-28" fill="url(#skM)"/>' +
    '<path d="M50 128 q-12 8 -6 22 q8 10 18 4" fill="#d09464"/>' +
    '<ellipse cx="102" cy="112" rx="52" ry="56" fill="url(#skM)"/>' +
    /* short sporty hair */
    '<path d="M52 112 Q48 48 102 42 Q158 48 154 112 Q148 70 102 66 Q58 70 52 112 Z" fill="#1a1612"/>' +
    '<path d="M64 70 l6 16 M90 52 l2 18 M114 52 l-2 18 M140 70 l-6 16" stroke="#2a2420" stroke-width="2" opacity=".5"/>' +
    /* thick straight brows */
    '<path d="M66 94 h32" stroke="#1a1612" stroke-width="4" stroke-linecap="round"/>' +
    '<path d="M114 94 h32" stroke="#1a1612" stroke-width="4" stroke-linecap="round"/>' +
    /* open honest eyes */
    '<ellipse cx="84" cy="116" rx="11" ry="7" fill="#f7efe6"/>' +
    '<ellipse cx="126" cy="116" rx="11" ry="7" fill="#f7efe6"/>' +
    '<circle cx="84" cy="116" r="4" fill="#3a2416"/>' +
    '<circle cx="126" cy="116" r="4" fill="#3a2416"/>' +
    '<circle cx="85.6" cy="114.4" r="1.2" fill="#fff"/>' +
    /* sweat sheen */
    '<circle cx="64" cy="122" r="2.4" fill="#f0d8b8" opacity=".75"/>' +
    '<circle cx="70" cy="136" r="1.8" fill="#f0d8b8" opacity=".65"/>' +
    '<circle cx="146" cy="120" r="2" fill="#f0d8b8" opacity=".6"/>' +
    '<path d="M100 110 q6 20 -6 30" fill="none" stroke="#a86a42" stroke-width="2.2" stroke-linecap="round"/>' +
    '<path d="M86 154 q18 10 32-1" fill="none" stroke="#8a4e42" stroke-width="2.4" stroke-linecap="round"/>'
  );

  const caser = svg(
    '<defs>' +
      '<linearGradient id="skK" x1="25%" y1="10%" x2="90%" y2="90%"><stop offset="0%" stop-color="#e8c8a4"/><stop offset="55%" stop-color="#c49670"/><stop offset="100%" stop-color="#9a6a4a"/></linearGradient>' +
      '<linearGradient id="hdK" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2a2c30"/><stop offset="100%" stop-color="#14161a"/></linearGradient>' +
    '</defs>' +
    '<ellipse cx="100" cy="248" rx="86" ry="12" fill="#0a1011" opacity=".25"/>' +
    '<path d="M18 250 Q36 176 100 168 Q166 176 186 250 Z" fill="url(#hdK)"/>' +
    /* hoodie hood down around neck */
    '<path d="M48 168 Q100 200 156 168 Q160 230 100 236 Q44 230 48 168 Z" fill="#1c1e22"/>' +
    '<path d="M76 166 l10 26 h28 l10-26" fill="url(#skK)"/>' +
    '<path d="M54 128 q-10 6 -6 18 q6 8 14 4" fill="#c49670"/>' +
    '<ellipse cx="102" cy="122" rx="44" ry="48" fill="url(#skK)"/>' +
    /* cap, brim not covering eyes */
    '<path d="M50 112 Q52 58 102 54 Q154 58 156 112 L160 118 Q102 104 46 118 Z" fill="#1a1c20"/>' +
    '<path d="M44 114 Q102 100 166 116 L162 128 Q102 114 48 126 Z" fill="#2a2c30"/>' +
    '<path d="M48 118 Q102 108 158 118" fill="none" stroke="#c9a14a" stroke-width="1" opacity=".35"/>' +
    /* sideburns */
    '<path d="M58 120 q-2 20 6 28" fill="#1a1612"/>' +
    '<path d="M148 120 q2 20 -6 28" fill="#1a1612"/>' +
    /* guarded brows */
    '<path d="M70 108 q12 -2 22 6" fill="none" stroke="#1a1612" stroke-width="2.8" stroke-linecap="round"/>' +
    '<path d="M116 108 q12 -2 22 6" fill="none" stroke="#1a1612" stroke-width="2.8" stroke-linecap="round"/>' +
    /* eyes looking left, tense */
    '<ellipse cx="84" cy="124" rx="8.5" ry="5.2" fill="#f7efe6"/>' +
    '<ellipse cx="122" cy="124" rx="8.5" ry="5.2" fill="#f7efe6"/>' +
    '<circle cx="81" cy="124" r="3.1" fill="#2c1c12"/>' +
    '<circle cx="119" cy="124" r="3.1" fill="#2c1c12"/>' +
    '<circle cx="80" cy="122.8" r="0.9" fill="#fff"/>' +
    /* mole on left cheek near ear — the "face seen" mark */
    '<circle cx="60" cy="140" r="2.1" fill="#6a3a30"/>' +
    '<path d="M100 118 q5 18 -6 26" fill="none" stroke="#9a6a4a" stroke-width="1.8" stroke-linecap="round"/>' +
    /* tight mouth */
    '<path d="M92 156 q10 1 18 2" fill="none" stroke="#6a3a30" stroke-width="2.2" stroke-linecap="round"/>'
  );

  /* 远景行人：有肤色、衣服和道具，不是墨点。viewBox 80x120 */
  function walkerSvg(inner) {
    return '<g class="walker-art">' + inner + "</g>";
  }

  HDX.PORTRAITS = {
    chen: chen,
    boy: boy,
    "chen-boy": null, /* composed in engine */
    rider: rider,
    solicitor: solicitor,
    nephew: nephew,
    "nephew-fake": nephewFake,
    lin: lin,
    zhou: zhou,
    ma: ma,
    caser: caser,
    climber: caser
  };

  HDX.WALKERS = {
    chen: walkerSvg(
      '<ellipse cx="28" cy="114" rx="16" ry="4" fill="#0a1011" opacity=".35"/>' +
      '<path d="M16 46 c8-4 20-2 22 6 l4 40 H16z" fill="#1e2f2e"/>' +
      '<path d="M16 84 l3 28 h8 l-1-28z" fill="#1a2422"/>' +
      '<path d="M30 84 l3 28 h9 l-4-28z" fill="#1a2422"/>' +
      '<ellipse cx="28" cy="32" rx="11" ry="13" fill="#d8ab7c"/>' +
      '<path d="M18 32 Q17 18 28 16 Q40 18 39 32 Q37 24 28 23 Q20 24 18 32Z" fill="#8d8a84"/>' +
      '<rect x="42" y="52" width="8" height="18" rx="2" fill="#a63d2e"/>' +
      '<rect x="43" y="49" width="6" height="4" fill="#e8d8b8"/>' +
      '<circle cx="24" cy="34" r="1.1" fill="#3a2a1c"/><circle cx="31" cy="34" r="1.1" fill="#3a2a1c"/>'
    ),
    "chen-boy": walkerSvg(
      '<ellipse cx="32" cy="114" rx="22" ry="4" fill="#0a1011" opacity=".35"/>' +
      '<path d="M8 50 c8-4 18-2 20 6 l3 38 H8z" fill="#1e2f2e"/>' +
      '<path d="M8 86 l2 26 h7 l-1-26z" fill="#1a2422"/>' +
      '<path d="M20 86 l2 26 h8 l-3-26z" fill="#1a2422"/>' +
      '<ellipse cx="20" cy="36" rx="10" ry="12" fill="#d8ab7c"/>' +
      '<path d="M11 36 Q10 22 20 20 Q31 22 30 36 Q28 28 20 27 Q12 28 11 36Z" fill="#8d8a84"/>' +
      '<rect x="32" y="54" width="7" height="16" rx="1.5" fill="#a63d2e"/>' +
      '<path d="M36 48 c6-3 16-1 16 6 v40 H36z" fill="#5c4524"/>' +
      '<path d="M36 92 l1 20 h6 l1-20z" fill="#4a3620"/>' +
      '<path d="M48 92 l1 20 h6 l-2-20z" fill="#4a3620"/>' +
      '<ellipse cx="50" cy="44" rx="8" ry="9" fill="#e0b48a"/>' +
      '<path d="M42 44 Q41 32 50 30 Q60 32 59 44 Q57 38 50 37 Q43 38 42 44Z" fill="#1c1814"/>'
    ),
    rider: walkerSvg(
      '<ellipse cx="30" cy="114" rx="18" ry="4" fill="#0a1011" opacity=".35"/>' +
      /* e-bike hint */
      '<ellipse cx="18" cy="108" rx="10" ry="10" fill="none" stroke="#2a2420" stroke-width="3"/>' +
      '<ellipse cx="48" cy="108" rx="10" ry="10" fill="none" stroke="#2a2420" stroke-width="3"/>' +
      '<path d="M18 108 h30 l-8-18 h-10z" fill="#1e3a38"/>' +
      '<path d="M22 40 c10-4 22 0 22 8 l2 28-10 2 2 20 H24 l-2-22 6-2z" fill="#1e4441"/>' +
      '<rect x="16" y="52" width="16" height="12" rx="1" fill="#3c6a66" stroke="#e8d8b8" stroke-width=".8"/>' +
      '<ellipse cx="32" cy="30" rx="9" ry="10" fill="#d09a6c"/>' +
      '<path d="M22 28 Q22 14 32 13 Q44 14 44 28 L42 26 Q32 22 24 26Z" fill="#1e4441"/>' +
      '<rect x="23" y="16" width="18" height="4" fill="#4e8a84"/>'
    ),
    solicitor: walkerSvg(
      '<ellipse cx="28" cy="114" rx="16" ry="4" fill="#0a1011" opacity=".35"/>' +
      '<path d="M14 46 c8-3 22-1 24 8 l2 42 H14z" fill="#4a4038"/>' +
      '<path d="M14 86 l2 26 h8 l-1-26z" fill="#2a241c"/>' +
      '<path d="M28 86 l2 26 h8 l-3-26z" fill="#2a241c"/>' +
      '<ellipse cx="28" cy="32" rx="11" ry="12" fill="#e2c49a"/>' +
      '<path d="M18 32 Q16 16 28 15 Q42 16 40 32 Q38 24 28 23 Q19 24 18 32Z" fill="#2a2018"/>' +
      '<g transform="translate(40,44) rotate(8)"><rect width="16" height="22" fill="#f4ead4" stroke="#a63d2e" stroke-width="1"/><rect x="2" y="4" width="12" height="2" fill="#a63d2e"/></g>'
    ),
    nephew: walkerSvg(
      '<ellipse cx="30" cy="114" rx="18" ry="4" fill="#0a1011" opacity=".35"/>' +
      '<path d="M14 46 c8-3 22-1 24 8 l3 42 H14z" fill="#5a3a20"/>' +
      '<path d="M14 86 l2 26 h8 l-1-26z" fill="#3a2418"/>' +
      '<path d="M28 86 l2 26 h8 l-3-26z" fill="#3a2418"/>' +
      '<ellipse cx="28" cy="32" rx="11" ry="12" fill="#c99266"/>' +
      '<path d="M17 33 Q15 16 28 15 Q43 16 41 33 Q38 24 28 23 Q19 24 17 33Z" fill="#2c2018"/>' +
      '<path d="M36 58 l18-4 4 28-18 6z" fill="#3a2a1c"/>' +
      '<path d="M40 62 l14-3 3 22-14 5z" fill="#8a5a32"/>'
    ),
    "nephew-fake": walkerSvg(
      '<ellipse cx="30" cy="114" rx="18" ry="4" fill="#0a1011" opacity=".35"/>' +
      '<path d="M14 46 c8-3 22-1 24 8 l3 42 H14z" fill="#4a3624"/>' +
      '<path d="M14 86 l2 26 h8 l-1-26z" fill="#3a2418"/>' +
      '<path d="M28 86 l2 26 h8 l-3-26z" fill="#3a2418"/>' +
      '<ellipse cx="28" cy="32" rx="11" ry="12" fill="#d8b088"/>' +
      '<path d="M18 32 Q16 16 28 15 Q42 16 40 32 Q38 24 28 23 Q19 24 18 32Z" fill="#241c16"/>' +
      '<path d="M38 64 l14-2 2 20-14 4z" fill="#5a4030"/>'
    ),
    lin: walkerSvg(
      '<ellipse cx="28" cy="114" rx="16" ry="4" fill="#0a1011" opacity=".35"/>' +
      '<path d="M16 46 c8-3 20-1 22 7 l-2 41 H16z" fill="#141416"/>' +
      '<path d="M16 86 l1 26 h8 l1-26z" fill="#0e0e10"/>' +
      '<path d="M28 86 l2 26 h8 l-2-26z" fill="#0e0e10"/>' +
      '<ellipse cx="28" cy="32" rx="10" ry="12" fill="#e0b494"/>' +
      '<path d="M14 40 Q12 14 28 12 Q46 14 44 42 L42 90 Q28 80 16 90Z" fill="#1a1410"/>' +
      '<rect x="40" y="60" width="12" height="16" rx="1" fill="#5c4524"/>'
    ),
    zhou: walkerSvg(
      '<ellipse cx="28" cy="114" rx="16" ry="4" fill="#0a1011" opacity=".35"/>' +
      '<path d="M14 46 c10-4 24-2 26 8 l2 40 H14z" fill="#152228"/>' +
      '<path d="M14 86 l2 26 h8 l-1-26z" fill="#0e1618"/>' +
      '<path d="M30 86 l2 26 h8 l-2-26z" fill="#0e1618"/>' +
      '<ellipse cx="28" cy="32" rx="11" ry="12" fill="#d4a880"/>' +
      '<path d="M18 30 Q17 16 24 16 L28 26 L34 16 Q41 16 40 30 Q38 24 28 23 Q20 24 18 30Z" fill="#5a5856"/>' +
      '<rect x="40" y="56" width="14" height="16" rx="1" fill="#1a2428" stroke="#c9a14a" stroke-width=".8"/>'
    ),
    ma: walkerSvg(
      '<ellipse cx="30" cy="114" rx="18" ry="4" fill="#0a1011" opacity=".35"/>' +
      '<path d="M12 46 c10-5 28-3 30 8 l4 40-8 4 2 20 H18 l-2-22-4-2z" fill="#1e3a38"/>' +
      '<path d="M14 86 l2 26 h9 l-2-26z" fill="#152c2a"/>' +
      '<path d="M32 86 l2 26 h9 l-2-26z" fill="#152c2a"/>' +
      '<ellipse cx="30" cy="30" rx="11" ry="12" fill="#d09464"/>' +
      '<path d="M19 30 Q18 16 30 14 Q44 16 43 30 Q40 22 30 21 Q21 22 19 30Z" fill="#1a1612"/>' +
      '<path d="M16 50 h28 v6 H16z" fill="#e8d8b8"/>' +
      '<rect x="42" y="58" width="14" height="18" rx="1" fill="#3c6a66"/>'
    ),
    caser: walkerSvg(
      '<ellipse cx="28" cy="114" rx="16" ry="4" fill="#0a1011" opacity=".35"/>' +
      '<path d="M12 46 c8-6 26-6 32 2 l2 38 c-6 4-10 4-16 0 l-2 28 H20 l-2-28 c-6 2-10 2-14-2z" fill="#14161a"/>' +
      '<ellipse cx="28" cy="32" rx="10" ry="11" fill="#c49670"/>' +
      '<path d="M16 30 Q16 16 28 14 Q42 16 42 30 L40 34 H18Z" fill="#1a1c20"/>' +
      '<path d="M14 32 h30 l-2 4 H16z" fill="#2a2c30"/>'
    ),
    climber: walkerSvg(
      '<ellipse cx="36" cy="114" rx="14" ry="4" fill="#0a1011" opacity=".3"/>' +
      '<path d="M20 40 c8-8 24-4 26 8 l-6 16 14 8-8 20-18-4 2-18z" fill="#14161a"/>' +
      '<ellipse cx="44" cy="28" rx="9" ry="10" fill="#c49670"/>' +
      '<path d="M34 26 Q34 14 44 12 Q56 14 56 26 L54 30 H36Z" fill="#1a1c20"/>'
    )
  };

  HDX.portraitPair = function (mainKey, sideKey) {
    return (
      '<div class="portrait-pair">' +
        '<div class="portrait-main">' + (HDX.PORTRAITS[mainKey] || "") + "</div>" +
        '<div class="portrait-side">' + (HDX.PORTRAITS[sideKey] || "") + "</div>" +
      "</div>"
    );
  };
})(window);
