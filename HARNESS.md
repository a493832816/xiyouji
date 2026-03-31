# HARNESS.md - 项目控制逻辑

## Contracts（契约）
- **输入**: SPEC.md 中的需求描述
- **输出**: src/ 中的可运行代码，通过 verify.sh
- **验收门**: `./.hades/contracts/verify.sh` 返回 0
- **停止条件**: 验收通过 或 迭代次数 > 5

## Stages（阶段）
1. UNDERSTAND → 读 SPEC.md，拆分任务，写入 ledger.json
2. PLAN → 生成实现计划，写入 changelog.md
3. EXECUTE → 按计划写代码
4. VERIFY → 运行 verify.sh，失败则回到 PLAN（附失败信息）
5. CLOSE → 验收通过，commit，更新 ledger

## Roles
- **Architect**: 负责拆分任务、技术方案
- **Coder**: 负责写代码
- **Verifier**: 运行测试，不通过则打回

## Failure Taxonomy
- verify_fail → 分析失败原因，修改代码
- build_fail → 修编译错误
- spec_ambiguous → 向用户确认
- timeout → 缩小范围，分步执行

## State Semantics
- ledger.json: 每个任务的 {id, status, attempts, last_error}
- changelog.md: 每次迭代的决策和结果
