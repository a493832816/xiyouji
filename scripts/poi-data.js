export const mapMeta = {
  title: "西游取经全域图",
  imagePath: "./西游地图.jpg",
  viewBox: { width: 100, height: 100 },
  regionLabels: [
    { name: "北俱芦洲", x: 2.6, y: 3.8, cls: "north" },
    { name: "西牛贺州", x: 19, y: 73.2, cls: "west" },
    { name: "东胜神州", x: 85.8, y: 73.5, cls: "east" }
  ],
  waterLabels: [
    { name: "东海", x: 84.6, y: 67.6, rotate: -14 },
    { name: "南海", x: 78.3, y: 79.2, rotate: 6 }
  ]
};

export const legends = [
  { key: "city", label: "城池/宫殿", color: "#8d2a24" },
  { key: "mountain", label: "山岭险关", color: "#38513f" },
  { key: "temple", label: "寺观圣地", color: "#2d6848" },
  { key: "water", label: "水域洞天", color: "#215b76" },
  { key: "route", label: "取经主路线", color: "#bf5126" }
];

export const points = [
  { id: "lingxiao", name: "灵霄宝殿", x: 84.74, y: 15.55, t: "city", big: true, region: "天界", desc: "天庭正殿，玉皇大帝临朝理政、众神朝会之所；册封孙悟空”齐天大圣”、大闹天宫等情节皆与此处权柄相关。", jumpLabel: "查看凌霄宝殿", characters: ["玉皇大帝", "太上老君", "元始天尊", "灵宝天尊", "王母娘娘", "太白金星", "托塔天王李靖", "哪吒", "二郎神杨戬", "张道陵", "葛洪", "许逊", "邱弘济", "王灵官"] },
  { id: "tianwang", name: "天王殿", x: 69.41, y: 8.84, t: "city", region: "天界", desc: "南天门内要隘，四大天王率部镇守，凡间与上界往来多经此处盘查，象征天界门户之严。", jumpLabel: "查看天王殿", characters: ["托塔天王李靖", "哪吒", "千里眼", "顺风耳", "雷公", "电母", "风伯", "雨师"] },
  { id: "guanghan", name: "广寒宫", x: 90.57, y: 20.82, t: "city", region: "天界", desc: "月宫仙境，传说为嫦娥所居；清冷孤高，与天庭朝会、蟠桃盛会等热闹场景形成对照。", jumpLabel: "查看广寒宫", characters: ["太阴星君", "猪八戒", "赤脚大仙"] },
  { id: "lingyan", name: "凌烟阁", x: 95.44, y: 36.31, t: "city", region: "东域", desc: "云上琼楼玉宇意象，取”凌烟”高阁之意，象征东胜神洲一侧缥缈仙凡交界的宫阙景观。", jumpLabel: "查看凌烟阁", characters: ["太白金星", "日游神", "夜游神"] },
  // { id: "liangjie", name: "两界山", x: 8.4, y: 14.8, t: "mountain", region: "西境", desc: "孙悟空受困五百年的起点地标。", jumpLabel: "查看两界山" },
  { id: "jilei", name: "积雷山", x: 15.52, y: 14.18, t: "mountain", region: "西境", desc: "牛魔王与铁扇公主旧居一带，妖魔势力盘根错节；与火焰山、芭蕉扇等情节相互勾连。", jumpLabel: "查看积雷山", characters: ["孙悟空", "猪八戒", "哪吒", "托塔天王李靖"] },
  { id: "wuji", name: "乌鸡国", x: 31.33, y: 17.54, t: "city", region: "西境", desc: "真王被妖道推入御花园井中三年，悟空救王、辨明正邪，展现”王道”与妖术之辨。", jumpLabel: "查看乌鸡国", characters: ["孙悟空", "唐僧（玄奘）", "猪八戒", "沙僧（沙悟净）", "文殊菩萨"] },
  { id: "baihu", name: "白虎岭",  x: 40.20, y: 16.78, t: "mountain", region: "中域", desc: "白骨精三次变化诱唐僧，悟空三打白骨精反遭紧箍与逐徒，为全书情感冲突高潮之一。", jumpLabel: "查看白虎岭", characters: ["孙悟空", "唐僧（玄奘）", "猪八戒", "沙僧（沙悟净）", "观音菩萨", "土地神"] },
  { id: "gaolao", name: "高老庄", x: 60.30, y: 23.22, t: "city", region: "中域", desc: "猪八戒曾在此入赘为婿，悟空降妖后收其入队，标志取经团队基本成形。", jumpLabel: "查看高老庄", characters: ["孙悟空", "唐僧（玄奘）", "猪八戒", "观音菩萨"] },
  { id: "heifeng", name: "黑风山",  x: 71.00, y: 24.25, t: "mountain", region: "中域", desc: "黑熊精盗走袈裟，悟空与观音周旋方得收复；早展”宝贝招灾”与佛门度化主题。", jumpLabel: "查看黑风山", characters: ["孙悟空", "唐僧（玄奘）", "观音菩萨" ] },
  { id: "changan", name: "长安", x: 76.40, y: 37.12, t: "city", big: true, region: "东土大唐", desc: "大唐国都，玄奘受命西行、持通关文牒出发之地，取经叙事的人间起点与政治背景核心。", jumpLabel: "查看长安", characters: ["唐太宗李世民", "唐僧（玄奘）", "孙悟空", "猪八戒", "沙僧（沙悟净）", "白龙马", "观音菩萨", "泾河龙王", "阎罗王", "判官崔玏"] },
  { id: "taoyuan", name: "蟠桃山",  x: 83.68, y: 39.04, t: "mountain", region: "东域", desc: "王母蟠桃园所在山域意象，三千年、六千年、九千年桃树分品，大闹蟠桃会即源于此线。", jumpLabel: "查看蟠桃山", characters: ["王母娘娘", "孙悟空", "赤脚大仙"] },
  { id: "aolaic", name: "傲来村",  x: 79.45, y: 47.67, t: "city", region: "东域", desc: "傲来国近海村落一带，与花果山、石猴出世传说地理相近，象征东胜神洲人间烟火。", jumpLabel: "查看傲来村", characters: ["孙悟空", "东海龙王敖广", "土地神"] },
  { id: "aolai", name: "傲来国", x: 88.83, y: 66.29, t: "city", region: "东胜神州", desc: "花果山所在国度，近东海，为石猴出世后活动的人间政治单元，与龙宫、天庭叙事相接。", jumpLabel: "查看傲来国", characters: ["孙悟空", "东海龙王敖广", "城隍"] },
  { id: "huaguo", name: "花果山", x: 83.64, y: 59.10, t: "mountain", region: "东胜神州", desc: "十洲祖脉，水帘洞洞天；美猴王诞生、称王与早期修仙缘起之地，全书神话性格的源头。", jumpLabel: "查看花果山", characters: ["孙悟空", "太白金星", "托塔天王李靖", "哪吒", "二郎神杨戬", "观音菩萨", "东海龙王敖广"] },
  { id: "shuijing", name: "水晶宫", x: 70.95, y: 58.97, t: "water", region: "东海", desc: "东海龙王居所，悟空索兵器得金箍棒、借披挂，开启”龙宫—天庭”冲突链。", jumpLabel: "查看水晶宫", characters: ["东海龙王敖广", "西海龙王敖闰", "南海龙王敖钦", "北海龙王敖顺", "孙悟空"] },
  { id: "lingtai", name: "灵台方寸山", x: 66.66, y: 79.03, t: "mountain", region: "南海近域", desc: "斜月三星洞所在，菩提祖师授悟空七十二变与筋斗云；师名与洞名暗合”心”字，寓修心之学。", jumpLabel: "查看灵台方寸山", characters: ["菩提祖师", "孙悟空"] },
  { id: "putuo", name: "普陀山", x: 44.68, y: 91.63, t: "temple", region: "南海", desc: "观世音菩萨应化道场，取经路上多次救难、授紧箍、赐毫毛皆与此菩萨信仰相关。", jumpLabel: "查看普陀山", characters: ["观音菩萨", "孙悟空", "唐僧（玄奘）", "猪八戒", "沙僧（沙悟净）", "白龙马"] },
  { id: "youming", name: "幽冥地府",  x: 76.93, y: 92.59, t: "city", big: true, region: "冥界", desc: "十殿阎罗、生死簿所在；悟空曾勾销猴属之名，引发天庭地府联动，关乎轮回秩序与长生叙事。", jumpLabel: "查看幽冥地府", characters: ["地藏王菩萨", "秦广王", "楚江王", "宋帝王", "五官王", "阎罗王", "卞城王", "泰山王", "都市王", "平等王", "转轮王", "判官崔玏", "白无常（谢必安）", "黑无常（范无救）", "牛头", "马面", "孙悟空", "唐太宗李世民", "泾河龙王"] },
  { id: "wuzhuang", name: "五庄观", x: 45.26, y: 7.95, t: "temple", region: "中域", desc: "镇元大仙道场，观内植人参果树，与悟空冲突后结拜，体现地仙之祖与佛门行者的礼法之交。", jumpLabel: "查看五庄观", characters: ["镇元大仙", "孙悟空", "唐僧（玄奘）", "猪八戒", "沙僧（沙悟净）", "观音菩萨"] },
  { id: "wanshoushan", name: "万寿山", x: 44.64, y: 29.04, t: "temple", region: "中域", desc: "五庄观所倚之山，取”万寿”与人参果延寿之意，为取经途中重要仙家洞天所在山系。", jumpLabel: "查看五庄观遗址", characters: ["镇元大仙", "南极寿星"] },
  { id: "chedi", name: "车迟国", x: 23.33, y: 29.04, t: "city", region: "西境", desc: "虎力、鹿力、羊力三仙国师弄权，悟空与之斗法求雨、云台比试，讽刺佞道与盲信。", jumpLabel: "查看车迟国", characters: ["孙悟空", "唐僧（玄奘）", "猪八戒", "沙僧（沙悟净）", "东海龙王敖广", "雷公", "电母", "风伯", "雨师"] },
  { id: "zimu", name: "子母河", x: 26.09, y: 38.95, t: "water", region: "西境", desc: "西梁女国界内奇水，饮之可致男子受孕；与照胎泉、解阳山等构成女儿国生育隐喻。", jumpLabel: "查看子母河", characters: ["唐僧（玄奘）", "猪八戒", "孙悟空", "观音菩萨", "如意真仙"] },
  { id: "huoyan", name: "火焰山", x: 9.6, y: 27.3, t: "mountain", region: "西境", desc: "八百里烈火，乃老君炉砖所化；三借芭蕉扇、过火焰山，串联牛魔王家族与佛道博弈。", jumpLabel: "查看火焰山", characters: ["孙悟空", "唐僧（玄奘）", "猪八戒", "沙僧（沙悟净）", "太上老君", "观音菩萨", "哪吒", "托塔天王李靖", "土地神"] },
  { id: "pingdingshan", name: "平顶山", x: 32.92, y: 30.27, t: "mountain", region: "西境", desc: "金角、银角大王踞莲花洞，持老君法宝屡挫悟空；考验团队应变与”名相”之辨。", jumpLabel: "查看平顶山", characters: ["孙悟空", "唐僧（玄奘）", "猪八戒", "沙僧（沙悟净）", "太上老君", "土地神"] },
  { id: "nver", name: "西梁女国", x: 19.09, y: 35.62, t: "city", region: "西境", desc: "举国皆女，女王欲招唐僧为夫；情障与戒律张力极强，为八十一难中著名的“情关”。", jumpLabel: "查看女儿国" },
  { id: "zhuzi", name: "朱紫国", x: 30.04, y: 50.22, t: "city", region: "西境", desc: "国王失魂致病，悟空悬丝诊脉；麒麟山赛太岁（观音坐骑）摄走金圣宫娘娘，终得菩萨收伏。", jumpLabel: "查看朱紫国" },
  { id: "shitou", name: "狮驼岭", x: 37.16, y: 55.60, t: "mountain", region: "西境", desc: "青狮、白象、大鹏三魔盘踞，势力浩大，城一国皆妖，为全书妖魔气焰最盛段落之一。", jumpLabel: "查看狮驼岭" },
  { id: "yuhua", name: "玉华州", x: 24.58, y: 68.96, t: "city", region: "西境", desc: "天竺下属州郡，三位王子拜悟空、八戒、沙僧为师习艺；兵器被黄狮精盗走引发九灵元圣等情节。", jumpLabel: "查看玉华州" },
  { id: "jinping", name: "金平府", x: 35.48, y: 73.69, t: "city", region: "西境", desc: "慈云寺元宵灯会，三只犀牛精假冒佛爷骗香油；悟空请四木禽星与天庭协力剿妖。", jumpLabel: "查看金平府" },
  { id: "tianzhu", name: "天竺国", x: 29.64, y: 84.78, t: "city", region: "西境", desc: "玉兔下凡假扮公主抛绣球招亲，欲配唐僧；揭穿后太阴星君现身，属取经末段“天竺”叙事。", jumpLabel: "查看天竺国" },
  { id: "baoxiangguo", name: "宝象国", x: 36.76, y: 43.00, t: "city", region: "西境", desc: "黄袍怪（奎木狼）占碗子山波月洞，掳百花羞公主；八戒、沙僧先后出战，悟空归队后降妖。", jumpLabel: "查看宝象国" },
  { id: "wudidong", name: "无底洞", x: 10.56, y: 73.00, t: "water", region: "西境", desc: "金鼻白毛老鼠精所踞，自称半截观音，洞深难测；托塔李天王义女身份使收伏需对簿天庭。", jumpLabel: "查看无底洞" },
  { id: "fulongsi", name: "伏龙寺", x: 8.58, y: 48.22, t: "temple", region: "西境", desc: "祭赛国原金光寺，佛宝还朝后敕改伏龙寺；与扫塔辨冤、碧波潭降伏九头虫等情节相连，寓“伏龙”护法之意。", jumpLabel: "查看伏龙寺" },
  { id: "xiaoleiyinsi", name: "小雷音寺", x: 19.28, y: 59.79, t: "temple", region: "西境", desc: "黄眉老佛（弥勒座前童子）所设假雷音，人种袋、金铙困住悟空一行，考验向佛之心与辨识邪正。", jumpLabel: "查看小雷音寺" },
  { id: "lingshan", name: "灵山", x: 19.62, y: 96.90, t: "mountain", region: "灵山", desc: "佛祖说法圣地所在山系，凌云渡、彼岸与取经终点叙事的空间总称，象征修行所归。", jumpLabel: "查看灵山" },
  { id: "daleiyinsi", name: "大雷音寺", x: 28.10, y: 97.72, t: "temple", region: "灵山", desc: "如来说法真庭，唐僧一行缴通关文牒、受封旃檀功德佛与斗战胜佛等，取经故事正题收束之处。", jumpLabel: "查看大雷音寺" },
];

const poiIdSet = new Set(points.map((p) => p.id));

// 与项目根目录 route-path.csv 一致（参考《西游记》取经路线图蛇形走向，坐标为 viewBox 0–100 百分比）
const routePathRaw = [
  { x: 76.40, y: 37.12, name: "大唐长安", poiId: "changan" },
  // { x: 14.8, y: 9, name: "双叉岭" },
  // { x: 23.6, y: 9, name: "两界山" },
  // { x: 32.4, y: 9, name: "五行山" },
  // { x: 41.2, y: 9, name: "蛇盘山鹰愁涧" },
  // { x: 50, y: 9, name: "西番哈咇国界" },
  // { x: 58.8, y: 9, name: "观音禅寺" },
  { x: 71.00, y: 24.25, name: "黑风山", poiId: "heifeng" },
  { x: 60.30, y: 23.22, name: "高老庄", poiId: "gaolao" },
  // { x: 85.2, y: 9, name: "乌斯藏界" },
  // { x: 94, y: 9, name: "浮屠山" },
  // { x: 94, y: 23, name: "黄风岭" },
  // { x: 86, y: 23, name: "流沙河" },
  // { x: 78, y: 23, name: "西牛贺洲" },
  { x: 45.26, y: 7.95, name: "五庄观", poiId: "wuzhuang" },
  { x: 40.20, y: 16.78, name: "白虎岭", poiId: "baihu" },
  { x: 36.76, y: 43.00, name: "宝象国界", poiId: "baoxiangguo" },
  // { x: 46, y: 23, name: "碗子山波月洞" },
  { x: 32.92, y: 30.27, name: "平顶山莲花洞", poiId: "pingdingshan" },
  { x: 31.33, y: 17.54, name: "乌鸡国界", poiId: "wuji" },
  // { x: 22, y: 23, name: "宝林寺" },
  // { x: 14, y: 23, name: "火云洞" },
  // { x: 6, y: 23, name: "衡阳峪黑水河" },
  { x: 23.33, y: 29.04, name: "车迟国", poiId: "chedi" },
  // { x: 14, y: 37, name: "三清观" },
  // { x: 22, y: 37, name: "通天河" },
  // { x: 30, y: 37, name: "金兜洞" },
  { x: 19.09, y: 35.62, name: "西梁女国", poiId: "nver" },
  // { x: 46, y: 37, name: "破儿洞" },
  // { x: 54, y: 37, name: "毒敌山琵琶洞" },
  { x: 9.6, y: 27.3, name: "火焰山", poiId: "huoyan" },
  // { x: 70, y: 37, name: "祭赛国界" },
  // { x: 78, y: 37, name: "乱石山碧波潭" },
  // { x: 86, y: 37, name: "荆棘岭木仙庵" },
  { x: 19.28, y: 59.79, name: "小雷音寺", poiId: "xiaoleiyinsi" },
  // { x: 94, y: 51, name: "七绝山" },
  { x: 30.04, y: 50.22, name: "朱紫国界", poiId: "zhuzi" },
  // { x: 79.33, y: 51, name: "麒麟山獬豸洞" },
  // { x: 72, y: 51, name: "盘丝岭盘丝洞" },
  // { x: 64.67, y: 51, name: "黄花观" },
  { x: 37.16, y: 55.60, name: "狮驼岭", poiId: "shitou" },
  // { x: 50, y: 51, name: "比丘国界" },
  // { x: 42.67, y: 51, name: "清华洞府" },
  { x: 10.56, y: 73.00, name: "无底洞", poiId: "wudidong" },
  // { x: 28, y: 51, name: "隐雾山" },
  { x: 24.58, y: 68.96, name: "玉华府界", poiId: "yuhua" },
  // { x: 13.33, y: 51, name: "凤仙郡" },
  // { x: 6, y: 51, name: "豹头山虎口洞" },
  // { x: 6, y: 65, name: "竹节山" },
  { x: 35.48, y: 73.69, name: "金平府界", poiId: "jinping" },
  // { x: 31.14, y: 65, name: "青龙山" },
  { x: 29.64, y: 84.78, name: "天竺国界", poiId: "tianzhu" },
  // { x: 56.29, y: 65, name: "百脚山" },
  // { x: 68.86, y: 65, name: "铜台府地灵县" },
  // { x: 81.43, y: 65, name: "凌云渡" },
  
  { x: 28.10, y: 97.72, name: "大雷音寺", poiId: "daleiyinsi" }
];

/** 取经主路线折线（全部 CSV 节点，保证蛇形路径完整） */
export const routePath = routePathRaw;

/** 仅与地图热点可关联的节点，用于路线上的小圆点 */
export const routePathMarkers = routePathRaw.filter((node) => {
  return Boolean(node.poiId && poiIdSet.has(node.poiId));
});

export const terrainPaths = [
  {
    id: "north-ridge",
    cls: "terrain-mountain",
    d: "M 5 18 C 13 8, 23 15, 32 10 C 41 6, 47 15, 56 11 C 62 8, 69 13, 76 10"
  },
  {
    id: "mid-ridge",
    cls: "terrain-mountain",
    d: "M 9 36 C 18 29, 26 39, 34 33 C 43 28, 51 37, 60 32 C 69 29, 77 36, 86 32"
  },
  {
    id: "west-ridge",
    cls: "terrain-mountain",
    d: "M 6 62 C 13 52, 19 63, 27 57 C 35 52, 42 61, 50 55"
  },
  {
    id: "east-coast",
    cls: "terrain-water",
    d: "M 58 50 C 72 49, 82 54, 88 62 C 92 68, 92 78, 88 89"
  }
];

export const factionZones = [
  { name: "天庭势力", x: 74, y: 3, w: 24, h: 22, rotate: -8, cls: "heaven" },
  { name: "大唐势力", x: 58, y: 28, w: 22, h: 24, rotate: -10, cls: "tang" },
  { name: "妖魔势力", x: 6, y: 14, w: 32, h: 36, rotate: -6, cls: "demon" },
  { name: "佛门势力", x: 8, y: 64, w: 38, h: 32, rotate: -14, cls: "buddha" },
  { name: "龙宫势力", x: 52, y: 50, w: 36, h: 34, rotate: -10, cls: "dragon" }
];
