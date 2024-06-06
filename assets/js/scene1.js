class scene01 extends Phaser.Scene {
    

    constructor() {
        super({ key: 'scene01' })
        this.level = 1;
        this.itemNum = constants.LevelPassNum[this.level - 1];
        this.gameIndex = constants.GameIndex[this.level - 1];
        this.promptText;
        this.lastClickIndex = [-1, -1];
        this.IsSelectItem = false;
        this.lastItem;
        this.LineGroup;
        this.lastLineDirection;
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

        this.load.image('fail', "/assets/img/public/fail.png");
        this.load.image('gohome', "/assets/img/public/gohome.jpg");
        this.load.image('line1', FUrl + "line1.png");
        this.load.image('line2', FUrl + "line2.png");
        this.load.image('line3', FUrl + "line3.png");
        this.load.image('line4', FUrl + "line4.png");
        this.load.image('bg', FUrl + "bg.png");
    }

    create() {
        this.LineGroup =this.add.group();

        //顯示背景
        this.add.image(0, 0, 'bg').setOrigin(0, 0);
        // this.add.image(590, 610, 'gohome').setOrigin(0, 0).setScale(0.09).setDepth(4);
        // this.add.image(500, 250, 'fail').setOrigin(0, 0).setScale(0.3).setDepth(3);

        //顯示提示文字
        this.promptText = this.add.text(0, 0, '當前選中:無', { fontSize: 32, color: '0x000000' });
        this.promptText.setPosition(1000, 20).setOrigin(0, 0);

        //顯示物品
        const cellGroup = this.add.group();
        const itemGroup = this.add.group();
        for (let i = 1; i < this.itemNum + 1; i++) {
            //i是當前物品的編號

            let count = 0; //0為a 1為b

            for (let y = 0; y < this.gameIndex.length; y++) {
                //y是物品所在位置的y位置
                for (let x = 0; x < this.gameIndex[y].length; x++) {
                    let xIndex = constants.ScreenWidth + (x * constants.GridWidth);
                    let yIndex = constants.ScreenHeight + (y * constants.GridHeight);
                    //x是物品所在位置的x位置

                    const cell = this.add.rectangle(xIndex, yIndex, constants.GridWidth, constants.GridHeight, 0x000000, 0);
                    cell.setInteractive();
                    cell.on('pointerdown', (pointer) => this.clickGrid(pointer));
                    cellGroup.add(cell);

                    if (this.gameIndex[y][x] == i) {
                        count++;
                        const fileName = (String.fromCharCode(i + 96)) + count;
                        const item = itemGroup.create(xIndex, yIndex, fileName).setScale(constants.ItemScale).setData('id', fileName).setData('index', [x, y]);
                        itemGroup.add(item);
                    }
                }
            }
        }
    }

    clickGrid = (pointer) => {
        const x = parseInt((pointer.x - (constants.ScreenWidth - constants.GridWidth / 2)) / constants.GridWidth)
        const y = parseInt((pointer.y - (constants.ScreenHeight - constants.GridHeight / 2)) / constants.GridHeight);

        if (this.IsSelectItem) {
            //上次有點擊到物品
            if (Math.abs(this.lastClickIndex[0] - x) + Math.abs(this.lastClickIndex[1] - y) == 1) {
                //點擊有相連
                
                //第二次點到物品
                if (this.gameIndex[y][x] != 0) {

                    if (this.gameIndex[y][x] == this.lastItem) {
                        //點到正確的物品
                        console.log("true")
                    } else {
                        //錯誤的物品
                        console.log("false")
                    }

                    this.promptText.setText('當前:' + '無');
                    this.IsSelectItem = false; 
                    this.lastItem = null;
                    this.lastLine = null;

                }else{
                    //畫綫
                    var line = this.add.image(constants.ScreenWidth+(constants.GridWidth*x),constants.ScreenHeight+(constants.GridHeight*y),'line4').setScale(constants.LineScale);
                    var lastLine = this.LineGroup.getChildren()[this.LineGroup.getChildren().length-1];

                    if(lastLine){
                        if((x-this.lastClickIndex[0])==0){
                            if(y-this.lastClickIndex[1]<0){
                                //向下點
                                if(this.lastLineDirection==1){
                                    lastLine.setTexture('line3')
                                }else if(this.lastLineDirection==2){
                                    lastLine.setTexture('line3')
                                }else if(this.lastLineDirection==3){
                                    lastLine.setTexture('line2'); 
                                }else{
                                    lastLine.setTexture('line2').setAngle(89)
                                }
                            }else{
                                //向上點
                                if(this.lastLineDirection==1){
                                    lastLine.setTexture('line3')
                                }else if(this.lastLineDirection==2){
                                    lastLine.setTexture('line3')
                                }else if(this.lastLineDirection==3){
                                    lastLine.setTexture('line2').setAngle(-90); 
                                }else{
                                    lastLine.setTexture('line2')
                                }
                            }
                            

                        }else if((x-this.lastClickIndex[0])==-1){
                            //向左點
                            if(y-this.lastClickIndex[1]<0){
                                if(this.lastLineDirection==1){
                                    lastLine.setTexture('line2')
                                }else if(this.lastLineDirection==2){
                                    lastLine.setTexture('line2')
                                }else if(this.lastLineDirection==3){
                                    lastLine.setTexture('line3') 
                                }else{
                                    lastLine.setTexture('line3')
                                }
                            }else{
                                if(this.lastLineDirection==1){
                                    lastLine.setTexture('line2').setAngle(360)
                                }else if(this.lastLineDirection==2){
                                    lastLine.setTexture('line2')
                                }else if(this.lastLineDirection==3){
                                    lastLine.setTexture('line3') 
                                }else{
                                    lastLine.setTexture('line3')
                                }
                            }
                            

                        }else if((x-this.lastClickIndex[0])==1){
                            //向右點
                            if(this.lastLineDirection==1){
                                lastLine.setTexture('line2')
                            }else if(this.lastLineDirection==2){
                                lastLine.setTexture('line2').setAngle(-180)
                            }else if(this.lastLineDirection==3){
                                lastLine.setTexture('line3') 
                            }else{
                                lastLine.setTexture('line3')
                            }
                        }
                        
                    }

                    if(x-this.lastClickIndex[0]==0){
                        //x沒位移
                        if(y-this.lastClickIndex[1]<0){
                            //點擊上面的格子
                            
                            line.setAngle(-90)
                            console.log('top')
                            this.lastLineDirection=1;
                            
                        }else{
                            //點擊下面的格子
                            line.setAngle(90)
                            
                            console.log('down')
                            this.lastLineDirection=2;
                        }
                    }else if(x-this.lastClickIndex[0]>0){
                        //點擊了右邊
                        line.setAngle(0)
                        console.log('right')
                        this.lastLineDirection=4;
                    }else{
                        //點擊了左邊
                        line.setAngle(180)
                        console.log("left")
                        this.lastLineDirection=3;
                    }
                    
                    this.LineGroup.add(line);
                }

                this.lastClickIndex = [x, y]
                this.promptText.setText('當前選擇坐標:' + [x, y]);

            } else {
                //點擊沒有相連
                this.promptText.setText('當前:' + '無');
                this.IsSelectItem = false;
                this.lastItem = null;
            }
        } else {
            //上次沒有點擊到物品
            if (this.gameIndex[y][x] != 0) {
                //這次有點到物品
                this.promptText.setText('當前選擇坐標:' + [x, y]);
                this.lastClickIndex = [x, y];
                this.IsSelectItem = true;
                this.lastItem = this.gameIndex[y][x];
            } else {
                //這次一樣沒點到物品
                this.promptText.setText('當前:' + '無');
            }
        }
    }

    drawLine(scene,x,y){

    }
}