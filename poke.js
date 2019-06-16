$(function () {
    let poke = [];
    let colorArr = ['s','h','d','c'];
    let flag = {};

    for (let i =0;i<52;i++){
        let index = Math.floor(Math.random()*colorArr.length);
        let color = colorArr[index];
        let number = Math.round(Math.random()*12+1);
        while (flag[color+'_'+number]){
            index = Math.floor(Math.random()*colorArr.length);
            color = colorArr[index];
            number = Math.round(Math.random()*12+1);
        }
        poke.push({color,number})
        flag[color+'_'+number]=true;
    }
//    发牌
    let index = -1;
    for (let i=0;i<8;i++){
        for (let j=0;j<=i;j++){
            index++;
            let obj = poke[index];
            let lefts = 350-50*i+100*j, tops =40*i;
            $("<div>").addClass("poke")

                .css({backgroundImage:`url(./imgs/imgs/${obj.number}${obj.color}.jpg)`})
                .appendTo(".box")
                .data('number',obj.number)
                .delay(index*50)
                .attr("id",i+'_'+j)
                .animate({left:lefts,top:tops,opacity:1})


        }
    }

    for (;index<52;index++){

        let obj = poke[index];

        // let lefts = k*100;
        $("<div>").addClass("poke")
            .css({backgroundImage:`url(./imgs/imgs/${obj.number}${obj.color}.jpg)`})
            .addClass("left")
            .appendTo(".box")
            .data('number',obj.number)
            .delay(index*60)
            .attr('id',-2,-2)
            .animate({left:0,top:480,opacity:1})
    }


    let first = null;
    $(".box").on("click",".poke",function () {
        let _this = $(this);
        let [i,j] = _this.attr("id").split("_")
        let id1 = i*1+1+'_'+j , id2 = i*1+1+'_'+(j*1+1);
        if($("#"+id1).length || $("#"+id2).length){
            return
        }
        if (!_this.hasClass('active')){
            _this.addClass('active').animate({top:'-=30px'});
        }else {
            _this.removeClass('active').animate({top:"+=30px"});
        }

        if (!first){
            first =_this;

        }else {
            let number1 = first.data("number"), number2 = _this.data("number");
            console.log(number1, number2);
            if (number1 === number2){
                $('.active').animate({top :0,left:0,opacity:0},function () {
                    $(this).remove();

                })
            }else {
                $('.active').animate({top:"+=30px"},function () {
                    $(this).removeClass('active');
                })
            }
            first = null;

        }

    })
    let n = 0;
    let rightbtn=$('.rightbtn');
    rightbtn.on('click',function () {
        let left=$('.left');
        left.last().animate({left:700,zIndex:n++},function () {
            $(this).removeClass('left').addClass('right');
        });


    });
    let leftbtn=$('.leftbtn');
    leftbtn.on('click',function () {
        let right=$('.right');

        right.first().animate({left:0,zIndex:n++},function () {
            $(this).removeClass('right').addClass('left');
        });


    });

})