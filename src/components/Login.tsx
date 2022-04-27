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

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={onSubmitLogin}>
          <ModalBody>
            <Input type="text" placeholder="email" onChange={onChangeLoginEmail} />
          </ModalBody>
          <ModalFooter>
            <Button type="submit">Submit</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
    </div>

  )
}