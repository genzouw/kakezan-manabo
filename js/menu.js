/**
 * メニュー管理モジュール
 */

export class MenuManager {
  constructor() {
    this.menuBtn = document.getElementById('menu-btn');
    this.sideMenu = document.getElementById('side-menu');
    this.closeMenuBtn = document.getElementById('close-menu-btn');
    this.menuItems = document.querySelectorAll('.menu-item');
    this.pageContents = document.querySelectorAll('.page-content');

    this.currentPage = 'main';
    this.init();
  }

  init() {
    // メニューボタンのクリックイベント
    this.menuBtn?.addEventListener('click', () => this.openMenu());

    // 閉じるボタンのクリックイベント
    this.closeMenuBtn?.addEventListener('click', () => this.closeMenu());

    // メニューアイテムのクリックイベント
    this.menuItems.forEach(item => {
      item.addEventListener('click', (e) => this.handleMenuItemClick(e));
    });

    // オーバーレイを作成
    this.createOverlay();
  }

  createOverlay() {
    // オーバーレイ要素を作成
    this.overlay = document.createElement('div');
    this.overlay.className = 'menu-overlay';
    document.body.appendChild(this.overlay);

    // オーバーレイクリックでメニューを閉じる
    this.overlay.addEventListener('click', () => this.closeMenu());
  }

  openMenu() {
    this.sideMenu?.classList.add('open');
    this.overlay?.classList.add('show');
  }

  closeMenu() {
    this.sideMenu?.classList.remove('open');
    this.overlay?.classList.remove('show');
  }

  handleMenuItemClick(e) {
    e.preventDefault();
    const item = e.target;
    const pageName = item.dataset.page;

    if (!pageName) return;

    // ページを切り替え
    this.switchPage(pageName);

    // メニューを閉じる
    this.closeMenu();
  }

  switchPage(pageName) {
    // すべてのページを非表示
    this.pageContents.forEach(content => {
      content.classList.remove('active');
    });

    // すべてのメニューアイテムの選択状態を解除
    this.menuItems.forEach(item => {
      item.classList.remove('active');
    });

    // 指定されたページを表示
    const targetContent = document.getElementById(`${pageName}-content`);
    if (targetContent) {
      targetContent.classList.add('active');
    }

    // 対応するメニューアイテムをアクティブに
    const activeMenuItem = document.querySelector(`.menu-item[data-page="${pageName}"]`);
    if (activeMenuItem) {
      activeMenuItem.classList.add('active');
    }

    // 現在のページを更新
    this.currentPage = pageName;

    // ページ切り替え時にスクロール位置をリセット
    window.scrollTo(0, 0);
  }

  getCurrentPage() {
    return this.currentPage;
  }
}
