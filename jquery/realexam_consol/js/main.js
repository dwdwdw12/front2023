$(function(){   //=$(document).ready
    
    let $typo= $('#typo')
    $typo.typoShadow();
    
    /////////////////////////////////////////////////////////////

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

    /////////////////////////////////////////////////////////////////////
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

    //button2 관련 코드
    $('#buttons2 button').each(function(index){
        // console.log("반복");    //4번 반복
        // console.log("반복", arguments.length);  //2개를 넘겨줌
        // console.log("첫번째: ", arguments[0], "두번째: ", arguments[1]); //index와 내용물을 반환

        //버튼을 원하는 기준에 따라서 배치
        $(this).css('top', index*40-40);   //button의 index마다 40px만큼 높이에 차이를 둠, +'px' 생략, 기준점(높이=0) 설정 가능.  
    }).on('mouseover', function(){
        //배경색과 글자색이 바뀜
        $(this).stop().animate({color : 'black', backgroundColor: 'yellow'}, 300);
        //녹색 이미지 대신에 검은색 이미지가 나와야 한다.
        $(this).find("img:first-child").stop().animate({opacity : 0}, 300);
        $(this).find("img:nth-child(2)").stop().animate({opacity : 1}, 300);
    }).on('mouseout', function(){
        $(this).stop().animate({color : '#01b169', backgroundColor: 'white'}, 300);
        $(this).find("img:first-child").stop().animate({opacity : 1}, 300);
        $(this).find("img:nth-child(2)").stop().animate({opacity : 0}, 300);
    })

    //side 이미지 네비게이션 관련 코드
    let $aside=$('.page-main>aside')  //let $side=$('#aside');
    //console.log($aside);
    let $asideButton=$aside.find('button');   //let $sideButton=$('#aside button');
    //console.log($asideButton)


    $asideButton.on('click', function(){
        //클래스 속성을 추가하면 열린상태가 되고, 클래스 속성이 제거되면 닫힌 상태
        //속성이 있으면 열림, 없으면 닫힘
        $aside.toggleClass("open"); 
        if($aside.hasClass("open")){
            //닫힘 상태에서 열림 상태가 되어야 한다.
            //닫힌상태에서 클릭->열려야 하고, 이미지도 변경되어야 한다(open>close)
            $aside.stop().animate({left : '-70px'}, 500, 'easeInOutElastic');
            //css({left: '-70px'});
            $asideButton.find('img').attr("src", "img/btn_close.png");
        } else{
            //열림 상태에서 닫힘 상태가 되어야 한다.
            //열린상태에서 클릭->닫혀야 하고, 이미지도 변경되어야 한다(close>open)
            $aside.stop().animate({left : '-350px'}, 500, 'easeInOutElastic');
            $asideButton.find('img').attr("src", "img/btn_open.png");
        };
    })

    // 방법2) 변수를 선언한 뒤, 클릭할 때마다 1씩 증가. 홀수/짝수로 구분하여 열림/닫힘을 판단하는 방법.
    // let count=0;
    // $asideButton.on('click', function(){
    //     count=count+1;
    //     if(count%2==1){
    //         $aside.stop().animate({left : '-70px'}, 500, 'easeInOutElastic');
    //         $asideButton.find('img').attr("src", "img/btn_close.png");
    //     } else{
    //         $aside.stop().animate({left : '-350px'}, 500, 'easeInOutElastic');
    //         $asideButton.find('img').attr("src", "img/btn_open.png");
    //     }
    // })

});
