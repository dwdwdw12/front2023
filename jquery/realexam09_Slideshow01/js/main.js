$(function () {
   // $('#fileList').load('slideImgList.txt');    //파일 불러오기

    $('.slideshow').each(function(){
        let $slides = $(this).find('img');
        let slideCount = $slides.length;
        //console.log(slideCount);

        let currentIndex = 0;
        $slides.eq(currentIndex).fadeIn();  //첫 이미지를 나타나게 함

        let showNextSlide = function(){     //다음 이미지를 나타나게 함
            let nextIndex= (currentIndex + 1) % slideCount; //%를 이용하여 계속 반복하게 함

            //현재 이미지를 사라지게 하고,
            $slides.eq(currentIndex).fadeOut();
            //다음 이미지를 나타나게 하고, 다음 이미지를 현재 이미지값으로 변경
            $slides.eq(nextIndex).fadeIn();

            currentIndex = nextIndex;
        };

        let timer= setInterval(showNextSlide, 2000);    //시간 간격을 설정

        $(this).on('mouseover', function(){     //마우스의 동작에 따른 함수작동
            clearInterval(timer);
        }).on('mouseout', function(){
            timer = setInterval(showNextSlide, 2000);   
        })
    });
});
