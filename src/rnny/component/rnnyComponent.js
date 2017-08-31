import React from 'react';
import { ListView,FlatList, View, Image, TouchableOpacity,RefreshControl,ActivityIndicator,
         NetInfo,Linking,ViewPropTypes, ImageBackground
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
      data: data.getArticles('post'),
      //data: null,
      initialLoading: true,
      modalVisible: false,
      refreshing: false,
      connected: true
    }
    this.refresh = this.refresh.bind(this);
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
      data: nextProps.rnnynews,
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

  _renderItem(info) {
    return (
      <TouchableOpacity
        delayPressIn={70}
        activeOpacity={0.8}
        onPress={() => this.props.navigation.navigate('Article', {id: info.item.iurl})}>
        <RkCard rkType='blog' style={styles.card}>
          <ImageBackground style={[styles.image]} source={{uri: info.item.imageUrl}} shouldRasterizeIOS/>
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

  render() {
    return (
      <FlatList
        data={this.state.data}
        renderItem={this.renderItem}
        keyExtractor={this._keyExtractor}
        style={styles.container}/>
    )
  }
}

rnnyCompoent.propTypes = {
  rnnynews: PropTypes.arrayOf(PropTypes.object),
  loadRNNYNews: PropTypes.func
};

let styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.scroll,
    paddingVertical: 8,
    paddingHorizontal: 14
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
  }
}));
