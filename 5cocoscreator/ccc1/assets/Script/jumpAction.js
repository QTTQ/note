cc.Class({
    extends: cc.Component,

    properties: {
        jumpDuration: 1,
        jumpHeight: 300
    },
    ballJumpAction() {
        let jumpUp = cc.moveBy(this.jumpDuration, cc.p(0, this.jumpHeight)).easing(cc.easeCubicActionInOut())
        let jumpDown = cc.moveBy(this.jumpDuration, cc.p(0, -this.jumpHeight)).easing(cc.easeCircleActionIn())
        return cc.repeatForever(cc.sequence(jumpUp,jumpDown));
    },

    // use this for initialization
    onLoad: function () {
        this.node.runAction(this.ballJumpAction());
    },

    // called every frame
    update: function (dt) {

    },
});
