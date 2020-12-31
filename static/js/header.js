
$(document).ready(function () {

    var userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if(userInfo==null){
        userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        if(userInfo == null){
            userInfo={
                id:0
            }
        }
    }

    const Ip = localStorage.getItem('Ip');

    var filmInfo;
    var keyword;

    $('header').load('header.html', function () {
        if(userInfo.id != 0){
            $("#headerHeadImg").attr("src", ""+Ip+"/file/images/" + userInfo.id + "/" + userInfo.headImg);
            $("#userName").text(userInfo.nickName);
        }
    })

    var t;
    $(document).on("keyup", "#searchText", function () {
        /* console.log($("#searchText").val()) */
        if ($("#searchText").val() == '') {
            $('.searchList').css('display', 'none')
            $(".searchList").empty();
        }
        /* search($("#searchText").val()) */
        if (this.keyCode != 13 && this.keyCode != 8) {
            clearTimeout(t);
            t = setTimeout(function () {
                search($("#searchText").val())
            }, 300);
        }

    })

    $(document).on("click", ".searchList li", function () {
        console.log($(this).index())
        console.log(filmInfo[$(this).index()]);
        var film=[];
        film.push(filmInfo[$(this).index()]);
        var jsonStr = JSON.stringify(film);
        sessionStorage.setItem("filmInfo", jsonStr);
        var twoUrl = encodeURI("search.html?keyword="+$("#searchText").val()); //使用encodeURI编码 
        location.href = twoUrl;
    })

    $(document).on("click", "#searchBtn", function () {
        var jsonStr = JSON.stringify(filmInfo);
        sessionStorage.setItem("filmInfo", jsonStr);
        var twoUrl = encodeURI("search.html?keyword="+$("#searchText").val()); //使用encodeURI编码 
        location.href = twoUrl;
        /* window.location.href = "search.html"; */
    })

    $(document).on('click','#exit',function(){
        localStorage.removeItem('userInfo')
        sessionStorage.removeItem('userInfo');
        window.location.href = "login.html";
    })

    /* $('.searchList').on("click","li",function(){      
        console.log('-1-1-1-1-1-');
    }); */

    function search(keyWord) {
        $.ajax({
            type: "post",
            url: Ip+'/movie/getMovies?kw=' + keyWord,
            dataType: 'json',
            success: function (res) {
                console.log(res);
                filmInfo=[];
                filmInfo=res.movies.list;
                $('.searchList').css('display', 'block')
                $(".searchList").empty();
                for (var i = 0; i < (res.movies.list).length; i++) {
                    $(".searchList").append('<li class="searchItem">' + res.movies.list[i].nm + '</li>');
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    }
})

layui.use('element', function () {
    var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块

    //监听导航点击
    element.on('nav(demo)', function (elem) {
        //console.log(elem)
        layer.msg(elem.text());
    });
});