import React from 'react';
import { ListView,FlatList, View, Image, TouchableOpacity,RefreshControl,ActivityIndicator,
         NetInfo,Linking,ViewPropTypes, ImageBackground, Modal,WebView
       } from 'react-native';
import { RkCard, RkStyleSheet, RkText } from 'react-native-ui-kitten';
import PropTypes from 'prop-types';
import {Avatar} from '../../components';
import {data} from '../../data';
let moment = require('moment');

export default class rnnyCompoent extends React.Component {
  static navigationOptions = {
    title: 'RNNY'.toUpperCase()
  };

  constructor(props) {
    super(props);

    this.renderItem = this._renderItem.bind(this);
    this.state = {
      data: null,
      initialLoading: true,
      modalVisible: false,
      refreshing: false,
      connected: true,
      modalUrl: ''
    }
    this.refresh = this.refresh.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.onModalOpen = this.onModalOpen.bind(this);
    this.handleConnectivityChange = this.handleConnectivityChange.bind(this);
  }

  handleConnectivityChange(isConnected) {
    this.setState({
      connected: isConnected
    });
    if (isConnected) {
      this.refresh();
    }
  }

  componentWillMount() {
    NetInfo.isConnected.addEventListener('change', this.handleConnectivityChange);
    this.refresh();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.rnnynews, // rnnynews is properties defined in Reducer
      initialLoading: false
    });
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('change', this.handleConnectivityChange);
  }

  refresh() {
    if (this.props.loadRNNYNews) {
      this.props.loadRNNYNews();
    }
  }

  _keyExtractor(post, index) {
    return post.id;
  }

  onModalOpen(url) {
    console.log('url');
    console.log(url);
    this.setState({
      modalVisible: true,
      modalUrl: url
    });
  }

  onModalClose() {
    this.setState({
      modalVisible: false,
      modalUrl: undefined
    });
  }

  _renderItem(info) {
    return (
      <TouchableOpacity
        delayPressIn={70}
        activeOpacity={0.8}
        //onPress={() => this.props.navigation.navigate('Article', {id: info.item.iurl})}>
        onPress={() => this.onModalOpen(info.item.url)}>
        <RkCard rkType='blog' style={styles.card}>
          <ImageBackground style={[styles.image]} source={{uri: info.item.imageUrl}}
            onPress={() => this.onModalOpen(info.item.url)}
            shouldRasterizeIOS/>
          <View rkCardHeader style={styles.content}>
            <RkText style={styles.section} rkType='header4'>{info.item.title}</RkText>
          </View>
          <View rkCardContent>
            <View>
              <RkText rkType='primary3 mediumLine' numberOfLines={2}>{info.item.description}</RkText>
            </View>
          </View>
          <View rkCardFooter>
            <View style={styles.userInfo}>
              {/* <Avatar style={styles.avatar} rkType='circle small' img={info.item.imageUrl}/> */}
              <RkText rkType='header6' numberOfLines={2}>{`${info.item.author}`}</RkText>
            </View>
            <RkText rkType='secondary2 hintColor'>{info.item.date}</RkText>
          </View>
        </RkCard>
      </TouchableOpacity>
    )
  }

  renderModal() {
    console.log('modelurl');
    console.log(this.state.modalUrl);
    return (
      <Modal
        animationType="slide"
        visible={this.state.modalVisible}
        onRequestClose={this.onModalClose}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              onPress={this.onModalClose}
              style={styles.closeButton}
            >
              <RkText>Close</RkText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL(this.state.modalUrl)}
            >
              <RkText>Open in Browser</RkText>
            </TouchableOpacity>
          </View>
          <WebView
            scalesPageToFit
            source={{ uri: this.state.modalUrl }}
          />
        </View>
      </Modal>
    );
  }

  render() {

    const { initialLoading, refreshing, data } = this.state;

    if (!this.state.connected) {
      return (
          <View style={[styles.loadingContainer]}>
            <RkText rkType='header6'> No Connection </RkText>
          </View>
      );
    }
    return (
      (initialLoading
        ? (

            <ActivityIndicator style={styles.activityIndicator} size="large"
              animating
              {...this.props}
            />

        ) : (
          <View style={styles.viewcontainer}>
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={this.refresh}
                />
              }
              enableEmptySections
              data={this.state.data}
              renderItem={this.renderItem}
              keyExtractor={this._keyExtractor}
              style={styles.container}/>
              {this.renderModal()}
          </View>
        )
      )
    );
  }
}

rnnyCompoent.propTypes = {
  rnnynews: PropTypes.arrayOf(PropTypes.object),
  loadRNNYNews: PropTypes.func,
  //showLoadingSpinner: PropTypes.bool,
};
// rnnyCompoent.defaultProps = {
//   showLoadingSpinner: true
// };

const styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.scroll,
    paddingVertical: 8,
    paddingHorizontal: 14
  },
  viewcontainer:{

  },
  card: {
    marginVertical: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    marginRight: 17
  },
  image: {
    height: 150,
    justifyContent: 'flex-end'
  },
  activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
   },
   modalContent: {
     flex: 1,
     justifyContent: 'center',
     paddingTop: 20,
     //backgroundColor: globalStyles.BG_COLOR
   },
   closeButton: {
     paddingVertical: 5,
     paddingHorizontal: 10,
     flexDirection: 'row'
   },
   modalButtons: {
     paddingVertical: 5,
     paddingHorizontal: 10,
     flexDirection: 'row',
     justifyContent: 'space-between'
   },
   loadingContainer: {
     alignItems: 'center',
     justifyContent: 'center'
   }
}));
