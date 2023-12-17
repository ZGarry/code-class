function show(mes) {
    $("#console").html(mes)

    // 展示&消失
    $("#console").show('slow')
    setTimeout(function(){
        $("#console").hide('slow');
    },2000)
}

$(document).ready(function() {
    $("body").append("<div id='console'></div>")
    show("文档加载完成")
})