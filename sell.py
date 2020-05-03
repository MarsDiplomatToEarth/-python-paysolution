#coding=utf-8
import flask,schedule
from flask import  Flask,request,render_template,session
from flask_cors import CORS
import json,socket,re,time,datetime,threading

global t
app = Flask(__name__, static_url_path='')
app.config['SECRET_KEY'] = 'jiemaweb'

moneydic = {"订单号(由金额转化而成)":["是否付款(wait)(payed)","变量(比如邮箱,成功付款后执行这个)"],}

def sendlearninformation(mail):
    print(mail)

CORS(app, resources=r'/*')
#支付消息接收接口
@app.route('/httppaymsg',methods=['POST','GET'])
def httppaymsg():
    try:
        money = re.findall( '(([1-9]\\d*[\\d,，]*\\.?\\d*)|(0\\.[0-9]+))',str(request.form.get('paynum')) )[0][0]
    except:
        print("this is not pay msg")
        return "this is not pay msg"
    money = re.findall( '(([1-9]\\d*[\\d,，]*\\.?\\d*)|(0\\.[0-9]+))',str(request.form.get('paynum')) )[0][0]
    paynum0 = "00"+str(money.replace(".",""))
    print(money)
    print(paynum0)
    moneydic[paynum0][0] = "payed"
    print(moneydic)
    return moneydic
        
#创建订单
@app.route('/httpcreatepayment',methods=['POST'])
def httpcreatepayment():
    global t
    paynum = str(request.form.get('paynum'))
    mail = str(request.form.get('mail'))
    moneydic[paynum] = ["wait",mail]
    print(moneydic)
    t.cancel()
    t = threading.Timer(120, job3)
    t.start()
    return str(moneydic)
 
#订单状态
@app.route('/httppaystatus',methods=['POST'])
def httppaystatus():
    try:
        paynum2 = str(request.form.get('paynum'))
        if moneydic[paynum2][0] == "wait":
            print(moneydic)
            return "f"
        else:
            print(moneydic)
            sendlearninformation(moneydic[paynum2][1])
            #支付成功代码
            del moneydic[paynum2]
            return "s"+ "商品已发送到指定邮箱"
    except:
        return "q"

#取消订单
@app.route('/httpquitpayment',methods=['POST','GET'])
def httpquitpayment():
    global t
    paynum = str(request.form.get('paynum'))
    del moneydic[paynum]
    print(moneydic)
    t.cancel()
    t = threading.Timer(120, job3)
    t.start()
    return str(moneydic)
 
#web controller
@app.route('/')
def index():
    #return "123"
    return app.send_static_file('sell.html')
        
        
def job3():
    global t
    print('Job3:每隔2分钟执行一次')
    print('Job3-startTime:%s' % (datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')))
    moneydic = {}
    # for key in list(moneydic.keys()):
        # if moneydic[key]=='wait':
            # del moneydic[key]
            # continue
    print('Job3-endTime:%s' % (datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')))
    print('------------------------------------------------------------------------')
    t = threading.Timer(120, job3)
    t.start()

if __name__ == '__main__':
    global t
    print(socket.gethostbyname(socket.gethostname()))
    t = threading.Timer(5, job3)
    t.start()
    #app.run(host="0.0.0.0", port=5000, debug=True,ssl_context='adhoc')
    app.run(host="0.0.0.0", port=666, debug=True)



