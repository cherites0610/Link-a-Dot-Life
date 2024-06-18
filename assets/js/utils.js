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

    setPrompt: (promptItem, isVisible, promptIndex) => {
        if (isVisible) {
            let promptText = "當前選中:" + promptIndex;
            promptItem[0].setText(promptText)
            promptItem[1].setX(constants.Screen[0] + (constants.Grid[0] * (promptIndex[0] + 2)) - 117).setY(constants.Screen[1] + (constants.Grid[1] * (promptIndex[1] + 1)) + 108).setVisible(true);
        } else {
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
        util.setPrompt(scene.promptItem, false)
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
    },

    onClickBackBtn: (scene) => {
        if (scene.historyClickIndex.length == 0) {
            //一步都沒有記錄
            return;
        }

        const gameIndex = JSON.parse(JSON.stringify(constants.GameIndex[scene.level - 1]));
        let lastClickIndex = scene.historyClickIndex[scene.historyClickIndex.length - 1];
        let currentLineGroup = scene.LineGroup[scene.LineGroup.length - 1]
        let lastLine = currentLineGroup.getChildren()[currentLineGroup.getChildren().length - 1];
        let lastlastClickIndex = scene.historyClickIndex[scene.historyClickIndex.length - 2];

        if (gameIndex[lastClickIndex[1]][lastClickIndex[0]] == 0) {
            //上一步點擊的是綫條
            console.log('要返回的步是點擊綫條')
            scene.gameIndex[lastClickIndex[1]][lastClickIndex[0]] = gameIndex[lastClickIndex[1]][lastClickIndex[0]]
            lastLine.destroy();
            util.setPrompt(scene.promptItem, true, lastlastClickIndex);

            //還有綫條的話才改變綫條
            if (currentLineGroup.getChildren().length > 0) {
                util.RecoveryLine(scene);
            }

        } else {
            //要返回的步時點擊物品

            scene.gameIndex[lastClickIndex[1]][lastClickIndex[0]] = gameIndex[lastClickIndex[1]][lastClickIndex[0]]
            if (scene.selectItem) {
                console.log('要返回的步是第一次點擊物品')
                util.setPrompt(scene.promptItem, false, lastlastClickIndex);
                scene.LineGroup.pop();
                scene.selectItem = null;
            } else {
                console.log('要返回的步是第二次點擊物品')
                util.setPrompt(scene.promptItem, true, lastlastClickIndex);
                let lastItemIndex = scene.historyClickIndex[scene.clickNum - (currentLineGroup.getChildren().length + 2)]
                scene.selectItem = gameIndex[lastItemIndex[1]][lastItemIndex[0]]

                //看上一步點擊物品是否有連對
                if (gameIndex[lastClickIndex[1]][lastClickIndex[0]] == scene.selectItem) {
                    scene.success -= 1;
                }
                util.RecoveryLine(scene);
            }
        }
        //移除點擊記錄
        scene.clickNum = scene.clickNum - 1;
        scene.historyClickIndex.pop()
    },

    onClickGrid: (scene, pointer) => {
        const x = parseInt((pointer.x - (constants.Screen[0] - constants.Grid[0] / 2)) / constants.Grid[0])
        const y = parseInt((pointer.y - (constants.Screen[1] - constants.Grid[1] / 2)) / constants.Grid[1]);
        let lastClickIndex = scene.historyClickIndex[scene.historyClickIndex.length - 1];


        if (scene.selectItem) {
            //上次有點擊到物品

            if (Math.abs(lastClickIndex[0] - x) + Math.abs(lastClickIndex[1] - y) == 1) {
                //點擊有相連

                if (scene.selectItem + 80 == scene.gameIndex[y][x]) {
                    //點擊到選中的物品

                } else if (scene.selectItem + 90 == scene.gameIndex[y][x]) {
                    //點擊到上一次點擊的地方

                } else if (scene.gameIndex[y][x] >= 80) {
                    //點擊到不能點的地方

                } else if (scene.gameIndex[y][x] != 0 && scene.gameIndex[y][x] < 90) {
                    //第二次點到物品

                    //記錄物品已被使用
                    scene.gameIndex[y][x] = 80 + scene.gameIndex[y][x]

                    //關閉提醒
                    util.setPrompt(scene.promptItem, false);

                    if ((scene.gameIndex[y][x] - 80) == scene.selectItem) {
                        //點到正確的物品
                        scene.success = scene.success + 1;
                        if (scene.success == scene.itemNum) {
                            scene.add.image(500, 250, 'success').setOrigin(0, 0).setScale(0.3).setDepth(3);
                        }
                    } else {
                        //點到錯誤的物品
                    }

                    //更改上一次點擊的綫條
                    util.changeLastLine(scene, x, y);
                    scene.selectItem = null;

                    //記錄有效點擊
                    scene.historyClickIndex.push([x, y]);
                    scene.clickNum = scene.clickNum + 1;
                } else {
                    //點到綫格子

                    //設定提醒
                    util.setPrompt(scene.promptItem, true, [x, y]);
                    //更改綫條以及畫綫
                    util.changeLastLine(scene, x, y);
                    util.drawLine(scene, x, y)

                    //記錄有效點擊
                    scene.historyClickIndex.push([x, y]);
                    scene.clickNum = scene.clickNum + 1;
                }

            } else {
                //點擊沒有相連
            }
        } else {
            //上次沒有點擊到物品

            if (scene.gameIndex[y][x] != 0) {
                //第一次點擊物品
                scene.LineGroup.push(scene.add.group());
                //高亮提示
                util.setPrompt(scene.promptItem, true, [x, y]);
                //記錄物品已被使用
                scene.selectItem = scene.gameIndex[y][x];
                scene.gameIndex[y][x] = 80 + scene.selectItem

                //記錄有效點擊
                scene.historyClickIndex.push([x, y]);
                scene.clickNum = scene.clickNum + 1;
            } else {
                //這次一樣沒點到物品
            }
        }
    },
}