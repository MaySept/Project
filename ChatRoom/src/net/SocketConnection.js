/**
 * Created by plter on 2016/11/10.
 */
//�Ƴ�����
function removeObjectFromArray(obj, arr) {
    //���������Ҹö���λ��
    var index = arr.indexOf(obj);
    if (index != -1) {
        //ɾ���ҵ���һ��
        arr.splice(index, 1);
    }
}

class SocketConnection {

    constructor(socket) {
        //��SocketConnection�󶨵�socket�����¼����
        this._socket = socket;

        SocketConnection.allConnections.push(this);
        //
        socket.on("chat", function (data) {
            // �����ӳɹ����û�ת��             ��sc:SocketConnection��
            SocketConnection.allConnections.forEach(sc=> {
                //              ����     ����
                sc.socket.emit("chat", data);
            });
        });
        //ĳһ��ǰ�� �Ͽ����ӣ������Ƴ����Ͳ�������������ӷ�����Ϣ�ˣ�
        socket.on("disconnect", ()=> {
            removeObjectFromArray(this, SocketConnection.allConnections);
        });
    }
    //�������¼��Ժ󷵻�socket
    get socket() {
        return this._socket;
    }
}
//ÿһ�����ӽ��������ݶ���ӵ�����������
SocketConnection.allConnections = [];

module.exports = SocketConnection;