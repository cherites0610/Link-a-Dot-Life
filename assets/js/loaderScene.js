class loaderScene extends Phaser.Scene {
    constructor() {
        super({ key: 'loaderScene' });
    }

    preload() {
        this.load.image('promptImage', "/assets/img/public/test.png");
        this.load.image('resetBtn', "/assets/img/public/resetBtn.png");
        this.load.image('fail', "/assets/img/public/fail.png");
        this.load.image('success', "/assets/img/public/success.png");
        this.load.image('backMenuBtn', "/assets/img/public/backMenuBtn.jpg");
        this.load.image('nextLevelBtn', "/assets/img/public/nextLevelBtn.png");

        const IUrl = "/assets/img/public/line/"
        for (let i = 1; i < 5; i++) {
            for (let j = 1; j < 5; j++) {
                const fileName = "line" + i + (String.fromCharCode(j + 96));
                this.load.image(fileName, IUrl + fileName + ".png")
            }
        }

        //進度條
        let loadingText = this.add.text(400, 300, 'Loading...', { font: '32px Arial', fill: '#ffffff' }).setOrigin(0.5);
        this.load.on('progress', function (value) {
            loadingText.setText('Loading... ' + Math.round(value * 100) + '%');
        });
    }

    create() {
        // 當加載完成後，啟動主菜單場景或其他場景
        this.scene.start('scene02');
    }
}