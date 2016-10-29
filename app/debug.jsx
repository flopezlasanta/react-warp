import React from 'react';
import { render } from 'react-dom'
import { connect } from 'react-redux';
import { Panel, Button, Well } from 'react-bootstrap';

import { mapStateToProps, mapDispatchToProps } from './logger.jsx';

function DebugPanel(props) {
  const { logs, clearLogs } = props;

  const clear = (e) => { clearLogs() };

  return (
    <div id="debug" className="container-fluid">
      <br/><br/>
      <Button bsStyle="primary" onClick={clear}>Clear Logs</Button>
      <Well>
        <ul id="logs" style={ { listStyleType: 'none' } }>
          { logs.map(log => <li key={log.get('id')}><code>[{log.get('date')}]:</code> <span dangerouslySetInnerHTML={ { __html: log.get('text') } } /></li>) }
        </ul>
      </Well>
    </div>
  );
}

export const Debug = connect(mapStateToProps, mapDispatchToProps)(DebugPanel);