$(function(){   //=$(document).ready

    let $images = $('#images p');
    $images.filter(":nth-child(1)").on('mouseover', function(){
        $(this).find('strong, span').stop().animate({opacity: 1}, 300);
    }).on('mouseout', function(){
        $(this).find('strong, span').stop().animate({opacity: 0}, 300);
    });

    $images.filter(":nth-child(2)").on('mouseover', function(){
        $(this).find('strong').stop().animate({opacity: 1, left : 0}, 300);
        $(this).find('span').stop().animate({opacity: 1}, 300);
    }).on('mouseout', function(){
        $(this).find('strong').stop().animate({opacity: 0, left: "-200%"}, 300);      //왼쪽에서 오른쪽으로.
        $(this).find('span').stop().animate({opacity: 0}, 300);
    });

    $images.filter(":nth-child(3)").on('mouseover', function(){
        $(this).find('strong').stop().animate({/*opacity:1,*/ bottom : 0}, 300);
        $(this).find('span').stop().animate({opacity: 1}, 300);
        $(this).find('img').stop().animate({top: "20px"}, 300);
    }).on('mouseout', function(){
        $(this).find('strong').stop().animate({opacity: 0, bottom: "-80px"}, 300);      //아래에서 위로.
        $(this).find('span').stop().animate({opacity: 0}, 300);
        $(this).find('img').stop().animate({top: 0}, 300);
    });
    
});
