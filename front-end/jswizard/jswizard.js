/**
 * jswizard.js: a tiny library for easy wizard navigation in a SPA
 * version: beta
 * created by Mehdi Salartayefeh
 *
 */
class jsWizard {
    /**
     *
     * @param options
     * {
     *     steps_selector: '',
     *     body_selector: ''
     * }
     */
    constructor(options) {
        this.steps_selector = options.steps_selector;
        this.body_selector = options.body_selector;
        this.step_selector = options.step_selector;
        this.next_selector = options.next_selector;
        this.back_selector = options.back_selector;
        this.finish_selector = options.finish_selector;
        this.finish = options.finish;
        this.lastStep = options.lastStep;
        this.stepValidators = options.stepValidators;
        this.step = 1;
        this.stepscount = 1;

        this.init()
    }

    init(){
        this.stepscount = $(`${this.body_selector} > ${this.step_selector}`).length;
        $(`${this.body_selector} > ${this.step_selector}:not(.active)`).hide();
        // $(`${this.steps_selector} > ${this.step_selector}`).on('click', this.stepTo())
        $(`${this.body_selector} > ${this.step_selector} ${this.next_selector}`).on('click', this.stepNext.bind(this))
        $(`${this.body_selector} > ${this.step_selector} ${this.back_selector}`).on('click', this.stepBack.bind(this))
        $(`${this.body_selector} > ${this.step_selector} ${this.finish_selector}`).on('click', this.finish.bind(this))
    }

    stepTo(step) {
        if(this.stepValidators.hasOwnProperty(step)){
            let valid = this.stepValidators[step]();
            if(!valid) return;
        }
        $(`${this.steps_selector} > ${this.step_selector}:nth-child(${this.step})`).removeClass('active');
        $(`${this.body_selector} > ${this.step_selector}:nth-child(${this.step})`).hide().removeClass('active');
        this.step = step;
        $(`${this.steps_selector} > ${this.step_selector}:nth-child(${this.step})`).addClass('active');
        $(`${this.body_selector} > ${this.step_selector}:nth-child(${this.step})`).fadeIn('slow').addClass('active');
    }

    stepNext(){
        // if(this.step < this.stepscount)
            this.stepTo(this.step + 1);
        return false;
    }

    stepBack(){
        if(this.step > 0)
            this.stepTo(this.step - 1);
        return false;
    }
}
