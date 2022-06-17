# jsWizard
**jsWizard** is a tiny library for easy wizard navigation in a SPA.

## HTML
```html
    <!-- wizard navigation -->
    <ol class="steps">
        <li class="step active"><span>Step 1</span></li>
        <li class="step"><span>Step 2</span></li>
        <li class="step"><span>Finish</span></li>
    </ol>

    <!-- wizard body -->
    <form class="steps-body">
        <fieldset class="step active">
            <legend>Step 1</legend>
            <div class="p-4 g-2">
                <label>First Name <input id="firstName" required></label>
                <label>Last Name <input id="lastName" required></label>
            </div>
            <footer class="text-center p-2">
                <a href="#" class="btn btn-primary next">Next <i class="bx bx-down-arrow-alt"></i></a>
            </footer>
        </fieldset>

        <fieldset class="step">
            <legend>Step 2</legend>
            <div class="p-4 g-2">
                <label>Photo <input type="file"></label>
                <label>Phone <input type="tel"></label>
                <label>Address <textarea></textarea></label>
            </div>
            <footer class="text-center p-2">
                <a href="#" class="btn btn-outline-primary back"><i class="bx bx-up-arrow-alt"></i> Back</a>
                <a href="#" class="btn btn-primary next">Next <i class="bx bx-down-arrow-alt"></i></a>
            </footer>
        </fieldset>

        <fieldset class="step">
            <legend>Step 3</legend>
            <div class="p-4 g-2">
                <label>Password <input type="password"></label>
                <label>Confirm <input type="password"></label>

            </div>
            <footer class="text-center p-2">
                <a href="#" class="btn btn-outline-primary back"><i class="bx bx-up-arrow-alt"></i> Back</a>
                <a href="#" class="btn btn-primary finish">Finish <i class="bx bx-down-arrow-alt"></i></a>
            </footer>
        </fieldset>
```

## JavaScript
```js

        $(() => {
            var wizard = new jsWizard({
                steps_selector: 'ol.steps',
                body_selector: '.steps-body',
                step_selector: '.step',
                next_selector: 'a.next',
                back_selector: 'a.back',
                finish_selector: 'a.finish',
                stepValidators: {
                    2: function () {
                        if(!document.querySelector('#firstName').validity.valid){
                            document.querySelector('#messages').innerHTML = '<b>First Name</b>: '+ document.querySelector('#firstName').validationMessage;
                            return false;//means dont go to next step
                        } else {
                            return true;//important , means go to next step
                        }
                    }
                },
                finish: function (e){
                    alert('Form can submit here')
                }
            });
        })
    
```

<a href="https://mehdi-salartayefeh.github.io/front-end/jswizard/">See Demo</a>

