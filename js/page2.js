/**
 * Created by Administrator on 2017/3/24.
 */

//远吗

mui.init({
    pullRefresh: {
        container: '#pullrefresh',
        down: {
            callback: pulldownRefresh
        }
    }
});
/**
 * 下拉刷新具体业务实现
 */
function pulldownRefresh() {
    setTimeout(function() {
        var table = document.body.querySelector('.mui-table-view');
        var cells = document.body.querySelectorAll('.mui-table-view-cell');
        mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
    }, 1500);
}
var count = 0;
/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {
    setTimeout(function() {
        mui('#pullrefresh').pullRefresh().endPullupToRefresh((++count > 2)); //参数为true代表没有更多数据了。
    }, 1500);
}
if (mui.os.plus) {
    mui.plusReady(function() {
        setTimeout(function() {
            mui('#pullrefresh').pullRefresh().pullupLoading();
        }, 1000);
    });
} else {
    mui.ready(function() {
        mui('#pullrefresh').pullRefresh().pullupLoading();
    });
}

//mui不支持跨域 只能用 jquery

//显示表格的全部内容
var  jurl ="http://192.168.1.60/company/taskmanage/WS/GetWebService.asmx/GetAllCompanyInfo?jsoncallback=?";
getinfo(jurl);
setInterval(function(){ getinfo(jurl);},50000);
//通过ajax异步获取数据
function getinfo(url)
{
    $.ajax({
        type: "get",//使用get方法访问后台
        url:url,
        dataType: "jsonp",
        jsonp: "json",
        data: "",
        timeout: 50000,
        //要访问的后台地址
        error: function(data)
        {
            //alert('json文件访问失败' + result);
        },
        success:function (data) {
            console.log(data);
            var result = eval(data);
            var str = "";
            function up(x, y) {
                if(x.State!= y.State) { return (x.State >  y.State) ? 1 : -1;
                } else
                {
                    var qtime=timeFormattertest(x.UpQuestionTime);
                    var etime= timeFormattertest(y.UpQuestionTime);
                    return (x.State ==y.State&&qtime < etime) ? 1 : -1;
                }
            }
            result.sort(up);
            for (var i = 0; i < result.length; i++) {
                var tj;
                var qtime;
                var name = result[i].Name;
                var describe = result[i].Contents.substring(0,25);
                var address = result[i].Address.substring(0,25);
                var lxrname = result[i].LXRName;
                var jinjichengdu = result[i].StrJinJiChengDu;
                var chuliway = result[i].Way;
                var state = result[i].State;
                var tuijian = result[i].TuiJianLXR;
                var prname=result[i].ProjectName;
                var prnum1=result[i].ProjectNumber;
                var strdate = result[i].StarQuestionTime;
                var ptend =result[i].ptEnd;
                var currenpeople = result[i].CurrentPeople;
                var UpQuestionTime = timeFormattertest(result[i].UpQuestionTime);
                var lxrmobile = result[i].LXRMobiles.substring(0,11);

                console.log(lxrmobile);
                //if(lxrmobile==""){lxrmobile="&nbsp;"}else{lxrmobile = lxrmobile+ "****";}
                describe=nullreturn(describe);
                address=nullreturn(address);
                lxrname=nullreturn(lxrname);
                jinjichengdu=nullreturn(jinjichengdu);
                chuliway =nullreturn(chuliway);
                prname=nullreturn(prname);
                UpQuestionTime=nullreturn( UpQuestionTime);
                function nullreturn(e)
                {
                    if(e==""){
                        e = "&nbsp;"
                    }
                    return e;
                }
                if (state==1) {
                    state = "<img src = 'images/1.png'/>";
                    if(tuijian ==""){ tj="&nbsp;"}else{ tj = tuijian}
                } else if (state==2) {
                    state = "<img src = 'images/2.gif'/>";
                    if(currenpeople ==""){tj="&nbsp;"}else{tj= currenpeople}
                } else if (state==3) {
                    state = "<img src = 'images/3.png'/>";
                    if(currenpeople ==""){tj="&nbsp;"}else{tj= currenpeople}
                }else if(state==4){
                    state = "<img src = 'images/4.png'/>";
                }else {
                    state = "<img src = 'images/5.png'/>";
                    if(currenpeople ==""){tj="&nbsp;"}else{tj= currenpeople}
                }

                if (result[i].StarQuestionTime!= null) {
                    strdate = timeFormattertest(strdate);
                    ptend =timeFormattertest(ptend);
                    qtime="接单时间:<br />"+strdate+"<br />最近处理:<br />" + ptend
                }else{qtime="&nbsp;"}
                str += `<li class="mui-table-view-cell mui-collapse table">
                    <a href="#" class="mui-navigate-right">
                        <table class="taskTable">
                            <thead>
                            <tr>
                                <th >名称 &nbsp;/&nbsp;类型</th>
                                <th>状态</th>
                                <th>申请人</th>
                                <th>处理人</th>
                                <th style="width: 20%">编号/数量</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td width="30%"><span class="projectName">${prname}</span>&nbsp;/&nbsp;<i style="color: red">${chuliway}</i></td>
                                <td class="zhuangtai">
                                    <img src="img/no-response.png" alt="" style="width: 50px"/>
                                    <span class="mui-icon-extra mui-icon-extra-phone"></span>
                                    <i>${jinjichengdu}</i>
                                </td>
                                <td>${name}</td>
                                <td>${currenpeople}</td>
                                <td style="font-weight: bold"><i>55488</i>&nbsp;/&nbsp;<span>5</span></td>
                            </tr>
                            </tbody>
                        </table>
                    </a>
                    <div class="mui-collapse-content ">
                        <table class="taskTable">
                            <thead>
                            <tr>
                                <th style="width: 30%">地址</th>
                                <th style="width: 15%">客户</th>
                                <th style="width: 35%">联系方式</th>
                                <th>任务处理</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>${address}</td>
                                <td>${lxrname}</td>
                                <td>
                                    <span>${lxrmobile}</span>
                                </td>
                                <td>
                                    <span class="mui-btn-blue">处理</span>
                                    <span class="mui-btn-red">进程</span>
                                </td>

                            </tr>
                            <tr>
                                <td>
                                    <h5>发布时间：<span>${UpQuestionTime}</span></h5>
                                    <h5>接单时间：<span>${strdate}</span></h5>
                                    <h5>进行时间：<span>${ptend}</span></h5>
                                    <h5>预计时间：<span>8小时</span>&nbsp;/<span style="color: red">系数:</span><i style="color: red">1.1</i></h5>
                                </td>
                                <td>
                                    <h5>质量分：<span>5</span></h5>
                                    <h5>速度分：<span>5</span></h5>
                                    <h5>态度分：<span>5</span></h5>
                                    <h5>总分：<span>15</span></h5>
                                </td>
                                <td colspan="2">
                                    <div class="detail" style="font-size: 10px;line-height: 12px">
                                    ${describe}
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </li>
`;
            }
            $("#tbody-result").html(str);
            /**for (var j = 0; j < result.length ; j++) {
          var id = result[j].ID;
          var smurl = 'http://192.168.1.60/Login.aspx?fromurl=1&cid='+id;
          var qrcode = new QRCode('qrcode' + j, {
            text: smurl,
            width: 150,
            height: 150,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
          });
        }**/
            $(".td13").each(function(){
                var time = $(this).html();
                var timearr = time.split("-");
                var timequest = timearr.join("/");
                var date1 = new Date();
                var date2 = new Date(timequest);
                var hour = (date1 - date2)/3600000;
                if (hour > 12 && state==1) {$(this).css("backgroundColor", "red");}
            });
        }
    })
}
//转换时间格式的函数
function timeFormattertest(value) {
    var da = new Date(parseInt(value.replace("/Date(", "").replace(")/", "").split("+")[0]));
    var y = da.getFullYear();
    var mo = da.getMonth() + 1;
    var day = da.getDate();
    if(day<10){day = "0"+day}
    var h = da.getHours();
    if (h<10) {h ="0"+ h}
    var m = da.getMinutes();
    if (m <10){m = "0" + m}
    return y + "-" + mo + "-" + day + " "+ h +":"+ m;
}

//查询复选框的数据要提出的数据
$("#chaxun").click(function() {
    var id_array = new Array();
    var t = "";
    var three = "";
    $(":checkbox[name='cc']").each(function () {
        if ($(this).is(":checked")) {
            t = $(this).attr("id");
            id_array.push(t);
        }
    });

    var two = id_array.join(',');

    if (two == "") {
        alert("请至少选择一项");
    }

    var one = $("#sousuo").val();
    if ($(":checkbox[name='jilu']").is(":checked")) {
        three = 1;
    } else {
        three = 0;
    }
    //alert(three)
    var qurl = "http://192.168.1.60/company/taskmanage/WS/GetWebService.asmx/SearchCompanyInfo?jsoncallback=?&searchcontents="
        + one + "&checkedcontents=" + two + "&CheckBoxCurrentPeople=" + three;
    getinfo(qurl);
    setInterval(function(){ getinfo(qurl);},50000);
});

