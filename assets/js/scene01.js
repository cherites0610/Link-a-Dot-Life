class scene1 extends Phaser.Scene {


    constructor() {
        super({ key: 'scene1' })
        this.level = 1;
        this.itemNum = constants.LevelPassNum[this.level - 1];
        this.gameIndex = JSON.parse(JSON.stringify(util.getGameIndex()));
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

    }

    create() {
        util.createGame(this);
    }
}