import React from 'react';
import ReactDOM from 'react-dom';
import {App, Link} from './App';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

// need to do this for enzyme
configure({ adapter: new Adapter() });

// testing component did mount

// shallow rendering allows us to test the component as a unit
// without having to take care of its children
describe('<App /> shallow rendering', () => {
  it('should render App', () => {
    // context allows us to test with specific context in the component
    const wrapper = shallow(<App />, {
      context: {},
      disableLifecycleMethods: true
    })
    expect(wrapper.find("p").exists()).toBe(true)
    expect(wrapper.find("ul").length).toBe(3)
    expect(wrapper.find("p").length).toBe(3)
    expect(wrapper.find('[text="jaime"]').text()).toBe("<Title />")
    expect(wrapper.find({text: "jaime"}).exists()).toBe(true)
  })

  it('matches the snapshot', () => {
    const tree = shallow(<App />)
    expect(toJson(tree)).toMatchSnapshot()
  })

  it('on button click changes p text', () => {
    const wrapper = shallow(<App />)
    const button = wrapper.find("button")
    expect(wrapper.find(".button-state").text()).toBe("No!")
    button.simulate('click') // targets prop based on the event
    expect(wrapper.find('.button-state').text()).toBe("Yes!")
  })

  it('on input change, title changes text', () => {
    const wrapper = shallow(<App />)
    const input = wrapper.find('input')
    expect(wrapper.find('h2').text()).toBe('')
    input.simulate('change', {target: {value: 'Tyler'}})
    expect(wrapper.find('h2').text()).toBe('Tyler')
  })

  it('updates className with new state', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('.blue').length).toBe(1)
    expect(wrapper.find('.red').length).toBe(0)

    wrapper.setState({ mainColor: 'red' });

    expect(wrapper.find('.blue').length).toBe(0)
    expect(wrapper.find('.red').length).toBe(1)
  })

  it('calls componentDidMount', () => {
    // mocks out the lifecycle to be called
    jest.spyOn(App.prototype, 'componentDidMount')
    const wrapper = shallow(<App />)
    expect(App.prototype.componentDidMount.mock.calls.length).toBe(1)
    expect(wrapper.find('.lifeCycle').text()).toBe('componentDidMount')
  })

  it('setProps calls componentWillReceiveProps', () => {
    jest.spyOn(App.prototype, "componentWillReceiveProps")
    const wrapper = shallow(<App />)
    wrapper.setProps({ hide: true })
    expect(App.prototype.componentWillReceiveProps.mock.calls.length).toBe(1)
    expect(wrapper.find('.lifeCycle').text()).toBe('componentWillReceiveProps')
  })

  it('handlesStrings function returns correctly', () => {
    const wrapper = shallow(<App />)
    const trueReturn = wrapper.instance().handleStrings("Hello World")
    const falseReturn = wrapper.instance().handleStrings("")
    expect(trueReturn).toBe(true)
    expect(falseReturn).toBe(false)
  })
})

// // you want to import js-dom installed to test the whole DOM

describe('<App /> mount rendering', () => {
  it('h1 contains the correct text', () => {
    // context allows us to test with specific context in the component
    // disableLifecycleMethods: true
    const wrapper = mount(<App />)
    
    // expect(wrapper.find("p").exists()).toBe(true)
    // expect(wrapper.find("ul").length).toBe(3)
    // expect(wrapper.find("p").length).toBe(1)
    // expect(wrapper.find('[text="jaime"]').text()).toBe("<Title />")
    // expect(wrapper.find({text: "jaime"}).exists()).toBe(true)
    expect(wrapper.find('h1').text()).toBe('Welcome to React');
    wrapper.unmount();
  })

  it('matches the snapshot', () => {
    const tree = mount(<App />)
    expect(toJson(tree)).toMatchSnapshot()
    tree.unmount();
  })
})

describe('<Link /> shallow rendering', () => {
  it('link component accepts address prop', () => {
    const wrapper = shallow(<Link address="www.google.com" />)
    expect(wrapper.instance().props.address).toBe("www.google.com")
  })

  it('a tag node renders href correctly', () => {
    const wrapper = shallow(<Link address='www.google.com' />)
    expect(wrapper.props().href).toBe("www.google.com")
  })

  it('returns null with true hide prop', () => {
    const wrapper = shallow(<Link hide={false} />)
    expect(wrapper.find('a').length).toBe(1)
    wrapper.setProps({ hide: true })
    // get returns the node at the given index of the current wrapper
    expect(wrapper.get(0)).toBeNull()
  })
})

// describe('<Link />', () => {
//   it('link component accepts address prop', () => {
//     const wrapper = shallow(<Link address="www.google.com" />)
//     expect(wrapper.instance().props.address).toBe("www.google.com")
//   })

//   it('a tag node renders href correctly', () => {
//     const wrapper = shallow(<Link address='www.google.com' />)
//     expect(wrapper.props().href).toBe("www.google.com")
//   })

//   it('returns null with true hide prop', () => {
//     const wrapper = shallow(<Link hide={false} />)
//     expect(wrapper.find('a').length).toBe(1)
//     wrapper.setProps({ hide: true })
//     // get returns the node at the given index of the current wrapper
//     expect(wrapper.get(0)).toBeNull()
//   })
// })

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
