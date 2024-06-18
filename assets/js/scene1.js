class scene01 extends Phaser.Scene {


    constructor() {
        super({ key: 'scene01' })
        this.level = 1;
        this.itemNum = constants.LevelPassNum[this.level - 1];
        this.gameIndex = JSON.parse(JSON.stringify(constants.GameIndex[this.level - 1]));;
        this.promptItem = [];
        this.historyClickIndex = [];
        this.clickNum = 0;
        this.selectItem;
        this.LineGroup = [];
        this.success = 0;
        this.timerEvent;
        // 初始化計時器和相關變量
        this.initialTime = 100; // 設置倒計時初始時間（100秒）
        this.timeLeft = this.initialTime;
        this.timerText;
    }

    preload() {
        //導入圖片
        const FUrl = "/assets/img/0" + this.level + "/";
        for (let i = 1; i < 5; i++) {
            for (let j = 1; j < 3; j++) {
                const fileName = (String.fromCharCode(i + 96)) + j;
                this.load.image(fileName, FUrl + fileName + ".png")
            }
        }
        this.load.image('promptImage', "/assets/img/public/test.png");
        this.load.image('resetBtn', "/assets/img/public/resetBtn.png");
        this.load.image('fail', "/assets/img/public/fail.png");
        this.load.image('success', "/assets/img/public/success.png");
        this.load.image('gohomeBtn', "/assets/img/public/gohome.jpg");

        const IUrl = "/assets/img/public/line/"
        for (let i = 1; i < 5; i++) {
            for (let j = 1; j < 5; j++) {
                const fileName = "line" + i + (String.fromCharCode(j + 96));
                this.load.image(fileName, IUrl + fileName + ".png")
            }
        }
        this.load.image('bg', FUrl + "bg.png");
    }

    create() {
        //背景
        this.add.image(0, 0, 'bg').setOrigin(0, 0);

        //提示
        this.promptItem.push(this.add.text(0, 0, '當前選中:無', { fontSize: 32, color: '0x000000' }).setPosition(1000, 20).setOrigin(0, 0));
        this.promptItem.push(this.add.image(constants.Screen[0], constants.Screen[1], 'promptImage').setDepth(0).setVisible(false))

        //重置按鈕
        const resetBtn = this.add.image(constants.resetBtn[0], constants.resetBtn[1], 'resetBtn').setOrigin(0, 0).setScale(constants.resetBtn[2]);
        resetBtn.setInteractive();
        resetBtn.on('pointerdown', () => util.handleClickresetBtn(this))

        //退回上一步按鈕
        const goBackBtn = this.add.image(constants.goBackBtn[0], constants.goBackBtn[1], 'resetBtn').setOrigin(0, 0).setScale(constants.goBackBtn[2]);
        goBackBtn.setInteractive();
        goBackBtn.on('pointerdown', () => util.onClickBackBtn(this))

        //顯示物品
        const cellGroup = this.add.group();
        for (let i = 1; i < this.itemNum + 1; i++) {
            //i是當前物品的編號

            let count = 0; //0為a 1為b

            for (let y = 0; y < this.gameIndex.length; y++) {
                //y是物品所在位置的y位置
                for (let x = 0; x < this.gameIndex[y].length; x++) {
                    let xIndex = constants.Screen[0] + (x * constants.Grid[0]);
                    let yIndex = constants.Screen[1] + (y * constants.Grid[1]);
                    //x是物品所在位置的x位置

                    const cell = this.add.rectangle(xIndex, yIndex, constants.Grid[0], constants.Grid[1], 0x000000, 0);
                    cell.setInteractive();
                    cell.on('pointerdown', (pointer) => util.onClickGrid(this, pointer));
                    cellGroup.add(cell);

                    if (this.gameIndex[y][x] == i) {
                        count++;
                        const fileName = (String.fromCharCode(i + 96)) + count;
                        this.add.image(xIndex, yIndex, fileName).setScale(constants.Item[2]).setData('id', fileName).setData('index', [x, y]).setDepth(constants.Item[3]);
                    }
                }
            }
        }
    }
}