/**
 * 人物架构图面板模块 - 支持翻转卡片
 * 用于在 POI 详情中展示相关人物信息
 */

// 缓存人物数据
let characterDataCache = null;

/**
 * 加载人物数据
 */
async function loadCharacterData() {
  if (characterDataCache) {
    return characterDataCache;
  }
  try {
    const response = await fetch('./character-data.json');
    characterDataCache = await response.json();
    return characterDataCache;
  } catch (error) {
    console.error('加载人物数据失败:', error);
    return [];
  }
}

/**
 * 根据名称查找人物数据
 */
function findCharacterByName(data, name) {
  // 处理一些名称映射
  const nameMap = {
    '沙僧（沙悟净）': ['沙僧（沙悟净）', '沙僧', '沙悟净'],
    '唐僧（玄奘）': ['唐僧（玄奘）', '唐僧', '玄奘'],
    '白无常（谢必安）': ['白无常（谢必安）', '白无常', '谢必安'],
    '黑无常（范无救）': ['黑无常（范无救）', '黑无常', '范无救'],
    '猪八戒': ['猪八戒', '天蓬元帅'],
    '孙悟空': ['孙悟空', '齐天大圣', '斗战胜佛'],
  };

  const possibleNames = nameMap[name] || [name];

  for (const n of possibleNames) {
    const found = data.find(char => char.name === n || char.name.includes(n));
    if (found) return found;
  }

  return null;
}

/**
 * 根据势力获取对应的 CSS 类名
 */
function getFactionClass(faction) {
  const factionMap = {
    '天庭': 'heaven',
    '灵山': 'ling-shan',
    '地府': 'difu',
    '龙宫': 'longgong',
    '人间': 'renjian',
    '妖界': 'yaojie'
  };
  return factionMap[faction] || 'default';
}

/**
 * 按品级分组角色
 */
function groupByRank(characters, characterData) {
  const groups = new Map();

  const rankWeights = {
    '天仙·至尊': 1,
    '天仙·帝君': 2,
    '天仙·后妃': 3,
    '天仙·大帝': 4,
    '天仙·文臣': 5,
    '天仙·武将': 6,
    '天仙·天师': 7,
    '天仙·星君': 8,
    '天仙·战将': 9,
    '天仙·佐使': 10,
    '天仙·侦测': 11,
    '天仙·天象': 12,
    '天仙·巡逻': 13,
    '天仙': 14,
    '散仙·神秘': 15,
    '散仙·高人': 16,
    '地仙·至尊': 17,
    '佛教·至尊': 18,
    '佛教·未来佛': 19,
    '佛教·菩萨': 20,
    '佛教·高僧': 21,
    '佛教·护法': 22,
    '龙族·海主': 23,
    '龙族·太子': 24,
    '龙族': 25,
    '地府·第五殿': 26,
    '地府·第一殿': 27,
    '地府·第二殿': 28,
    '地府·第三殿': 29,
    '地府·第四殿': 30,
    '地府·第六殿': 31,
    '地府·第七殿': 32,
    '地府·第八殿': 33,
    '地府·第九殿': 34,
    '地府·第十殿': 35,
    '地府·文官': 36,
    '地府·基层': 37,
    '地府·差役': 38,
    '人间·帝王': 39,
    '人间·圣僧': 40,
    '人间·王子': 41,
    '人间·公主': 42,
    '人间·僧人': 43,
    '斗战胜佛': 44,
    '净坛使者': 45,
    '金身罗汉': 46,
    '八部天龙': 47,
    '天庭·星官': 48,
    '妖怪·顶级': 49,
    '地点': 100,
    '默认': 99
  };

  characters.forEach(name => {
    const charData = findCharacterByName(characterData, name);
    const rank = charData?.rank || '默认';

    if (!groups.has(rank)) {
      groups.set(rank, []);
    }
    groups.get(rank).push({
      name,
      data: charData
    });
  });

  // 按权重排序分组
  const sortedGroups = new Map();
  const sortedRanks = Array.from(groups.keys()).sort((a, b) => {
    const weightA = rankWeights[a] || 99;
    const weightB = rankWeights[b] || 99;
    return weightA - weightB;
  });

  sortedRanks.forEach(rank => {
    sortedGroups.set(rank, groups.get(rank));
  });

  return sortedGroups;
}

/**
 * 创建翻转卡片
 */
function createFlipCard(charInfo) {
  const { name, data } = charInfo;
  const faction = data?.faction || '人间';
  const title = data?.title || '';
  const desc = data?.desc || '暂无详细描述';
  const image = data?.image || '';
  const tags = data?.tags || [];
  const rank = data?.rank || '';

  const card = document.createElement('div');
  card.className = 'flip-card';
  card.setAttribute('tabindex', '0');

  const inner = document.createElement('div');
  inner.className = 'flip-card-inner';

  // 正面 - 头像和名称
  const front = document.createElement('div');
  front.className = `flip-card-front faction-${getFactionClass(faction)}`;

  const avatar = document.createElement('div');
  avatar.className = 'flip-card-avatar';

  if (image) {
    const img = document.createElement('img');
    img.src = image;
    img.alt = name;
    img.loading = 'lazy';
    img.onerror = () => {
      img.style.display = 'none';
      avatar.textContent = name.charAt(0);
    };
    avatar.appendChild(img);
  } else {
    avatar.textContent = name.charAt(0);
  }

  const nameEl = document.createElement('div');
  nameEl.className = 'flip-card-name';
  nameEl.textContent = name;

  const titleEl = document.createElement('div');
  titleEl.className = 'flip-card-title';
  titleEl.textContent = title;

  const rankEl = document.createElement('div');
  rankEl.className = 'flip-card-rank';
  rankEl.textContent = rank;

  const hint = document.createElement('div');
  hint.className = 'flip-card-hint';
  hint.textContent = '点击查看详情';

  front.appendChild(avatar);
  front.appendChild(nameEl);
  if (title) front.appendChild(titleEl);
  if (rank) front.appendChild(rankEl);
  front.appendChild(hint);

  // 背面 - 详细信息
  const back = document.createElement('div');
  back.className = 'flip-card-back';

  const backName = document.createElement('div');
  backName.className = 'flip-card-back-name';
  backName.textContent = name;

  const backTitle = document.createElement('div');
  backTitle.className = 'flip-card-back-title';
  backTitle.textContent = title;

  const backDesc = document.createElement('div');
  backDesc.className = 'flip-card-back-desc';
  backDesc.textContent = desc;

  const backTags = document.createElement('div');
  backTags.className = 'flip-card-back-tags';
  tags.forEach(tag => {
    const tagEl = document.createElement('span');
    tagEl.className = 'flip-card-tag';
    tagEl.textContent = tag;
    backTags.appendChild(tagEl);
  });

  const backHint = document.createElement('div');
  backHint.className = 'flip-card-back-hint';
  backHint.textContent = '点击返回';

  back.appendChild(backName);
  if (title) back.appendChild(backTitle);
  back.appendChild(backDesc);
  if (tags.length > 0) back.appendChild(backTags);
  back.appendChild(backHint);

  inner.appendChild(front);
  inner.appendChild(back);
  card.appendChild(inner);

  // 点击翻转
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });

  // 键盘支持
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.classList.toggle('flipped');
    }
  });

  return card;
}

/**
 * 创建分组区域
 */
function createCharacterGroup(rankName, characters) {
  const group = document.createElement('div');
  group.className = 'character-group';

  // 分组标题
  const header = document.createElement('div');
  header.className = 'character-group-header';

  const icon = document.createElement('span');
  icon.className = 'character-group-icon';
  icon.textContent = '▼';

  const title = document.createElement('span');
  title.className = 'character-group-title';
  title.textContent = rankName;

  const count = document.createElement('span');
  count.className = 'character-group-count';
  count.textContent = `${characters.length}人`;

  header.appendChild(icon);
  header.appendChild(title);
  header.appendChild(count);

  // 分组内容 - 卡片网格
  const content = document.createElement('div');
  content.className = 'character-group-grid';

  characters.forEach(charInfo => {
    content.appendChild(createFlipCard(charInfo));
  });

  // 展开/折叠事件
  header.addEventListener('click', () => {
    group.classList.toggle('collapsed');
  });

  group.appendChild(header);
  group.appendChild(content);

  return group;
}

/**
 * 渲染人物架构图面板
 */
export async function renderCharacterPanel(container, characters, poiName) {
  if (!container) return;

  // 清空容器
  container.innerHTML = '';

  // 加载人物数据
  const characterData = await loadCharacterData();

  // 创建面板容器
  const panel = document.createElement('div');
  panel.className = 'character-panel';

  // 面板头部
  const header = document.createElement('div');
  header.className = 'character-panel-header';

  const title = document.createElement('h3');
  title.className = 'character-panel-title';
  title.textContent = `${poiName} · 人物架构`;

  const closeBtn = document.createElement('button');
  closeBtn.className = 'character-panel-close';
  closeBtn.textContent = '✕';
  closeBtn.setAttribute('aria-label', '关闭人物面板');

  header.appendChild(title);
  header.appendChild(closeBtn);

  // 面板内容
  const content = document.createElement('div');
  content.className = 'character-panel-content';

  if (!characters || characters.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'character-empty';
    empty.textContent = '暂无相关人物信息';
    content.appendChild(empty);
  } else {
    // 按品级分组
    const groups = groupByRank(characters, characterData);
    groups.forEach((chars, rank) => {
      content.appendChild(createCharacterGroup(rank, chars));
    });
  }

  panel.appendChild(header);
  panel.appendChild(content);
  container.appendChild(panel);

  // 返回详情按钮点击事件
  return closeBtn;
}

/**
 * 清除人物架构图面板
 */
export function clearCharacterPanel(container) {
  if (!container) return;
  container.innerHTML = '';
}
