import { readFileSync, writeFileSync } from 'fs';

// The raw API response - we'll read from stdin
const input = readFileSync('/dev/stdin', 'utf8');
const data = JSON.parse(input);

const records = data.records.map(r => {
  const f = r.fields;
  const getText = arr => Array.isArray(arr) && arr.length > 0 ? arr[0].text : '';
  const getImg = obj => obj && obj.link ? obj.link : '';
  return {
    name: getText(f['姓名']),
    faction: getText(f['势力']),
    rank: getText(f['品级']),
    title: getText(f['称号']),
    desc: getText(f['简介']),
    appearance: getText(f['形象描写']),
    tags: Array.isArray(f['标签']) ? f['标签'] : [],
    aiPrompt: getText(f['AI提示词']),
    image: getImg(f['图片链接']),
    recordId: r.record_id
  };
});

writeFileSync('character-data.json', JSON.stringify(records, null, 2));
console.log(`Saved ${records.length} characters to character-data.json`);
