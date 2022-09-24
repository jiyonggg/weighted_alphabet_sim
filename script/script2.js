// 사이트에서 사용되는 객체, 디폴트 변수

const defaultmProb = 3/7;
const defaultlProb = 97/15;
const middleAlphas = ['A', 'E', 'I', 'L', 'O', 'S', 'W'];
/**
 * 일반 알파벳 상자
 */
class NormalAlphabetBox {
    // Private Fields
    #mProb;
    #lProb;

    constructor() {
        this.#mProb = window.defaultmProb;
        this.#lProb = window.defaultlProb;

        this.contents = ['A', 'B', 'C', 'D', 'E',
                        'F', 'G', 'I', 'J', 'K',
                        'L', 'O', 'P', 'Q', 'S',
                        'T', 'U', 'V', 'W', 'X',
                        'Y', 'Z'];
        this.weights = [this.#mProb, this.#lProb, this.#lProb, this.#lProb, this.#mProb,
                        this.#lProb, this.#lProb, this.#mProb, this.#lProb, this.#lProb,
                        this.#mProb, this.#mProb, this.#lProb, this.#lProb, this.#mProb,
                        this.#lProb, this.#lProb, this.#lProb, this.#mProb, this.#lProb,
                        this.#lProb, this.#lProb];
    }

    // Getter and Setter

    get mProb() {
        return this.#mProb;
    }
    set mProb(prob) {
        this.#mProb = prob;
    }
    get lProb() {
        return this.#lProb;
    }
    set lProb(prob) {
        this.#lProb = prob;
    }
}

/**
 * 불꽃 알파벳 상자
 */
class HighAlphabetBox {
    // Private Fields
    #hProb;

    constructor() {
        this.#hProb = 25;

        this.contents = ['H', 'M', 'N', 'R'];
        this.weights = [this.#hProb, this.#hProb, this.#hProb, this.#hProb];
    }
}

/**
 * 시뮬레이터
 */
class Simulator {
    // Private Fields
    #boxes;
    #resultObject;

    constructor() {
        this.#boxes = new Map();

        this.#boxes.set("normal", new NormalAlphabetBox());
        this.#boxes.set("high", new HighAlphabetBox());

        this.#resultObject = new SimulationResult();
    }

    /**
     * 시뮬레이션
     * @param {String} type 상자 종류(normal, high)
     */
    simulate(type) {
        /**
         * 가중치가 적용된 랜덤 알파벳을 뽑기 위한 내부 함수
         * @param {Array} contents 상자의 내용
         * @param {Array} weights 상자의 가중치 정보
         * @returns 알파벳
         */
        function _pickWeightedRandomAlphabet(contents, weights) {
            return math.pickRandom(contents, weights);
        }

        /**
         * 결과 업데이트를 위한 내부 함수
         * @param {String} alpha 알파벳 
         */
        function _updateResults(alpha) {
            _obj.#resultObject.totalCounts += 1;
            let alphaCountsMap = _obj.#resultObject.alphabetCounts;
            let alphaCount = alphaCountsMap.get(alpha);

            alphabetCountsMap.set(alpha, alphaCount + 1);
            HTMLElementController.updateTable(alpha, alphaCount + 1);
        }

        let _obj = this;
        let box = this.#boxes.get(type);

        let alpha = _pickWeightedRandomAlphabet(box.contents, box.weights);
        _updateResults(alpha);
    }

    /**
     * 확률 설정
     * @param {Number} lProb 희귀도 하 알파벳 확률
     * @param {Number} mProb 희귀도 중 알파벳 확률
     */
    setProbabilities(lProb, mProb) {
        let normalBox = this.#boxes.get("normal");
        normalBox.mProb = mProb;
        normalBox.lProb = lProb;
    }
}

/**
 * 시뮬레이션 결과 객체
 */
class SimulationResult {
    #totalCounts;
    #alphabetCounts;

    constructor() {
        this.#totalCounts = 0;
        this.#alphabetCounts = new Map();

        for (let i = 0; i < 26; i++) {
            let alpha = String.fromCharCode(i + 'A'.charCodeAt(0));
            
            this.#alphabetCounts.set(alpha, 0);
        }
    }
}

/**
 * HTML Element Controller (Static)
 */
class HTMLElementController {
    static bodyElem = document.body
    static tdElems = new Map();

    /**
     * 알파벳 결과 테이블 생성
     */
    static createTable() {
        let tableElem = document.createElement("table");
        let tbodyElem = document.createElement("tbody");
        for (let i = 0; i < 12; i++) {
            let trElem = document.createElement("tr");
            
            for (let j = 0; j < 3; j++) {
                let alpha = String.fromCharCode('A'.charCodeAt(0) + (j * 12) + i);

                if (alpha >= 'A' && alpha <= 'Z') {
                    let tdElem = document.createElement("td");

                    tdElem.textContent = alpha + ": 0개";

                    HTMLElementController.tdElems.set(alpha, tdElem);

                    trElem.appendChild(tdElem);
                }
            }

            tbodyElem.appendChild(trElem);
        }
        tableElem.appendChild(tbodyElem);
        HTMLElementController.bodyElem.appendChild(tableElem);
    }
    /**
     * 결과 표 업데이트
     * @param {String} alpha 
     * @param {Number} count 
     */
    static updateTable(alpha, count) {
        let tdElem = HTMLElementController.tdElems.get(alpha);

        tdElem.textContent = alpha + ": " + count + "개";
    }
    static rewriteResultText() {

    }

    /**
     * HTML Element에 이벤트를 등록
     */
    static eventRegister() {
    }
}