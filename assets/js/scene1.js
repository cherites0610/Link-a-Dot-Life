class scene01 extends Phaser.Scene {
    constructor() {
        super({ key: 'scene01' })
    }

    preload() {
        this.load.image('bg', '/assets/img/01/bg.png');
        this.load.image('start', '/assets/img/public/start.png')
        this.load.image('end', '/assets/img/public/end.png')
    }

    create() {
        this.add.image(0, 0, 'bg').setOrigin(0, 0).setScale(0.4);
        let start = this.add.image(200, 200, 'start').setScale(0.1);
        let end = this.add.image(1000, 200, 'end').setScale(0.1);

        // 绘制一个绿色的长方形
        let graphics = this.add.graphics();
        graphics.fillStyle(0x00ff00, 1.0);  // 绿色，完全不透明
        graphics.fillRect(0, 0, 100, 200);  // 绘制长方形（x, y, width, height）

        // 创建文本对象
        let text = this.add.text(10, 90, '结束游戏', { fill: '#ffffff' });  // 文本居中

        // 创建一个容器，并将长方形和文本添加到容器中
        let container = this.add.container(1000, 1000);  // 容器位置（x, y）
        container.setSize(100, 200)
        container.add(graphics);
        container.add(text);

        // 使容器可点击
        container.setSize(100, 200);  // 设置容器的大小
        this.add.existing(container);  // 添加容器到场景
        container.setInteractive();  // 确保交互区域正确
        container.on('pointerdown', () => {
            console.log("123")
            this.scene.start('end');  // 点击容器切换回MainMenu场景
        });
        drawLineBetweenImages(this, start, end);


        // 创建方法来连接两张图片
        function drawLineBetweenImages(scene, image1, image2) {
            // 获取两张图片的位置
            let x1 = image1.x
            let y1 = image1.y
            let x2 = image2.x
            let y2 = image2.y

            // 创建图形对象
            let graphics = scene.add.graphics();

            // 设置线条样式
            graphics.lineStyle(50, 0xff0000, 1); // 红色线条，宽度为2

            // 绘制线条
            graphics.beginPath();
            graphics.moveTo(x1, y1);
            graphics.lineTo(x2, y2);
            graphics.strokePath();
        }
    }
}