import React from 'react'
import {
  ScrollView,
  Box,
  Text,
  VStack,
  Icon,
  useColorModeValue,
  Avatar
} from 'native-base'
import { Feather } from '@expo/vector-icons'
import AnimatedColorBox from '../components/animated-color-box'
import NavBar from '../components/navbar'
import Masthead from '../components/masthead'
import LinkButton from '../components/link-button'

const AboutScreen = () => {
  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue('warmGray.50', 'warmGray.900')}
      w="full"
    >
      <Masthead
        title="About this app"
        image={require('../assets/about-masthead.png')}
      >
        <NavBar />
      </Masthead>
      <ScrollView
        bg={useColorModeValue('warmGray.50', 'primary.900')}
        mt="-20px"
        borderTopRightRadius="20px"
        borderTopLeftRadius="20px"
        pt="30px"
        p={4}
      >
        <VStack flex={1} space={4}>
          <Box alignItems="center">
            <Avatar
              source={require('../assets/profile-image.png')}
              size="xl"
              borderRadius={100}
              mb={6}
              borderColor="secondary.400"
              borderWidth={3}
            />
          </Box>
          <Text fontSize="md" w="full">
            Esta es una aplicación hecha en React Native
          </Text>
          <LinkButton
            colorScheme="red"
            size="lg"
            borderRadius="full"
            href="https://www.youtube.com"
            leftIcon={
              <Icon as={Feather} name="youtube" size="sm" opacity={0.5} />
            }
          >
            Go to YouTube
          </LinkButton>
          <LinkButton
            colorScheme="purple"
            size="lg"
            borderRadius="full"
            href="https://damp-journey-34217.herokuapp.com/"
            leftIcon={
              <Icon as={Feather} name="external-link" size="sm" opacity={0.5} />
            }
          >
            Portafolio
          </LinkButton>
        </VStack>
      </ScrollView>
    </AnimatedColorBox>
  )
}

export default AboutScreen
