import React, { Component } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import { url } from '../url';

export default class Explore extends Component {
  /*if we have props use:
  constructor(props){
    super(props);
    this.state = {...}
  }
  */
  /*
  state = {
    categories: [
      {category: 'All', colour: 'crimson'},
      {category: 'Environment', colour: 'deepskyblue'},
      {category: 'Health', colour: 'limegreen'},
      {category: 'Ethics', colour: 'blueviolet'},
      {category: 'Logic', colour: 'orange'},
      {category: 'Books', colour: 'sienna'}
    ]
  }
  */
  state = { categories: [], error: null};

  componentDidMount() {
    this.timeout(3000, fetch(url + '/categories'))
      .then(response => response.json())
      .then(categories => {
        console.log(categories);
        this.setState({ categories });
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

  _keyExtractor = (item, index) => item.category;

  _renderItem = ({item}) => (
    <TouchableOpacity
      id={item.category.toUpperCase()}
      style={[styles.SubmitButtonStyle, {backgroundColor: item.colour}]}
      activeOpacity = { .5 }
      onPress={ () => this.props.navigation.navigate('Facts', {category: item.category, colour: item.colour})}>
      <Text style={styles.TextStyle}>{item.category}</Text>
    </TouchableOpacity>
  );

  render() {
    if (this.state.error) {
      //TODO: better style
      return (<Text style={styles.TextStyle}>Could not Connect</Text>);
    }
    return (
      <View style={styles.MainContainer}>
        <FlatList
          data={this.state.categories}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    //justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },

  SubmitButtonStyle: {
    height: 70,
    marginTop:10,
    paddingTop:15,
    paddingBottom:15,
    marginLeft:15,
    marginRight:15,
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },

  TextStyle:{
      color:'#000',
      fontFamily: 'arial',
      textAlign:'center',
      textAlignVertical: 'center',
      fontSize: 30
  }
});
