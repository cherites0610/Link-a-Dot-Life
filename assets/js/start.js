class start extends Phaser.Scene {
    constructor() {
        super({key: 'start'})
    }

    preload() {
        // 预加载资源
    }

    create() {
        // 添加文本以指示如何启动游戏
        this.add.text(100, 100, '點擊開始遊戲', { fill: '#0f0' });

        // 点击事件监听器，切换到GameScene
        this.input.on('pointerdown', () => {
            this.scene.start('scene01');
        });
    }
}