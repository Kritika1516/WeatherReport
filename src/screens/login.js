import React, { Component } from 'react';
import { Alert, Button } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, View, Text, Image, TextInput, TouchableHighlight } from 'react-native';
import { checkLogin } from '../actions/action';
import { bindActionCreators } from 'redux';
import configureStore from '../store/configureStore'
import { LOGIN_CLICK } from '../constants';
var isNavigate = true
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            zipCode:''
        }

        console.log("constructor");
        //this.saveData();
    }
    shouldComponentUpdate(nextProps) {
        if (nextProps.isLoggedIn && isNavigate){
            this.props.navigation.navigate("WeatherReportList",{callLogin:this.changeLoginState.bind(this)});
        }
        return true;
    }
    componentDidMount = () => {
        console.log("did mount");
    }
    changeLoginState = () => {
      this.props.checkLogin(true);
    }

    savezipCode = async () => {
        try {
            console.log('zipcode saved')
            await AsyncStorage.setItem('zipCode', this.state.zipCode);
            console.log('zipcode saved')
        } catch (error) {
            console.log('zipcode not saved',error)
            console.log(error.message);
        }
    }
    handleZipCode = (text) => {
        isNavigate = false;
        this.setState({ zipCode: text })
     }
    formValidate = async () => {

        let zipCode = this.state.zipCode;
        console.log("zip code in form validation",zipCode);
            if (zipCode.length == 6){
                this.savezipCode();
                isNavigate = true;
                this.props.checkLogin(false);
                //Alert.alert('Success!');
            } else {
                Alert.alert('Please provide valid zip code');
            }
            
         
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <View style={{ marginBottom: 16 }}>
                        <Text style={styles.lablelUser}>
                            Zip code
                  </Text>
                        <TextInput style={styles.inputUser} autoCapitalize="none" maxLength = {6} onChangeText={this.handleZipCode}></TextInput>
                        {/* <Item reguar style={styles.inputUser}>
                      <Input autoCapitalize="none" style={{color: "#8392E0"}}></Input>
                  </Item> */}
                    </View>
                    <View>
                        <TouchableHighlight
                            style={styles.btnSignin}
                            onPress={this.formValidate}
                            underlayColor='#fff'>
                            <Text style={styles.labelBtn}>Check</Text>
                        </TouchableHighlight>
                        {/* <Button  title="Sign In" color="#FFFFFF" borderRadius={8} >
                
             </Button> */}
                    </View>
                </View>


                {/* <Text style={styles.title}>Login screen</Text> */}
            </View>
        );
    }
}


const mapStateToProps = state => ({
    isLoggedIn: state.login.isLoggedIn,
});

export default connect(mapStateToProps,{ checkLogin })(Login);


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainbody: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30
    },
    imgLogin: {
        width: 300,
        height: 230,
        // alignItems: 'center',//
        // marginLeft: 60,
        //marginTop: 10,
        marginBottom: 40
    },
    lablelUser: {
        fontSize: 20,
        color: "#414E93",
        marginBottom: 8,
    },
    inputUser: {
        width: 300,
        height: 50,
        //marginLeft: 14,
        borderColor: "#43519D",
        backgroundColor: "#283786",
        borderRadius: 8,
        color: "#8392E0",
    },
    btnSignin: {
        width: 300,
        height: 50,
        //marginLeft: 14,
        marginTop: 0,
        borderRadius: 8,
        backgroundColor: "#50D9EA",
        color: "#FFFFFF",
        //paddingTop:10,
        /// paddingBottom:10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelBtn: {
        color: "#000000",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: 'center',
        height: 30,
        width: 100,
        // backgroundColor: "red",
        marginTop: 0,
    },

});