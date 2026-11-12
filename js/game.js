/* 胡大侠 · 门岗短局引擎 */
(function () {
  const $ = function (sel, root) { return (root || document).querySelector(sel); };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function zhCount(n) {
    const d = "零一二三四五六七八九";
    n = +n || 0;
    if (n <= 0) return "零";
    if (n < 10) return d[n];
    if (n === 10) return "十";
    if (n < 20) return "十" + d[n - 10];
    if (n < 100) {
      const t = Math.floor(n / 10);
      const o = n % 10;
      return (t === 1 ? "" : d[t]) + "十" + (o ? d[o] : "");
    }
    return String(n);
  }

  function shiftsDone() {
    try { return +localStorage.getItem("hdx-shifts") || 0; } catch (e) { return 0; }
  }

  function saveShifts(n) {
    try { localStorage.setItem("hdx-shifts", String(n)); } catch (e) { /* ignore */ }
  }

  function prefersReduced() {
    try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; }
  }

  function wait(ms) {
    if (prefersReduced()) return Promise.resolve();
    return new Promise(function (r) { setTimeout(r, ms); });
  }

  function waitTransition(el, timeout) {
    return new Promise(function (resolve) {
      if (!el || prefersReduced()) return resolve();
      var done = false;
      var finish = function () {
        if (done) return;
        done = true;
        el.removeEventListener("transitionend", finish);
        resolve();
      };
      el.addEventListener("transitionend", finish);
      setTimeout(finish, timeout || 1000);
    });
  }

  function blankState() {
    return {
      phase: "title",
      stamina: 8,
      skill: 3,
      neigong: 1,
      fame: 0,
      wallet: 16,
      demerits: 0,
      guanxi: { chen: 1, lin: 0, zhou: 0, wang: 0, zhao: 0, ma: 0 },
      items: [],
      flags: {
        flaggedSuspect: false,
        letSuspectIn: false,
        turnedAwaySuspect: false,
        zhouPleased: false,
        reported: 0,
        blamed: false,
        caught: null
      },
      notes: [],
      visitors: [],
      index: 0,
      pending: null,
      beatText: null,
      lean: false,
      inlineRoster: false,
      pay: 0,
      payLines: [],
      payEval: "",
      jobThreatened: false,
      firedNow: false,
      fired: false,
      afterChoice: null,
      encounter: null
    };
  }

  var state = blankState();
  var busy = false;

  var LABEL = {
    stamina: "体力",
    skill: "身手",
    neigong: "内功",
    fame: "口碑",
    wallet: "钱包",
    demerits: "记过"
  };
  var GUANXI = {
    chen: "陈伯人情",
    lin: "林晚秋人情",
    zhou: "周主任人情",
    wang: "王太太人情",
    zhao: "赵工人情",
    ma: "马教练人情"
  };

  function applyDeltas(d) {
    var shown = [];
    if (!d) return shown;
    Object.keys(LABEL).forEach(function (k) {
      if (!d[k]) return;
      state[k] += d[k];
      if (k === "stamina") state.stamina = Math.max(0, Math.min(10, state.stamina));
      if (k === "skill") state.skill = Math.max(0, state.skill);
      if (k === "wallet") state.wallet = Math.max(0, state.wallet);
      if (k === "demerits") state.demerits = Math.max(0, state.demerits);
      shown.push({ label: LABEL[k] + (k === "wallet" ? "（元）" : ""), n: d[k] });
    });
    if (d.guanxi) {
      Object.keys(d.guanxi).forEach(function (k) {
        if (!d.guanxi[k]) return;
        state.guanxi[k] = (state.guanxi[k] || 0) + d.guanxi[k];
        shown.push({ label: GUANXI[k], n: d.guanxi[k] });
      });
    }
    return shown;
  }

  function applyFlags(f) {
    if (!f) return;
    if (f.reported) state.flags.reported += f.reported;
    if (f.flaggedSuspect) state.flags.flaggedSuspect = true;
    if (f.letSuspectIn) state.flags.letSuspectIn = true;
    if (f.turnedAwaySuspect) state.flags.turnedAwaySuspect = true;
    if (f.zhouPleased === true) state.flags.zhouPleased = true;
    if (f.zhouPleased === false) state.flags.zhouPleased = false;
  }

  function show(el) {
    if (!el) return;
    el.hidden = false;
    el.classList.remove("hidden");
  }

  function hide(el) {
    if (!el) return;
    el.hidden = true;
    el.classList.add("hidden");
  }

  function setBarrier(open) {
    var b = $("#barrier");
    if (!b) return;
    if (open) b.classList.add("open");
    else b.classList.remove("open");
  }

  function setStageMode(mode) {
    var stage = $("#stage");
    var win = $("#window-view");
    if (!stage) return;
    stage.classList.toggle("is-window", mode === "window");
    stage.classList.toggle("is-approach", mode !== "window");
    if (mode === "window") show(win);
    else hide(win);
  }

  function clearWalker() {
    var slot = $("#visitor-slot");
    if (!slot) return;
    slot.innerHTML = "";
    slot.setAttribute("class", "");
  }

  function mountWalker(key, gait) {
    var slot = $("#visitor-slot");
    slot.innerHTML = (HDX.WALKERS && HDX.WALKERS[key]) || "";
    slot.setAttribute("class", gait === "ride" ? "is-ride" : "");
  }

  function mountPortrait(visitor, lean) {
    var mount = $("#portrait-mount");
    if (!mount) return;
    if (visitor && visitor.portrait === "chen-boy") {
      mount.innerHTML = HDX.portraitPair("chen", "boy");
    } else if (visitor) {
      mount.innerHTML = (HDX.PORTRAITS && HDX.PORTRAITS[visitor.portrait]) || "";
    } else {
      mount.innerHTML = "";
    }
    mount.classList.toggle("lean", !!lean);
    var cap = $("#window-caption");
    if (cap) cap.textContent = visitor ? (visitor.caption || "") : "";
  }

  function renderStats() {
    var items = [
      ["体力", state.stamina, state.stamina <= 3 ? "warn" : ""],
      ["身手", state.skill, ""],
      ["口碑", state.fame, state.fame < 0 ? "warn" : state.fame > 0 ? "good" : ""],
      ["钱包", state.wallet + "元", state.wallet <= 0 ? "warn" : ""],
      ["记过", state.demerits, state.demerits > 0 ? "warn" : ""]
    ];
    $("#stats").innerHTML = items.map(function (row) {
      return '<li class="' + row[2] + '"><span>' + row[0] + "</span><b>" + row[1] + "</b></li>";
    }).join("");
  }

  function prose(paras, beat) {
    return '<div class="prose' + (beat ? " beat" : "") + '">' + paras.map(function (p) {
      return "<p>" + esc(p) + "</p>";
    }).join("") + "</div>";
  }

  function deltasHtml(list) {
    if (!list || !list.length) return "";
    return '<div class="deltas">' + list.map(function (d) {
      var cls = d.n > 0 ? "up" : "down";
      var sign = d.n > 0 ? "+" : "";
      return '<span class="delta ' + cls + '">' + esc(d.label) + " " + sign + d.n + "</span>";
    }).join("") + "</div>";
  }

  function actionButtons(acts) {
    return '<div class="actions">' + acts.map(function (a) {
      var cls = ["btn"];
      if (a.kind === "danger") cls.push("btn-danger");
      if (a.kind === "soft") cls.push("btn-soft");
      if (a.kind === "primary") cls.push("btn-primary");
      if (a.kind === "ghost") cls.push("btn-ghost");
      if (a.wide || a.kind === "primary") cls.push("wide");
      return '<button type="button" class="' + cls.join(" ") + '" data-act="' + esc(a.id) + '">' + esc(a.label) + "</button>";
    }).join("") + "</div>";
  }

  function toolsHtml(v) {
    var tools = [
      { id: "look", label: "打量", used: v.looked },
      { id: "card", label: "看卡", used: v.checkedCard }
    ];
    if (v.claimedUnit) tools.push({ id: "roster-inline", label: "对照名册", used: v.checkedRoster });
    if (v.canCall) tools.push({ id: "call", label: "打电话", used: v.called });
    if (v.canProp) tools.push({ id: "prop", label: "随身物", used: v.checkedProp });
    return '<div class="tools">' + tools.map(function (t) {
      return '<button type="button" class="tool' + (t.used ? " used" : "") + '" data-act="' + t.id + '">' + esc(t.label) + "</button>";
    }).join("") + "</div>";
  }

  function factsHtml(v) {
    if (!v.facts || !v.facts.length) return "";
    return '<div class="facts">' + v.facts.map(function (f) {
      return '<span class="fact">' + esc(f) + "</span>";
    }).join("") + "</div>";
  }

  function inlineRosterHtml(v) {
    if (!state.inlineRoster || !v.checkedRoster) return "";
    var r = HDX.findResident(v.claimedUnit);
    if (!r) {
      return '<div class="inline-roster">名册上没有与「' + esc(v.claimedUnit) + '」完全对应的一户。</div>';
    }
    var aka = (r.aka && r.aka !== r.name) ? "（" + esc(r.aka) + "）" : "";
    return '<div class="inline-roster"><div class="unit">' + esc(r.unit) + " · " + esc(r.name) + aka + "</div>" + esc(r.note) + "</div>";
  }

  function sheet(inner, extraClass) {
    return '<div class="sheet' + (extraClass ? " " + extraClass : "") + '">' + inner + "</div>";
  }

  function bindPanel() {
    $("#panel").querySelectorAll("[data-act]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (busy) return;
        onAction(btn.getAttribute("data-act"));
      });
    });
  }

  function setPanel(html) {
    $("#panel").innerHTML = html;
    bindPanel();
  }

  function currentVisitor() {
    return state.visitors[state.index] || null;
  }

  function displayName(v) {
    return v.identified ? v.name : (v.impression || "来人");
  }

  function inspectCtx(v) {
    return {
      asked: v.asked,
      looked: v.looked,
      checkedCard: v.checkedCard,
      checkedRoster: v.checkedRoster,
      called: v.called,
      checkedProp: v.checkedProp,
      identified: v.identified,
      state: state
    };
  }

  function maybeIdentifyFromAsk(v) {
    if (v.recognizeOnLook || v.id === "lin") v.identified = true;
  }

  function render() {
    busy = false;
    var hudPhases = { arriving: 1, gate: 1, result: 1, payday: 1, aftershift: 1, afterresult: 1, encounter: 1, encresult: 1 };
    var scenePhases = hudPhases;
    var rosterPhases = { arriving: 1, gate: 1, result: 1 };

    if (hudPhases[state.phase]) {
      show($("#hud"));
      renderStats();
    } else {
      hide($("#hud"));
    }

    if (scenePhases[state.phase]) show($("#scene-wrap"));
    else hide($("#scene-wrap"));

    $("#btn-roster").disabled = !rosterPhases[state.phase];
    if (!rosterPhases[state.phase]) closeRoster();

    switch (state.phase) {
      case "title": return renderTitle();
      case "briefing": return renderBriefing();
      case "arriving": return renderArriving();
      case "gate": return renderGate();
      case "result": return renderResult();
      case "payday": return renderPayday();
      case "aftershift": return renderAftershift();
      case "afterresult": return renderAfterResult();
      case "encounter": return renderEncounter();
      case "encresult": return renderEncResult();
      case "ending": return renderEnding();
      default: return renderTitle();
    }
  }

  function renderTitle() {
    clearWalker();
    mountPortrait(null);
    setStageMode("approach");
    setBarrier(false);
    var done = shiftsDone();
    var again = done > 0
      ? "<p>你已在听雨苑值过" + zhCount(done) + "班。道闸还在，信也还在。</p>"
      : "";
    setPanel(
      '<div class="title-view">' +
        '<div class="title-art">' +
          '<div class="title-moon" aria-hidden="true"></div>' +
          '<h1 class="game-title">胡大侠</h1>' +
          '<p class="title-sub">' + esc(HDX.COPY.titleSub) + "</p>" +
          '<div class="title-seal" aria-hidden="true">夜</div>' +
        "</div>" +
        sheet(
          '<p class="lead">' + esc(HDX.COPY.titleLead) + "</p>" +
          again +
          actionButtons([{ id: "start", label: HDX.COPY.start, kind: "primary", wide: true }])
        ) +
      "</div>"
    );
  }

  function renderBriefing() {
    setPanel(sheet(
      '<p class="sheet-kicker">' + esc(HDX.COPY.briefingKicker) + "</p>" +
      "<h2>" + esc(HDX.COPY.briefingTitle) + "</h2>" +
      prose(HDX.COPY.briefing) +
      actionButtons([{ id: "begin", label: HDX.COPY.begin, kind: "primary", wide: true }])
    ));
  }

  function renderArriving() {
    var v = currentVisitor();
    setStageMode("approach");
    $("#hud-time").textContent = v ? HDX.zhTime(v.time) : "";
    $("#scene-caption").textContent = v && v.gait === "ride" ? "车灯从路那边过来" : "有人从路那边过来";
    setPanel(sheet(
      '<p class="sheet-kicker">门岗</p>' +
      '<p class="arriving-note">' + (v && v.gait === "ride" ? "电机声近了。" : "脚步近了。") + "</p>"
    , "soft-in"));
  }

  function renderGate() {
    var v = currentVisitor();
    setStageMode("window");
    mountPortrait(v, state.lean);
    $("#hud-time").textContent = HDX.zhTime(v.time);
    $("#scene-caption").textContent = "";
    var cap = $("#window-caption");
    if (cap) cap.textContent = v.caption || "";
    var acts = v.getActions(inspectCtx(v));
    var body = state.beatText || [v.intro];
    var metaBits = [];
    if (v.claimedUnit && (v.asked || v.checkedRoster || v.called || /栋/.test(v.intro))) {
      metaBits.push("自称 " + v.claimedUnit);
    }
    if (v.checkedCard) metaBits.push(v.hasFob ? "门禁已核" : "未见门禁卡");
    else metaBits.push(v.hasFob ? "似乎刷过卡" : "未见刷卡");
    setPanel(sheet(
      '<p class="sheet-kicker">来人 · ' + esc(HDX.zhTime(v.time)) + "</p>" +
      '<p class="visitor-name">' + esc(displayName(v)) + "</p>" +
      '<p class="visitor-meta">' + esc(metaBits.join(" · ")) + "</p>" +
      '<div class="sheet-scroll">' +
      prose(body, true) +
      factsHtml(v) +
      inlineRosterHtml(v) +
      "</div>" +
      toolsHtml(v) +
      actionButtons(acts)
    , "gate-sheet soft-in"));
  }

  function renderResult() {
    var p = state.pending;
    var v = currentVisitor();
    if (v) {
      setStageMode("window");
      mountPortrait(v, false);
      $("#hud-time").textContent = HDX.zhTime(v.time);
    }
    setPanel(sheet(
      '<p class="sheet-kicker">这一趟</p>' +
      prose(p.text, true) +
      deltasHtml(p.deltas) +
      actionButtons([{ id: "next", label: p.openGate ? "看着他们进去" : "看着他们离开", kind: "primary", wide: true }])
    , "soft-in"));
  }

  function renderPayday() {
    clearWalker();
    mountPortrait(null);
    setStageMode("approach");
    setBarrier(false);
    $("#hud-time").textContent = "两点刚过";
    $("#scene-caption").textContent = "岗亭的灯管又在闪";
    var lines = state.payLines.map(function (l) {
      var n = (l.n > 0 ? "+" : "") + l.n + "元";
      return '<div class="pay-line"><span>' + esc(l.name) + "</span><strong>" + n + "</strong></div>";
    }).join("");
    setPanel(sheet(
      '<p class="sheet-kicker">夜班结算</p>' +
      "<h2>工钱</h2>" +
      lines +
      '<div class="pay-total"><span>实发</span><span>' + state.pay + "元</span></div>" +
      prose([state.payEval, "钱包里现在是" + state.wallet + "元。小区门口那辆二手车还标着四百五，离你还远。"]) +
      actionButtons([{ id: "to-after", label: "下班以后", kind: "primary", wide: true }])
    ));
  }

  function renderAftershift() {
    clearWalker();
    mountPortrait(null);
    setStageMode("approach");
    $("#hud-time").textContent = "两点一刻";
    $("#scene-caption").textContent = "宿舍就在岗亭后头";
    setPanel(sheet(
      '<p class="sheet-kicker">下班以后 · 二选一</p>' +
      "<h2>这一夜还没完全过去</h2>" +
      prose(["宿舍灯是黄的，窗外是听雨苑的墙。你可以在空地上把这具身子再逼一逼，也可以到楼下转转——说不定有人还没睡，便利店的灯也还亮着。"]) +
      '<p class="choice-desc">锻炼：耗体力，求身手醒一点。</p>' +
      '<p class="choice-desc">下楼：碰一碰人情，或看看钱包够不够买点管用的。</p>' +
      actionButtons([
        { id: "train", label: "锻炼身体" },
        { id: "errand", label: "去楼下转转" }
      ])
    ));
  }

  function renderAfterResult() {
    var p = state.pending;
    setPanel(sheet(
      '<p class="sheet-kicker">这一夜的余暇</p>' +
      prose(p.text) +
      deltasHtml(p.deltas) +
      actionButtons([{ id: "to-enc", label: "忽然有些声响", kind: "primary", wide: true }])
    ));
  }

  function renderEncounter() {
    var visitor = {
      portrait: "caser",
      walker: state.flags.letSuspectIn ? "caser" : "climber",
      caption: state.flags.letSuspectIn ? "墙头先翻过来一只包" : "后墙有砖灰落下",
      gait: "walk"
    };
    setStageMode("window");
    mountPortrait(visitor, true);
    $("#hud-time").textContent = "两点八分";
    $("#window-caption").textContent = visitor.caption;
    $("#scene-caption").textContent = "";
    var open = state.flags.letSuspectIn
      ? "两点刚过，你已经摘了帽子。后墙那边忽然有铁皮响了一声。你走到院里，看见一只沉甸甸的包先越过墙头。"
      : "两点刚过，宿舍的窗还开着。后墙外有一阵轻而急的脚步，随即是砖灰落下的声音。有人在翻听雨苑的墙。";
    setPanel(sheet(
      '<p class="sheet-kicker">院墙那边</p>' +
      prose([open, "这一回没有道闸可抬。只看你的身子还能否跟得上那点旧时的本事，以及你手里有没有半点趁手的东西。"]) +
      actionButtons([{ id: "go-enc", label: "出去看", kind: "primary", wide: true }])
    ));
  }

  function renderEncResult() {
    var p = state.pending;
    setPanel(sheet(
      '<p class="sheet-kicker">墙根</p>' +
      prose(p.text) +
      deltasHtml(p.deltas) +
      actionButtons([{ id: "to-end", label: "这一班完了", kind: "primary", wide: true }])
    ));
  }

  function renderEnding() {
    hide($("#hud"));
    clearWalker();
    mountPortrait(null);
    setStageMode("approach");
    setBarrier(false);
    $("#scene-caption").textContent = "";
    var title = state.fired ? "工牌搁在茶几上" : "这一班结束了";
    var paras = state.endingText.slice();
    setPanel(sheet(
      '<p class="sheet-kicker">听雨苑 · 夜色将尽</p>' +
      '<p class="ending-title">' + esc(title) + "</p>" +
      prose(paras) +
      '<p class="hint-line">' + esc(HDX.COPY.longHint) + "</p>" +
      actionButtons([{ id: "again", label: HDX.COPY.again, kind: "primary", wide: true }])
    ));
  }

  function openRoster() {
    if ($("#btn-roster").disabled) return;
    var v = currentVisitor();
    var notes = state.notes.map(function (n) { return "<p>" + esc(n) + "</p>"; }).join("");
    $("#roster-notes").innerHTML = "<h3>今夜留言</h3>" + (notes || "<p>今夜没有特别留言。</p>");
    $("#roster-body").innerHTML = HDX.RESIDENTS.map(function (r) {
      var hit = false;
      if (v && v.claimedUnit) {
        hit = r.unit === v.claimedUnit || (v.claimedUnit.length <= 3 && r.unit.indexOf(v.claimedUnit) === 0);
      }
      return '<div class="roster-item' + (hit ? " hit" : "") + '">' +
        '<div class="unit">' + esc(r.unit) + " · " + esc(r.name) + "</div>" +
        '<div class="who">' + esc(r.aka) + "</div>" +
        '<p class="note">' + esc(r.note) + "</p>" +
        "</div>";
    }).join("");
    show($("#roster"));
  }

  function closeRoster() {
    hide($("#roster"));
  }

  function onAction(id) {
    if (busy) return;
    switch (state.phase) {
      case "title":
        if (id === "start") {
          var built = HDX.buildShift(Math.random);
          state = blankState();
          state.phase = "briefing";
          state.notes = built.notes;
          state.visitors = built.visitors;
          render();
        }
        break;
      case "briefing":
        if (id === "begin") startArrival();
        break;
      case "arriving":
        break;
      case "gate":
        handleGate(id);
        break;
      case "result":
        if (id === "next") continueAfterResult();
        break;
      case "payday":
        if (id === "to-after") {
          state.phase = "aftershift";
          render();
        }
        break;
      case "aftershift":
        handleAfter(id);
        break;
      case "afterresult":
        if (id === "to-enc") {
          state.phase = "encounter";
          render();
        }
        break;
      case "encounter":
        if (id === "go-enc") {
          runEncounter();
          render();
        }
        break;
      case "encresult":
        if (id === "to-end") {
          finishEnding();
          render();
        }
        break;
      case "ending":
        if (id === "again") {
          saveShifts(shiftsDone() + 1);
          state = blankState();
          state.phase = "title";
          render();
        }
        break;
    }
  }

  function startArrival() {
    if (state.index >= state.visitors.length) {
      computePay();
      state.phase = "payday";
      clearWalker();
      mountPortrait(null);
      setStageMode("approach");
      render();
      return;
    }
    var v = currentVisitor();
    state.beatText = null;
    state.lean = false;
    state.inlineRoster = false;
    state.phase = "arriving";
    setBarrier(false);
    mountWalker(v.walker, v.gait);
    var slot = $("#visitor-slot");
    slot.classList.remove("is-through", "is-leave", "is-at-gate");
    if (v.gait === "ride") slot.classList.add("is-ride");
    slot.classList.add("is-enter");
    render();
    busy = true;
    void slot.getBoundingClientRect();
    wait(60).then(function () {
      slot.classList.remove("is-enter");
      slot.classList.add("is-at-gate");
      return waitTransition(slot, v.gait === "ride" ? 900 : 1100);
    }).then(function () {
      mountPortrait(v, false);
      setStageMode("window");
      return wait(420);
    }).then(function () {
      state.phase = "gate";
      render();
    });
  }

  function addFact(v, fact) {
    if (!fact) return;
    if (v.facts.indexOf(fact) === -1) v.facts.push(fact);
  }

  function handleTool(id) {
    var v = currentVisitor();
    var text = null;
    var fact = null;
    if (id === "look") {
      text = v.onLook;
      fact = v.lookFact;
      v.looked = true;
      if (v.recognizeOnLook) v.identified = true;
      state.lean = true;
    } else if (id === "card") {
      text = v.onCard;
      fact = v.cardFact;
      v.checkedCard = true;
      if (v.id === "chen" || v.id === "zhou" || v.id === "ma") v.identified = true;
      state.lean = true;
    } else if (id === "roster-inline") {
      text = v.onRoster;
      fact = v.rosterFact || null;
      v.checkedRoster = true;
      state.inlineRoster = true;
      if (v.id === "chen" || v.id === "zhou" || v.id === "ma" || v.id === "lin") v.identified = true;
      state.lean = false;
    } else if (id === "call") {
      text = v.onCall;
      fact = v.callFact;
      v.called = true;
      if (v.id === "lin") v.identified = true;
      state.lean = false;
    } else if (id === "prop") {
      text = v.onProp;
      fact = v.propFact;
      v.checkedProp = true;
      state.lean = true;
    } else {
      return false;
    }
    addFact(v, fact);
    state.beatText = [text];
    renderGate();
    busy = false;
    return true;
  }

  function handleGate(id) {
    var v = currentVisitor();
    if (!v) return;
    if (id === "look" || id === "card" || id === "roster-inline" || id === "call" || id === "prop") {
      handleTool(id);
      return;
    }
    if (id === "ask") {
      v.asked = true;
      maybeIdentifyFromAsk(v);
      if (v.identified) addFact(v, v.lookFact || ("他自称是" + v.name));
      state.beatText = [v.onAsk];
      state.lean = true;
      renderGate();
      return;
    }
    var allowed = (v.getActions(inspectCtx(v)) || []).some(function (a) { return a.id === id; });
    if (!allowed) return;
    var res = v.resolve(id, state);
    if (!res) return;
    var shown = applyDeltas(res.deltas);
    applyFlags(res.flags);
    state.pending = {
      text: res.text,
      deltas: shown,
      openGate: id === "pass" || id === "reg" || id === "wink"
    };
    state.phase = "result";
    render();
  }

  function continueAfterResult() {
    var pending = state.pending;
    var kind = pending && pending.openGate ? "through" : "leave";
    busy = true;
    playDeparture(kind).then(function () {
      state.pending = null;
      state.beatText = null;
      state.lean = false;
      state.inlineRoster = false;
      state.index += 1;
      startArrival();
    });
  }

  function playDeparture(kind) {
    var v = currentVisitor();
    setStageMode("approach");
    mountWalker(v.walker, v.gait);
    var slot = $("#visitor-slot");
    slot.classList.remove("is-enter", "is-through", "is-leave");
    if (v.gait === "ride") slot.classList.add("is-ride");
    slot.classList.add("is-at-gate");
    $("#scene-caption").textContent = kind === "through" ? "道闸抬起" : "人转身走了";
    void slot.getBoundingClientRect();
    return wait(40).then(function () {
      if (kind === "through") {
        setBarrier(true);
        return wait(480);
      }
      setBarrier(false);
      return wait(80);
    }).then(function () {
      slot.classList.remove("is-at-gate");
      slot.classList.add(kind === "through" ? "is-through" : "is-leave");
      return waitTransition(slot, 1000);
    }).then(function () {
      clearWalker();
      setBarrier(false);
      $("#scene-caption").textContent = "";
    });
  }

  function computePay() {
    var base = 128;
    var bonus = 0;
    var lines = [{ name: "夜班底薪", n: base }];
    if (state.demerits === 0) {
      bonus += 22;
      lines.push({ name: "无记过奖励", n: 22 });
    }
    if (state.flags.zhouPleased) {
      bonus += 15;
      lines.push({ name: "业委会口头表扬", n: 15 });
    }
    if (state.flags.flaggedSuspect && !state.flags.letSuspectIn) {
      bonus += 10;
      lines.push({ name: "情况记录完整", n: 10 });
    }
    var penalty = state.demerits * 25;
    if (penalty) lines.push({ name: "记过扣罚", n: -penalty });
    var pay = Math.max(0, base + bonus - penalty);
    state.pay = pay;
    state.wallet += pay;
    state.payLines = lines;
    if (state.demerits >= 4) {
      state.payEval = "群里的通知来得比工资还快：明天不用来了。工牌先摘下，宿舍还让你住到天亮。";
      state.jobThreatened = true;
      state.firedNow = true;
    } else if (state.demerits >= 3) {
      state.payEval = "书面记过已经三张。电话里只说了一句：再有一次，就不用值了。";
      state.jobThreatened = true;
    } else if (state.demerits === 2) {
      state.payEval = "两记过。物业让你写一份情况说明，字要工整，理由要像那么回事。";
    } else if (state.demerits === 1) {
      state.payEval = "口头提醒一次。日志上那一笔红字洗不掉，也还没盖过你的工。";
    } else {
      state.payEval = "今夜无事，日志写得干净。工资依旧薄，薄得像一张符，镇不住什么，可至少还在。";
    }
  }

  function handleAfter(id) {
    if (id === "train") {
      var before = state.skill;
      var d;
      var text;
      if (state.stamina >= 3) {
        d = { stamina: -3, skill: 2 };
        text = [
          "你在岗亭后那块空地上扎马。这具身子很快发抖，呼吸却在深处沉下去，像一口旧井忽然被搅醒。",
          "拳头打在空气里，没有回音。可你知道，今夜若真要动手，步子会比往常快一点。"
        ];
      } else {
        d = { stamina: -Math.max(1, state.stamina - 1), skill: 1 };
        text = [
          "你还是下了场。体力已经薄了，拳脚发飘，只能把架子走完。",
          "这具身子争气有限，可到底没有把夜浪费在枕头上。"
        ];
      }
      var shown = applyDeltas(d);
      if (before < 5 && state.skill >= 5) {
        applyDeltas({ neigong: 1 });
        shown.push({ label: "内功", n: 1 });
        text.push("那点内功在胸腔里转了一圈，又落下。还不是剑，只是一声提醒。");
      }
      state.pending = { text: text, deltas: shown };
      state.afterChoice = "train";
      state.phase = "afterresult";
      render();
      return;
    }
    if (id === "errand") {
      var text2;
      var shown2 = [];
      if (state.guanxi.chen >= 2) {
        state.items.push("bike");
        text2 = [
          "你去3栋楼下。陈伯还没睡，正在给花浇水。听你说岗上人手紧，他叹了口气，从车棚里推出一辆掉漆的二十六寸。",
          "「买菜用的，铃不响，你先骑着。别跟人说是我徇私。」车不是你的，可今夜它肯借你一截路。"
        ];
        shown2 = [{ label: "借得旧自行车", n: 1 }];
      } else if (state.wallet >= 28) {
        state.items.push("flashlight");
        shown2 = applyDeltas({ wallet: -28 });
        shown2.push({ label: "手电筒", n: 1 });
        text2 = [
          "便利店的灯还亮着。货架上没有能追人的东西，一把手电倒是结实，要二十八元。",
          "你数了数刚发的那点工钱，买下它。自行车的价签仍在门玻璃上，四百五，像隔着一条河。"
        ];
      } else {
        text2 = [
          "你在小区后巷走了一圈。排水管滴着水，没有遇见能帮上忙的人。",
          "口袋也薄，便利店的门开着，你只看了一眼手电和那张自行车的招纸，又把步子收回来。"
        ];
      }
      state.pending = { text: text2, deltas: shown2 };
      state.afterChoice = "errand";
      state.phase = "afterresult";
      render();
      return;
    }
  }

  function runEncounter() {
    var score = state.skill * 2;
    if (state.items.indexOf("bike") >= 0) score += 3;
    if (state.items.indexOf("flashlight") >= 0) score += 2;
    if (state.flags.flaggedSuspect) score += 3;
    if (state.flags.letSuspectIn) score -= 3;

    var outcome;
    if (score >= 11) outcome = "caught";
    else if (score >= 7) outcome = "seen";
    else outcome = "escaped";
    state.flags.caught = outcome;

    var bits = [];
    if (state.items.indexOf("bike") >= 0) bits.push("陈伯那辆铃不响的旧车在侧门等你。");
    if (state.items.indexOf("flashlight") >= 0) bits.push("你把手电按亮，光柱贴着墙根走。");
    if (state.afterChoice === "train") bits.push("刚才场子上那口气还在，步子比这具身子惯常的更快。");
    if (state.flags.flaggedSuspect) bits.push("夜里那张压低帽檐的脸，你已经记下了。颊边那颗痣也是。");
    if (state.flags.letSuspectIn) bits.push("此人先前已经进过闸，此刻是往外翻。");

    var text = [];
    var d = {};
    if (outcome === "caught") {
      d = { fame: 2, wallet: 30 };
      if (state.items.indexOf("bike") >= 0) {
        text = ["你蹬上那辆旧车，从侧门抄出去。墙外那人还没站稳，被你截在路灯底下。帽檐下的脸，正是夜里要进4栋501的那个人，左颊近耳处那颗浅痣还在。"];
      } else if (state.items.indexOf("flashlight") >= 0) {
        text = ["手电打在墙上，他的侧脸无所遁形。颊边那颗痣你眼熟。你这一回把人逼在墙角，直到物业的人赶来。"];
      } else {
        text = ["你追上了。这具身子喘得很凶，可到底把人按在了墙根。帽檐底下，正是夜里在闸前出现过的那张脸。"];
      }
      text.push("人按住了。第二天业委会补了一笔三十元的「发现情况奖励」。还是薄，可这一班没有白值。");
    } else if (outcome === "seen") {
      d = { fame: 1 };
      text = [
        bits.length ? bits.join("") : "你冲到墙根。",
        "他扔下手里的东西，翻过另一边去了。可在最后那一瞥里，你看清了下颌的轮廓，还有颊边一颗浅痣。人没抓住，脸留下了。"
      ];
    } else {
      d = { demerits: state.flags.letSuspectIn ? 2 : 1, fame: -2 };
      state.flags.blamed = true;
      text = [
        "你到的时候，只剩下墙头一片新蹭破的白灰。",
        state.flags.letSuspectIn
          ? "第二日有人说4栋空屋里少了旧物，也有人说楼道里的电瓶车不见了。业委会问你今夜放进谁了。失窃要从门岗查起，记过又添了两笔。"
          : "第二日院里报了失窃。业委会说，墙是后墙，责在门岗。记过又添了一笔。"
      ];
    }
    if (bits.length && outcome === "caught") text = bits.concat(text);

    var shown = applyDeltas(d);
    state.pending = { text: text, deltas: shown };
    state.phase = "encresult";

    if (state.firedNow || state.demerits >= 4 || (state.demerits >= 3 && state.flags.blamed)) {
      state.fired = true;
    }
  }

  function finishEnding() {
    var o = state.flags.caught;
    if (state.fired) {
      state.endingText = [
        "业委会把你的工牌搁在茶几上，还压着一张记过单。听雨苑的灯还亮，亮给别人看。",
        "你把制服叠好，动作像从前整理束发。丢了这份工，夜里的道闸就不再归你守了。"
      ];
    } else if (o === "caught") {
      state.endingText = [
        "这一班险，却没有把你吞掉。人按住了，工还在，工资仍旧薄。",
        "你回宿舍洗手，指甲缝里是墙灰。岗亭的灯管还在闪，像什么都没发生。"
      ];
    } else if (o === "seen") {
      state.endingText = [
        "人没抓住，脸留下了。工还在你这儿。",
        "你把这一笔写进日志，字写得很慢。明天的班还要值。"
      ];
    } else {
      state.endingText = [
        "失窃写在门岗名下。工还没被立刻拿走，只是已经发轻。",
        "你坐在床沿上，听排水管滴水，一句也骂不出来。"
      ];
    }
    state.phase = "ending";
  }

  function onReady() {
    $("#btn-roster").addEventListener("click", function () { openRoster(); });
    $("#btn-roster-close").addEventListener("click", function () { closeRoster(); });
    $("#roster").addEventListener("click", function (e) {
      if (e.target.id === "roster") closeRoster();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeRoster();
    });
    render();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", onReady);
  else onReady();
})();
