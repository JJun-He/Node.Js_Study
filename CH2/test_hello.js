import http from "k6/http";

export let options = {      // 1. 테스트 옵셕
    vus: 100,
    duration: "10s"
};  

export default function () {
    http.get("http://localhost:8000");   // 2. 테스트에 사용할 함수 지정
}