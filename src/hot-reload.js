/**
 * 热加载模块
 * 在开发环境下自动检测文件变化并刷新页面
 */

class HotReloader {
  constructor(options = {}) {
    this.interval = options.interval || 1000; // 检测间隔（毫秒）
    this.files = options.files || [
      'index.html',
      'scripts/main.js',
      'scripts/poi-data.js',
      'scripts/map-renderer.js',
      'scripts/map-controls.js',
      'scripts/map-utils.js',
      'scripts/character-panel.js',
      'styles/base.css',
      'styles/map.css',
      'styles/poi.css',
      'styles/character-panel.css',
      'character-data.json'
    ];
    this.fileTimestamps = new Map();
    this.enabled = options.enabled !== false;
    this.timer = null;
    this.indicator = null;
  }

  /**
   * 启动热加载
   */
  start() {
    if (!this.enabled) {
      console.log('[HotReload] 热加载已禁用');
      return;
    }

    // 检查是否在本地开发环境
    const isLocal = location.hostname === 'localhost' ||
                   location.hostname === '127.0.0.1' ||
                   location.hostname.startsWith('192.168.');

    if (!isLocal) {
      console.log('[HotReload] 非本地环境，热加载已跳过');
      return;
    }

    console.log('[HotReload] 热加载已启动，监听文件变化...');

    // 创建指示器
    this.createIndicator();

    // 初始记录文件时间戳
    this.checkFiles(true);

    // 启动定时检测
    this.timer = setInterval(() => this.checkFiles(), this.interval);
  }

  /**
   * 停止热加载
   */
  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    if (this.indicator) {
      this.indicator.remove();
      this.indicator = null;
    }
    console.log('[HotReload] 热加载已停止');
  }

  /**
   * 创建状态指示器
   */
  createIndicator() {
    this.indicator = document.createElement('div');
    this.indicator.className = 'hot-reload-indicator';
    this.indicator.innerHTML = `
      <div class="hot-reload-icon">🔄</div>
      <div class="hot-reload-text">热加载中</div>
    `;
    document.body.appendChild(this.indicator);
  }

  /**
   * 显示更新提示
   */
  showUpdateNotification(filename) {
    if (!this.indicator) return;

    this.indicator.classList.add('updating');
    this.indicator.querySelector('.hot-reload-text').textContent = `更新: ${filename}`;

    setTimeout(() => {
      this.indicator.classList.remove('updating');
      this.indicator.querySelector('.hot-reload-text').textContent = '热加载中';
    }, 1000);
  }

  /**
   * 检查文件变化
   */
  async checkFiles(initial = false) {
    for (const file of this.files) {
      try {
        const response = await fetch(`${file}?t=${Date.now()}`, {
          method: 'HEAD'
        });

        if (!response.ok) continue;

        const lastModified = response.headers.get('Last-Modified');
        const currentTimestamp = lastModified ? new Date(lastModified).getTime() : Date.now();
        const previousTimestamp = this.fileTimestamps.get(file);

        if (initial) {
          this.fileTimestamps.set(file, currentTimestamp);
        } else if (previousTimestamp && currentTimestamp > previousTimestamp) {
          console.log(`[HotReload] 检测到文件变化: ${file}`);
          this.fileTimestamps.set(file, currentTimestamp);
          this.showUpdateNotification(file);

          // 延迟刷新，确保文件已保存完成
          setTimeout(() => {
            location.reload();
          }, 300);
          return;
        }
      } catch (error) {
        // 忽略网络错误
      }
    }
  }
}

// 自动启动热加载
const hotReload = new HotReloader({
  enabled: false, // 禁用热加载，避免频繁刷新
  interval: 1000
});

// DOM 加载完成后启动
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => hotReload.start());
} else {
  hotReload.start();
}

// 导出供外部使用
window.hotReload = hotReload;

export { HotReloader };
