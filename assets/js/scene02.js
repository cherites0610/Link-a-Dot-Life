class scene02 extends Phaser.Scene {


    constructor() {
        super({ key: 'scene02' })
        this.level = 2;
        this.itemNum = constants.LevelPassNum[this.level - 1];
        this.gameIndex = JSON.parse(JSON.stringify(constants.GameIndex[this.level - 1]));;
        this.promptItem = [];
        this.historyClickIndex = [];
        this.clickNum = 0;
        this.selectItem;
        this.LineGroup = [];
        this.success = 0;
        this.mask;
        this.timer;
        this.cellGroup;
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
        console.log(this.gameIndex);
        util.createGame(this);
    }
}