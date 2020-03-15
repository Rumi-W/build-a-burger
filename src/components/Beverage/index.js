import React, { useState, useEffect } from 'react';
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  panelRoot: {
    width: '90%'
  },
  detailsPanel: {
    backgroundColor: '#F8F8F8',
    borderTop: '1px #cccccc solid',
    flexDirection: 'column',
    justifyContent: 'center'
  }
}));
const Beverage = ({ type, label, sizesObj, handleOrderChange, drinkOrder, children }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    updateOrderData();
    //eslint-disable-next-line
  }, []);

  const updateOrderData = () => {
    const childKeys = Object.keys(sizesObj);
    if (drinkOrder) {
      const storedOrderKeys = Object.keys(drinkOrder);

      let open = false;
      if (storedOrderKeys.length > 0) {
        for (let key of storedOrderKeys) {
          if (childKeys.indexOf(key) > -1) {
            setExpanded(true);
            open = true;
          }
        }
      }
      setExpanded(open);
    }
  };
  const togglePanel = () => {
    setExpanded(prevState => !prevState);
  };

  return (
    <ExpansionPanel
      style={{ marginTop: '2px', marginBottom: '4px' }}
      expanded={expanded}
      className={classes.panelRoot}>
      <ExpansionPanelSummary
        onClick={togglePanel}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id={`${type}-panel-summary`}>
        <Typography className={classes.heading}>{label}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.detailsPanel}>{children}</ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default Beverage;
