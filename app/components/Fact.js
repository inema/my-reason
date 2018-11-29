import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'

export default class Fact extends Component {
  state = {
    arrowIcon: "rightcircleo",
    hideSource: true
  }

  showSource(){
    const hideSource = !this.state.hideSource;
    const arrowIcon = hideSource ? "rightcircleo" : "downcircleo";
    this.setState({ hideSource, arrowIcon });
  }

  render() {
    return (
      <View>
        <Text style={styles.TextStyle}>{this.props.item.fact}</Text>
        <View style={styles.sourceContainer}>
          <Text style={styles.sourceText}>source  </Text>
          <TouchableOpacity onPress={() => this.showSource()}>
            <Icon name={this.state.arrowIcon} size={20} />
          </TouchableOpacity>
        </View>
        {!this.state.hideSource &&
        <TouchableOpacity onPress={() => {
          Linking.openURL(this.props.item.source)
          .catch(err => console.error('An error occurred', err));}
        }>
          <Text style={styles.link}>{this.props.item.source}</Text>
        </TouchableOpacity>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  TextStyle: {
      color:'#000',
      fontFamily: 'arial',
      textAlignVertical: 'center',
      fontSize: 20
  },
  sourceContainer: {
    flexDirection: 'row'
  },
  sourceText: {
      color:'#000',
      fontFamily: 'arial',
      textAlignVertical: 'center',
      fontSize: 15
  },
  link: {
      color:'blue',
      fontFamily: 'arial',
      textAlignVertical: 'center',
      fontSize: 15
  },
});
