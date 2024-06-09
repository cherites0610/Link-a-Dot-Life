const util = {
    RecoveryLine: (scene) => {
        lastLineDirection = util.calClickDirection(scene.historyClickIndex[scene.clickNum - 2], scene.historyClickIndex[scene.clickNum - 3])

        let currentLineGroup = scene.LineGroup[scene.LineGroup.length - 1]
        let line = currentLineGroup.getChildren()[currentLineGroup.getChildren().length - 1];

        line.setTexture('line4' + (String.fromCharCode(96 + scene.selectItem)))
        if (lastLineDirection == 1) {
            //點擊上面的格子
            line.setAngle(0)
        } else if (lastLineDirection == 2) {
            //點擊下面的格子
            line.setAngle(180)
        } else if (lastLineDirection == 3) {
            //點擊了左邊
            line.setAngle(270)
        } else (
            //點擊了右邊
            line.setAngle(90)
        )
    },

    setPrompt: (promptItem,isVisible, promptIndex) => {
        if(isVisible){
            let promptText = "當前選中:" + promptIndex;
            promptItem[0].setText(promptText)
            promptItem[1].setX(constants.Screen[0] + (constants.Grid[0] * (promptIndex[0]+2))-117).setY(constants.Screen[1] + (constants.Grid[1] * (promptIndex[1]+1))+108).setVisible(true);
        }else{
            promptItem[0].setText("當前選中:" + '無')
            promptItem[1].setVisible(false);
        }
    },

    changeLastLine: (scene, x, y) => {
        let lastLineDirection;

        if (scene.clickNum > 1) {
            lastLineDirection = util.calClickDirection(scene.historyClickIndex[scene.clickNum - 1], scene.historyClickIndex[scene.clickNum - 2])
        }

        let currentClickDirection = util.calClickDirection([x, y], scene.historyClickIndex[scene.clickNum - 1]);
        let currentLineGroup = scene.LineGroup[scene.LineGroup.length - 1]
        let lastLine = currentLineGroup.getChildren()[currentLineGroup.getChildren().length - 1];
        let lineColor = (String.fromCharCode(96 + scene.selectItem))

        if (scene.LineGroup[scene.LineGroup.length - 1].getChildren().length > 0) {

            if ((currentClickDirection == 1 && lastLineDirection == 2) || (currentClickDirection == 2 && lastLineDirection == 1) || (currentClickDirection == 3 && lastLineDirection == 4) || (currentClickDirection == 4 && lastLineDirection == 3)) {
                //回轉
            } else if (currentClickDirection == lastLineDirection) {
                //直綫   
                lastLine.setTexture('line1' + lineColor)
            } else if ((currentClickDirection == 2 && lastLineDirection == 4) || (currentClickDirection == 3 && lastLineDirection == 1)) {
                lastLine.setTexture('line2' + lineColor).setAngle(0)
            } else if ((currentClickDirection == 1 && lastLineDirection == 4) || (currentClickDirection == 3 && lastLineDirection == 2)) {
                lastLine.setTexture('line2' + lineColor).setAngle(90)
            } else if ((currentClickDirection == 4 && lastLineDirection == 2) || (currentClickDirection == 1 && lastLineDirection == 3)) {
                lastLine.setTexture('line2' + lineColor).setAngle(180)
            } else {
                lastLine.setTexture('line2' + lineColor).setAngle(270)
            }
        }
    },

    drawLine: (scene, x, y) => {
        var line = scene.add.image(constants.Screen[0] + (constants.Grid[0] * x), constants.Screen[1] + (constants.Grid[1] * y), 'line4' + (String.fromCharCode(96 + scene.selectItem))).setScale(constants.LineScale);
        let currentLineGroup = scene.LineGroup[scene.LineGroup.length - 1]
        let currentClickDirection = util.calClickDirection([x, y], scene.historyClickIndex[scene.clickNum - 1]);

        if (currentClickDirection == 1) {
            //點擊上面的格子
            line.setAngle(0)
        } else if (currentClickDirection == 2) {
            //點擊下面的格子
            line.setAngle(180)
        } else if (currentClickDirection == 3) {
            //點擊了左邊
            line.setAngle(270)
        } else (
            //點擊了右邊
            line.setAngle(90)
        )

        scene.gameIndex[y][x] = 90 + scene.selectItem
        currentLineGroup.add(line);
    },

    handleClickresetBtn: (scene) => {
        scene.gameIndex = JSON.parse(JSON.stringify(constants.GameIndex[scene.level - 1]));
        scene.LineGroup.forEach((item) => {
            item.clear(true, true)
        })
        scene.LineGroup = []
        scene.success = 0;
        util.setPrompt(scene.promptItem,false)
        scene.IsSelectItem = false;
        scene.selectItem = null;
        scene.historyClickIndex = []

        scene.clickNum = 0;
        // scene.scene.start('scene01');
    },

    calClickDirection: (currentClickIndex, lastClickIndex) => {
        let ClickDirection;

        if (currentClickIndex[0] - lastClickIndex[0] == 0) {
            //x沒位移
            if (currentClickIndex[1] - lastClickIndex[1] < 0) {
                //點擊上面的格子
                ClickDirection = 1;
            } else {
                //點擊下面的格子
                ClickDirection = 2;
            }
        } else if (currentClickIndex[0] - lastClickIndex[0] > 0) {
            //點擊了右邊
            ClickDirection = 4;
        } else {
            //點擊了左邊
            ClickDirection = 3;
        }

        return ClickDirection;
    }
}