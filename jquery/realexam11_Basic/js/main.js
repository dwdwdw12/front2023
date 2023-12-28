$(function () {
    $('#gallery').each(function () {
        let $container=$(this);
        $container.masonry({   //masonry 설정=>3개의 항목(필수)이 객체 형태로 지정.
            //.masonry({칼럼의 너비, 칼럼 사이의 공간, 칼럼에 들어갈 내용})
            columnWidth: 230,      //단위: px
            gutter: 10,
            itemSelector: '.gallery-item'    //클래스 속성
        });

        //JSON 형태로 구성된 파일 읽어오기=>HTML node를 만든다.
        //만들어진 node를 HTML 문서에 삽입한다.
        $.getJSON('./data/content.json', function(data){
            //console.log(data);    //데이터 확인
            let elements= [];
            $.each(data, function(i, item){   //utility method, 배열 중에서 하나씩 꺼내어 function에 넘겨줌. index, item.
                //console.log(i, "==", item);
                let itemHTML= `<li class="gallery-item is-loading"><a href="${item.images.large}"><img src="${item.images.thumb}" alt="" alter="${item.title}"></a></li>`

                // let itemHTML = '<li class="gallery-item is-loading">' +
                //                     '<a href="'+item.images.large+'">'    +
                //                         '<img src="'+ item.images.thumb+'" alt="" alter="'+item.title+'">'  +
                //                     '</a>'+
                //                 '</li>';     옛날 방식
                
                elements.push($(itemHTML).get(0));
                //만들어진 HTML태그 추가.
                //.get(0): $(itemHTML) 하나 선택. [0]과 동일. each로 반복하므로 생성될때마다 입력됨. 
            });

            $container.append(elements);

            $container.imagesLoaded(function(){
                $(elements).removeClass("is-loading"); //로딩이 끝나면 클래스를 제거
                $container.masonry('appended', elements); //기존 영역에 블록을 새롭게 추가한다.
            });
            
        })

	});
});
