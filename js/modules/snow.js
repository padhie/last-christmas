export class Snow {
    constructor(parentElement, amount) {
        this.parentElement = parentElement;
        this.amount = amount;

        this.randomNumber = (max) => {
            return Math.floor(Math.random() * max)
        };
    }

    init() {
        for (let i=0; i<this.amount; i++) {
            let snowflake = this.createSingleElement();
            this.parentElement.appendChild(snowflake);
        }
    }

    createSingleElement() {
        let left = (this.randomNumber(98) + 1);
        let delayOne = this.randomNumber(100) / 10;
        let delayTwo = this.randomNumber(100) / 10;

        let snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.style.left = left + '%';
        snowflake.style.animationDelay = delayOne + 's, ' + delayTwo + 's';
        snowflake.style.webkitAnimationDelay = delayOne + 's, ' + delayTwo + 's';
        snowflake.innerHTML = '❆';

        return snowflake;
    }
}