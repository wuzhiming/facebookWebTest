var winSize = cc.winSize;
var facebook_is_canvas = true;
var FacebookItem = [
    {"itemName": "FacebookUserTest", "click": "userClick"},
    {"itemName": "FacebookShareTest", "click": "shareClick"}
];
var currentIndex = 0;
var isMenu = true;
var FacebookLayer = cc.Layer.extend({
    sprite: null,
    currentLayer: null,
    ctor: function () {
        this._super();
        var bg = new cc.Sprite(res.bg_png);
        bg.x = 0, bg.y = 0;
        bg.anchorX = 0, bg.anchorY = 0;
        this.addChild(bg);
        bg.scaleX = cc.winSize.width / bg.width;
        bg.scaleY = cc.winSize.height / bg.height;

        var back = new cc.MenuItemLabel(new cc.LabelTTF("Go Back", "Arial", 30), this.backClick, this);
        back.setPosition(cc.pAdd(cc.visibleRect.bottomRight, cc.p(-back.width / 2 - 20, back.height / 2 + 20)));
        this.backMenu = new cc.Menu(back);
        this.backMenu.x = 0, this.backMenu.y = 0;
        this.backMenu.anchorX = 0, this.backMenu.anchorY = 0;
        this.addChild(this.backMenu, 100);
        this.initMenu();
        this.changeBackBtn();
    },
    initMenu: function () {
        this.currentLayer = new cc.Layer();
        this.addChild(this.currentLayer);
        var menu = new cc.Menu();
        for (var i in FacebookItem) {
            var menuItem = new cc.MenuItemLabel(new cc.LabelTTF(FacebookItem[i]["itemName"], "Arial", 22), this[FacebookItem[i]["click"]], this);
            menu.addChild(menuItem);
        }
        menu.alignItemsVerticallyWithPadding(30);
        this.currentLayer.addChild(menu);
    },
    changeBackBtn: function () {
        if (!isMenu) {
            this.backMenu.visible = true;
        } else {
            this.backMenu.visible = false;
        }
    },
    backClick: function () {
        this.currentLayer.removeFromParent(true);
        isMenu = true;
        this.changeBackBtn();
        this.initMenu();
    },
    userClick: function () {
        isMenu = false;
        this.currentLayer.removeFromParent(true);
        this.currentLayer = new FacebookUserTest();
        this.addChild(this.currentLayer);
        this.changeBackBtn();
    },
    shareClick: function () {
        isMenu = false;
        this.currentLayer.removeFromParent(true);
        this.currentLayer = new FacebookShareTest();
        this.addChild(this.currentLayer);
        this.changeBackBtn();
    }
});

var FacebookScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new FacebookLayer();
        this.addChild(layer);
    }
});

