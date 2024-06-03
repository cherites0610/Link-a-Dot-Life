class scene01 extends Phaser.Scene {
    constructor() {
        super({ key: 'scene01' })
        this.level = 1;
        this.itemNum = constants.LevelPassNum[this.level - 1];
        this.gameIndex = constants.GameIndex[this.level - 1];
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
        let lastClick;

        //顯示背景
        this.add.image(0, 0, 'bg').setOrigin(0, 0);

        //顯示物品
        const group = this.add.group();
        for (let i = 1; i < this.itemNum; i++) {
            //i是當前物品的編號

            let count = 0; //0為a 1為b

            for (let y = 0; y < this.gameIndex.length; y++) {
                //y是物品所在位置的y位置
                for (let x = 0; x < this.gameIndex[y].length; x++) {
                    //x是物品所在位置的x位置
                    if (this.gameIndex[y][x] == i) {
                        count++;
                        const fileName = (String.fromCharCode(i + 96)) + count;
                        const item = group.create(695 + (x * constants.GridWidth), 210 + (y * constants.GridHeight), fileName).setScale(0.09);

                        item.setInteractive();
                        item.on('pointerdown', () => {
                            console.log(`Item ${fileName} clicked!`);
                        });
                    }
                }
            }
        }
    }
}