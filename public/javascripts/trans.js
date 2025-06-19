  // 한글 초성, 중성, 종성 배열 (완성형 조합용)
  const CHO = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
  const JUNG = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
  const JONG = ['', 'ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];

  // 나래어 초성 맵 (자음) - 초성 인덱스 -> 나래어 문자 맵 (역변환용)
  const choToJaeum = {
    0: 'g', 1: 'G', 2: 'n', 3: '[', 4: '[[',
    5: 'r', 6: 'm', 7: 'b', 8: 'B', 9: 'z',
    10: 'Z', 11: 'o', 12: 'j', 13: 'J', 14: 'c',
    15: 'k', 16: 't', 17: 'p', 18: 'h'
  };

  // 나래어 중성 맵 (모음) - 중성 인덱스 -> 나래어 문자열 맵 (역변환용)
  const jungToMoeum = {
    0: 'd', 1: 'd]', 2: 'dd', 3: 'dd]', 4: 'a', 5: 'a]',
    6: 'aa', 7: 'aa]', 8: 'w', 9: 'wd', 10: 'w]', 11: 'w]',
    12: 'ww', 13: 's', 14: 'sa', 15: 'sa]', 16: 's]',
    17: 'ss', 18: '-', 19: '-]', 20: ']'
  };

  // 나래어 초성 맵 (자음) - 나래어 문자 -> 초성 인덱스 (정방향)
  const jaeumToCho = {
    g: 0, G: 1,
    n: 2,
    '[': 3, '[[': 4,
    r: 5,
    m: 6,
    b: 7, B: 8,
    z: 9, Z: 10,
    o: 11,
    j: 12, J: 13,
    c: 14,
    k: 15,
    t: 16,
    p: 17,
    h: 18
  };

  // 나래어 중성 맵 (모음) - 나래어 문자열 -> 중성 인덱스 (정방향)
  const moeumToJung = {
    d: 0, "d]": 1,
    dd: 2, "dd]": 3,
    a: 4, "a]": 5,
    aa: 6, "aa]": 7,
    w: 8, wd: 9, "w]": 10,
    ww: 12,
    s: 13, sa: 14, "sa]": 15, "s]": 16,
    ss: 17,
    "-": 18, "-]": 19,
    "]": 20
  };

  // 나래어 토큰 파싱 (된소리, 2글자 모음 처리)
  function parseTokenToSyllable(token) {
    if(token === '=') return ' '; // '='는 띄어쓰기

    let chars = [];
    for(let i=0; i<token.length; i++) {
      if (token[i] === '[' && token[i+1] === '[') {
        chars.push('[[');
        i++;
        continue;
      }
      if (i+1 < token.length) {
        const twoChar = token.substr(i, 2);
        if (moeumToJung.hasOwnProperty(twoChar)) {
          chars.push(twoChar);
          i++;
          continue;
        }
      }
      if (token[i].toUpperCase() === token[i] && jaeumToCho.hasOwnProperty(token[i])) {
        chars.push(token[i]);
        continue;
      }
      chars.push(token[i]);
    }
    const choChar = chars[0];
    const cho = jaeumToCho[choChar];
    if (cho === undefined) return token;
    const jungChar = chars[1];
    const jung = moeumToJung[jungChar];
    if (jung === undefined) return token;
    let jong = 0;
    if (chars.length > 2) {
      const jongChar = chars[2];
      const jongCho = jaeumToCho[jongChar];
      if (jongCho !== undefined) {
        const jongIndex = JONG.indexOf(CHO[jongCho]);
        if (jongIndex >= 0) jong = jongIndex;
      }
    }
    const syllableCode = 0xAC00 + cho * 21 * 28 + jung * 28 + jong;
    return String.fromCharCode(syllableCode);
  }

function nalangToHangulFull(sentence) {
  // 콤마로 나누고 trim한 토큰 배열
  const tokens = sentence.split(",").map(t => t.trim());

  let result = "";

  tokens.forEach(token => {
    // 빈 토큰은 띄어쓰기(공백)로 처리
    if (token === "" || token === "=") {
      result += " ";
    } else {
      // 나래어 토큰을 한글 음절로 변환
      result += parseTokenToSyllable(token);
    }
  });

  return result;
}

  // 한글 음절 → 초성, 중성, 종성 분리
  function hangulToComponents(char) {
    const code = char.charCodeAt(0);
    if (code < 0xAC00 || code > 0xD7A3) return null; // 한글 완성형 영역 체크
    const SIndex = code - 0xAC00;
    const cho = Math.floor(SIndex / (21 * 28));
    const jung = Math.floor((SIndex % (21 * 28)) / 28);
    const jong = SIndex % 28;
    return { cho, jung, jong };
  }

  // 한글 문장 → 나래어 변환
  function hangulToNalangFull(sentence) {
    let result = [];
    for(let char of sentence) {
      if(char === ' ' || char === '\n' || char === '\t') {
        result.push('=');  // 내부 공백은 '='로 처리
        continue;
      }
      const comps = hangulToComponents(char);
      if(!comps) {
        result.push(char);
        continue;
      }
      const { cho, jung, jong } = comps;
      const choChar = choToJaeum[cho];
      const jungChar = jungToMoeum[jung];
      let jongChar = '';
      if(jong !== 0) {
        const jongLetter = JONG[jong];
        const jongIdx = CHO.indexOf(jongLetter);
        if(jongIdx !== -1) jongChar = choToJaeum[jongIdx];
      }
      const syllable = choChar + jungChar + jongChar;
      result.push(syllable);
    }
    return result.join(',');
  }

  // 나래어 → 한글 버튼 이벤트
  function translateNalang() {
    const input = document.getElementById("inputNalang").value;
    const output = nalangToHangulFull(input);
    // 공백을 화면에 띄어쓰기처럼 보이도록 &nbsp;로 바꿈
    document.getElementById("resultHangul").innerHTML = output.replace(/ /g, '&nbsp;');
  }

  // 한글 → 나래어 버튼 이벤트
  function translateHangul() {
    const input = document.getElementById("inputHangul").value;
    const output = hangulToNalangFull(input);
    // '='는 화면에서 공백처럼 보이도록 &nbsp;로 변환
    document.getElementById("resultNalang").innerHTML = output.replace(/=/g, '&nbsp;');
  }
