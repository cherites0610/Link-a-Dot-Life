const util = {
    changeLastLine : (scene, x, y) => {
        if (scene.LineGroup.getChildren().length > 0) {
            console.log(scene.lastLineDirection);
            var lastLine = scene.LineGroup.getChildren()[scene.LineGroup.getChildren().length - 1];
    
            if (x - scene.lastClickIndex[0] == 0) {
                //x沒位移
                if (y - scene.lastClickIndex[1] < 0) {
                    //點擊上面的格子
                    if (scene.lastLineDirection == 1) {
                        lastLine.setTexture('line3')
                    } else if (scene.lastLineDirection == 2) {
                        lastLine.setTexture('line3')
                    } else if (scene.lastLineDirection == 3) {
                        lastLine.setTexture('line2');
                    } else {
                        lastLine.setTexture('line2').setAngle(89)
                    }
                } else {
                    //點擊下面的格子
                    if (scene.lastLineDirection == 1) {
                        lastLine.setTexture('line3')
                    } else if (scene.lastLineDirection == 2) {
                        lastLine.setTexture('line3')
                    } else if (scene.lastLineDirection == 3) {
                        lastLine.setTexture('line2').setAngle(-90);
                    } else {
                        lastLine.setTexture('line2')
                    }
                }
            } else if (x - scene.lastClickIndex[0] > 0) {
                //點擊了右邊
                if (scene.lastLineDirection == 1) {
                    lastLine.setTexture('line2')
                } else if (scene.lastLineDirection == 2) {
                    lastLine.setTexture('line2').setAngle(180)
                } else if (scene.lastLineDirection == 3) {
                    lastLine.setTexture('line3')
                } else {
                    lastLine.setTexture('line3')
                }
            } else {
                //點擊了左邊
                if (scene.lastLineDirection == 1) {
                    lastLine.setTexture('line2').setAngle(360)
                } else if (scene.lastLineDirection == 2) {
                    lastLine.setTexture('line2')
                } else if (scene.lastLineDirection == 3) {
                    lastLine.setTexture('line3')
                } else {
                    lastLine.setTexture('line3')
                }
            }
        }
        
    },
    
    drawLine : (scene, x, y) => {
        var line = scene.add.image(constants.ScreenWidth + (constants.GridWidth * x), constants.ScreenHeight + (constants.GridHeight * y), 'line4').setScale(constants.LineScale);

        if (x - scene.lastClickIndex[0] == 0) {
            //x沒位移
            if (y - scene.lastClickIndex[1] < 0) {
                //點擊上面的格子
                line.setAngle(-90)
                scene.lastLineDirection = 1;
            } else {
                //點擊下面的格子
                line.setAngle(90)
                scene.lastLineDirection = 2;
            }
        } else if (x - scene.lastClickIndex[0] > 0) {
            //點擊了右邊
            line.setAngle(0)
            scene.lastLineDirection = 4;
        } else {
            //點擊了左邊
            line.setAngle(180)
            scene.lastLineDirection = 3;
        }
    
        scene.LineGroup.add(line);
    }
}