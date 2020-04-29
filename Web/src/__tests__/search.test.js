import fetchMock from 'fetch-mock';
import Homepage from "../homepage.jsx";
import waitUntil from 'async-wait-until';
import { shallow, configure, mount} from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import "jest-localstorage-mock";
import renderer from 'react-test-renderer';
import Posts from '../posts.jsx';
import Request from '../request.jsx';


const posts = [{
    'username': 'test1',
    'course': 'CSCI 5828',
    'skill': 'AWS',
    'msg': 'Looking for a study buddy',
    'tag': 'Assignment',
    'interested_count':2,
    'interested_people':['test2','test3'],
    'post_time': {'$date':1587980060000},
    'isCompleted': false,
    '_id':{'$oid':'1332476'}
  },
  {
  'username': 'test2',
  'course': 'CSCI 5826',
  'skill': 'AZURE',
  'msg': 'Looking for a study buddy',
  'tag': 'Project',
  'interested_count':1,
  'interested_people':['test3'],
  'post_time': {'$date':1587980060000},
  'isCompleted': true,
  '_id':{'$oid':'1332476'}
  },
  {
  'username': 'test3',
  'course': 'CSCI 5887',
  'skill': 'GCP',
  'msg': 'Looking for a study buddy',
  'tag': 'Homework',
  'interested_count':0,
  'interested_people':[],
  'post_time': {'$date':1587980060000},
  'isCompleted': false,
  '_id':{'$oid':'1332476'}
  }
]


const data = JSON.stringify({
    msg: 'Looking for a study buddy',
    course: 'CSCI 5826',
    skill: 'GCP',
    tag: 'Homework'
  });
  
configure({ adapter: new Adapter() });

describe('Check Homepage functionality', () => {
    
    beforeAll(() => {
        
        localStorage.setItem('token', 'test');
        fetchMock.get('https://api-suggest-dot-studybuddy-5828.appspot.com/suggest', posts)
        fetchMock.mock('https://api-suggest-dot-studybuddy-5828.appspot.com/requests/create', {
            body: { data },
            status: 200,
            });
        
        const mEventSourceInstance = {
            onmessage: jest.fn(),
          };
          const mEventSource = jest.fn(() => mEventSourceInstance);
          
          global.EventSource = mEventSource;
    });
    
    it('should fetch posts from API', async () => {
        
        const wrapper = shallow(<Homepage />);
        await waitUntil(() => wrapper.state('filterResults') !== null);
        expect(wrapper.state('filterResults')).toEqual(posts);

        
    });
    
    it('should render posts', () => {

        const tree = renderer.create(
            <Posts filterRes={posts} />
        ).toJSON();

        expect(tree).toMatchSnapshot();
        });

    it('should open request modal', async () => {

        const wrapper = shallow(<Homepage />);
        const icon = wrapper.find("#newPost");

        expect(icon.exists()).toEqual(true)

        icon.first().simulate("click")
    
        await waitUntil(() => wrapper.state('isOpen') !== null);
        expect(wrapper.state('isOpen')).toEqual(true);

    });

    afterAll(() => {
        localStorage.removeItem('token');
      });
    });
