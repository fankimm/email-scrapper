import axios from "axios";
// import fs from 'fs'
// fs.writeFile('data.txt', 'file write start')
export default async function handler(req, res) {
  // const urlList = ["http://www.ddenne.com/", "http://www.inthe-moment.co.kr/"];
  const url = req.query.url
  let result = {};
  let axiosResult;
  try {
    console.log(`${url}작업시작`);
    axiosResult = await axios({
      method: "GET",
      url,
      timeout: 6000 * 10 * 15,
    });

    if (!axiosResult) {
      throw new Error("axios 결과 없음");
    }
    if (axiosResult && axiosResult.data) {
      // const emailRegex = /mailto:(.*)\"$/;
      const emailRegex = /(?:mailto:)(.*?)(?=")/;
      // const emailRegex=/[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}/;
      // const email = axiosResult.data.match(emailRegex)?.split('mailto:')[1].split('\"')[0]
      const email = axiosResult.data.match(emailRegex)?.[1] || "";
      if (!email) {
        throw new Error("매칭 결과 없음");
      }
      console.log("======================================");
      console.log(url);
      console.log(email);
      console.log("======================================");
      // fs.appendFile('data.txt' ,`{${url}:url, email:${email}}`)
      result={
        url,
        res: email,
      };
    }
  } catch (e) {
    console.error("error발생 : 가져오기 실패", e.code, " 타켓 사이트 : ", url);
    result ={
      url,
      res: "가져오기 실패",
    };
  }
  res.json(result);
}
