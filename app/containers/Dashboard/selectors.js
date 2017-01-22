/**
 * Dashboard selectors
 */

import { createSelector } from 'reselect';

const selectDashboard = (state) => state.get('dashboard');

const user = () => createSelector(
  selectDashboard,
  (dashboardState) => dashboardState.get('user')
);

export {
 user
};