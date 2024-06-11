//% blockId=WIFI_Camera block="WIFI_Camera"
//%color="#228B22" weight=25 icon="\uf06e"
namespace WIFI_Camera {


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



}