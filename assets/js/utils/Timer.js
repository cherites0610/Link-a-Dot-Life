class Timer {
    constructor(scene, initialTime, onComplete) {
        this.scene = scene;
        this.initialTime = initialTime;
        this.timeLeft = initialTime;
        this.onComplete = onComplete;
        this.timerEvent = null;
        this.timerText = null;
    }

    start() {
        this.timerText = this.scene.add.text(constants.TimerText[0], constants.TimerText[1], this.timeLeft, { font: '100px Arial', fill: '#6e665c' }).setDepth(constants.TimerText[3]).setOrigin(0.5, 0);

        this.timerEvent = this.scene.time.addEvent({
            delay: 1000, // 每秒更新一次
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });
    }

    updateTimer() {
        this.timeLeft--;

        this.timerText.setText(this.timeLeft);

        if (this.timeLeft <= 0) {
            this.timerEvent.paused = true;
            if (this.onComplete) {
                this.onComplete();
            }
        }
    }

    pause() {
        if (this.timerEvent) {
            this.timerEvent.paused = true;
        }
    }

    resume() {
        if (this.timerEvent) {
            this.timerEvent.paused = false;
        }
    }

    reset() {
        this.timeLeft = this.initialTime;
        if (this.timerText) {
            this.timerText.setText(this.timeLeft);
        }
        if (this.timerEvent) {
            this.timerEvent.paused = false;
        }
    }
}