import { useState } from 'react'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Heading,
  Text,
  Box,
  VStack
} from "@chakra-ui/react"
import http from '../utils/http'

export function Login () {
  const [email, setEmail] = useState(``)
  const [showModal, setShowModal] = useState(false)
  
  const onChangeLoginEmail = (evt) => {
    setEmail(evt.target.value)
  }
  const onSubmitLogin = async (evt) => {
    evt.preventDefault()
    const res = await http.login(email)
    console.log(res)
  }
  const onClickLogin = (_) => setShowModal(true)
  return (
    <div>
      <Button onClick={onClickLogin}>Login</Button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={onSubmitLogin}>
          <ModalBody>
            <Box mb={4}>
              <VStack justify='center'>
                <Heading as='h2' size='lg'>Connect to your account</Heading>
                <Text>Simply type the email to start.</Text>
              </VStack>
            </Box>
            <Input bg='gray.100' variant='filled' _placeholder={{ opacity: 1, color: 'gray.500' }}  _hover={{ bg: "white", border:"2px solid #FF5510" }}
          _focus={{ boxShadow: "outline", border:"2px solid #FF5510" }} type="text" placeholder="email" onChange={onChangeLoginEmail} />
          </ModalBody>
          <ModalFooter>
            <Button  w='100%' type="submit">Send Email</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
    </div>

  )
}