console.info("File: ", "green-army.js");

document.addEventListener("DOMContentLoaded", pageLoaded);

function pageLoaded (event) {
  paymentTabs();
  preferredStartDate();
  // document.getElementById('btnStepSelectPlans').onclick = chooseYourPlan;
  specialCheckboxActive();
}

function specialCheckboxActive() {
  var containerOfPlans = document.getElementById("choose-your-plan");
  var inputCheckbox = containerOfPlans.querySelectorAll('input[type="checkbox"]');
  inputCheckbox.forEach()
  inputCheckbox.onclick = function() {
    var thisCheckbox = this;
    if(thisCheckbox.checked) {
      thisCheckbox.closest('.special-checkbox').classList.add('special-checkbox--active');
    } else {
      thisCheckbox.closest('.special-checkbox').classList.remove('special-checkbox--active');
    }
  };
}
function chooseYourPlan () {
  // var containerOfPlans = document.getElementById("choose-your-plan"),
  //     plans = containerOfPlans.querySelectorAll('input[type="checkbox"]'),
  //     ifCheckAtLeastOne = Array.prototype.slice.call(plans).some(cbx => cbx.checked);
  //     console.log(ifCheckAtLeastOne);
  //     if(!ifCheckAtLeastOne) {}
}
function preferredStartDate() {
  var picker = new Pikaday(
  {
    field: document.getElementById('preferredStartDate'),
    firstDay: 1,
    minDate: new Date(2017, 0, 1),
    maxDate: new Date(2030, 12, 31),
    yearRange: [2017,2030],
    onSelect: function() {
      var date = document.createTextNode(this.getMoment().format('ddd, MMMM Do') + ' ');
      document.getElementById('preferred-start-date__text').innerHTML = date.data;
    }
  });
  picker.setMoment(moment());
}

function paymentTabs() {
  function stepsComponentWorking(_stepsComponent, _activeClass) {
    return document.querySelector(".steps-component").classList.contains("steps-component--working");
  }
  if(stepsComponentWorking()) {
    var navItems = document.querySelectorAll(".steps-component__tabs__item"),
        stepsItems = document.querySelectorAll(".steps-component__steps__item"),
        allNextButtons = document.querySelectorAll(".steps-button--next"),
        allBackButtons = document.querySelectorAll(".steps-button--back");

    function stepsItemHide() {
      stepsItems.forEach(function(_stepItem) {
        _stepItem.style.display = "none";
      });
    }
    stepsItemHide(); // init()
    document.querySelector(".steps-component__steps__item--active").style.display = "block"; // init()

    function containClass(_elm, _findClass) { // hasClass?
      return _elm.classList.contains(_findClass);
    }

    navItems.forEach(function(_navItem) { // Click on NavItem
      _navItem.onclick = function(e) {
        e.preventDefault();
        var thatItem = this,
            thatTarget = document.querySelector(thatItem.querySelector("a").getAttribute("href"));
        if (containClass(thatItem, "steps-component__tabs__item--active")) {
          navItems.forEach(function(_navItem) {
            _navItem.classList.remove("steps-component__tabs__item--active");
          });
          thatItem.classList.add("steps-component__tabs__item--active");
          stepsItemHide();
          thatTarget.classList.add("steps-component__steps__item--active");
          thatTarget.style.display = "block";
          if(thatTarget.querySelectorAll("input").length > 0) {
            var listInputs = thatTarget.querySelector("input");
            listInputs.focus();
          }
        }
      };
    });

    allBackButtons.forEach(function(_backButton) {
      _backButton.onclick = function(e) {
        e.preventDefault();
        var currentStep = this.closest(".steps-component__steps__item"),
            currentStepLink = currentStep.getAttribute("id"),
            currentStepTab = document.querySelector(".steps-component__tabs .steps-component__tabs__item a[href='#" + currentStepLink + "']").parentElement,
            prevStepTab = currentStepTab.previousElementSibling;
        if(prevStepTab !== null) {
          prevStepTab.classList.add("steps-component__tabs__item--active");
          prevStepTab.click();
        }
      };
    });

    allNextButtons.forEach(function(_nextButton) {
      _nextButton.onclick = function(e) {
        e.preventDefault();
        var currentStep = this.closest(".steps-component__steps__item"),
            currentStepLink = currentStep.getAttribute("id"),
            currentStepTab = document.querySelector(".steps-component__tabs .steps-component__tabs__item a[href='#" + currentStepLink + "']").parentElement,
            nextStepTab = currentStepTab.nextElementSibling;
        if(document.querySelector(".steps-component").classList.contains("steps-component--with-form")) {
          var currentInputs = currentStep.querySelectorAll("input"),
              isValid = true;
          currentStep.querySelectorAll(".form-group, .checkbox, .radio").forEach(function(_inputParent) {
            _inputParent.classList.remove("has-error");
          });
          var itemsNoValid = [];
          for(var i = 0; i<currentInputs.length; i++) {
            if(!currentInputs[i].checkValidity()) {
              isValid = false;
              itemsNoValid.push(currentInputs[i]); // to add focus
              if(currentInputs[i].getAttribute("type") === "checkbox") {
                currentInputs[i].closest(".checkbox").classList.add("has-error");
              } else if (currentInputs[i].getAttribute("type") === "radio") {
                currentInputs[i].closest(".radio, .radio-inline").classList.add("has-error");
              } else {
                currentInputs[i].closest(".form-group").classList.add("has-error");
              }
              itemsNoValid[0].focus();
            }
          }
          if(isValid) {
            nextStepTab.classList.add("steps-component__tabs__item--active");
            nextStepTab.click();
          }
        } else { // Normal WithoutForm
          if(nextStepTab !== null) {
            nextStepTab.classList.add("steps-component__tabs__item--active");
            nextStepTab.click();
          }
        }
      };
    });
    document.getElementById("next-end").onclick = function(e) {
      e.preventDefault();
    };

    document.querySelector(".steps-component__tabs__item--active").click();
  }
}