class end extends Phaser.Scene {
    constructor() {
        super({key: 'end'})
    }

    preload() {
        // 预加载资源
    }

    create() {
        // 添加文本以指示如何启动游戏
        this.add.text(100, 100, 'End', { fill: '#0f0' });

        // 点击事件监听器，切换到GameScene
        this.input.on('pointerdown', () => {
            this.scene.start('start');
        });
    }
}