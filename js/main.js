class WordBank {
  constructor() {
    this.nounArraySegment1 = [];
    this.nounArraySegment2 = [];
    this.adjArray = [];
    this.taxSynonymArray = [];
    this.fetchWordList(
      'https://raw.githubusercontent.com/Dragonfyle/englishWords/main/nouns.js'
    ).then((parsedArray) => {
      this.nounArraySegment1 = parsedArray;
    });
    this.fetchWordList(
      'https://raw.githubusercontent.com/Dragonfyle/englishWords/main/adjectives.js'
    ).then((parsedArray) => {
      this.adjArray = parsedArray;
    });
    this.fetchWordList(
      'https://raw.githubusercontent.com/Dragonfyle/englishWords/main/nouns2.js'
    ).then((parsedArray) => {
      this.nounArraySegment2 = parsedArray;
    });
    this.fetchWordList(
      'https://raw.githubusercontent.com/Dragonfyle/englishWords/main/taxSynonyms.js'
    ).then((parsedArray) => {
      this.taxSynonymArray = parsedArray;
    });
  }
  fetchWordList(url) {
    return fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error('failed to fetch');
        }
      })
      .then((jsCode) => {
        return JSON.parse(jsCode);
      })
      .catch((err) => console.log(`oh oh: ${err}`));
  }
}

const wordBank = new WordBank();

class RandomRoll {
  #newTaxName;
  constructor() {
    this.#newTaxName = '';
  }
  #rollElement(array) {
    return Math.floor(Math.random() * (array.length - 1));
  }
  #rollSingleWord(array) {
    return array[this.#rollElement(array)];
  }
  #isHeads() {
    if (Math.floor(Math.random() * 2) === 1) {
      return true;
    } else {
      return false;
    }
  }
  #taxNameRoll(array1, array2, array3, array4) {
    return new Promise((resolve) => {
      const segment1 = this.#rollSingleWord(array1);
      const segment2 = this.#rollSingleWord(array2);
      let segment3 = this.#rollSingleWord(array3);
      const segment4 = this.#rollSingleWord(array4);
      if (this.#isHeads()) {
        while (segment2 == segment3) {
          segment3 = this.#rollSingleWord(array3);
        }
        resolve(`${segment1} ${segment2} ${segment3} ${segment4}`);
      } else {
        console.log('ok');
        resolve(`${segment1} ${segment2} ${segment4}`);
      }
    });
  }
  get newTaxName() {
    return this.#taxNameRoll(
      wordBank.adjArray,
      wordBank.nounArraySegment1,
      wordBank.nounArraySegment2,
      wordBank.taxSynonymArray
    );
  }
}

const Roll = new RandomRoll();

class UserInterface {
  constructor() {
    this.body = document.querySelector('body');
    this.taxContainer = document.querySelector('.tax');
    this.newAndShiny = document.querySelector('.taxIntro__text');
    this.imageWow = document.querySelector('.tax__imageWow');
    this.btn = document.querySelector('[data-type="rollName"]');
    this.themeButton = document.querySelector('[data-role="themeButton"]');
    this.isActive = true;
    this.isDark = false;
    this.nameDisplay = document.querySelector('.tax__name');
    this.btn.addEventListener('click', () => {
      this.displayChain();
    });
    this.themeButton.addEventListener('click', this.changeTheme.bind(this));
  }
  clearView() {
    return new Promise((resolve) => {
      this.imageWow.style.display = 'none';
      this.newAndShiny.style.display = 'none';
      setTimeout(resolve, 200);
    });
  }
  taxShow(name) {
    return new Promise((resolve) => {
      this.nameDisplay.textContent = name;
      this.imageWow.style.display = 'block';
      resolve();
    });
  }
  taxIntroductionShow() {
    return new Promise((resolve) => {
      this.newAndShiny.style.display = 'block';
      setTimeout(resolve, 2500);
    });
  }
  async displayChain() {
    if (this.isActive) {
      this.isActive = false;
      await this.clearView();
      const taxName = await Roll.newTaxName;
      await this.taxIntroductionShow();
      await this.taxShow(taxName);
      this.isActive = true;
    }
  }
  toggleDarkThemeClass(selector) {
    selector.classList.toggle('darkTheme');
  }
  changeTheme() {
    this.toggleDarkThemeClass(this.body);
    this.toggleDarkThemeClass(this.btn);
    this.toggleDarkThemeClass(this.themeButton);
    this.toggleDarkThemeClass(this.newAndShiny);
    this.themeButton.classList.toggle('fa-moon');
    this.themeButton.classList.toggle('fa-sun');
  }
}

const ui = new UserInterface();
