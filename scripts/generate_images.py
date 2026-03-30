#!/usr/bin/env python3
"""
为西游记角色生成 AI 图片
使用 Silicon Flow API
"""

import json
import time
import os
import sys

# Silicon Flow API 配置
API_KEY = "sk-tpjytgofddmgezlvvhkmnixyvusmtwkdjnuiybhyjmmuofdr"

# 使用 OpenAI 兼容方式
from openai import OpenAI
client = OpenAI(api_key=API_KEY, base_url="https://api.siliconflow.cn/v1")

# 角色形象描述模板
def generate_ai_prompt(character):
    """根据角色信息生成 AI 图片提示词"""
    name = character.get("name", "")
    desc = character.get("desc", "")
    tags = character.get("tags", [])
    faction = character.get("faction", "")
    rank = character.get("rank", "")
    title = character.get("title", "")

    # 基础提示词
    prompt_parts = []

    # 添加角色名称和身份
    if "唐僧" in name or "玄奘" in name:
        prompt_parts.append("一位年轻俊朗的佛教僧人，身穿金色袈裟，头戴毗卢帽，面容慈悲庄严，手持锡杖和紫金钵盂，站在古寺门前，身后是西行之路")
    elif "沙僧" in name or "沙悟净" in name:
        prompt_parts.append("一位身材高大魁梧的僧人，面色深蓝，脖挂骷髅项链，手持降妖宝杖，身穿深色僧袍，站在流沙河边，表情忠厚老实")
    elif "大鹏金翅雕" in name:
        prompt_parts.append("一只巨大的金翅大鹏鸟，展翅遮天蔽日，羽毛金光闪闪，目光锐利凶狠，爪如钢铁，翱翔在云层之上，背景是巍峨的狮驼岭")
    elif "毗蓝婆" in name:
        prompt_parts.append("一位慈祥的中年女菩萨，身穿素色僧袍，手持一根细小的绣花针，面容温和但目光坚定，站在简朴的修行之地")
    elif "昴日星官" in name:
        prompt_parts.append("一位神仙，身穿华丽的星官服饰，身后隐约显现一只巨大的金色公鸡幻影，手持法器，站立在光明宫中")
    elif "乌巢禅师" in name:
        prompt_parts.append("一位神秘的禅师，盘坐在大树上的鸟巢中，身披简朴僧袍，面容祥和，周围云雾缭绕，仿佛与自然融为一体")
    elif "白无常" in name or "谢必安" in name:
        prompt_parts.append("一位高大的鬼差，面白如纸，舌吐至胸，身穿白色长袍，头戴写有'一见生财'的高帽，手持哭丧棒，阴森可怖")
    elif "黑无常" in name or "范无救" in name:
        prompt_parts.append("一位矮壮的鬼差，面黑如炭，身穿黑色长袍，头戴写有'天下太平'的高帽，手持铁链，表情凶恶")
    elif "牛头" in name:
        prompt_parts.append("一位地府狱卒，人身牛首，头生双角，手持钢叉，身穿差役服饰，站在地狱门口")
    elif "马面" in name:
        prompt_parts.append("一位地府狱卒，人身马首，面长如马，手持铁链，身穿差役服饰，站在地狱门口")
    elif "阎罗王" in name or "阎王" in name:
        prompt_parts.append("一位威严的冥王，身穿黑色龙袍，头戴冕旒，面容严肃，端坐在高大的审判台上，身后是地狱景象")
    elif "判官" in name:
        prompt_parts.append("一位文官打扮的判官，手持生死簿和判官笔，面容严肃但带有人情味，站在案前")
    elif "龙王" in name:
        prompt_parts.append("一位威严的龙王，人身龙首或头生龙角，身穿华丽的龙袍，手持法器，站在水晶宫中")
    elif "菩萨" in rank or "菩萨" in title:
        prompt_parts.append(f"一位庄严的菩萨，{name}，身穿华丽法衣，头戴宝冠，手持法器，盘坐在莲花台上，身后有佛光")
    elif "佛" in rank or "佛" in title or "佛祖" in name:
        prompt_parts.append(f"一位庄严的佛陀，{name}，身披金色袈裟，面容慈悲，盘坐在莲花台上，身后有万丈佛光")
    elif "天尊" in title or "天尊" in rank:
        prompt_parts.append(f"一位威严的道教至尊，{name}，身穿华丽道袍，手持法宝，站在云端，仙气缭绕")
    elif "大帝" in title or "帝君" in rank:
        prompt_parts.append(f"一位威严的天帝，{name}，身穿华丽帝袍，头戴冕旒，手持玉圭，端坐在龙椅上")
    elif "星君" in title or "星官" in rank:
        prompt_parts.append(f"一位仙风道骨的星官，{name}，身穿星辰纹饰的道袍，手持法器，身后有星光闪烁")
    elif "天王" in title or "元帅" in rank:
        prompt_parts.append(f"一位威武的天将，{name}，身披金甲，手持法宝，站立在云端，英姿飒爽")
    elif "天师" in rank:
        prompt_parts.append(f"一位仙风道骨的天师，{name}，身穿道袍，手持拂尘或法器，面容慈祥")
    else:
        # 默认描述
        prompt_parts.append(f"一位西游记中的角色，{name}，{desc}，中国传统绘画风格")

    # 添加艺术风格
    prompt_parts.append("，中国古典绘画风格，水墨画韵味，色彩典雅，细节精致，高质量，8K")

    return "".join(prompt_parts)


def generate_image(prompt, character_name):
    """调用 Silicon Flow API 生成图片"""
    try:
        response = client.images.generate(
            model="Kwai-Kolors/Kolors",
            prompt=prompt,
            size="1024x1024",
            n=1,
            extra_body={
                "step": 20
            }
        )
        if response.data and len(response.data) > 0:
            return response.data[0].url
        return ""
    except Exception as e:
        print(f"  错误: 生成图片失败 - {e}")
        return ""


def main():
    # 读取角色数据
    json_path = "/home/frank/workspace/xiyouji/character-data.json"
    with open(json_path, "r", encoding="utf-8") as f:
        characters = json.load(f)

    print(f"共读取 {len(characters)} 个角色")

    # 找出 aiPrompt 为空或图片为空的角色
    characters_to_process = []
    for char in characters:
        if not char.get("aiPrompt", "").strip():
            characters_to_process.append(char)
        elif not char.get("image", "").strip() and char.get("aiPrompt", "").strip():
            characters_to_process.append(char)

    print(f"需要处理 {len(characters_to_process)} 个角色")

    # 处理每个角色
    for i, char in enumerate(characters_to_process):
        name = char.get("name", "未知")
        print(f"\n[{i+1}/{len(characters_to_process)}] 处理: {name}")

        # 生成或获取 aiPrompt
        if char.get("aiPrompt", "").strip():
            ai_prompt = char["aiPrompt"]
            print(f"  使用已有提示词: {ai_prompt[:100]}...")
        else:
            ai_prompt = generate_ai_prompt(char)
            char["aiPrompt"] = ai_prompt
            print(f"  生成的提示词: {ai_prompt[:100]}...")

        # 检查是否已有图片
        if char.get("image", "").strip():
            print(f"  已有图片，跳过生成")
            continue

        # 调用 API 生成图片
        print(f"  正在生成图片...")
        image_url = generate_image(ai_prompt, name)

        if image_url:
            char["image"] = image_url
            print(f"  图片生成成功: {image_url[:60]}...")
        else:
            print(f"  图片生成失败")

        # 避免请求过快
        if i < len(characters_to_process) - 1:
            time.sleep(2)

    # 保存更新后的数据
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(characters, f, ensure_ascii=False, indent=2)

    print(f"\n处理完成，已保存到 {json_path}")


if __name__ == "__main__":
    main()
