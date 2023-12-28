<!-- 자바에 필요한 클래스, 상속 필드, 메소드들이 정의되어 있다 -->

String irum = request.getParameter("irum");
String memId = request.getParameter("memId");
String memPwd = request.getParameter("memPwd");
String memBir = request.getParameter("memBir");
int memAge = Integer.parseInt(request.getParameter("memAge")); <!--숫자는 문자로 변환 후 전송. 다시 정수로 변환할 필요가 있음-->
String memAddr = request.getParameter("memAddr");
String memEmail = request.getParameter("memEmail");
String gender = request.getParameter("gender");     <!--상자의 개수대로 생성-->     
String[] aaaa = request.getParameterValues("aaaa"); <!--aaaa는 체크박스. 자료가 여러개라 배열로 저장.-->
<!--처리작업을 한다.
    결과를 원격지(요청한곳)으로 되돌려준다-->