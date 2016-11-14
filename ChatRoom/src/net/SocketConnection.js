/**
 * Created by plter on 2016/11/10.
 */
//移除函数
function removeObjectFromArray(obj, arr) {
    //从数组中找该对象位置
    var index = arr.indexOf(obj);
    if (index != -1) {
        //删除找到的一项
        arr.splice(index, 1);
    }
}

class SocketConnection {

    constructor(socket) {
        //把SocketConnection绑定的socket对象记录下来
        this._socket = socket;

        SocketConnection.allConnections.push(this);
        //
        socket.on("chat", function (data) {
            // 对连接成功的用户转发             （sc:SocketConnection）
            SocketConnection.allConnections.forEach(sc=> {
                //              类型     数据
                sc.socket.emit("chat", data);
            });
        });
        //某一个前端 断开连接，把他移除（就不会再往这个连接发送信息了）
        socket.on("disconnect", ()=> {
            removeObjectFromArray(this, SocketConnection.allConnections);
        });
    }
    //侦听到事件以后返回socket
    get socket() {
        return this._socket;
    }
}
//每一个连接进来的数据都添加到该数组里面
SocketConnection.allConnections = [];

module.exports = SocketConnection;