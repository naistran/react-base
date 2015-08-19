import React from 'react';

class DevPanel extends React.Component {
  render() {
    if (__CLIENT__ && __DEV__) {
      /* eslint no-console: 0 */
      console.info('Checksum is only invalid because redux-devtools are enabled.');

      const { store } = this.props;
      const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');

      return (
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor}/>
        </DebugPanel>
      );
    }

    return null;
  }
}

export default DevPanel;
