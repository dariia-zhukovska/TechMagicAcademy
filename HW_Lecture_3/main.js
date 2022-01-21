(function () {
  const MAX_ITEMS = 26;
  const input = document.querySelector(".input-area");
  const addBtn = document.querySelector(".add-btn");
  const removeBtn = document.querySelector(".remove-btn");
  const resetBtn = document.querySelector(".reset-btn");
  const dataLocalStorsge = localStorage.getItem("items");
  const container = document.querySelector('.items-list');
  const errorMsgContainer = document.querySelector('.error-msg');
  let itemsArr = dataLocalStorsge ? JSON.parse(dataLocalStorsge) : [];

  const render = () => {
    container.innerHTML = '';
    itemsArr.forEach((item) => {
      const div = document.createElement('div');
      div.innerHTML = item;
      container.append(div);
    });
  }

  render();

  addBtn.onclick = () => {
    // console.log("Good Job!");
    const value = input.value;
    // console.log(value);
    if (value) {
      if (itemsArr.length > MAX_ITEMS - 1) {
        displayWarningMsg('Too much items! Remove last ones.');
      } else {
        itemsArr.push(value);
        input.value = '';
        localStorage.setItem("items", JSON.stringify(itemsArr));
      }
    } else {
      displayWarningMsg('Empty input! Please add at least one item.');
    }
    console.log(itemsArr);
    render();
  };

  const displayWarningMsg = (msg) => {
    errorMsgContainer.innerHTML = msg;
    setTimeout(() => {
      errorMsgContainer.innerHTML = '';
    }, 1500)
  }

  removeBtn.onclick = () => {
    itemsArr.shift();
    localStorage.setItem("items", JSON.stringify(itemsArr));
    console.log(itemsArr);
    render();
  };

  resetBtn.onclick = () => {
    itemsArr = [];
    localStorage.setItem("items", JSON.stringify(itemsArr));
    console.log(itemsArr);
    render();
  };
})();