const constants = {
    TimeLimit: 5,
    LevelPassNum: [4], //每關物品數,
    //x y 比例 圖層
    Screen: [640,210], //畫面
    TimerText: [210,220,0,98],
    Grid: [222.5,220], //方格
    Item: [0,0,0.085,4], //物品
    LineScale: 0.11, //綫條縮放比例
    backMenuBtn: [710,760,0.1,101],
    Mask: [1920,1080,1,99],
    nextLevelBtn: [1200,760,0.1,101],
    EndLevelImg: [960,540,0.4,100],
    resetBtn: [1730,860,0.09], //reset按鈕xy
    goBackBtn: [1730,500,0.09], //goBack按鈕xy

    //每關索引值
    GameIndex: [
        [
            [4, 0, 0, 0, 3],
            [0, 0, 4, 0, 0],
            [0, 0, 2, 3, 1],
            [2, 1, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 3],
            [4, 0, 4, 0, 0],
            [0, 0, 2, 3, 1],
            [2, 1, 0, 0, 0],
        ]
    ],
}