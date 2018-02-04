import React from 'react';
import { AsyncStorage, Text, Button, View, TextInput, StyleSheet } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import TextField from '../components/TextField';

const defaultState = {
    values: {
        name: '',
        email: '',
        password: '',
    },
    errors: {},
    isSubmitting: false,
};


/* eslint-disable react/no-multi-comp */
class Signup extends React.Component {
    state = defaultState;

    onChangeText = (key, value) => {
        this.setState(state => ({
            values: {
                ...state.values,
                [key]: value,
            },
        }));
    };

    submit = async () => {
        if (this.state.isSubmitting) {
            return;
        }

        this.setState({ isSubmitting: true });
        let response;
        try {
            response = await this.props.mutate({
                variables: this.state.values,
            });
        } catch (err) {
            this.setState({
                errors: {
                    email: 'Already taken',
                },
                isSubmitting: false,
            });
            return;
        }

        await AsyncStorage.setItem('@ecommerce/token', response.data.signup.token);
        this.setState(defaultState);
        this.props.history.push('/products');
    };

    goToLoginPage = () => {
        this.props.history.push('/login');
    };

    render() {
        const { errors, values: { name, email, password } } = this.state;

        return (
            <View
                style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <View style={{ width: 200 }}>
                    <TextField value={name} name="name" onChangeText={this.onChangeText} />
                    {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
                    <TextField value={email} name="email" onChangeText={this.onChangeText} />
                    <TextField
                        value={password}
                        name="password"
                        onChangeText={this.onChangeText}
                        secureTextEntry
                    />
                    <Button title="Create account" onPress={this.submit} />
                    <Text style={{ textAlign: 'center' }}>or</Text>
                    <Button title="Login" onPress={this.goToLoginPage} />
                </View>
            </View>
        );
    }
}

const signUpMutation = gql`
  mutation($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
    }
  }
`;

export default graphql(signUpMutation)(Signup);







// import React from 'react';
// import { AsyncStorage, Button, View, Text, TextInput, StyleSheet } from 'react-native';
// import { graphql } from 'react-apollo';
// import gql from 'graphql-tag';


// const styles = StyleSheet.create ({
//     field: {
//         borderBottomWidth: 1,
//         fontSize: 20,
//         marginBottom: 15,
//         height: 35,
//     },
// });

// const defaultState = {
//     values: {
//         name: '',
//         email: '',
//         password: '',
//     },
//     errors: {},
//     isSubmitting: false,
// };

// /* eslint-disable react/no-multi-comp */
// class Signup extends React.Component {   
//     state = defaultState;
//     }

// onChangeText = (key, value) => {
//     this.setState(state => ({
//         values: {
//             ...state.values,
//             [key]: value,
//         },
//     }));
// };   

// submit = async () => {
//     if (this.state.isSubmitting) {
//         return;
//     }

//     this.setState({isSubmitting: true});
//     let response;
//     try{
//       response = await this.props.mutate({
//         variables: this.state.values,
//     });
//     } catch (err) {
//       this.setState({
//         errors: {
//           email: 'email already in use',
//         },
//         isSubmitting: false,
//       });
//         return;
//     }

//     await AsyncStorage.setItem('@ecommerce/token', response.data.signup.token);
//     this.setState(defaultState);
//     this.props.history.push('/Products');
// };

// goToLoginPage = () => {
//     this.props.history.push('/login');
// };
//     render() {
//         const {errors, values: { name, email, password} } = this.state;

//         return (
//             <View 
//               style={{ 
//                 flex: 1, 
//                 display: 'flex', 
//                 justifyContent: 'center', 
//                 alignItems: 'center', 
//                 }}
//             >
//                 <View style={{ width: 200 }}>
//                     <TextInput 
//                     onChangeText={text => this.onChangeText('name', text)}
//                     value={name}
//                     style={styles.field} 
//                     placeholder="name"
//                     autoCapitalize="none"
//                     />
//                     {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
//                     <TextInput 
//                     onChangeText={text => this.onChangeText('email', text)}
//                     value={email} 
//                     style={styles.field} 
//                     placeholder="email" 
//                     autoCapitalize="none"
//                     />
//                     <TextInput 
//                     onChangeText={text => this.onChangeText('password', text)}
//                     value={password} 
//                     style={styles.field} 
//                     placeholder="password"
//                     secureTextEntry
//                     autoCapitalize="none"
//                     />
//                     <Button title="Create account" onPress={this.submit} />
//                     <Text style={{textAlign: 'center'}}>or</Text>
//                     <Button title="Login" onPress={this.goToLoginPage} />
//                 </View>
//             </View>
//         );
//     }
// }

// const signUpMutation = gql`
//     mutation($name: String!, $email: String!, $password: String!) {
//         signup(name: $name, email: $email, password: $password) {
//             token
//         }
//     }
// `;

// export default graphql(signUpMutation)(Signup);