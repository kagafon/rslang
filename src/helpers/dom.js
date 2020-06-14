const createElement = (parent, tag, classes, attributes, text) => {
  const elem = document.createElement(tag);
  if (classes && classes.length > 0) elem.classList.add(...classes);
  if (attributes)
    Object.keys(attributes).forEach((x) => elem.setAttribute(x, attributes[x]));
  if (text) elem.innerText = text;
  if (parent) parent.appendChild(elem);
  return elem;
};

// eslint-disable-next-line import/prefer-default-export
export { createElement };
