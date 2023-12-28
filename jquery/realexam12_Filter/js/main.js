$(function () {

    $('#gallery').each(function () {
        let $container = $(this),
            $loadMoreButton = $('#load-more'),  
            $filter = $('#gallery-filter');

        let addItemCount = 12;  //한 번에 표시할 항목 수. 4의 배수(1행에 4개의 이미지를 표현하므로)
            added = 0,  //화면에 표시된 이미지 항목 수를 담고있는 변수
            allData = [],
            filteredData = [];   

        $container.masonry({
            columnWidth: 230,
            gutter: 10,
            itemSelector: '.gallery-item'
        });

        $.getJSON('./data/content.json', initGallary); //json url, callback함수

        function initGallary(data){
            //console.log(data);
            allData= data;
            filteredData= allData;  //파일에 96개의 데이터 수록
            addItems();

            $loadMoreButton.on('click', addItems);

            $filter.on('change', 'input[type="radio"]', filterItems) //filter->form을 가리킴
        }

        function addItems(filter){
            let elements = [];                  //0       0 + 12, 배열에 담음  
            let slicedData = filteredData.slice(added, added+addItemCount); 
            // console.log("allData= ", allData);
            // console.log("filteredData= ", filteredData);
            // console.log("slicedData= ", slicedData);
            $.each(slicedData, function(index, item){
                let itemHTML = `
                <li class="gallery-item is-loading">
                    <a href="${item.images.large}">
                        <img src="${item.images.thumb}" alt="${item.title}" />
                            <span class="caption">
                                <b class="title">${item.title}</b>
                                    <time class="date" datatime="${item.date}">
                                        ${item.date.replace(/-0?/g, '/')}   
                                    </time>
                        </span>
                    </a>
                </li>`;
                //replace(/-0?/g, '/')  모든 -,-0를 제거 후 /로 대체 
                //2012-01-04 =>2012/1/4
                elements.push($(itemHTML).get(0));
            });
           // console.log(elements);

            $container.append(elements);
            $container.imagesLoaded(function(){
                $(elements).removeClass("is-loading");
                $container.masonry('appended', elements);
                if(filter){
                    $container.masonry();   //필터링에 의한 요청일 때 재배치
                }
            });

            added = added + slicedData.length;
            if(added<filteredData.length){  //남아있는 데이터가 있다면 loadmorebutton을 나타내고 남아있지 않으면 숨겨라
                $loadMoreButton.show();
            } else{
                $loadMoreButton.hide();
            }
        }

        //이미지 필터링
        //$filter.on('change', 'input[type="radio"]'(입력 폼 안에 있는 라디오버튼), filterItems)
        function filterItems(){
            let key=$(this).val();  //radio button의 value에 category가 입력되어 있음.
            let masonryItems = $container.masonry('getItemElements');   
            //masonry에 의해 배치되어, 화면에 있는 아이템을 모두 가져오기

            $container.masonry('remove', masonryItems); //모두 제거

            filteredData=[];
            added=0;
            if(key === 'all'){       //index.html 참고, radio 버튼의 value
                filteredData= allData;
            } 
            if(key !== 'all'){
                filteredData=$.grep(allData, function(item){  //.map과 같음
                    return item.category === key;
                });        //$.grep(array, function(true/false반환)), true에 해당하는 값이 새로운 배열에 저장
            }

            addItems(true);
        }
        
    });

    //스크롤을 내릴때 헤더의 높이가 줄어들도록 만들기. 패딩의 값이 0이 되면 더이상 줄어들지 않게 하기.
    $('.page-header').each(function(){  //each->대상이 1개일 때 그룹으로 묶는 역할
        let $header = $(this);
        let headerHeight = $header.outerHeight();
        let headerPaddingTop = parseInt($header.css('paddingTop'), 10); //10진수
        //console.log(headerPaddingTop);
        let headderPaddingBottom = parseInt($header.css('paddingBottom'), 10);
        
        $(window).on('scroll', $.throttle(1000/60, function(){  //index.html 참고, 1.000초에 60번
            let scroll = $(this).scrollTop();   //위에서 아래로 내린 스크롤의 정도
            let styles ={};

            if(scroll > 0){
                if(scroll<headerHeight){
                    styles={
                        paddingTop: headerPaddingTop-scroll/2,
                        paddingBottom: headderPaddingBottom-scroll/2
                    };
                } else{
                    styles={
                        paddingTop: 0,
                        paddingBottom: 0
                    };
                }
            } else{
                styles={
                    paddingTop: '',
                    paddingBottom: ''

                };
            }
            $header.css(styles);

        })); 

    });
});
