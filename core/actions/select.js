/* eslint-disable */

const fakeInputs = []
const fakeOptions = []

const selectOption = (node) => {
  const { select, input } = node.linkNodes
  const lastSelected = node.closest('ul').querySelector('[aria-selected]')

  select.value = node.dataset.value || node.innerText
  input.value = node.innerText || node.dataset.value

  /* since programatically changes won't fire the change event,
   we need to do it ourselves */
  const event = document.createEvent("HTMLEvents")
  event.initEvent("change", true, false)
  select.dispatchEvent(event)


  if (lastSelected) { lastSelected.removeAttribute('aria-selected') }
  node.setAttribute('aria-selected', true)
}

const toggleOptions = (inputNode, state) => {
  const options = inputNode.closest('.select-default').querySelector('ul')
  state = state !== undefined
    ? state
    : !JSON.parse(options.getAttribute('aria-hidden'))

  options.setAttribute('aria-hidden', state)

  if (state) { return }

  const maxHeight = window.innerHeight - options.getBoundingClientRect().top
  options.style.cssText = `max-height:${maxHeight}px`
}

const buildSelectbox = (select) => {
  console.log(select)
  const label = select.closest('.select-default')
  console.log(label)
  const wrapper = document.createElement('div')
  wrapper.classList.add('field-select')

  const input = document.createElement('input')
  // // const options = document.createElement('ul')
  const icon = document.createElement('i')

  input.classList.add('select__input')
  input.setAttribute('type', 'text')
  input.setAttribute('readonly', true)

  label.insertBefore(input, select)

  fakeInputs.push(input)

  select.parentNode.insertBefore(wrapper, select)
  wrapper.appendChild(select)
  // select.querySelectorAll('option').forEach((option, idx) => {
  //   if (idx === 0 && option.hasAttribute('disabled')) {
  //     input.setAttribute('placeholder', option.innerText)
  //     return
  //   }

  //   const item = document.createElement('li')

  //   item.innerText = option.innerText
  //   item.dataset.idx = idx
  //   item.dataset.value = option.value
  //   item.setAttribute('tabIndex', 0)
  //   item.linkNodes = { select, input }

  //   options.appendChild(item)
  //   fakeOptions.push(item)

  //   if (option.hasAttribute('selected')) {
  //     selectOption(item)
  //   }
  // })
}

const buildSelectboxCountry = (select) => {
  const label = select.closest('.select-default')
  const input = document.createElement('input')
  const wrapper = document.createElement('div')
  const flag = select.parentNode.querySelector('.select-flag')

  const selectedValue = label.getAttribute("data-selected")

  wrapper.classList.add('country-select')

  input.classList.add('select__input')
  input.setAttribute('type', 'text')
  input.setAttribute('readonly', true)

  label.insertBefore(input, select)

  // insert wrapper before select in the DOM tree
  select.parentNode.insertBefore(wrapper, select)

  // move select into wrapper
  if (flag !== undefined && flag !== null)
    wrapper.appendChild(flag)

  wrapper.appendChild(select)

  fakeInputs.push(input)

  // Insert options into select country
  var list = require("./countries.js");

  for (var i = 0; i < list.length; ++i) {
    var code = list[i].code
    var name = list[i].name

    const option = document.createElement('option')
    option.innerText = name
    option.value = code

    if (selectedValue && code === selectedValue) {
      option.setAttribute('selected', true)
    }

    select.appendChild(option)
  }
}


export const bindGlobalEvents = () => {
  document.addEventListener('click', ({target} = e) => {
    fakeInputs
      .filter((input) => input != target)
      .forEach((input) => toggleOptions(input, true))

    if (fakeOptions.indexOf(target) != -1) {
      selectOption(target)
      toggleOptions(target.linkNodes.input)
    }

    if (fakeInputs.indexOf(target) != -1) {
      toggleOptions(target)
    }
  })

  // TODO: Enable keyboard navigation
  // document.addEventListener('keypress', ({target, code} = e) => {
  //   const codes = [
  //     'Space',
  //     'Enter',
  //     'ArrowUp',
  //     'ArrowDown'
  //   ]

  //   if (codes.indexOf(code) === -1 || fakeInputs.indexOf(target) === -1) { return }
  // })
}

export const register = (selector) => {
  console.log(selector)
  if (typeof selector === 'string') {
    if (selector.includes('select-country') == true) {
      document
      .querySelectorAll(selector)
      .forEach((select) => buildSelectboxCountry(select))
    } else {
      document
      .querySelectorAll(selector)
      .forEach((select) => buildSelectbox(select))
    }
  }

  else if (selector instanceof Element) {
    buildSelectbox(selector)
  }
}

const init = (selector) => {
    //bindGlobalEvents()
    if (selector) register(selector)

}

export default init

// export default function init (selector) {
//   //bindGlobalEvents()
//   if (selector) register(selector)
// }
