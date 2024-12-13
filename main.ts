//% blockId=WIFI_Camera block="WIFI_Camera"
//%color="#228B22" weight=25 icon="\uf06e"
namespace WIFI_Camera {

    export enum AIMODE_selcet
    {
        //% blockId="Nornal" block="Nornal"
        Nornal = 0,
        //% blockId="Cat_Dog_MODE" block="Cat_Dog_MODE"
        Cat_Dog_MODE,
        //% blockId="Face_MODE" block="Face_MODE"
        Face_MODE,
        //% blockId="Color_MODE" block="Color_MODE"
        Color_MODE,
        //% blockId="Study_Face_MODE" block="Study_Face_MODE"
        Study_Face_MODE,
        //% blockId="QR_MODE" block="QR_MODE"
        QR_MODE, 
    }

    export enum KEY_Model
    {
        //% blockId="KEY_MENU" block="KEY_MENU"
        KEY_MENU = 0,
        //% blockId="KEY_PLAY" block="KEY_PLAY"
        KEY_PLAY,
        //% blockId="KEY_UPUP" block="KEY_UPUP"
        KEY_UPUP,
        //% blockId="KEY_DOWN" block="KEY_DOWN"
        KEY_DOWN,
    }

    export enum MODE_selcet
    {
        //% blockId="APOnly" block="APOnly"
        APOnly = 0,
        //% blockId="STAOnly" block="STAOnly"
        STAOnly,
        //% blockId="AP_STA" block="AP_STA"
        AP_STA
    }

    export enum Cmd_Data
    {
        //% blockId="forword" block="forword"
        forword = 1,
        //% blockId="back" block="back"
        back,
        //% blockId="left" block="left"
        left,
        //% blockId="right" block="right"
        right,
        //% blockId="leftspin" block="leftspin"
        leftspin,
        //% blockId="rightspin" block="rightspin"
        rightspin,
        //% blockId="stop" block="stop"
        stop
    }

    export enum Sever_Data
    {
        //% blockId="sevro_vflip" block="sevro_vflip"
        sevro_vflip,

        //% blockId="sevro_mirror" block="sevro_mirror"
        sevro_mirror,

        //% blockId="sevro_NONE" block="sevro_NONE"
        sevro_NONE,
    }

    //% block="init SerialPort|sendpin %TX|recvpin %RX|buadrate %buadrate"
    //% group="SET SerialPort"
    export function initialization (TX:SerialPin,RX:SerialPin,buadrate:BaudRate) {
        serial.redirect(
        TX,
        RX,
        buadrate
        )
    }

    //% blockId=setRXbuffSize block="Set RXbuffSize|size %size"
    //% weight=88
    //% blockGap=10
    //% group="SET SerialPort"
    export function setRXbuffSize(size:number)
    {
        serial.setRxBufferSize(size)
    }
    
    //% blockId=setTXbuffSize block="Set TXbuffSize|size %size"
    //% weight=88
    //% blockGap=10
    //% group="SET SerialPort"
    export function setTXbuffSize(size:number)
    {
        serial.setTxBufferSize(size)
    }

    //wifi模式配置
    //% blockId=setWifiMode block="Set Wifi Mode Selcet %mode"
    //% weight=88
    //% blockGap=10
    //% group="SET WIFI MODE"
    export function setWifiMode(mode:MODE_selcet)
    {
        switch (mode)
        {
            case MODE_selcet.APOnly: serial.writeString("wifi_mode:0"); break;
            case MODE_selcet.STAOnly:serial.writeString("wifi_mode:1"); break;
            case MODE_selcet.AP_STA: serial.writeString("wifi_mode:2"); break;
        }
        basic.pause(4000)
        serial.readString() //目的是为了清掉缓存

       
    }

    //wifi配置 sta模式

    //% blockId=setSTASSID block="set STA SSID|wifi name %SSID"
    //% weight=88
    //% blockGap=10
    //% group="SET STA WIFI"
    export function setSTASSID(SSID:string)
    {
        serial.writeString("sta_ssid:"+SSID)
        basic.pause(500) 
        serial.readString() //目的是为了清掉缓存
    }

    //% blockId=setSTAPD block="set STA PASSWord|wifi password %Password"
    //% weight=88
    //% blockGap=10
    //% group="SET STA WIFI"
    export function setSTAPD(Password:string)
    {
        serial.writeString("sta_pd:"+Password)
        basic.pause(4000)//等待重启成功
        serial.readString() //目的是为了清掉缓存
    }

    //wifi配置 ap模式

    //% blockId=setAPSSID block="set AP SSID|wifi name %SSID"
    //% weight=88
    //% blockGap=10
    //% group="SET AP WIFI"
    export function setAPSSID(SSID:string)
    {
        serial.writeString("ap_ssid:"+SSID)
        basic.pause(500)
        serial.readString() //目的是为了清掉缓存
    }

    //% blockId=setAPPD block="set AP PASSWord|wifi password %Password"
    //% weight=88
    //% blockGap=10
    //% group="SET AP WIFI"
    export function setAPPD(Password:string)
    {
        serial.writeString("ap_pd:"+Password)
        basic.pause(4000)
        serial.readString() //目的是为了清掉缓存
    }

    //% blockId=GET_AP_IP block="GET_AP_IP"
    //% weight=88
    //% blockGap=10
    //% group="GET WIFI IP"
    export function GET_AP_IP():string
    {
        serial.writeString("ap_ip")
        return serial.readUntil(serial.delimiters(Delimiters.NewLine))
    }

    //% blockId=GET_STA_IP block="GET_STA_IP"
    //% weight=88
    //% blockGap=10
    //% group="GET WIFI IP"
    export function GET_STA_IP():string
    {
        serial.writeString("sta_ip")
        return serial.readUntil(serial.delimiters(Delimiters.NewLine))
        
    }

    //% blockId=GET_Version block="GET_Version"
    //% weight=88
    //% blockGap=10
    //% group="GET WIFI Version"
    export function GET_Version():string
    {
        serial.writeString("wifi_ver")
        return serial.readUntil(serial.delimiters(Delimiters.NewLine))
    }

    //% blockId=GET_controlData block="GET_Control_Data"
    //% weight=88
    //% blockGap=10
    //% group="GET Data"
    export function GET_controlData():string
    {
        let buff
        buff = serial.readString()
        return buff
    }

    //% blockId=CarControl block="Control_Car %value"
    //% weight=88
    //% blockGap=10
    //% group="Car control"
    export function CarControl(value:Cmd_Data):string
    {
        let databuff = "$1,0,0,0#"
        switch(value)
        {
            case Cmd_Data.forword:databuff = "$1,0,0,0#";   break
            case Cmd_Data.back:databuff = "$2,0,0,0#";      break
            case Cmd_Data.left:databuff = "$3,0,0,0#";      break
            case Cmd_Data.right:databuff = "$4,0,0,0#";     break
            case Cmd_Data.leftspin:databuff = "$5,0,0,0#";  break
            case Cmd_Data.rightspin:databuff = "$6,0,0,0#"; break
            case Cmd_Data.stop:databuff = "$7,0,0,0#";      break
        }

        return databuff
    }


    let  sevro_vflip_angle = 0; //上下方向舵机角度
    let  sevro_mirror_angle = 0;//左右方向舵机角度

    //% blockId=Servodirection block="direction_Servo %strData"
    //% weight=88
    //% blockGap=10
    //% group="Servo"
    export function Servodirection(strData:string):Sever_Data
    {
        let dataflag = Sever_Data.sevro_NONE //什么数据都没有

        let databuff = ""
        let angle = 90

        if(strData[0] == "$")//满足包头包尾
            if(strData[5] == "#")
            {
                if (strData[1] == "A")  //$A180# 垂直方向
                {
                    databuff = ""+strData[2]+strData[3]+strData[4] //转成角度
                    angle = parseInt(databuff); //字符转成整形
                    sevro_vflip_angle = angle; //赋值
                    dataflag = Sever_Data.sevro_vflip
                } 
        
                else if(strData[1] == "B") //$B090# 水平方向
                {
                    databuff = ""+strData[2]+strData[3]+strData[4] //转成角度
                    angle = parseInt(databuff); //字符转成整形
                    sevro_mirror_angle = angle; //赋值
                    dataflag = Sever_Data.sevro_mirror
                }

            }
        
        return dataflag
    }

    //% blockId=Servo_Control block="Servo_Control %value"
    //% weight=88
    //% blockGap=10
    //% group="Servo"
    export function Servo_Control(value:Sever_Data):Sever_Data
    {
        switch(value)
        {
            case Sever_Data.sevro_mirror: return Sever_Data.sevro_mirror
            case Sever_Data.sevro_vflip: return Sever_Data.sevro_vflip
        }
        return Sever_Data.sevro_NONE

    }



    //% blockId=Get_vflip_Servoangle block="Get vflip Servo angle"
    //% weight=88
    //% blockGap=10
    //% group="Servo"
    export function Get_vflip_Servoangle():number
    {
        return sevro_vflip_angle
    }

    //% blockId=Get_mirror_Servoangle block="Get mirror Servo angle"
    //% weight=88
    //% blockGap=10
    //% group="Servo"
    export function Get_mirror_Servoangle():number
    {
        return sevro_mirror_angle
    }

    //AI模式配置
    //% blockId=setAIMode block="Set AI Mode Selcet %mode"
    //% weight=88
    //% blockGap=10
    //% group="AI MODE"
    export function setAIMode(mode:AIMODE_selcet)
    {
        switch (mode)
        {
            case AIMODE_selcet.Nornal: serial.writeString("ai_mode:0"); break;
            case AIMODE_selcet.Cat_Dog_MODE:serial.writeString("ai_mode:1"); break;
            case AIMODE_selcet.Face_MODE: serial.writeString("ai_mode:2"); break;
            case AIMODE_selcet.Color_MODE: serial.writeString("ai_mode:3"); break;
            case AIMODE_selcet.Study_Face_MODE:serial.writeString("ai_mode:4"); break;
            case AIMODE_selcet.QR_MODE: serial.writeString("ai_mode:5"); break;
        }
        basic.pause(4000)
        serial.readString() //目的是为了清掉缓存
    }

    //虚拟按键
    //% blockId=SendKEY block="SendKEY %mode"
    //% weight=88
    //% blockGap=10
    //% group="AI MODE"
    export function SendKEY(mode:KEY_Model)
    {
        switch (mode)
        {
            case KEY_Model.KEY_MENU: serial.writeString("KEY_MENU"); break;
            case KEY_Model.KEY_PLAY: serial.writeString("KEY_PLAY"); break;
            case KEY_Model.KEY_UPUP: serial.writeString("KEY_UPUP"); break;
            case KEY_Model.KEY_DOWN: serial.writeString("KEY_DOWN"); break;
        }
        serial.readString() //目的是为了清掉缓存
    }

    
    let LX_int = 0;
    let LY_int = 0;
    let RX_int = 0;
    let RY_int = 0;
    let center_X = 160; //分辨率是320*240
    let center_Y = 120;
    let Area = 0; //面积

     //设置取中心点X轴方向
    //% blockId=SET_CX block="SET_CX %value"
    //% weight=88
    //% blockGap=10
    //% group="AI MODE"
    export function SET_CX(value:number)
    {
        center_X = value
    }

    //设置中心点Y轴方向
    //% blockId=SET_CY block="SET_CY %value"
    //% weight=88
    //% blockGap=10
    //% group="AI MODE"
    export function SET_CY(value:number)
    {
        center_Y = value
    }

    //设置框的面积
    //% blockId=SET_Area block="SET_Area %value"
    //% weight=88
    //% blockGap=10
    //% group="AI MODE"
    export function SET_Area(value:number)
    {
        Area = value
    }

    //获取中心点X轴方向
    //% blockId=GET_CX block="GET_CX"
    //% weight=88
    //% blockGap=10
    //% group="AI MODE"
    export function GET_CX():number
    {
        return center_X
    }

    //获取中心点Y轴方向
    //% blockId=GET_CY block="GET_CY"
    //% weight=88
    //% blockGap=10
    //% group="AI MODE"
    export function GET_CY():number
    {
        return center_Y
    }

    //获取第一个框的面积
    //% blockId=GET_Area block="GET_Area"
    //% weight=88
    //% blockGap=10
    //% group="AI MODE"
    export function GET_Area():number
    {
        return Area
    }

    //猫狗检测、人脸检测、颜色识别的协议解析
    //% blockId=Detection_Data block="Detection_Data %strData"
    //% weight=88
    //% blockGap=10
    //% group="AI MODE"
    export function Detection_Data(strData:string):number
    {
        let databuff = ""
        let state = 0
        let index = 0
        let duohao_num = 0 //逗号标志
        let len =0

        let Lx_str = ""
        let Ly_str = ""
        let Rx_str = ""
        let Ry_str = ""

        while(strData[index] != "")//先把有效数据复制出来
        {
            if(state == 0)
            {
                if(strData[index] == "$")//满足包头
                {
                    state = 1
                    databuff = "$"
                }
            }
            else if(state == 1)
            {
                if(strData[index] == "$")
                {
                    return 0; //当真实的数据也有包头，说明掉包
                }
                else if(strData[index] == ",")
                {
                    duohao_num = duohao_num+1
                }
                databuff = databuff + strData[index]
            }
            

            if(strData[index] == "#")//满足包尾
            {
                index= index+1
                index = 1 //索引变1 ，方便后面去掉包头

                if(duohao_num!=4)//当改包数据不满足4个逗号，说明丢失数据
                {
                    return 0;
                }

                break; //满足即解算
            }
            else
            {
                index= index+1
                if(index > 30)//长度过长 ,出现没有“#”的丢包
                {
                    return 0; //直接结束
                }
            }     
        }
        
        if (state == 0)//当数据不存在
        {
            return 0;
        }

        if(databuff.length != 18)//不是正常完整的数据也跳过 $xxx,yyy,xxx,yyy,#
        {
            return 0;
        }

        //解算左上角xy 右下角xy $180,240,#
        while(databuff[index]!=",") //不为英文","
        {
            //左上角X
            Lx_str = Lx_str + databuff[index];
            index = 1+ index;

            len = len + 1
            if(len >3) return 0;//数据出错
        }
        index = 1+ index; //去掉上一个逗号
        len = 0

        

        while(databuff[index]!=",") //不为英文","
        {
            //左上角Y
            Ly_str = Ly_str + databuff[index];
            index = 1+ index;

            len = len + 1
            if(len >3) return 0;//数据出错
        }
        index = 1+ index; //去掉上一个逗号
        len = 0

        while(databuff[index]!=",") //不为英文","
        {
            //右下角X
            Rx_str = Rx_str + databuff[index];
            index = 1+ index;

            len = len + 1
            if(len >3) return 0;//数据出错
        }
        index = 1+ index; //去掉上一个逗号
        len = 0

        while(databuff[index]!=",") //不为英文","
        {
            //右下角Y
            Ry_str = Ry_str + databuff[index];
            index = 1+ index;

            len = len + 1
            if(len >3) return 0;//数据出错
        }

        //把字符变整数
        LX_int = parseInt(Lx_str); //字符转成整形
        LY_int = parseInt(Ly_str); //字符转成整形
        RX_int = parseInt(Rx_str); //字符转成整形
        RY_int = parseInt(Ry_str); //字符转成整形

        center_X = (RX_int-LX_int)/2 + LX_int //加上起始点
        center_Y = (RY_int-LY_int)/2 + LY_int //加上起始点

        Area = (RX_int-LX_int)*(RY_int-LY_int)

        // //测试下
        //serial.writeString("aaa"+Area+"aaa") 

        return 1; //成功

    }

    //人脸识别的协议解析
    //% blockId=Face_Data block="Face_Data %strData"
    //% weight=88
    //% blockGap=10
    //% group="AI MODE"
    export function Face_Data(strData:string):number
    {
        let xy_flag = 0;

        let index = 0
        let state = 0
        let IDbuf = ""
        let people_id = 0

        //解算xy中心点坐标
        xy_flag = Detection_Data(strData)

        if(xy_flag ==0 ) //xy解算不成功，不往下做2级解算了
        {
            return 0;
        }

        while(strData[index] != "\0")
        {
            index = index + 1

            if(state == 0)
            {
                if(strData[index] == ":")
                {
                    state = 1
                }
            }
            else
            {
                if(strData[index] == "!") //为结束符
                    break
                IDbuf = IDbuf + strData[index] //把id的数字拿出来
                //len = len+1
            }
            
        }

        if(state == 0 ) //没id数据的情况
        {
            return 0;
        }

        
        //serial.writeString("aaa"+IDbuf+"aaa")

        people_id = parseInt(IDbuf) //会默认区分负数和正数
        return people_id //返回识别到人脸的序号


    }


    //二维码识别解析QR
    //% blockId=QR_Data block="QR_Data %strData"
    //% weight=88
    //% blockGap=10
    //% group="AI MODE"
    export function QR_Data(strData:string):string
    {
       let QR_buf = ""
       let index = 0
       let state = 0

       while(strData[index] != "\0")
       {
           if(state == 0)
           {
               if(strData[index] == "$")
               {
                   state = 1
               }
           }
           else
           {
               if(strData[index] == "#") //为结束符
                   break
                QR_buf = QR_buf + strData[index] //把识别到的字符拿出来
           } 
           index = index + 1

           if(index > 50)//长度过长 ,出现没有“#”的丢包 二维码是内容不要超50个字符
            {
                return "0"; //直接结束
            }
       }

       if(state == 0 ) //没数据的情况
       {
           return "0";
       }
       
       return QR_buf
    }

}


//IIC
//% blockId=CameraLite_IIC block="IIC_Control"
//%color="#228B22" weight=25 icon="\uf0c2"
namespace CameraLite_IIC {
    //I2C addr
    const ESP32_Camera_ADDR = 0x33
    //reg
    const level_reg =0x01 //摄像头水平寄存器 Camera horizontal register
	const vertical_reg = 0x02//摄像头垂直寄存器 Camera vertical register
	const Model_reg = 0x03 //模式选择寄存器 Mode selection register
	
	const Virtual_key_reg = 0x08 //虚拟按键寄存器 Virtual key register

    const Middle_X_Hreg = 0x28
	const Middle_X_Lreg = 0x29
	const Middle_Y_Hreg = 0x2A
	const Middle_Y_Lreg = 0x2B
	const Face_ID_Hreg = 0x2C
	const Face_ID_Lreg = 0x2D

    
    export enum IIC_bool
    {
        //% blockId="Flase" block="Flase"
        Flase = 0,
        //% blockId="True" block="True"
        True = 1,
    }

    export enum IIC_KEY_Model
    {
        //% blockId="KEY_MENU" block="KEY_MENU"
        KEY_MENU = 1,
        //% blockId="KEY_PLAY" block="KEY_PLAY"
        KEY_PLAY,
        //% blockId="KEY_UPUP" block="KEY_UPUP"
        KEY_UPUP,
        //% blockId="KEY_DOWN" block="KEY_DOWN"
        KEY_DOWN,
    }

    export enum IIC_AI_selcet
    {
        //% blockId="Nornal" block="Nornal"
        Nornal = 0,
        //% blockId="Cat_Dog_MODE" block="Cat_Dog_MODE"
        Cat_Dog_MODE,
        //% blockId="Face_MODE" block="Face_MODE"
        Face_MODE,
        //% blockId="Color_MODE" block="Color_MODE"
        Color_MODE,
        //% blockId="Study_Face_MODE" block="Study_Face_MODE"
        Study_Face_MODE,
        //% blockId="QR_MODE" block="QR_MODE"
        QR_MODE, 
    }


    //设置画面的水平方向
    //% blockId=SET_Level_Mode block="SET_Level_Mode|Switch %Mode"
    //% weight=88
    //% blockGap=10
    //% group="IIC Write"
    export function SET_Level_Mode(Mode:IIC_bool):void{
        let buf = pins.createBuffer(2);
        buf[0] = level_reg;
        buf[1] = Mode;
        for(let i = 0;i<5;i++)//发送5次，以确保配置成功
        {
            pins.i2cWriteBuffer(ESP32_Camera_ADDR, buf);
            basic.pause(100);
        }
        
    }

    //设置画面的垂直方向
    //% blockId=SET_vertical_Mode block="SET_vertical_Mode|Switch %Mode"
    //% weight=88
    //% blockGap=10
    //% group="IIC Write"
    export function SET_vertical_Mode(Mode:IIC_bool):void{
        let buf = pins.createBuffer(2);
        buf[0] = Model_reg;
        buf[1] = Mode;
        for(let i = 0;i<5;i++)//发送5次，以确保配置成功
        {
            pins.i2cWriteBuffer(ESP32_Camera_ADDR, buf);
            basic.pause(100);
        }
        
    }

    //设置AI模式选择
    //% blockId=IIC_SET_AI_Mode block="IIC_SET_AI_Mode|AIMode %AIMode"
    //% weight=88
    //% blockGap=10
    //% group="IIC Write"
    export function IIC_SET_AI_Mode(AIMode:IIC_AI_selcet):void{
        let buf = pins.createBuffer(2);
        buf[0] = vertical_reg;
        buf[1] = AIMode;
        pins.i2cWriteBuffer(ESP32_Camera_ADDR, buf);
        basic.pause(100);
    }


    //设置虚拟按键
    //% blockId=IIC_SET_KEY block="IIC_SET_KEY|KEY %KEYData"
    //% weight=88
    //% blockGap=10
    //% group="IIC Write"
    export function IIC_SET_KEY(KEYData:IIC_KEY_Model):void{
        let buf = pins.createBuffer(2);
        buf[0] = Virtual_key_reg;
        buf[1] = KEYData;
        pins.i2cWriteBuffer(ESP32_Camera_ADDR, buf);
        basic.pause(100); 
    }


    let XH = 0,XL= 0,YH= 0,YL= 0,IDH= 0,IDL= 0
    let center_X = 160
    let center_Y = 120
    let id = 0


    

    //获取中心点X轴方向
    //% blockId=IICGET_CX block="IICGET_CX"
    //% weight=88
    //% blockGap=10
    //% group="IIC Read"
    export function IICGET_CX():number
    {
        return center_X
    }

    //获取中心点Y轴方向
    //% blockId=IICGET_CY block="IICGET_CY"
    //% weight=88
    //% blockGap=10
    //% group="IIC Read"
    export function IICGET_CY():number
    {
        return center_Y
    }

    //获取id
    //% blockId=IICGET_ID block="IICGET_ID"
    //% weight=88
    //% blockGap=10
    //% group="IIC Read"
    export function IICGET_ID():number
    {
        return id
    }

    
    //IIC获取数据
    //% blockId=IICGet_Camera_Data block="IICGet_Camera_Data| %delay_time"
    //% weight=88
    //% blockGap=10
    //% group="IIC Read"
    export function IICGet_Camera_Data(delay_time:number):void
    {       
        for(let i = 0;i<2;i++)//每个寄存器读2次
        {
            pins.i2cWriteNumber(ESP32_Camera_ADDR,Middle_X_Hreg,NumberFormat.UInt8LE,true);//读取X高位寄存器
            XH = pins.i2cReadNumber(ESP32_Camera_ADDR, NumberFormat.UInt8LE, false);
            basic.pause(delay_time);
        }

        for(let i = 0;i<2;i++)//每个寄存器读2次
        {
            pins.i2cWriteNumber(ESP32_Camera_ADDR,Middle_X_Lreg,NumberFormat.UInt8LE,true);//读取X低位寄存器
            XL = pins.i2cReadNumber(ESP32_Camera_ADDR, NumberFormat.UInt8LE, false);
            basic.pause(delay_time);
        }

        for(let i = 0;i<2;i++)//每个寄存器读2次
        {
            pins.i2cWriteNumber(ESP32_Camera_ADDR,Middle_Y_Hreg,NumberFormat.UInt8LE,true);//读取Y高位寄存器
            YH = pins.i2cReadNumber(ESP32_Camera_ADDR, NumberFormat.UInt8LE, false);
            basic.pause(delay_time);
        }

        for(let i = 0;i<2;i++)//每个寄存器读2次
        {
            pins.i2cWriteNumber(ESP32_Camera_ADDR,Middle_Y_Lreg,NumberFormat.UInt8LE,true);//读取Y低位寄存器
            YL = pins.i2cReadNumber(ESP32_Camera_ADDR, NumberFormat.UInt8LE, false);
            basic.pause(delay_time);
        }

        for(let i = 0;i<2;i++)//每个寄存器读2次
        {
            pins.i2cWriteNumber(ESP32_Camera_ADDR,Face_ID_Hreg,NumberFormat.Int8LE,true);//读取id高位寄存器
            IDH = pins.i2cReadNumber(ESP32_Camera_ADDR, NumberFormat.Int8LE, false);
            basic.pause(delay_time);
        }

        for(let i = 0;i<2;i++)//每个寄存器读2次
        {
            pins.i2cWriteNumber(ESP32_Camera_ADDR,Face_ID_Lreg,NumberFormat.Int8LE,true);//读取id低位寄存器
            IDL = pins.i2cReadNumber(ESP32_Camera_ADDR, NumberFormat.Int8LE, false);
            basic.pause(delay_time);
        }

        //数据整合
        center_X = (XH<<8)|XL;
        center_Y = (XH<<8)|XL;
        id = (IDH<<8)|IDL;
        
    }




}