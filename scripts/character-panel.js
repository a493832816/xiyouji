/**
 * 人物架构图面板模块
 * 用于在 POI 详情中展示相关人物信息
 */

/**
 * 根据势力获取对应的 CSS 类名
 * @param {string} faction - 势力名称
 * @returns {string} CSS 类名
 */
function getFactionClass(faction) {
  const factionMap = {
    '天庭': 'heaven',
    '灵山': 'ling-shan',
    '地府': 'difu',
    '龙宫': 'longgong',
    '人间': 'renjian'
  };
  return factionMap[faction] || 'default';
}

/**
 * 按品级分组角色
 * @param {Array} characters - 角色数组
 * @returns {Map} 品级 → 角色列表的映射
 */
function groupByRank(characters) {
  const groups = new Map();
  
  // 定义品级排序权重（品级越高，权重越小，排在前面）
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
    '斗战胜佛': 41,
    '净坛使者': 42,
    '金身罗汉': 43,
    '八部天龙': 44,
    '天庭·星官': 45,
    '妖怪·顶级': 46
  };

  characters.forEach(char => {
    const rank = char.rank || '其他';
    if (!groups.has(rank)) {
      groups.set(rank, []);
    }
    groups.get(rank).push(char);
  });

  // 按权重排序分组
  const sortedGroups = new Map();
  const sortedRanks = Array.from(groups.keys()).sort((a, b) => {
    const weightA = rankWeights[a] || 999;
    const weightB = rankWeights[b] || 999;
    return weightA - weightB;
  });

  sortedRanks.forEach(rank => {
    sortedGroups.set(rank, groups.get(rank));
  });

  return sortedGroups;
}

/**
 * 创建角色卡片
 * @param {Object} character - 角色数据
 * @returns {HTMLElement} 角色卡片元素
 */
function createCharacterCard(character) {
  const card = document.createElement('div');
  card.className = 'character-card';

  // 头像
  const avatar = document.createElement('div');
  avatar.className = `character-avatar faction-${getFactionClass(character.faction)}`;
  
  if (character.image) {
    const img = document.createElement('img');
    img.src = character.image;
    img.alt = character.name;
    img.loading = 'lazy';
    avatar.appendChild(img);
  } else {
    avatar.textContent = character.name.charAt(0);
  }

  // 信息区
  const info = document.createElement('div');
  info.className = 'character-info';

  // 姓名
  const name = document.createElement('h4');
  name.className = 'character-name';
  name.textContent = character.name;

  // 称号
  if (character.title) {
    const title = document.createElement('p');
    title.className = 'character-title';
    title.textContent = character.title;
    info.appendChild(title);
  }

  // 简介
  if (character.desc) {
    const desc = document.createElement('p');
    desc.className = 'character-desc';
    desc.textContent = character.desc;
    info.appendChild(desc);
  }

  // 标签
  if (character.tags && character.tags.length > 0) {
    const tags = document.createElement('div');
    tags.className = 'character-tags';
    character.tags.forEach(tagText => {
      const tag = document.createElement('span');
      tag.className = 'character-tag';
      tag.textContent = tagText;
      tags.appendChild(tag);
    });
    info.appendChild(tags);
  }

  card.appendChild(avatar);
  card.appendChild(info);

  return card;
}

/**
 * 创建分组区域
 * @param {string} rankName - 品级名称
 * @param {Array} characters - 角色列表
 * @returns {HTMLElement} 分组元素
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

  // 分组内容
  const content = document.createElement('div');
  content.className = 'character-group-content';
  
  characters.forEach(char => {
    content.appendChild(createCharacterCard(char));
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
 * @param {HTMLElement} container - 容器元素
 * @param {Array} characters - 角色数组
 * @param {string} poiName - POI 名称
 */
export function renderCharacterPanel(container, characters, poiName) {
  if (!container) return;

  // 清空容器
  container.innerHTML = '';

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
    const groups = groupByRank(characters);
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
 * @param {HTMLElement} container - 容器元素
 */
export function clearCharacterPanel(container) {
  if (!container) return;
  container.innerHTML = '';
}
