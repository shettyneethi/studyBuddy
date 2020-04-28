import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';



describe('Check Routes', () => {
    
  beforeAll(() => {
      const mEventSourceInstance = {
          onmessage: jest.fn(),
        };
        const mEventSource = jest.fn(() => mEventSourceInstance);
        
        global.EventSource = mEventSource;
  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
  
  });


