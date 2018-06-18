import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// need to do this for enzyme
configure({ adapter: new Adapter() });

// shallow rendering allows us to test the component as a unit
// without having to take care of its children
describe('<App />', () => {
  it('should render App', () => {
    // context allows us to test with specific context in the component
    const wrapper = shallow(<App />, {
      context: {},
      disableLifecycleMethods: true
    })
    expect(wrapper.find("p").exists()).toBe(true)
    expect(wrapper.find("ul").length).toBe(3)
    expect(wrapper.find("p").length).toBe(1)
    expect(wrapper.find('[text="jaime"]').text()).toBe("<Title />")
    expect(wrapper.find({text: "jaime"}).exists()).toBe(true)
  })

  it('matches the snapshot', () => {
    const tree = shallow(<App />)
    expect(tree).toMatchSnapshot()
  })
})

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
