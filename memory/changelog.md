# 迭代日志

## 2026-03-31 - 初始化 HARNESS 结构

### 决策
- 采用 Vitest 作为测试框架
- 使用默认三角色模式
- scripts/ 迁移至 src/

### 完成
- ✅ 创建目录结构：memory/, .hades/contracts/, src/, tests/unit/, tests/browser/
- ✅ 创建核心文档：HARNESS.md, SPEC.md, AGENTS.md
- ✅ 创建状态文件：ledger.json, changelog.md
- ✅ 创建验证脚本：verify.sh, lint.sh
- ✅ 迁移 scripts/ 到 src/
- ✅ 更新 index.html 引用
- ✅ 配置 Vitest 和 package.json
- ✅ 编写 poi-data.js 单元测试 (9 tests passing)

### 待办
- [ ] 添加 ESLint 配置 (T005)
