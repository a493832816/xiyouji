#!/bin/bash
set -e

echo "=== HARNESS Verify ==="
echo ""

echo "运行 Vitest 单元测试..."
npm test -- --run

echo ""
echo "✓ 验收通过"
