/* 胡大侠 · 内容数据（住户、来人、检视、文案） */
(function (root) {
  const HDX = root.HDX = root.HDX || {};

  HDX.RESIDENTS = [
    { unit: "1栋1501", name: "周正明", aka: "周主任", note: "业委会主任。深色公文包，走路很稳。夜里偶尔巡岗。" },
    { unit: "2栋603", name: "赵衡", aka: "赵工", note: "在软件公司上班。若有访客或外卖，通常会提前给门岗留条。" },
    { unit: "3栋1202", name: "陈长河", aka: "陈伯", note: "老住户。常下楼散步，手里多半是一只红皮暖壶。孙子偶尔来住。" },
    { unit: "4栋501", name: "（空置）", aka: "原户主刘先生", note: "刘先生已搬走，房子待售。钥匙不在物业通班手里。任何人自称找刘先生，都应拦住。" },
    { unit: "4栋906", name: "马磊", aka: "马教练", note: "在附近健身房带课。深夜常归，背包里多是换洗的衣服。" },
    { unit: "5栋801", name: "林晚秋", aka: "林晚秋", note: "广告公司。经常加班，门禁卡忘在公司里过不止一次。认得岗亭边那只橘猫。" },
    { unit: "6栋402", name: "王桂芳", aka: "王太太", note: "热心，也嘴快。女儿在外地读书。外甥很少来。" },
    { unit: "7栋302", name: "吴秀兰", aka: "吴奶奶", note: "睡得早。夜间几乎不外出，也不喜被人敲门。" },
    { unit: "8栋1003", name: "孙清", aka: "孙小姐", note: "出差频繁。本月已请假：外出至月底，勿放任何人上门。" }
  ];

  HDX.COPY = {
    titleSub: "听雨苑 · 夜班门岗",
    titleLead: "从前过的是关隘，今夜守的是道闸。工资不够买有用的东西，认人却能换来路。",
    start: "上　岗",
    briefingKicker: "交接班 · 十九点五十分",
    briefingTitle: "今夜值班",
    briefing: [
      "物业在群里留了三句话：今夜业委会可能巡岗；陌生人误放必记过；楼里若失窃，先查门岗。",
      "你把旧工牌挂上。名字栏写的是「胡守正」，只有你自己知道，这具身子里坐着从前的胡大侠。",
      "底薪薄，买不起趁手的物件。可业主若记得你的好，有时候比钱管用。认人，先要从看清一张脸开始。",
      "今晚的目标很简单：别把这份工丢了。"
    ],
    begin: "打开道闸，接班",
    longHint: "枕下还有一封没送出的信。收信人的名字被旧年的雨打湿。你过不了那个津渡，却还守着这道闸。",
    again: "再值一班"
  };

  function shuffle(arr, rng) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function result(text, extra) {
    var out = Object.assign({ close: true }, extra || {});
    out.text = Array.isArray(text) ? text : [text];
    return out;
  }

  function ignoreTax(v, base, extraText, extraDeltas) {
    const text = (Array.isArray(base.text) ? base.text : [base.text]).concat(extraText);
    const d = Object.assign({}, base.deltas || {});
    const ex = extraDeltas || {};
    Object.keys(ex).forEach(function (k) {
      if (k === "guanxi") {
        d.guanxi = Object.assign({}, d.guanxi || {}, ex.guanxi);
      } else {
        d[k] = (d[k] || 0) + ex[k];
      }
    });
    return result(text, Object.assign({}, base, { text: text, deltas: d }));
  }

  function makeChenBo(rng) {
    const withGrandson = rng() < 0.42;
    return {
      id: "chen",
      name: "陈伯",
      impression: withGrandson ? "一个提着暖壶的老人，身后跟着少年" : "一个提着暖壶的老人",
      claimedUnit: "3栋1202",
      hasFob: true,
      portrait: withGrandson ? "chen-boy" : "chen",
      walker: withGrandson ? "chen-boy" : "chen",
      gait: "walk",
      caption: withGrandson ? "红皮暖壶，身后还跟着一个少年" : "红皮暖壶，步子很熟",
      personKey: "chen",
      canCall: false,
      canProp: true,
      recognizeOnLook: true,
      intro: withGrandson
        ? "道闸外，暖壶的红皮先于人进灯里。一个老人踩着不急的步子，冲岗亭点了下头。他身后还立着一个少年，行李包的带子勒在肩上，没有刷卡。"
        : "道闸外，暖壶的红皮先于人进灯里。一个老人踩着不急的步子，冲岗亭点了下头。他手里的门禁卡亮了一下，绿灯很短。",
      onAsk: withGrandson
        ? "他把暖壶往手臂上一靠，推了推身后的少年。「我孙子，从外地来住两天。这不是小胡吗，还盘上我了。」少年拘谨地点头，没带卡。"
        : "他笑出声，暖壶盖磕了一下。「小胡，我不认得你，你还不认得这张老脸？」门禁卡挂在他裤腰上。",
      onLook: withGrandson
        ? "灯底下，这张老脸被照得很清楚：眉尾有金鱼纹，下巴刮得干净。左手腕那道旧疤，像一道浅浅的河。你认得他——3栋1202的陈伯。身后少年脸还嫩，眼神拘谨，不像闯门的人。"
        : "灯底下，这张老脸被照得很清楚：眉尾有金鱼纹，下巴刮得干净。左手腕那道旧疤，像一道浅浅的河。你认得他——3栋1202的陈伯，听雨苑里提红暖壶的人。",
      onCard: withGrandson
        ? "老人那张卡是真的，姓名陈长河，住址3栋1202，感应正常。少年空着两手，没有卡。"
        : "卡面是物业发的旧卡，姓名陈长河，住址3栋1202。刚才那一盏绿灯，是真的。",
      onRoster: "3栋1202，户主陈长河，人都叫陈伯。备注：老住户，常下楼散步，手里多半是一只红皮暖壶。孙子偶尔来住。",
      onProp: withGrandson
        ? "红皮暖壶，盖子磕过，还温着，是他每天夜里那一只。少年的行李袋沉，露出一件叠好的换洗衣裳，不像空包。"
        : "红皮暖壶，盖子磕过，还温着。是他每天夜里那一只。",
      lookFact: "认出陈伯",
      cardFact: withGrandson ? "陈伯门禁有效，少年无卡" : "门禁有效 · 陈长河",
      getActions: function (ctx) {
        const acts = [];
        if (!ctx.asked) acts.push({ id: "ask", label: "拦下询问" });
        acts.push({ id: "pass", label: "放行" });
        if (withGrandson) {
          acts.push({ id: "reg", label: "登记访客" });
          acts.push({ id: "wink", label: "睁一只眼闭一只眼", kind: "soft" });
        }
        return acts;
      },
      resolve: function (id) {
        if (id === "pass" && withGrandson) {
          return result(
            "你抬起道闸。陈伯带着孙子进去，回头补了一句「辛苦」。名册上今夜没有这个少年的名字——不算错得厉害，只是不够稳。人情这东西，有时差的就是这一行字。",
            { deltas: {} }
          );
        }
        if (id === "pass") {
          return result(
            "你抬起道闸。陈伯把暖壶换到另一只手，低声说：「今晚冷，岗上添件衣。」像从前有人在关前给你留一碗汤，只不过这一回是红糖都没有的白开水。",
            { deltas: { guanxi: { chen: 1 } } }
          );
        }
        if (id === "reg") {
          return result(
            "你把少年的名字写进访客登记。陈伯看你写完才走，拍了拍岗亭的窗台：「这就对了。老规矩不能坏在我这儿。」",
            { deltas: { guanxi: { chen: 1 }, fame: 1 } }
          );
        }
        if (id === "wink") {
          return result(
            "你挥了挥手，像没看见那少年没卡。陈伯笑着进去了。名册上缺一行，今夜若有人查岗，会不太好看。",
            { deltas: { fame: -1 } }
          );
        }
        return null;
      }
    };
  }

  function makeDelivery(rng, zhaoNote, zhaoAnswers) {
    const food = rng() < 0.5 ? "一份黄焖鸡" : "两杯冰美式";
    return {
      id: "delivery",
      name: "外卖骑手",
      impression: "一个戴头盔的骑手",
      claimedUnit: "2栋603",
      hasFob: false,
      portrait: "rider",
      walker: "rider",
      gait: "ride",
      caption: zhaoNote ? "头盔、餐箱。今夜留言里有赵工的条" : "头盔、餐箱。没有业主留言",
      personKey: "zhao",
      canCall: true,
      canProp: true,
      recognizeOnLook: false,
      callOk: !!(zhaoNote || zhaoAnswers),
      intro: zhaoNote
        ? "电动车在灯柱外嗡了一声。骑手把餐箱掀开一条缝，露出" + food + "。「2栋603，赵衡。」窗台上的今夜留言里，似乎有过类似的话。"
        : "电动车在灯柱外嗡了一声。骑手把餐箱掀开一条缝，露出" + food + "。「2栋603，赵衡，他在电话里催了。」名册那一栏今晚看去是空的。",
      onAsk: "他不耐烦，却还是把订单界面亮给你：收件人赵衡，地址2栋603，电话尾号和物业登记对得上。油香混着头盔里的汗味。「哥，菜要凉了。」",
      onLook: "盔的护镜掀在额上，底下是一张年轻的、被风吹硬的脸。眉心有一道压痕，嘴角紧着，不像来闲逛的人。这张脸你没有在园子里见过。",
      onCard: "没有门禁卡。他隔着窗把手机订单亮了亮，并不想在闸外多停。",
      onRoster: zhaoNote
        ? "他要去的是2栋603。名册上户主是赵衡，赵工。今夜留言里确有他的条：今晚有外卖，到了放行即可。"
        : "他要去的是2栋603。名册上户主是赵衡，赵工。备注：若有访客或外卖，通常会提前留条。今夜这一栏，是空的。",
      onCall: (zhaoNote || zhaoAnswers)
        ? "你拨了2栋603的预留电话。赵工接得很快：「对对，我点的，放他进来就行。别让菜凉了。」"
        : "你拨了2栋603的预留电话。响了又断，没人接。也许他还在开会，也许只是手机不在身边。",
      onProp: "餐箱里是" + food + "，收据上印着赵衡、2栋603，还温着。没有夹别的东西。",
      lookFact: "生人，像跑单的",
      cardFact: "无门禁卡",
      callFact: (zhaoNote || zhaoAnswers) ? "赵工来电确认" : "赵工电话无人接",
      getActions: function (ctx) {
        const acts = [];
        if (!ctx.asked) acts.push({ id: "ask", label: "拦下询问" });
        acts.push({ id: "pass", label: "放行" });
        acts.push({ id: "reg", label: "登记访客" });
        acts.push({ id: "report", label: "上报物业", kind: "danger" });
        if (ctx.asked || ctx.called) acts.push({ id: "wink", label: "睁一只眼闭一只眼", kind: "soft" });
        return acts;
      },
      resolve: function (id) {
        const confirmed = this.callOk && this.called;
        if (id === "reg") {
          return result(
            "你记下他的姓和单号，这才抬闸。骑手嘟囔了一句，到底把餐送了进去。门岗的本子上多一行，比一句「进去吧」经得住查。",
            { deltas: { fame: 1 } }
          );
        }
        if (id === "pass" || id === "wink") {
          if (zhaoNote || confirmed) {
            return result(
              confirmed && !zhaoNote
                ? "电话里赵工已经应了，你抬起道闸。骑手一拱车，餐箱在夜里晃了一下。"
                : "你对照过今夜的留言，抬起道闸。骑手一拱车，餐箱在夜里晃了一下。赵工的晚饭没有凉在门外。",
              { deltas: { guanxi: { zhao: 1 } } }
            );
          }
          return result(
            "你抬起道闸。骑手钻进楼洞，很快只剩下电机声。没有留言，也没有登记——这一趟大概率没问题，可你说不清进去的到底是谁。",
            { deltas: { fame: -1 } }
          );
        }
        if (id === "report") {
          return result(
            "你拨了物业。等电话转完，骑手已经骂着走了。过了半小时，赵工在群里说晚饭没吃上。投诉随后落到门岗头上。",
            { deltas: { demerits: 1, fame: -1, guanxi: { zhao: -1 } }, flags: { reported: 1 } }
          );
        }
        return null;
      }
    };
  }

  function makeSolicitor() {
    return {
      id: "solicitor",
      name: "自称送福利的人",
      impression: "一个笑得很满的人",
      claimedUnit: "7栋",
      hasFob: false,
      portrait: "solicitor",
      walker: "solicitor",
      gait: "walk",
      caption: "手里一叠单子，笑得比灯还亮",
      canCall: true,
      canProp: true,
      intro: "来人没有刷卡。他先对你笑，再把一叠彩印单子递到窗边。「给业主送福利的，物业知道。7栋吴奶奶也说让我上去坐坐。」岗亭里没有这样的通知。",
      onAsk: "你问他物业是谁签的字。他顿了顿，改口说是「朋友介绍，顺便看看有没有旧家电」。单子上写着保险和贷款。",
      onLook: "笑意只堆在嘴上，眼睛不跟着弯。额头发亮，像刚补过妆。这张脸你没有见过。",
      onCard: "没有卡，也不提门牌号，只说「物业知道」。",
      onRoster: "他说7栋吴奶奶让他上去。名册上，7栋302是吴秀兰，夜里几乎不外出，也不喜被人敲门。",
      onCall: "你拨了吴奶奶儿子留的座机。响了很久，一个苍老的声音才接起来，先是一愣：「谁啊？我没有让谁上来。这么晚了……」随即把电话挂了。",
      onProp: "单子印着保险和「以旧换新」，没有物业的章。最上面一张还写着贷款咨询。",
      lookFact: "生人，笑意不达眼",
      cardFact: "无门禁卡",
      callFact: "吴奶奶：没有邀人",
      rosterFact: "吴奶奶夜间不出门",
      getActions: function (ctx) {
        const acts = [];
        if (!ctx.asked) acts.push({ id: "ask", label: "拦下询问" });
        acts.push({ id: "pass", label: "放行" });
        acts.push({ id: "reg", label: "登记访客" });
        if (ctx.asked || ctx.called || ctx.checkedRoster || ctx.checkedProp) acts.push({ id: "send", label: "请回" });
        acts.push({ id: "report", label: "上报物业", kind: "danger" });
        return acts;
      },
      resolve: function (id) {
        if (id === "send") {
          return result(
            "你把单子推回去。「夜里不接待推销。」他还想笑，看见道闸没有要抬的意思，才把话咽了。人走了，7栋的楼道清静着。",
            { deltas: { fame: 1 } }
          );
        }
        if (id === "report") {
          return result(
            "你上报了物业。对方回得很快：下回直接请回就行，不必报，这种人最怕耽误功夫。那人听见你打电话，自己先走了。",
            { deltas: {}, flags: { reported: 1 } }
          );
        }
        if (id === "pass" || id === "reg") {
          const base = {
            text: id === "reg"
              ? "你给他登了个含糊的名字，抬起道闸。后半夜吴奶奶让儿子打电话来：有人敲门卖保险，把她吓醒了。投诉记在门岗上。"
              : "你抬起道闸。他进了7栋。后半夜吴奶奶让儿子打电话来：有人敲门卖保险，把她吓醒了。投诉记在门岗上。",
            deltas: { demerits: 1, fame: -2 }
          };
          if (this.called || this.checkedRoster) {
            return ignoreTax(this, base, "名册和电话都已经把话说死了，你还是抬了闸。", { fame: -1 });
          }
          return result(base.text, base);
        }
        return null;
      }
    };
  }

  function makeNephew(real, wangNote) {
    if (real) {
      return {
        id: "nephew",
        name: "自称王太太外甥的人",
        impression: "一个提旅行包的年轻人",
        claimedUnit: "6栋402",
        hasFob: false,
        portrait: "nephew",
        walker: "nephew",
        gait: "walk",
        caption: wangNote ? "旅行包沉甸甸。今夜有王太太的条" : "旅行包沉甸甸，像带了家乡的东西",
        personKey: "wang",
        canCall: true,
        canProp: true,
        callOk: true,
        intro: wangNote
          ? "年轻男人把一只发沉的旅行包放在灯下。「6栋402，我舅妈王桂芳。她说给门岗留过话。」包缝里露出一袋花生。"
          : "年轻男人把一只发沉的旅行包放在灯下。「6栋402，我舅妈王桂芳，今晚投奔她。」包缝里露出一袋花生和半截香肠。他没有门禁卡。",
        onAsk: "你问他舅妈女儿叫什么。他挠了挠头：「表妹在合肥念书，我叫她小名，户口本上的名字要过一会儿才想得起来。」语气不滑。他又说火车晚点，舅妈让他别在外面叫车。",
        onLook: "脸有风尘，眼是开着的，并不躲。下巴有一点青茬，像刚下过车。这张脸你没有在园子里见过。",
        onCard: "没有门禁卡。他说是临时来投奔，没办过这园子的卡。",
        onRoster: wangNote
          ? "6栋402，户主王桂芳，人都叫王太太。女儿在外地读书，外甥很少来。今夜留言里倒有一条：外甥今晚可能到，登记后放行。"
          : "6栋402，户主王桂芳，人都叫王太太。女儿在外地读书。外甥很少来。今夜没有她的留言。",
        onCall: "王太太接得很快：「哎，是我外甥！火车晚点，你让他登记一下进来。」背景里有锅铲声。",
        onProp: "包很沉，缝里露出花生和半截香肠，还有一张皱了的车票。",
        lookFact: "风尘在脸上，目光不躲",
        callFact: "王太太确认是外甥",
        getActions: function (ctx) {
          const acts = [];
          if (!ctx.asked) acts.push({ id: "ask", label: "拦下询问" });
          acts.push({ id: "pass", label: "放行" });
          acts.push({ id: "reg", label: "登记访客" });
          acts.push({ id: "report", label: "上报物业", kind: "danger" });
          if (ctx.asked || wangNote || ctx.called) acts.push({ id: "wink", label: "睁一只眼闭一只眼", kind: "soft" });
          return acts;
        },
        resolve: function (id) {
          if (id === "reg") {
            return result(
              "你把姓名和身份证号抄进登记簿，才抬闸。他两手提着包，回身说谢谢。后来王太太在群里夸了你一句：外甥进门，本子上有字，她才放心。",
              { deltas: { fame: 1, guanxi: { wang: 1 } } }
            );
          }
          if (id === "pass" || id === "wink") {
            return result(
              "你抬起道闸。他进了6栋。人是对的，只是本子上空着。王太太没说什么，可这种方便经不住查。",
              { deltas: { fame: -1, guanxi: { wang: 1 } } }
            );
          }
          if (id === "report") {
            const known = this.called;
            return result(
              known
                ? "王太太刚刚还在电话里认下这个外甥，你却把物业叫了来。人最后还是进去了，投诉写在你头上。"
                : "你上报物业，让他在闸外等。电话打到王太太那里，她立刻急了：「我外甥！站外头干什么？」人最后还是进去了，投诉却写在你头上。",
              { deltas: { demerits: 1, fame: known ? -2 : -1, guanxi: { wang: -2 } }, flags: { reported: 1 } }
            );
          }
          return null;
        }
      };
    }
    return {
      id: "nephew-fake",
      name: "自称王太太外甥的人",
      impression: "一个提旅行包的年轻人",
      claimedUnit: "6栋402",
      hasFob: false,
      portrait: "nephew-fake",
      walker: "nephew-fake",
      gait: "walk",
      caption: "旅行包很轻，拉链也没怎么鼓",
      personKey: "wang",
      canCall: true,
      canProp: true,
      callOk: false,
      intro: "年轻男人把一只旅行包靠在腿边。「6栋401……不对，402，我舅妈王桂芳。」他笑了一下，眼睛却去看道闸后头。包看起来很轻。",
      onAsk: "你问他舅妈家里还有谁。他说：「舅妈儿子在上中学，今晚大概睡了。」名册上，王桂芳只有一个在外地念书的女儿。他又不愿登记，「我很快就出来。」",
      onLook: "他朝你笑，目光却在你说话时滑向道闸后头。脸刮得很净，不像坐了一天火车的人。",
      onCard: "没有门禁卡。你请他出示证件，他在口袋里摸了摸，又说落在车上了。",
      onRoster: "6栋402，户主王桂芳。女儿在外地读书。外甥很少来。今夜没有接待访客的留言。他先说401，又改口402。",
      onCall: "王太太在那头「啊？」了一声，「我哪来的外甥？谁在门口乱认亲？」",
      onProp: "包提在手里轻飘飘的。拉链没怎么鼓，晃一下几乎没有分量。",
      lookFact: "目光躲闪，不像远客",
      callFact: "王太太：没有外甥要来",
      propFact: "旅行包是空的",
      getActions: function (ctx) {
        const acts = [];
        if (!ctx.asked) acts.push({ id: "ask", label: "拦下询问" });
        acts.push({ id: "pass", label: "放行" });
        acts.push({ id: "reg", label: "登记访客" });
        if (ctx.asked || ctx.called || (ctx.looked && ctx.checkedProp) || ctx.checkedRoster) acts.push({ id: "send", label: "请回" });
        acts.push({ id: "report", label: "上报物业", kind: "danger" });
        acts.push({ id: "wink", label: "睁一只眼闭一只眼", kind: "soft" });
        return acts;
      },
      resolve: function (id) {
        if (id === "send") {
          return result(
            "你让他请回。他还想改口，见你不让，才提着那只轻包走了。过了不久，王太太下楼扔垃圾，听说有人冒认外甥，只「啧」了一声：还好没放进去。",
            { deltas: { fame: 1, guanxi: { wang: 1 } } }
          );
        }
        if (id === "report") {
          return result(
            "你上报物业，并把疑点写在本子上。那人听见「登记、对线」，提包走了。王太太后来听说，专门到岗亭说：这种人可别放进去。",
            { deltas: { fame: 1, guanxi: { wang: 1 } }, flags: { reported: 1 } }
          );
        }
        if (id === "pass" || id === "wink" || id === "reg") {
          const base = {
            text: "你让他进了6栋。后半夜王太太来岗亭问：「谁呀，我哪来的外甥？」楼道里已经没了人。误放记过，写在你的名下。",
            deltas: { demerits: 1, fame: -2 }
          };
          if (this.called) {
            return ignoreTax(this, base, "王太太的话还在耳朵里，你还是抬了闸。", { fame: -1 });
          }
          return result(base.text, base);
        }
        return null;
      }
    };
  }

  function makeLin() {
    return {
      id: "lin",
      name: "林晚秋",
      impression: "一个带着工作袋的女人",
      claimedUnit: "5栋801",
      hasFob: false,
      portrait: "lin",
      walker: "lin",
      gait: "walk",
      caption: "工作袋，没有刷门禁卡",
      personKey: "lin",
      canCall: true,
      canProp: true,
      recognizeOnLook: true,
      intro: "女客站进灯里，先在包里翻了一圈，没翻出卡。「5栋801，卡忘在公司了。」头发有一点散，像是刚从很亮的地方走回夜里。",
      onAsk: "她报了房号，又自己补了一句：「岗亭边上那只橘猫，今晚在不在？我上次还喂过。」她停了一停，才报上名字：林晚秋。",
      onLook: "妆有些花了，下眼睑青着。嘴角那颗痣你见过——几次都是加班回来，有一回还蹲下去喂过岗亭边的橘猫。5栋801，林晚秋。",
      onCard: "包翻过了，没有卡。她自己也说忘在公司。",
      onRoster: "5栋801，林晚秋。广告公司。经常加班，门禁卡忘在公司里过不止一次。认得岗亭边那只橘猫。",
      onCall: "你拨了5栋801的预留手机。她身前的包忽然震起来，同一段铃声。她有点窘，把电话按掉：「……是我。」",
      onProp: "工作袋里是文件和一只没电的充电宝，没有别人的证件。夹文件的姿势很熟。",
      lookFact: "认出林晚秋",
      cardFact: "未带门禁卡",
      callFact: "预留电话就在她包里",
      getActions: function (ctx) {
        const known = ctx.identified;
        const acts = [];
        if (!ctx.asked) acts.push({ id: "ask", label: "拦下询问" });
        acts.push({ id: "pass", label: "放行" });
        acts.push({ id: "wink", label: "睁一只眼闭一只眼", kind: "soft" });
        acts.push({ id: "reg", label: "登记访客" });
        acts.push({ id: "report", label: "上报物业", kind: "danger" });
        if ((ctx.asked || ctx.called || ctx.checkedRoster) && !known) acts.push({ id: "send", label: "请回" });
        if (known && ctx.asked) acts.push({ id: "send", label: "请回" });
        return acts;
      },
      resolve: function (id) {
        if (id === "wink" || (id === "pass" && (this.asked || this.identified))) {
          return result(
            "你认出她夹文件的姿势，抬起道闸。她松了口气，低声说「谢谢，下回想起来一定带卡」。人熟，也要把这一趟看清楚，你心里才踏实。",
            { deltas: { guanxi: { lin: 1 }, fame: 1 } }
          );
        }
        if (id === "pass") {
          return result(
            "你抬起道闸。她匆匆道谢，进了5栋的楼洞。那步子是眼熟的，可你没问清。今夜若巡岗，这算一处漏。",
            { deltas: { fame: -1, guanxi: { lin: 1 } } }
          );
        }
        if (id === "reg") {
          return result(
            this.identified
              ? "你已经看清她是住户，却还要把她往访客栏里写。她皱眉：「我是住户。」你还是记了一笔才放行。情面上薄了一层。"
              : "你要把她往访客栏里写。她皱眉：「我是住户。」你还是记了一笔才放行。人是进去了，情面上却薄了一层。",
            { deltas: { guanxi: { lin: -1 } } }
          );
        }
        if (id === "report" || id === "send") {
          const known = this.identified;
          return result(
            id === "send"
              ? (known
                ? "你已经认出这是林晚秋，仍请她回去取卡。她站在冷风里看了你一会儿，转身就走。后半夜物业群里多了一条投诉。"
                : "你请她回去取卡。她站在冷风里看了你一会儿，转身就走。后半夜物业群里多了一条投诉：门岗把忘带卡的业主拦在外头。")
              : (known
                ? "你已经看清这是林晚秋，还是把对讲机拿了起来。她的脸凉了。「我在这住了三年。」投诉很快写到门岗名下。"
                : "你上报物业，要核验身份。电话还没打完，她已经凉了脸。「我在这住了三年。」投诉很快写到门岗名下。"),
            { deltas: { demerits: 1, fame: known ? -3 : -2, guanxi: { lin: -2 } }, flags: { reported: id === "report" ? 1 : 0 } }
          );
        }
        return null;
      }
    };
  }

  function makeZhou() {
    return {
      id: "zhou",
      name: "周主任",
      impression: "一个提着公文包的中年人",
      claimedUnit: "1栋1501",
      hasFob: true,
      portrait: "zhou",
      walker: "zhou",
      gait: "walk",
      caption: "深色公文包，门禁卡亮了一下",
      personKey: "zhou",
      canCall: false,
      canProp: true,
      recognizeOnLook: true,
      intro: "深色公文包先进入灯光。来人刷了卡，绿灯响得很短。他在岗亭窗外停了半步，像是顺便看看，又像是有意来看。",
      onAsk: "你拦了一下。他把公文包换到另一只手，眉稍微抬了抬。「小胡，这是不认得我，还是规矩太大？」",
      onLook: "金丝眼镜后面，目光稳，眉不弯。这张脸你不会认错——业委会的周正明，周主任。",
      onCard: "卡是真的，姓名周正明，1栋1501。绿灯短，却干净。",
      onRoster: "1栋1501，周正明，业委会主任。深色公文包，走路很稳。夜里偶尔巡岗。",
      onProp: "深色公文包，拉链拉得很死，没有要给你看的意思。他只是把包换了一次手。",
      lookFact: "认出周主任",
      cardFact: "门禁有效 · 周正明",
      getActions: function (ctx) {
        const acts = [];
        if (!ctx.asked) acts.push({ id: "ask", label: "拦下询问" });
        acts.push({ id: "pass", label: "放行" });
        acts.push({ id: "report", label: "上报物业", kind: "danger" });
        return acts;
      },
      resolve: function (id, state) {
        if (id === "pass") {
          if (this.asked) {
            return result(
              "你只好放行。周主任进了1栋，没有再回头。认人没有错，可这一拦，拦在不该拦的地方。",
              { deltas: { fame: -1 } }
            );
          }
          const clean = state.demerits === 0 && state.fame >= 0;
          if (clean) {
            return result(
              "你抬起道闸，把日志本的边角理平。周主任看了一眼，点点头：「今晚看着还行。别松，也别跟人较劲。」",
              { deltas: { fame: 1, guanxi: { zhou: 1 } }, flags: { zhouPleased: true } }
            );
          }
          return result(
            "你抬起道闸。周主任看了看岗亭里头，没马上走。「别让我今晚再在群里听见门岗的名字。」话说得很轻，却不是安慰。",
            { deltas: {}, flags: { zhouPleased: false } }
          );
        }
        if (id === "report") {
          return result(
            this.identified
              ? "你明明已经认出这是周主任，却还把对讲机拿了起来。话没出口，他已经听得清楚。这记过，写得又快又干净。"
              : "你拿起对讲机，想上报「有人在闸外停留」。话没出口就意识到对方是谁。周主任已经听得清楚，脸沉下来。这记过，写得又快又干净。",
            { deltas: { demerits: 1, fame: this.identified ? -3 : -2, guanxi: { zhou: -2 } }, flags: { reported: 1 } }
          );
        }
        return null;
      }
    };
  }

  function makeMa() {
    return {
      id: "ma",
      name: "马教练",
      impression: "一个肩背很宽、带着汗的男人",
      claimedUnit: "4栋906",
      hasFob: true,
      portrait: "ma",
      walker: "ma",
      gait: "walk",
      caption: "运动背包，额头还带着汗",
      personKey: "ma",
      canCall: false,
      canProp: true,
      recognizeOnLook: true,
      intro: "一个肩背很宽的男人从夜色里走来，刷卡，绿灯。背包带子上挂着湿毛巾，空气里有一点皂和汗混在一起的味道。",
      onAsk: "他把湿毛巾从脖子上拿下来，并不生气，只是有些意外。「刚加完课。小胡，你也够晚的。」",
      onLook: "额头还有汗，脸色被夜里的风收住。阔肩，短发，眼神直。是4栋906的马磊，附近健身房的马教练。",
      onCard: "卡是真的，姓名马磊，住址4栋906。",
      onRoster: "4栋906，马磊，人都叫马教练。在附近健身房带课。深夜常归，背包里多是换洗的衣服。",
      onProp: "背包里露出换洗的衣服和一条湿毛巾，有皂和汗混在一起的味道。没有别的可疑物事。",
      lookFact: "认出马教练",
      cardFact: "门禁有效 · 马磊",
      getActions: function (ctx) {
        const acts = [];
        if (!ctx.asked) acts.push({ id: "ask", label: "拦下询问" });
        acts.push({ id: "pass", label: "放行" });
        acts.push({ id: "report", label: "上报物业", kind: "danger" });
        return acts;
      },
      resolve: function (id) {
        if (id === "pass") {
          return result(
            "你抬起道闸。他点一点头，进了4栋。这一趟没有难处，像夜里偶尔出现的一段平路。",
            { deltas: { guanxi: { ma: 1 } } }
          );
        }
        if (id === "report") {
          return result(
            this.identified
              ? "你已经认出这是马教练，还是上报了物业。他听完，只「哈」了一声，不再看你。人当然还是进去了。"
              : "你上报物业，说有人深夜进楼。马教练听完，只「哈」了一声，不再看你。人当然还是进去了，只是往后大概不会在闸前跟你打招呼。",
            { deltas: { fame: this.identified ? -2 : -1, guanxi: { ma: -2 } }, flags: { reported: 1 } }
          );
        }
        return null;
      }
    };
  }

  function makeCaser() {
    return {
      id: "caser",
      name: "自称找刘先生的人",
      impression: "一个压低帽檐的年轻人",
      claimedUnit: "4栋501",
      hasFob: false,
      portrait: "caser",
      walker: "caser",
      gait: "walk",
      caption: "深色外套，帽檐压得很低",
      canCall: true,
      canProp: true,
      intro: "来了一个年轻男人。深色外套，手插在口袋里，没有刷卡。「找刘先生，4栋501。说好了今晚来拿东西。」他说话时看的不是你，是道闸后头那片暗。",
      onAsk: "你问刘先生的电话。他说「没电了」。再问刘先生什么时候方便，他顿了顿：「一直住这儿啊。」",
      onLook: "帽檐压着，灯还是照到了下颌和一双不肯对上的眼。左颊近耳处有一颗浅痣。步态虚，像来踩场子的——那点旧时的感应只醒了一息。这张脸，你没有在名册上见过。",
      onCard: "没有卡。也不肯把兜里的手拿出来。",
      onRoster: "他要找的是4栋501。名册上这户空置，原户主刘先生已搬走，房子待售。任何人自称找刘先生，都应拦住。",
      onCall: "你按名册上刘先生的旧号拨过去。一声「空号」的机械提示，在夜里显得特别长。",
      onProp: "口袋空，没有行李。说是来拿东西的人，手里却什么也没预备。",
      lookFact: "生人，左颊有痣，步态虚",
      cardFact: "无门禁卡",
      callFact: "刘先生旧号已是空号",
      rosterFact: "4栋501 空置",
      getActions: function (ctx) {
        const acts = [];
        if (!ctx.asked) acts.push({ id: "ask", label: "拦下询问" });
        acts.push({ id: "pass", label: "放行" });
        acts.push({ id: "reg", label: "登记访客" });
        if (ctx.asked || ctx.called || ctx.checkedRoster || ctx.looked) acts.push({ id: "send", label: "请回" });
        acts.push({ id: "report", label: "上报物业", kind: "danger" });
        acts.push({ id: "wink", label: "睁一只眼闭一只眼", kind: "soft" });
        return acts;
      },
      resolve: function (id) {
        if (id === "send") {
          return result(
            "你请他回去，或让刘先生本人白天来办。他骂了一句，到底没硬闯。人影没入马路对面的绿化带时，还回头看了看4栋的墙。你把这趟记在心里。",
            { deltas: { fame: 1 }, flags: { flaggedSuspect: true, turnedAwaySuspect: true } }
          );
        }
        if (id === "report") {
          return result(
            "你上报物业，并写下：有人要进已空置的4栋501。对方还想解释，听见对讲机里的声音，才把帽檐压更低，走了。监控里至少留了他的侧脸，还有颊边那颗痣。",
            { deltas: { fame: 2 }, flags: { flaggedSuspect: true, reported: 1 } }
          );
        }
        if (id === "reg") {
          const base = {
            text: "他报了一个含糊的名字，你还是写了，抬起道闸。人进了小区。本子上有字，可4栋501是空的——这趟登记，像给误放盖了个章。",
            deltas: { demerits: 1, fame: -1 },
            flags: { letSuspectIn: true }
          };
          if (this.called || this.checkedRoster) {
            return ignoreTax(this, Object.assign({}, base, { flags: base.flags }), "名册就在手边，4栋501是空的，你还是抬了闸。", { fame: -1 });
          }
          return result(base.text, base);
        }
        if (id === "pass" || id === "wink") {
          const base = {
            text: id === "wink"
              ? "你当没看见那些不对的地方，抬起道闸。他迅速进了暗处，没有往4栋的单元门走，而是贴着墙根去了。误放的记过，只是今晚的第一笔利息。"
              : "你抬起道闸。他迅速进了暗处，没有往4栋的单元门走，而是贴着墙根去了。名册上空置的那一户，今夜被人用嘴打开了。",
            deltas: { demerits: 1, fame: -2 },
            flags: { letSuspectIn: true }
          };
          if (this.called || this.checkedRoster) {
            return ignoreTax(this, Object.assign({}, base, { flags: base.flags }), "空号和空置的字都已经看见了，你还是抬了闸。", { fame: -1 });
          }
          return result(base.text, base);
        }
        return null;
      }
    };
  }

  HDX.findResident = function (claimed) {
    if (!claimed) return null;
    const exact = HDX.RESIDENTS.filter(function (r) { return r.unit === claimed; });
    if (exact.length) return exact[0];
    const loose = HDX.RESIDENTS.filter(function (r) { return r.unit.indexOf(claimed) === 0; });
    return loose[0] || null;
  };

  HDX.buildShift = function (rng) {
    const zhaoNote = rng() < 0.55;
    const zhaoAnswers = rng() < 0.5;
    const nephewReal = rng() < 0.4;
    const wangNote = nephewReal && rng() < 0.4;

    const notes = ["8栋1003 孙清：外出至月底，任何人来访均勿放行。"];
    if (zhaoNote) notes.unshift("2栋603 赵工：今晚有外卖，到了放行即可。");
    if (wangNote) notes.unshift("6栋402 王桂芳：外甥今晚可能到，登记后放行。");

    const middle = shuffle([
      makeDelivery(rng, zhaoNote, zhaoAnswers),
      makeSolicitor(),
      makeNephew(nephewReal, wangNote),
      makeLin(),
      makeZhou(),
      makeMa()
    ], rng);

    const visitors = [makeChenBo(rng)].concat(middle).concat([makeCaser()]);
    const stamps = ["20:08", "20:41", "21:16", "21:47", "22:19", "22:50", "23:14", "23:41"];
    visitors.forEach(function (v, i) {
      v.time = stamps[i];
      v.asked = false;
      v.looked = false;
      v.checkedCard = false;
      v.checkedRoster = false;
      v.called = false;
      v.checkedProp = false;
      v.identified = false;
      v.facts = [];
    });

    return { notes: notes, visitors: visitors, zhaoNote: zhaoNote, nephewReal: nephewReal };
  };

  HDX.zhTime = function (hhmm) {
    const parts = (hhmm || "20:00").split(":");
    const h = +parts[0];
    const m = +parts[1];
    const d = "零一二三四五六七八九";
    function n(x) {
      if (x <= 0) return "零";
      if (x < 10) return d[x];
      if (x < 20) return "十" + (x === 10 ? "" : d[x - 10]);
      const t = Math.floor(x / 10);
      const o = x % 10;
      return d[t] + "十" + (o ? d[o] : "");
    }
    return n(h) + "点" + (m === 0 ? "整" : n(m) + "分");
  };
})(window);
