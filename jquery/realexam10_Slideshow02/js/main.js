$(function () {
    $('.slideshow').each(function(){
        let $container = $(this);
        let $slideGroup = $container.find('.slideshow-slides');
        let $slides = $slideGroup.find('.slide');
        let $nav = $container.find('.slideshow-nav');
        let $indicator = $container.find('.slideshow-indicator');

        let slideCount = $slides.length;
        let indicatorHTML = '';
        let currentIndex = 0;
        let duration = 500;
        let easing = 'easeInOutExpo';
        let interval = 3000;
        let timer;

        $slides.each(function(i){
            $(this).css({left: 100*i + '%'});
            indicatorHTML = indicatorHTML + ('<a href= "#">'+ i + '</a>');  
            //<div class="slideshow-indicator"></div>에 들어갈 태그를 이미지 개수만큼 만들기. anchor tag가 만들어짐
        });
        //console.log(indicatorHTML);
        $indicator.html(indicatorHTML); //만들어진 태그를 인디케이터 영역에 삽입 
                                        //=> 실제 화면에 나타나게 된다.
        
        function goToSlide(index){
            $slideGroup.stop().animate({left: -100*index+'%'}, duration, easing);
            //가로로 늘어선 이미지를, left를 조절하여 화면에 표시.
            currentIndex = index;   //현재 보여지는 이미지값을 현재 포지션으로 대입시킨다.
            updateNav();   //표시된 이미지에 해당하는, 화면 아래 n번째 sprite의 색상을 바꿈(흰색->검정) 
        }
        //넘겨받은 이미지 인덱스 값에 따라서 $slideGroup 상자의 위치를 이동시키고, 네비게이션 관련 수정작업을 호출한다.
        
        function updateNav(){
            let $navPrev = $nav.find('.prev'),
                $navNext = $nav.find('.next');
            if(currentIndex === 0){ 
            //화면에 나타난 이미지가 첫번째 이미지->이전 버튼이 없어야 한다.
                $navPrev.addClass('disabled');
            } else {
                $navPrev.removeClass('disabled');
            }
            if(currentIndex === slideCount-1){
            //화면에 나타난 이미지가 마지막 이미지-> 다음 버튼이 없어야 한다.
                $navNext.addClass('disabled');
            } else {
                $navNext.removeClass('disabled');
            }

            //인디케이터 안의 a태그의 모든 액티브라는 클래스 속성을 지움
            $indicator.find('a').removeClass('active'); 
            //인디케이터 안의 a태그 중에서 현재 인덱스에만 클래스 속성 액티브를 추가
            $indicator.find('a').eq(currentIndex).addClass('active');
        }

        function startTimer(){
            timer = setInterval(function(){
                let nextIndex = (currentIndex+1)%slideCount;
                goToSlide(nextIndex);
            }, interval);
        }

        function stopTimer(){
            clearInterval(timer);
        }

        $nav.on('click', 'a' , function(event){      
            //on()은 경우에 따라 3개의 변수를 가질 수 있음. 두번째는 find와 가까운 의미
            event.preventDefault(); //취소
            if($(this).hasClass('prev')){
                goToSlide(currentIndex-1);
            } else{
                goToSlide(currentIndex+1);
            }
        });

        $indicator.on('click', 'a', function(event){
            event.preventDefault();
            let aaa=$(this).index();
            console.log(aaa);
            goToSlide($(this).index());     //현재 클릭한 a태그의 인덱스값을 얻어서 그 값을 goToSlide 함수에 전달한다.
        });

        $container.on({
            mouseenter: stopTimer,
            mouseleave: startTimer 
        });

        goToSlide(currentIndex);
        startTimer();

    });
});
