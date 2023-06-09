import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  Pressable,
  View,
  Alert
} from "react-native";
import Facebook from "../../assets/img/facebook.png";
import Google from "../../assets/img/google.png";
import { useNavigation } from '@react-navigation/native';
import { COLORS } from "../../constants";
import Button from "./components/Button";
import Input from "./components/Input";
import firebaseConfig from "./../../../firebase-config";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { initializeApp } from 'firebase/app';
import IconBettaGradient from '../../assets/svgs/betta-fish-gradient.svg'

const Login = () => {

  const navigation = useNavigation();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  console.log({ email, password })
  

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Inicio de sesión exitoso');
      const user = userCredential.user;
      console.log(user);
      navigation.navigate('Home')
    })
    .catch(error => {
      console.log(error);
      Alert.alert(error.message)
    })
  }

  return (
    <View style={styles.container}>
      <IconBettaGradient style width={140} height={140} />
      <Text style={styles.title}>Iniciar Sesión</Text>
      <View style={styles.inputContainer}>
        <Input onChangeText={(text) => setEmail(text)} placeholder={'E-mail'} />
        <Input secureTextEntry={true} onChangeText={(text) => setPassword(text)} placeholder={'Contraseña'} />
      </View>
      
      <Button
        name="Ingresa"
        backgroundColor={COLORS.jetBlack}
        textColor={COLORS.white}
        onPress={handleSignIn}
      />
      <Button
        name="Regístrate"
        borderWidth={1}
        backgroundColor={COLORS.white}
        textColor={COLORS.jetBlack}
        onPress={() => navigation.navigate('Register')}
      />

      <View style={styles.question}>
        <Text style={styles.textQuestion}>O continúa con</Text>
      </View>

      <View style={styles.socialButtonsContainer}>
        <Pressable style={styles.googleButton}>
        <Image source={Google} style={{ width: 18, height: 18, marginLeft: 5, marginRight: 3 }} />
          <Text style={styles.socialButtonText}>Google</Text>
        </Pressable>
        <Pressable style={styles.facebookButton}>
          <Image source={Facebook} style={{ width: 18, height: 18 }} />
          <Text style={styles.socialButtonText}>Facebook</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    marginVertical: 30,
    color: COLORS.white
  },
  inputContainer: {
    marginBottom: 16,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  facebookButton: {
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 8,
    width: 120,
    marginHorizontal: 15,
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 10,
  },
  googleButton: {
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 8,
    width: 120,
    marginHorizontal: 15,
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 10,
  },
  socialButtonText: {
    color: "#343434",
    fontSize: 15,
    marginLeft: 10,
  },
  question: {
    marginTop: 50,
    marginBottom: 10,
  },
  textQuestion: {
    color: COLORS.white,
    fontFamily: 'Poppins-Regular'
  }
});

