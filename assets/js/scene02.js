class scene2 extends Phaser.Scene {
    constructor() {
        super({ key: 'scene2' })
        this.level = 2;
        this.itemNum = constants.LevelPassNum[this.level - 1];
        this.gameIndex = JSON.parse(JSON.stringify(util.getGameIndex()));;
        this.tempGameIndex = JSON.stringify(this.gameIndex);
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
        const FUrl = "/assets/img/" + this.level + "/";
        this.load.image('bg' + this.level, FUrl + "bg.png");
        this.load.image('fail' + this.level, FUrl + "fail.png");
        this.load.image('success' + this.level, FUrl + "success.png");
    }

    create() {
        util.createGame(this);
    }
}