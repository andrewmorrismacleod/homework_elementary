const appendElement = function (elementType, className, content, appendTo) {

  const element = document.createElement(elementType);
  element.classList.add(className);
  element.textContent = content;
  appendTo.appendChild(element);
  console.log('here');
};

module.exports.appendElement = appendElement;
