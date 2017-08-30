import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadRNNYNews } from '../action/rnnyAction';
import rnnyComponent from '../component/rnnyComponent';
import { allNewsSelector } from '../selector/rnnySelector';

const mapStateToProps = (state) => {
  return {
    rnnynews: allNewsSelector(state),
  }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    dispatch,
    loadRNNYNews,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(rnnyComponent);

//export default connect(mapStateToProps, mapDispatchToProps)(rnnyComponent);
