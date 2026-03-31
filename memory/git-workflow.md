---
name: git-workflow
description: Git 分支管理规则：dev 本地更新，main 合并时推送
type: feedback
---

## 规则

**dev 分支**：本地开发，不推送到 GitHub
- 日常开发在 dev 分支进行
- 每次更新只提交到本地，不执行 `git push`
- 使用 `git commit` 保存进度

**main 分支**：合并时才推送到 GitHub
- 只有当用户明确要求"合并到 main"时才执行合并
- 合并流程：`git checkout main` → `git merge dev` → `git push`

**README 更新**：每次功能变更需同步更新 README
- 新增功能时更新功能列表
- 修改配置时更新使用说明
- 保持 README 与代码同步

## Why
- dev 分支频繁推送会产生大量无意义的 commit 记录
- 只在合并到 main 时推送，保持 GitHub 历史清晰
- README 是项目门面，需要与实际功能保持一致

## How to apply
- 开发完成后只执行 `git add` + `git commit`
- 用户要求合并时才执行完整推送流程
- 每次 commit 前检查是否需要更新 README
