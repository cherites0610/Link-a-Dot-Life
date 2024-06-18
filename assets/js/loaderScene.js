class loaderScene extends Phaser.Scene {
    constructor() {
        super({ key: 'loaderScene' });
    }

    preload() {
        this.load.image('promptImage', "/assets/img/public/promptImg.png");
        this.load.image('resetBtn', "/assets/img/public/resetBtn.png");

        this.load.image('backMenuBtn1', "/assets/img/public/backMenuBtn1.png");
        this.load.image('backMenuBtn2', "/assets/img/public/backMenuBtn2.png");
        this.load.image('nextLevelBtn', "/assets/img/public/nextLevelBtn.png");
        this.load.image('restartBtn', "/assets/img/public/restartBtn.png");
        this.load.image('backBtn', "/assets/img/public/backBtn.png");

        const IUrl = "/assets/img/public/line/"
        for (let i = 1; i < 5; i++) {
            for (let j = 1; j < 5; j++) {
                const fileName = "line" + i + (String.fromCharCode(j + 96));
                this.load.image(fileName, IUrl + fileName + ".png")
            }
        }

        

        // 创建进度条的背景和填充
        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(this.cameras.main.width / 2 - 160, this.cameras.main.height / 2 - 25, 320, 50);

        this.load.on('progress', function (value) {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(this.cameras.main.width / 2 - 150, this.cameras.main.height / 2 - 20, 300 * value, 30);

            loadingText.setText('Loading... ' + Math.round(value * 100) + '%');
        }, this);

        let loadingText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 - 50, 'Loading...', { font: '32px Arial', fill: '#ffffff' }).setOrigin(0.5);
    }

    create() {
        // 當加載完成後，啟動主菜單場景或其他場景
        this.scene.start('start');
    }
}