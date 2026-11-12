/* 胡大侠 · 内容数据（住户、来人、剪影、文案） */
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

  HDX.SILHOUETTES = {
    elder: '<g fill="#120e0c"><ellipse cx="28" cy="96" rx="18" ry="5" fill="#0a1011" opacity=".45"/><circle cx="32" cy="16" r="8"/><path d="M22 26c8-5 22-2 24 6l4 46H20l2-30z"/><path d="M20 78l3 18h9l-1-18z"/><path d="M38 78l2 18h10l-4-18z"/><path d="M44 42h4v8h-4z"/></g><g><rect x="50" y="38" width="7" height="16" fill="#a63d2e"/><rect x="51" y="35" width="5" height="4" fill="#e8d8b8"/></g>',
    "elder-boy": '<g fill="#120e0c"><ellipse cx="24" cy="96" rx="22" ry="5" fill="#0a1011" opacity=".45"/><circle cx="26" cy="18" r="7.5"/><path d="M16 28c8-4 20-2 22 6l3 44H15l2-28z"/><path d="M15 78l2 18h8l-1-18z"/><path d="M30 78l2 18h9l-3-18z"/><circle cx="54" cy="28" r="6"/><path d="M46 36c6-3 16-1 16 6v38H46z"/><path d="M46 80l1 16h7l1-16z"/><path d="M58 80l1 16h7l-2-16z"/></g><g><rect x="40" y="40" width="6" height="14" fill="#a63d2e"/><rect x="41" y="37" width="4" height="4" fill="#e8d8b8"/></g>',
    rider: '<g fill="#120e0c"><ellipse cx="34" cy="96" rx="18" ry="5" fill="#0a1011" opacity=".45"/><path d="M24 10h20l2 8H22z"/><circle cx="34" cy="22" r="7"/><path d="M22 30c10-4 24 0 24 8l2 28-10 2 2 28H26l-2-30 6-2z"/><path d="M20 44h16v12H18z"/></g><rect x="18" y="44" width="16" height="11" fill="#3c6a66"/><rect x="20" y="46" width="12" height="3" fill="#e8d8b8" opacity=".8"/>',
    "woman-work": '<g fill="#120e0c"><ellipse cx="34" cy="96" rx="16" ry="5" fill="#0a1011" opacity=".45"/><path d="M38 8c8 10 4 18-2 20"/><circle cx="32" cy="18" r="7.5"/><path d="M22 28c8-3 20-1 22 7l-2 48H22l-2-36z"/><path d="M22 82l1 14h8l1-14z"/><path d="M36 82l2 14h8l-2-14z"/><path d="M42 48l12 4-2 16-10-2z"/></g><rect x="48" y="50" width="11" height="14" fill="#8a6d32"/>',
    official: '<g fill="#120e0c"><ellipse cx="34" cy="96" rx="16" ry="5" fill="#0a1011" opacity=".45"/><circle cx="34" cy="16" r="8"/><path d="M20 28c10-4 24-2 26 8l2 46H20z"/><path d="M22 80l2 16h9l-1-16z"/><path d="M38 80l2 16h9l-2-16z"/><path d="M44 44h14v18H46z"/></g><rect x="46" y="46" width="12" height="14" fill="#1a3332"/>',
    solicitor: '<g fill="#120e0c"><ellipse cx="34" cy="96" rx="16" ry="5" fill="#0a1011" opacity=".45"/><circle cx="34" cy="16" r="8"/><path d="M22 28c8-3 22-1 24 8l2 44H20z"/><path d="M22 80l2 16h8l-1-16z"/><path d="M36 80l2 16h9l-3-16z"/><path d="M44 36l16 6-4 22-16-4z"/></g><g fill="#b03a2e"><rect x="48" y="40" width="12" height="16"/><rect x="50" y="38" width="12" height="16" opacity=".7"/></g>',
    hoodie: '<g fill="#120e0c"><ellipse cx="34" cy="96" rx="16" ry="5" fill="#0a1011" opacity=".45"/><path d="M20 16c0-8 8-12 16-12 6 0 12 3 14 10l-2 8H22z"/><circle cx="34" cy="20" r="7"/><path d="M18 30c8-6 26-6 32 2l2 36c-6 4-10 4-16 0l-2 28H24l-2-28c-6 2-10 2-14-2z"/></g><rect x="28" y="34" width="8" height="4" fill="#3c6a66" opacity=".7"/>',
    athlete: '<g fill="#120e0c"><ellipse cx="36" cy="96" rx="18" ry="5" fill="#0a1011" opacity=".45"/><circle cx="34" cy="16" r="8"/><path d="M18 28c10-5 28-3 30 8l4 28-8 4 2 28H24l-2-30-4-2z"/><path d="M40 40l16 8 2 22-14 2z"/></g><rect x="44" y="48" width="14" height="18" fill="#3c6a66"/>',
    nephew: '<g fill="#120e0c"><ellipse cx="34" cy="96" rx="18" ry="5" fill="#0a1011" opacity=".45"/><circle cx="32" cy="17" r="8"/><path d="M20 28c8-3 22-1 24 8l3 44H18z"/><path d="M20 80l2 16h8l-1-16z"/><path d="M36 80l2 16h9l-3-16z"/><path d="M40 50l18-6 4 28-20 6z"/></g><rect x="44" y="52" width="16" height="22" fill="#8a6d32"/>',
    climber: '<g fill="#120e0c"><ellipse cx="40" cy="96" rx="14" ry="4" fill="#0a1011" opacity=".4"/><circle cx="48" cy="14" r="7"/><path d="M28 28c8-8 24-4 26 8l-6 16 14 8-8 20-18-4 2-18z"/><path d="M18 70l16-28 8 6-10 32z"/></g>'
  };

  HDX.COPY = {
    titleSub: "听雨苑 · 夜班门岗",
    titleLead: "从前过的是关隘，今夜守的是道闸。工资不够买有用的东西，认人却能换来路。",
    start: "上　岗",
    briefingKicker: "交接班 · 十九点五十分",
    briefingTitle: "今夜值班",
    briefing: [
      "物业在群里留了三句话：今夜业委会可能巡岗；陌生人误放必记过；楼里若失窃，先查门岗。",
      "你把旧工牌挂上。名字栏写的是「胡守正」，只有你自己知道，这具身子里坐着从前的胡大侠。",
      "底薪薄，买不起趁手的物件。可业主若记得你的好，有时候比钱管用。",
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
    return Object.assign({ text: Array.isArray(text) ? text : [text], close: true }, extra || {});
  }

  function makeChenBo(rng) {
    const withGrandson = rng() < 0.42;
    return {
      id: "chen",
      name: "陈伯",
      claimedUnit: "3栋1202",
      hasFob: true,
      silhouette: withGrandson ? "elder-boy" : "elder",
      caption: withGrandson ? "红皮暖壶，身后还跟着一个少年" : "红皮暖壶，步子很熟",
      personKey: "chen",
      intro: withGrandson
        ? "道闸外，暖壶的红皮先于人进灯里。陈伯踩着熟悉的步子，冲你点了下头。他身后还立着一个少年，行李包的带子勒在肩上，没有刷卡。"
        : "道闸外，暖壶的红皮先于人进灯里。陈伯踩着熟悉的步子，冲你点了下头。门禁卡在他手里亮了一下，绿灯很短，却是真的。",
      onAsk: withGrandson
        ? "陈伯把暖壶往手臂上一靠，推了推身后的少年。「我孙子，从外地来住两天。这不是小胡吗，还盘上我了。」少年拘谨地点头，没带卡。灯底下，陈伯腕上那道旧疤你见过。"
        : "陈伯笑出声，暖壶盖磕了一下。「小胡，我不认得你，你还不认得这张老脸？」灯底下，他腕上那道旧疤你见过。门禁卡挂在他裤腰上，是真的。",
      getActions(ctx) {
        const acts = [];
        if (!ctx.asked) acts.push({ id: "ask", label: "拦下询问" });
        acts.push({ id: "pass", label: "放行" });
        if (withGrandson) {
          acts.push({ id: "reg", label: "登记访客" });
          acts.push({ id: "wink", label: "睁一只眼闭一只眼", kind: "soft" });
        }
        return acts;
      },
      resolve(id) {
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

  function makeDelivery(rng, zhaoNote) {
    const food = rng() < 0.5 ? "一份黄焖鸡" : "两杯冰美式";
    return {
      id: "delivery",
      name: "外卖骑手",
      claimedUnit: "2栋603",
      hasFob: false,
      silhouette: "rider",
      caption: zhaoNote ? "头盔、餐箱。今夜留言里有赵工的条" : "头盔、餐箱。没有业主留言",
      personKey: "zhao",
      intro: zhaoNote
        ? "电动车在灯柱外嗡了一声。骑手把餐箱掀开一条缝，露出" + food + "。「2栋603，赵衡。」你记得今夜留言里，赵工说过今晚有外卖。"
        : "电动车在灯柱外嗡了一声。骑手把餐箱掀开一条缝，露出" + food + "。「2栋603，赵衡，他在电话里催了。」名册上今晚没有赵工的条。",
      onAsk: "他不耐烦，却还是把订单界面亮给你：收件人赵衡，地址2栋603，电话尾号和物业登记对得上。油香混着头盔里的汗味。「哥，菜要凉了。」",
      getActions(ctx) {
        const acts = [];
        if (!ctx.asked) acts.push({ id: "ask", label: "拦下询问" });
        acts.push({ id: "pass", label: "放行" });
        acts.push({ id: "reg", label: "登记访客" });
        acts.push({ id: "report", label: "上报物业", kind: "danger" });
        if (ctx.asked) acts.push({ id: "wink", label: "睁一只眼闭一只眼", kind: "soft" });
        return acts;
      },
      resolve(id) {
        if (id === "reg") {
          return result(
            "你记下他的姓和单号，这才抬闸。骑手嘟囔了一句，到底把餐送了进去。门岗的本子上多一行，比一句「进去吧」经得住查。",
            { deltas: { fame: 1 } }
          );
        }
        if (id === "pass" || id === "wink") {
          if (zhaoNote) {
            return result(
              "你对照过今夜的留言，抬起道闸。骑手一拱车，餐箱在夜里晃了一下。赵工的晚饭没有凉在门外。",
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
      claimedUnit: "7栋",
      hasFob: false,
      silhouette: "solicitor",
      caption: "手里一叠单子，笑得比灯还亮",
      intro: "来人没有刷卡。他先对你笑，再把一叠彩印单子递到窗边。「给业主送福利的，物业知道。7栋吴奶奶也说让我上去坐坐。」岗亭里没有这样的通知。",
      onAsk: "你问他物业是谁签的字。他顿了顿，改口说是「朋友介绍，顺便看看有没有旧家电」。单子上写着保险和贷款。吴奶奶夜里从不出门，更不会邀人上门。",
      getActions(ctx) {
        const acts = [];
        if (!ctx.asked) acts.push({ id: "ask", label: "拦下询问" });
        acts.push({ id: "pass", label: "放行" });
        acts.push({ id: "reg", label: "登记访客" });
        if (ctx.asked) acts.push({ id: "send", label: "请回" });
        acts.push({ id: "report", label: "上报物业", kind: "danger" });
        return acts;
      },
      resolve(id) {
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
          return result(
            id === "reg"
              ? "你给他登了个含糊的名字，抬起道闸。后半夜吴奶奶让儿子打电话来：有人敲门卖保险，把她吓醒了。投诉记在门岗上。"
              : "你抬起道闸。他进了7栋。后半夜吴奶奶让儿子打电话来：有人敲门卖保险，把她吓醒了。投诉记在门岗上。",
            { deltas: { demerits: 1, fame: -2 } }
          );
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
        claimedUnit: "6栋402",
        hasFob: false,
        silhouette: "nephew",
        caption: wangNote ? "旅行包沉甸甸。今夜有王太太的条" : "旅行包沉甸甸，像带了家乡的东西",
        personKey: "wang",
        intro: wangNote
          ? "年轻男人把一只发沉的旅行包放在灯下。「6栋402，我舅妈王桂芳。她说给门岗留过话。」包缝里露出一袋花生和半截香肠。"
          : "年轻男人把一只发沉的旅行包放在灯下。「6栋402，我舅妈王桂芳，今晚投奔她。」包缝里露出一袋花生和半截香肠。他没有门禁卡。",
        onAsk: "你问他舅妈女儿叫什么。他挠了挠头：「表妹在合肥念书，我叫她小名，户口本上的名字要过一会儿才想得起来。」语气不滑。他又说火车晚点，舅妈让他别在外面叫车，直接来小区。",
        getActions(ctx) {
          const acts = [];
          if (!ctx.asked) acts.push({ id: "ask", label: "拦下询问" });
          acts.push({ id: "pass", label: "放行" });
          acts.push({ id: "reg", label: "登记访客" });
          acts.push({ id: "report", label: "上报物业", kind: "danger" });
          if (ctx.asked || wangNote) acts.push({ id: "wink", label: "睁一只眼闭一只眼", kind: "soft" });
          return acts;
        },
        resolve(id) {
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
            return result(
              "你上报物业，让他在闸外等。电话打到王太太那里，她立刻急了：「我外甥！站外头干什么？」人最后还是进去了，投诉却写在你头上。",
              { deltas: { demerits: 1, fame: -1, guanxi: { wang: -2 } }, flags: { reported: 1 } }
            );
          }
          return null;
        }
      };
    }
    return {
      id: "nephew-fake",
      name: "自称王太太外甥的人",
      claimedUnit: "6栋402",
      hasFob: false,
      silhouette: "nephew",
      caption: "旅行包很轻，拉链也没怎么鼓",
      personKey: "wang",
      intro: "年轻男人把一只旅行包靠在腿边。「6栋401……不对，402，我舅妈王桂芳。」他笑了一下，眼睛却去看道闸后头。包看起来很轻。",
      onAsk: "你问他舅妈家里还有谁。他说：「舅妈儿子在上中学，今晚大概睡了。」名册上，王桂芳只有一个在外地念书的女儿，外甥很少来。他又不愿登记，「我很快就出来。」",
      getActions(ctx) {
        const acts = [];
        if (!ctx.asked) acts.push({ id: "ask", label: "拦下询问" });
        acts.push({ id: "pass", label: "放行" });
        acts.push({ id: "reg", label: "登记访客" });
        if (ctx.asked) acts.push({ id: "send", label: "请回" });
        acts.push({ id: "report", label: "上报物业", kind: "danger" });
        acts.push({ id: "wink", label: "睁一只眼闭一只眼", kind: "soft" });
        return acts;
      },
      resolve(id) {
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
          return result(
            "你让他进了6栋。后半夜王太太来岗亭问：「谁呀，我哪来的外甥？」楼道里已经没了人。误放记过，写在你的名下。",
            { deltas: { demerits: 1, fame: -2 } }
          );
        }
        return null;
      }
    };
  }

  function makeLin() {
    return {
      id: "lin",
      name: "林晚秋",
      claimedUnit: "5栋801",
      hasFob: false,
      silhouette: "woman-work",
      caption: "工作袋，没有刷门禁卡",
      personKey: "lin",
      intro: "女客站进灯里，先在包里翻了一圈，没翻出卡。「5栋801，林晚秋。卡忘在公司了。」头发有一点散，像是刚从很亮的地方走回夜里。",
      onAsk: "她报了房号，又自己补了一句：「岗亭边上那只橘猫，今晚在不在？我上次还喂过。」你见过她几次，都是这种加班回来的步子。名册上，林晚秋确实住5栋801，忘带卡也不止一次。",
      getActions(ctx) {
        const acts = [];
        if (!ctx.asked) acts.push({ id: "ask", label: "拦下询问" });
        acts.push({ id: "pass", label: "放行" });
        acts.push({ id: "wink", label: "睁一只眼闭一只眼", kind: "soft" });
        acts.push({ id: "reg", label: "登记访客" });
        acts.push({ id: "report", label: "上报物业", kind: "danger" });
        if (ctx.asked) acts.push({ id: "send", label: "请回" });
        return acts;
      },
      resolve(id) {
        if (id === "ask") return null;
        if (id === "wink" || (id === "pass" && this.asked)) {
          return result(
            "你认出她夹文件的姿势，抬起道闸。她松了口气，低声说「谢谢，下回想起来一定带卡」。人熟，也要把这一趟问清楚，你心里才踏实。",
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
            "你要把她往访客栏里写。她皱眉：「我是住户。」你还是记了一笔才放行。人是进去了，情面上却薄了一层。",
            { deltas: { guanxi: { lin: -1 } } }
          );
        }
        if (id === "report" || id === "send") {
          return result(
            id === "send"
              ? "你请她回去取卡。她站在冷风里看了你一会儿，转身就走。后半夜物业群里多了一条投诉：门岗把忘带卡的业主拦在外头。"
              : "你上报物业，要核验身份。电话还没打完，她已经凉了脸。「我在这住了三年。」投诉很快写到门岗名下。",
            { deltas: { demerits: 1, fame: -2, guanxi: { lin: -2 } }, flags: { reported: id === "report" ? 1 : 0 } }
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
      claimedUnit: "1栋1501",
      hasFob: true,
      silhouette: "official",
      caption: "深色公文包，门禁卡亮了一下",
      personKey: "zhou",
      intro: "深色公文包先进入灯光。周正明刷了卡，绿灯响得很短。他在岗亭窗外停了半步，像是顺便看看，又像是有意来看。",
      onAsk: "你拦了一下。周主任把公文包换到另一只手，眉稍微抬了抬。「小胡，这是不认得我，还是规矩太大？」灯底下，那张业委会的脸你不会认错。",
      getActions(ctx) {
        const acts = [];
        if (!ctx.asked) acts.push({ id: "ask", label: "拦下询问" });
        acts.push({ id: "pass", label: "放行" });
        acts.push({ id: "report", label: "上报物业", kind: "danger" });
        return acts;
      },
      resolve(id, state) {
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
            { deltas: { guanxi: { zhou: 0 } }, flags: { zhouPleased: false } }
          );
        }
        if (id === "report") {
          return result(
            "你拿起对讲机，想上报「有人在闸外停留」。话没出口就意识到对方是谁。周主任已经听得清楚，脸沉下来。这记过，写得又快又干净。",
            { deltas: { demerits: 1, fame: -2, guanxi: { zhou: -2 } }, flags: { reported: 1 } }
          );
        }
        return null;
      },
      afterAskResolve: {
        // after asking, passing is the remaining decent choice; handled by resolve pass with slightly worse flavor if we want
      }
    };
  }

  function makeMa() {
    return {
      id: "ma",
      name: "马教练",
      claimedUnit: "4栋906",
      hasFob: true,
      silhouette: "athlete",
      caption: "运动背包，额头还带着汗",
      personKey: "ma",
      intro: "一个肩背很宽的男人从夜色里走来，刷卡，绿灯。背包带子上挂着湿毛巾，空气里有一点皂和汗混在一起的味道。",
      onAsk: "马磊把湿毛巾从脖子上拿下来，并不生气，只是有些意外。「刚加完课。小胡，你也够晚的。」房号是4栋906，和名册一致，卡也是真的。",
      getActions(ctx) {
        const acts = [];
        if (!ctx.asked) acts.push({ id: "ask", label: "拦下询问" });
        acts.push({ id: "pass", label: "放行" });
        acts.push({ id: "report", label: "上报物业", kind: "danger" });
        return acts;
      },
      resolve(id) {
        if (id === "pass") {
          return result(
            "你抬起道闸。他点一点头，进了4栋。这一趟没有难处，像夜里偶尔出现的一段平路。",
            { deltas: { guanxi: { ma: 1 } } }
          );
        }
        if (id === "report") {
          return result(
            "你上报物业，说有人深夜进楼。马教练听完，只「哈」了一声，不再看你。人当然还是进去了，只是往后大概不会在闸前跟你打招呼。",
            { deltas: { fame: -1, guanxi: { ma: -2 } }, flags: { reported: 1 } }
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
      claimedUnit: "4栋501",
      hasFob: false,
      silhouette: "hoodie",
      caption: "深色外套，帽檐压得很低",
      intro: "最后这几个时辰里，来了一个年轻男人。深色外套，手插在口袋里，没有刷卡。「找刘先生，4栋501。说好了今晚来拿东西。」他说话时看的不是你，是道闸后头那片暗。",
      onAsk: "你问刘先生的电话。他说「没电了」。再问刘先生什么时候方便，他顿了顿：「一直住这儿啊。」名册上写得很清楚：4栋501空置，原户主刘先生已经搬走。你忽然觉得这人的步态虚，像是来踩过场子的——那点旧时的感应，在这具身子里只醒了一息。",
      getActions(ctx) {
        const acts = [];
        if (!ctx.asked) acts.push({ id: "ask", label: "拦下询问" });
        acts.push({ id: "pass", label: "放行" });
        acts.push({ id: "reg", label: "登记访客" });
        if (ctx.asked) acts.push({ id: "send", label: "请回" });
        acts.push({ id: "report", label: "上报物业", kind: "danger" });
        acts.push({ id: "wink", label: "睁一只眼闭一只眼", kind: "soft" });
        return acts;
      },
      resolve(id) {
        if (id === "send") {
          return result(
            "你请他回去，或让刘先生本人白天来办。他骂了一句，到底没硬闯。人影没入马路对面的绿化带时，还回头看了看4栋的墙。你把这趟记在心里。",
            { deltas: { fame: 1 }, flags: { flaggedSuspect: true, turnedAwaySuspect: true } }
          );
        }
        if (id === "report") {
          return result(
            "你上报物业，并写下：有人要进已空置的4栋501。对方还想解释，听见对讲机里的声音，才把帽檐压更低，走了。监控里至少留了他的侧脸。",
            { deltas: { fame: 2 }, flags: { flaggedSuspect: true, reported: 1 } }
          );
        }
        if (id === "reg") {
          return result(
            "他报了一个含糊的名字，你还是写了，抬起道闸。人进了小区。本子上有字，可4栋501是空的——这趟登记，像给误放盖了个章。",
            { deltas: { demerits: 1, fame: -1 }, flags: { letSuspectIn: true } }
          );
        }
        if (id === "pass" || id === "wink") {
          return result(
            id === "wink"
              ? "你当没看见那些不对的地方，抬起道闸。他迅速进了暗处，没有往4栋的单元门走，而是贴着墙根去了。误放的记过，只是今晚的第一笔利息。"
              : "你抬起道闸。他迅速进了暗处，没有往4栋的单元门走，而是贴着墙根去了。名册上空置的那一户，今夜被人用嘴打开了。",
            { deltas: { demerits: 1, fame: -2 }, flags: { letSuspectIn: true } }
          );
        }
        return null;
      }
    };
  }

  HDX.buildShift = function (rng) {
    const zhaoNote = rng() < 0.55;
    const nephewReal = rng() < 0.4;
    const wangNote = nephewReal && rng() < 0.4;

    const notes = ["8栋1003 孙清：外出至月底，任何人来访均勿放行。"];
    if (zhaoNote) notes.unshift("2栋603 赵工：今晚有外卖，到了放行即可。");
    if (wangNote) notes.unshift("6栋402 王桂芳：外甥今晚可能到，登记后放行。");

    const middle = shuffle([
      makeDelivery(rng, zhaoNote),
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
