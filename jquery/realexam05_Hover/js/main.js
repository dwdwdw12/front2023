$(function(){
    $('#buttons1 button:nth-child(n+1):nth-child(-n+4)').on('mouseover', function(){
        $(this).stop().animate({backgroundColor: "purple", color : '#FFF'}, 300);
    }).on('mouseout', function(){
        $(this).stop().animate({backgroundColor: "#FFF", color : 'purple'}, 300);
    })

    $('#buttons1 button:nth-child(n+5):nth-child(-n+8)').on('mouseenter', function(){
        $(this).stop().animate({"border-width": '12px', color: '#000'}, 300, 'easeInOutBounce');   //animate->easing 효과 삽입, 문자열의 형태. jquery가 삽입되어 있어야 함.
    }).on('mouseleave', function(){
        $(this).stop().animate({"border-width": '0px', color: 'purple'}, 300, 'easeInOutBounce');
    })

    $('#buttons1 button:nth-child(n+9)').on('mouseenter', function(){   //9번째부터 끝까지
        $(this).find('>span').stop().animate({width: "100%"}, 300, 'easeInOutBounce');
    }).on('mouseleave', function(){
        $(this).find('>span').animate({width: '0%'}, 300, 'easeInOutBounce');
    })
});
