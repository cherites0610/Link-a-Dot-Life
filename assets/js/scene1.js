class scene01 extends Phaser.Scene {
    constructor() {
        super({ key: 'scene01' })
        this.level = 1;
        this.itemNum = constants.LevelPassNum[this.level - 1];
        this.gameIndex = constants.GameIndex[this.level - 1];
        this.promptText;
        this.lastClick = 0;
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
        this.load.image('bg', FUrl + "bg.png");
    }

    create() {
        //顯示背景
        this.add.image(0, 0, 'bg').setOrigin(0, 0);

        //顯示物品
        const cellGroup = this.add.group();
        const itemGroup = this.add.group();
        for (let i = 1; i < this.itemNum; i++) {
            //i是當前物品的編號

            let count = 0; //0為a 1為b

            for (let y = 0; y < this.gameIndex.length; y++) {
                //y是物品所在位置的y位置
                for (let x = 0; x < this.gameIndex[y].length; x++) {
                    let xIndex = 695 + (x * constants.GridWidth);
                    let yIndex = 210 + (y * constants.GridHeight);
                    //x是物品所在位置的x位置
                    const cell = this.add.rectangle(xIndex, yIndex, constants.GridWidth, constants.GridHeight, 0x000000, 0);
                    cell.setInteractive();
                    cell.on('pointerdown', (pointer) => this.clickGrid(pointer));
                    cellGroup.add(cell);

                    if (this.gameIndex[y][x] == i) {
                        count++;
                        const fileName = (String.fromCharCode(i + 96)) + count;
                        const item = itemGroup.create(xIndex, yIndex, fileName).setScale(0.09);

                        item.setInteractive();
                        item.setDepth(constants.ItemDepth)
                        item.setData('id', fileName);
                        item.on('pointerdown', (pointer) => this.clickItem(pointer, item));
                    }
                }
            }
        }
    }

    clickItem = (pointer, item) => {
        const x = parseInt((pointer.x - 583.75) / constants.GridWidth)
        const y = parseInt((pointer.y - 100) / constants.GridHeight);

        if (this.promptText) {
            //判斷是否有點擊過
            if (this.promptText.text.split(":")[1] === item.getData('id')) {
                //點擊相同物品
                this.lastClick = 0;
                this.promptText.setText('');
                return;
            }
            
            this.drawLineBetweenImages(this,this.lastClick,item)

            this.promptText.setText('');
        }
        this.promptText = this.add.text(0, 0, '當前選中:' + item.getData('id'), { fontSize: 32, color: '0x000000' });
        this.promptText.setPosition(1000, 10).setOrigin(0, 0);
        this.lastClick = item;
    }

    clickGrid = (pointer) => {
        if (this.lastClick == 0) {
            //顯示未選取物品提示
            const promptText = this.add.text(0, 0, '暫未選中物品', { fontSize: 32, color: '0x000000' });
            promptText.setPosition(this.cameras.main.centerX, this.cameras.main.centerY).setOrigin(0, 0);
            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    promptText.setVisible(false);
                },
                callbackScope: this,
                loop: false,
            });
            promptText.setVisible(true);
            return;
        }

        const x = parseInt((pointer.x - 583.75) / constants.GridWidth)
        const y = parseInt((pointer.y - 100) / constants.GridHeight);
        // console.log(x, y);
        // console.log("lastClick:" + this.lastClick.getData('id'));
    }

    drawLineBetweenImages(scene, image1, image2) {
        // 获取两张图片的位置
        let x1 = image1.x
        let y1 = image1.y
        let x2 = image2.x
        let y2 = image2.y

        // 创建图形对象
        let graphics = scene.add.graphics();

        // 设置线条样式
        graphics.lineStyle(10, 0xff0000, 1); // 红色线条，宽度为2

        // 绘制线条
        graphics.beginPath();
        graphics.moveTo(x1, y1);
        graphics.lineTo(x2, y2);
        graphics.strokePath();
    }
}