class RollTaxName {
  constructor(selector) {
    this.btn = document.querySelector(selector);
    this.div = document.querySelector('div');
    this.namePrefixes = [
      'own',
      'better',
      'excess',
      'surplus',
      'main',
      'leftover',
      'additional',
      'extra',
      'reserve',
      'residual',
      'trace',
      'spare',
      'non-normative',
      'missing',
      'due',
      'absent',
      'misplaced',
      'remaining',
      'only',
      'single',
      'present',
      'non-existent',
      'recent',
      'aquired',
      'removed',
      'added',
      'leveraged',
      'utilised',
      'stopped',
      'protected',
    ];
    this.nameSuffixes = [
      'grass',
      'air',
      'cat',
      'wind',
      'view',
      'light',
      'bottle opener',
      'fridge space',
      'arm length',
      'baby',
      'vehicle',
      'bicycle',
      'time',
      'life',
      'hobby',
      'posture',
      'demeanor',
      'friends',
      'family',
      'vacation',
      'sleep',
      'rest',
      'jogging',
      'prayer',
      'sunday',
      'gift',
      'lawn',
      'fence',
      'education',
      'income',
      'side-hustle',
      'game',
      'gender',
      'bed',
      'odor',
      'attitude',
      'trip',
      'poop',
      'wife',
      'husband',
      'protection',
      'debt',
      'reasoning',
      'thinking',
      'solution',
      'idea',
      'gratitude',
      'anger',
      'swearing',
      'sweat',
      'breath',
    ];
    this.taxSynonymes = [
      'tax',
      'levy',
      'toll',
      'fee',
      'charge',
      'customs',
      'tribute',
      'liability',
      'contribution',
      'tariff',
    ];
    this.btn.addEventListener('click', this.#taxNameRoll.bind(this));
  }
  #rollElement(maxNumber) {
    return Math.floor(Math.random() * maxNumber);
  }
  #taxNameRoll() {
    let finalName = '';
    finalName += `${
      this.namePrefixes[this.#rollElement(this.namePrefixes.length)]
    } `;
    finalName += `${
      this.nameSuffixes[this.#rollElement(this.nameSuffixes.length)]
    } `;
    finalName += `${
      this.taxSynonymes[this.#rollElement(this.taxSynonymes.length)]
    }`;
    this.div.textContent = finalName;
  }
}

const tax = new RollTaxName('button');
