import React from 'react';
import { useHistory } from 'react-router-dom';
import { ButtonGroup } from 'reactstrap';
import { signOutUser } from '../api/auth';

export default function Navigation() {
  const history = useHistory();

  return (
    <ButtonGroup>
      <button
        type="button"
        onClick={() => history.push('/')}
        className="btn btn-light"
      >
        Incomplete
      </button>
      <button
        type="button"
        onClick={() => history.push('/completed')}
        className="btn btn-light"
      >
        Completed
      </button>
      <button
        type="button"
        onClick={() => history.push('/all')}
        className="btn btn-light"
      >
        View All
      </button>
      <button type="button" onClick={signOutUser}>
        Sign Out
      </button>
    </ButtonGroup>
  );
}
