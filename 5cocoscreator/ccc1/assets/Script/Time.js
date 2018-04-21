// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        timeLabel: {
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad() {

    },

    start() {
        let timeIn = 5;
        this.schedule(function () {
            timeIn--;
            this.timeLabel.string = timeIn;
            if (timeIn === 0) {
                cc.director.loadScene('S3');
            }
        }, 1);
    },

    // update (dt) {},
});
