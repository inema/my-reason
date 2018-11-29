import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';
import Fact from '../components/Fact'
import { url } from '../url';

export default class Facts extends Component {

  state = { facts: [], error: null}

  componentDidMount() {
    this.timeout(3000, fetch(url + '/facts/' + this.props.navigation.getParam('category')))
      .then(response => response.json())
      .then(facts => {
        console.log(facts);
        this.setState({ facts });
      })
      .catch(error => {
        this.setState({ error });
        console.log(error);
      })
  }

  //TODO: put in a sepparate file
  timeout(ms, promise) {
    return new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error("Connection timeout")), ms)
      promise.then(resolve, reject)
    })
  }

  _keyExtractor = (item, index) => item.id.toString();

  _renderItem = ({item}) => (
    <View style={[styles.factContainer, {borderColor: this.props.navigation.getParam('colour')}]}>
      <Fact item={item}/>
    </View>
  );

  render() {
    //TODO: once you have it working, use this.props.navigation.getParam('category')
    const category = "Environment"
    return (
      <FlatList
        data={this.state.facts}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem} />
    );
  }
}

const styles = StyleSheet.create({
  factContainer: {
    marginTop: 10,
    marginLeft:15,
    marginRight:15,
    padding: 10,
    borderRadius:10,
    borderWidth: 3,
    backgroundColor: '#eee'
  }
});
