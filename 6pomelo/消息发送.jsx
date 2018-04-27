主动推送推送的消息在remote里

ChatRemote.prototype.add = function (uid, sid, name, flag, cb) {
    var channel = this.channelService.getChannel(name, flag);
    var username = uid.split('*')[0];
    var param = {
        route: 'onAdd',
        user: username,
    };
    channel.pushMessage(param);
    if (!!channel) {
        channel.add(uid, sid);
    }

    cb(this.get(name, flag));
};

被动推送推送的消息在handler里

handler.send = function (msg, session, next) {
    var rid = session.get('rid');
    var username = session.uid.split('*')[0];
    var channelService = this.app.get('channelService');
    var param = {
        msg: msg.content,
        from: username,
        target: msg.target
    };
    channel = channelService.getChannel(rid, false);

    //the target is all users
    if (msg.target == '*') {
        channel.pushMessage('onChat', param);
    }
    //the target is specific user
    else {
        var tuid = msg.target + '*' + rid;
        var tsid = channel.getMember(tuid)['sid'];
        channelService.pushMessageByUids('onChat', param, [{
            uid: tuid,
            sid: tsid
        }]);
    }
    next(null, {
        route: msg.route
    });
};
