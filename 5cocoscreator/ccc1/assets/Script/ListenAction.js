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
        accl: 0,
        plane: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    setInputControl() {
        const self=this;
        const listener = {
            event: cc.EventListener.KEYBOARD,
           onKeyPressed(keyCode, event) {
                switch (keyCode) {
                    case cc.KEY.a:
                        self.accLeft = true;
                        break;
                    case cc.KEY.d:
                        self.accRight = true;
                        break;
                    case cc.KEY.w:
                        self.accUp = true;
                        break;
                    case cc.KEY.s:
                        self.accDown = true;
                        break;
                    default:
                        break;
                }
            },
            onKeyReleased(keyCode, event) {
                switch (keyCode) {
                    case cc.KEY.a:
                        self.accLeft = false;
                        break;
                    case cc.KEY.d:
                        self.accRight = false;
                        break;
                    case cc.KEY.w:
                        self.accUp = false;
                        break;
                    case cc.KEY.s:
                        self.accDown = false;
                        break;
                    default:
                        break;
                }
            },
        }
        // cc.eventManager.addLisener(listener, self.node)
        cc.eventManager.addListener(listener,self.node)
    },
    onLoad() {
        this.accLeft = false;
        this.accRight = false;
        this.accUp = false;
        this.accDown = false;
        this.setInputControl();

    },
    update() {
        if (this.accLeft) {
            this.plane.x -= this.accl;
        }
        if (this.accRight) {
            this.plane.x += this.accl;
        }
        if (this.accUp) {
            this.plane.y += this.accl;
        }
        if (this.accDown) {
            this.plane.y -= this.accl;

        }
    },
    start() {

    },

    // update (dt) {},
});
