$(document).ready(function () {
    var type = window.location.href;
    var data = type.split("="); //截取 url中的“=”,获得“=”后面的参数  
    var type = decodeURI(data[1]); //decodeURI解码  

    const Ip = localStorage.getItem('Ip');

    $('#bodyBar').load('other_userInfo_header.html', function () {
        getUserInfo(type);
    })

    

    $(document).on('click','.navigation li',function(){
        switch($(this).index()){
            case 0:window.location.href = "other_userInfo_dynamic.html?id="+type; break;
            case 1:window.location.href = "other_userInfo_filmCritics.html?id="+type; break;
            case 2:window.location.href = "other_userInfo_favorite.html?id="+type; break;
            case 3:window.location.href = "other_userInfo_films.html?id="+type; break;
        }
        
    })

    function getUserInfo(id) {
        $.ajax({
            type: "post",
            url: Ip + '/user/queryUserInfo?userId=' + id,
            dataType: 'json',
            timeout: 0,
            success: function (res) {
                console.log(res)
                $('#bodyBar .headImg').css("background-image", "url(" + Ip + "/file/images/" + res.data.id + "/" + res.data.headImg + ")");
                $('#bodyBar .userName').text(res.data.nickName);
                $('#bodyBar .userIntroduce').text(res.data.introduce);
                $('#fansNumber').text(res.data.fans);
                $('#followNumber').text(res.data.focus);
                /* $('#bodyBar ul li').eq(0).css('border-bottom', '#00a1d6 solid 3px'); */
            },
            error: function (err) {
                console.log(err);
            }
        });
    }
})