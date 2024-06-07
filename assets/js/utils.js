const util = {
    changeLastLine: (scene, x, y) => {
        if (scene.currentLineGroup.getChildren().length > 0) {
            //特別處理回轉
            let thisDirection;
            if (x - scene.lastClickIndex[0] == 0) {
                //x沒位移
                if (y - scene.lastClickIndex[1] < 0) {
                    //點擊上面的格子
                    thisDirection = 1
                } else {
                    //點擊下面的格子
                    thisDirection = 2
                }
            } else if (x - scene.lastClickIndex[0] > 0) {
                //點擊了右邊
                thisDirection = 4
            } else {
                //點擊了左邊
                thisDirection = 3
            }

            var lastLine = scene.currentLineGroup.getChildren()[scene.currentLineGroup.getChildren().length - 1];

            if ((thisDirection == 1 && scene.lastLineDirection == 2) || (thisDirection == 2 && scene.lastLineDirection == 1) || (thisDirection == 3 && scene.lastLineDirection == 4) || (thisDirection == 4 && scene.lastLineDirection == 3)) {
                //回轉
            } else if (thisDirection == scene.lastLineDirection) {
                //直綫   
                lastLine.setTexture('line1' + scene.lineColor)
            } else if ((thisDirection == 2 && scene.lastLineDirection == 4) || (thisDirection == 3 && scene.lastLineDirection == 1)) {
                lastLine.setTexture('line2' + scene.lineColor).setAngle(0)
            } else if ((thisDirection == 1 && scene.lastLineDirection == 4) || (thisDirection == 3 && scene.lastLineDirection == 2)) {
                lastLine.setTexture('line2' + scene.lineColor).setAngle(90)
            } else if ((thisDirection == 4 && scene.lastLineDirection == 2) || (thisDirection == 1 && scene.lastLineDirection == 3)) {
                lastLine.setTexture('line2' + scene.lineColor).setAngle(180)
            } else {
                lastLine.setTexture('line2' + scene.lineColor).setAngle(270)
            }
        }
    },

    drawLine: (scene, x, y) => {
        var line = scene.add.image(constants.ScreenWidth + (constants.GridWidth * x), constants.ScreenHeight + (constants.GridHeight * y), 'line4' + scene.lineColor).setScale(constants.LineScale);

        if (x - scene.lastClickIndex[0] == 0) {
            //x沒位移
            if (y - scene.lastClickIndex[1] < 0) {
                //點擊上面的格子
                line.setAngle(0)
                scene.lastLineDirection = 1;
            } else {
                //點擊下面的格子
                line.setAngle(180)
                scene.lastLineDirection = 2;
            }
        } else if (x - scene.lastClickIndex[0] > 0) {
            //點擊了右邊
            line.setAngle(90)
            scene.lastLineDirection = 4;
        } else {
            //點擊了左邊
            line.setAngle(270)
            scene.lastLineDirection = 3;
        }

        scene.gameIndex[y][x] = 90 + scene.lastItem
        scene.currentLineGroup.add(line);
    },

    handleClickresetBtn : (scene) => {
        scene.gameIndex = JSON.parse(JSON.stringify(constants.GameIndex[scene.level - 1]));
        scene.LineGroup.forEach((item) => {
            item.clear(true, true)
        })
        scene.LineGroup = []
        scene.success = 0;
        scene.promptText.setText('當前:' + '無');
        scene.IsSelectItem = false;
        scene.lastItem = null;
        scene.promptImage.setVisible(false);
    }
}