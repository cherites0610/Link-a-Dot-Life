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
        goBackBtn.on('pointerdown', () => this.goBack())

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
                    cell.on('pointerdown', (pointer) => this.clickGrid(pointer));
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

    goBack = () => {
        const gameIndex = JSON.parse(JSON.stringify(constants.GameIndex[this.level - 1]));
        let lastClickIndex = this.historyClickIndex[this.historyClickIndex.length - 1];
        if (this.historyClickIndex.length == 0) {
            //一步都沒有記錄
            return;
        }

        if (this.historyClickIndex.length == 1) {
            //一步都沒有記錄

            util.setPrompt(this.promptItem, false);

            this.clickNum = this.clickNum - 1;
            this.historyClickIndex.pop()

            this.LineGroup.pop();
            this.selectItem = null;
            this.gameIndex[lastClickIndex[1]][lastClickIndex[0]] = gameIndex[lastClickIndex[1]][lastClickIndex[0]]
            return;
        }

        let currentLineGroup = this.LineGroup[this.LineGroup.length - 1]

        let lastLine = currentLineGroup.getChildren()[currentLineGroup.getChildren().length - 1];

        let lastlastClickIndex = this.historyClickIndex[this.historyClickIndex.length - 2];

        if (currentLineGroup.getChildren().length == 1) {
            if (gameIndex[lastlastClickIndex[1]][lastlastClickIndex[0]] != 0) {
                //要返回的步是第二次格子
                util.setPrompt(this.promptItem, true, lastlastClickIndex);
                this.gameIndex[lastClickIndex[1]][lastClickIndex[0]] = gameIndex[lastClickIndex[1]][lastClickIndex[0]]
                lastLine.destroy();
            }
        } else {
            if (gameIndex[lastClickIndex[1]][lastClickIndex[0]] == 0) {
                //上一步點擊的是綫條
                this.gameIndex[lastClickIndex[1]][lastClickIndex[0]] = gameIndex[lastClickIndex[1]][lastClickIndex[0]]
                lastLine.destroy();
                util.setPrompt(this.promptItem, true, lastlastClickIndex);

                util.RecoveryLine(this);

            } else {
                let lastItemIndex = this.historyClickIndex[this.clickNum - (currentLineGroup.getChildren().length + 2)]
                this.gameIndex[lastClickIndex[1]][lastClickIndex[0]] = gameIndex[lastClickIndex[1]][lastClickIndex[0]]
                this.selectItem = gameIndex[lastItemIndex[1]][lastItemIndex[0]]
                if (gameIndex[lastlastClickIndex[1]][lastlastClickIndex[0]] != 0) {
                    //上上次是物品
                    util.setPrompt(this.promptItem, false, lastlastClickIndex);
                    this.LineGroup.pop();
                    this.selectItem = null;
                } else {
                    //上上次是綫
                    util.setPrompt(this.promptItem, true, lastlastClickIndex);

                    if (gameIndex[lastClickIndex[1]][lastClickIndex[0]] == this.selectItem) {
                        this.success -= 1;
                    }
                    util.RecoveryLine(this);
                    //還要判斷有沒有贏
                }


            }
        }

        this.clickNum = this.clickNum - 1;
        this.historyClickIndex.pop()
    }

    clickGrid = (pointer) => {
        const x = parseInt((pointer.x - (constants.Screen[0] - constants.Grid[0] / 2)) / constants.Grid[0])
        const y = parseInt((pointer.y - (constants.Screen[1] - constants.Grid[1] / 2)) / constants.Grid[1]);
        let lastClickIndex = this.historyClickIndex[this.historyClickIndex.length - 1];


        if (this.selectItem) {
            //上次有點擊到物品

            if (Math.abs(lastClickIndex[0] - x) + Math.abs(lastClickIndex[1] - y) == 1) {
                //點擊有相連

                if (this.selectItem + 80 == this.gameIndex[y][x]) {
                    //點擊到選中的物品

                } else if (this.selectItem + 90 == this.gameIndex[y][x]) {
                    //點擊到上一次點擊的地方

                } else if (this.gameIndex[y][x] >= 80) {
                    //點擊到不能點的地方

                } else if (this.gameIndex[y][x] != 0 && this.gameIndex[y][x] < 90) {
                    //第二次點到物品

                    //記錄物品已被使用
                    this.gameIndex[y][x] = 80 + this.gameIndex[y][x]

                    //關閉提醒
                    util.setPrompt(this.promptItem, false);

                    if ((this.gameIndex[y][x] - 80) == this.selectItem) {
                        //點到正確的物品
                        this.success = this.success + 1;
                        if (this.success == this.itemNum) {
                            this.add.image(500, 250, 'success').setOrigin(0, 0).setScale(0.3).setDepth(3);
                        }
                    } else {
                        //點到錯誤的物品
                    }

                    //更改上一次點擊的綫條
                    util.changeLastLine(this, x, y);
                    this.selectItem = null;

                    //記錄有效點擊
                    this.historyClickIndex.push([x, y]);
                    this.clickNum = this.clickNum + 1;
                } else {
                    //點到綫格子

                    //設定提醒
                    util.setPrompt(this.promptItem, true, [x, y]);
                    //更改綫條以及畫綫
                    util.changeLastLine(this, x, y);
                    util.drawLine(this, x, y)

                    //記錄有效點擊
                    this.historyClickIndex.push([x, y]);
                    this.clickNum = this.clickNum + 1;
                }

            } else {
                //點擊沒有相連
            }
        } else {
            //上次沒有點擊到物品

            if (this.gameIndex[y][x] != 0) {
                //第一次點擊物品
                this.LineGroup.push(this.add.group());
                //高亮提示
                util.setPrompt(this.promptItem, true, [x, y]);
                //記錄物品已被使用
                this.selectItem = this.gameIndex[y][x];
                this.gameIndex[y][x] = 80 + this.selectItem

                //記錄有效點擊
                this.historyClickIndex.push([x, y]);
                this.clickNum = this.clickNum + 1;
            } else {
                //這次一樣沒點到物品
            }
        }

    }
}